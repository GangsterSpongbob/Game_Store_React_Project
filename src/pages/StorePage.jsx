import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getGames, addToLibrary } from '../services/api';
import { useUser } from '../context/UserContext';
import GameCard from '../components/GameCard';

function StorePage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState(null);
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchGames() {
      try {
        const allGames = await getGames();
        setGames(allGames.slice(0, 6));
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

  const handleAddToLibrary = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      const updatedUser = await addToLibrary(user.id, selectedGame.id);
      setUser(updatedUser);
      alert(`${selectedGame.title} added to your library!`);
      closeModal();
    } catch (err) {
      alert(err.message);
    }
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