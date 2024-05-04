import styles from './Donacije.module.css'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import PopUp from '../../components/PopUpWindow/PopUp'

function FormDonacija({setRefresh}){

    const [tipDonacija, setTipDonacija] = useState([])

    const [podaci,setPodaci] = useState({
        tip: "",
        vrijednost: null,
        opis: ""
    })

    useEffect(() => {
        axios.get("/donacije/tip")
         .then(res => {
            setTipDonacija(res.data)
        })
         .catch(err => console.log(err))
    })


    function popunaForme(e){
        var { name, value } = e.target
        setPodaci({...podaci,[name]: value})
    }

    const [showLoginPopup, setShowLoginPopup] = useState(false);

    const handleSpremiDonaciju = (e) => {
        e.preventDefault();
        axios.post("/donacije", podaci, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
         .then(res => {
            if (res.status === 200) {
                setRefresh(true)
            } else {
                console.log("Spremanje donacije nije uspjelo")
            }
         })
         .catch (error => {
            console.error("Greska prilikom slanja zahtjeva za spremanje donacije:", error)
            if (error.response.status === 401 || error.response.status == 403) {
                setShowLoginPopup(true)
            }
        })  
    }

    return(
        <form onSubmit={handleSpremiDonaciju}>
            <div className={styles.formaDonacije}>
                <p>Tip donacije</p>
                <select 
                name="tip"
                value={podaci.tip}
                onChange={popunaForme} >
                <option value="">Izaberi tip</option>
                {tipDonacija.map(tip => (
                    <option key={tip._id} value={tip._id}>
                        {tip.naziv}
                    </option>
                ))}
                </select>
                
                <p>Vrijednost donacije</p>
                <input type="number" name="vrijednost" required onChange={popunaForme} />

                <p>Detalji</p>
                <textarea name="opis" onChange={popunaForme}/>

                <input type="submit" value="Dodaj" />
            </div>

            {showLoginPopup && (<PopUp setShowLoginPopup={setShowLoginPopup}/>)}
      </form>
    )
}

export default FormDonacija;