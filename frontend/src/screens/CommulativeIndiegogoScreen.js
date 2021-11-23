import React, {useState,useEffect} from 'react';
import {ListGroup,Row,Col,Card,Table,Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {campaignLive} from '../actions/userActions'
import axios from 'axios'

const CommulativeIndiegogoScreen=({history})=>{
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    const [commulative,setCommulative] = useState([])
    const [state,setState] = useState(0)
    const [sum,setSum] = useState(0)

    useEffect(() => {
        if(userInfo ){
            if(state===0){
            async function campaignslist(){
                
            
                const {data} =await axios.get(
                    `/api/users/indiegogo/all/${userInfo._id}`,
                    )
                    setCommulative(data)
                    setState(1)
                    //console.log("useful",data)
                    console.log("useful too",commulative)
                }   
                campaignslist()
            }
            
        }
        else{
            history.push('/login')
        }          
    }, [state,commulative,history,userInfo])


    return(
        <div>
            {
                state===1 ?

                commulative.map( ite=>{
                    return(
                        <div key={ite._id}>

                        

                        <h2 style={{"color":"blue"}}>Date    {ite.createdAt.split('T')[0]}</h2>
                    

                        
                <Row>
                <Col md={4}>
                
                        
                        <Card 
                        bg={'danger'}
                        style={{ width: '18rem' }} >
                        <Card.Body>
                        <Card.Title><h2>{ite.jsondata[2].misc.funs}{" "}HKD</h2></Card.Title>
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
                        <Card.Title><h2>{ite.jsondata[2].misc.backers}</h2></Card.Title>
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
                        <Card.Title><h2>{ite.jsondata[2].misc.vists}</h2></Card.Title>
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
                    Object.keys(ite.jsondata[0].Country).map(function(key, index)
                                {   
                                    return(
                                        index < 10 && (<tr key={index}>
                                        <td>{ite.jsondata[0].Country[key]}</td>
                                        </tr>)
                                        )
                                })
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
                    Object.keys(ite.jsondata[0].Amount).map(function(key, index)
                                {   
                                    return(
                                        index < 10 &&(
                                        <tr key={index}>
                                        <td>{ite.jsondata[0].Amount[key]}</td>
                                        </tr>))
                                })
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
                    Object.keys(ite.jsondata[0].Contributions).map(function(key, index)
                                {   
                                    return(
                                        index < 10 &&(
                                        <tr key={index}>
                                        <td>{ite.jsondata[0].Contributions[key]}</td>
                                        </tr>))
                                })
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
                    Object.keys(ite.jsondata[0].Visits).map(function(key, index)
                                {   
                                    return(
                                        index < 10 && (
                                        <tr key={index}>
                                        <td>{ite.jsondata[0].Visits[key]}</td>
                                        </tr>))
                                })
                }
                </tbody> 
                </Col>
                
                        </Row>
                        <br/>

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
                            Object.keys(ite.jsondata[1].Source).map(function(key, index)
                                {   
                                    return(
                                        <tr key={index}>
                                        <td>{ite.jsondata[1].Source[key]}</td>
                                        </tr>)
                                })
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
                            Object.keys(ite.jsondata[1].Amount).map(function(key, index)
                                {   
                                    return(
                                        <tr key={index}>
                                        <td>{ite.jsondata[1].Amount[key]}</td>
                                        </tr>)
                                })
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
                            Object.keys(ite.jsondata[1].Contributions).map(function(key, index)
                                {   
                                    return(
                                        <tr key={index}>
                                        <td>{ite.jsondata[1].Contributions[key]}</td>
                                        </tr>)
                                })
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
                            Object.keys(ite.jsondata[1]["Percent of Total Raised"]).map(function(key, index)
                                {   
                                    return(
                                        <tr key={index}>
                                        <td>{ite.jsondata[1].Contributions[key]}</td>
                                        </tr>)
                                })
                        }
                        </tbody>
                    </Col>
            
                </Row>
                        <br/><br/>
                        </div>
                    )
                })
                :<></>

            }
        </div>
    )

}
export default CommulativeIndiegogoScreen