/**
 * external libs
 */
import React from 'react';
import ReactDOM from 'react-dom';

/**
 * components
 */
import Routes from './components/Routes';
import {BrowserRouter} from 'react-router-dom';
/**
 * styles
 */
import './general.css';
/**
 * helpers
 */
import './helpers/axios';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes/>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
);
