export default function Navbar({ setPage, setUser }) {
  return (
    <div className="navbar">
      <h3>📚 Library System</h3>
      <div>
        <button onClick={() => setPage("books")}>Books</button>
        <button onClick={() => setPage("members")}>Members</button>
        <button onClick={() => setPage("loans")}>Loans</button>
        <button onClick={() => setUser(null)}>Logout</button>
      </div>
    </div>
  );
}