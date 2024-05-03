import { useState } from "react"
import styles from './PhotoSlider.module.css'
function ImageSlider({slides}){

    const [currentIndex, setCurrentIndex] = useState(0)
    const slideStyles = {
        width: '100%',
        height: "100%",
        backgroundPosition: "center",
        // backgroundSize: "cover",
        // backgroundImage: `url(${slides[currentIndex].url})`
        background: `url(${slides[currentIndex].url}) no-repeat center 30% / cover`
    }
    
    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex)
    }
    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex)
    }
    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
      };
    return(
        <div className={styles.sliderStyles}>
            <div className={styles.leftArrowStyles} onClick={goToPrevious}>
                ❰
            </div>

            <div className={styles.rightArrowStyles} onClick={goToNext}>
                ❱
            </div>

            <div style={slideStyles}></div>
            {/* <div className={styles.slideStyles} style={{ "--Image": `url(${slides[currentIndex].url})` }}></div> */}
            <div className={styles.dotsContainerStyles}>
            {slides.map((slide, slideIndex) => (
            <div
                className={styles.dotStyle}
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
            >
                ●
            </div>
            ))}
          </div>
        </div>
    )
}

export default ImageSlider