/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable global-require */
/* eslint-disable react/no-danger */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { makeStyles } from '@material-ui/core';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { Animated } from "react-animated-css";
import 'react-circular-progressbar/dist/styles.css';
import './animated.css';
import { Suspense } from 'react';

const useStyles = makeStyles(theme => ({
  status: {
    position: 'absolute',
    bottom: '0.26vmin',
    right: 0,
    left: 0,
    marginLeft: '1.77vmin',
    fontSize: '2.77vmin',
    width: 'fit-content',
    maxWidth: '332.40vmin',
    textAlign: 'center',
    filter: 'drop-shadow(0 0 0.18vmin #000000)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    display: 'flex',
    '& svg': {
      margin: '0.46vmin',
    },
  },
  status100: {
    color: theme.palette.error.dark,
  },
  status75: {
    animation: '$flash linear 60s infinite',
  },
  status50: {
    animation: '$flash linear 30s infinite',
  },
  status25: {
    animation: '$flash linear 15s infinite',
  },
  status10: {
    color: theme.palette.error.main,
    animation: '$flash linear 5s infinite',
  },
  status10Static: {
    color: theme.palette.error.main,
  },
  status0: {
    color: theme.palette.text.main,
    animation: '$flash linear 0.6s infinite',
  },
  status0Static: {
    color: theme.palette.text.main,
    opacity: 0.25,
  },
  statusIcon: {
    height: '3.70vmin',
    width: '3.70vmin',
    //strokeLinecap: "butt",
  },
  statIcon: {
    display: 'inline-block',
  },
  '@keyframes flash': {
    '0%': {
      opacity: 0.75,
    },
    '20%': {
      opacity: 0.1,
    },
    '40%': {
      opacity: 0.75,
    },
  },
}));

library.add(fab, fas);

