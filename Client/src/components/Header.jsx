import {React, useState} from "react";
import { NavLink } from "react-router-dom";
import Info from "./Info";
import styles from '../css/Header.module.css'
function Header({currentUser}) {

  const [isShowInfo, setIsShowInfo] = useState(false);
  return (

    <header>
      <nav className={styles.nav}>
        <p className={styles.infoButtom} onClick={() => setIsShowInfo(prev => !prev)}>Hello <u>{currentUser.name}</u> 👨</p>
        <NavLink to="todos">Todos</NavLink>
        <NavLink to="posts">Posts</NavLink>
        <NavLink to="/login" onClick={() => localStorage.clear()}>Logout</NavLink>
        <NavLink to=".">🏠</NavLink>
      </nav>
      {isShowInfo && <Info setIsShowInfo={setIsShowInfo} currentUser={currentUser}/>}
    </header>
  );
}

export default Header;
