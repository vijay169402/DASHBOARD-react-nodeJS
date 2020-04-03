import React, { Component } from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom';
import {Helmet} from 'react-helmet';
import Registration from './components/Registration'

import Dashboard from './components/dashboardapp'

import Login2 from './components/Login2'


class App extends Component {
  render() {
    return (
      
      <div>
        <div >
            
            <Helmet>
                <style>{'body { background-color: cyan; }'}</style>
            </Helmet>
        
            
        </div>
        <Router>
          <Route exact path="/"  component={Registration} />
          <Route exact path="/login" component={Login2} />
          <Route exact path="/dashboard/:id" component={Dashboard} />
        </Router>
      </div>
    )
  }
}
export default App