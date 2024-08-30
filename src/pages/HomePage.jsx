import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../components/MovieList';

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/trending/movie/day', {
          headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYWRhMjdmOTc5MDhmM2U4MzIyY2VjYzNhZTI3Y2ZlNSIsIm5iZiI6MTcyMzM2NjE3MS45NjU3NDMsInN1YiI6IjY2Yjg3YTMzOTA0NWFhYTkwYTY0ZTAwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8wIx8tclIoGF884TXjqWRqiX9W6jB4xfKrtAv3pQvos` },
        });
        setMovies(response.data.results);
      } catch (err) {
        setError('Failed to load trending movies. Please try again later.');
      }
    };

    fetchTrendingMovies();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return <MovieList movies={movies} />;
}

export default HomePage;
