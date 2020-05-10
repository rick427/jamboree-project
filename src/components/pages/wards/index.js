import React from 'react';
import {Route, Switch} from 'react-router-dom';
import AllWards from './all';

const WardsRoutes = ({match}) => {
    return (
        <Switch>
            <Route path={`${match.url}/all`} component={AllWards}/>
        </Switch>
     )
}

export default WardsRoutes
