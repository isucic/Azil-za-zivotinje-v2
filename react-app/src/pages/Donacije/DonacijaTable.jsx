import { useContext,useState } from "react";
import styles from './Donacije.module.css'
import UserContext from "../../context/userContext";
import axios from "axios";
import PopUp from "../../components/PopUpWindow/PopUp";

function DonacijeTable({donacije, kateg, setRefresh}){


    const { isAdmin } = useContext(UserContext); // Dohvati setIsAdmin iz konteksta

    const [showLoginPopup, setShowLoginPopup] = useState(false);
    function handlePremjestiDonaciju(id){
        axios.patch(`/donacije/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            if (res.status === 200)
                setRefresh(true)
        })
        .catch (error => {
            console.error("Greska prilikom slanja zahtjeva za spremanje donacije:", error)
            if (error.response.status === 401 || error.response.status == 403) {
                setShowLoginPopup(true)
            }
        })
    }

    function handleIzbrisiDonaciju(id){
        if(isAdmin && (kateg === "trazi" || kateg==="donirano")){
            axios
            .delete(`/donacije/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
             .then(res => {
                if (res.status === 200) 
                    setRefresh(true)
            })
            .catch(error => console.log(error))
        }
    }

    function kopijaUTrazimo(donacija){
        const noviPodaci = {tip: donacija.tip._id, vrijednost: donacija.vrijednost, opis: donacija.opis}
        axios.post("/donacije", noviPodaci, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
         .then(res => {
            if (res.status === 200) {
                setRefresh(true)
            }
         })
         .catch (error => {
            console.error("Greska prilikom slanja zahtjeva za spremanje donacije:", error)
        })  
    }

    // const user = useContext(userContext)

    return(
        <>
        <table>
            <thead>
                <tr>
                    <th>Tip</th>
                    <th>Vrijednost</th>
                    <th>Opis</th>
                    <th>Botuni</th>
                </tr>
            </thead>
            <tbody>
               {donacije.filter(donacija => donacija.kategorija === kateg).map((donacija) => (
                <tr key={donacija._id}>
                    <td>{donacija.tip.naziv}</td>
                    <td>{donacija.vrijednost}</td>
                    <td>{donacija.opis}</td>

                    {/* U tablici Traži, samo korisnik vidi botun Doniraj */}
                    {(!isAdmin && kateg=="trazi") &&  
                        <td><button onClick={() => handlePremjestiDonaciju(donacija._id)}>Doniraj</button></td>}

                    {/* U tablici Traži, samo admin vidi botuni Donirano i Izbrisi */}
                    {isAdmin && kateg=="trazi" && 
                        <td>
                            <button onClick={() => handlePremjestiDonaciju(donacija._id)}>Donirano</button>
                            <button onClick={() => handleIzbrisiDonaciju(donacija._id)}>Izbriši</button>
                        </td>}

                    {/* U tablici Nudi, samo admin vidi botun Prihvati */}
                    {isAdmin && kateg=="nudi" && <td><button onClick={() => handlePremjestiDonaciju(donacija._id)}>Prihvati</button></td>}

                    {/* U tablici Donirano, samo admin ima pravo na botun Ponovi i izbrisi */}
                    {isAdmin && kateg=="donirano" && 
                    <td>
                        <button onClick={() => kopijaUTrazimo(donacija)}>Ponovi</button>
                        <button onClick={() => handleIzbrisiDonaciju(donacija._id)}>Izbriši</button>
                    </td>}

               </tr>
                ))}
            </tbody>

    </table>
    {showLoginPopup && (<PopUp setShowLoginPopup={setShowLoginPopup}/>)}
    </>
    )
}

export default DonacijeTable;