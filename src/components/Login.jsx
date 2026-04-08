// Login.jsx
export default function Login({ onLogin }) {
  return (
    <div className="login-page">
      <div className="circle one"></div>
      <div className="circle two"></div>
      <div className="login-card">
        <div className="logo">📚</div>
        <h1>Library Pro</h1>
        <p>Please select your access level</p>
        <div className="login-buttons">
          <button className="staff" onClick={() => onLogin("staff")}>Login as Staff</button>
          <button className="member" onClick={() => onLogin("member")}>Login as Member</button>
        </div>
      </div>
    </div>
  );
}