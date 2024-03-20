import View from "@ckeditor/ckeditor5-ui/src/view";
import LabeledFieldView from "@ckeditor/ckeditor5-ui/src/labeledfield/labeledfieldview";
import submitHandler from "@ckeditor/ckeditor5-ui/src/bindings/submithandler";
import {
  FocusTracker,
  KeystrokeHandler,
  Locale,
} from "@ckeditor/ckeditor5-utils";
import {
  ButtonView,
  createLabeledInputText,
  FocusableView,
  FocusCycler,
  ViewCollection,
} from "@ckeditor/ckeditor5-ui";
import InputTextView from "@ckeditor/ckeditor5-ui/src/inputtext/inputtextview";
// @ts-ignore
import checkIcon from "@ckeditor/ckeditor5-core/theme/icons/check.svg";
// @ts-ignore
import cancelIcon from "@ckeditor/ckeditor5-core/theme/icons/cancel.svg";
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
  constructor(locale: Locale) {
    super(locale);
    this.mLocate = locale;

    const t = locale.t;
    /**
     * Tracks information about DOM focus in the form.
     *
     * @readonly
     * @member {module:utils/focustracker~FocusTracker}
     */
    this.focusTracker = new FocusTracker();

    /**
     * An instance of the {@link module:utils/keystrokehandler~KeystrokeHandler}.
     *
     * @readonly
     * @member {module:utils/keystrokehandler~KeystrokeHandler}
     */
    this.keystrokes = new KeystrokeHandler();

    /**
     * The URL input view.
     *
     * @member {module:ui/labeledfield/labeledfieldview~LabeledFieldView}
     */
    this.videoURLInputView = this._createInputField(
      "Video URL",
      "Đuường dẫn Video",
      "https://google.com/video.mp4"
    );
    this.videoWidthInputView = this._createInputField(
      "Video Width",
      "Chiều rộng Video",
      "100%",
      "100%"
    );
    this.videoHeightInputView = this._createInputField(
      "Video Height",
      "Chiều cao Video",
      "100%",
      "100%"
    );

    /**
     * The Save button view.
     *
     * @member {module:ui/button/buttonview~ButtonView}
     */
    this.saveButtonView = this._createButton(
      t("Save"),
      checkIcon,
      "ck-button-save"
    );
    this.saveButtonView.type = "submit";

    /**
     * The Cancel button view.
     *
     * @member {module:ui/button/buttonview~ButtonView}
     */
    this.cancelButtonView = this._createButton(
      t("Cancel"),
      cancelIcon,
      "ck-button-cancel",
      "cancel"
    );

    /**
     * A collection of views that can be focused in the form.
     *
     * @readonly
     * @protected
     * @member {module:ui/viewcollection~ViewCollection}
     */
    this._focusables = new ViewCollection();

    /**
     * Helps cycling over {@link #_focusables} in the form.
     *
     * @readonly
     * @protected
     * @member {module:ui/focuscycler~FocusCycler}
     */
    this._focusCycler = new FocusCycler({
      focusables: this._focusables,
      focusTracker: this.focusTracker,
      keystrokeHandler: this.keystrokes,
      actions: {
        // Navigate form fields backwards using the Shift + Tab keystroke.
        focusPrevious: "shift + tab",

        // Navigate form fields forwards using the Tab key.
        focusNext: "tab",
      },
    });

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
        this.saveButtonView,
        this.cancelButtonView,
      ],
    });
  }

  override render() {
    super.render();

    submitHandler({
      view: this,
    });

    const childViews = [
      this.videoURLInputView,
      this.videoWidthInputView,
      this.videoHeightInputView,
      this.saveButtonView,
      this.cancelButtonView,
    ];

    childViews.forEach((v) => {
      // Register the view as focusable.
      this._focusables.add(v);

      // Register the view in the focus tracker.
      this.focusTracker.add((v as any).element);
    });

    // Start listening for the keystrokes coming from #element.
    this.keystrokes.listenTo(this.element as any);

    const stopPropagation = (data: KeyboardEvent) => data.stopPropagation();

    // Since the form is in the dropdown panel which is a child of the toolbar, the toolbar's
    // keystroke handler would take over the key management in the URL input. We need to prevent
    // this ASAP. Otherwise, the basic caret movement using the arrow keys will be impossible.
    this.keystrokes.set("arrowright", stopPropagation);
    this.keystrokes.set("arrowleft", stopPropagation);
    this.keystrokes.set("arrowup", stopPropagation);
    this.keystrokes.set("arrowdown", stopPropagation);

    // Intercept the "selectstart" event, which is blocked by default because of the default behavior
    // of the DropdownView#panelView.
    // TODO: blocking "selectstart" in the #panelView should be configurable per–drop–down instance.
    this.listenTo(
      (this.videoURLInputView as any).element,
      "selectstart",
      (evt, domEvt) => {
        domEvt.stopPropagation();
      },
      { priority: "high" }
    );
  }

  /**
   * Focuses the fist {@link #_focusables} in the form.
   */
  focus() {
    this._focusCycler.focusFirst();
  }

  /**
   * The native DOM `value` of the {@link #urlInputView} element.
   *
   * **Note**: Do not confuse it with the {@link module:ui/inputtext/inputtextview~InputTextView#value}
   * which works one way only and may not represent the actual state of the component in the DOM.
   *
   * @type {Number}
   */
  get url() {
    return this.videoURLInputView.fieldView.element!.value.trim();
  }
  set url(url) {
    this.videoURLInputView.fieldView.element!.value = url.trim();
  }
  get width() {
    return this.videoWidthInputView.fieldView.element!.value.trim();
  }
  set width(width) {
    this.videoWidthInputView.fieldView.element!.value = width.trim();
  }
  get height() {
    return this.videoHeightInputView.fieldView.element!.value.trim();
  }
  set height(height) {
    this.videoHeightInputView.fieldView.element!.value = height.trim();
  }

  /**
   * Cleans up the supplementary error and information text of the {@link #urlInputView}
   * bringing them back to the state when the form has been displayed for the first time.
   *
   * See {@link #isValid}.
   */
  resetFormStatus() {
    this.videoURLInputView.errorText = null;
    this.videoWidthInputView.errorText = null;
    this.videoHeightInputView.errorText = null;
  }

  _createInputField(
    label: string,
    infoText: string,
    placeholder: string,
    value = ""
  ) {
    const labeledInput = new LabeledFieldView(
      this.locale,
      createLabeledInputText
    );
    const inputField = labeledInput.fieldView;

    labeledInput.label = label;
    labeledInput.infoText = infoText;

    inputField.placeholder = placeholder;
    if (inputField) inputField.value = value;

    return labeledInput;
  }

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
  _createButton(
    label: string,
    icon: string,
    className: string,
    eventName?: any
  ) {
    const button = new ButtonView(this.locale);

    button.set({
      label,
      icon,
      tooltip: true,
    });

    button.extendTemplate({
      attributes: {
        class: className,
      },
    });

    if (eventName) {
      button.delegate("execute").to(this, eventName);
    }

    return button;
  }
}
