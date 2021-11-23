import React, {useState, useEffect} from 'react';
import {Container,Form,Button,Row,Col} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios  from 'axios';


const UserEditScreen = ({match,history}) =>{
    const campaignId = match.params.id
    const [campaign,setCampaign] = useState({})
    const [p,setP] = useState('')
    const [gaId,setGaId] = useState()
    const [fbId,setFbId] = useState()
    const [pl,setPl] = useState('Indiegogo')
    const [i,setI] = useState('GA')
    const [a,setA] = useState(1)
    const [name,setName] = useState('')
    const [accountName,setAccountName] = useState('')
    const [password,setPassword] = useState('')
    const [users,setUsers] = useState([])

    const array = ['Indiegogo','kickstarter']
    const integArray = ['GA','FB']
        
    //state
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin
    const [state,setState] = useState(0)


    useEffect(() => {
      if(userInfo && userInfo.isAdmin){

        if(state===0){
        async function campaignlist(){
            const configuration = {
                headers : {
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
    
            const {data} =await axios.get(`/api/users/campaign/${campaignId}/id/`,
            configuration
            )
                setCampaign(data)
                setState(1)
            }   
            campaignlist()

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
                    setState(1)
                }   
                userslist()
            }

    }
    else{
          history.push('/login') 
        }

        }, [state,userInfo,history,campaign,users])

  
    const send =(e)=>{
        e.preventDefault()
       //console.log('ye dekho',object.projectName)
       async function postCampaign(){
        const configuration = {
            headers : {
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
                
            }
            
        }
         await axios.put(
            `/api/users/campaign/edit/${campaignId}/`,
            {projectName: p,
                platform:pl,
                integration:i,
                assign:a,
                gaId:gaId,
                fbId:fbId,
                name:name,
                accountName:accountName,
                password:password
            },
            configuration
            )
    }
    postCampaign()

        history.push('/admin/campaigns')
    }
    return (

        <div>
          <Link to={'/admin/campaigns'}>
            Go Back
          </Link>

        <h1 style={{ textAlign:'center'}}>Edit Campaign</h1>
        <Container className="d-flex justify-content-center">
        <Row>
   <Col md={2}>

   </Col>
   <Col md={8}>
  <Form onSubmit ={send}>
  <Form.Group className="mb-3" controlId="name">
    <Form.Label>Project Name</Form.Label>
    <Form.Control type="name" placeholder="ABCDFG" value={p} required 
       onChange = {(e)=>setP(e.target.value)} 
     />
    
  </Form.Group>
 <Form.Group className="mb-3" controlId="name"> 
 <Form.Label>Platform</Form.Label>
  <Form.Control as="select" value={pl} onChange={(e)=>{setPl(e.target.value)}} required>

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
  <Form.Control as="select" value={i} onChange={(e)=>{setI(e.target.value)}} required>

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
    <Form.Control type="name" placeholder="Campaign name for kickstarter or indiegogo" value={name} required 
       onChange = {(e)=>setName(e.target.value)} 
     />
     </Form.Group>
     <Form.Group className="mb-3" controlId="name">
    <Form.Label>Account Info</Form.Label>
    <Form.Control type="name" placeholder="Account Info for kickstarter or indiegogo" value={accountName} required 
       onChange = {(e)=>setAccountName(e.target.value)} 
     />
     </Form.Group>
     <Form.Group className="mb-3" controlId="password">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password for kickstarter or indiegogo" value={password} required 
       onChange = {(e)=>setPassword(e.target.value)} 
     />
 </Form.Group>
<Form.Group className="mb-3" controlId="number"> 
<Form.Label>Assign Users by ID</Form.Label>
  <Form.Control as="select" value={a} onChange={(e)=>{setA(e.target.value)}} required>

                        
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
    Edit
  </Button>
 </Form>
 </Col>
 <Col md={2}></Col>
 </Row>
      
        </Container>       
       </div>
       
          )
}

export default UserEditScreen