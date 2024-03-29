import React, {useState, useEffect} from 'react';
import axios  from 'axios';
import {
    ReportWrapper,
    ChartTitle,
    StyledTable,
  } from "./styles";

const SpendReport =() =>{

    const [amount,setAmount] = useState(0.0)
    const [m,setM] = useState(626846635153078)
    useEffect(() => {
    async function con(){
        
        
        const {data} =await axios.get(`https://graph.facebook.com/v12.0/act_${m}/insights?fields=ad_id%2Cad_name%2Caccount_id%2Cspend&access_token=EAANWz0dwzuABAFt3JOD1G6yZAuZAZBZChGhHtoYBoof2OgUaEXGTRud69oLZCZAwerFOJZAfmICBg1n4abrZB1dOxZAD9LCYufbHiJ4GQ3Gf7CcFyxWm09sv5KpdD98BYd4VrxC3q9Ys12GWXjZBIEUGEGYN3zhUGGhHDfZBpGXjeibAEZBZA9kwMXNwO`)
        //console.log("data",data.data[0].spend)
        
        // if(data.data[0].spend)
        // {
        // setAmount(data.data[0].spend)    
        // }
        //data.data === [] ? setAmount(0.0) : setAmount(data.data.spend)
      }
    con()  
}, [])

return (
    <ReportWrapper>
    <ChartTitle>Total Amount</ChartTitle>
    <StyledTable>
          <thead>
            <tr>
              <th>Ad cost</th>
            </tr>
          </thead>
          <tbody>
          <td>{amount}</td>
          </tbody>
     </StyledTable>   
    </ReportWrapper>
)

}
export default SpendReport;