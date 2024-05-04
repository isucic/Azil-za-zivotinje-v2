import { useContext, useEffect,useState } from 'react'
import styles from './Obavijesti.module.css'
import axios from 'axios'
import ModalNovaObavijest from '../../components/ModalNovaObavijest/ModalNovaObavijest';
import userContext from '../../context/userContext';
import UserContext from '../../context/userContext';

import { FaTrash } from 'react-icons/fa';
import PopUp from '../../components/PopUpWindow/PopUp';



function Obavijesti(){

    const user = useContext(userContext)
    const { isAdmin } = useContext(UserContext); // Dohvati setIsAdmin iz konteksta

    const [openModal, setOpenModal] = useState(false);
    const [obavijesti,setObavijesti] = useState([])
    const [refresh, setRefresh] = useState(true);

    useEffect(() => {
        if(refresh){
        axios.get("/obavijesti")
            .then(res => {
            setObavijesti(res.data)
            setRefresh(false);
        })
         .catch(err => console.log(err))
        }
    },[refresh])

    const handleIzbrisiObavijest = (id) => {
        axios.delete(`/obavijesti/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }})
         .then(res => {
            if (res.status === 200) 
                setRefresh(true)
            })
         .catch(error => console.log(error))
    }

    const [showLoginPopup, setShowLoginPopup] = useState(false);

    function handleNovaObavijest() {
        if (localStorage.getItem("token")) setOpenModal(true)
        else setShowLoginPopup(true)
    }

    return(
        <div className={styles.obavijestiPage}>
            <ModalNovaObavijest open={openModal} onClose={() => setOpenModal(false)}/>
            <h1>Obavijesti</h1>
            <button onClick={handleNovaObavijest}>Nova obavijest</button>
            <div className={styles.listaObavijesti}>
                {obavijesti.sort((a, b) => new Date(b.datum) - new Date(a.datum)).map(obavijest => (
                    <div className={styles.obavijest} key={obavijest._id}>
                        <div className={styles.traka} style={{backgroundColor: obavijest.vazno ? "rgba(228, 22, 22, 0.534)" : "#eaae1658"}}>
                            <p>{obavijest.naslov}</p>
                             {obavijest.vazno && <p>VAŽNO</p>}
                            <p>{obavijest.datum.substring(0,10)}</p>
                        </div>
                        <div className={styles.tekst}>
                            <p>{obavijest.tekst}</p>
                        </div>

                        {isAdmin && 
                        <div className={styles.izbrisiBtn}>
                            <FaTrash className={styles.fatrash} onClick={() => handleIzbrisiObavijest(obavijest._id)}/>
                        </div>}
                </div>
                ))}
                
            </div>
            {showLoginPopup && (<PopUp setShowLoginPopup={setShowLoginPopup}/>)}
        </div>
        
    )
}

export default Obavijesti