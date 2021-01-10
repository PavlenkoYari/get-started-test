/**
 * external libs
 */
import React, {useEffect, useState, useRef, useCallback} from 'react';
import {DataGrid} from '@material-ui/data-grid';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import {Grid} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
/**
 * components
 */
import Paper from '../../../../components/Paper';
import Loader from '../../../../components/Loader';
import DialogDelete from '../../components/DialogDelete';
import Typography from '@material-ui/core/Typography';

const columns = (columns, identyParam, openDeleteMode) => [
    ...columns,
    {
        field: 'action',
        headerName: 'Actions',
        width: 120,
        sortable: false,
        renderCell: (e) => (
            <Grid container justify="space-between">
                <IconButton onClick={() => openDeleteMode(e.row[identyParam])} size="small">
                    <DeleteIcon fontSize="small" color="secondary"/>
                </IconButton>
            </Grid>
        ),
    },
];

const useStyles = makeStyles((theme) => ({
    height: {
        minHeight: 'calc(100vh - 170px)',
    },
    paper: {
        transform: 'translateY(3px)',
        borderRadius: 0,
        background: 'white',
        position: 'relative',
        zIndex: 1,
    },
    bkgGrid: {
        background: 'white',
    },
}));

export default function ({
                             title,
                             identy,
                             updateURL,
                             columnsList,
                             Service,
                             getListReq,
                             identyParam,
                         }) {
    const classes = useStyles();
    const [queryParams, setQueryParams] = useState({page: 1, limit: 10});
    const [data, setData] = useState({});
    const [openModal, setOpenModel] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const deleteID = useRef({});

    const getData = useCallback(async () => {
        setLoading(true);
        setData(await getListReq(queryParams));
        setLoading(false);
    }, [getListReq, queryParams, setData]);

    const onDelete = async (status) => {
        setOpenModel(false);
        if(status) {
            setLoading(true);
            try {
                await Service.delete(deleteID.current);
                await getData();
            } catch (e) {
                console.error(e);
            }
            setLoading(false);
        }
    };

    const openModalEvent = (param) => {
        deleteID.current = param;
        setOpenModel(true);
    };

    const changeQueryParams = ({page, pageSize}) => {
        if(page !== queryParams.page || pageSize !== queryParams.limit) {
            setQueryParams({
                page: page,
                limit: pageSize,
            });
        }
    };

    useEffect(() => {
        getData();
    }, [getData]);

    return (
        <Grid>
            <Loader open={isLoading}/>
            <Grid container justify="space-between" component={Paper} className={classes.paper}>
                <Typography variant="h6" className={classes.title}>
                    {title}
                </Typography>
            </Grid>
            <div className={classes.height}>
                <DataGrid
                    rows={data.items || []}
                    pagination
                    page={queryParams.page}
                    className={classes.bkgGrid}
                    onPageChange={changeQueryParams}
                    onPageSizeChange={changeQueryParams}
                    paginationMode="server"
                    rowCount={data.total}
                    pageSize={queryParams.limit}
                    showCellRightBorde={false}
                    rowsPerPageOptions={[10, 50, 100]}
                    columns={columns(columnsList, identyParam, openModalEvent, updateURL)}
                />
            </div>
            <DialogDelete
                title={`Delete ${identy}`}
                description={`Are you sure you want to delete this ${identy}?`}
                open={openModal}
                onCloseModal={onDelete}
            />
        </Grid>
    );
}
