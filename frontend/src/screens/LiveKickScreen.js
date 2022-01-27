import React, {useState,useEffect} from 'react';
import {ButtonGroup,ListGroup,Row,Col,Card,Table,Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {kickLive} from '../actions/userActions'
import Badge from 'react-bootstrap/Badge'
import axios from 'axios'

const LiveCampaignsScreen = ({history}) =>{
    const dispatch=useDispatch()  

    const [zero,setZero] =useState(0)
    const liveKick = useSelector(state=>state.liveKick)
    const {loading,kick,error} = liveKick

    // let visits = ""
    let date =""
    //states
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    //const [liveData,setLiveData] = useState([])

    useEffect(() => {
     
        if(userInfo ){
            //console.log("itna to nai",va)
            dispatch(kickLive(userInfo._id))
            //console.log("mazaa aaega na")
            
            //console.log(live[0])
            setZero(1)
        }

        else{
            history.push('/login')
        }   
   
    
}, [userInfo])  

    //console.log("before if live", live)
    try{
    if(zero){
    if(kick)
    {
        console.log("thats",kick)
         date = kick.createdAt.split('T')[0]
    
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
        <h2>Daily Data from KickStarter</h2>
        </Col>
        <Col>
        <LinkContainer to={"/kickstarter/commulative"}>
                <Button variant="link">Go to Commulative Data of Kickstarter</Button>
           </LinkContainer>
        </Col>
    </Row>
         
            {loading ? <Loader></Loader>
            :
            error ? <Message>{error}</Message>
            :(
                <div>
                <h2 style={{"color":"blue"}}>Date    {date}</h2>
        
                    {
                        kick &&zero&&(
                            kick.jsondata.map(ite=>{
                                return(
                                    <div>
                                    <Row>
                <Col>
                
                        
                        <Card 
                        bg={'danger'}
                        style={{ width: '18rem' }} >
                        <Card.Body>
                        <Card.Title><h2>{ite.Pleged}</h2></Card.Title>
                        <Card.Text>
                            <h style={{ "border-top": "1px solid red"}}>pledged</h>
                        </Card.Text>
                        
                        </Card.Body>
                        </Card>
                    </Col>
             


                <Col > 
                        <Card 
                        bg={'success'}
                        style={{ width: '18rem' }}>
                        <Card.Body>
                        <Card.Title><h2>{ite.funded}</h2></Card.Title>
                        <Card.Text>
                            <h style={{ "border-top": "1px solid green"}}> 
                                funded
                            </h>
                        </Card.Text>
                        
                        </Card.Body>
                        </Card>
                    </Col>
               

                <Col > 
                        <Card 
                        bg={'info'}
                        style={{ width: '18rem' }}>
                        <Card.Body>
                        <Card.Title><h2>{ite.backers}</h2></Card.Title>
                        <Card.Text>
                        <h style={{ "border-top": "1px solid blue"}}> 
                                backers
                            </h>
                        </Card.Text>
                        
                        </Card.Body>
                        </Card>
                    </Col>

                    <Col > 
                        <Card 
                        bg={'warning'}
                        style={{ width: '18rem' }}>
                        <Card.Body>
                        <Card.Title><h2>{ite.sec_to_go}</h2></Card.Title>
                        <Card.Text>
                        <h style={{ "border-top": "1px solid yellow"}}> 
                                days to go
                            </h>
                        </Card.Text>
                        
                        </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <br/>
                <br/>
                <h2>Pledges</h2>
 
                <ListGroup>
                <strong> Avg. pledge</strong>
                <ListGroup.Item action variant="primary">{ite.average_Pleged}</ListGroup.Item>
                <strong>Pledged via Kickstarter</strong>
                <ListGroup.Item action variant="info">{ite.pleged_via_kickstarter}</ListGroup.Item>
                <strong>Pledged via external referrers</strong>
                <ListGroup.Item action variant="danger">{ite.pleged_via_external}</ListGroup.Item>
                <strong>Pledged via custom referrers</strong>
                <ListGroup.Item action variant="success"> {ite.pleged_via_custom}</ListGroup.Item>
                
                </ListGroup>
                <br/><br/>

                {/* <h1>Referrers</h1>

                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Referrer</th>
                        <th>Type</th>
                        <th># of Pledges</th>
                        <th>% of Pledged</th>
                        <th>Pledged</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        ite.Referrers.data.map((info,ind)=>{
                            return(
                                <tr key={ind}>
                                <td>{info.name}</td>
                                <td>{info.type}</td>
                                <td>{info.backers_count}</td>
                                <td>{Number(info.percentage)*100}%</td>
                                <td>{info.pledged_amount}</td>
                                </tr>

                            )
                        })
                    }
                    
                    </tbody>
                    </Table> */}

                    <h1>Project Followers</h1>

                    <div>               
                    <br />
                   
                        <Button variant="info">{ite.proj_followers}</Button>
                        <h>Project Followers</h>
                        <Button variant="danger">{ite.converted_followers}</Button>
                        <h>Converted Followers</h>
                        <Button variant="success">{ite.conversion_rate}</Button>
                        <h>Conversion Rate</h>
                    <br />
                    </div>

                    <br/>

                    <br/>
                    <Card
                    bg="warning"
                    text="light"                   
                    style={{ width: '18rem' }}
                    className="mb-2">
                    <Card.Header>plays completed</Card.Header>
                    <Card.Body>
                    <Card.Title> Project Video Plays     </Card.Title>
                    <Card.Text>
                       {ite.proj_video_plays    }
                    </Card.Text>
                    </Card.Body>
                </Card>
                    
                </div>
                                )
                            })
                        )
                    }                
                </div>

                )}
                
    </div>
)
}
export default LiveCampaignsScreen
