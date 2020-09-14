import React, {useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const initialState = {
    title: "",
    director: "",
    metascore: "",
    stars: []
  }

const UpdateMovie = (props) => {
  const [form, setForm] = useState(initialState)
  const {id} = useParams();
  const {push} = useHistory();
  const {go} = useHistory();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${id}`)
    .then((res) => setForm(res.data))
    .catch(err => console.log(err))
  },[id])

  const changeHandler = (e) => {
      e.persist()

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

  const updateForm = (e) => {
      e.preventDefault();
     
      axios.put(`http://localhost:5000/api/movies/${id}`, form)
      .then((res) => { 
         console.log(res)
          push(`/`)
          go(0)
      })
      .catch((err) => console.log(err))
  }
  return(
  <div>
       
    <form onSubmit={updateForm}>
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
   <button type="button" onClick={updateForm}>Update</button>
    </form>
    
  </div>
  );

}

export default UpdateMovie;