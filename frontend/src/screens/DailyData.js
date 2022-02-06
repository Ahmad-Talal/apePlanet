import React, { useState } from "react";
import { useSelector} from 'react-redux'

import {Row,Col} from 'react-bootstrap';


import ShowLeads from "../Dashboard/ShowLeads"
import ShowReserves from "../Dashboard/ShowReserves"
import ShowConRate from "../Dashboard/ShowConRate"
import ShowUsers from "../Dashboard/ShowUsers"
import ShowDate from "../Dashboard/ShowDate"
import ShowResRate from "../Dashboard/ShowResRate"
import ShowAdCost from "../Dashboard/ShowAdCost"
import ShowCpa from "../Dashboard/ShowCpa"
import ShowCtr from "../Dashboard/ShowCtr"


const DailyData = ({match}) => {
  const viewID = match.params.id
  console.log("viewsId",viewID)
  return (
    <div>
       <h2>Daily Data</h2>
       {
         viewID ?
        <Row>
        
         
              <Col md={2}>
              <ShowDate viewID={viewID} />
              </Col>
              <Col md={2}>
              <ShowUsers viewID={viewID} /> 
              </Col> 
            
             {/* <Col md={2}>
              <ShowLeads viewID={viewID} />
              </Col>    
           
              <Col md={2}>
              <ShowConRate viewID={viewID} />
              </Col>
          
              <Col md={2}>
              <ShowReserves viewID={viewID} />
              </Col>
            
              <Col md={2}>
              <ShowResRate viewID={viewID} />
              </Col>
            
              <Col md={2}>
              <ShowAdCost viewID={viewID} />
              </Col>
              <Col md={2}>
              <ShowCpa viewID={viewID} />
              </Col>
      
              <Col md={2}>
              <ShowCtr viewID={viewID} />
              </Col> */}
            </Row>
            :<h></h>
       }
      
    </div>
  );
};

export default DailyData;
