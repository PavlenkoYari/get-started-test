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
import {PROFILE_PAGE} from '../../../../constants/uri.constant';

export default function ({children, ...rest}) {
    const {isAuth} = useContext(AuthContext);

    return isAuth ? <Redirect to={PROFILE_PAGE}/> : <Route {...rest} />;
}
