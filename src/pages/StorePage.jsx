import { useEffect, useState } from 'react';
import { getGames } from '../services/api';
import GameCard from '../components/GameCard';

function StorePage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState(null); // for modal

  useEffect(() => {
    async function fetchGames() {
      try {
        const allGames = await getGames();
        setGames(allGames.slice(0, 6)); // first 6 games
      } catch (err) {
        console.error('Failed to fetch games', err);
      } finally {
        setLoading(false);
      }
    }
    fetchGames();
  }, []);

  const openModal = (game) => {
    setSelectedGame(game);
  };

  const closeModal = () => {
    setSelectedGame(null);
  };

  const handleAddToLibrary = () => {
    // Placeholder: later we'll implement adding to user's library
    alert(`Added ${selectedGame.title} to library (not yet implemented)`);
    closeModal();
  };

  if (loading) return <div>Loading games...</div>;

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
        {games.map(game => (
          <GameCard key={game.id} game={game} onClick={openModal} />
        ))}
      </div>

      {/* Modal (floating window) */}
      {selectedGame && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }} onClick={closeModal}>
          <div style={{
            backgroundColor: 'white',
            border: '2px solid black',
            padding: '20px',
            maxWidth: '400px',
            width: '90%'
          }} onClick={(e) => e.stopPropagation()}>
            <h2>{selectedGame.title}</h2>
            <p><strong>Genre:</strong> {selectedGame.genre}</p>
            <p><strong>Price:</strong> ${selectedGame.price}</p>
            <p>{selectedGame.description}</p>
            <button onClick={handleAddToLibrary} style={{ marginRight: '8px' }}>Add to Library</button>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StorePage;