import React from 'react';
import {Route, Switch} from 'react-router-dom';
import UserDashboard from './user';
import AdminDashboard from './admin';

const DashboardRoutes = ({match}) => {
    return (
       <Switch>
           <Route path={`${match.url}/admin`} component={AdminDashboard}/>
           <Route path={`${match.url}/user`} component={UserDashboard}/>
       </Switch>
    )
}

export default DashboardRoutes
