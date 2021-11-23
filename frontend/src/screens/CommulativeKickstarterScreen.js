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


    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    const [commulative,setCommulative] = useState([])
    const [state,setState] = useState(0)
   
    useEffect(() => {
        if(userInfo ){
            if(state===0){
            async function campaignslist(){
                
            
                const {data} =await axios.get(
                    `/api/users/kickstarter/all/${userInfo._id}`,
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
                commulative.map(kick=>
                {

                    return(
                        <div key={kick._id}>
                        
                        <h2 style={{"color":"blue"}}>Date    {kick.createdAt.split('T')[0]}</h2>
                        
                        {
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

                <h1>Referrers</h1>

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
                    </Table>

                    <h1>Project Followers</h1>

                    <>               
                    <br />
                   
                        <Button variant="info">{ite.proj_followers}</Button>
                        <h>Project Followers</h>
                        <Button variant="danger">{ite.converted_followers}</Button>
                        <h>Converted Followers</h>
                        <Button variant="success">{ite.conversion_rate}</Button>
                        <h>Conversion Rate</h>
                    <br />
                    </>

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
                                }
                                <br/>
                                <br/>
                        </div>
                    )
                })
                :<></>
            
            }
                
    </div>
)
}
export default LiveCampaignsScreen