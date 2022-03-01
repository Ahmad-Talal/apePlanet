import React, { useState, useEffect } from "react";
import axios  from 'axios';
import { Pie } from "react-chartjs-2";
import { PieChartWrapper, colors } from "../Dashboard/styles";
import Loader from '../components/Loader'
import { useHistory } from "react-router-dom";
import Message from '../components/Message'
import {Row,Col,Table} from 'react-bootstrap'
import {useSelector} from 'react-redux'

import "chartjs-plugin-datalabels";


const ReportScreen = () => {

  let history = useHistory();
  
  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo} = userLogin

  const INITIAL_STATE = {
    labels: [],
    values: [],
    colors: [],
  };

  const [reportData, setReportData] = useState(INITIAL_STATE);
  const [reportDataR, setReportDataR] = useState(INITIAL_STATE);
  const [loading,setLoading] = useState(true)
  const [loading2,setLoading2] = useState(true)
  const [loading3,setLoading3] = useState(true)
  const [loading4,setLoading4] = useState(true)
  const [loading5,setLoading5] = useState(true)
  const [loading6,setLoading6] = useState(true)
  const [googleToken,setGoogleToken] = useState("")
  const [fbToken,setFbToken] = useState("")
  const [tokenState,setTokenState] = useState(true)
  const [error,setError] = useState("")
  const [counter,setCounter] = useState(0)
  const [counter2,setCounter2] = useState(0)
  const [counter3,setCounter3] = useState(0)
  const [counter4,setCounter4] = useState(0)
  const [counter5,setCounter5] = useState(0)
  const [counter6,setCounter6] = useState(0)
  const [googleData,setGoogleData] = useState([])
  const [fbData,setFbData] = useState([])
  const [countryData,setCountryData] = useState([])
  const [countryData24,setCountryData24] = useState([])
  const [leadGraph,setLeadGraph] = useState([])
  const [reserveGraph,setReserveGraph] = useState([])
  const [campaign,setCampaign] = useState({})
  const [campaignSetter, setCampaignSetter] = useState(0)

  const [viewID, setViewID] = useState(null);
  const [fbID, setFbID] = useState(null);

  let set = 254451522
  // eslint-disable-next-line react-hooks/exhaustive-deps
  var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
let start = yyyy-2
let yest = yyyy + '-' + mm + '-'+ (dd-1); 
//console.log("ye       ",yest)
today = yyyy + '-' + mm + '-'+ dd;


