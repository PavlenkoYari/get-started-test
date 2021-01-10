import React from 'react';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        padding: theme.spacing(2),
    },
}));
export default ({children, className = ''}) => (
    <Paper variant="outlined" elevation={0} className={`${className} ${useStyles().root}`}>
        {children}
    </Paper>
);
