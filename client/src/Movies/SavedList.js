import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function SavedList({ list }) {
  return (
    <div className="saved-list">
      <h3>Saved Movies:</h3>
      {list.map((movie, i) => {
        return (
          <NavLink
            to={`/movies/${movie.id}`}
            key={i}
            activeClassName="saved-active"
          >
            <span key={i} className="saved-movie">{movie.title}</span>
          </NavLink>
        );
      })}
      <div className="home-button">
        <Link to="/">Home</Link>
       
      </div>
      <div className="add-movie">
      <Link to="/add-movie">Add Movie</Link>
      </div>
    </div>
  );
}

export default SavedList;
