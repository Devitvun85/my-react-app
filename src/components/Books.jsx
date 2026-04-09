import { useState } from "react";
import BorrowModal from "./BorrowModal";

export default function Books({ books, setBooks, user, loans, setLoans }) {
  const [form, setForm] = useState({ title: "", author: "", total: 1 });
  const [editId, setEditId] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

  function saveBook() {
    if (!form.title.trim() || !form.author.trim()) {
      alert("Please fill in all fields");
      return;
    }

    if (editId) {
      setBooks(
        books.map((b) =>
          b.id === editId ? { ...b, ...form, total: Number(form.total) } : b
        )
      );
      setEditId(null);
    } else {
      setBooks([
        ...books,
        {
          ...form,
          id: crypto.randomUUID(),
          total: Number(form.total),
          available: Number(form.total),
          image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400"
        }
      ]);
    }
    setForm({ title: "", author: "", total: 1 });
  }

  function editBook(b) {
    setForm({ title: b.title, author: b.author, total: b.total });
    setEditId(b.id);
  }

  function deleteBook(id) {
    if (window.confirm("Are you sure you want to delete this book?")) {
      setBooks(books.filter((b) => b.id !== id));
    }
  }

  function cancelEdit() {
    setForm({ title: "", author: "", total: 1 });
    setEditId(null);
  }

  function borrow(book) {
    if (book.available <= 0) {
      alert("Sorry, this book is not available right now!");
      return;
    }
    setSelectedBook(book);
  }

  function confirmBorrow() {
    const book = selectedBook;
    const borrowDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    setLoans([
      ...loans,
      {
        id: crypto.randomUUID(),
        bookId: book.id,
        bookTitle: book.title,
        bookAuthor: book.author,
        bookImage: book.image,
        borrowDate: borrowDate.toLocaleDateString(),
        dueDate: dueDate.toLocaleDateString(),
        borrower: user === "staff" ? "Staff Member" : "Library Member"
      }
    ]);

    setBooks(
      books.map((b) =>
        b.id === book.id ? { ...b, available: b.available - 1 } : b
      )
    );

    setSelectedBook(null);
  }

  return (
    <div className="container">
      {selectedBook && (
        <BorrowModal
          book={selectedBook}
          onConfirm={confirmBorrow}
          onCancel={() => setSelectedBook(null)}
        />
      )}

      <div className="page-header">
        <h2>📚 Book Management</h2>
        <p className="page-subtitle">
          {user === "staff" ? "Manage your library collection" : "Browse available books"}
        </p>
      </div>

      {user === "staff" && (
        <div className="form">
          <input
            placeholder="Book Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            placeholder="Author Name"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
          />
          <input
            type="number"
            placeholder="Total Copies"
            min="1"
            value={form.total}
            onChange={(e) => setForm({ ...form, total: Number(e.target.value) })}
          />
          <div className="form-actions">
            <button className="btn-primary" onClick={saveBook}>
              {editId ? "💾 Update" : "➕ Add Book"}
            </button>
            {editId && (
              <button className="btn-secondary" onClick={cancelEdit}>
                ✖ Cancel
              </button>
            )}
          </div>
        </div>
      )}

      <div className="grid">
        {books.map((b) => (
          <div key={b.id} className="book-card">
            <div className="book-image-wrapper">
              <img src={b.image} alt={b.title} className="book-img" />
              <div className="book-badge">
                {b.available}/{b.total} available
              </div>
            </div>
            <div className="book-info">
              <h3>{b.title}</h3>
              <p className="book-author">{b.author}</p>

              {user === "staff" ? (
                <>
                  <div className="availability-bar">
                    <div
                      className="availability-fill"
                      style={{ width: `${(b.available / b.total) * 100}%` }}
                    ></div>
                  </div>
                  <div className="actions">
                    <button className="btn-edit" onClick={() => editBook(b)}>
                      ✏️ Edit
                    </button>
                    <button className="btn-delete" onClick={() => deleteBook(b.id)}>
                      🗑️ Delete
                    </button>
                  </div>
                </>
              ) : (
                <button
                  className={`btn-borrow ${b.available === 0 ? "disabled" : ""}`}
                  onClick={() => borrow(b)}
                  disabled={b.available === 0}
                >
                  {b.available === 0 ? "📕 Out of Stock" : "📚 Borrow Now"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {books.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📚</div>
          <h3>No books yet</h3>
          <p>Add your first book to get started!</p>
        </div>
      )}
    </div>
  );
}