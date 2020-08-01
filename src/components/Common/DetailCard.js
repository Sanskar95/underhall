import React from 'react';
import Typography from '@material-ui/core/Typography';
import './DetailCard.css'
import Paper from "@material-ui/core/Paper";
import ButtonBase from '@material-ui/core/ButtonBase';



export default function DetailCard(props) {

    return (
        <Paper style={{background: 'bisque', marginTop: '.5rem'}}>
                <ButtonBase style={{width: '100%'}} onClick={()=>{window.open(props.url)}}>
                <Typography style={{fontSize: '2rem', fontWeight: 'bold',padding: '2rem'}} color="textSecondary" >
                    {props.title}
                </Typography>
                </ButtonBase>

        </Paper>
    );
}
