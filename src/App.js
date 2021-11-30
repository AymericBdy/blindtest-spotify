import swal from "sweetalert"
import logo from "./logo.svg"
import loading from "./loading.svg"
import styles from "./App.module.css"
import Button from "./Button"
import { shuffleArray, getRandomNumber } from "./utils"
import { useState,useEffect } from 'react';

// Get token from https://developer.spotify.com/console/get-current-user-saved-tracks/
const apiToken = "BQAIz7-3ruV0EVDIt82z7a9YJrDx6POFpZotllBUwY07X98hSvJPQkEgFLJUJ4DY6otWeetT2Dd84rrO1l6SsAiobdqDxXGK3f5dNFWBHVmIcV-rBCEzfuALIksr2Dz6re1PPFoKy_cWAr7LZ8gf53FH9lW3yESRWNbmFXUClgbY0WOv"

const AlbumCover = (props) =>  {
  const src = props.track.album.images[0].url;
  return (
      <img src={src} style={{ width: 400, height: 400 }} />
  );
}

const App = () => {
  const [text, setText] = useState('Chargement en cours...');
  const [tracks, setTracks] = useState([]);
  const [songsLoaded, setLoaded] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useState(1);
  const [prevTrack, setPrevTrack] = useState({});
  const [currentTrack, setCurrentTrack] = useState({});
  const [nextTrack, setNextTrack] = useState({});

  function checkAnswer(answer) {
    if(answer == currentTrackId) {
      swal('Bravo', 'Gg !', 'success');
    } else {
      swal('Raté', 'Nul...', 'error');
    }
  }

  useEffect(() => {
    fetch("https://api.spotify.com/v1/playlists/3f4tVz4oV9AVcMMyShLt3O/tracks", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + apiToken,
      },
    })
      .then(response => response.json())
      .then(data => {
        setText("Donnée spotify reçues !");
        setTracks(data.items);

        setCurrentTrackId(getRandomNumber(3));

        setPrevTrack(data.items[getRandomNumber(data.items.length)].track);
        setCurrentTrack(data.items[getRandomNumber(data.items.length)].track);
        setNextTrack(data.items[getRandomNumber(data.items.length)].track);
        setLoaded(true);
        console.log("Réponse reçue ! Voilà ce que j'ai reçu : ", data)
      })
  }, [])

  if(!songsLoaded) {
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
  } else {
    return (
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <img src={logo} className={styles.appLogo} alt="logo" />
          <h1 className={styles.appTitle}>Bienvenue sur le Blindtest</h1>
          <p>{text}</p>
          <p>Nombre de morceaux reçu : {tracks.length}</p>

          <audio controls autoPlay src={currentTrack.preview_url} /> <br />

          <AlbumCover track={prevTrack} />
          <Button onClick={() => checkAnswer(0)}>{prevTrack.name}</Button>

          <AlbumCover track={currentTrack} />
          <Button onClick={() => checkAnswer(1)}>{currentTrack.name}</Button>

          <AlbumCover track={nextTrack} />
          <Button onClick={() => checkAnswer(2)}>{nextTrack.name}</Button>

          <a className={styles.appLink} href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
        </header>
      </div>
    )
  }
}

export default App
