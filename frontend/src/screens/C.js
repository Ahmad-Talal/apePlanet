import React, {useState, useEffect} from 'react';
import "../App.css";
import axios  from 'axios';
import { useSelector} from 'react-redux'
import {
    ReportWrapper,
    StyledTable,
  } from "../Dashboard/styles";

import {Row,Col} from 'react-bootstrap'
import FacebookLogin from 'react-facebook-login';
import { combineReducers } from 'redux';
import { renderButton, checkSignedIn } from "../GoogleAuth/authUtils";
import styled from "styled-components";
import { GoogleLogin } from 'react-google-login';
 

const C =({history}) =>{
    
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin
    
    const [loggedIn,setLoggedIn] = useState(false)
    const [signedIn,setSignedIn] = useState(false)
    const [userId,setUserId] = useState("")
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [picture,setPicture] = useState("")
    const [token,setToken] = useState("")
    const [googleTok,setGoogleTok] = useState("")
    const [state,setState] = useState(true)
    const [state2,setState2] = useState(true)
    const act = 3016464492016270
    const componentClicked = data =>{
      try{
        console.log("data   ",data)
    }
    catch(err)
    {
      console.log(err)
    }
        
    };
    const responseFacebook = response => {
      try{
        console.log("hahaha     ",response);
        setLoggedIn(true)
        setName(response.name)
        setEmail(response.email)
        setPicture(response.picture.data.url)
        setUserId(response.userId)
        setToken(response.accessToken)
      }
      catch(err){
          console.log(err)
      }
       
      };

      
const responseGoogle = (response) => {
  try{
    console.log("response   ",response.accessToken);
    setSignedIn(true)
    setGoogleTok(response.accessToken)
 }
 catch(err){

 }
 
}

       
    const [set,setSet] = useState({})
    const [setg,setSetg] = useState({})
    useEffect(() => {

      if(userInfo&&userInfo.isAdmin){
        try{
        if(token && googleTok){
                if (state){
                    async function con(){
                    
                    
                        //console.log("daaata->  ",2)
                        const {data} =await axios.put(
                            `/api/users/token/send/${1}/`,
                            {'fbToken':token})
                            
                        // console.log("abbu gg        ",data)
                        setSet(data)
                        setState(false)
                    }
                    con()  
                } 

                if (state2){
                  async function sendGoogleToken(){
                  
                  
                      //console.log("daaata->  ",2)
                      const {data} =await axios.put(
                          `/api/users/google/token/send/${1}/`,
                          {'googleToken':googleTok})
                          
                      // console.log("abbu gg        ",data)
                      setSetg(data)
                      setState2(false)
                  }
                  sendGoogleToken()  
              } 

              } 
            }
            catch(err){
              window.confirm("Sorry Could not sign in with facebook, try again!!")
              history.push("/")
            }
          }
            else{
                  history.push("/")
            }
}, [set,loggedIn,name,picture,email,userId,token,state,history,userInfo,signedIn,googleTok,setg,state2])




return (
   <div> 
   {
     signedIn ?
     (
       <div>
          <strong>
            {googleTok}
          </strong>
       </div>
     )
     :
     (
      <GoogleLogin
              clientId="595698966414-6q021rval3139h8v5opib47ij85l02km.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              isSignedIn={true}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
  
     )
     
   }
        
   {
        loggedIn ?
       <div style={{
        width:"400px",
        margin :"auto",
        background:"#F4F4F4",
        padding:"20px"
       }}>
                <img src={picture} alt={name}></img>
                <h2>Welcome {name}</h2>
                Email: {email}
                <Row>
                <Col md={8}>
                <h style={{width:"200px",margin:"auto",padding:"10px"}}>Token : {token}</h>
                </Col>
                </Row>
                
       </div>
       :
       <div>
       <FacebookLogin
          appId="638434380634525"
          autoLoad={true}
          fields="name,email,picture"
          onClick={componentClicked}
          callback={responseFacebook} />
       </div>       
   }   
   </div>
)

}
export default C; 
