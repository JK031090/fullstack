import React from 'react';
import "./InfoBox.css";
import {Card, Typography,CardContent} from '@material-ui/core';

function InfoBox({title,cases,total,active,isRed, ...props}) {
    return (
        <Card
        onClick={props.onClick} 
        className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"}`}>
            <CardContent>
                {/* Title , i.e Coronavirus Cases */}
                <Typography className="infoBox__title" color="textSecondary">{title}</Typography>

                {/* number of cases */}
                <h2 className="infoBox__cases">{cases}</h2>

                {/* number of cases */}
                <Typography className="infoBox__total" color="textSecondary">{total} Total</Typography>

            </CardContent>

        </Card>
    )
}

export default InfoBox
