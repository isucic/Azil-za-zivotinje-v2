import axios from 'axios'
import styles from './PopisZivotinja.module.css'
import { useEffect, useState, createContext } from 'react'
import ZivotinjaCard from '../../components/ZivotinjaCard/ZivotinjaCard'
import Filters from '../../components/Filters/Filters'

function PopisZivotinja(){

    const [zivotinje,setZivotinje] = useState([])
    const [update,setUpdate] = useState(false)
    const [filter,setFilter] = useState("")
    const [status,setStatus] = useState("")

    useEffect(() => {
        axios.get("/zivotinje")
        .then(res => {
            if (filter != "") {
                setZivotinje(res.data.filter((item) => item.vrsta === filter))
                if(status === "nije udomljen")
                    setZivotinje(res.data.filter((item) => (item.vrsta === filter && item.udomljen === false)))
                if(status === "udomljen")
                setZivotinje(res.data.filter((item) => (item.vrsta === filter && item.udomljen === true)))
            }
            else if(status != ""){
                setZivotinje(res.data.filter((item) => item.udomljen === (true ? status === "udomljen" : false)))
                if(filter != ""){
                    setZivotinje(res.data.filter((item) => (item.vrsta === filter && item.udomljen === (true ? status === "udomljen" : false))))
                }
            }
            else {
                setZivotinje(res.data)
            }
        })
        .catch(err => console.log(err))
        setUpdate(false)
    },[update,filter,status])
    
    function resetFiltere(){
        setFilter("")
        setStatus("")
    }

    return(
        <div className={styles.popisZivotinja}>
            <div className={styles.sideBar}>
                <Filters vratiUParent={setFilter} vratiStatus={setStatus}/>
                <button onClick={resetFiltere}>Poništi filtere</button>
            </div>


            <div className={styles.popis}>
                {zivotinje.map(zivotinja => ( 
                    <ZivotinjaCard zivotinja={zivotinja} key={zivotinja._id} setUpdate={setUpdate} />
                ))}

            </div>
        </div>
    )
}

export default PopisZivotinja