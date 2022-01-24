import React, { useState} from "react";
import { useSelector} from 'react-redux'

import {Row,Col,} from 'react-bootstrap';
import DayVisitsReport from "./dayVisitsReport";
import CountriesReport from "./countriesReport";
import PageviewsReport from "./pageviewReport";
import SourceReport from "./sourceReport";
import BrowsersReport from "./browsersReport";
import DevicesReport from "./devicesReport";
import ConReport from "./ConReport";
import LeadsReport from "./LeadsReport";
import DepositReport from "./DepositReport";
import CountryAnalysisLeads from "./CountryAnalysisLeads";
import CountryAnalysisReserves from "./CountryAnalysisReserves";
import SpendReport from "./SpendReport"

import ShowLeads from "./ShowLeads"
import ShowReserves from "./ShowReserves"
import ShowConRate from "./ShowConRate"
import ShowUsers from "./ShowUsers"
import ShowDate from "./ShowDate"
import ShowResRate from "./ShowResRate"
import ShowAdCost from "./ShowAdCost"

import ShowTotalUsers from "./ShowTotalUsers";
import ShowTotalLeads from "./ShowTotalLeads";
import ShowTotalReserves from "./ShowTotalReserves";
import ShowDevices from "./ShowDevices";
import ShowBrowsers from "./ShowBrowsers";
import ShowCountryR from "./ShowCountryR";
import ShowTotalLead from "./ShowTotalLead";
import ShowTotalReserve from "./ShowTotalReserve";
import ShowTotalReserveRate from "./ShowTotalReserveRate";
import Show24Reserves from "./Show24Reserves";
import Show24CountryR from "./Show24CountryR";
import Show24ResRate from "./Show24ResRate";
import ShowCountryL from "./ShowCountryL";
import Show24CountryL from "./Show24CountryL";
import Show24Leads from "./Show24Leads";
import ShowTotalAdCost from "./ShowTotalAdCost"

import axios from 'axios'
import Cpa from "./Cpa"
import Ctr from "./Ctr"




const DashBoard = ({obj,history}) => {
  const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

  const [viewID, setViewID] = useState(null);
  const [fbID, setFbID] = useState(null);

 // console.log("chalo  ",obj)

const setKar=()=>{

  async function campaignlist(){
        
    const {data} =await axios.get(`/api/users/campaign/${userInfo._id}`)
       
        setViewID(`${data.gaId}`)
        setFbID(data.fbId)
        //console.log('haae oee',data.fbId)
    }   
    campaignlist()  
    //setViewID(`${campaign.gaId}`)

}


  return (
    <>
      
      {viewID ? (
        <div>
        <div>
          <DayVisitsReport
            metric={"ga:users"}
            title={"Users"}
            viewID={viewID}
          />
          <DayVisitsReport
            metric={"ga:sessions"}
            title={"Sessions"}
            viewID={viewID}
          />
          <CountriesReport viewID={viewID} />
          <PageviewsReport viewID={viewID} />
          <SourceReport viewID={viewID} />

          <ConReport viewID={viewID} />
          <LeadsReport viewID={viewID} />
          <DepositReport viewID={viewID} />
          <CountryAnalysisLeads viewID={viewID} />
          <CountryAnalysisReserves viewID={viewID} />
          <SpendReport  />
          <Cpa/>
          <Ctr />

          
            <BrowsersReport viewID={viewID} />
            <DevicesReport viewID={viewID} />
         
            <Row>
          <Col md={2}>

          </Col>
          <Col md={10}>
            <h2>Daily Data</h2>
          </Col>
        </Row>

        <Row>
        
         
              <Col md={2}>
              <ShowDate viewID={viewID} />
              </Col>
       
              <Col md={1}>
              <ShowUsers viewID={viewID} /> 
              </Col>

              <Col md={1}>
              <ShowLeads viewID={viewID} />
              </Col>
          
          
              <Col md={1}>
              <ShowConRate viewID={viewID} />
              </Col>
          
              <Col md={1}>
              <ShowReserves viewID={viewID} />
              </Col>
            
              <Col md={1}>
              <ShowResRate viewID={viewID} />
              </Col>
             
              <Col md={5}>
              <ShowAdCost obj={{accessToken:obj.accessToken, id:obj.id, fb:fbID}} />
              </Col>
              
              
    
              {/* <Col md={2}>
              <ShowCpa viewID={viewID} />
              </Col>
      
              <Col md={2}>
              <ShowCtr viewID={viewID} />
              </Col> */}
            </Row>

        <Row>
          <Col md={12}>
          <h2>Commulative Data</h2>
            
          </Col>
        </Row>

        <Row>
          <Col md={2}>
              <ShowDate viewID={viewID} />
        </Col>

         <Col md={2}>
          <ShowTotalUsers viewID={viewID} />
        </Col>
        <Col md={2}>
          <ShowTotalLeads viewID={viewID} />
        </Col>
        <Col md={2}>
          <ShowTotalReserves viewID={viewID} />
        </Col>
        <Col md={4}>
              <ShowTotalAdCost obj={{accessToken:obj.accessToken, id:obj.id, fb:fbID}} />
            </Col>
            {/* <Col md={2}>
              <ShowCpa viewID={viewID} />
            </Col>  */}
      </Row>

       

        <Row>
           <Col md={9}>
          <strong>Country Lead</strong>
          <ShowBrowsers viewID={viewID} />

          </Col>

          <Col md={3}>
          <strong>Country Reserve</strong>
          <ShowDevices viewID={viewID} />
          </Col> 

        </Row>
        
        <Row>
          <h2>Country Analysis</h2>
        </Row>

        <Row>
        <Col md={4}>
        <ShowCountryR viewID={viewID} />
        </Col>
        <Col md={4}>
        <ShowTotalReserve viewID={viewID} />
        </Col>
        <Col md={4}>
        <ShowTotalReserveRate viewID={viewID} />
        </Col>
        </Row>

        <Row>

         <Col md={4}>
        <Show24CountryR viewID={viewID} />
        </Col>
        <Col md={4}>
        <Show24Reserves viewID={viewID} />
        </Col>
        <Col md={4}>
        <Show24ResRate viewID={viewID} />
        </Col> 
        </Row>

        <Row>
        <Col md={6}>
        <ShowCountryL viewID={viewID} />
        </Col>
        <Col md={6}>
        <ShowTotalLead viewID={viewID} />
        </Col>
        </Row>

        <Row>
          <Col md={6}>
          <Show24CountryL viewID={viewID} />
          </Col>
          <Col md={6}>
          <Show24Leads viewID={viewID} />
          </Col>
        </Row>

        </div>
        </div>
      ) : (
        setKar()
      )}
    </>
  );
};

export default DashBoard;
