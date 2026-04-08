import { useState } from "react";
import "./App.css";

import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Books from "./components/Books";
import Members from "./components/Members";
import Loans from "./components/Loans";

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("books");

  const [books, setBooks] = useState([
  {
    id: 1,
    title: "1984",
    author: "George Orwell",
    total: 5,
    available: 5,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f"
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    total: 3,
    available: 3,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794"
  }
]);

  const [members] = useState([
    { id: 1, name: "John Doe" },
  ]);

  const [loans, setLoans] = useState([]);

  if (!user) return <Login onLogin={setUser} />;

  function renderPage() {
    if (page === "books")
      return <Books books={books} setBooks={setBooks} />;
    if (page === "members") return <Members members={members} />;
    if (page === "loans")
      return <Loans loans={loans} setLoans={setLoans} books={books} setBooks={setBooks} />;
  }

  return (
    <div className="app">
      <Navbar setPage={setPage} setUser={setUser} />
      {renderPage()}
    </div>
  );
}