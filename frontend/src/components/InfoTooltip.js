import Popup from "./Popup";
import okImage from '../images/okUnion.svg'
import notOkImage from '../images/notokUnion.svg'

function InfoToolTip(props) {

  return (
    <Popup isOpen={props.isOpen} onClose={props.onClose}>
      <img className="popup__info-image" src={props.isSuccessful ? okImage : notOkImage} alt={props.isSuccessful ? "ОК!" : "Не ОК :("} />
      <h3 className="popup__title popup__title_center">{props.isSuccessful ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте еще раз."}</h3>
    </Popup>
  )
}

export default InfoToolTip;