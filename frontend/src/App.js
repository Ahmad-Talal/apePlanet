import React, {useEffect} from 'react';
import {Container} from 'react-bootstrap'
import {BrowserRouter as Router,Route} from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import InsertPropertyUserLink from './screens/InsertPropertyUserLink'
import CampaignScreen from './screens/CampaignScreen'
import AssignCampaignsScreen from './screens/AssignCampaignsScreen'
import ViewCampaignsScreen from './screens/ViewCampaignsScreen'
import CampaignEditScreen from './screens/CampaignEditScreen'
import HomeScreen from './screens/HomeScreen'
import LiveCampaignsScreen from './screens/LiveCampaignScreen'
import ClientIdScreen from './screens/ClientIdScreen'
import CommulativeIndiegogoScreen from './screens/CommulativeIndiegogoScreen'
import LiveKickScreen from './screens/LiveKickScreen'
import CommulativeKickstarterScreen from './screens/CommulativeKickstarterScreen'

import Goals from './Goals';
import ReactGa from 'react-ga';


function App() {
  useEffect(() => {
    ReactGa.initialize('UA-126294108-8')
    ReactGa.pageview(window.location.pathname + window.location.search)
  }, [])

  return (
    <Router >
    <Header/>
    <main className="py-5" bg="dataPic.jpg">
    
    <Container >
    
      <Route path='/login' component={LoginScreen} />
      <Route path='/register' component={RegisterScreen} />
      <Route path='/profile' component={ProfileScreen} />
      <Route path='/admin/userlist' component={UserListScreen}/>
      <Route path='/admin/user/:id/edit' component={UserEditScreen}/>
      <Route path='/create' component={InsertPropertyUserLink}/>
      <Route path='/admin/createcampaign' component={CampaignScreen}/>
      <Route path='/admin/change/clientID' component={ClientIdScreen}/>
      <Route path='/campaign/:id' component={AssignCampaignsScreen}/>
      <Route path='/admin/campaigns' component={ViewCampaignsScreen}/>
      <Route path='/admin/campaign/:id/edit' component={CampaignEditScreen}/>
      <Route path='/live-campaign/:id?' component={LiveCampaignsScreen}/>
      <Route path='/indiegogo/commulative' component={CommulativeIndiegogoScreen}/>
      <Route path='/kickvaala' component={LiveKickScreen}/>
      <Route path='/kickstarter/commulative' component={CommulativeKickstarterScreen}/>

      <Route path='/' component={HomeScreen}/>
      {/* <Route path='/' component={Goals}/> */}
    </Container>
    </main>
    <Footer/>
    </Router>
  );
}

export default App; 