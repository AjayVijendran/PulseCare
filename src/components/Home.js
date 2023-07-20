import React, { useState, useEffect } from 'react';
import { Card, CardContent, ThemeProvider, Typography, createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Header from "./Header";
export const theme = createTheme({
    palette : {
        background  : 'none'
    }
})
const useStyles = makeStyles((theme)=>({
    root: {
        background : '#2ECC71',
        height : '70vh',
        width: '50vh',
    },
    container : {
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'space-around',
        alignItems  :'center',
        height : '100vh',
    },
    content : {
        color : 'black',
        fontFamily : 'Nunito',
        textAlign : "center",
        width : "100%",
        height : "100%",
        display  :"flex",
        flexDirection : "column",
        justifyContent : "space-around",
        alignItems : "center",
    },
    text : {
        backgroundColor : "white", width:"100%"
    },
    msg : {
        backgroundColor : "#422715", 
        width: "70vh",
        textAlign : "center",
        color : "white",
        borderRadius : "10px"
    }
}))

export default function Home(){
    const classes = useStyles();
    const [data, setData] = useState(null);
    useEffect(() => {
    fetch('http://127.0.0.1:4000',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => setData(data));
    }, []);
    let list = []
    if(data == null){
        console.log(data);
    }
    else{
        list = [data.pr,data.temp,data.body];
    }
    return (
    <ThemeProvider theme={theme}>
        <div className={classes.container}>
            <Header/>
            <Card className={classes.root}>
                <CardContent className={classes.content}>
                    <Typography variant="h5" component="h2" className={classes.text}>
                        Pulse rate
                    </Typography>
                    <Typography variant="h5" component="h2" className={classes.text}>
                          {list[0]} BPM
                    </Typography>
                    <Typography variant="h5" component="h2" className={classes.text}>
                        Temperature
                    </Typography>
                    <Typography variant="h5" component="h2" className={classes.text}>
                        {list[1]} °C
                    </Typography>
                </CardContent>
            </Card>
            <Typography variant="h3" component="h2" className={classes.msg}>
                    {list[2]}
            </Typography>
        </div>
    </ThemeProvider>
    )
}