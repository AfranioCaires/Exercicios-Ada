import './hero.css'
import PropTypes from 'prop-types';
import { ButtonLink } from './../button/button.jsx'


export default function Hero({ title, textContent }) {
  return (
    <div className="bg">
      <div className="container hero-content">
        <div className="text">
          <h1>{title}</h1>
          <p>{textContent}</p>
          <ButtonLink btnText={"Explorar catálogo"} link={"#catalog"} />
        </div>
      </div>
    </div>

  )
}

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  textContent: PropTypes.string.isRequired,
};