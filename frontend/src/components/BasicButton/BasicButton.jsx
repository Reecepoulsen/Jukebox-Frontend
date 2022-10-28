import './BasicButton.scss'

const BasicButton = ({type, text, OnClickFunc}) => {
  return (
    <button type={type} className="basicButton" onClick={OnClickFunc}>{text}</button>
  )
}

export default BasicButton