/**
 * external libs
 */
import React from 'react';
import MaterialButton from '@material-ui/core/Button';
/**
 * components
 */
import {FormControl} from './index';

export default (props) => (
    <FormControl fullWidth={true}>
        <MaterialButton {...props} />
    </FormControl>
);
