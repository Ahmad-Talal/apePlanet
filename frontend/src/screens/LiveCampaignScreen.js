import React, {useState,useEffect} from 'react';
import {ListGroup,Row,Col,Card,Table,Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {campaignLive} from '../actions/userActions'
import axios from 'axios'

const LiveCampaignsScreen = ({match,location,history}) =>{
    const va = match.params.id
    const platform = location.search ? (location.search.split('=')[1]) : "nothing"
    //console.log("ethhe",platform)
    const dispatch=useDispatch()  

    const [zero,setZero] =useState(0)
    const liveCampaign = useSelector(state=>state.liveCampaign)
    const {loading,live,error} = liveCampaign
    let array1=[]
    let ar1=[]
    let array2=[]
    let ar2=[]
    let array3=[]
    let ar3=[]
    let array4=[]
    let ar4=[]

    let sarray1=[]
    let sar1=[]
    let sarray2=[]
    let sar2=[]
    let sarray3=[]
    let sar3=[]
    let sarray4=[]
    let sar4=[]
    
    let funds = ""
    let backers = ""
    let visits = ""
    let date =""
    //states
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    //const [liveData,setLiveData] = useState([])

    useEffect(() => {
     if(platform==="Indiegogo"){
        if(userInfo ){
            //console.log("itna to nai",va)
            dispatch(campaignLive(userInfo._id))
            //console.log("mazaa aaega na")
            
            //console.log(live[0])
            setZero(1)
        }

        else{
            history.push('/login')
        }   
    }
    else{
        history.push('/kickvaala')
    }       
    
}, [userInfo])  

    //console.log("before if live", live)
    try{
    if(zero){
    if(live)
    {
        console.log("thats",live)
        date = live.createdAt.split('T')[0]
        array1=live.jsondata[0].Amount
        array2=live.jsondata[0].Country
        array3=live.jsondata[0].Visits
        array4=live.jsondata[0].Contributions

        sarray1=live.jsondata[1].Amount
        sarray2=live.jsondata[1]["Percent of Total Raised"]
        sarray3=live.jsondata[1].Source
        sarray4=live.jsondata[1].Contributions
        funds = live.jsondata[2].misc["funs"]
        visits = live.jsondata[2].misc["vists"]
        backers = live.jsondata[2].misc["backers"]
       // console.log("ye",funds)
        //console.log("ye",sarray2[0])
        for (const [key, value] of Object.entries(array1)) {
            ar1.push(value)
          }
          for (const [key, value] of Object.entries(array2)) {
            ar2.push(value)
          }
          for (const [key, value] of Object.entries(array3)) {
            ar3.push(value)
          }
          for (const [key, value] of Object.entries(array4)) {
            ar4.push(value)
          }  

          for (const [key, value] of Object.entries(sarray1)) {
            sar1.push(value)
          }
          for (const [key, value] of Object.entries(sarray2)) {
            sar2.push(value)
          }
          for (const [key, value] of Object.entries(sarray3)) {
            sar3.push(value)
          }
          for (const [key, value] of Object.entries(sarray4)) {
            sar4.push(value)
          }
    }
}
}

catch(err)
{
    console.log("the following error occurred ",err)
}
    const jso=
    {
        
        
        /* 
           
         */}

return(
    <div>
    <Row>
        <Col>
        <h2>Daily Data from Indiegogo</h2>
        </Col>
        <Col>
        <LinkContainer to={"/indiegogo/commulative"}>
                <Button variant="link">Go to Commulative Data of Indiegogo</Button>
           </LinkContainer>
        </Col>
    </Row>
         
            {loading ? <Loader></Loader>
            :
            error ? <Message>{error}</Message>
            :(
                <div>
                <h2 style={{"color":"blue"}}>Date    {date}</h2>
                <Row>
                <Col md={4}>
                
                        
                        <Card 
                        bg={'danger'}
                        style={{ width: '18rem' }} >
                        <Card.Body>
                        <Card.Title><h2>{funds}{" "}HKD</h2></Card.Title>
                        <Card.Text>
                            <h style={{ "border-top": "1px solid red"}}>Funds</h>
                        </Card.Text>
                        
                        </Card.Body>
                        </Card>
                    </Col>
             


                <Col md={4}> 
                        <Card 
                        bg={'success'}
                        style={{ width: '18rem' }}>
                        <Card.Body>
                        <Card.Title><h2>{backers}</h2></Card.Title>
                        <Card.Text>
                            <h style={{ "border-top": "1px solid green"}}> 
                                Number of Backers
                            </h>
                        </Card.Text>
                        
                        </Card.Body>
                        </Card>
                    </Col>
               

                <Col md={4}> 
                        <Card 
                        bg={'info'}
                        style={{ width: '18rem' }}>
                        <Card.Body>
                        <Card.Title><h2>{visits}</h2></Card.Title>
                        <Card.Text>
                        <h style={{ "border-top": "1px solid blue"}}> 
                                Total visits
                            </h>
                        </Card.Text>
                        
                        </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <br/>

                <h1>All Countries</h1>
                <Row>

                <Col md={3}>
                <Table striped bordered hover responsive className="table-sm">
                <thead>
                    <tr>
                        <th>
                            Country
                        </th>
                    </tr>
                </thead>
                </Table>


                <tbody>
                {
                    ar2.map((val,ind)=>
                                {
                                    return(
                                        <tr key={ind}>
                                        <td>
                                        {val}                                        
                                    </td>
                                    </tr>
                                    )
                                }
                                )
                }
                </tbody> 
                </Col>

                <Col md={3}>
                <Table striped bordered hover responsive className="table-sm">
                <thead>
                    <tr>
                        <th>
                            Amount
                        </th>
                    </tr>
                </thead>
                </Table>


                <tbody>
                {
                    ar1.map((val,ind)=>
                                {
                                    return(
                                        <tr key={ind}>
                                        <td>
                                        ${val}                                        
                                    </td>
                                    </tr>
                                    )
                                }
                                )
                }
                </tbody>
                </Col>

                <Col md={3}>
                <Table striped bordered hover responsive className="table-sm">
                <thead>
                    <tr>
                        <th>
                            Contributions
                        </th>
                    </tr>
                </thead>
                </Table>


                <tbody>
                {
                    ar4.map((val,ind)=>
                                {
                                    return(
                                        <tr key={ind}>
                                        <td>
                                        {val}                                        
                                    </td>
                                    </tr>
                                    )
                                }
                                )
                }
                </tbody>
                </Col>

                <Col md={3}>
                <Table striped bordered hover responsive className="table-sm">
                <thead>
                    <tr>
                        <th>
                            Visits
                        </th>
                    </tr>
                </thead>
                </Table>


                <tbody>
                {
                    ar3.map((val,ind)=>
                                {
                                    return(
                                        <tr key={ind}>
                                        <td>
                                        {val}                                        
                                    </td>
                                    </tr>
                                    )
                                }
                                )
                }
                </tbody>
                </Col>

                

                </Row>
                 <br />
                <Row>
                <h1>All Sources</h1>
                    <Col sm={3} md={3}>
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                        <tr>
                        <th>
                            Source
                        </th>
                      </tr>
                        </thead>
                    </Table>


                        <tbody>
                        {
                            sar3.map((val,ind)=>
                                        {
                                            return(
                                                <tr key={ind}>
                                                <td>
                                                {val}                                        
                                            </td>
                                            </tr>
                                            )
                                        }
                                        )
                        }
                        </tbody>
                    </Col>
                
                    <Col sm={3} md={3}>
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                        <tr>
                        <th>
                            Amount
                        </th>
                      </tr>
                        </thead>
                    </Table>


                        <tbody>
                        {
                            sar1.map((val,ind)=>
                                        {
                                            return(
                                                <tr key={ind}>
                                                <td>
                                                {val}                                        
                                            </td>
                                            </tr>
                                            )
                                        }
                                        )
                        }
                        </tbody>
                    </Col>
                    <Col sm={1} md={3}>
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                        <tr>
                        <th>
                            Contributions
                        </th>
                      </tr>
                        </thead>
                    </Table>


                        <tbody>
                        {
                            sar4.map((val,ind)=>
                                        {
                                            return(
                                                <tr key={ind}>
                                                <td>
                                                {val}                                        
                                            </td>
                                            </tr>
                                            )
                                        }
                                        )
                        }
                        </tbody>
                    </Col>

                    <Col sm={1} md={3}>
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                        <tr>
                        <th>
                            % of Raised
                        </th>
                      </tr>
                        </thead>
                    </Table>


                        <tbody>
                        {
                            sar2.map((val,ind)=>
                                        {
                                            return(
                                                <tr key={ind}>
                                                <td>
                                                {val}                                        
                                            </td>
                                            </tr>
                                            )
                                        }
                                        )
                        }
                        </tbody>
                    </Col>
            
                </Row>

                </div>

                )}
                
    </div>
)
}
export default LiveCampaignsScreen