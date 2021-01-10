/**
 * external libs
 */
import React, {useCallback, useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
/**
 * components
 */
import Paper from '../../../../components/Paper';
import Divider from '../../../../components/Divider';
import {Button, TextField} from '../../../../components/Form';
/**
 * models
 */
import UserModel from '../../../../model/user.model';
/**
 * servicces
 */
import ProfileService from '../../../../services/profile.service';

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        maxWidth: "630px",
        maxHeight: '520px',
        alignSelf: 'stretch',
    },
    paper: {
        height: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    title: {
        width: '100%',
    },
    buttonSubmit: {
        marginLeft: 'auto',
        display: 'block',
    },
}));

export default function () {
    const classes = useStyles();
    const [profile, setProfile] = useState(new UserModel({}));
    const [isLoading, setLoading] = useState(false);

    const getProfile = useCallback(async () => {
        try {
            setLoading(true);
            setProfile(await ProfileService.get());
            setLoading(false);
        } catch (e) {
            console.error(e);
        }
    }, []);

    useEffect(() => {
        getProfile();
    }, [getProfile]);

    const onChangeInput = ({target: {name, value}}) => {
        setProfile({
            ...profile,
            [name]: value,
        });
    };

    const onSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            setProfile(await ProfileService.update(profile));
            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.error(e);
        }
    };

    return (
        <Grid className={classes.root}>
            <Grid
                justify="center"
                container
                direction="column"
                elevation={0}
                component={Paper}
                className={classes.paper}
                alignItems="center"
            >
                {isLoading ? (
                    <CircularProgress/>
                ) : (
                    <>
                        <Typography variant="h6" className={classes.title}>
                            Your data:
                        </Typography>
                        <Grid
                            container
                            direction="column"
                            component="form"
                            autoComplete="off"
                            onSubmit={onSubmit}
                            className={classes.grow}
                        >
                            <TextField
                                name="first_name"
                                label="First name"
                                value={profile.first_name}
                                onChange={onChangeInput}
                            />
                            <TextField
                                name="last_name"
                                label="Last Name"
                                value={profile?.last_name || ''}
                                onChange={onChangeInput}
                            />
                            <TextField
                                name="age"
                                label="Age"
                                value={profile?.age || ''}
                                inputProps={{min: 1, max: 100, type: 'number'}}
                                onChange={onChangeInput}
                            />
                            <TextField disabled label="Email address" value={profile.email}/>
                            <Grid container justify="center" direction="column" className={classes.grow}>
                                <Divider/>
                            </Grid>
                            <Button
                                type="submit"
                                variant="contained"
                                size="medium"
                                color="primary"
                                className={classes.buttonSubmit}
                            >
                                UPDATE
                            </Button>
                        </Grid>
                    </>
                )}
            </Grid>
        </Grid>
    );
}
