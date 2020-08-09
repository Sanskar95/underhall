import React, {Fragment} from 'react';
import './Header.css'
import logo from "../../images/logo.png";


const  Header=()=> {
    return (
        <div className="header">
            <img className="app_headerImage" src={logo}></img>
        </div>
    );
}

export default Header;
