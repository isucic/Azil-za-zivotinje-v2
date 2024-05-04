import styles from './ModalEdit.module.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import {EditSelectInput, EditTextInput, EditCheckbox} from './EditInput';

function ModalEdit({open, onClose,zivotinja, setUpdate, setOpenModal}){  

    const [vrstaLista, setVrstaLista] = useState([])
    useEffect(() => {
        axios.get("/zivotinje/tip")
        .then(res => setVrstaLista(res.data))
        .catch(error => console.log(error))
    },[])

    const [updatedData, setUpdatedData] = useState({})
    function promjenaUlaza(event){
        var { name, value } = event.target
        setUpdatedData({...updatedData,[name]: value})
    }

   function promjenaCheckboxa(event){
        var { name, checked } = event.target
        setUpdatedData({...updatedData,[name]: checked})
   }

    const handleSaveButton = (e) => {
        e.preventDefault();
        // console.log(updatedData)
        axios.patch(`/zivotinje/${zivotinja._id}`, updatedData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }})
         .then(res => {
            if (res.status === 200) {
                setOpenModal(false)
                setUpdate(true);
            }
         })
         .catch(error => console.error("Greška prilikom slanja zahtjeva za ažuriranje"))
    }

    if (!open) return null;
    return(
        <div className={styles.overlay}>
            <div className={styles.modalContainer}>
                <p onClick={onClose} className={styles.closeBtn}>X</p>
                <div className={styles.content}>
                    <form onSubmit={handleSaveButton}>

                        <div className={styles.photoFrame}>
                            <img src={zivotinja.photo} className={styles.photo}/>
                        </div>
                    
                        <div className={styles.grid}>
                            <EditTextInput zivotinja={zivotinja} promjenaUlaza={promjenaUlaza} name="ime" type="text"/>
                            <EditTextInput zivotinja={zivotinja} promjenaUlaza={promjenaUlaza} name="godine" type="number"/>

                            <EditSelectInput zivotinja={zivotinja} promjenaUlaza={promjenaUlaza} name="vrsta" lista={vrstaLista}/>

                            <EditCheckbox zivotinja={zivotinja} promjenaUlaza={promjenaCheckboxa} name="udomljen" /> 
                           
                            
                            <EditTextInput zivotinja={zivotinja} promjenaUlaza={promjenaUlaza} name="pregled" type="text"/>
                            <EditCheckbox zivotinja={zivotinja} promjenaUlaza={promjenaCheckboxa} name="cip" />
                        </div>

                        <div className={styles.textBox}>
                            <textarea name="opis" placeholder={zivotinja.description} onChange={promjenaUlaza}/>
                        </div>
                      
                        <input className={styles.spremiBtn} type="submit" value="Spremi promjene" />
                    </form>

                </div>
            </div>
        </div>
        
    )
}

export default ModalEdit;