const displayResults = (response) => {
    const queryResult = response.rows;
    //console.log("sabse pehle idher    ",queryResult)
    let labels = [];
    let values = [];
    let bgColors = [];
    queryResult.forEach((row, idx) => {
        if (idx < 5) {
            
        labels.push(row[0]);
        values.push(row[1]);
        bgColors.push(colors[idx + 1]);
        }
    });
    setReportData({
      ...reportData,
      labels,
      values,
      colors: bgColors,
    });
    
  };

  const data = {
    labels: reportData.labels,
    datasets: [
      {
        data: reportData.values,
        backgroundColor: reportData.colors,
      },
    ],
  };

  const options = {
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          return data.labels[tooltipItem["index"]];
        },
      },
    },
    plugins: {
      datalabels: {
        color: "black",
        font: {
          size: 20,
        },
      },
    },
  };


  const disp = (response) => {
    const queryResult = response.rows;
    //console.log("sabse pehle idher 222222    ",queryResult)
    let labels = [];
    let values = [];
    let bgColors = [];
    queryResult.forEach((row, idx) => {
        if (idx < 5) {
            
        labels.push(row[0]);
        values.push(row[1]);
        bgColors.push(colors[idx + 1]);
        }
    });
    setReportDataR({
      ...reportDataR,
      labels,
      values,
      colors: bgColors,
    });
    
  };

  const daaa = {
    labels: reportDataR.labels,
    datasets: [
      {
        data: reportDataR.values,
        backgroundColor: reportDataR.colors,
      },
    ],
  };

  const opt = {
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          return data.labels[tooltipItem["index"]];
        },
      },
    },
    plugins: {
      datalabels: {
        color: "black",
        font: {
          size: 20,
        },
      },
    },
  };



  useEffect(() => {
     
        if(userInfo){

          if(campaignSetter===0){
            setCampaignSetter(1)
            async function campaignlist(){
              
              
              const {data} =await axios.get(`/api/users/campaign/${userInfo._id}/`)
                 
                  setCampaign(data)
                  setViewID(`${data.gaId}`)
                  setFbID(data.fbId)
                //  console.log('haae oee acesssssss,     , ',obj.accessToken)
              }   
              campaignlist()
  
          }
          
        if(tokenState &&campaign&&viewID&&fbID){                 

            async function getTokens(){     
                setTokenState(false)        
                try{        
                    const {data} =await axios.get(`/api/users/token/${1}/`)     
                    setFbToken(data.fbToken) 
                    setGoogleToken(data.googleToken)
                    //console.log(data)
                }
                catch(err){
                    setError("Request failed with status code 500")
                    //console.log("bc     ",error)
                }
                
               
                  }
            getTokens()

                }
            
       
            setTimeout(() => {
                
                  if(googleToken &&campaign&&viewID&&fbID){
                   
                    if(counter===0){
               
                 async function googleData(){               
                   try{
                    const {data} =await axios.get(
                        `https://www.googleapis.com/analytics/v3/data/ga?access_token=${googleToken}&ids=ga%3A${viewID}&dimensions=ga%3Adate&metrics=ga%3Ausers%2Cga%3Agoal1Completions%2Cga%3Agoal2Completions%2Cga%3Agoal2ConversionRate%2Cga%3AgoalConversionRateAll&sort=-ga%3Adate&start-date=2005-01-01&end-date=${today}`)
                        console.log('lag aese ,',data.rows)
                        setCounter(1)
                        setLoading(false) 
                       if (data)
                       {
                         
                       setGoogleData(data)
                      
                       }else
                       {
                         //window.confirm("Need to Contact Admin!!")
                         history.push('/')
                       } 
                 
                      
                   }
                   catch(err){
                       setLoading(false)
                       console.log("idher he bhaii google",err)
             
                       history.push('/')
                   }
                
                     }
               googleData()  
                   }
             
                   }
             
               }, 3000);



                   setTimeout(() => {

     if(fbToken &&campaign &&viewID&&fbID){
       if(counter2===0){
        
        async function fbDataFunction(){               
            try{
                setCounter2(1)
                const {data} =await axios.get(
                    `https://graph.facebook.com/v12.0/act_${fbID}/insights?fields=spend%2Cctr%2Ccpp&time_range%5Bsince%5D=${start}-08-01&time_range%5Buntil%5D=${today}&time_increment=1&limit=40&access_token=${fbToken}`)
                  console.log("fb dekh",data)
                 setLoading2(false) 
                if (data)
                {
                  
                setFbData(data)
               
                }else
                {
          
                  history.push('/')
                } 
          
               
            }
            catch(err){
                setLoading2(false)
                console.log("idher he bhaii",err)
            
                history.push('/')
            }
         
              }
        fbDataFunction()  
      }

      }
 

  }, 4000);


  setTimeout(() => {
                
    if(googleToken &&campaign &&viewID&&fbID){
     
      if(counter3===0){
 
   async function countriesData(){               
     try{
      const {data} =await axios.get(
          `https://www.googleapis.com/analytics/v3/data/ga?access_token=${googleToken}&ids=ga%3A${viewID}&dimensions=ga%3Acountry&metrics=ga%3Agoal1Completions%2Cga%3Agoal2Completions%2Cga%3Agoal2ConversionRate&sort=-ga%3Agoal1Completions&start-date=2005-01-01&end-date=${today}`)
        console.log('lag aese ,',data)
          setCounter3(1)
          setLoading3(false) 
         if (data)
         {
           
         setCountryData(data)
        
         }else
         {
       
           history.push('/')
         } 
   
        
     }
     catch(err){
         setLoading3(false)
        console.log("idher he bhaii google 2",err)
         //window.confirm("Need to Contact Admin!!")
         history.push('/')
     }
  
       }
 countriesData()  
     }

     }

 }, 5000);


 setTimeout(() => {
                
    if(googleToken &&campaign &&viewID&&fbID){
     
      if(counter4===0){
 
   async function countriesData24(){               
     try{
      const {data} =await axios.get(
          `https://www.googleapis.com/analytics/v3/data/ga?access_token=${googleToken}&ids=ga%3A${viewID}&dimensions=ga%3Acountry&metrics=ga%3Agoal1Completions%2Cga%3Agoal2Completions%2Cga%3Agoal2ConversionRate&sort=-ga%3Agoal1Completions&start-date=yesterday&end-date=today`)
            console.log('lag aese ,',data)
          setCounter4(1)
          setLoading4(false) 
         if (data)
         {
           
         setCountryData24(data)
        
         }else
         {
          
           history.push('/')
         } 
   
        
     }
     catch(err){
         setLoading4(false)
       console.log("idher he bhaii google3",err)
      
         history.push('/')
     }
  
       }
 countriesData24()  
     }

     }

 }, 5000);


 setTimeout(() => {
                
    if(googleToken &&campaign &&viewID&&fbID){
     
      if(counter5===0){
 
   async function leadsGraph(){               
    
      const {data} =await axios.get(
          `https://www.googleapis.com/analytics/v3/data/ga?access_token=${googleToken}&ids=ga%3A${viewID}&dimensions=ga%3Acountry&metrics=ga%3Agoal1Completions&sort=-ga%3Agoal1Completions&start-date=2005-01-01&end-date=yesterday`)
        console.log('lag aese ,',data)
       
          setCounter5(1)
          setLoading5(false) 

          if(data){
            setLeadGraph(data) 
            displayResults(data)
          }
             
  
       }
 leadsGraph()  
     }

     }

 }, 6000);


 setTimeout(() => {
                
    if(googleToken &&campaign &&viewID&&fbID){
     
      if(counter6===0){
 
   async function reservesGraph(){               
    
      const {data} =await axios.get(
          `https://www.googleapis.com/analytics/v3/data/ga?access_token=${googleToken}&ids=ga%3A${viewID}&dimensions=ga%3Acountry&metrics=ga%3Agoal2Completions&sort=-ga%3Agoal2Completions&start-date=2005-01-01&end-date=yesterday`)
        console.log('lag aese ,',data)
       
          setCounter6(1)
          setLoading6(false) 

          if(data){
            setReserveGraph(data) 
            disp(data)
          }
             
  
       }
 reservesGraph()  
     }

     }

 }, 7000);


            }
            else{
                history.push('/login')
            }
 
    
   
  }, [history,userInfo,googleToken,fbToken,error,loading,tokenState,googleData,counter,set,counter2,loading2,fbData,today,start,countryData,loading3,counter3,counter4,loading4,countryData24,yest,counter5,loading5,leadGraph,reportData,reserveGraph,counter6,loading6,reportDataR,viewID,fbID,campaign]);
 


