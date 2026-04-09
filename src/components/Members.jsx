export default function Members({ members }) {
  return (
    <div className="container">
      <div className="page-header">
        <h2>👥 Library Members</h2>
        <p className="page-subtitle">Registered members of our library</p>
      </div>

      <div className="members-grid">
        {members.map((m) => (
          <div key={m.id} className="member-card">
            <div className="member-avatar">
              {m.name.charAt(0).toUpperCase()}
            </div>
            <div className="member-info">
              <h4>{m.name}</h4>
              <p className="member-id">Member ID: #{m.id.toString().padStart(4, '0')}</p>
            </div>
          </div>
        ))}
      </div>

      {members.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">👥</div>
          <h3>No members yet</h3>
          <p>Members will appear here once they register</p>
        </div>
      )}
    </div>
  );
}