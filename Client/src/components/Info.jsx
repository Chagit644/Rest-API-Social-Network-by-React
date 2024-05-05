import React from 'react'
import styles from '../css/Info.module.css'

function Info({ currentUser, setIsShowInfo }) {

  return (
    <div className={styles.back}>
      <div className={styles.infoWrapper}>
        <button className={styles.xButton} onClick={() => setIsShowInfo(prev => !prev)}>❌</button>
        <ul>
          <li><h3><u> {currentUser.username}</u></h3></li>
          <li><b>Name: </b>{currentUser.name}</li>
          <li><b>Email: </b>{currentUser.email}</li>
          <li><b>Phone: </b>{currentUser.phone}</li>
          <li><b>City: </b>{currentUser.city}</li>
          <li><b>Company: </b>{currentUser.company}</li>
          
        </ul>
      </div>
    </div>
  )
}

export default Info