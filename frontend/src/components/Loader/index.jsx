/**
 * external libs
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Backdrop from '@material-ui/core/Backdrop';
import {makeStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const loaderDOMElement = document.getElementById('loader');

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.loader,
    },
}));

export default ({open = true}) =>
    ReactDOM.createPortal(
        <Backdrop className={useStyles().backdrop} open={open}>
            <CircularProgress/>
        </Backdrop>,
        loaderDOMElement,
    );
