import React from 'react';
import {Route, Switch} from 'react-router-dom';
import AllDevices from './all';

const DeviceRoutes = ({match}) => {
    return (
        <Switch>
            <Route path={`${match.url}/all`} component={AllDevices}/>
        </Switch>
     )
}

export default DeviceRoutes
