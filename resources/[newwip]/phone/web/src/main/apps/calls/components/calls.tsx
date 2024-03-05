import React, { useState, useEffect } from 'react';
import '../../../index.css';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useRecoilState } from 'recoil';
import { activeHoverIdState, callsDataState, filteredCallsDataState } from '../../../../atoms/activeAtom';
import { Checkmark } from 'react-checkmark';
import CallIcon from '@mui/icons-material/Call';
import Button from '@mui/material/Button';
import { fetchNui } from '../../../../utils/fetchNui';
import { useNuiEvent } from "../../../../hooks/useNuiEvent";
import moment from 'moment';
import PersonIcon from '@mui/icons-material/Person';
import useStyles from "./calls.styles";
import AppContainer from '../../../components/app-container';

const CallsApp: React.FC = () => {
  const classes = useStyles();

  const [hoverId, setHoverId] = useRecoilState(activeHoverIdState) // why in tarnation is this a global state?
  const [callsData, setCallsData] = useRecoilState(callsDataState); // has to be global cuz cache log
  const [filteredCalls, setFilteredCalls] = useRecoilState(filteredCallsDataState); // has to be global cuz cache log
  const [isLoading, setLoading] = useState(false)
  const [checkmark, setCheckmark] = useState(false)
  const [preparing, setPreparing] = useState(false)
  const [callNumberModal, setCallNumberModal] = useState(false)
  const [contactModal, setContactModal] = useState(false)
  const [callNumber, setCallNumber] = useState("")
  const [messageModal, setMessageModal] = useState(false)
  const [messageNumber, setMessageNumber] = useState("")
  const [messageMessage, setMessageMessage] = useState("")
  const [contactName, setContactName] = useState("")
  const [contactNumber, setContactNumber] = useState("")

  /*   useEffect(() => {
      fetchNui('getCallsData', {}).then(resData => {
        //setCallsData(resData.calls)
        //setFilteredCalls(resData.calls)
      })
    }, []); */

  const handleHoverActive = (e: any) => {
    setHoverId(e.currentTarget.id)
  }

  const handleHoverNotActive = () => {
    setHoverId("")
  }

  const openCallNumberModal = (e: any) => {
    setCallNumberModal(true)
  }

  const closeCallNumberModal = () => {
    setCallNumberModal(false)
  }

  const updateCallNumber = (e: any) => {
    setCallNumber(e.target.value)
  }

  const updateCallsMessageNumber = (e: any) => {
    setMessageNumber(e.target.value)
  }
  const updateCallsMessageNumber2 = (e: any) => {
    setMessageNumber(e)
  }

  const updateCallsMessageMessage = (e: any) => {
    setMessageMessage(e.target.value)
  }

  const handleCallNumber = () => {
    fetchNui('pnp-ui:callStart', { number: callNumber }).then(resData => {
      setCallNumberModal(false)
      //setCallsData(resData)
      //setFilteredCalls(resData)
    })
  }

  const handleLogCallNumber = (name, number) => {
    fetchNui('pnp-ui:callStart', { number: number }).then(resData => {
      //setCallsData(resData)
      //setFilteredCalls(resData)

      //this needs to be used on callStart also (in chat window or anywhere else.)
      //add to call log (client-side)
      let randId = genNumbers(4)
      let contactName = formatPhoneNumber(name)
      let unix = moment().unix()

      let arr = callsData

      let array = {
        id: randId,
        number: number,
        name: contactName,
        date: unix,
        state: "out"
      }

      let newArr = [...(arr || []), array]

      setCallsData(newArr)
      setFilteredCalls(newArr)
    })
  }

  const openMessageCallsModal = (e: any) => {
    setMessageModal(true)
    updateCallsMessageNumber2(e.currentTarget.id)
  }

  const updateContactName = (e: any) => {
    setContactName(e.target.value)
  }

  const updateContactNumber = (e: any) => {
    setContactNumber(e.target.value)
  }

  const closeAddContactModal = () => {
    setContactModal(false)
  }

  const openAddContactModal = (e: any) => {
    setContactModal(true)
    setContactNumber(e.currentTarget.id)
  }

  const closeMessageCallsModal = () => {
    setMessageModal(false)
  }

  const handleSendMessage = () => {
    setLoading(true)
    setPreparing(true)
    fetchNui('sendMessage', { number: messageNumber, message: messageMessage }).then(resData => {
      setMessageNumber("")
      setMessageMessage("")
      setLoading(false)
      setCheckmark(true)
      setTimeout(() => {
        setCheckmark(false)
        setMessageModal(false)
        setPreparing(false)
      }, 1000)
    })
  }

  const handleAddContact = () => {
    setLoading(true)
    setPreparing(true)
    fetchNui('addPhoneContact', { number: contactNumber, name: contactName }).then(resData => {
      setContactNumber("")
      setContactName("")
      setLoading(false)
      setCheckmark(true)
      setTimeout(() => {
        setCheckmark(false)
        setContactModal(false)
        setPreparing(false)
      }, 1000)
    })
  }

  const formatPhoneNumber = (phoneNumberString) => {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumberString;
  }

  const genNumbers = (length) => {
    let result = '';
    let characters = '0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  useNuiEvent<boolean>('closeApps', () => {
    setCallNumberModal(false)
    setMessageModal(false)
    setContactModal(false)
    setLoading(false)
    setCheckmark(false)
    setPreparing(false)
    setCallNumber("")
    setMessageNumber("")
    setMessageMessage("")
    setContactName("")
    setContactNumber("")
  })

  return (
    <>
      <div className={classes.callsCallModalContainer} style={{ display: callNumberModal ? '' : 'none' }}>
        <div className={classes.callsCallModalInnerContainer}>
          <div className="spinner-wrapper" style={{ display: isLoading ? '' : 'none' }}>
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
          <div className="spinner-wrapper" style={{ display: checkmark ? '' : 'none' }}>
            <Checkmark size="56px" color='#009688' />
          </div>


          <div className="component-simple-form" style={{ display: preparing ? 'none' : '' }}>
            <div>
              <div className="input-wrapper">
                <FormControl fullWidth sx={{ width: '100%' }}>

                  <TextField
                    id="input-with-icon-textfield"
                    label="Number"
                    variant="standard"
                    onChange={updateCallNumber}
                    value={callNumber}
                    inputProps={{ maxLength: 10 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CallIcon />
                        </InputAdornment>
                      ),
                    }}
                  />

                </FormControl>
              </div>
            </div>
            <div className="buttons">
              <div>
                <Button onClick={closeCallNumberModal} size="small" color="warning" variant="contained">Cancel</Button>
              </div>
              <div>
                <Button onClick={handleCallNumber} size="small" color="success" variant="contained">Submit</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.callsMessageModalContainer} style={{ display: messageModal ? '' : 'none' }}>
        <div className={classes.callsMessageModalInnerContainer}>
          <div className="spinner-wrapper" style={{ display: isLoading ? '' : 'none' }}>
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
          <div className="spinner-wrapper" style={{ display: checkmark ? '' : 'none' }}>
            <Checkmark size="56px" color='#009688' />
          </div>
          <div className="component-simple-form" style={{ display: preparing ? 'none' : '' }}>
            <div>
              <div className="input-wrapper">
                <FormControl fullWidth sx={{ width: '100%' }}>
                  <TextField
                    id="input-with-icon-textfield"
                    label="Number"
                    variant="standard"
                    onChange={updateCallsMessageNumber}
                    value={messageNumber}
                    inputProps={{ maxLength: 10 }}
                  />
                </FormControl>
              </div>
            </div>
            <div>
              <FormControl fullWidth sx={{ width: '100%' }}>
                <TextField
                  multiline
                  maxRows={10}
                  id="input-with-icon-textfield"
                  label="Message"
                  variant="standard"
                  onChange={updateCallsMessageMessage}
                  defaultValue={messageMessage}
                  value={messageMessage}
                />
              </FormControl>
            </div>
            <div className="buttons">
              <div>
                <Button onClick={closeMessageCallsModal} size="small" color="warning" variant="contained">Cancel</Button>
              </div>
              <div>
                <Button onClick={handleSendMessage} size="small" color="success" variant="contained">Submit</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.callsAddContactModalContainer} style={{ display: contactModal ? '' : 'none' }}>
        <div className={classes.callsAddContactModalInnerContainer}>
          <div className="spinner-wrapper" style={{ display: isLoading ? '' : 'none' }}>
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
          <div className="spinner-wrapper" style={{ display: checkmark ? '' : 'none' }}>
            <Checkmark size="56px" color='#009688' />
          </div>
          <div className="component-simple-form" style={{ display: preparing ? 'none' : '' }}>
            <div>
              <FormControl fullWidth sx={{ width: '100%' }}>
                <TextField
                  id="input-with-icon-textfield"
                  label="Name"
                  variant="standard"
                  onChange={updateContactName}
                  value={contactName}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </div>
            <div>
              <div className="input-wrapper">
                <FormControl fullWidth sx={{ width: '100%' }}>
                  <TextField
                    id="input-with-icon-textfield"
                    label="Number"
                    variant="standard"
                    onChange={updateContactNumber}
                    value={contactNumber}
                    inputProps={{ maxLength: 10 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CallIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </div>
            </div>
            <div className="validation-messages">

            </div>
            <div className="buttons">
              <div>
                <Button onClick={closeAddContactModal} size="small" color="warning" variant="contained">Cancel</Button>
              </div>
              <div>
                <Button onClick={handleAddContact} size="small" color="success" variant="contained">Submit</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AppContainer
        emptyMessage={filteredCalls.length === 0}
        primaryActions={[
          {
            type: "icon",
            title: "Call Number",
            placement: "left",
            icon: "fas fa-phone fa-w-16",
            action: openCallNumberModal,
            show: true,
          }
        ]}
        search={{
          filter: ['name', 'number'],
          list: callsData,
          onChange: setFilteredCalls,
        }}
      >
        {filteredCalls && filteredCalls.length > 0 ? (
          filteredCalls.slice(0).reverse().map((calls) => (
            <div key={calls.id} id={calls.id} className="component-paper cursor-pointer" onMouseEnter={handleHoverActive} onMouseLeave={handleHoverNotActive}>
              <div className="main-container">
                <div className="image">
                  <i className={`fas ${calls.state === "in" ? 'fa-phone' : 'fa-phone-alt'} fa-w-16 fa-fw fa-3x`}></i>
                </div>
                <div className="details">
                  <div className="title">
                    <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{formatPhoneNumber(calls.name)}</Typography>
                  </div>
                  <div className="description">
                    <div className="flex-row">
                      <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{moment(Number(calls.date) * 1000).fromNow()}</Typography>
                    </div>
                  </div>
                </div>
                <div className={hoverId.toString() === calls.id.toString() ? "actions actions-show" : "actions"}>
                  <Tooltip title="Call" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                    <div>
                      <i onClick={() => handleLogCallNumber(calls.name, calls.number)} className="fas fa-phone fa-w-16 fa-fw fa-lg"></i>
                    </div>
                  </Tooltip>
                  <Tooltip title="Message" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                    <div>
                      <i onClick={openMessageCallsModal} id={calls.number} className="fas fa-comment fa-w-16 fa-fw fa-lg"></i>
                    </div>
                  </Tooltip>
                  <Tooltip title="Add Contact" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                    <div>
                      <i onClick={openAddContactModal} id={calls.number} className="fas fa-user-plus fa-w-16 fa-fw fa-lg"></i>
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
      </AppContainer>
    </>
  );
}

export default CallsApp;