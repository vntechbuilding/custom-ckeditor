import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";

export default class InsertVideo extends Plugin {
  init() {
    const editor = this.editor;

    editor.ui.componentFactory.add("insertVideo", (locale) => {
      const view = new ButtonView(locale);

      view.set({
        label: "Insert Video",
        icon: `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 0 0-1 1v6H3a1 1 0 1 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2h-6V3a1 1 0 0 0-1-1Z"/></svg>`,
        tooltip: true,
      });

      // Callback executed once the image is clicked.
      view.on("execute", () => {
        const videoURL = prompt("Video URL");
        const videoWidth = prompt("Video Width");
        const videoHeight = prompt("Video Height");

        editor.model.change((writer) => {
          const videoElement = writer.createElement("video", {
            controls: "",
            width: videoWidth,
            height: videoHeight,
          });

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

      return view;
    });
  }
}
