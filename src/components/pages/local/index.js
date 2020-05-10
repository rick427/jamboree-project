import React from 'react';
import {Route, Switch} from 'react-router-dom';
import LocalDistricts  from './all';

const LocalRoutes = ({match}) => {
    return (
       <Switch>
           <Route path={`${match.url}/all`} component={LocalDistricts}/>
       </Switch>
    )
}

export default LocalRoutes;