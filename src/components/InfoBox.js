import React from 'react'
import {Card, CardContent} from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import cyan from '@material-ui/core/colors/cyan';

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

const InfoBox = ({title, cases, total}) => {
    return (
        <Card className="infoBox">
        {/* Coronovirus cases */}
            <CardContent>
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>
        
        {/* Number of cases */}
                <h2 className="infoBox_cases">{cases}</h2>

        {/* Total Cases */}
                <Typography className="infoBox__total" color="textSecondary">
                    {total} Total
                </Typography>

            </CardContent>
        </Card>
    )
}

export default InfoBox
