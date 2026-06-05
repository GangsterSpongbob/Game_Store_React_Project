function LibraryPage() {
  const games = [1, 2, 3, 4, 5, 6];

  return (
    <div>
      <h2>Library</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        border: '1px solid black',
        padding: '16px'
      }}>
        {games.map((id) => (
          <div key={id} style={{ border: '1px solid black', padding: '16px', textAlign: 'center' }}>
            Owned Game {id}<br />
            <button disabled>Play</button>
            <button disabled>Refund</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LibraryPage;