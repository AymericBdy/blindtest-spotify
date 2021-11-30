import swal from "sweetalert"
import logo from "./logo.svg"
import loading from "./loading.svg"
import styles from "./App.module.css"
import Button from "./Button"
import { shuffleArray, getRandomNumber } from "./utils"
import { useState,useEffect } from 'react';
import qs from 'qs';

// Get token from https://developer.spotify.com/console/get-current-user-saved-tracks/
const apiToken = "BQBXqema5oOTuNq4_aDxffWc_Ucy96iVxjoI5csEaz7mZIgrBKzchNlE9jppwMAfmtIAdOTMvhZNDTULvpw"

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

  function auth(code) {
    var details = {
      "grant_type": "authorization_code",
      "code": code,
      "redirect_uri": "http://localhost:3000/blindtest-spotify"
    };
    
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: "Basic " + "MTlmOTdmZWQ1N2YyNDVkZTg0NjE0NDQwZGNkMDcwYjM6MGVjYmU3NzMxN2MxNDg1NjgzMDIxMWZhNmQ3M2E0ZTU=",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody
    })
      .then(response => response.json())
      .then(data1 => {
        console.log("Token success !", data1.access_token);
        fetch("https://api.spotify.com/v1/playlists/4rmcoAzR4iaRqtEnOWRfER/tracks", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + data1.access_token,
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
            console.log("Now should play ",data.items[currentTrackId].track.name, currentTrackId);
            console.log(data.items[currentTrackId].track.preview_url);
            console.log("Réponse reçue ! Voilà ce que j'ai reçu : ", data)
          })
      })
  }

  //https://open.spotify.com/playlist/4rmcoAzR4iaRqtEnOWRfER?si=82dd8e6a767e4092
  useEffect(() => {

    const parsed = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    var code = parsed.code;
    if(!code) {
      console.log("Pas d'auth");
      var error = parsed.error;
      setText("Cannot login : "+error); 
    } else {
      console.log("Auth est là");

      auth(code);
    }
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

          <audio controls autoPlay src={tracks[currentTrackId].track.preview_url} /> <br />

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
