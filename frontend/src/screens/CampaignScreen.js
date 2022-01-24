import React, {useState,useEffect} from 'react';
import {Form,Button,Row,Col} from 'react-bootstrap';
import { useSelector} from 'react-redux'
import Checkout from '../Checkout'
import axios from 'axios'

const CampaignScreen = ({history}) =>{
  

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    const [projectName,setProjectName] = useState('')
    const [gaId,setGaId] = useState()
    const [fbId,setFbId] = useState()
    const [platform,setPlatform] = useState('Indiegogo')
    const [integration,setIntegration] = useState('GA')
    const [name,setName] = useState('')
    const [accountName,setAccountName] = useState('')
    const [password,setPassword] = useState('')
    const [assign,setAssign] = useState(1)
    const [users,setUsers] = useState([])

    const array = ['Indiegogo','kickstarter']
    const integArray = ['GA','FB']

    useEffect(() => {

        if(userInfo && userInfo.isAdmin){
        async function userslist(){
            const configuration = {
                headers : {
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
    
        const {data} =await axios.get(
            '/api/users/',
            configuration
            )
            setUsers(data)
        }   
        userslist()  
    }  
    else
    {
        history.push('/login')
    }   
    }, [userInfo])

    

    const send =(e)=>{
        e.preventDefault()
        const object={
            projectName: projectName,
            platform:platform,
            integration:integration,
            assign:assign,
            gaId:gaId,
            fbId:fbId,
            name:name,
            accountName:accountName,
            password:password
               }

            async function postCampaign(){
                const configuration = {
                    headers : {
                        'Content-type':'application/json',
                        Authorization: `Bearer ${userInfo.token}`
                        
                    }
                    
                }
             
                 await axios.post(
                    '/api/users/create/',
                    object,
                    configuration
                    )
            }
            postCampaign()
            history.push('/admin/campaigns')
    }

return(
    <div>
    <Checkout s1 s2 />
    <h2>Campaign</h2>    
   <Row>
   <Col md={2}>

   </Col>
   <Col md={8}>
  <Form onSubmit ={send}>
  <Form.Group className="mb-3" controlId="name">
    <Form.Label>Project Name</Form.Label>
    <Form.Control type="name" placeholder="ABCDFG" value={projectName} 
       onChange = {(e)=>setProjectName(e.target.value)} required
     />
    
  </Form.Group>
 <Form.Group className="mb-3" controlId="name"> 
 <Form.Label>Platform</Form.Label>
  <Form.Control as="select" type="name" value={platform} onChange={(e)=>{setPlatform(e.target.value)}} required>

                           {
                                array.map((val)=>
                                {
                                    return(
                                    <option key={val} value={val}>
                                    {val}
                                    </option>)
                                }
                                )
                           }

                            </Form.Control>  
</Form.Group>
<Form.Group className="mb-3" controlId="name"> 
<Form.Label>Integration</Form.Label>
  <Form.Control as="select" type="name"  value={integration} onChange={(e)=>{setIntegration(e.target.value)}} required>

                           {
                                integArray.map((val)=>
                                {
                                    return(
                                    <option key={val} value={val}>
                                    {val}
                                    </option>)
                                }
                                )
                           }

                            </Form.Control>  
</Form.Group>

<Form.Group className="mb-3" controlId="number"> 
<Form.Label>GA ID</Form.Label>
<Form.Control type="name" placeholder="google analytics ID" value={gaId} 
       onChange = {(e)=>setGaId(e.target.value)} required>

       </Form.Control>
</Form.Group>

<Form.Group className="mb-3" controlId="number"> 
<Form.Label>FB ID</Form.Label>
<Form.Control type="name" placeholder="Fb manager campaign ID" value={fbId} 
       onChange = {(e)=>setFbId(e.target.value)} required>

</Form.Control>
</Form.Group>

<Form.Group className="mb-3" controlId="name">
    <Form.Label>Campaign Name</Form.Label>
    <Form.Control type="name" placeholder="Campaign name for kickstarter or indiegogo" value={name} 
       onChange = {(e)=>setName(e.target.value)} required
     />
    
  </Form.Group>

  <Form.Group className="mb-3" controlId="name">
    <Form.Label>Account Info</Form.Label>
    <Form.Control type="name" placeholder="Account Info for kickstarter or indiegogo" value={accountName} 
       onChange = {(e)=>setAccountName(e.target.value)} required
     />
    
  </Form.Group>


  <Form.Group className="mb-3" controlId="password">
    <Form.Label>Account Password</Form.Label>
    <Form.Control type="password" placeholder="Account password for kickstarter or indiegogo" value={password} 
       onChange = {(e)=>setPassword(e.target.value)} required
     />
    
  </Form.Group> 


<Form.Group className="mb-3" controlId="number"> 
<Form.Label>Assign Users by ID</Form.Label>
  <Form.Control as="select" value={assign} onChange={(e)=>{setAssign(e.target.value)}} required>

                        
                          {
                                users.map((val)=>
                                {
                                    return(
                                    <option key={val._id} value={val._id}>
                                    {val.name}
                                    </option>)
                                }
                                )
                          }
                           

</Form.Control>  
</Form.Group>

  <Button variant="primary" type="submit">
    Submit
  </Button>
 </Form>
 </Col>
 <Col md={2}></Col>
 </Row>
      
    </div>
)
}
export default CampaignScreen