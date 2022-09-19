type ConfirmDialogType = {
    question: string
    onAccept: () => void
    onDecline: () => void
}
export default function ConfirmDialog({ question, onAccept, onDecline }: ConfirmDialogType) {
    return (
        <div className="confirm-dialog dialog">
            <p>{question}</p>
            <div className="manage-confirm-btns">
                <button
                    name="confirm-cancel"
                    className="confirm-cancel"
                    onClick={onDecline}
                >Cancel</button>
                <button
                    name="confirm-ok"
                    className="confirm-ok"
                    onClick={onAccept}
                    autoFocus
                >OK</button>
            </div>
        </div>
    );
}