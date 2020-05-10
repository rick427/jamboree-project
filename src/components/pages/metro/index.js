import React from 'react';
import {Route, Switch} from 'react-router-dom';
import MetroDistricts  from './all';

const MetroRoutes = ({match}) => {
    return (
       <Switch>
           <Route path={`${match.url}/all`} component={MetroDistricts}/>
       </Switch>
    )
}

export default MetroRoutes;
