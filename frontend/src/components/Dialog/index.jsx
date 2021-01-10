/**
 * external libs
 */
import React from 'react';
import DialogMui from '@material-ui/core/Dialog';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(2),
    },
}));

export default function Dialog({children, ...rest}) {
    const classes = useStyles();
    return (
        <DialogMui {...rest} className={classes.modal}>
            {children}
        </DialogMui>
    );
}
