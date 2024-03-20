import View from "@ckeditor/ckeditor5-ui/src/view";
import LabeledFieldView from "@ckeditor/ckeditor5-ui/src/labeledfield/labeledfieldview";
import type { Locale } from "@ckeditor/ckeditor5-utils";
import InputTextView from "@ckeditor/ckeditor5-ui/src/inputtext/inputtextview";
export default class VideoFormView extends View {
    videoURLInputView: LabeledFieldView<InputTextView>;
    videoWidthInputView: LabeledFieldView<InputTextView>;
    videoHeightInputView: LabeledFieldView<InputTextView>;
    constructor(locale: Locale);
    render(): void;
    _createInputField(label: string): LabeledFieldView<InputTextView>;
}
