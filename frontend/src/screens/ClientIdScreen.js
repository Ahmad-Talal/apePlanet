import React, {useState, useEffect} from 'react';
import {Container,Form,Button,Row,Col} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios  from 'axios';

const ClientIdScreen=({history})=>{

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin
    const [c,setC] = useState("")

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){

        

        }
        else{
            history.push('/login')
        }          
    }, [history,userInfo])

    const send =(e)=>{
        e.preventDefault()

        
        async function ChangeClientId(){
            const configuration = {
                headers : {
                    'Content-type':'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                    
                }
                
            }
             await axios.put(
                `/api/users/clientid/change/`,
                { 
                    cl:c
                },
                configuration
                )
        }
        ChangeClientId()

        history.push('/login')
    }

    

    return(
        <div>

            <h2>
                change your client id
            </h2>

            <Form onSubmit ={send}>
            <Form.Group className="mb-3" controlId="name" />
            <Form.Label>Client ID</Form.Label>
            <Form.Control type="name" placeholder="Enter the client id" value={c} required 
         onChange = {(e)=>setC(e.target.value)} 
       />

     <Button variant="primary" type="submit">
         Submit
    </Button>

       </Form>
        </div>
    )

}
export default ClientIdScreen;