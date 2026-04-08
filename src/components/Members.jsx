export default function Members({ members }) {
  return (
    <div className="container">
      <h2>Members</h2>
      {members.map(m => (
        <div key={m.id} className="card">{m.name}</div>
      ))}
    </div>
  );
}