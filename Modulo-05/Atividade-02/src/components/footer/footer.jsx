import './footer.css'
import codeIcon from './../../assets/Code.svg'

export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <p>Afranio Caires</p>
        <img src={codeIcon} alt="" />
        <p>Ada Tech</p>
      </div>
    </footer>
  )
}