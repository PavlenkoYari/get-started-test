/**
 * external libs
 */
import React, {useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
/**
 * constants
 */
import {ADMIN_USERS_PAGE_URI, AUTH_PAGE_URI, PROFILE_PAGE} from '../../constants/uri.constant';
/**
 * context
 */
import {AuthContext} from "../../pages/context/auth.context";
/**
 * service
 */
import AuthService from "../../services/auth.service";

const useStyles = makeStyles(() => ({
    title: {
        flexGrow: 1,
    },
}));

export default function ({ title }) {
    const classes = useStyles();
    const {isAuth} = useContext(AuthContext);

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title} component={Link} to='/'>
                    {title}
                </Typography>
                {!isAuth &&
                <Button size="small" color="inherit" component={Link}
                        to={AUTH_PAGE_URI}>
                    Log in
                </Button>
                }
                {isAuth &&
                <>
                    <Button size="small" color="inherit" component={Link}
                            to={PROFILE_PAGE}>
                        Profile
                    </Button>
                    <Button size="small" color="inherit" component={Link}
                            to={ADMIN_USERS_PAGE_URI}>
                        Admin Panel
                    </Button>
                    <Button size="small" color="inherit" onClick={() => AuthService.logout()}>
                        Logout
                    </Button>
                </>
                }
            </Toolbar>
        </AppBar>
    );
}
