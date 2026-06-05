function StorePage() {
  // Simple grid: 2 rows, 3 columns
  const games = [1, 2, 3, 4, 5, 6];

  return (
    <div>
      <h2>Store</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        border: '1px solid black',
        padding: '16px'
      }}>
        {games.map((id) => (
          <div key={id} style={{ border: '1px solid black', padding: '16px', textAlign: 'center' }}>
            Game {id}<br />
            <button disabled>Add to Library</button> {/* disabled for now */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StorePage;