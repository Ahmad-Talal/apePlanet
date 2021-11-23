import React, { useState, useEffect } from "react";
import "./App.css";
import { renderButton, checkSignedIn } from "./GoogleAuth/authUtils";
import Dashboard from "./Dashboard/dashboard";
import styled from "styled-components";
import Footer from "./components/foot";
import axios from 'axios'
import { useSelector} from 'react-redux'
import Goals from './Goals'
function Talala({history}) {

  const [idd,setIdd] = useState("")
  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo} = userLogin

  useEffect(() => {

    try{
    if(userInfo){
        
    async function clientIdGet(){
        
    const {data} =await axios.get(`/api/users/clientid/`)
        setIdd(data.cl)
        //console.log("bhaijaan",data.cl)
    }   
    clientIdGet()  
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
}, [history,userInfo])

  const [isSignedIn, setIsSignedIn] = useState(false);

  const updateSignin = (signedIn) => {
    setIsSignedIn(signedIn);
    if (!signedIn) {
      renderButton();
    }
  };

  const init = () => {
    checkSignedIn(idd)
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
      {!isSignedIn ? (
        <>
          <Title>Google Analytics Dashboard</Title>
          <ButtonContainer>
            <div id="signin-button"></div>
          </ButtonContainer>
          <Footer />
        </>
        
      ) : (
        <Dashboard />
        
      )}
      
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
