import React, { useState, useEffect } from "react";
import axios  from 'axios';
import {
  ReportWrapper,
  StyledTable,
} from "./styles";
import {Row,Col} from 'react-bootstrap'
const ShowTotalAdCost = ({obj,history}) => {

  const [spend,setSpend] = useState([])
  const [counter,setCounter] = useState(0)
  const [ans,setAns] = useState(0.0)
  let set =0
  let ff;
  let ret=[]
  let sum=0
  if(obj)
  {
   // console.log("hahah  ",obj)
   set = Number(obj.id)
  }
  
  useEffect(() => {

    setTimeout(() => {
   try{
     if(obj.accessToken){
       if(counter===0){
        ff= Number(obj.fb)
    async function con(){
    const {data} =await axios.get(
          `https://graph.facebook.com/v12.0/act_${ff}/insights?date_preset=last_7d&time_increment=1&fields=spend%2Cctr%2Ccpp&access_token=${obj.accessToken}`)
          setSpend(data)
         
         // console.log("chand   ",data.data[0].spend)
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

  }, 12000);
   
  }, [history,obj,spend,set,counter]);

  let cp=0.0;
  let cpa=[]
  try{
    if(spend){
      for(let i=0; i<spend.data.length;i++)
      {
          sum =sum + (Number(spend.data[i].spend))
          cp=  (cp+ (Number(parseFloat(spend.data[i].cpp))) )
  
          console.log("yrr cp->",cp," i->",i+1,"  ind",(Number(parseFloat(spend.data[i].cpp))))
          ret.push(sum)
          cpa.push(cp)
      }
    
     }
  }
 catch(err)
 {
   console.log("tareef",err)
 }
  
  return (
   
    <Row>
       <Col md={3}>
        <ReportWrapper>
            <StyledTable>
          <thead>
            <tr>
              Ad Cost
            </tr>
          </thead>
        
                    
                    {spend.data &&(
                <tbody style={{"background-color": "pink"}}>
                
                {
                  spend.data.map((ts,index)=>{
                    return(
                           <tr>   
                              
                              <td>${ (ret[index]).toFixed(2) }</td>
                          </tr>  
                    )
                  })
                }

               
                
                </tbody>
                      )}
        </StyledTable>
 
    </ReportWrapper>
       </Col>


       <Col md={6}>
    <ReportWrapper>
            <StyledTable>
          <thead>
            <tr>
              Average CPA
            </tr>
          </thead>
        
                    
                    {spend.data &&(
                <tbody style={{"background-color": "orange"}}>

                {
                  spend.data.map((c,ind)=>{
                    return(
                           <tr>   
                              
                              <td>{((cpa[ind]/(ind+1)).toFixed(2))}</td>
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

  );
};

export default ShowTotalAdCost;
