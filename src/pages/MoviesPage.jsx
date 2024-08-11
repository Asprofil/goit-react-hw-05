import axios from 'axios';
import { useState } from 'react';
import MovieList from '../components/MovieList';

function MoviesPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYWRhMjdmOTc5MDhmM2U4MzIyY2VjYzNhZTI3Y2ZlNSIsIm5iZiI6MTcyMzM2NjE3MS45NjU3NDMsInN1YiI6IjY2Yjg3YTMzOTA0NWFhYTkwYTY0ZTAwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8wIx8tclIoGF884TXjqWRqiX9W6jB4xfKrtAv3pQvos`,
      },
    });
    setMovies(response.data.results);
  };

  return (
    <div>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      <MovieList movies={movies} />
    </div>
  );
}

export default MoviesPage;
