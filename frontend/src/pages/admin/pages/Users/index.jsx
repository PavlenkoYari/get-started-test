/**
 * external libs
 */
import React from 'react';
/**
 * external coponents
 */
import TableView from '../../components/TableView';
/**
 * external service
 */
import UserService from '../../../../services/user.service';
/**
 * external constants
 */
import {
    MAKE_UPDATE_ADMIN_USERS_PAGE_URI,
} from '../../../../constants/uri.constant';

const columns = [
    {field: 'email', headerName: 'Email', width: 220, sortable: true},
    {field: 'first_name', headerName: 'First Name', width: 150, sortable: false},
    {field: 'last_name', headerName: 'Last Name', width: 150, sortable: false},
    {field: 'age', headerName: 'Age', width: 100, sortable: false},
];

export default function () {

    const getUserData = async ({page = 1, limit = 10}) => await UserService.list(page, limit);


    return (
        <TableView
            title="Users"
            identy="user"
            identyParam="id"
            columnsList={columns}
            Service={UserService}
            updateURL={MAKE_UPDATE_ADMIN_USERS_PAGE_URI}
            getListReq={getUserData}
        />
    );
}
