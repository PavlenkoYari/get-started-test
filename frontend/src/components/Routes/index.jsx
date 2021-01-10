/**
 * external libs
 */
import React from 'react';
import {Route, Switch, useHistory} from 'react-router-dom';
/**
 * services
 */
import AuthService from '../../services/auth.service';
/**
 * pages
 */
import Website from '../../pages/web';
import AdminPanel from '../../pages/admin';

/**
 * context
 */
import {AuthContextProvider} from '../../pages/context/auth.context';
import AdminRoute from '../../pages/admin/components/Route/AdminRoute';

export default function () {
    AuthService.history = useHistory();
    return (
        <AuthContextProvider>
            <Switch>
                <Route path="/admin">
                    <AdminRoute>
                        <AdminPanel/>
                    </AdminRoute>
                </Route>
                <Route path="/">
                    <Website/>
                </Route>
            </Switch>
        </AuthContextProvider>
    );
}
