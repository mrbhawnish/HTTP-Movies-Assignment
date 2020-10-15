import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

const defaultValue = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const UpdateForm = (props) => {
  const { id } = useParams();
  const { push } = useHistory();
  const [movie, setMovie] = useState(defaultValue);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        console.log(res.data);
        setMovie(res.data);
      })
      .catch((err) => {
        console.log("err from get req in update", err);
      });
  }, [id]);

  const handleChanges = (e) => {
    e.persist();
    let value = e.target.value;
    if (e.target.name === "stars") {
      value = value.split(",");
      setMovie({ ...movie, [e.target.name]: value });
    } else {
      setMovie({ ...movie, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then((res) => {
        //   console.log(res)
        push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <form className="updateForm" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={movie.title || ""}
        onChange={handleChanges}
      />

      <input
        type="text"
        name="director"
        value={movie.director || ""}
        onChange={handleChanges}
      />

      <input
        type="number"
        name="metascore"
        value={movie.metascore || ""}
        onChange={handleChanges}
      />

      <input
        type="text"
        name="stars"
        value={movie.stars}
        onChange={handleChanges}
      />
      <button>Update Movie</button>
    </form>
  );
};

export default UpdateForm;
