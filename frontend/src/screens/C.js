import React, {useState, useEffect} from 'react';
import axios  from 'axios';
import { useSelector} from 'react-redux'
import {
    ReportWrapper,
    StyledTable,
  } from "../Dashboard/styles";

import {Row,Col} from 'react-bootstrap'
import FacebookLogin from 'react-facebook-login';
import { combineReducers } from 'redux';
 

const C =({history}) =>{
    
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin
    
    const [loggedIn,setLoggedIn] = useState(false)
    const [userId,setUserId] = useState("")
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [picture,setPicture] = useState("")
    const [token,setToken] = useState("")
    const [state,setState] = useState(true)
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
       
    const [set,setSet] = useState({})
    useEffect(() => {

      if(userInfo&&userInfo.isAdmin){
        try{
        if(state){
                if (token){
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
}, [set,loggedIn,name,picture,email,userId,token,state,history,userInfo])

return (
   <div> 
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