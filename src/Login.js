import swal from "sweetalert"
import logo from "./logo.svg"
import loading from "./loading.svg"
import styles from "./App.module.css"
import Button from "./Button"
import { shuffleArray, getRandomNumber } from "./utils"
import { useState,useEffect } from 'react';
import qs from 'qs';

const Login = () => {
  const [text, setText] = useState('Chargement en cours...');
  const [songsLoaded, setLoaded] = useState(false);

  function auth() {
    //TODO RANDOM STATE azertyuiopqsdfgh
    window.location.href = "https://accounts.spotify.com/authorize?client_id=19f97fed57f245de84614440dcd070b3&redirect_uri=http://localhost:3000/blindtest-spotify&response_type=code&scope=user-read-private user-read-email&state=azertyuiopqsdfgh";
  }

  useEffect(() => {
    auth();
  }, [])

  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <img src={loading} className={styles.appLogo} alt="logo" />
        <h1 className={styles.appTitle}>Bienvenue sur le Blindtest</h1>
        <p>{text}</p>
        <a className={styles.appLink} href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  )
}

export default Login
