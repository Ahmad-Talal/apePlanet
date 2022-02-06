import React, { useState, useEffect } from "react";
import axios  from 'axios';
import Loader from '../components/Loader'
import { useHistory } from "react-router-dom";
import {
  ReportWrapper,
  StyledTable,
} from "./styles";
import {Row,Col} from 'react-bootstrap'
const ShowAdCost = ({obj}) => {

  let history = useHistory();
  const [spend,setSpend] = useState([])
  const [counter,setCounter] = useState(0)
  const [loading,setLoading] = useState(true)
  let set =0
  let ff ;
  if(obj)
  {
    //console.log("hahah  ",obj)
   set = Number(obj.id)
  }
  
  useEffect(() => {

    setTimeout(() => {
   try{
     if(obj.accessToken){
       if(counter===0){
        // console.log("shishi  ",obj.fb)
         ff= Number(obj.fb)
    async function con(){
      setLoading(false)

      
    const {data} =await axios.get(
          `https://graph.facebook.com/v12.0/act_${ff}/insights?date_preset=last_7d&time_increment=1&fields=spend%2Cctr%2Ccpp&access_token=${obj.accessToken}`)
         
          console.log('lag aese ,',data)
          if (data)
          {
          setSpend(data)
         
          }else
          {
            window.confirm("Need to Sign in through Admin. Contact Admin!!")
            history.puhs('/')
          } 
       //   console.log("chand   ",data.data[0].spend)
      //console.log("all  ",spend)
          setCounter(1)
        }
  con()  
      }

      }
   }
   catch(err){
        if (set!==0)
            {
              history.push(`/campaign/${set}`)
            }
                 
   }

  }, 2000);
   
  }, [history,obj,spend,set,counter]);
 

  return (
 <div>
 {
   loading ? <Loader></Loader> 
   :
   <Row>

       <Col md={3}>
        <ReportWrapper>
            <StyledTable>
          <thead>
            <tr>
              Ad Cost
            </tr>
          </thead>
        
                    
                    {spend && spend.data &&(
                <tbody style={{"background-color": "lightgreen"}}>
               {
                 spend.data.map(s=>{
                   return(<tr>        
                <td>${s.spend}</td>
                </tr>  )
                 })
               }
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
        
                    
                    {spend.data &&(
                <tbody style={{"background-color": "pink"}}>
               {
                 spend.data.map(cp=>{
                   return(
                    <tr>        
                    <td>
                    {parseFloat(cp.cpp).toFixed(2)}
                    </td>
                    </tr>  
                   )
                 })
               }
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
        
                    
                    {spend.data &&(
                <tbody style={{"background-color": "orange"}}>
                
                {
                  spend.data.map(cr=>{
                    return(
                        <tr>        
                            <td>{parseFloat(cr.ctr).toFixed(2)}%</td>
                        </tr>  
                    )
                  })
                }
                </tbody>
                      )}
        </StyledTable>
 
    </ReportWrapper>
    </Col>

   </Row>


 }
       </div>

  );
};

export default ShowAdCost;
