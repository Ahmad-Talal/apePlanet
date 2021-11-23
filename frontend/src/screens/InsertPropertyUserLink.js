import React from 'react';
import {Form,Button,Row,Col} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { gapi } from 'gapi-script';
import { ga } from 'react-ga';
import ReactGA from 'react-ga';


function InsertPropertyUserLink() {
  // const {BetaAnalyticsDataClient} = require('@google-analytics/data');
  // const analyticsDataClient = new BetaAnalyticsDataClient();

  var request =ga.client.analytics.management.webpropertyUserLinks.insert(
    {
      'accountId': '210107702',
      'webPropertyId': 'UA-126294108-8',
      'resource': {
        'permissions': {
          'local': [
            'EDIT',
            'MANAGE_USERS'
          ]
        },
        'userRef': {
          'email': '2017n5400@gmail .com'
        }
      }
    });
  request.execute(function (response) { // Handle the response. 
  });
}
export default InsertPropertyUserLink
