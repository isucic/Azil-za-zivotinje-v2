import { useState } from 'react';
import styles from './Registracija.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registracija = () => {

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [role,setRole] = useState("")  
    const [formErrors, setFormErrors] = useState("")
    let formValid = true;

    const navigate = useNavigate();

    function validateRegistracija() {
        if(username.length===0 && password.length===0 && email.length === 0){
            setFormErrors("Please enter your username, email and password!");
            formValid = false;
        }
        else if(username.length===0){
            setFormErrors("Please enter your username!");
            formValid=false;
        }
        else if(email.length===0){
            setFormErrors("Please enter your email!");
            formValid=false;
        }
        else if(password.length===0){
            setFormErrors("Please enter your password!");
            formValid=false;
        }
        else formValid=true;
    }

    function handleRegistracija(e){
        e.preventDefault();
        validateRegistracija();
        if (formValid){
            axios.post("/registracija", {username, password})
            .then(response => {
                localStorage.setItem("token", response.data.token)
                navigate("/")
            })
            .catch(error => {
                console.log("Greska kod prijave", error)
            })
        }
        else {
            console.log(formErrors)
        }
    }
    return ( 
        <div className={styles.loginPage}>
            <div className={styles.content}>
                <form>
                    <h1>REGISTRATION</h1>
                    <hr />
                    <div className={styles.inputBox}>
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>

                    <div className={styles.inputBox}>
                        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div className={styles.inputBox}>
                        <input type="password" placeholder='Lozinka' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    <div className={styles.selectBox}>
                        <p className={styles.roleLabel}>Role</p>            
                        <label htmlFor="userRole" className={styles.inputLabel}>
                            <input 
                            type="radio" id="userRole" name="role" value="user"
                            onClick={(e) => setRole(e.target.value)} 
                            className={styles.inputRadio}/>
                            User
                        </label>

                        <label htmlFor="adminRole" className={styles.inputLabel}>
                            <input 
                            type="radio" id="adminRole" name="role" value="admin"
                            onClick={(e) => setRole(e.target.value)}
                            className={styles.inputRadio}/>
                            Admin
                        </label>
                    </div>

                    

                    {/* <input className={styles.loginBtn} type="submit" value="Login" /> */}
                    <button className={styles.loginBtn} onClick={handleRegistracija}>Login</button>
                    <p className={styles.noviRacun}>Ulogiraj se.</p>
                </form>
            </div>
        </div>
     );
}
 
export default Registracija;