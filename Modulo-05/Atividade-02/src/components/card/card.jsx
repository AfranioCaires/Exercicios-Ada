
import PropTypes from 'prop-types';
import './card.css';
import star from "./../../assets/Star.svg";
import { BtnIcon } from '../button/button';

export default function Card({ imgSrc, title, description, stars, genre, relaseYear, url }) {
  return (
    <article className="card">
      <img src={imgSrc} className='banner' />
      <div className="card-text-content">
        <div>
          <div className="title-details-genre">
            <h3>{title}</h3>
            <p>{genre}, {relaseYear}</p>
          </div>
          <span>
            <img src={star} width={16} height={16} alt="estrelas" />
            {stars}
          </span>
        </div>
        <p>{description}</p>
        <BtnIcon icon={"src/assets/Play.svg"} width={40} link={url} alt={"botão de play"} />
      </div>
    </article>
  );
}

Card.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  stars: PropTypes.number.isRequired,
  genre: PropTypes.string.isRequired,
  relaseYear: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
};