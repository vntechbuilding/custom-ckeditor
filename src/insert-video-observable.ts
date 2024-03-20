import { Plugin } from "@ckeditor/ckeditor5-core";
import { ButtonView } from "@ckeditor/ckeditor5-ui";
import { Observable } from "rxjs";
export default class InsertVideoObservable extends Plugin {
  init() {
    const editor = this.editor;
    const componentCallback = this.editor.config.get(
      "InsertVideoObservable.callback"
    );

    editor.ui.componentFactory.add("InsertVideoObservable", (locale) => {
      const view = new ButtonView(locale);

      view.set({
        label: "Chèn Video",
        tooltip: true,
        icon: `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 0 0-1 1v6H3a1 1 0 1 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2h-6V3a1 1 0 0 0-1-1Z"/></svg>`,
      });

      // Callback executed once the button is clicked.
      view.on("execute", () => {
        // Save the current selection before the button click action.
        // const savedSelection = editor.model.createSelection(
        //   editor.model.document.selection
        // );
        //
        // console.log(savedSelection);
        // console.log(editor.model.document.selection);
        if (typeof componentCallback === "function") {
          const videoObservable: Observable<string> = componentCallback();
          console.log(videoObservable);
          videoObservable.subscribe((videoHTML) => {
            if (!videoHTML) {
              return;
            }
            // const videoElement: any = editor.data.processor.toView(videoHTML);
            const videoElementView = editor.data.processor.toView(videoHTML);
            const videoElementModel = editor.data.toModel(videoElementView);
            // console.log(videoHTML);
            // console.log(videoElementModel);

            // editor.model.change((writer) => {
            // Restore the selection before inserting the content.
            // writer.setSelection(savedSelection);
            // Insert the video in the current selection location.
            editor.model.insertContent(
              videoElementModel,
              editor.model.document.selection
            );
            // });
          });
        }
      });

      return view;
    });
  }
}
