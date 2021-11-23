import React from 'react';
import {Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

 const Checkouts = (s) =>{
  return (
    <Nav className="justify-content-center mb-4">
<Nav.Item>
{s.s1 ? (<LinkContainer to='/login'>
    <Nav.Link >Login</Nav.Link>
 </LinkContainer>)
 :<Nav.Link disabled>Login</Nav.Link>
 }

</Nav.Item>
     
<Nav.Item>
{s.s2 ? (<LinkContainer to='/admin/createcampaign'>
    <Nav.Link >Names</Nav.Link>
 </LinkContainer>)
 :<Nav.Link disabled>Names</Nav.Link>
 }

</Nav.Item>

<Nav.Item>
{s.s3 ? (<LinkContainer to='/parameters'>
    <Nav.Link >Parameters</Nav.Link>
 </LinkContainer>)
 :<Nav.Link disabled>Parameters</Nav.Link>
 }

</Nav.Item>


     
</Nav>
  );
}

export default Checkouts