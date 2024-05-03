import { Link, useNavigate } from "react-router-dom"
import styles from './Navigacija.module.css'
import logo from '../images/icon.svg'
import { useContext,useEffect,useState } from "react"
import Toggle from '../ToggleSwitch/Toggle'
import userContext from "../../context/userContext"
import { Navigate } from "react-router-dom"
import axios from "axios"

function Navigacija({action}){

    const [loggedIn,setLoggedIn] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")){
            setLoggedIn(true)
        }
        else setLoggedIn(false)

    },[handleLogout])
    
    function handleButtonLogin() {
        navigate("/login")
    }

    async function handleLogout(){
        try {
            localStorage.removeItem('token');
            setLoggedIn(false)
        } catch (error) {
            console.error("Greska prilikom odjave", error)
        }
    }

    const user = useContext(userContext)
    return(
        <div className={styles.navigacija}>
            <Link to="/"><img src={logo} className={styles.logo}/></Link>

            <ul className={styles.navUl}>
                <li className={styles.navLink}>
                    <Link to="/" className={styles.link}>Početna</Link>
                </li>
                <li className={styles.navLink}>
                    <Link to="/donacije" className={styles.link}>Donacije</Link>
                </li>
                <li className={styles.navLink}>
                    <Link to="/obavijesti" className={styles.link}>Obavijesti</Link>
                </li>
                <li className={styles.navLink}>
                    <Link to="/zivotinje" className={styles.link}>Životinje</Link>
                </li>
                {loggedIn && 
                <li className={styles.navLink}>
                    <Link to="/unosnovezivotinje" className={styles.link}>Unos Novih</Link>
                </li>}
            </ul>

            <div className={styles.navbarLogin}>
                {/* <Link to="/login" className={styles.login}>Login</Link> */}
                {/* <p>Admin</p> */}
                <Toggle onChange={action}/>
                {!loggedIn ? (<button onClick={handleButtonLogin}>
                    Login
                </button>) :
                (<button onClick={handleLogout}>
                    Logout
                </button>)}
            </div>
            
        </div>
    )
}

export default Navigacija