/**
 * external libs
 */
import React, {useContext} from 'react';
import {Redirect} from 'react-router-dom';
/**
 * external context
 */
import {AuthContext} from '../../../context/auth.context';
/**
 * external constants
 */
import {AUTH_PAGE_URI} from '../../../../constants/uri.constant';

export default function ({children, location}) {
    const {isAuth, isAdmin} = useContext(AuthContext);

    if(!isAuth || !isAdmin) return <Redirect to={{state: {from: location}, pathname: AUTH_PAGE_URI}}/>;

    return children;
}
