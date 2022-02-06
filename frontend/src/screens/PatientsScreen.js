import React, {useState,useEffect} from 'react';
import {Table} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import axios from 'axios'
const PatientsScreen = ({history}) =>{
    //states
    const [patients,setPatients] = useState([])
    
    

    useEffect(() => {
            async function campaignslist(){

                const {data} =await axios.get(
                    '/api/users/campaigns'
                    )
                    setPatients(data)
                }   
                campaignslist()
                   
    }, [campaigns,history,userInfo])


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
export default PatientsScreen