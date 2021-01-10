/**
 * external libs
 */
import React from 'react';
import DividerMui from '@material-ui/core/Divider';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    divider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

export default (props) => <DividerMui className={useStyles().divider} {...props} />;
