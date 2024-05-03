import styles from './UnosNoveZivotinje.module.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function UnosNoveZivotinje(){

    const navigate = useNavigate();

    const [zivotinja,setZivotinja] = useState({
      ime: "",
      vrsta: "",
      photo: "",
      cip: false,
      godine: null,
      opis: "",
      pregled: "",
    })


    const handleSubmit = event => {
        event.preventDefault();
        axios.post("/zivotinje", zivotinja, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }})
         .then(res => navigate('/zivotinje'))
         .catch(err => console.log(err))
    }

    const [vrste, setVrste] = useState([])
    useEffect(() => {
        axios.get("/zivotinje/tip")
        .then(res => {
            setVrste(res.data)})
        .catch(error => console.log(error))
    },[])

    return(
        <div className={styles.mainpage}>
            <h1>Unos nove životinje</h1>

            <form onSubmit={handleSubmit}>
                <div className={styles.sveSkupa}>

                    <div className={styles.leftContainer}>
                    <p>Ime</p>
                    <input 
                     type="text" 
                     name="ime" 
                     onChange={(e) => setZivotinja({...zivotinja, [e.target.name]: e.target.value})} 
                    />

                    <div className={styles.vrstaCip}>
                        {/* Izaberi vrstu */}
                        <div className={styles.vrstaBox}>
                            <p>Vrsta</p>
                            <select name="vrsta" value={zivotinja.vrsta}
                             onChange={(e) => setZivotinja({...zivotinja, [e.target.name]: (e.target.value)})}
                             >
                                <option value="">Odaberi vrstu životinje</option>
                                {vrste.map(vrsta => (
                                    <option key={vrsta._id} value={vrsta._id}>{vrsta.naziv}</option>
                                ))}
                             </select>
                        </div>

                        <div className={styles.cipiranBox}>
                            <p>Čipiran</p>
                            <input 
                             type="checkbox" 
                             name="cip" 
                             onClick={(e) => setZivotinja({...zivotinja,[e.target.name]: Boolean(e.target.value)}) }
                            />
                        </div>
                    </div>

                    <p>Godine</p>
                    <input 
                     type="number" 
                     name="godine" 
                     required 
                     onChange={(e) => setZivotinja({...zivotinja, [e.target.name]: e.target.value})} 
                    />

                    <div className={styles.dateBox}>
                        <p>Pregled</p>
                        <input
                            type="date"
                            name="pregled"
                            onChange={(e) => setZivotinja({...zivotinja,[e.target.name]: e.target.value})}
                        />
                    </div>

                    <div className={styles.textBox}>
                        <p>Detalji</p>
                        <textarea name="opis" onChange={(e) => setZivotinja({...zivotinja,[e.target.name]: e.target.value})}/>
                    </div>
                    </div>

                    <div className={styles.rightContainer}>
                        <p>Unesite URL fotografije</p>
                        <input type="text" name="photo" onChange={(e) => setZivotinja({...zivotinja,[e.target.name]: e.target.value})} />
                        {zivotinja.photo && (
                        <div className={styles.photoFrame}>
                                <img src={zivotinja.photo} className={styles.photo}/>
                        </div>
                        )}
                    </div>
                </div>
                <input type="submit" value="Spremi" />
            </form>

        </div>
    )
}

export default UnosNoveZivotinje