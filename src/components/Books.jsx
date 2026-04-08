import { useState } from "react";

export default function Books({ books, setBooks }) {
  const [form, setForm] = useState({ title: "", author: "", total: 1 });
  const [editId, setEditId] = useState(null);

  function saveBook() {
    if (editId) {
      setBooks(books.map(b => b.id === editId ? { ...b, ...form } : b));
      setEditId(null);
    } else {
      setBooks([...books, {
        ...form,
        id: Date.now(),
        available: form.total
      }]);
    }
    setForm({ title: "", author: "", total: 1 });
  }

  function editBook(b) {
    setForm(b);
    setEditId(b.id);
  }

  function deleteBook(id) {
    setBooks(books.filter(b => b.id !== id));
  }

  return (
    <div className="container">
      <h2>Books</h2>

      <div className="form">
        <input placeholder="Title" value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })} />

        <input placeholder="Author" value={form.author}
          onChange={e => setForm({ ...form, author: e.target.value })} />

        <input type="number" value={form.total}
          onChange={e => setForm({ ...form, total: Number(e.target.value) })} />

        <button onClick={saveBook}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      {books.map(b => (
  <div key={b.id} className="book-card">
    
    {/* IMAGE */}
    <img src={b.image} alt={b.title} className="book-img" />

    {/* INFO */}
    <div className="book-info">
      <h3>{b.title}</h3>
      <p>{b.author}</p>
      <span>{b.available}/{b.total} available</span>

      <div className="actions">
        <button onClick={() => editBook(b)}>Edit</button>
        <button onClick={() => deleteBook(b.id)}>Delete</button>
      </div>
    </div>

  </div>
))}
    </div>
  );
}