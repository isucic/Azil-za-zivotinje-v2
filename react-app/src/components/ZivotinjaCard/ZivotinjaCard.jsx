import axios from 'axios'
import { useContext, useState } from 'react'
import styles from './ZivotinjaCard.module.css'
import ModalEdit from '../ModalEdit/ModalEdit'
import UserContext from '../../context/userContext';
import PopUp from '../PopUpWindow/PopUp'

function ZivotinjaCard({zivotinja, setUpdate}){

    const { isAdmin } = useContext(UserContext); // Dohvati setIsAdmin iz konteksta

    var ime = zivotinja.ime
    var vrsta = zivotinja.vrsta
    var udomljen = zivotinja.udomljen
    var opis = zivotinja.opis
    var photo = zivotinja.photo
    var id = zivotinja._id

    const [openModal, setOpenModal] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);

    function handleUdomiBotun(id){

        if(localStorage.getItem("token")){
            axios.patch(`/zivotinje/udomi/${id}`,{udomljen: true}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }})
             .then(res => {if (res.status === 200) setUpdate(true)})
             .catch(error => console.error("Greška prilikom promjene status udomitelja"))
        } else {
            setShowLoginPopup(true)
        }
       
    }

    const backgroundColor = udomljen ? "#d2e7d6" : "transparent";

    return(
        <div className={styles.zivotinjaCard} style={{ backgroundColor }}>
            <div className={styles.photoFrame}>
                <img className={styles.photo} src={photo} />
            </div>

            <div className={styles.imeBox}>
                <p className={styles.ime}>{ime}</p>
                <div className={styles.linija}></div>

            </div>


            <div className={styles.vrstaStatus}>
                <p>{vrsta}</p>
                {udomljen ? <p className={styles.status}>Udomljen</p> : <p className={styles.status}>Nije udomljen</p>}
            </div>

            
            <p className={styles.opis}>{opis}...</p>

            <div className={styles.botuni}>
                <ModalEdit zivotinja={zivotinja} open={openModal} onClose={() => setOpenModal(false)} setUpdate={setUpdate} setOpenModal={setOpenModal}/>
                {!udomljen && 
                <button onClick={() => handleUdomiBotun(id)} className={styles.udomibtn}>Udomi</button>}
                {isAdmin && 
                <button className={styles.uredibtn} onClick={() => setOpenModal(true)}>Uredi</button>
                }
                 {/* Ovdje dodajemo prazni element koji zauzima prostor */}
                {!udomljen && !isAdmin && <div className={styles.placeholderButton}></div>}               
            </div>
            {showLoginPopup && (<PopUp setShowLoginPopup={setShowLoginPopup}/>)}

        </div>
    )
}

export default ZivotinjaCard