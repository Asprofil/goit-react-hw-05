import axios from 'axios';
import { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const response = await axios.get('https://api.themoviedb.org/3/trending/movie/day', {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYWRhMjdmOTc5MDhmM2U4MzIyY2VjYzNhZTI3Y2ZlNSIsIm5iZiI6MTcyMzM2NjE3MS45NjU3NDMsInN1YiI6IjY2Yjg3YTMzOTA0NWFhYTkwYTY0ZTAwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8wIx8tclIoGF884TXjqWRqiX9W6jB4xfKrtAv3pQvos`,
        },
      });
      setMovies(response.data.results);
    };

    fetchTrendingMovies();
  }, []);

  return <MovieList movies={movies} />;
}

export default HomePage;
