import './css/Btn.css'
export default function Btn({ path }) {
  return (
    <button><img className="btnImg" src={path} /></button>
  )
}