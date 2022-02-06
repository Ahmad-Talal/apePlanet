import React, {useState,useEffect} from 'react';
import {Table} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { useSelector} from 'react-redux'
import axios from 'axios'
const ViewCampaignsScreen = ({history}) =>{
    //states
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin
    const [campaigns,setCampaigns] = useState([])
    const [state,setState] = useState(0)

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            if(state===0){
            async function campaignslist(){
                const configuration = {
                    headers : {
                        'Content-type':'application/json',
                        Authorization: `Bearer ${userInfo.token}`
                    }
                }
            
                const {data} =await axios.get(
                    '/api/users/campaigns',
                    configuration
                    )
                    setCampaigns(data)
                    setState(1)
                }   
                campaignslist()
            }
            
        }
        else{
            history.push('/login')
        }          
    }, [state,campaigns,history,userInfo])


    const deleteCampaignFunction=(id)=>{
        if(window.confirm("Are you sure you want to delete the campaign?"))
        {
            async function campaignslist(){
                const configuration = {
                    headers : {
                        'Content-type':'application/json',
                        Authorization: `Bearer ${userInfo.token}`
                    }
                }
            
                const {data} =await axios.delete(
                    `/api/users/campaign/delete/${id}/`,
                    configuration
                    )
                }   
                campaignslist()
                setState(0)
        }
    }
    return (
    <div>
            <h2>Campaigns</h2>
           <Table striped bordered hover responsive className="table-sm">
                <thead>
                    <tr>
                        <th>
                            ID
                        </th>

                        <th>
                            Assign User ID
                        </th>
                        <th>
                            Project Name
                        </th>
                        <th>
                            Platform
                        </th>
                        <th>
                            Integration
                        </th>
                        <th>
                            edit 
                        </th>
                        <th>
                            delete
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {
                       userInfo && userInfo.isAdmin &&campaigns&& (
                        campaigns.map(val=>
                        {
                            return (
                                <tr key={val._id}>
                                    <td>
                                        {val._id}                                        
                                    </td>

                                    <td>
                                        {val.assign}                                        
                                    </td>
                                    <td>
                                        {val.projectName}                                        
                                    </td>
                                    <td>
                                        {val.platform}                                        
                                    </td>
                                    <td>
                                        {val.integration}                                        
                                    </td>

                                    <td>
                                    <LinkContainer style={{cursor:'pointer'}} to={`/admin/campaign/${val._id}/edit`}>
                                    <i className='fas fa-edit' ></i>
                                    </LinkContainer>
                                        
                                    </td>
                                    <td>
                                        <i className='fas fa-trash' style={{color:"red",cursor:'pointer'}} onClick={()=>deleteCampaignFunction(val._id)}></i>
                                    </td>

                                </tr>
                            )
                        }))
                    }
                </tbody>

            </Table>
            </div>
            )}
export default ViewCampaignsScreen