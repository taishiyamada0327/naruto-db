import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const limit = 20;
  useEffect(() => {
    fetchCharacters(1);
  }, []);

  const fetchCharacters = async (page) => {
    const apiUrl = 'https://narutodb.xyz/api/character';

    setIsLoading(true);
    const result = await axios.get(apiUrl, { params: { page, limit } });
    setCharacters(result.data.characters);
    setIsLoading(false);
  };

  const handlePrev = () => {
    const prevPage = page - 1;
    fetchCharacters(prevPage);
    setPage(prevPage);
  };

  const handleNext = () => {
    const nextPage = page + 1;
    fetchCharacters(nextPage);
    setPage(nextPage);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="header-content">
          <img src="logo.png" alt="logo" className="logo" />
        </div>
      </div>
      {isLoading ? (
        <div>Now Loading...</div>
      ) : (
        <main>
          <div className="cards-container">
            {characters.map((character) => {
              return (
                <div className="card" key={character.id}>
                  <img
                    src={character.images[0] ?? 'dummy.png'}
                    alt="character"
                    className="card-image"
                  />
                  <div className="card-container">
                    <h3 className="card-title">{character.name}</h3>
                    <p className="card-description">
                      {character.debut?.appearsIn ?? 'なし'}
                    </p>
                    <div className="card-footer">
                      <span className="affiliation">
                        {character.personal?.affiliation ?? 'なし'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ページネーションを実装 */}
          <div className="pager">
            <button className="prev" disabled={page === 1} onClick={handlePrev}>
              Previous
            </button>
            <span className="page-number">{page}</span>
            <button
              className="next"
              disabled={limit > characters.length}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
