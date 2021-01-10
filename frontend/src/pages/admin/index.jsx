/**
 * external libs
 */
import React, {lazy, Suspense} from 'react';
import {Route, Switch} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';

/**
 * components
 */
import Drawer from './components/DrawerView';
import AppBar from '../../components/AppBar';
import Loader from '../../components/Loader';
/**
 * internal constants
 */
import {
    ADMIN_USERS_PAGE_URI,
} from '../../constants/uri.constant';

const useStyles = makeStyles((theme) => ({
    container: {
        flex: '1',
    },
    contentWrapper: {
        padding: theme.spacing(2),
    },
}));
export default function () {
    const classes = useStyles();

    return (
        <Suspense fallback={<Loader/>}>
            <Switch>
                <Grid container>
                    <Drawer/>
                    <Grid className={classes.container}>
                        <AppBar title={"Get Started Admin"}/>
                        <Grid className={classes.contentWrapper}>
                            <Switch>
                                <Route exact path={ADMIN_USERS_PAGE_URI}
                                       component={lazy(() => import('./pages/Users'))}/>
                            </Switch>
                        </Grid>
                    </Grid>
                </Grid>
            </Switch>
        </Suspense>
    );
}
