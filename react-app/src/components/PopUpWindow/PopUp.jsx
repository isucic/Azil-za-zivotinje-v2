import styles from './PopUp.module.css'
import { useNavigate } from 'react-router-dom';
function PopUp ({setShowLoginPopup}) {
    const navigate = useNavigate()

    return (
        <>
        <div className={styles.popup}>
            <div className={styles.popupContent}>
                <h2>Korisnik nije prijavljen</h2>
                <p>Prijavite se ili napravite korisnički račun.</p>
                <div className={styles.loginClose}>
                    <button onClick={() => setShowLoginPopup(false)}>Zatvori</button>
                    <button onClick={() => navigate('/login')}>Login</button>
                </div>
            </div>     
        </div>
        </>
    )
}

export default PopUp;