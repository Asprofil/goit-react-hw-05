import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYWRhMjdmOTc5MDhmM2U4MzIyY2VjYzNhZTI3Y2ZlNSIsIm5iZiI6MTcyMzM2NjE3MS45NjU3NDMsInN1YiI6IjY2Yjg3YTMzOTA0NWFhYTkwYTY0ZTAwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8wIx8tclIoGF884TXjqWRqiX9W6jB4xfKrtAv3pQvos`,
        },
      });
      setCast(response.data.cast);
    };

    fetchCast();
  }, [movieId]);

  return (
    <div>
      <h2>Cast</h2>
      <ul>
        {cast.map(member => (
          <li key={member.cast_id}>
            <img 
              src={member.profile_path 
                ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                : 'https://via.placeholder.com/200x300'} 
              alt={member.name} 
            />
            <p>{member.name}</p>
            <p>Character: {member.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieCast;
