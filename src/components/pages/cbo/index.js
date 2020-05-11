import React from 'react';
import {Route, Switch} from 'react-router-dom';
import AllCbos from './all';
import CreateCbo from './create';
import EditCbo from './edit';

const CboRoutes = ({match}) => {
    return (
        <Switch>
            <Route path={`${match.url}/all`} component={AllCbos}/>
            <Route path={`${match.url}/create`} component={CreateCbo}/>
            <Route path={`${match.url}/edit/:id`} component={EditCbo}/>
        </Switch>
    )
}

export default CboRoutes
