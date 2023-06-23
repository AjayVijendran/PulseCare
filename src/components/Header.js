import { AppBar } from "@mui/material";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme)=>({
    root : {
        display : "flex",
        justifyContent : "center",
        alignItems : "center"
    },
    text : {
        color : "black",
        margin: "0 auto"
    },
    icon  : {
        fontSize: "4rem"
    }
}));

export default function Header(){
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <AppBar style={{background : 'none'}} elevation={0}>
                <h1 className={classes.text}>PulseCare</h1>
            </AppBar>
        </div>
    )
}