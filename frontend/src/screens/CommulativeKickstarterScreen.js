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
                    console.log("useful",data)
                    console.log("useful too",commulative)
                }   
                campaignslist()
            }
            
        }
        else{
            history.push('/login')
        }          
    }, [state,commulative,history,userInfo])
    
    let pled=0
    let pledArr=[]
    let fund=0
    let fundArr=[]
    let back=0
    let backArr=[]
    let sec=0
    let secArr=[]
    let avgPled=0
    let avgPledArr=[]
    let pledKick=0
    let pledKickArr=[]
    let pledExternal=0
    let pledExternalArr=[]
    let pledCustom=0
    let pledCustomArr=[]
    let projFollowers=0
    let projFollowersArr=[]
    let convFoll=0
    let convFollArr=[]

    let convRate=0
    let convRateArr=[]

    let videoPlayes=0
    let videoPlayesArr=[]

    try{
        if(commulative){
            for (let index = 0; index < commulative.length; index++) {
                pled = pled + parseFloat((commulative[index].jsondata[0].Pleged).replace(/[^\d\.\-]/g,""))
                fund = fund + parseFloat((commulative[index].jsondata[0].funded).replace(/[^\d\.\-]/g,""))
                back = back + Number(commulative[index].jsondata[0].backers)
                sec = sec + Number(commulative[index].jsondata[0].sec_to_go)
                avgPled = avgPled + parseFloat((commulative[index].jsondata[0].average_Pleged).replace(/[^\d\.\-]/g,""))
                pledKick = pledKick + parseFloat((commulative[index].jsondata[0].pleged_via_kickstarter).replace(/[^\d\.\-]/g,""))
                pledExternal = pledExternal + parseFloat((commulative[index].jsondata[0].pleged_via_external).replace(/[^\d\.\-]/g,""))
                pledCustom = pledCustom + parseFloat((commulative[index].jsondata[0].pleged_via_custom).replace(/[^\d\.\-]/g,""))
                projFollowers = projFollowers + Number(commulative[index].jsondata[0].proj_followers)
                convFoll = convFoll + Number(commulative[index].jsondata[0].converted_followers)
                convRate = convRate + parseFloat((commulative[index].jsondata[0].conversion_rate).replace(/[^\d\.\-]/g,""))
                videoPlayes = videoPlayes + parseFloat((commulative[index].jsondata[0].proj_video_plays).replace(/[^\d\.\-]/g,""))
                

                pledArr.push(pled)
                fundArr.push(fund)
                backArr.push(back)
                secArr.push(sec)
                avgPledArr.push(avgPled)
                pledKickArr.push(pledKick)
                pledExternalArr.push(pledExternal)
                pledCustomArr.push(pledCustom) 
                projFollowersArr.push(projFollowers) 
                convFollArr.push(convFoll) 
                convRateArr.push(convRate)
                videoPlayesArr.push(videoPlayes) 
                
                  
            }
        }

    }
    catch(err){

    }

    /*<div key={kick._id}>
                        
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

// <h1>Referrers</h1>

// <Table striped bordered hover>
// <thead>
// <tr>
//     <th>Referrer</th>
//     <th>Type</th>
//     <th># of Pledges</th>
//     <th>% of Pledged</th>
//     <th>Pledged</th>
// </tr>
// </thead>
// <tbody>
// {
//     ite.Referrers.data.map((info,ind)=>{
//         return(
//             <tr key={ind}>
//             <td>{info.name}</td>
//             <td>{info.type}</td>
//             <td>{info.backers_count}</td>
//             <td>{Number(info.percentage)*100}%</td>
//             <td>{info.pledged_amount}</td>
//             </tr>

//         )
//     })
// }

// </tbody>
// </Table>

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
    </div>*/
   
