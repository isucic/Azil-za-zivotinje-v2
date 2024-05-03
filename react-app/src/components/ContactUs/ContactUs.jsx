import axios from 'axios'
import styles from './ContactUs.module.css'
import cx from 'classnames'
import { useState } from 'react'

function ContactUs(){

    const handleSend = () => {
        axios.post("http://localhost:5001/api/sendMessage", data, {
            headers: {
                'content-type': "application/json"
            }
        })
         .then(res => {if(res.data.success) setData({name: "", email: "", message: ""})} )
         .catch(err => console.log(err))
    }

    function popunaForme(e){
        const {name, value} = e.target;
        setData({...data,[name]: value})
    }

    const [data,setData] = useState({
        name: "",
        email: "",
        message: ""
    })

    return(
        <div className={styles.contact}>
            <div className={styles.topicText}>
                <h2>Imaš pitanje?</h2>
                <p>Želiš saznati kako udomiti neku od ovih slatkih životinja? Nemoj čekati nego nam pošalji poruku i javit ćemo ti se što prije.</p>
            </div>

            <form>
                <div className={styles.inputBox}>
                        <input type="text" name="name" placeholder="Unesi svoje ime" value={data.name} onChange={popunaForme} />
                </div>
                
                <div className={styles.inputBox}>
                    <input type="email" name="email" placeholder="Unesi svoj email" value={data.email} onChange={popunaForme}/>
                </div>

               <div className={cx(styles.inputBox,styles.messageBox)}>
                    <textarea name="message" placeholder='Unesi svoju poruku' value={data.message} onChange={popunaForme}/>
                </div>

                <div className={styles.contactBtn}>
                    <input type="button" value="Pošalji" onClick={handleSend}/>
                </div>
            </form>
            

        </div>
    )
}
export default ContactUs