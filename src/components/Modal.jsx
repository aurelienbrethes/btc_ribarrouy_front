const Modal = ({title, description, date, place, setShowModal}) => {


    const handleChildClick = (item) => {
        item.stopPropagation(item);
    };

    return (
            <div className="modal" onClick={(e) => handleChildClick(e)}>
                <section>
                    <aside>
                        <h2>{title}</h2>
                        <p>{date}</p>
                        <p>{place}</p>
                        <p>{description}</p>
                    </aside>
                    <aside>
                        <form action="submit">
                            <h2>Inscriptions :</h2>
                            <label htmlFor="lastname">Nom</label>
                            <input type="text" id="lastname" />
                            <label htmlFor="firstname">Prénom</label>
                            <input type="text" id="firstname" />
                            <label htmlFor="licenceNumber">Numéro de licence</label>
                            <input type="text" id="licenceNumber" />
                            <label htmlFor="phone">Téléphone</label>
                            <input type="number" id="phone" />
                            <label htmlFor="email">email</label>
                            <input type="email" id="email" />
                        </form>
                    </aside>
                </section>
                <button onClick={() => setShowModal(false)}>Fermer</button>
            </div>
    )
}

export default Modal;