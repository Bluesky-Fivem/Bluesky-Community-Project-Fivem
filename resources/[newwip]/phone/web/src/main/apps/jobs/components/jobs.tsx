import React, { useState, useEffect } from 'react';
import '../../../index.css';
import { fetchNui } from '../../../../utils/fetchNui';
import { useNuiEvent } from "../../../../hooks/useNuiEvent";
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { useRecoilState } from 'recoil';
import { activeHoverIdState } from '../../../../atoms/activeAtom';
import useStyles from "./jobs.styles";

const JobsApp: React.FC = () => {
  const classes = useStyles();

  const [hoverId, setHoverId] = useRecoilState(activeHoverIdState) // why in tarnation is this a global state?
  const [jobsData, setJobsData] = useState([])
  const [signedIn, setSignedIn] = useState(false)
  const [inGroup, setInGroup] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [inActivity, setInActivity] = useState(false)
  const [filteredJobs, setFilteredJobs] = useState([])
  const [idleGroupData, setIdleGroupData] = useState([])
  const [busyGroupData, setBusyGroupData] = useState([])
  const [groupMembers, setGroupMembers] = useState([])
  const [groupTasks, setGroupTasks] = useState([])
  const [groupId, setGroupId] = useState(0)
  const [groupLeader, setGroupLeader] = useState("")
  const [mySrc, setMySrc] = useState("")
  const [groupActivity, setGroupActivity] = useState("")

  useEffect(() => {
    fetchNui('getJobsData', {}).then(resData => {
      if (!resData.signedin) {
        setSignedIn(false)
        setIsReady(false)
        setInGroup(false)
        setInActivity(false)
        setJobsData(resData.jobs)
        setFilteredJobs(resData.jobs)
      } else {
        if (!resData.ingroup) {
          setSignedIn(true)
          setIdleGroupData(resData.groups.idle)
          setBusyGroupData(resData.groups.busy)
        } else {
          let group = resData.groupdata
          if (!group.inActivity) {
            setSignedIn(true)
            setInGroup(true)
            setInActivity(false)
            setGroupId(group.id)
            setGroupLeader(group.leader)
            setMySrc(resData.src)
            setGroupMembers(group.members)
            if (group.ready === true) {
              setIsReady(true)
            } else {
              setIsReady(false)
            }
            setGroupTasks([])
            setGroupActivity("")
          } else {
            setSignedIn(true)
            setInGroup(true)
            setInActivity(true)
            setGroupId(group.id)
            setGroupLeader(group.leader)
            setMySrc(resData.src)
            setGroupTasks(group.tasks)
            setGroupActivity(resData.jobname)
          }
        }
      }
    })
  }, []);

  const searchJobs = (searchValue) => {
    if (searchValue !== '') {
      const filteredJobs = jobsData.filter((item) => {
        return (
          item.id.toLowerCase().startsWith(searchValue.toLowerCase()) ||
          item.name.toLowerCase().startsWith(searchValue.toLowerCase())
        )
      })
      setFilteredJobs(filteredJobs)
    } else {
      setFilteredJobs(jobsData)
    }
  }

  const handleJobsGps = (e: any) => {
    fetchNui('setJobsGps', { id: e.currentTarget.id })
  }

  const handleHoverActive = (e: any) => {
    setHoverId(e.currentTarget.id)
  }

  const handleHoverNotActive = () => {
    setHoverId("")
  }

  const handleCheckout = () => {
    fetchNui('checkOut')
  }

  const handleCreateGroup = () => {
    fetchNui('createGroup')
  }

  const handleJoinRequest = (id: number) => {
    fetchNui('joinGroup', { id: id })
  }

  const handleLeaveGroup = (id: number) => {
    fetchNui('leaveGroup', { id: id })
  }

  const handleReady = () => {
    fetchNui('readyGroup', {
      id: groupId
    })
  }

  const handleDisband = () => {
    fetchNui('disbandGroup', {
      id: groupId
    })
  }

  const handleKick = (src) => {
    fetchNui('kickGroup', {
      id: groupId,
      src: src
    })
  }

  useNuiEvent<boolean>('updateGroups', () => {
    fetchNui('getJobsData', {}).then(resData => {
      if (!resData.signedin) {
        setSignedIn(false)
        setInGroup(false)
        setIsReady(false)
        setInActivity(false)
        setJobsData(resData.jobs)
        setFilteredJobs(resData.jobs)
      } else {
        if (!resData.ingroup) {
          setSignedIn(true)
          setInGroup(false)
          setIsReady(false)
          setInActivity(false)
          setIdleGroupData(resData.groups.idle)
          setBusyGroupData(resData.groups.busy)
        } else {
          let group = resData.groupdata
          if (!group.inActivity) {
            setSignedIn(true)
            setInGroup(true)
            setInActivity(false)
            setGroupId(group.id)
            setGroupLeader(group.leader)
            setMySrc(resData.src)
            setGroupMembers(group.members)
            if (group.ready === true) {
              setIsReady(true)
            } else {
              setIsReady(false)
            }
            setGroupTasks([])
            setGroupActivity("")
          } else {
            setSignedIn(true)
            setInGroup(true)
            setInActivity(true)
            setGroupId(group.id)
            setGroupLeader(group.leader)
            setMySrc(resData.src)
            setGroupTasks(group.tasks)
            setGroupActivity(resData.jobname)
          }
        }
      }
    })
  })

  return (
    <>
      <div className={classes.jobsOuterContainer} style={{ zIndex: 500 }}>
        <div className={classes.jobsInnerContainer}>
          <div className="jobs-container">
            <div className={classes.jobsSearch} style={{ height: signedIn ? '20%' : '64px', display: inActivity ? 'none' : '' }}>
              <div className={classes.jobsSearchWrapper} style={{ width: signedIn ? 'auto' : '100%' }}>
                <Typography style={{ display: signedIn && !inGroup ? '' : 'none', color: '#fff', wordBreak: 'break-word' }} variant="body1" gutterBottom>Join an idle group or browse groups currently busy</Typography>
                <Stack direction="row" spacing={4.6} style={{ display: signedIn && !inGroup ? '' : 'none' }}>
                  <Button onClick={handleCreateGroup} size="small" color="success" variant="contained">Create Group</Button>
                  <Button onClick={handleCheckout} size="small" color="warning" variant="contained">Check Out</Button>
                </Stack>
                <Divider variant="middle" sx={{ display: signedIn && !inGroup ? '' : 'none', borderColor: '#aeb0b2', marginTop: '5%', marginLeft: '0%', marginRight: '0%' }} />
                <div className="input-wrapper" style={{ display: signedIn ? 'none' : '' }}>
                  <FormControl fullWidth sx={{ width: '100%' }}>
                    <TextField
                      id="input-with-icon-textfield"
                      label="Search"
                      onChange={(e) => searchJobs(e.target.value)}
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
            <div className={classes.jobsIcon}>
              <div className={classes.jobsIconWrapper}>
              </div>
            </div>
            <div className={classes.jobsJobs} style={{ display: signedIn ? 'none' : '' }}>
              {filteredJobs && filteredJobs.length > 0 ? (
                filteredJobs.map((jobs) => (
                  <div id={jobs.id} className="component-paper cursor-pointer" onMouseEnter={handleHoverActive} onMouseLeave={handleHoverNotActive}>
                    <div className="main-container">
                      <div className="image">
                        <i className={`fas ${jobs.icon} fa-w-16 fa-fw fa-3x`}></i>
                      </div>
                      <div className="details">
                        <div className="title">
                          <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{jobs.name}</Typography>
                        </div>
                        <div className="description">
                          <div className="flex-row">
                            <i className={"fas fa-dollar-sign fa-w-16 fa-fw fa-1x"} style={{ color: '#476a49' }}></i>
                            <div className="flex-row">
                              <i className="fas fa-dollar-sign fa-w-16 fa-fw fa-1x" style={{ color: '#476a49' }}></i>
                              <div className="flex-row">
                                <i className="fas fa-dollar-sign fa-w-16 fa-fw fa-1x" style={{ color: '#476a49' }}></i>
                                <div className="flex-row">
                                  <i className="fas fa-dollar-sign fa-w-16 fa-fw fa-1x" style={{ color: '#476a49' }}></i>
                                  <div className="flex-row">
                                    <i className="fas fa-dollar-sign fa-w-16 fa-fw fa-1x" style={{ color: '#4b6278' }}></i>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={hoverId.toString() === jobs.id.toString() ? "actions actions-show" : "actions"}>
                        <Tooltip title="Set GPS" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                          <div>
                            <i id={jobs.id} onClick={(e) => handleJobsGps(e)} className="fas fa-map-marked fa-w-16 fa-fw fa-lg"></i>
                          </div>
                        </Tooltip>
                      </div>
                      <div className="image">
                        <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{jobs.limit}<i className="fas fa-people-carry fa-w-16 fa-fw fa-sm" style={{ marginLeft: '5px' }}></i></Typography>

                        <div className="image">
                          <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{jobs.groups.length}<i className="fas fa-user fa-w-16 fa-fw fa-sm" style={{ marginLeft: '5px' }}></i></Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex-centered" style={{ padding: '32px', flexDirection: 'column', textAlign: 'center' }}>
                  <i className="fas fa-frown fa-w-16 fa-fw fa-3x" style={{ color: '#fff', marginBottom: '32px' }}></i>
                  <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="h6" gutterBottom>Nothing Here!</Typography>
                </div>
              )}
            </div>


            <div className={classes.jobsGroupsWrapper}>
              <div className={classes.jobsGroupsIdle} style={{ height: 'fit-content', display: signedIn && !inGroup && idleGroupData.length > 0 ? '' : 'none' }}>
                <Typography style={{ color: '#fff', wordBreak: 'break-word', marginTop: '5px' }} variant="body1" gutterBottom>Idle</Typography>
                {idleGroupData && idleGroupData.length > 0 ? (
                  idleGroupData.map((idle) => (
                    <div className="component-paper cursor-pointer">
                      <div className="main-container">
                        <div className="image">
                          <i className={`fas fa-users fa-w-16 fa-fw fa-3x`}></i>
                        </div>
                        <div className="details">
                          <div className="title">
                            <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{idle.name}</Typography>
                          </div>
                          <div className="description">
                            <div className="flex-row">
                              <Tooltip title="Request to Join" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px' }} arrow>
                                <i onClick={() => handleJoinRequest(idle.id)} className="fas fa-sign-in-alt fa-w-16 fa-fw fa-1x"></i>
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                        <div className="details">
                          <div className="title">
                          </div>
                          <div className="description">
                            <div className="flex-row" style={{ fontFamily: 'Roboto, Helvetica, Arial, sans-serif' }}>
                              <ul className="fa-ul">
                                <li style={{ fontSize: '15px' }}><span className="fa-li"><i className="fas fa-people-carry fa-w-16 fa-fw fa-sm"></i></span>{idle.limit}</li>
                              </ul>
                              <ul className="fa-ul">
                                <li style={{ fontSize: '15px' }}><span className="fa-li"><i className="fas fa-user fa-w-16 fa-fw fa-sm"></i></span>{idle.members.length}</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="actions">
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                  </>
                )}
              </div>

              <div className={classes.jobsGroupsBusy} style={{ display: signedIn && !inGroup && busyGroupData.length > 0 ? '' : 'none' }}>
                <Typography style={{ color: '#fff', wordBreak: 'break-word', marginTop: '5px' }} variant="body1" gutterBottom>Busy</Typography>
                {busyGroupData && busyGroupData.length > 0 ? (
                  busyGroupData.map((busy) => (
                    <div className="component-paper cursor-pointer">
                      <div className="main-container">
                        <div className="image">
                          <i className={`fas fa-users-slash fa-w-16 fa-fw fa-3x`}></i>
                        </div>
                        <div className="details">
                          <div className="title">
                            <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{busy.name}</Typography>
                          </div>
                          <div className="description">
                            <div className="flex-row">
                            </div>
                          </div>
                        </div>
                        <div className="details">
                          <div className="title">
                          </div>
                          <div className="description">
                            <div className="flex-row" style={{ fontFamily: 'Roboto, Helvetica, Arial, sans-serif' }}>
                              <ul className="fa-ul">
                                <li style={{ fontSize: '15px' }}><span className="fa-li"><i className="fas fa-people-carry fa-w-16 fa-fw fa-sm"></i></span>{busy.limit}</li>
                              </ul>
                              <ul className="fa-ul">
                                <li style={{ fontSize: '15px' }}><span className="fa-li"><i className="fas fa-user fa-w-16 fa-fw fa-sm"></i></span>{busy.members.length}</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="actions">
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                  </>
                )}
              </div>
            </div>

            <div className={classes.jobsInGroupWrapper} style={{ display: signedIn && inGroup && !inActivity ? '' : 'none', top: isReady ? '3vh' : '2vh' }}>
              <div className={classes.waitingForActivity} style={{ display: signedIn && inGroup && isReady && !inActivity ? '' : 'none' }}>
                <div className="component-ripple-effect">
                  <div className="lds-ripple" style={{ marginLeft: '20%' }}><div></div><div></div></div>
                  <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body1" gutterBottom>Waiting for Job...</Typography>
                </div>
              </div>
              <div className={classes.jobsInGroupLeader} style={{ height: 'fit-content', display: signedIn && inGroup && !inActivity ? '' : 'none' }}>
                <Typography style={{ color: '#fff', wordBreak: 'break-word', marginTop: '5px' }} variant="body1" gutterBottom>Members</Typography>

                {groupMembers && groupMembers.length > 0 ? (
                  groupMembers.map((member) => (
                    <div id={member.src} className="component-paper cursor-pointer" onMouseEnter={handleHoverActive} onMouseLeave={handleHoverNotActive}>
                      <div className="main-container">
                        <div className="image">
                          <i className={`fas ${Number(member.src) === Number(groupLeader) ? 'fa-user-graduate' : 'fa-user'} fa-w-16 fa-fw fa-3x`}></i>
                        </div>
                        <div className="details">
                          <div className="title">
                            <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{member.name}</Typography>
                          </div>
                          <div className="description">
                            <div className="flex-row">
                              <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{Number(member.src) === Number(groupLeader) ? 'Leader' : 'Member'}</Typography>
                            </div>
                          </div>
                        </div>
                        <div className={hoverId.toString() === member.src.toString() && Number(groupLeader) === Number(mySrc) && Number(groupLeader) !== Number(member.src) ? "actions actions-show" : "actions"}>
                          <Tooltip title="Kick Member" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                            <div>
                              <i onClick={() => handleKick(member.src)} className="fas fa-user-times fa-w-16 fa-fw fa-lg"></i>
                            </div>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                  </>
                )}


              </div>

            </div>

            <div className={classes.jobsInGroupButtons} style={{ display: inGroup && !inActivity ? '' : 'none' }}>
              <Stack direction="column" spacing={2} style={{ display: Number(groupLeader) === Number(mySrc) ? '' : 'none', whiteSpace: 'nowrap' }}>
                <Button onClick={handleReady} size="small" color="success" variant="contained">{isReady ? 'Unready for Jobs' : 'Ready for Jobs'}</Button>
                <Button onClick={handleDisband} size="small" color="success" variant="contained">Disband Group</Button>
              </Stack>
              <Stack direction="column" spacing={2} style={{ display: Number(groupLeader) !== Number(mySrc) ? '' : 'none', marginTop: '42%' }}>
                <Button onClick={() => handleLeaveGroup(groupId)} size="small" color="success" variant="contained">Leave Group</Button>
              </Stack>
            </div>


            <div className="activity-container" style={{ display: signedIn && inGroup && inActivity ? '' : 'none' }}>
              <div className="activity-title" style={{ width: '95%', marginLeft: '2.5%' }}>
                <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{groupActivity}</Typography>
                <div className="timer">
                  <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>00:00:00</Typography>
                </div>
              </div>

              <div className="task-list">
                <div className="activity-task-paper-wrapper" style={{ marginLeft: '2.5%' }}>
                  {groupTasks && groupTasks.length > 0 ? (
                    groupTasks.map((task) => (
                      <div className="activity-task-wrapper">
                        <Timeline>
                          <TimelineItem>
                            <TimelineSeparator>
                              <TimelineConnector sx={{ backgroundColor: task.completed ? 'rgb(66, 76, 171)' : 'rgb(189, 189, 189)' }} />
                              <TimelineDot />
                            </TimelineSeparator>
                            <TimelineContent>
                              <div className="component-paper cursor-pointer" style={{ width: '94.6%' }}>
                                <div className="main-container">
                                  <div className="details">
                                    <div className="description">
                                      <div className="flex-row">
                                        <Typography style={{ color: '#fff', wordBreak: 'break-word', textDecoration: task.completed ? 'line-through' : 'none' }} variant="body2" gutterBottom>{task.task}</Typography>
                                      </div>
                                    </div>
                                    <div className="description">
                                      <div className="flex-row" style={{ justifyContent: 'flex-end' }}>
                                        <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body1" gutterBottom>{task.completed ? '1/1' : '0/1'}</Typography>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="actions">
                                  </div>
                                </div>
                              </div>
                            </TimelineContent>
                          </TimelineItem>
                        </Timeline>
                      </div>
                    ))
                  ) : (
                    <>
                    </>
                  )}



                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default JobsApp;