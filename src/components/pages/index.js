import React from 'react';
import {Route, Switch} from "react-router-dom";
import DashboardRoutes from './dashboard';
import CboRoutes from './cbo';
import ProvinceRoutes from './province';
import MetroRoutes from './metro';
import LocalRoutes from './local';
import WardsRoutes from './wards';
import AreaRoutes from './area';

const AppPages = ({match}) => {
    return (
        <Switch>
          {/* <Redirect exact from={`${match.url}`} to={`${match.url}/dashboard/admin`}/> */}
          <Route path={`${match.url}/dashboard`} component={DashboardRoutes}/>
          <Route path={`${match.url}/province`} component={ProvinceRoutes}/>
          <Route path={`${match.url}/metro/municipality`} component={MetroRoutes}/>
          <Route path={`${match.url}/local/municipality`} component={LocalRoutes}/>
          <Route path={`${match.url}/wards`} component={WardsRoutes}/>
          <Route path={`${match.url}/area`} component={AreaRoutes}/>
          <Route path={`${match.url}/cbo`} component={CboRoutes}/>
          {/* 
          
          
          <Route path={`${match.url}/cbo`} component={MetroRoutes}/>
          <Route path={`${match.url}/beneficiary`} component={MetroRoutes}/>
          <Route path={`${match.url}/device`} component={MetroRoutes}/> */}
        </Switch> 
    )
}

export default AppPages;
