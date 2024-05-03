import { useEffect, useState } from "react"
import ImageSlider from "./ImageSlider"
import styles from './PhotoSlider.module.css'
import axios from "axios"

function PhotoSlider(){

    // useEffect(() => {
    //     axios.get("http://localhost:5001/api/getPhotoSlider")
    //     .then(res => console.log(res.data.success))
    // },[])
    const slides=[
        {url:'https://images.unsplash.com/photo-1509588873676-2e51d1129e0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', title:'photo1'},
        {url:'https://images.unsplash.com/photo-1558618047-f4b511aae74d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80', title:'photo2'},
        {url:'https://d35nxk5xx1d0px.cloudfront.net/repository/images/_variations/4/6/1/d/461d53fdccfcdb75bec53c72f2179b3d_view_article_new.jpg?v=21', title:'photo3'},
        {url:'https://bestiesplit.hr/wp-content/themes/bestie/assets/img/home/slide4.png', title:'photo4'}
    ]
    return(
        <div className={styles.containerStyles}>
            <ImageSlider slides={slides}/>
        </div>
    )
}
export default PhotoSlider