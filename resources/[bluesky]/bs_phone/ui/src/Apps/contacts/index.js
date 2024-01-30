import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { Confirm } from '../../components';
import Contact from './contact';

import { deleteContact } from './actions';
import { showAlert } from '../../actions/alertActions';

const useStyles = makeStyles(theme => ({
    wrapper: {
        height: '100%',
        background: theme.palette.secondary.main,
        overflowY: 'auto',
        overflowX: 'hidden',
        '&::-webkit-scrollbar': {
            width: 6,
        },
        '&::-webkit-scrollbar-thumb': {
            background: '#ffffff52',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: theme.palette.primary.main,
        },
        '&::-webkit-scrollbar-track': {
            background: 'transparent',
        },
    },
    add: {
        position: 'absolute',
        bottom: '12%',
        right: '10%',
        '&:hover': {
            filter: 'brightness(0.75)',
            transition: 'filter ease-in 0.15s',
        }
    },
    closer: {
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        background: 'rgba(0, 0, 0, 0.75)',
        zIndex: 10000,
    },
    createInput: {
        width: '100%',
        height: '100%',
        marginBottom: 10,
    },
    nocontacts: {
        width: '100%',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: '25%',
    }
}));

export default connect(null, { showAlert, deleteContact })((props) => {
    const classes = useStyles();
    const history = useHistory();
    const data = useSelector(state => state.data.data);
    const contacts = data.contacts;
    const [expanded, setExpanded] = useState(-1);

    const create = () => {
        history.push('/apps/contacts/add');
    }

    const handleClick = (index) => (event, newExpanded) => {
        setExpanded(newExpanded ? index : false);
    };

    const [deleteOpen, setDeleteOpen] = useState(false);
    const handleDeleteOpen = (id) => {
        setDeleteOpen(id);
    };

    const onDecline = () => {
        setDeleteOpen(false);
    };

    const onDelete = () => {
        setDeleteOpen(false);
        props.deleteContact(deleteOpen);
        props.showAlert('Contact Deleted');
    };

    if (contacts != null && contacts.length > 0) {
        return (
            <div className={classes.wrapper}>
                {
                    contacts.filter(c => c.favorite).sort((a, b) => {
                        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                        else if (b.name.toLowerCase() > a.name.toLowerCase()) return -1;
                        else return 0;
                    }).map((contact) => {
                        return(<Contact key={contact._id} contact={contact} expanded={expanded} index={contact._id} onClick={handleClick(contact._id)} onDelete={() => handleDeleteOpen(contact._id)} />)
                    })
                }
                {
                    contacts.filter(c => !c.favorite).sort((a, b) => {
                        if (a.name > b.name) return 1;
                        else if (b.name > a.name) return -1;
                        else return 0;
                    }).map((contact) => {
                        return(<Contact key={contact._id} contact={contact} expanded={expanded} index={contact._id} onClick={handleClick(contact._id)} onDelete={() => handleDeleteOpen(contact._id)} />)
                    })
                }
                <Fab className={classes.add} color="primary" onClick={create}>
                    <AddIcon />
                </Fab>
    
                <Confirm title='Delete Contact' open={deleteOpen} confirm='Delete' decline='Cancel' onConfirm={onDelete} onDecline={onDecline} />
            </div>
        );
    } else {
        return (
            <div className={classes.wrapper}>
                <div className={classes.nocontacts}>You Have No Contacts</div>
                <Fab className={classes.add} color="primary" onClick={create}>
                    <AddIcon />
                </Fab>
    
                <Confirm title='Delete Contact' open={deleteOpen} confirm='Delete' decline='Cancel' onConfirm={onDelete} onDecline={onDecline} />
            </div>
        );
    }
});
