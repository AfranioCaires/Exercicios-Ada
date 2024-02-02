import './css/Player.css'
import Btn from './Btn'
export default function Player({ songName, album, artist, cover }) {
  return (
    <section>
      <img src={cover} />
      <div>
        <h3>{songName}</h3>
        <p>{artist} - {album}</p>
        <div className="songTimer">
          <span>1:23</span>
          <div className="songProgressWrapper">
            <div className="progress"></div>
          </div>
          <span>4:56</span>
        </div>
        <div className="songButtons">
          <Btn path="src/assets/img/skip-left.png" />
          <Btn path="src/assets/img/pause.png" />
          <Btn path="src/assets/img/skip-right.png" />
        </div>
      </div>
    </section>
  )
}