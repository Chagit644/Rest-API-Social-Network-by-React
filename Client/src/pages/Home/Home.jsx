import React from 'react'
import { useOutletContext, Link } from 'react-router-dom'
import styles from '../../css/Home.module.css'
function Home() {

  const generalDataAndTools = useOutletContext();

  return (
    <>
      <h1 >Hello {generalDataAndTools.currentUser.name}</h1>
      <img src='../../../../images/people.png'></img>
      <div className={styles.todos}>
        <Link to="todos">Todos</Link>
      </div>
      <div className={styles.posts}>
        <Link to="posts">Posts</Link>
      </div>
    </>
  )
}

export default Home