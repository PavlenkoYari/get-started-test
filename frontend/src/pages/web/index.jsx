/**
 * external libs
 */
import React, {lazy, Suspense} from 'react';
import {Switch, Route} from "react-router-dom";
import Loader from "../../components/Loader";
import {AUTH_PAGE_URI, PROFILE_PAGE} from "../../constants/uri.constant";
/**
 * components
 */
import AuthRoute from './components/Routes/AuthRoute';
import GuestRoute from './components/Routes/GuestRoute';
import AppBar from '../../components/AppBar';


export default function () {
    return (
        <Suspense fallback={<Loader/>}>
            <AppBar title={'Get Started Web'}/>
            <Switch>
                <GuestRoute exact path={AUTH_PAGE_URI} component={lazy(() => import('./pages/Auth'))}/>
                <AuthRoute exact path={PROFILE_PAGE} component={lazy(() => import('./pages/Profile'))}/>
            </Switch>
        </Suspense>
    );
}
