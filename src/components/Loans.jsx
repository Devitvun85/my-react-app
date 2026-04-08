export default function Loans({ loans, setLoans, books, setBooks }) {
  function borrow(book) {
    if (book.available <= 0) return;

    setLoans([...loans, { id: Date.getTime(), bookTitle: book.title }]);

    setBooks(
      books.map((b) =>
        b.id === book.id ? { ...b, available: b.available - 1 } : b,
      ),
    );
  }

  function returnBook(id, title) {
    setLoans(loans.filter((l) => l.id !== id));

    setBooks(
      books.map((b) =>
        b.title === title ? { ...b, available: b.available + 1 } : b,
      ),
    );
  }

  return (
    <div className="container">
      <h2>Borrow Books</h2>

      <div className="grid">
        {books.map((b) => (
          <div key={b.id} className="book-card">
            <img src={b.image} alt="" className="book-img" />
            <h4>{b.title}</h4>
            <p>{b.available} available</p>

            <button onClick={() => borrow(b)}>📖 Borrow</button>
          </div>
        ))}
      </div>

      <h3>My Loans</h3>

      {loans.map((l) => (
        <div key={l.id} className="loan-card">
          <span>📚 {l.bookTitle}</span>
          <button onClick={() => returnBook(l.id, l.bookId)}>Return</button>
        </div>
      ))}
    </div>
  );
}
