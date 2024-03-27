import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import { MyUploadAdapter } from "./my-upload-adapter";

export class MyUploadAdapterPlugin extends Plugin {
  init() {
    this.editor.plugins.get("FileRepository").createUploadAdapter = (
      loader
    ) => {
      return new MyUploadAdapter(loader);
    };
  }
}
