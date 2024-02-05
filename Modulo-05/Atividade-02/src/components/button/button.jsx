import PropTypes from 'prop-types';
import './button.css'
import button from './../../assets/Play.svg'
export function ButtonLink({ btnText, link }) {
  return (
    <>
      <a href={link}>
        <button className='btnLink'>{btnText}</button>
      </a>
    </>
  )
}

export function BtnPlay({ link, width }) {
  return (
    <>
      <a href={link}>
        <button className='btnIcon'>
          <img
            width={width}
            height={width}
            src={button} />
        </button>
      </a>
    </>
  )
}

ButtonLink.propTypes = {
  btnText: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};

BtnPlay.propTypes = {
  link: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired
};