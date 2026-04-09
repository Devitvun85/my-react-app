export default function Navbar({ setPage, setUser, user, currentPage }) {
  return (
    <div className="navbar">
      <div className="navbar-brand">
        <span className="navbar-icon">📚</span>
        <h3>Library Management System</h3>
      </div>
      
      <div className="navbar-menu">
        <button
          className={currentPage === "books" ? "active" : ""}
          onClick={() => setPage("books")}
        >
          📖 Books
        </button>
        {user === "staff" && (
          <button
            className={currentPage === "members" ? "active" : ""}
            onClick={() => setPage("members")}
          >
            👥 Members
          </button>
        )}
        <button
          className={currentPage === "loans" ? "active" : ""}
          onClick={() => setPage("loans")}
        >
          {user === "staff" ? "📊 Loan History" : "📋 My Loans"}
        </button>
      </div>

      <div className="navbar-actions">
        <span className="user-badge">{user === "staff" ? "👔 Staff" : "👤 Member"}</span>
        <button className="logout-btn" onClick={() => setUser(null)}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
}