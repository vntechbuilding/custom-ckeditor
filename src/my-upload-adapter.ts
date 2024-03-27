export class MyUploadAdapter {
  constructor(private loader: any) {}

  upload(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.loader.file
        .then((file: any) => {
          // Trigger a custom event with the file to be uploaded.
          const event = new CustomEvent("uploadCkeditor", { detail: file });
          document.dispatchEvent(event);

          // Listen for the 'uploadComplete' event to get the URL of the uploaded image.
          document.addEventListener("uploadCkeditorComplete", (event: any) => {
            if (event.detail === false) {
              reject("Upload failed");
            }
            resolve({
              default: event.detail,
            });
          });
        })
        .catch(reject);
    });
  }

  abort(): void {
    // The upload service does not support aborting uploads. Do nothing.
  }
}
