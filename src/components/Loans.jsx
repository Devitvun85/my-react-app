export default function Loans({ loans, setLoans, books, setBooks, user }) {
  function returnBook(loanId, bookId) {
    setLoans(loans.filter((l) => l.id !== loanId));
    setBooks(
      books.map((b) =>
        b.id === bookId ? { ...b, available: b.available + 1 } : b,
      ),
    );
  }

  // Member view - show only their loans
  if (user === "member") {
    return (
      <div className="container">
        <div className="page-header">
          <h2>📋 My Loans</h2>
          <p className="page-subtitle">Books you have borrowed</p>
        </div>

        {loans.length > 0 ? (
          <div className="loans-list">
            {loans.map((l) => (
              <div key={l.id} className="loan-card">
                <img src={l.bookImage} alt={l.bookTitle} className="loan-img" />
                <div className="loan-details">
                  <h4>{l.bookTitle}</h4>
                  <p className="loan-author">by {l.bookAuthor}</p>
                  <p className="loan-date">Borrowed: {l.borrowDate}</p>
                  <p className="loan-date">Due: {l.dueDate}</p>
                </div>
                <button
                  className="btn-return"
                  onClick={() => returnBook(l.id, l.bookId)}
                >
                  ↩️ Return
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📖</div>
            <h3>No active loans</h3>
            <p>
              You haven't borrowed any books yet. Go to Books page to borrow!
            </p>
          </div>
        )}
      </div>
    );
  }

  // Staff view - show all loans with dates
  return (
    <div className="container">
      <div className="page-header">
        <h2>📊 Loan History</h2>
        <p className="page-subtitle">All active book loans</p>
      </div>

      {loans.length > 0 ? (
        <div className="loan-table">
          <div className="loan-table-header">
            <div>Book</div>
            <div>Borrower</div>
            <div>Borrow Date</div>
            <div>Due Date</div>
            <div>Action</div>
          </div>
          {loans.map((l) => (
            <div key={l.id} className="loan-table-row">
              <div className="loan-book-info">
                <img
                  src={l.bookImage}
                  alt={l.bookTitle}
                  className="loan-table-img"
                />
                <div>
                  <strong>{l.bookTitle}</strong>
                  <p>{l.bookAuthor}</p>
                </div>
              </div>
              <div>{l.borrower}</div>
              <div>{l.borrowDate}</div>
              <div>{l.dueDate}</div>
              <div>
                <button
                  className="btn-return-small"
                  onClick={() => returnBook(l.id, l.bookId)}
                >
                  Mark Returned
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">📊</div>
          <h3>No active loans</h3>
          <p>No books are currently borrowed</p>
        </div>
      )}
    </div>
  );
}
