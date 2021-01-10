/**
 * external libs
 */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
/**
 * components
 */
import {Button} from '../../../../components/Form';
/**
 * Service
 */
import Dialog from '../../../../components/Dialog';

export default function ({open, onCloseModal, title, description}) {
    return (
        <Dialog open={open} onClose={() => onCloseModal(false)}>
            <DialogTitle disableTypography>
                <Typography variant="h6">{title}</Typography>
            </DialogTitle>
            <DialogContent dividers>
                <Typography>{description}</Typography>
            </DialogContent>
            <DialogActions>
                <Grid container justify="flex-end" spacing={1}>
                    <Grid item>
                        <Button color="secondary" variant="outlined" onClick={() => onCloseModal(false)}>
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button color="primary" variant="contained" autoFocus onClick={() => onCloseModal(true)}>
                            Delete
                        </Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    );
}
