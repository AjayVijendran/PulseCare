
import { Card, CardContent, ThemeProvider, Typography, createTheme } from "@mui/material";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { makeStyles } from "@mui/styles";
import { initializeApp } from "firebase/app";
let pr = ''
let temp = ''
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
        justifyContent : 'center',
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
}))
const firebaseConfig = {
  apiKey: "AIzaSyCXVvpIH4wN_SEqC7UJk757SPPbKx6kcY0",
  authDomain: "pulsecare-b4ad6.firebaseapp.com",
  projectId: "pulsecare-b4ad6",
  storageBucket: "pulsecare-b4ad6.appspot.com",
  messagingSenderId: "974009132259",
  appId: "1:974009132259:web:b7d988f25275d52d2c91d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// class City {
//     constructor (pr,temp ) {
//         this.pr = pr;
//         this.temp = temp;
//     }
//     toString() {
//         return this.pr + ', ' + this.temp;
//     }
// }

// Firestore data converter
// const converter = {
//     toFirestore: (details) => {
//         return {
//             pr: details.pr,
//             temp: details.state,
//             };
//     },
//     fromFirestore: (snapshot, options) => {
//         const data = snapshot.data(options);
//         return new City(data.pr, data.temp,);
//     }
// };
const fetchdata = () =>{
    getDocs(collection(db,"users")).then((querysnapshot)=>{
        querysnapshot.forEach((doc)=>{        
            const values = {...doc.data()}
            pr = values.pr
            temp = values.temp
            console.log(pr,temp);
        })
    })
}

export default function Home(){
    const classes = useStyles();
    fetchdata();
    console.log(pr,temp)
    return (
    <ThemeProvider theme={theme}>
        <div className={classes.container}>
            <Card className={classes.root}>
                <CardContent className={classes.content}>
                    <Typography variant="h5" component="h2" sx={{backgroundColor : "#4169E1", width:"100%"}}>
                        Pulse rate
                    </Typography>
                    <Typography variant="h5" component="h2" sx={{backgroundColor : "white", width:"100%"}}>
                         {pr} BPM
                    </Typography>
                    <Typography variant="h5" component="h2" sx={{backgroundColor : "#4169E1", width:"100%"}}>
                        Temperature
                    </Typography>
                    <Typography variant="h5" component="h2" sx={{backgroundColor : "white", width:"100%"}}>
                        {temp} *C
                    </Typography>
                </CardContent>
            </Card>
        </div>
    </ThemeProvider>
    )
}