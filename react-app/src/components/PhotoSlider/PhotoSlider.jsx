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
        {url:'https://images.unsplash.com/photo-1594004844563-536a03a6e532?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title:'phot65'},
        {url:'https://plus.unsplash.com/premium_photo-1675791728424-7f18ed8ebc41?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title:'photo1'},
        {url:'https://images.unsplash.com/photo-1558618047-f4b511aae74d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title:'photo2'},
        {url:'https://d35nxk5xx1d0px.cloudfront.net/repository/images/_variations/4/6/1/d/461d53fdccfcdb75bec53c72f2179b3d_view_article_new.jpg?v=21', title:'photo3'},
        {url:'https://plus.unsplash.com/premium_photo-1663127588537-96aacaef7b13?q=80&w=2054&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title:'photo5'}    ]
    return(
        <div className={styles.containerStyles}>
            <ImageSlider slides={slides}/>
        </div>
    )
}
export default PhotoSlider