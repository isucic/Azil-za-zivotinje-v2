import { useEffect, useState } from 'react'
import styles from './Filters.module.css'
import axios from 'axios'
function Filters({vratiUParent, vratiStatus}){

    const [vrsta,setVrsta] = useState([])
    useEffect(() => {
        axios.get("/zivotinje/tip")
        .then(res => setVrsta(res.data))
        .catch(error => console.log(error))
    },[])

    const status = [
        {vrijednost: true, naziv: "udomljen", id: 1},
        {vrijednost: false, naziv: "nije udomljen", id: 2}
    ]
    return(
            <>
                <h2>Filteri</h2>

                <div className={styles.filteri}>
                    <h3>Vrsta</h3>
                    {vrsta.map(v => (
                        <div className={styles.filter} key={v._id}>
                            <label htmlFor="vrsta">{v.naziv}</label>
                            <input 
                            type="radio" 
                            name="vrsta" 
                            value={v.naziv} 
                            onChange={(e) => vratiUParent(e.target.value)}
                            />
                        </div>
                    ))} 
                </div>

                <div className={styles.filteri}>
                    <h3>Status</h3>
                    {status.map((v,index) => (
                        <div className={styles.filter} key={v.id}>
                            <label htmlFor="status">{v.naziv}</label>
                            <input 
                            type="radio" 
                            name="status" 
                            value={v.naziv} 
                            onChange={(e) => vratiStatus(e.target.value)}/>
                        </div>
                    ))} 
                </div>
            </>
    )
}

export default Filters;