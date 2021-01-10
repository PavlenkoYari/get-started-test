/**
 * external libs
 */
import React, {useContext} from 'react';
import {Redirect, Route} from 'react-router-dom';
/**
 * external context
 */
import {AuthContext} from '../../../context/auth.context';
/**
 * external constants
 */
import {AUTH_PAGE_URI} from '../../../../constants/uri.constant';

export default function ({children, location, ...rest}) {
    const {isAuth} = useContext(AuthContext);

    return isAuth ? (
        <Route {...rest} />
    ) : (
        <Redirect
            to={{
                state: {from: location},
                pathname: AUTH_PAGE_URI,
            }}
        />
    );
}
