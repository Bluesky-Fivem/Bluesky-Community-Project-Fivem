import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { makeStyles, Fade, Slide } from '@material-ui/core';

import vers1 from '../../vers/1.png';

const useStyles = makeStyles(theme => ({
    wrapper: {
        height: '100%',
        background: theme.palette.secondary.main,
        textAlign: 'center',
        position: 'relative',
    },
    heading: {
        display: 'block',
        fontFamily: 'Stylized',
        fontSize: 40,
        userSelect: 'none',
        '-webkit-user-select': 'none',
    },
    subheading: {
        display: 'block',
        fontFamily: 'Stylized',
        fontSize: 30,
        userSelect: 'none',
        '-webkit-user-select': 'none',
    },
    versimg: {
        width: 300,
        height: 300,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: 'auto',
    },
    footer: {
        display: 'block',
        width: '100%',
        textAlign: 'center',
        position: 'absolute',
        bottom: 0,
        padding: 10,
        fontFamily: 'Stylized',
        fontSize: 16,
        userSelect: 'none',
        '-webkit-user-select': 'none',
    }
}));

export default connect()((props) => {
    const classes = useStyles();
    
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);

    useEffect(() => {
        setOpen(true);

        let o2 = setTimeout(() => {
            setOpen2(true)
        }, 500);

        let o3 = setTimeout(() => {
            setOpen3(true)
        }, 1000);

        return () => {
            setOpen(false);
            clearTimeout(o2);
            clearTimeout(o3);
        }
    }, []);

    return (
        <div className={classes.wrapper}>
            <div>
                <Slide in={open} direction='up' timeout={500}>
                    <div>
                        <span className={classes.heading}>Pixel OS</span>
                        <span className={classes.subheading}>v1.0</span>
                    </div>
                </Slide>

                <Fade in={open2} timeout={500}>
                    <img src={vers1} className={`fa fa-spin ${classes.versimg}`}></img>
                </Fade>

                <Slide in={open3} direction='down' timeout={500}>
                    <span className={classes.footer}>💙 From Alzar 😁</span>
                </Slide>
            </div>
        </div>
    );
});
