import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link, Outlet } from 'react-router-dom';
import axios from 'axios';

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYWRhMjdmOTc5MDhmM2U4MzIyY2VjYzNhZTI3Y2ZlNSIsIm5iZiI6MTcyMzM2NjE3MS45NjU3NDMsInN1YiI6IjY2Yjg3YTMzOTA0NWFhYTkwYTY0ZTAwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8wIx8tclIoGF884TXjqWRqiX9W6jB4xfKrtAv3pQvos` },
        });
        setMovie(response.data);
      } catch (err) {
        setError('Failed to load movie details. Please try again later.');
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(location.state?.from || '/movies');
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <button onClick={handleGoBack}>Go back</button>
      {movie && (
        <>
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <nav>
            <Link to="cast" state={{ from: location.state?.from }}>Cast</Link>
            <Link to="reviews" state={{ from: location.state?.from }}>Reviews</Link>
          </nav>
          <Outlet />
        </>
      )}
    </div>
  );
}

export default MovieDetailsPage;
