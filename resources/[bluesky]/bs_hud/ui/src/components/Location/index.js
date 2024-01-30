import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  location: {
    position: 'absolute',
    bottom: '6.48vmin',
    left: '28.7vmin',
    textShadow: '0 0 0.46vmin #000000',
  },
  locationFoot: {
    position: 'absolute',
    bottom: '1.85vmin',
    left: '0.92vmin',
    textShadow: '0 0 0.46vmin #000000',
  },
  highlight: {
    color: theme.palette.primary.main,
  },
  highlight2: {
    color: theme.palette.primary.main,
    fontSize: '1.38vmin',
  },
  areaWrap: {
    display: 'block',
    fontSize: '1.85vmin',
    position: 'relative',
    top: '0.46vmin',
  },
  direction: {
    fontSize: '2.31vmin',
    lineHeight: '2.77vmin',
    color: theme.palette.text.main,
    display: 'inline-block',
    width: '1.85vmin',
    textAlign: 'center',
  },
  locationMain: {
    color: theme.palette.text.dark,
    fontSize: '2.31vmin',
  },
  locationSecondary: {
    color: theme.palette.text.main,
    fontSize: '1.85vmin',
    marginLeft: '0.46vmin',
  },
  '@keyframes flash': {
    '0%': {
      opacity: 1,
    },
    '50%': {
      opacity: 0.1,
    },
    '100%': {
      opacity: 1,
    },
  },
}));

export default () => {
  const classes = useStyles();
  const time = useSelector(state => state.location.time);
  const location = useSelector(state => state.location.location);
  const inVehicle = useSelector(state => state.vehicle.showing);
  const isShifted = useSelector(state => state.location.shifted);

  return (
    //<div className={inVehicle || isShifted ? classes.location : classes.locationFoot}>
    <div className={classes.location}>
      <div className={classes.areaWrap}>
        <span className={classes.area}>{location.area}</span>
      </div>
      <div className={classes.locationMain}>
        <span className={classes.direction}>{location.direction}</span>
        <span className={classes.highlight}> | </span>
        {location.main}
        <span className={classes.locationSecondary}>
          {location.cross !== '' ? (
            <span>
              <span className={classes.highlight}> x </span>
              {location.cross}
            </span>
          ) : null}
        </span>
      </div>
    </div>
  );
};
