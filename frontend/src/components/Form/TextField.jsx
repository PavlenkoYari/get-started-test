/**
 * external libs
 */
import React from 'react';
import MaterialTextField from '@material-ui/core/TextField';
/**
 * components
 */
import {FormControl} from './index';

export default function TextField({error, helperText, ...rest}) {
    return (
        <FormControl>
            <MaterialTextField {...rest} error={error} helperText={helperText}/>
        </FormControl>
    );
}

TextField.defaultProps = {
    size: 'small',
    value: '',
    variant: 'filled',
};
