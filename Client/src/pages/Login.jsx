import { React, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../css/Login.module.css'
function Login() {
  const navigate = useNavigate();
  const [input, setInput] = useState({ username: '', password: '' });
  function handleSubmit(e) {
    e.preventDefault();
    getUserData();

    async function getUserData() {
      try {
        const response = await fetch(`http://localhost:1234/users/login`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(input)
        });
        if (response.status == 500) {
          alert("Invalid username or password");
        }
        if (response.status == 200) {
          const user = await response.json();
          localStorage.setItem("currentUser", JSON.stringify(user[0]));
          navigate(`/users/${user[0].id}/home`)//bgbdfbd
        }
        else if (response.status == 404) {
          alert("Incorrect username or password.")
          setInput({ username: '', password: '' })
        }
      }
      catch {
        alert("An error occurred!. Please try again ")
      }
    };

  }
  return (
    <>
      <h1>Login</h1>
      <form className={styles.loginContainer} onSubmit={handleSubmit}>
        <label >Username</label>
        <input value={input.username} onChange={(e) => setInput({ ...input, username: e.target.value })} type="text" name='username' placeholder='Israel123' required />
        <label>Password</label>
        <input value={input.password} onChange={(e) => setInput({ ...input, password: e.target.value })} type="Password" placeholder='*********' required />
        <button type='submit'>Submit</button>
        <br />
        <span>Don't have an account?</span>
        <Link to='/signup'> Please sign up</Link>
      </form>
    </>
  )
}

export default Login