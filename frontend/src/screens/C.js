import React, {useState, useEffect} from 'react';
import axios  from 'axios';

import {
    ReportWrapper,
    StyledTable,
  } from "../Dashboard/styles";

import {Row,Col} from 'react-bootstrap'
import FacebookLogin from 'react-facebook-login';
 

const C =() =>{
    const [loggedIn,setLoggedIn] = useState(false)
    const [userId,setUserId] = useState("")
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [picture,setPicture] = useState("")
    const [token,setToken] = useState("")
    const act = 3016464492016270
    const componentClicked = data =>{
        console.log("data   ",data)
    };
    const responseFacebook = response => {
        console.log("hahaha     ",response);
        setLoggedIn(true)
        setName(response.name)
        setEmail(response.email)
        setPicture(response.picture.data.url)
        setUserId(response.userId)
        setToken(response.accessToken)
      };
       
    const [set,setSet] = useState({})
    useEffect(() => {

       
            setTimeout(() => {   
                if (token){
                    async function con(){
                    
                    
                        console.log("daaata->  ",2)
                        const {data} =await axios.get(
                            `https://graph.facebook.com/v12.0/act_${act}/insights?date_preset=last_7d&time_increment=1&fields=spend%2Cctr%2Ccpp&access_token=${token}`)
                            
                        console.log("abbu gg        ",data)
                        setSet(data)
                        if(set.data)
                        {
                        console.log("token he ye    ",set.data[0].cpp)
                        }
                    }
                    con()  
                }  
            }, 8000);
        
        
  
    
}, [set,loggedIn,name,picture,email,userId,token])

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
   
   <Row>
       <Col md={2}>
        <ReportWrapper>
            <StyledTable>
          <thead>
            <tr>
              Ad Cost
            </tr>
          </thead>
        
                    
                    {set.data &&(
                <tbody>
               
                <tr>        
                <td>{set.data[0].spend}</td>
                </tr>  
               
                <tr>        
                <td>{set.data[1].spend}</td>
                </tr>  
               
                <tr>        
                <td>{set.data[2].spend}</td>
                </tr>  
               
                <tr>        
                <td>{set.data[3].spend}</td>
                </tr>  
               
                <tr>        
                <td>{set.data[4].spend}</td>
                </tr>  
               
                <tr>        
                <td>{set.data[5].spend}</td>
                </tr>  
               
                <tr>        
                <td>{set.data[6].spend}</td>
                </tr>  
                
                </tbody>
                      )}
        </StyledTable>
 
    </ReportWrapper>

       </Col>

    <Col md={2}>
    <ReportWrapper>
            <StyledTable>
          <thead>
            <tr>
              CPA
            </tr>
          </thead>
        
                    
                    {set.data &&(
                <tbody>
               
                <tr>        
                <td>{set.data[0].cpp}</td>
                </tr>  
               
                <tr>        
                <td>{set.data[1].cpp}</td>
                </tr>  
               
                <tr>        
                <td>{set.data[2].cpp}</td>
                </tr>  
               
                <tr>        
                <td>{set.data[3].cpp}</td>
                </tr>  
               
                <tr>        
                <td>{set.data[4].cpp}</td>
                </tr>  
               
                <tr>        
                <td>{set.data[5].cpp}</td>
                </tr>  
               
                <tr>        
                <td>{set.data[6].cpp}</td>
                </tr>  
                
                </tbody>
                      )}
        </StyledTable>
 
    </ReportWrapper>

    </Col>

    <Col md={2}>
    <ReportWrapper>
            <StyledTable>
          <thead>
            <tr>
              CTR
            </tr>
          </thead>
        
                    
                    {set.data &&(
                <tbody>
               
                <tr>        
                <td>{set.data[0].ctr}</td>
                </tr>  
               
                <tr>        
                <td>{set.data[1].ctr}</td>
                </tr>  
               
                <tr>        
                <td>{set.data[2].ctr}</td>
                </tr>  
               
                <tr>        
                <td>{set.data[3].ctr}</td>
                </tr>  
               
                <tr>        
                <td>{set.data[4].ctr}</td>
                </tr>  
               
                <tr>        
                <td>{set.data[5].ctr}</td>
                </tr>  
               
                <tr>        
                <td>{set.data[6].ctr}</td>
                </tr>  
                
                </tbody>
                      )}
        </StyledTable>
 
    </ReportWrapper>
    </Col>

   </Row>
   
    
    

   </div>
)

}
export default C; 