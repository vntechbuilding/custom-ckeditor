export declare class MyUploadAdapter {
    private loader;
    constructor(loader: any);
    upload(): Promise<any>;
    abort(): void;
}
