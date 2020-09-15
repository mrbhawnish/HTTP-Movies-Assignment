import React, {useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const initialState = {
    id: Date.now(),
    title: "",
    director: "",
    metascore: "",
    stars: []
  }

const AddMovie = (props) => {
  const [form, setForm] = useState(initialState)
  const {id} = useParams();
  const {push} = useHistory();
  const {go} = useHistory();

  const changeHandler = (e) => {
     
    let value = e.target.value;
  if(e.target.name === 'stars'){
   value = value.split(",")
  setForm(
    {...form,
     [e.target.name]: value
    }) 
    
  }else {
    setForm(
      {...form,
       [e.target.name]: value
      }) 
  }

  
    
  };

  const AddForm = (e) => {
      e.preventDefault();
      axios.post(`http://localhost:5000/api/movies`, form)
      .then((res) => { 
         console.log(res)
          push(`/`)
          go(0)
      })
      .catch((err) => console.log(err))
  }
  return(
  <div>
       
    <form onSubmit={AddForm}>
    <div>
   <input type="text" name="title" onChange={changeHandler} value={form.title}></input>
   </div>
   <div>
   <input type="text" name="director" onChange={changeHandler} value={form.director}></input>
   </div>
   <div>
   <input type="number" name="metascore" onChange={changeHandler} value={form.metascore}></input>
   </div>
   <div>
   <input
    type="text" 
    name="stars"
   onChange={changeHandler} 
   value={form.stars}>
   </input>
   </div>
   {/* <input type="text" name="starone" onChange="" value=""></input> */}
   <button type="submit">Update</button>
    </form>

  </div>
  );

}

export default AddMovie;