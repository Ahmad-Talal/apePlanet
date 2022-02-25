import React, { useState, useEffect } from "react";
import "./App.css";
import { renderButton, checkSignedIn } from "./GoogleAuth/authUtils";
import Dashboard from "./Dashboard/dashboard";
import styled from "styled-components";
import Footer from "./components/foot";
import axios from 'axios'
import { useSelector} from 'react-redux'
import Goals from './Goals'
import FacebookLogin from 'react-facebook-login';

function Talala({match,history,props}) {
  const [idd,setIdd] = useState("")
  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo} = userLogin
  const [loggedIn,setLoggedIn] = useState(false)
  const [userId,setUserId] = useState("")
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [picture,setPicture] = useState("")
  const [token,setToken] = useState("")
  const [set,setSet] = useState({})


  // Facebook Functions 
  const componentClicked = data =>{
    console.log("data   ",data)
};
const responseFacebook = response => {
  
  try{

    if(response.name){

      //console.log("hahaha     ",response);
      setName(response.name)
      setLoggedIn(true)
      
      setEmail(response.email)
      setPicture(response.picture.data.url)
      setUserId(response.userId)
      setToken("EAAJEpxZA4WZA0BAOgmkQI2eZAcz4ZAD9MwyZApM87GL9hb42IoShmhvmJpuLShAslU0zDA36wTPLLW1nZC3oJTMl3MDJdRM9zJC3L1KBjqWC6XksCFBmtwfPTSGB7t4rpVuy2XtK7xvadH0iaqrelXn4qlbn1O5x20mUMaDe1KFkXyaGFvSkPn2S60myAOhr6wjRBmIfrEtqwcicCVTqKahhceXTDZCZBS8ZD")
    }  
  }catch(err){

  }
    
  };

  useEffect(() => {

    try{
    if(userInfo){
        
    async function clientIdGet(){
        
    const {data} =await axios.get(`/api/users/clientid/`)
        setIdd(data.cl)
        //console.log("bhaijaan",data.cl)
    }   
    clientIdGet() 
    
    async function fbtokenGet(){
  
          const {data} =await axios.get(`/api/users/token/${1}/`)
          setToken(data.fbToken)
          //console.log("investment ",data.fbToken) 
      }   
      fbtokenGet() 
    //setParse(`/live-campaign/${va}?platform=${campaign.platform}`)
}  
else
{
  history.push('/login')
}  
  } 
  catch(err)
{
    console.log("The following error occurred   ",err)
    
}



}, [history,userInfo,loggedIn,name,picture,email,userId,token])

  const [isSignedIn, setIsSignedIn] = useState(false);

  const updateSignin = (signedIn) => {
    setIsSignedIn(signedIn);
    if (!signedIn) {
      renderButton();
    }
  };

  const init = () => {
    checkSignedIn()
      .then((signedIn) => {
        updateSignin(signedIn);
        window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignin);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    window.gapi.load("auth2", init);
  });

  return (
    <div className="App">
      <Dashboard obj ={{accessToken:token,id:props.ID}}/>
    </div>
             );
}

export default Talala;

const ButtonContainer = styled.div`
  height: 70vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  padding-top: 10vmin;
  margin-top: 0;
`;
