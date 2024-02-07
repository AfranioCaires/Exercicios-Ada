import './profile.css'

export default function Profile ({name, picture}) {
  return (
    <div className="userInfo">
      <img src={picture} alt="Foto de perfil" />
      <p>{name}</p>
    </div>
  )
}