return(
    <div>
    <h2 style={{"color":"blue"}}>Daily Data of Kickstarter</h2>
            {
                state===1 ?
            <div>
                <Table striped bordered hover responsive className="table-sm">

                <thead>
                    <tr>
                        <th>
                            Date
                        </th>
                        <th>
                            pledged
                        </th>
                        <th>
                        funded
                        </th>
                        <th>
                        backers 
                        </th>
                        <th>
                        days to go 
                        </th>
                        <th>
                        Avg. pledge
                        </th>
                
                        <th>
                        Pledged via Kickstarter     
                        </th>
                        <th>
                        Pledged via external referrers
                        </th>
                        <th>
                        Pledged via custom referrers
                        </th>
                        <th>
                        Project Followers
                        </th>
                        <th>
                        Converted Followers
                        </th>
                        <th>
                        Conversion Rate
                        </th>
                        <th>
                        PROJECT VIDEO PLAYS
                        </th>
                    </tr>
                </thead>
                <tbody>

               {commulative.map(kick=>
                {
                    return(
                        <tr key={kick._id}>
                            <td>
                            {kick.createdAt.split('T')[0]}
                            </td>
                            {
                                kick.jsondata.map(ite=>{
                                return(
                                    <>
                                    <td>
                                        {
                                            ite.Pleged
                                        }
                                    </td>
                                    <td>
                                        {
                                            ite.funded
                                        }
                                    </td>
                                    <td>
                                        {
                                            ite.backers
                                        }
                                    </td>
                                    <td>   
                                        {ite.sec_to_go}
                                    </td>
                                    <td>   
                                        {ite.average_Pleged}
                                    </td>
                                    <td>   
                                        {ite.pleged_via_kickstarter}
                                    </td>
                                    <td>   
                                        {ite.pleged_via_external}
                                    </td>
                                    <td>   
                                        {ite.pleged_via_custom}
                                    </td>
                                  
                                    <td>   
                                        {ite.proj_followers}
                                    </td>
                                        
                                    <td>   
                                        {ite.converted_followers}              
                                    </td>
                                   
                                    <td>   
                                    {ite.conversion_rate}
                                    </td>
                                   
                                    <td>   
                                    {ite.proj_video_plays    }
                                    </td>
                                   
                                    </>
                                )
                                })
                           }
                        </tr>
                    )
                   
                })} 
                </tbody>
                

                </Table>

                <h2 className='py-5' style={{"color":"blue"}}>Commulative Data of Kickstarter</h2>

                <Table striped bordered hover responsive className="table-sm">

                <thead>
                    <tr>
                        <th>
                            Date
                        </th>
                        <th>
                            pledged
                        </th>
                        <th>
                        funded
                        </th>
                        <th>
                        backers 
                        </th>
                        <th>
                        days to go 
                        </th>
                        <th>
                        Avg. pledge
                        </th>
                
                        <th>
                        Pledged via Kickstarter     
                        </th>
                        <th>
                        Pledged via external referrers
                        </th>
                        <th>
                        Pledged via custom referrers
                        </th>
                        <th>
                        Project Followers
                        </th>
                        <th>
                        Converted Followers
                        </th>
                        <th>
                        Conversion Rate
                        </th>
                        <th>
                        PROJECT VIDEO PLAYS
                        </th>
                    </tr>
                </thead>
                <tbody>

               {commulative.map((kick,index)=>
                {
                    return(
                        <tr key={kick._id}>
                            <td>
                            {kick.createdAt.split('T')[0]}
                            </td>
                            {
                                kick.jsondata.map(ite=>{
                                return(
                                    <>
                                    <td>
                                    HK${" "}
                                        {
                                            pledArr[index]
                                        }
                                    </td>
                                    <td>
                                        {
                                            fundArr[index] 
                                        }%
                                    </td>
                                    <td>
                                        {
                                            backArr[index]
                                        }
                                    </td>
                                    <td>   
                                        {secArr[index]}
                                    </td>
                                    <td>  
                                    HK$ {" "}
                                        {avgPledArr[index]}
                                    </td>
                                    <td>  
                                    HK$ {" "}
                                        {pledKickArr[index]}
                                    </td>
                                    <td>  
                                    HK$ {" "}
                                        {pledExternalArr[index]}
                                    </td>
                                    <td>   
                                    HK${" "}
                                        {pledCustomArr[index]}
                                    </td>
                                  
                                    <td>   
                                        {projFollowersArr[index]}
                                    </td>
                                        
                                    <td>   
                                        {convFollArr[index]}              
                                    </td>
                                   
                                    <td>   
                                    {convRateArr[index]/(index+1)}%
                                    </td>
                                   
                                    <td>   
                                      { videoPlayesArr[index]}
                                    </td>
                                   
                                    </>
                                )
                                })
                           }
                        </tr>
                    )
                   
                })} 
                </tbody>    
                </Table>


                </div>
                
                :<></>
            
            }
                
    </div>
)
}
export default LiveCampaignsScreen
