import React from 'react';
import {Route, Switch} from 'react-router-dom';
import AllAreas from './all';

const AreaRoutes = ({match}) => {
    return (
        <Switch>
            <Route path={`${match.url}/all`} component={AllAreas}/>
        </Switch>
     )
}

export default AreaRoutes
