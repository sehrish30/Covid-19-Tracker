import React from 'react'
import {Card, CardContent} from '@material-ui/core';
import "../InfoBox.css";
import Typography from '@material-ui/core/Typography';


// const theme = createMuiTheme({
//     palette: {
//       primary: {
//         main: cyan[500],
//       },
//       secondary: {
//         main: '#f44336',
//       },
//     },
//   });

const InfoBox = ({title, cases, isRed, isBlue, total, active , ...props}) => {
    return (
        <Card className={`infoBox ${(active && isRed) &&'infoBox--red'}
        ${(active && isBlue) &&'infoBox--blue'}
         ${(active) && 'infoBox--selected'} 
         `}         
          onClick={props.onClick}>
        {/* Coronovirus cases */}
            <CardContent>
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>
        
        {/* Number of cases */}
                <h2 className={`infoBox_cases ${!isRed && !isBlue && "infoBox__cases__green"}`}>{cases}</h2>

        {/* Total Cases */}
                <Typography className="infoBox__total" color="textSecondary">
                    {total} Total
                </Typography>

            </CardContent>
        </Card>
    )
}

export default InfoBox
