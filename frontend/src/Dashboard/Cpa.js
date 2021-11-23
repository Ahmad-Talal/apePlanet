import React, {useState, useEffect} from 'react';
import axios  from 'axios';
import {
    ReportWrapper,
    ChartTitle,
    StyledTable,
  } from "./styles";

const Cpa =() =>{

    const [amount,setAmount] = useState(0.0)
    const [m,setM] = useState(626846635153078)
    useEffect(() => {
    async function con(){
        
      //console.log('amount',amount)
        const {data} =await axios.get(`https://graph.facebook.com/v12.0/act_${m}/insights?fields=ad_id%2Cad_name%2Caccount_id%2Ccpp&access_token=EAANWz0dwzuABAFt3JOD1G6yZAuZAZBZChGhHtoYBoof2OgUaEXGTRud69oLZCZAwerFOJZAfmICBg1n4abrZB1dOxZAD9LCYufbHiJ4GQ3Gf7CcFyxWm09sv5KpdD98BYd4VrxC3q9Ys12GWXjZBIEUGEGYN3zhUGGhHDfZBpGXjeibAEZBZA9kwMXNwO`)
        // console.log("data",data.data[0].spend)
        // if(data.data[0].cpp){
        //   setAmount(data.data[0].cpp)
        // }
       // data.data === [] ? setAmount(0.0) : setAmount(data.data.cpp)
        
    }
    con()  
}, [])

return (
    <ReportWrapper>
    <ChartTitle>Average CPA</ChartTitle>
    <StyledTable>
          <thead>
            <tr>
              <th>cpa</th>
            </tr>
          </thead>
          <tbody>
          <td>{amount}</td>
          </tbody>
     </StyledTable>   
    </ReportWrapper>
)

}
export default Cpa; 