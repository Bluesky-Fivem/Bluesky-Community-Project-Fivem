import React, { useState, useEffect } from 'react';
import '../../../index.css';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { Button, Checkbox, FormControlLabel, Tab, Tabs, Tooltip } from '@mui/material';
import { fetchNui } from '../../../../utils/fetchNui';
import { useNuiEvent } from "../../../../hooks/useNuiEvent";
import { useRecoilState } from 'recoil';
import { activeHoverIdState } from '../../../../atoms/activeAtom';
import { Checkmark } from 'react-checkmark';
import useStyles from "./racing.styles";
import Dropdown from './dropdown';
import Pending from './pending';

const RacingApp: React.FC = () => {
  const classes = useStyles();

  const [hoverId, setHoverId] = useRecoilState(activeHoverIdState) // why in tarnation is this a global state?
  const [racingTab, setRacingTab] = React.useState(0);
  const [racesData, setRacesData] = useState([])
  const [pendingRaces, setPendingRaces] = useState([])
  const [activeRaces, setActiveRaces] = useState([])
  const [finishedRaces, setFinishedRaces] = useState([])
  const [tracksData, setTracksData] = useState([])
  const [filteredTracksData, setFilteredTracksData] = useState([])
  const [myCid, setMyCid] = useState(0)
  const [isLoading, setLoading] = useState(false)
  const [checkmark, setCheckmark] = useState(false)
  const [preparing, setPreparing] = useState(false)
  const [createRaceModal, setCreateRaceModal] = useState(false)
  const [raceEventName, setRaceEventName] = useState("")
  const [raceLapCount, setRaceLapCount] = useState("")
  const [raceCountdown, setRaceCountdown] = useState("")
  const [selectedRaceTrack, setSelectedRaceTrack] = useState("")
  const [raceBuyIn, setRaceBuyIn] = useState("")
  const [raceDNFPosition, setRaceDNFPosition] = useState("")
  const [raceDNFCountdown, setRaceDNFCountdown] = useState("")
  const [raceShowPosition, setRaceShowPosition] = useState(false)
  const [raceSendNotification, setRaceSendNotification] = useState(false)
  const [raceBubbleRemover, setRaceBubbleRemover] = useState(false)

  useEffect(() => {
    fetchNui('getRacingData', {}).then(resData => {
      if (resData.races.pendingRaces !== undefined) {
        setPendingRaces(resData.races.pendingRaces)
      }
      if (resData.races.activeRaces !== undefined) {
        setActiveRaces(resData.races.activeRaces)
      }
      if (resData.races.finishedRaces !== undefined) {
        setFinishedRaces(resData.races.finishedRaces)
      }

      setTracksData(resData.tracks)
      setFilteredTracksData(resData.tracks)
      setMyCid(resData.cid)
    })
  }, []);

  const handleHoverActive = (e: any) => {
    setHoverId(e.currentTarget.id)
  }

  const handleHoverNotActive = () => {
    setHoverId("")
  }

  const updateRaceEventName = (e: any) => {
    setRaceEventName(e.target.value)
  }

  const updateRaceLapCount = (e: any) => {
    setRaceLapCount(e.target.value)
  }

  const updateRaceCountdown = (e: any) => {
    setRaceCountdown(e.target.value)
  }

  const updateRaceBuyIn = (e: any) => {
    setRaceBuyIn(e.target.value)
  }

  const updateRaceDNFPosition = (e: any) => {
    setRaceDNFPosition(e.target.value)
  }

  const updateRaceDNFCountdown = (e: any) => {
    setRaceDNFCountdown(e.target.value)
  }

  const updateRaceShowPosition = (e: any) => {
    setRaceShowPosition(e.target.checked)
  }

  const updateRaceSendNotification = (e: any) => {
    setRaceSendNotification(e.target.checked)
  }

  const updateRaceBubbleRemover = (e: any) => {
    setRaceBubbleRemover(e.target.checked)
  }

  const handleRaceCreate = () => {
    if (raceEventName === undefined || raceEventName === "") {
      return
    }
    if (raceLapCount === undefined || raceLapCount === "") {
      return
    }
    if (raceCountdown === undefined || raceCountdown === "") {
      return
    }
    if (raceBuyIn === undefined || raceBuyIn === "") {
      return
    }
    if (raceDNFPosition === undefined || raceDNFPosition === "") {
      return
    }
    if (raceDNFCountdown === undefined || raceDNFCountdown === "") {
      return
    }

    setLoading(true)
    setPreparing(true)
    //raceName: raceEventName, raceLaps: raceLapCount, raceBuyIn: raceBuyIn,  raceCountdown: raceCountdown, raceDNFPosition: raceDNFPosition, raceDNFCountdown: raceDNFCountdown, raceShowPosition: 
    let options = {
      eventName: raceEventName,
      laps: raceLapCount,
      buyIn: raceBuyIn,
      countdown: raceCountdown,
      dnfPosition: raceDNFPosition,
      dnfCountdown: raceDNFCountdown,
      showPosition: raceShowPosition,
      sendNotification: raceSendNotification,
      bubbleRemover: raceBubbleRemover
    }

    fetchNui('createRace', { id: selectedRaceTrack, options: options }).then(resData => {
      setRaceEventName("")
      setRaceLapCount("")
      setRaceCountdown("")
      setRaceBuyIn("")
      setRaceDNFPosition("")
      setRaceDNFCountdown("")
      setRaceShowPosition(false)
      setRaceSendNotification(false)
      setRaceBubbleRemover(false)
      setLoading(false)
      setCheckmark(true)
      setTimeout(() => {
        setCheckmark(false)
        setCreateRaceModal(false)
        setPreparing(false)
      }, 1000)
    })
  }

  const handleRacingTab = (event, newValue) => {
    setRacingTab(newValue);
  };

  const searchTracks = (searchValue) => {
    if (searchValue !== '') {
      const filteredTracks = tracksData.filter((item) => {
        return (
          item.name.toLowerCase().startsWith(searchValue.toLowerCase())
        )
      })
      setFilteredTracksData(filteredTracks)
    } else {
      setFilteredTracksData(tracksData)
    }
  }

  const handleSetTrackGPS = (e: any) => {
    fetchNui('setTrackGps', { id: e.currentTarget.id })
  }

  const openCreateRaceModal = (e: any) => {
    setCreateRaceModal(true)
    setSelectedRaceTrack(e.currentTarget.id)
  }

  const closeCreateRaceModal = () => {
    setCreateRaceModal(false)
  }

  useNuiEvent<any>('updateRacing', (data: any) => {
    if (data.pending !== undefined) {
      setPendingRaces(data.pending)
    }
    if (data.active !== undefined) {
      setActiveRaces(data.active)
    }
    if (data.completed !== undefined) {
      setFinishedRaces(data.completed)
    }
  })

  useNuiEvent<boolean>('closeApps', () => {
    setCreateRaceModal(false)
    setLoading(false)
    setCheckmark(false)
    setPreparing(false)
    setRaceEventName("")
    setRaceLapCount("")
    setRaceCountdown("")
  })

  return (
    <>
      <div className={classes.racingCreateRaceModalContainer} style={{ display: createRaceModal ? '' : 'none' }}>
        <div className={classes.racingCreateRaceModalInnerContainer}>
          <div className="spinner-wrapper" style={{ display: isLoading ? '' : 'none' }}>
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
          <div className="spinner-wrapper" style={{ display: checkmark ? '' : 'none' }}>
            <Checkmark size="56px" color='#009688' />
          </div>
          <div className="component-simple-form" style={{ display: isLoading || preparing ? 'none' : '' }}>
            <div>
              <div className="input-wrapper">
                <FormControl fullWidth sx={{ width: '100%' }}>
                  <TextField
                    id="input-with-icon-textfield"
                    label="Event Name"
                    variant="standard"
                    onChange={updateRaceEventName}
                    value={raceEventName}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <i className="fas fa-user"></i>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </div>
            </div>
            <div>
              <div className="input-wrapper">
                <FormControl fullWidth sx={{ width: '100%' }}>
                  <TextField
                    id="input-with-icon-textfield"
                    label="Laps"
                    variant="standard"
                    onChange={updateRaceLapCount}
                    value={raceLapCount}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <i className="fas fa-flag-checkered"></i>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </div>
            </div>
            <div>
              <div className="input-wrapper">
                <FormControl fullWidth sx={{ width: '100%' }}>
                  <TextField
                    id="input-with-icon-textfield"
                    label="Amount"
                    variant="standard"
                    onChange={updateRaceBuyIn}
                    value={raceBuyIn}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <i className="fas fa-dollar-sign"></i>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </div>
            </div>
            <div>
              <div className="input-wrapper">
                <FormControl fullWidth sx={{ width: '100%' }}>
                  <TextField
                    id="input-with-icon-textfield"
                    label="Countdown to Start"
                    variant="standard"
                    onChange={updateRaceCountdown}
                    value={raceCountdown}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <i className="fas fa-stopwatch-20"></i>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </div>
            </div>
            <div>
              <div className="input-wrapper">
                <FormControl fullWidth sx={{ width: '100%' }}>
                  <TextField
                    id="input-with-icon-textfield"
                    label="DNF Position"
                    variant="standard"
                    onChange={updateRaceDNFPosition}
                    value={raceDNFPosition}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <i className="fas fa-sad-cry"></i>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </div>
            </div>
            <div>
              <div className="input-wrapper">
                <FormControl fullWidth sx={{ width: '100%' }}>
                  <TextField
                    id="input-with-icon-textfield"
                    label="DNF Countdown"
                    variant="standard"
                    onChange={updateRaceDNFCountdown}
                    value={raceDNFCountdown}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <i className="fas fa-stopwatch-20"></i>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </div>
            </div>
            <div>
              <div className="input-wrapper">
                <FormControl fullWidth sx={{ width: '100%' }}>
                  <FormControlLabel style={{ color: '#fff' }} control={<Checkbox color="warning" checked={raceShowPosition} onChange={updateRaceShowPosition} />} label="Show Position" />
                  <FormControlLabel style={{ color: '#fff' }} control={<Checkbox color="warning" checked={raceSendNotification} onChange={updateRaceSendNotification} />} label="Send Notification" />
                  <FormControlLabel style={{ color: '#fff' }} control={<Checkbox color="warning" checked={raceBubbleRemover} onChange={updateRaceBubbleRemover} />} label="Bubble Remover V2" />
                </FormControl>
              </div>
            </div>
            <div className="buttons">
              <div>
                <Button onClick={closeCreateRaceModal} size="small" color="warning" variant="contained">Cancel</Button>
              </div>
              <div>
                <Button onClick={handleRaceCreate} size="small" color="success" variant="contained">Submit</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.racingOuterContainer} style={{ zIndex: 500 }}>
        <div className={classes.racingInnerContainer}>
          <div className="racing-container">
            <div className={classes.racingSearch}>
              <div className={classes.racingSearchWrapper}>
                <Tabs centered style={{ width: '100%' }} value={racingTab} onChange={handleRacingTab} aria-label="icon tabs example">
                  <Tab style={{ minWidth: "25%" }} icon={<i className="fas fa-flag-checkered fa-lg"></i>} aria-label="races" />
                  <Tab style={{ minWidth: "25%" }} icon={<i className="fas fa-map-marker fa-lg"></i>} aria-label="maps" />
                  <Tab style={{ minWidth: "25%" }} icon={<i className="fas fa-trophy fa-lg"></i>} aria-label="leaderboard" />
                  <Tab style={{ minWidth: "25%" }} icon={<i className="fas fa-medal fa-lg"></i>} aria-label="highscores" />
                </Tabs>
                <div className="input-wrapper" style={{ display: racingTab === 1 ? 'flex' : 'none', justifyContent: 'center', marginTop: '5%' }}>
                  <FormControl sx={{ width: '86%' }}>
                    <TextField
                      id="input-with-icon-textfield"
                      label="Search"
                      onChange={(e) => searchTracks(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                      variant="standard"
                    />
                  </FormControl>
                </div>
              </div>
            </div>
            <div className={classes.racingIcon}>
              <div className={classes.racingIconWrapper}>
              </div>
            </div>

            <div className={classes.racingWrapper} style={{ display: racingTab === 0 ? '' : 'none' }}>
              <div className={classes.racingPending} style={{ display: pendingRaces && pendingRaces.length > 0 ? '' : 'none' }}>
                <Typography style={{ display: pendingRaces && pendingRaces.length > 0 ? '' : 'none', color: '#fff', wordBreak: 'break-word', marginTop: '5px' }} variant="body1" gutterBottom>Pending</Typography>
                {pendingRaces && pendingRaces.length > 0 ? (
                  pendingRaces.map((race, index) => (
                    <Pending id={race.id} name={race.eventName} lapText={`Laps (${race.laps}) / Open`} distText={`${Math.ceil(0.00062137 * race.mapDistance)}mi`} cid={myCid} players={race["players"]} data={race} />
                  ))
                ) : (
                  <></>
                )}
              </div>
              <div className={classes.racingActive} style={{ display: activeRaces && activeRaces.length > 0 ? '' : 'none' }}>
                <Typography style={{ display: activeRaces && activeRaces.length > 0 ? '' : 'none', color: '#fff', wordBreak: 'break-word', marginTop: '5px' }} variant="body1" gutterBottom>Active</Typography>
                {activeRaces && activeRaces.length > 0 ? (
                  activeRaces.map((race, index) => (
                    <Dropdown id={race.id} name={race.eventName} lapText={`Laps (${race.laps}) / Closed`} distText={`${Math.ceil(0.00062137 * race.mapDistance)}mi`} cid={myCid} players={race["players"]} data={race} type="active" />
                  ))
                ) : (
                  <></>
                )}
              </div>
              <div className={classes.racingCompleted} style={{ display: finishedRaces && finishedRaces.length > 0 ? '' : 'none' }}>
                <Typography style={{ display: finishedRaces && finishedRaces.length > 0 ? '' : 'none', color: '#fff', wordBreak: 'break-word', marginTop: '5px' }} variant="body1" gutterBottom>Completed</Typography>
                {finishedRaces && finishedRaces.length > 0 ? (
                  finishedRaces.map((race, index) => (
                    <Dropdown id={race.id} name={race.eventName} lapText={`Laps (${race.laps}) / Closed`} distText={`${Math.ceil(0.00062137 * race.mapDistance)}mi`} cid={myCid} players={race["players"]} data={race} type="completed" />
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className={classes.racingTracks} style={{ display: racingTab === 1 ? '' : 'none', marginTop: '25%', height: '72%', maxHeight: '72%' }}>
              {filteredTracksData && filteredTracksData.length > 0 ? (
                filteredTracksData.map((track, index) => (
                  <div key={track.id} id={track.id} className="component-paper cursor-pointer" style={{ paddingBottom: '1.2%' }} onMouseEnter={handleHoverActive} onMouseLeave={handleHoverNotActive}>
                    <div className="main-container">
                      <div className="details">
                        <div className="title">
                          <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{track.name}</Typography>
                        </div>
                        <div className="description">
                          <div className="flex-row">
                            <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{track.type}</Typography>
                          </div>
                        </div>
                      </div>
                      <div className={hoverId.toString() === track.id.toString() ? "actions actions-show" : "actions"}>
                        <Tooltip title="Set GPS" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                          <div>
                            <i id={track.id} onClick={handleSetTrackGPS} className="fas fa-map-marker fa-w-16 fa-fw fa-lg"></i>
                          </div>
                        </Tooltip>
                        <Tooltip title="Create Race" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                          <div>
                            <i id={track.id} onClick={openCreateRaceModal} className="fas fa-flag-checkered fa-w-16 fa-fw fa-lg"></i>
                          </div>
                        </Tooltip>
                      </div>
                      <div className="image">
                        <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{Math.ceil(0.00062137 * track.distance)}1mi</Typography>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RacingApp;