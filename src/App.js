import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import setAuthToken from './utils/setAuthToken'
import AuthState from './context/auth/authState';
import MetroState from './context/metro/MetroState';
import LocalState from './context/local/LocalState';
import WardState from './context/ward/WardState';
import AreaState from './context/area/AreaState';
import CboState from './context/cbo/CboState';
import ProvinceState from './context/province/provinceState';
import BeneficiaryState from './context/beneficiary/BeneficiaryState';

import PrivateRoute from './components/privateRoute';
import Landing from './components/landingPage';
import Login from './components/auth/login';
import AppLayout from './components/layout';

import './App.css';

if(localStorage.token) setAuthToken(localStorage.token);

function App() {
  return (
    <AuthState>
      <ProvinceState>
        <MetroState>
          <LocalState>
            <WardState>
              <AreaState>
                <CboState>
                  <BeneficiaryState>
                    <Router>
                      <div className="wrapper">
                        <Switch>
                          <Route exact path="/" component={Landing}/>
                          <Route exact path="/login" component={Login}/>
                          <PrivateRoute path="/main" component={AppLayout}/>
                        </Switch>
                      </div>
                    </Router>
                  </BeneficiaryState>  
                </CboState>
              </AreaState>
            </WardState>
          </LocalState>
        </MetroState>
      </ProvinceState>
    </AuthState>
  );
}

export default App;
