import "./Style/App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Books from "./components/Books";
import Members from "./components/Members";
import Loans from "./components/Loans";
import { useState, useEffect } from "react";

export default function App() {
  const [user, setUser] = useState(() => localStorage.getItem("libraryUser") || null);
  const [page, setPage] = useState("books");
  useEffect(() => {
    if (user) {
      localStorage.setItem("libraryUser", user);
    } else {
      localStorage.removeItem("libraryUser");
    }
  }, [user]);
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "1984",
      author: "George Orwell",
      total: 5,
      available: 5,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400"
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      total: 3,
      available: 3,
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400"
    },
    {
      id: 3,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      total: 4,
      available: 4,
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400"
    }
  ]);

  const [members] = useState([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Mike Johnson" }
  ]);

  const [loans, setLoans] = useState([]);

  if (!user) return <Login onLogin={setUser} />;

  function renderPage() {
    if (page === "books")
      return (
        <Books
          books={books}
          setBooks={setBooks}
          user={user}
          loans={loans}
          setLoans={setLoans}
        />
      );
    if (page === "members") return <Members members={members} />;
    if (page === "loans")
      return (
        <Loans
          loans={loans}
          setLoans={setLoans}
          books={books}
          setBooks={setBooks}
          user={user}
        />
      );
  }

  return (
    <div className="app">
      <Navbar setPage={setPage} setUser={setUser} user={user} currentPage={page} />
      {renderPage()}
    </div>
  );
}