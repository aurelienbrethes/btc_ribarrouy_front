const Modal = ({title, description, date, place}) => {

    return (
        <div className="modal">
            <h2>{title}</h2>
            <p>{date}</p>
            <p>{place}</p>
            <p>{description}</p>
        </div>
    )
}

export default Modal;