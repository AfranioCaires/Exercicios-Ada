import PropTypes from 'prop-types';
import './button.css'

export function ButtonLink({ btnText, link }) {
  return (
    <>
      <button className='btnLink'><a href={link}>{btnText}</a></button>
    </>
  )
}

export function BtnIcon({ icon, link, width }) {
  return (
    <>
      <button className='btnIcon'>
        <a href={link}>
          <img
            width={width}
            height={width}
            src={icon} />
        </a>
      </button>
    </>
  )
}

ButtonLink.propTypes = {
  btnText: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};

BtnIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired
};