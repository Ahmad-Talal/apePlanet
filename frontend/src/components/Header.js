import React, {useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { Navbar,Nav, Container,NavDropdown } from "react-bootstrap"
import {LinkContainer} from 'react-router-bootstrap'
import {logoutUser} from '../actions/userActions'
const Header=()=> {
  const dispatch = useDispatch()
  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo} = userLogin

  useEffect(() => {
    
  }, [userInfo])
  const logOutFunction = ()=>{
    dispatch(logoutUser())
  }
    return (
        <header>
        <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect  >
        <Container>

<LinkContainer to='/'>
  <Navbar.Brand  >ApePlanet</Navbar.Brand>
 </LinkContainer>
 
 <Navbar.Toggle aria-controls="basic-navbar-nav" />
 
 <Navbar.Collapse id="basic-navbar-nav">
 <Nav className="mr-auto">
 
{userInfo ? (  

  <NavDropdown title = {userInfo.name} id='username'>
  
    
  <LinkContainer to='/profile'>
  <NavDropdown.Item>profile</NavDropdown.Item>
  </LinkContainer>
  
  <NavDropdown.Item onClick={logOutFunction}> LogOut</NavDropdown.Item>
  
  <LinkContainer to={`/campaign/${userInfo._id}`}>
  <NavDropdown.Item>your campaigns</NavDropdown.Item>
  </LinkContainer>

  <LinkContainer to={`/report`}>
  <NavDropdown.Item>Report</NavDropdown.Item>
  </LinkContainer>

  </NavDropdown>

):  (<LinkContainer to='/Login'>
      <Nav.Link ><i className="fas fa-user "></i>Login</Nav.Link>
</LinkContainer>)
}

{
  userInfo && userInfo.isAdmin &&(  

<NavDropdown title = "Admin" id='Admin-queue'>

  
<LinkContainer to='/admin/userlist'>
<NavDropdown.Item>Users List</NavDropdown.Item>
</LinkContainer>

<LinkContainer to='/admin/createcampaign'>
<NavDropdown.Item>Create Campaign</NavDropdown.Item>
</LinkContainer>

<LinkContainer to='/admin/campaigns'>
<NavDropdown.Item>View Campaigns</NavDropdown.Item>
</LinkContainer>

<LinkContainer to='/register'>
<NavDropdown.Item>Create A User</NavDropdown.Item>
</LinkContainer>

<LinkContainer to='/admin/change/clientID'>
<NavDropdown.Item>Change Client Id</NavDropdown.Item>
</LinkContainer>

<LinkContainer to='/fb'>
<NavDropdown.Item>Refresh Logins</NavDropdown.Item>
</LinkContainer>

</NavDropdown>


)}  
 
 </Nav>
 
 </Navbar.Collapse>
  </Container>
</Navbar>   
        </header>
    )
}

export default Header
