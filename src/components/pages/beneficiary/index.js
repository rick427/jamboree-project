import React from 'react';
import {Route, Switch} from 'react-router-dom';
import AllBeneficiary from './all';

const BeneficiaryRoutes = ({match}) => {
    return (
        <Switch>
            <Route path={`${match.url}/all`} component={AllBeneficiary}/>
        </Switch>
     )
}

export default BeneficiaryRoutes
