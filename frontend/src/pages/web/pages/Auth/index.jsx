/**
 * external libs
 */
import React, {useState, useContext} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import GoogleAuth from 'react-google-login';
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios'
/**
 * component
 */
import Paper from '../../../../components/Paper';
import Loader from '../../../../components/Loader';
import Divider from '../../../../components/Divider';
import Snackbar from '../../../../components/Snackbar';
import {Button, TextField} from '../../../../components/Form';
/**
 * services
 */
import AuthService from '../../../../services/auth.service';
/**
 * constants
 */
import {AuthContext} from '../../../context/auth.context';
import {PROFILE_PAGE} from '../../../../constants/uri.constant';
import {API_SOCIAL_GOOGLE} from '../../../../constants/api.constant'

const useStyles = makeStyles((theme) => ({
    height: {
        height: '100vh',
    },
    paper: {
        flex: 0,
        maxWidth: 500,
    },
    margin: {
        margin: `${theme.spacing(2)}px 0`
    }
}));

export default function ({history}) {
    const classes = useStyles();
    const [isLogin, setIsLogin] = useState(true);
    const [data, setData] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const {setIsAuth} = useContext(AuthContext);

    const onChangeInput = ({target: {name, value}}) => {
        setData({
            ...data,
            [name]: value,
        });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const {password, name} = data;

            const {
                data: {access_token, refresh_token},
                status,
                error,
            } = await AuthService[isLogin ? "login" : "registration"](name, password);

            if(!status) {
                throw new Error(error);
            }

            AuthService.accessToken = access_token;
            AuthService.refreshAccessToken = refresh_token;
            setIsAuth(true);

            return history.push(PROFILE_PAGE);
        } catch (e) {
            console.error(e);
            setMessage(e.message);
        }
        setLoading(false);
    };

    const responseGoogle = async (response) => {
        try {
            if(response.error) {
                return setMessage(response.error === 'popup_closed_by_user' ? 'Ошибка аутентификации' : response.error)
            }

            const {
                data: {access_token, refresh_token},
                error,
                status,
            } = await axios.post(API_SOCIAL_GOOGLE, {token: response.tokenId});

            if(status === false) {
                throw new Error(error);
            }

            AuthService.accessToken = access_token;
            AuthService.refreshAccessToken = refresh_token;
            setIsAuth(true);

            return history.push(PROFILE_PAGE);
        } catch (e) {
            console.error(e);
            setMessage(e.message);
        }
    };


    return (
        <Grid
            onSubmit={submitForm}
            container
            component="form"
            direction="column"
            className={classes.height}
            autoComplete="off"
            alignContent="center"
            justify="center"
        >
            <Loader open={isLoading}/>
            <Snackbar message={message} severity="error" updateMessage={() => setMessage('')}/>
            <Grid component={Paper} className={classes.paper}>
                <Typography variant="h5">Authorization</Typography>
                <TextField name="name" label="Name" value={data.name} required onChange={onChangeInput}/>
                <TextField
                    name="password"
                    label="Password"
                    value={data.password}
                    required
                    onChange={onChangeInput}
                    inputProps={{type: 'password', minLength: 6, maxLength: 50}}
                />
                <Divider/>
                <Grid container justify="center" className={classes.margin}>
                    <GoogleAuth
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText="GOOGLE"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                    />
                </Grid>
                <Grid container justify="center">
                    <Grid item xs={7}>
                        <Button variant="contained" size="medium" color="primary" type="submit">
                            {isLogin ? "Log In" : "Registration"}
                        </Button>
                    </Grid>
                </Grid>
                <Button onClick={() => setIsLogin(!isLogin)}>
                    <Typography variant='subtitle1'>
                        {isLogin ? "Don't have an account yet?" : "Already have an account?"}
                    </Typography>
                </Button>
            </Grid>
        </Grid>
    );
}
