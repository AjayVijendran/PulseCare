import { ToastContainer } from "react-toastify";
import { makeStyles } from "@mui/styles";
import { CssBaseline } from "@mui/material";
import Bgimage from "./assets/bgimg.jpg"
import Header from "./components/Header";
import LoginForm from "./components/Login";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./components/Home";
const useStyles = makeStyles((theme)=>({
  root : {
    minHeight : '100vh',
    backgroundImage : `url(${Bgimage})`,
    backgroundRepeat : 'no-repeat',
    backgroundSize : 'cover'
  }
}));
function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline/>
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path = "/" exact element = {<Home/>}></Route>
          <Route path="/login" exact element={<LoginForm/>}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  );
}

export default App;
