export default function Login({ onLogin }) {
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="logo">📚</div>
        <h1>Library System</h1>
        <p>Welcome! Please select your role to continue</p>
        
        <div className="login-buttons">
          <button className="staff" onClick={() => onLogin("staff")}>
            👔 Login as Staff
          </button>
          <button className="member" onClick={() => onLogin("member")}>
            👤 Login as Member
          </button>
        </div>
      </div>
    </div>
  );
}