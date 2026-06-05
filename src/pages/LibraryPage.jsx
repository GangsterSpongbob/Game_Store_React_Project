import { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { getGames, removeFromLibrary, incrementPlaytime } from '../services/api';

function LibraryPage() {
  const { user, setUser } = useUser();
  const [allGames, setAllGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState(null); // for modal

  useEffect(() => {
    async function fetchData() {
      if (!user) return;
      try {
        const games = await getGames();
        setAllGames(games);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [user]);

  // Get full game objects for games in user's library
  const ownedGames = allGames.filter(game =>
    user?.library?.some(entry => entry.gameId === game.id)
  );

  const openModal = (game) => {
    setSelectedGame(game);
  };

  const closeModal = () => {
    setSelectedGame(null);
  };

  const handlePlay = async () => {
    if (!user || !selectedGame) return;
    try {
      const updatedUser = await incrementPlaytime(user.id, selectedGame.id);
      setUser(updatedUser);
      // Keep modal open but update the displayed playtime
      // The modal will re-render because user changed
    } catch (err) {
      alert('Failed to update playtime');
    }
  };

  const handleRefund = async () => {
    if (!user || !selectedGame) return;
    try {
      const updatedUser = await removeFromLibrary(user.id, selectedGame.id);
      setUser(updatedUser);
      alert(`${selectedGame.title} removed from library.`);
      closeModal();
    } catch (err) {
      alert('Failed to remove game');
    }
  };

  if (!user) return <div>Please log in to view your library.</div>;
  if (loading) return <div>Loading library...</div>;

  return (
    <div>
      <h2>Library</h2>
      {ownedGames.length === 0 ? (
        <p>Your library is empty. Visit the Store to add games.</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          border: '1px solid black',
          padding: '16px'
        }}>
          {ownedGames.map(game => {
            const libraryEntry = user.library.find(entry => entry.gameId === game.id);
            return (
              <div
                key={game.id}
                onClick={() => openModal(game)}
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
                <p>Playtime: {libraryEntry?.playtime || 0} hrs</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal for game details + Play/Refund buttons */}
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
            <p><strong>Your playtime:</strong> {
              user.library.find(entry => entry.gameId === selectedGame.id)?.playtime || 0
            } hours</p>
            <button onClick={handlePlay} style={{ marginRight: '8px', backgroundColor: '#ccffcc' }}>Play (+1 hour)</button>
            <button onClick={handleRefund} style={{ marginRight: '8px', backgroundColor: '#ffcccc' }}>Refund (Remove)</button>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LibraryPage;