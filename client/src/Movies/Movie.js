import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie(props) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();
  const {go} = useHistory();
  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };
  const item = props.movies.find(
    (movie) => `${movie.id}` === params.id
  );

  
  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  const deleteMovie = () => {
    axios
    .delete(`http://localhost:5000/api/movies/${params.id}`)
    .then((res) => {
      push("/")
     go(0)
    })
    .catch((err) => console.log(err.response));
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button className="edit-button" onClick={() => push(`/update-movie/${item.id}`)}>Update</button>
      <button className="delete-button" onClick={deleteMovie}>Delete</button>
    </div>
  );
}

export default Movie;
