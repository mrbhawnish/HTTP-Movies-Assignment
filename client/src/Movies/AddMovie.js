import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const defaultValue = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const AddMovie = () => {
  const [newMovie, setNewMovie] = useState(defaultValue);

  const handleChanges = (e) => {
    e.persist();
    let value = e.target.value;
    if (e.target.name === "stars") {
      value = value.split(",");
      setNewMovie({...newMovie,
        [e.target.name]: value,
      });
    } else {
      setNewMovie({...newMovie,
        [e.target.name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/movies", newMovie)
     .then((res) => {
         console.log(res)
     })
     .catch((err) => {
        console.log(err)
     })
  };

  return (
      <>
    <h1 style={{textAlign: "center"}}>Add A New Movie</h1>
    <form style={{display: "flex", 
        flexDirection: "column", 
        alignItems: "center",
         minWidth: "50%"}}  
        onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="title"
        name="title"
        value={newMovie.title || ""}
        onChange={handleChanges}
      />

      <input
        type="text"
        placeholder="director"
        name="director"
        value={newMovie.director || ""}
        onChange={handleChanges}
      />

      <input
        type="number"
        name="metascore"
        placeholder="metascore"
        value={newMovie.metascore || ""}
        onChange={handleChanges}
      />

      <input
        type="text"
        name="stars"
        placeholder="Stars separate by comas"
        value={newMovie.stars}
        onChange={handleChanges}
      />
      <button>Update Movie</button>
    </form>
    </>
  );
};

export default AddMovie;