export default () => {
  const classes = useStyles();
  const health = useSelector(state => state.status.health);
  const armor = useSelector(state => state.status.armor);
  const stamina = useSelector(state => state.status.stamina);
  const oxygen = useSelector(state => state.status.oxygen);
  const statuses = useSelector(state => state.status.statuses);
  const hunger = Object(statuses.find(element => element.name == "PLAYER_HUNGER")).value;
  const thirst = Object(statuses.find(element => element.name == "PLAYER_THIRST")).value;
  const drunk = Object(statuses.find(element => element.name == "PLAYER_DRUNK")).value;
  const statusLineWidth = 11.5;
  const backGround = true;


  const ChangeIconVisibility = (data, smaller) => {
    let value = false;
    if(smaller)
    {
      if(data < 100)
      {
        value = true
      }
    }
    else 
    {
      if(data > 0)
      {
        value = true
      }
    }
    return value;
  };
  //{/*className={GetData(health)}*/}
  return (
    <div className={classes.status}>
      {/* HEALTH STATUS BAR */}
      <CircularProgressbarWithChildren
        className={classes.statusIcon}
        value={health}
        strokeWidth={statusLineWidth}
        background={backGround}
        styles={buildStyles({
          strokeLinecap: "butt",
          trailColor: 'rgba(214, 214, 214, 0.35)',
          pathColor: '#48AC79',
          backgroundColor: 'rgba(36, 35, 34, 0.52)',
        })}
      >
        <FontAwesomeIcon style={{ width: '1.66vmin', height: '1.66vmin', opacity: 0.85}} icon="heart" />
      </CircularProgressbarWithChildren>
      {/* HEALTH STATUS BAR */}

      {/* ARMOR STATUS BAR */}
      <CircularProgressbarWithChildren
        className={classes.statusIcon}
        value={armor}
        background={backGround}
        strokeWidth={statusLineWidth}
        styles={buildStyles({
          strokeLinecap: "butt",
          trailColor: 'rgba(214, 214, 214, 0.35)',
          pathColor: '#B00032',
          backgroundColor: 'rgba(36, 35, 34, 0.52)',
        })}
      >
        <FontAwesomeIcon style={{ width: '1.66vmin', height: '1.66vmin', opacity: 0.85}} icon="shield-alt" />
      </CircularProgressbarWithChildren>
      {/* ARMOR STATUS BAR */}

      {/* FOOD STATUS BAR */}
      <CircularProgressbarWithChildren
        className={classes.statusIcon}
        value={hunger}
        background={backGround}
        strokeWidth={statusLineWidth}
        styles={buildStyles({
          strokeLinecap: "butt",
          trailColor: 'rgba(214, 214, 214, 0.35)',
          pathColor: '#F67307',
          backgroundColor: 'rgba(36, 35, 34, 0.52)',
        })}
      >
        <FontAwesomeIcon style={{ width: '1.66vmin', height: '1.66vmin', opacity: 0.85}} icon="hamburger" />
      </CircularProgressbarWithChildren>
      {/* FOOD STATUS BAR */}

      {/* THIRST STATUS BAR */}
      <CircularProgressbarWithChildren
        className={classes.statusIcon}
        value={thirst}
        background={backGround}
        strokeWidth={statusLineWidth}
        styles={buildStyles({
          strokeLinecap: "butt",
          trailColor: 'rgba(214, 214, 214, 0.35)',
          pathColor: '#2175B1',
          backgroundColor: 'rgba(36, 35, 34, 0.52)',
        })}
      >
        <FontAwesomeIcon style={{ width: '1.66vmin', height: '1.66vmin', opacity: 0.85}} icon="tint" />
      </CircularProgressbarWithChildren>
      {/* THIRST STATUS BAR */}

      {/* DRUNK STATUS BAR */}
      {ChangeIconVisibility(drunk, false) ? (<Animated animationIn="zoomIn" animationOut="zoomOut" animationInDuration={1000} animationOutDuration={1000} isVisible={true}>
        <CircularProgressbarWithChildren
          className={classes.statusIcon}
          value={drunk}
          background={backGround}
          strokeWidth={statusLineWidth}
          styles={buildStyles({
            strokeLinecap: "butt",
            trailColor: 'rgba(214, 214, 214, 0.35)',
            pathColor: '#9400D0',
            backgroundColor: 'rgba(36, 35, 34, 0.52)',
          })}
        >
          <FontAwesomeIcon style={{ width: '1.66vmin', height: '1.66vmin', opacity: 0.85}} icon="wine-bottle" />
        </CircularProgressbarWithChildren>
      </Animated>) : (null)}
      {/* DRUNK STATUS BAR */}

      {/* STAMINA STATUS BAR */}
      {ChangeIconVisibility(stamina, true) ? (<Animated animationIn="zoomIn" animationOut="zoomOut" animationInDuration={1000} animationOutDuration={1000} isVisible={true}>
        <CircularProgressbarWithChildren
          className={classes.statusIcon}
          value={stamina}
          background={backGround}
          strokeWidth={statusLineWidth}
          styles={buildStyles({
            strokeLinecap: "butt",
            trailColor: 'rgba(214, 214, 214, 0.35)',
            pathColor: '#D53600',
            backgroundColor: 'rgba(36, 35, 34, 0.52)',
          })}
        >
          <FontAwesomeIcon style={{ width: '1.66vmin', height: '1.66vmin', opacity: 0.85}} icon="running" />
        </CircularProgressbarWithChildren>
      </Animated>) : (null)}
      {/* STAMINA STATUS BAR */}

      {/* OXYGEN STATUS BAR */}
      {ChangeIconVisibility(oxygen, true) ? (<Animated animationIn="zoomIn" animationOut="zoomOut" animationInDuration={1000} animationOutDuration={1000} isVisible={ChangeIconVisibility(oxygen, true)}>
        <CircularProgressbarWithChildren
          className={classes.statusIcon}
          value={oxygen}
          background={backGround}
          strokeWidth={statusLineWidth}
          styles={buildStyles({
            strokeLinecap: "butt",
            trailColor: 'rgba(214, 214, 214, 0.35)',
            pathColor: '#00B0B0',
            backgroundColor: 'rgba(36, 35, 34, 0.52)',
          })}
        >
          <FontAwesomeIcon style={{ width: '1.66vmin', height: '1.66vmin', opacity: 0.85}} icon="swimmer" />
        </CircularProgressbarWithChildren>
      </Animated>) : (null)}
      {/* OXYGEN STATUS BAR */}
    </div>
  );
};
