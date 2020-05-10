import React from 'react';
import {Route, Switch} from 'react-router-dom';
import AllCbos from './all';

const CboRoutes = ({match}) => {
    return (
        <Switch>
            <Route path={`${match.url}/cbos`} component={AllCbos}/>
        </Switch>
    )
}

export default CboRoutes
