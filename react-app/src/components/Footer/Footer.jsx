import { useContext } from 'react';
import fo from './Footer.module.css'
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import UserContext from '../../context/userContext';

function Footer(){

    const { isAdmin } = useContext(UserContext); 
    return(
        <div className={fo.footer}>
            <div className={fo.footerLeft}>
            <ul className={fo.footerLinks}>
                <li>
                    <Link to="/" className={fo.footerLink}>Početna</Link>
                </li>
                <li>
                    <Link to="/donacije" className={fo.footerLink}>Donacije</Link>
                </li>
                <li>
                    <Link to="/obavijesti" className={fo.footerLink}>Obavijesti</Link>
                </li>
                <li>
                    <Link to="/zivotinje" className={fo.footerLink}>Životinje</Link>
                </li>
                {isAdmin && 
                <li>
                    <Link to="/unosnovezivotinje" className={fo.footerLink}>Unesi novu</Link>
                </li>
                }
            </ul>
            <p>Šapica</p>
            </div>

            <div className={fo.footerRight}>
                <a href="/"><FaFacebook /></a>
				<a href="/"><FaInstagram /></a>
            </div>
        </div>
    )
}

export default Footer;