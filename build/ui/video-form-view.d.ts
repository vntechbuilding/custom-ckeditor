import View from "@ckeditor/ckeditor5-ui/src/view";
import LabeledFieldView from "@ckeditor/ckeditor5-ui/src/labeledfield/labeledfieldview";
import { FocusTracker, KeystrokeHandler, Locale } from "@ckeditor/ckeditor5-utils";
import { ButtonView, FocusableView, FocusCycler, ViewCollection } from "@ckeditor/ckeditor5-ui";
import InputTextView from "@ckeditor/ckeditor5-ui/src/inputtext/inputtextview";
export default class VideoFormView extends View {
    videoURLInputView: LabeledFieldView<InputTextView>;
    videoWidthInputView: LabeledFieldView<InputTextView>;
    videoHeightInputView: LabeledFieldView<InputTextView>;
    focusTracker: FocusTracker;
    keystrokes: KeystrokeHandler;
    mLocate: Locale;
    saveButtonView: ButtonView;
    cancelButtonView: ButtonView;
    _focusables: ViewCollection<FocusableView>;
    _focusCycler: FocusCycler;
    constructor(locale: Locale);
    render(): void;
    /**
     * Focuses the fist {@link #_focusables} in the form.
     */
    focus(): void;
    /**
     * The native DOM `value` of the {@link #urlInputView} element.
     *
     * **Note**: Do not confuse it with the {@link module:ui/inputtext/inputtextview~InputTextView#value}
     * which works one way only and may not represent the actual state of the component in the DOM.
     *
     * @type {Number}
     */
    get url(): string;
    set url(url: string);
    get width(): string;
    set width(width: string);
    get height(): string;
    set height(height: string);
    /**
     * Cleans up the supplementary error and information text of the {@link #urlInputView}
     * bringing them back to the state when the form has been displayed for the first time.
     *
     * See {@link #isValid}.
     */
    resetFormStatus(): void;
    _createInputField(label: string, infoText: string, placeholder: string, value?: string): LabeledFieldView<InputTextView>;
    /**
     * Creates a button view.
     *
     * @private
     * @param {String} label The button label.
     * @param {String} icon The button icon.
     * @param {String} className The additional button CSS class name.
     * @param {String} [eventName] An event name that the `ButtonView#execute` event will be delegated to.
     * @returns {module:ui/button/buttonview~ButtonView} The button view instance.
     */
    _createButton(label: string, icon: string, className: string, eventName?: any): ButtonView;
}