let dateArr = []
let visArr = []
let leadArr = []
let resArr = []
let conArr = []
let resRateArr = []

let adCost = []
let cpa = []
let ctr = []
let totAdCost = []
let totCpa = []
let totCtr = []
let ad = 0
let cp = 0
let ct = 0

let TotalleadArr = []
let lead = 0
let TotalresArr = []
let res = 0
let TotalvisArr = []
let vis = 0
let count = 0 

let countryArr = []
let totL = []
let totR = []
let rr = []
let comL = 0.0
let comR = 0.0

let lead24 = []
let reserve24 = []
let rr24 = []
let comL24 = 0
let comR24 = 0

try{
    if(googleData.rows){
        // eslint-disable-next-line array-callback-return
        googleData.rows.map((v,index)=>{
       if(  Number( googleData.rows[googleData.rows.length-index-1][2]) !==0){
        
        dateArr.push(Number( googleData.rows[googleData.rows.length-index-1][0]))
        visArr.push(Number( googleData.rows[googleData.rows.length-index-1][1]))
        leadArr.push(Number( googleData.rows[googleData.rows.length-index-1][2]))
        conArr.push((Number( googleData.rows[googleData.rows.length-index-1][5])).toFixed(2)        )
        resArr.push(Number( googleData.rows[googleData.rows.length-index-1][3]))
        resRateArr.push(   (Number( googleData.rows[googleData.rows.length-index-1][4])).toFixed(2)     )

        lead = lead + Number( googleData.rows[googleData.rows.length-index-1][2])
        res = res + Number( googleData.rows[googleData.rows.length-index-1][3])
        vis = vis+ Number( googleData.rows[googleData.rows.length-index-1][1])

        TotalleadArr.push(lead)
        TotalresArr.push(res)
        TotalvisArr.push(vis)
        return(
            console.log()
        )
       }

        })
    }
    
}
catch(err){

}

