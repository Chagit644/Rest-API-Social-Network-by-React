import React, { useState } from 'react'
import { json, useLocation, useNavigate } from 'react-router-dom'
import styles from '../../css/Signup.module.css'
import { date } from 'joi';

function UserDetailsEntry() {

  const navigate = useNavigate();
  const location = useLocation();

  const [input, setInput] = useState({
    name: "",
    username: location.state.username,
    email: "",
    phone: "",
    city: "",
    company: "",
    password:location.state.password
  });

  function handleSubmit(e) {
    e.preventDefault();
    createNewUser();

    async function createNewUser() {
      try {
        debugger;
        const response = await fetch(`http://localhost:1234/users`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(input),
        })
        //let help=response.json;
        //console.log(help);
        //console.log(response.json());
        const data = await response.json();
        console.log(data[0]);
        localStorage.setItem('currentUser', JSON.stringify(data[0][0]))
        navigate(`/users/${data[0][0].id}/home`);
      }
      catch {
        alert("An error occurred. Please try again ")
      }
    }
  }

  return (
    <>
      <h2>Please complete your details for registration:</h2>
      <form className={styles.detailsContainer} onSubmit={handleSubmit}>
        <div>
          <label><b>Name</b></label>
          <input
            value={input.name}
            onChange={(e) => setInput({ ...input, name: e.target.value })}
            type="text"
            name="name"
            placeholder="Israel Israeli"
            required
          />
          <label><b>Email</b></label>
          <input
            value={input.email}
            onChange={(e) => setInput({ ...input, email: e.target.value })}
            type="email"
            name="email"
            placeholder="Israel@gmail.com"
            required
          />
          <h4>Company</h4>
          <input
            value={input.company}
            onChange={(e) => setInput({ ...input, company: e.target.value })}
            type="text"
            name="name"
            placeholder="Intel"
          />
        </div>
        <div>
          <label>City</label>
          <input
            value={input.city}
            onChange={(e) => setInput({ ...input, city:e.target.value})}
            type="text"
            name="city"
            placeholder="Jerusalem"
            required
          />
          <label>Phone</label>
          <input
            value={input.phone}
            onChange={(e) => setInput({ ...input, phone: e.target.value })}
            type="phone"
            name="phone"
            placeholder="0527613248"
            required
          />
          <button type='submit'>Submit</button>
        </div>
      </form>
    </>
  )
}

export default UserDetailsEntry
