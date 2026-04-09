export default function BorrowModal({ book, onConfirm, onCancel }) {
  const dueDate = new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString();

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h2>📚 Confirm Borrow</h2>
          <button className="modal-close" onClick={onCancel}>✕</button>
        </div>

        <div className="modal-body">
          <img src={book.image} alt={book.title} className="modal-book-img" />
          <div className="modal-book-details">
            <h3>{book.title}</h3>
            <p className="modal-author">by {book.author}</p>
            <div className="modal-info-row">
              <span className="modal-label">📅 Borrow Date:</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
            <div className="modal-info-row">
              <span className="modal-label">⏰ Due Date:</span>
              <span className="modal-due">{dueDate}</span>
            </div>
            <div className="modal-info-row">
              <span className="modal-label">📖 Available:</span>
              <span>{book.available} copies left</span>
            </div>
          </div>
        </div>

        <p className="modal-note">You have <strong>14 days</strong> to return this book.</p>

        <div className="modal-actions">
          <button className="btn-cancel-modal" onClick={onCancel}>
            ✕ Cancel
          </button>
          <button className="btn-confirm-modal" onClick={onConfirm}>
            📚 Confirm Borrow
          </button>
        </div>
      </div>
    </div>
  );
}