import React from 'react';
import {Route, Switch} from 'react-router-dom';
import AllProvince from './all';

const ProvinceRoutes = ({match}) => {
    return (
       <Switch>
           <Route path={`${match.url}/all`} component={AllProvince}/>
       </Switch>
    )
}

export default ProvinceRoutes
