import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import VideoFormView from "./ui/video-form-view";
const mediaIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M18.68 3.03c.6 0 .59-.03.59.55v12.84c0 .59.01.56-.59.56H1.29c-.6 0-.59.03-.59-.56V3.58c0-.58-.01-.55.6-.55h17.38zM15.77 15V5H4.2v10h11.57zM2 4v1h1V4H2zm0 2v1h1V6H2zm0 2v1h1V8H2zm0 2v1h1v-1H2zm0 2v1h1v-1H2zm0 2v1h1v-1H2zM17 4v1h1V4h-1zm0 2v1h1V6h-1zm0 2v1h1V8h-1zm0 2v1h1v-1h-1zm0 2v1h1v-1h-1zm0 2v1h1v-1h-1zM7.5 7.177a.4.4 0 01.593-.351l5.133 2.824a.4.4 0 010 .7l-5.133 2.824a.4.4 0 01-.593-.35V7.176v.001z"/></svg>';
import { createDropdown, DropdownView } from "@ckeditor/ckeditor5-ui";

export default class InsertVideo extends Plugin {
  form!: VideoFormView;
  init() {
    const editor = this.editor;

    /**
     * The form view displayed inside the drop-down.
     *
     * @member {module:media-embed/ui/mediaformview~MediaFormView}
     */
    this.form = new VideoFormView(editor.locale);

    editor.ui.componentFactory.add("insertVideo", (locale) => {
      const dropdown = createDropdown(locale);

      this._setUpDropdown(dropdown);
      this._setUpForm(dropdown);

      return dropdown;
      // const videoForm = new VideoFormView(locale);
      //
      // dropdownView.buttonView.set({
      //   label: "Insert Video",
      //   icon: `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 0 0-1 1v6H3a1 1 0 1 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2h-6V3a1 1 0 0 0-1-1Z"/></svg>`,
      //   tooltip: true,
      // });
      //
      // // Callback executed once the image is clicked.
      // dropdownView.on("execute", () => {
      //   const videoURL = videoForm.videoURLInputView.fieldView!.element!.value;
      //   const videoWidth =
      //     videoForm.videoWidthInputView.fieldView!.element!.value;
      //   const videoHeight =
      //     videoForm.videoHeightInputView.fieldView!.element!.value;
      //
      //   editor.model.change((writer) => {
      //     const videoElement = writer.createElement("video", {
      //       controls: "",
      //       width: videoWidth,
      //       height: videoHeight,
      //     });
      //
      //     // Insert the video in the current selection location.
      //     editor.model.insertContent(
      //       videoElement,
      //       editor.model.document.selection
      //     );
      //     const sourceElement = writer.createElement("source", {
      //       src: videoURL,
      //       type: "video/mp4",
      //     });
      //
      //     writer.append(sourceElement, videoElement);
      //     writer.insertText(
      //       "Your browser does not support the video tag.",
      //       videoElement,
      //       "end"
      //     );
      //
      //     // Insert the video in the current selection location.
      //     editor.model.insertContent(
      //       videoElement,
      //       editor.model.document.selection
      //     );
      //   });
      // });
      //
      // const formDefinitions = new Collection<ListDropdownItemDefinition>();
      // formDefinitions.add({
      //   type: "button",
      //   model: new Model({
      //     withText: true,
      //     label: "Video Form",
      //     commandParam: videoForm,
      //   }),
      // });
      //
      // addListToDropdown(dropdownView, formDefinitions);
      //
      // return dropdownView;
    });
  }

  _setUpDropdown(dropdown: DropdownView) {
    const editor = this.editor;
    const button = dropdown.buttonView;

    dropdown.panelView.children.add(this.form);

    button.set({
      label: "Chèn Video",
      icon: mediaIcon,
      tooltip: true,
    });

    // Note: Use the low priority to make sure the following listener starts working after the
    // default action of the drop-down is executed (i.e. the panel showed up). Otherwise, the
    // invisible form/input cannot be focused/selected.
    button.on(
      "open",
      () => {
        // Make sure that each time the panel shows up, the URL field remains in sync with the value of
        // the command. If the user typed in the input, then canceled (`urlInputView#fieldView#value` stays
        // unaltered) and re-opened it without changing the value of the media command (e.g. because they
        // didn't change the selection), they would see the old value instead of the actual value of the
        // command.
        this.form.videoURLInputView.fieldView.select();
        this.form.focus();
      },
      { priority: "low" }
    );

    dropdown.on("submit", () => {
      const value = {
        url: this.form.url,
        width: this.form.width,
        height: this.form.height,
      };
      // console.log(value);
      // editor.execute("insertVideo", value);

      const videoHTML = `<video controls width="${value.width}" height="${value.height}"><source src="${value.url}" type="video/mp4">Your browser does not support the video tag.</video>`;
      const videoElementView = editor.data.processor.toView(videoHTML);
      const videoElementModel = editor.data.toModel(videoElementView);

      // Insert the video in the current selection location.
      editor.model.insertContent(
        videoElementModel,
        editor.model.document.selection
      );
      closeUI();
    });

    dropdown.on("change:isOpen", () => this.form.resetFormStatus());
    dropdown.on("cancel", () => closeUI());

    function closeUI() {
      editor.editing.view.focus();
      dropdown.isOpen = false;
    }
  }

  _setUpForm(dropdown: DropdownView) {
    this.form.delegate("submit", "cancel").to(dropdown);
    // this.form.urlInputView.bind("value").to(command, "value");

    // Form elements should be read-only when corresponding commands are disabled.
    // form.urlInputView
    //   .bind("isReadOnly")
    //   .to(command, "isEnabled", (value) => !value);
    // form.saveButtonView.bind("isEnabled").to(command);
  }
}
