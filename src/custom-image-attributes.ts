import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

export default class CustomImageAttributes extends Plugin {
  init() {
    const editor = this.editor;

    editor.model.document.on("change:data", () => {
      editor.model.change((writer) => {
        const selection = editor.model.document.selection;
        for (const range of selection.getRanges()) {
          for (const element of range.getItems()) {
            if (
              element.is("element", "imageBlock") ||
              element.is("element", "imageInline")
            ) {
              const imageElement = element.getChild(0);

              if (imageElement && imageElement.is("element", "image")) {
                writer.removeAttribute("width", imageElement);
                writer.removeAttribute("height", imageElement);

                // Check if the image has the 'responsive' style.
                const imageStyle = imageElement.getAttribute("imageStyle");
                console.log(imageStyle);
                // if (imageStyle === "responsive") {
                // Add the 'image-responsive' class to the image.
                writer.setAttribute("class", "image-responsive", imageElement);
                // }
              }
            }
          }
        }
      });
    });
  }
}
