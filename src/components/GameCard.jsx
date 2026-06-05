function GameCard({ game, onClick }) {
  return (
    <div
      onClick={() => onClick(game)}
      style={{
        border: '1px solid black',
        padding: '16px',
        textAlign: 'center',
        cursor: 'pointer'
      }}
    >
      <img
        src={game.image}
        alt={game.title}
        style={{ width: '100%', height: 'auto', maxHeight: '150px', objectFit: 'cover' }}
      />
      <h3>{game.title}</h3>
      <p>${game.price}</p>
    </div>
  );
}

export default GameCard;