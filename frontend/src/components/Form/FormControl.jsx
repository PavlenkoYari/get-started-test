/**
 * external libs
 */
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import MaterialFormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

export default function FormControl({children, ...rest}) {
    return (
        <MaterialFormControl {...rest} className={useStyles().formControl}>
            {children}
        </MaterialFormControl>
    );
}

FormControl.defaultProps = {
    fullWidth: true,
};
