import React, {useState,useEffect} from 'react';
import {ListGroup,Row,Col,Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
import { useSelector} from 'react-redux'
import axios from 'axios'
import Message from '../components/Message'

import Talala from '../Talala'
import Goals from '../Goals'



const AssignCampaignsScreen = ({match,history}) =>{
  
    let va= match.params.id
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    const [campaign,setCampaign] = useState({})
    const [parse,setParse] = useState("")
  

    useEffect(() => {

        if(userInfo){
            //console.log('userinfo.id    ',userInfo._id)
            //console.log('va     ',va)
        async function campaignlist(){
            
        const {data} =await axios.get(`/api/users/campaign/${va}`)
            setCampaign(data)
            setParse(`/live-campaign/${va}?platform=${data.platform}`)
        }   
        campaignlist()  
        //setParse(`/live-campaign/${va}?platform=${campaign.platform}`)
    }  
    else
    {
        history.push('/login')
    }   
    }, [userInfo])

return(
    <div>
  
    
    <h2>Your Assigned Campaigns</h2>
    {
        campaign.projectName ? (
        <ListGroup>
        <Row>
        <Col md={8}>
            <ListGroup.Item>
            <strong>Project Name</strong>
            <br/>
            <strong>{campaign.projectName}</strong>
            </ListGroup.Item>

            <ListGroup.Item>
            <strong>Platform</strong>
            <br/>
            <strong>{campaign.platform}</strong>
            </ListGroup.Item>

            <ListGroup.Item>
            <strong>Integration</strong>
            <br/>
            <strong>{campaign.integration}</strong>
            </ListGroup.Item>
            <h1>This is the PreLaunch Data</h1>
            <Talala />
            <Goals />
        
         </Col>
            <Col md={4}> 
            <LinkContainer to={parse}>
                 <Button variant="link">Go to Live Campaign</Button>
            </LinkContainer>
         </Col>
         </Row>
        </ListGroup>)
        :
        <Message variant = 'dark'>{campaign.detail}</Message>
    }
        
        
    
    </div>
)
}
export default AssignCampaignsScreen