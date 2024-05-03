import { useState } from 'react';
import styles from './Login.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';

const Login = () => {

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [formErrors, setFormErrors] = useState("")
    let formValid = true;

    const navigate = useNavigate();

    function validateLogin() {
        if(username.length===0 && password.length===0){
            setFormErrors("Please enter your username and password!");
            formValid = false;
        }
        else if(username.length===0){
            setFormErrors("Please enter your username!");
            formValid=false;
        }
        else if(password.length===0){
            setFormErrors("Please enter your password!");
            formValid=false;
        }
        else formValid=true;
    }

    const auth = useAuth()
    function handleLogin(e){
        e.preventDefault();
        validateLogin();
        if (formValid){
            axios.post("/prijava", {username, password})
            .then(response => {
                localStorage.setItem("token", response.data.token)
                navigate("/")
            })
            .catch(error => {
                console.log("Greska kod prijave", error)
            })
            // auth.loginAction({username, password})
        }
        else {
            console.log(formErrors)
        }
    }
    return ( 
        <div className={styles.loginPage}>
            <div className={styles.content}>
                <form>
                    <h1>LOGIN</h1>
                    <hr />
                    <div className={styles.inputBox}>
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>

                    <div className={styles.inputBox}>
                        <input type="password" placeholder='Lozinka' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    {/* <input className={styles.loginBtn} type="submit" value="Login" /> */}
                    <button className={styles.loginBtn} onClick={handleLogin}>Login</button>
                    <p className={styles.noviRacun}>Napravi račun za novog admina.</p>
                </form>
            </div>
        </div>
     );
}
 
export default Login;