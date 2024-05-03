import styles from './OpciPodaci.module.css'
import ContactUs from '../../components/ContactUs/ContactUs'
import Map from '../../components/Map/Map'
import PhotoSlider from '../../components/PhotoSlider/PhotoSlider'

function OpciPodaci(){
    return(
        <div className={styles.homepage}>

            {/* <div className={styles.homepage1}>
                Sa strane
            </div> */}

            <div className={styles.homepage2}>

                <PhotoSlider />
                <div className={styles.mainInfo}>
                    <h1>O nama</h1>
                    <p>Azil za životinje "Prijatelj" osnovan je 1995. godine s ciljem pružanja pomoći napuštenim i zlostavljanim životinjama u našoj regiji. Od samog osnutka, azil se bori protiv nebrige, zlostavljanja i napuštanja životinja, a nesebičnim radom volontera i donatora uspijevaju osigurati siguran dom za mnoge napuštene pse i mačke.</p>
                    <p>Nalazimo se na prostranom imanju koje pruža idealno okruženje za životinje, s mnogo prostora za trčanje, igru i druženje. Naši stručni veterinari i volonteri posvećeno rade na brizi za svaku životinju, kako bi im osigurali najbolju njegu i kvalitetan život u ugodnom okruženju.</p>
                    <p>
                    Uz njegu i brigu o životinjama, također se trudimo podizati svijest o važnosti odgovornog vlasništva nad kućnim ljubimcima, te educirati zajednicu o važnosti zaštite životinja. Naši programi uključuju volontiranje, edukaciju, kampanje protiv zlostavljanja životinja, te organiziranje događaja i donatorskih akcija kako bi osigurali dugoročno financiranje azila.
                    </p>
                    <p>U azilu "Prijatelj" smo ponosni na našu predanost u pomaganju napuštenim životinjama i u stvaranju boljeg svijeta za sve nas.</p>

                </div>
                <div className={styles.karta}>
                    <h2>Naša lokacija</h2>
                    <div className={styles.lokacijainfo}>                       
                        <Map />
                        <div className={styles.info}>
                            <p>Posjeti nas u ovim terminima:</p>
                            <p>10-18 h</p>
                            <hr/>
                            <p>Kontakt broj:</p>
                            <p>099 172 4587</p>
                        </div>
                    </div>
                </div>
                
                <ContactUs />
            </div>
        </div>
    )
}

export default OpciPodaci