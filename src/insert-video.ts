import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import VideoFormView from "./ui/video-form-view";
import { createDropdown } from "@ckeditor/ckeditor5-ui";

export default class InsertVideo extends Plugin {
  init() {
    const editor = this.editor;

    editor.ui.componentFactory.add("insertVideo", (locale) => {
      const dropdownView = createDropdown(locale);
      const videoForm = new VideoFormView(locale);

      dropdownView.buttonView.set({
        label: "Insert Video",
        icon: `<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<defs>
<style>.cls-1{fill:none;stroke:#020202;stroke-miterlimit:10;stroke-width:1.92px;}</style>
</defs>
<g id="roll_brush" data-name="roll brush">
<polygon class="cls-1" points="15.79 14.93 8.11 18.52 8.11 11.33 15.79 14.93"/>
<rect class="cls-1" x="1.4" y="1.5" width="21.1" height="21.1"/>
<polygon class="cls-1" points="22.5 7.25 16.23 7.25 14.31 7.25 1.4 7.25 1.4 1.5 22.5 1.5 22.5 7.25"/>
<line class="cls-1" x1="4.28" y1="4.38" x2="6.2" y2="4.38"/>
<line class="cls-1" x1="8.11" y1="4.38" x2="10.03" y2="4.38"/>
<line class="cls-1" x1="11.95" y1="4.38" x2="13.87" y2="4.38"/>
</g>
</svg>`,
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

      return dropdownView;
    });
  }
}
