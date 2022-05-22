interface ModalActionButtonsProps {
  submitText: string;
  isSubmitDisabled?: boolean;
  cancelText?: string;
  handleCancel(): void;
  handleSubmit?(): void;
}

export const ModalActionButtons = ({
  isSubmitDisabled,
  cancelText,
  submitText,
  handleCancel,
  handleSubmit,
}: ModalActionButtonsProps) => {
  return (
    <div className="form-actions" style={{ marginTop: '1rem' }}>
      <button type="button" className="btn btn-light" onClick={handleCancel}>
        {cancelText || 'Cancel'}
      </button>
      <button
        className="btn btn-info"
        type="submit"
        disabled={isSubmitDisabled}
        onClick={handleSubmit}
      >
        {submitText}
      </button>
    </div>
  );
};
