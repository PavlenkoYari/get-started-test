import React from 'react';
import {Alert} from '@material-ui/lab';
import {Snackbar as SnackbarMui} from '@material-ui/core';

let timer = null;
const Snackbar = ({message, severity, autoHideDuration, updateMessage, ...rest}) => {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        message && setOpen(true);
    }, [message]);

    const handleClose = (event, reason) => {
        if(reason === 'clickaway') {
            return;
        }

        if(timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(updateMessage, 500);

        setOpen(false);
    };

    return (
        <SnackbarMui open={open} autoHideDuration={autoHideDuration} onClose={handleClose} {...rest}>
            <Alert onClose={handleClose} elevation={6} variant="filled" severity={severity}>
                {message}
            </Alert>
        </SnackbarMui>
    );
};

export default Snackbar;

Snackbar.defaultProps = {
    message: '',
    severity: 'success',
    updateMessage: () => {
    },
    autoHideDuration: 6000,
};
