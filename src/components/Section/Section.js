import React, {Fragment} from 'react';
import './Section.css'
import {Link} from "react-router-dom";


const  Section=(props)=> {
    return (
        <div  >
            <Link to={props.name}>
            <div className='section'>
               <h1 className='section_text'>{props.name}</h1>
            </div>
            </Link>
        </div>
    );
}

export default Section;