try{
    if(fbData.data &&dateArr){

        for (let i = 0; i < dateArr.length; i++) {
            count = 0
            for (let j = 0; j < fbData.data.length; j++) {
                if (Number(fbData.data[j].date_start.replace(/-/g, ''))===dateArr[i]){
                    ad = ad + Number(fbData.data[j].spend)
                    cp = (cp + Number(fbData.data[j].cpp) ) / (i+1)
                    ct = ct + Number(fbData.data[j].ctr)  
                    adCost.push(Number(fbData.data[j].spend))
                    cpa.push(Number(fbData.data[j].cpp))
                    ctr.push(Number(fbData.data[j].ctr))

                    totAdCost.push(ad)
                    totCpa.push(cp)
                    totCtr.push(ct)
                    // eslint-disable-next-line no-unused-vars
                    count = 1       
                    break       
                }
              
            }
            if (count !== 1){
                ad = ad + 0
                cp = (cp + 0) / (i+1)
                ct = ct + 0 
                adCost.push(0.00)
                cpa.push(0.00)
                ctr.push(0.00)

                totAdCost.push(ad)
                totCpa.push(cp)
                totCtr.push(ct)
            }
        }
        
        // fbData.data.map(f=>{
        //     return (
        //         console.log(f.date_start.replace(/-/g, ''))
        //     )
        // })
    }
    
}
catch(err){

}

try{
    if(countryData.rows){
        // eslint-disable-next-line array-callback-return
        countryData.rows.map((v,index)=>{
       if(  Number( countryData.rows[countryData.rows.length-index-1][1]) !==0){
        
        countryArr.push( countryData.rows[countryData.rows.length-index-1][0])

        comL = comL + Number( countryData.rows[countryData.rows.length-index-1][1])
        comR = comR + Number( countryData.rows[countryData.rows.length-index-1][2]) 
        
        totL.push(Number( countryData.rows[countryData.rows.length-index-1][1]))
        
        totR.push(Number( countryData.rows[countryData.rows.length-index-1][2]))
        
        rr.push(Number( countryData.rows[countryData.rows.length-index-1][3]))
        
        return(
            console.log()
        )
       }

        })
    }
    
}
catch(err){

}


try{
    if(countryData24 && countryArr){

        for (let i = 0; i < countryArr.length; i++) {
            count = 0
            for (let j = 0; j < countryData24.rows.length; j++) {
                if (countryData24.rows[j][0]===countryArr[i]){
                   
                    lead24.push(Number(countryData24.rows[j][1]))
                    reserve24.push(Number(countryData24.rows[j][2]))
                    rr24.push(Number(countryData24.rows[j][3]))
                    // eslint-disable-next-line no-unused-vars

                    comL24 = comL24 + Number(countryData24.rows[j][1])
                    comR24 = comR24 + Number(countryData24.rows[j][2]) 

                    count = 1       
                    break       
                }
              
            }
            if (count !== 1){
             
                comL24 = comL24 + 0
                comR24 = comR24 + 0
                lead24.push(0.00)
                reserve24.push(0.00)
                rr24.push(0.00)
            }
        }
        
        // fbData.data.map(f=>{
        //     return (
        //         console.log(f.date_start.replace(/-/g, ''))
        //     )
        // })
    }
    
}
catch(err){

}


    


