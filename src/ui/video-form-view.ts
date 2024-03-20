import View from "@ckeditor/ckeditor5-ui/src/view";
import LabeledFieldView from "@ckeditor/ckeditor5-ui/src/labeledfield/labeledfieldview";
import submitHandler from "@ckeditor/ckeditor5-ui/src/bindings/submithandler";
import type { Locale } from "@ckeditor/ckeditor5-utils";
import { createLabeledInputText } from "@ckeditor/ckeditor5-ui";
import InputTextView from "@ckeditor/ckeditor5-ui/src/inputtext/inputtextview";

export default class VideoFormView extends View {
  videoURLInputView: LabeledFieldView<InputTextView>;
  videoWidthInputView: LabeledFieldView<InputTextView>;
  videoHeightInputView: LabeledFieldView<InputTextView>;
  constructor(locale: Locale) {
    super(locale);

    const t = locale.t;

    this.videoURLInputView = this._createInputField(t("Video URL"));
    this.videoWidthInputView = this._createInputField(t("Video Width"));
    this.videoHeightInputView = this._createInputField(t("Video Height"));

    this.setTemplate({
      tag: "form",
      attributes: {
        class: ["ck", "ck-text-alternative-form"],
        tabindex: "-1",
      },
      children: [
        this.videoURLInputView,
        this.videoWidthInputView,
        this.videoHeightInputView,
      ],
    });
  }

  override render() {
    super.render();

    submitHandler({
      view: this,
    });
  }

  _createInputField(label: string) {
    const labeledInput = new LabeledFieldView(
      this.locale,
      createLabeledInputText
    );

    labeledInput.label = label;
    labeledInput.fieldView.placeholder = "";
    // labeledInput.fieldView.type = type;

    return labeledInput;
  }
}
