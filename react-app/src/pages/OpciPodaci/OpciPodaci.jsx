import styles from './OpciPodaci.module.css'
import ContactUs from '../../components/ContactUs/ContactUs'
import Map from '../../components/Map/Map'
import PhotoSlider from '../../components/PhotoSlider/PhotoSlider'

function OpciPodaci(){
    return(
        <div className={styles.homepage}>

            <div className={styles.homepage2}>

                <PhotoSlider />
                <div className={styles.mainInfo}>
                    <h1>O nama</h1>
                    
                    <p>Dobrodošli u naš azil za životinje, oazu ljubavi i sigurnosti za naše dlakave prijatelje! U našem azilu pružamo dom i brigu za raznolike životinje koje su se našle u potrebi. Bilo da su napuštene, izgubljene ili pretrpjele zlostavljanje, svaka životinja koja dolazi u naše ruke dobiva ljubav, pažnju i priliku za novi početak.</p>
                    <p>Naša misija je osigurati da svaka životinja pronađe svoj zauvijek dom, gdje će biti voljena i cijenjena kao član obitelji. U našem azilu ćete susresti različite osobnosti - od veselih pasa spremnih za šetnju do nježnih mačaka koje žude za pažnjom. Svaka životinja ima svoju priču i svoj jedinstveni šarm, čekajući priliku da osvoji vaša srca.</p>
                    <p>Pružite ljubav i dom nekom od naših predivnih štićenika i zajedno ćemo stvarati sretne priče o usvajanju koje traju cijeli život. Pridružite nam se u našoj misiji da svaka šapa pronađe svoj dom, jer u našem azilu, ljubav je uvijek dobrodošla!</p>                    <p>U azilu "Prijatelj" smo ponosni na našu predanost u pomaganju napuštenim životinjama i u stvaranju boljeg svijeta za sve nas.</p>


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