/*

 Number(val[2])===0 ?
                                    (<></>)
                                        :(  <tr>
                                            <td>{Number(val[0])}</td>
                                            <td>{Number(val[1])}</td>
                                            <td>{Number(val[2])}</td>
                                            <td>{Number(val[5]).toFixed(2)}%</td>
                                            <td>{Number(val[3])}</td>
                                            <td>{Number(val[4]).toFixed(2)}%</td>
                                   
                                           
                                            {
                                                fbData.data.filter(date => date.date_start.replace(/-/g, '') === val[0]).map((filtered,fil)=> (
                                                
                                                <td key={fil}>
                                                {filtered.spend}
                                                </td>
                                             
                                            ))
                                            }
                                            {
                                                fbData.data.filter(date => date.date_start.replace(/-/g, '') === val[0]).map((filtered,fil)=> (
                                   
                                                <td key={fil}>
                                                {filtered.cpp}
                                                </td>
                                           
                                            ))
                                            }

                                            {
                                                fbData.data.filter(date => date.date_start.replace(/-/g, '') === val[0]).map((filtered,fil)=> (
                                                    
                                                <td key={fil}>
                                                {filtered.ctr}
                                                </td>
                                             
                                            ))
                                            }

                                            


*/

 return (
 
 <div>
 {campaign.projectName ? (
 <div>
 { 
   
   error ? <Message>Request Failed!! Error In the Server</Message>
   :
   loading ? <Loader></Loader> 
   :loading2 ? <Loader></Loader>
   :
   (    
           <div style={{"height": "600px","overflow": "scroll"}}>
           <Table striped bordered hover responsive className="table-sm">
                
           <thead>
                    <tr>
                        <th>
                        
                            
                        </th>
                        <th>
                        <h5>
                        Daily
                            Data
                        </h5>
                        
                        </th>
                        <th>
                        
                        </th>
                        <th>
                        
                        </th>
                        <th>
                        </th>
                        <th>
                           
                        </th>
                        <th>
                           
                        </th>
                        <th>
                          
                        </th>
                        <th>
                          
                        </th>
                        <th>
                        <h5>
                        Commulative 
                            Data
                        </h5>
                        </th>
                        <th>
                        
                        </th>
                        <th>
                               
                        </th>
                        <th>
                               
                        </th>
                        <th>
                            
                        </th>
                    </tr>
                </thead>
                
                <thead>
                    <tr>
                        <th>
                        <h6>Date</h6>
                        
                            
                        </th>
                        <th>
                        <h6>Visitor</h6>
                            
                        </th>
                        <th>
                        <h6>Lead</h6>
                            
                        </th>
                        <th>
                        <h6>Con.Rate</h6>
                        
                        </th>
                        <th>
                        <h6>Reserve</h6>
                        
                        </th>
                        <th>
                            <h6>Res.Rate</h6>
                        </th>
                        <th>
                        <h6>Ad Cost</h6>
                            
                        </th>
                        <th>
                        <h6>CPA</h6>
                            
                        </th>
                        <th>
                        <h6>CTR</h6>
                            
                        </th>
                        <th>
                        <h6> Visitor</h6>
                           
                        </th>
                        <th>
                        <h6>Lead</h6>
                            
                        </th>
                        <th>
                        <h6>Reserve</h6>
                            
                        </th>
                        <th>
                        <h6>Ad Cost</h6>
                            
                        </th>
                        <th>
                        <h6>Average CPA</h6>
                            
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {
                       userInfo && googleData&&googleData.rows&&fbData&& fbData.data&&TotalleadArr&&TotalresArr&&TotalvisArr&&resRateArr&&(
                        dateArr.map((val,ind)=>
                        {
                            return (
                                        <tr key={ind}>
                                            <td>
                                                {dateArr[dateArr.length-ind-1]}
                                            </td>

                                            <td>
                                                {visArr[dateArr.length-ind-1]}
                                            </td>
                                            <td>
                                                {leadArr[dateArr.length-ind-1]}
                                            </td>
                                            <td>
                                                {conArr[dateArr.length-ind-1]}%
                                            </td>
                                            <td>
                                                {resArr[dateArr.length-ind-1]}
                                            </td>

                                            <td>
                                                {resRateArr[dateArr.length-ind-1]}%
                                            </td>

                                            <td>${adCost[dateArr.length-ind-1].toFixed(2)}</td>
                                            <td>{cpa[dateArr.length-ind-1].toFixed(2)}</td>
                                            <td>{ctr[dateArr.length-ind-1].toFixed(2)}%</td>


                                            <td>
                                                {
                                                    TotalvisArr[dateArr.length-ind-1]
                                                }
                                            </td>

                                            <td>
                                                {
                                                    TotalleadArr[dateArr.length-ind-1]
                                                }
                                            </td>

                                            <td>
                                                {
                                                    TotalresArr[dateArr.length-ind-1]
                                                }
                                            </td>

                                            <td>
                                             ${totAdCost[dateArr.length-ind-1].toFixed(2)}
                                            </td>
                                                <td>
                                                    {totCpa[dateArr.length-ind-1].toFixed(2)}
                                                </td>
                                        </tr>
                                   )
                                       
                               
                           
                         }))
                    }
                </tbody>
           
            </Table>
            </div>
            )
   
 }
 {
     loading3 ? <Loader></Loader>
     :
     loading4 ? <Loader></Loader>
     :
     (
         <div >
        <br></br>
        <h2>Country Analysis</h2>
        <Row>
            <Col md={4}>
                <div style={{"height": "400px","overflow": "scroll"}}>
                <Table  striped bordered hover responsive className="table-sm"  style={{"overflow": "scroll"}}>
               
                
                <thead>
                    <tr>
                        <th>
                        <h6>Country</h6>
                        
                            
                        </th>
                        <th>
                        <h6>Total Lead</h6>
                            
                        </th>
                        <th>
                        <h6>Total Reserve</h6>
                            
                        </th>
                        <th>
                        <h6>Reserve Rate</h6>
                        </th>

                        <th>
                        <h6>Last 24hrs
                            Lead</h6>
                        </th>

                        <th>
                        <h6>Last 24hrs
                        Reserve</h6>
                        </th>

                        <th>
                        <h6>Reserve Rate</h6>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {
                       userInfo && countryData&&countryData.rows&&countryArr&&totL&&totR&&rr&&(
                        dateArr.map((val,ind)=>
                        {
                            return (
                                        <tr key={ind}>
                                            <td>
                                                {countryArr[countryArr.length-ind-1]} 
                                            </td>

                                            <td>
                                                {totL[countryArr.length-ind-1]} - {((totL[countryArr.length-ind-1]/comL)*100).toFixed(2)}%
                                            </td>
                                            <td>
                                                {totR[countryArr.length-ind-1]} - {((totR[countryArr.length-ind-1]/comR)*100).toFixed(2)}%
                                            </td>
                                            <td>
                                                {rr[countryArr.length-ind-1].toFixed(2)}%
                                            </td>
                                            <td>
                                                0 - 0%
                                            </td>
                                            
                                            <td>
                                                0 - 0%
                                            </td>

                                            <td>
                                                0%
                                            </td>
                                        </tr>
                                   )
                                       
                               
                           
                         }))
                    }
                </tbody>

                </Table>
                    </div>
            </Col>
            <Col md={3}>
            {loading5?  <Loader></Loader>
            :
            reportData && (
        <PieChartWrapper>
        <h2>Country Lead</h2>
          <Pie data={data} options={options} />
        </PieChartWrapper>
      )}
            </Col>
                <Col md={2}></Col>
            <Col md={3}>
            {loading6?  <Loader></Loader>
            :
            reportDataR && (
        <PieChartWrapper>
        <h2>Country Reserve</h2>
          <Pie data={daaa} options={opt} />
        </PieChartWrapper>
      )}
            </Col>
        </Row>
                
     </div>)
 }
       </div>
       )
       :
        <Message variant = 'dark'>{campaign.detail}</Message>
       }
       </div>

  );
};

export default ReportScreen;
