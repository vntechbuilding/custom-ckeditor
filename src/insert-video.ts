import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import VideoFormView from "./ui/video-form-view";
import {
  addListToDropdown,
  createDropdown,
  ListDropdownItemDefinition,
} from "@ckeditor/ckeditor5-ui";
import Model from "@ckeditor/ckeditor5-ui/src/model";
import Collection from "@ckeditor/ckeditor5-utils/src/collection";

export default class InsertVideo extends Plugin {
  init() {
    const editor = this.editor;

    editor.ui.componentFactory.add("insertVideo", (locale) => {
      const dropdownView = createDropdown(locale);
      const videoForm = new VideoFormView(locale);

      dropdownView.buttonView.set({
        label: "Insert Video",
        icon: `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 0 0-1 1v6H3a1 1 0 1 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2h-6V3a1 1 0 0 0-1-1Z"/></svg>`,
        tooltip: true,
      });

      // Callback executed once the image is clicked.
      dropdownView.on("execute", () => {
        const videoURL = videoForm.videoURLInputView.fieldView!.element!.value;
        const videoWidth =
          videoForm.videoWidthInputView.fieldView!.element!.value;
        const videoHeight =
          videoForm.videoHeightInputView.fieldView!.element!.value;

        editor.model.change((writer) => {
          const videoElement = writer.createElement("video", {
            controls: "",
            width: videoWidth,
            height: videoHeight,
          });

          // Insert the video in the current selection location.
          editor.model.insertContent(
            videoElement,
            editor.model.document.selection
          );
          const sourceElement = writer.createElement("source", {
            src: videoURL,
            type: "video/mp4",
          });

          writer.append(sourceElement, videoElement);
          writer.insertText(
            "Your browser does not support the video tag.",
            videoElement,
            "end"
          );

          // Insert the video in the current selection location.
          editor.model.insertContent(
            videoElement,
            editor.model.document.selection
          );
        });
      });

      const formDefinitions = new Collection<ListDropdownItemDefinition>();
      formDefinitions.add({
        type: "button",
        model: new Model({
          withText: true,
          label: "Video Form",
          commandParam: videoForm,
        }),
      });

      addListToDropdown(dropdownView, formDefinitions);

      return dropdownView;
    });
  }
}
