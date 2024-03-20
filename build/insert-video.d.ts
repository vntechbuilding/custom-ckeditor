import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import VideoFormView from "./ui/video-form-view";
import { DropdownView } from "@ckeditor/ckeditor5-ui";
export default class InsertVideo extends Plugin {
    form: VideoFormView;
    init(): void;
    _setUpDropdown(dropdown: DropdownView): void;
    _setUpForm(dropdown: DropdownView): void;
}
