import React, { useState, useEffect } from 'react';
import '../../../index.css';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useRecoilState } from 'recoil';
import { activeHoverIdState, callsDataState, filteredCallsDataState } from '../../../../atoms/activeAtom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Checkmark } from 'react-checkmark';
import PersonIcon from '@mui/icons-material/Person';
import CallIcon from '@mui/icons-material/Call';
import Button from '@mui/material/Button';
import { fetchNui } from '../../../../utils/fetchNui';
import { useNuiEvent } from "../../../../hooks/useNuiEvent";
import useStyles from "./contacts.styles";
import AppContainer from '../../../components/app-container';
import moment from 'moment';

const ContactsApp: React.FC = () => {
  const classes = useStyles();

  const [hoverId, setHoverId] = useRecoilState(activeHoverIdState) // why in tarnation is this a global state?
  const [contactsData, setContactsData] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [callsData, setCallsData] = useRecoilState(callsDataState);
  const [filteredCalls, setFilteredCalls] = useRecoilState(filteredCallsDataState);
  const [contactModal, setContactModal] = useState(false)
  const [messageModal, setMessageModal] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [checkmark, setCheckmark] = useState(false)
  const [preparing, setPreparing] = useState(false)
  const [contactNumber, setContactNumber] = useState("")
  const [contactName, setContactName] = useState("")
  const [messageNumber, setMessageNumber] = useState("")
  const [messageMessage, setMessageMessage] = useState("")

  useEffect(() => {
    fetchNui('getContactsData', {}).then(resData => {
      setContactsData(resData)
      setFilteredContacts(resData)
    })
  }, []);

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

  const handleHoverActive = (e: any) => {
    setHoverId(e.currentTarget.id)
  }

  const handleHoverNotActive = () => {
    setHoverId("")
  }

  const updateContactName = (e: any) => {
    setContactName(e.target.value)
  }

  const updateContactNumber = (e: any) => {
    setContactNumber(e.target.value)
  }

  const updateContactMessageNumber = (e: any) => {
    setMessageNumber(e.target.value)
  }
  const updateContactMessageNumber2 = (e: any) => {
    setMessageNumber(e)
  }

  const updateContactMessageMessage = (e: any) => {
    setMessageMessage(e.target.value)
  }

  const openAddContactModal = (e: any) => {
    setContactModal(true)
    setMessageNumber(e.currentTarget.id)
  }

  const closeAddContactModal = () => {
    setContactModal(false)
  }

  const openMessageContactModal = (e: any) => {
    setMessageModal(true)
    updateContactMessageNumber2(e.currentTarget.id)
  }

  const closeMessageContactModal = () => {
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
      if (resData.meta.ok) {
        let array = {
          id: genNumbers(10),
          name: contactName,
          number: contactNumber
        }
        let newArray = [...(filteredContacts || []), array]
        setContactNumber("")
        setContactName("")
        setFilteredContacts(newArray)
      }
    })
    setContactNumber("")
    setContactName("")
    setTimeout(() => {
      setLoading(false)
      setCheckmark(true)
      setTimeout(() => {
        setCheckmark(false)
        setContactModal(false)
        setPreparing(false)
      }, 1500)
    }, 500)
  }

  const handleContactRemove = (e: any) => {
    const number = e.currentTarget.id
    fetchNui('removePhoneContact', { id: e.currentTarget.id }).then(resData => {
      if (resData.meta.ok) {
        let arr = filteredContacts
        let newArr = arr.filter(item => item.number.toString() !== number)
        setFilteredContacts(newArr)
      }
    })
  }

  const handleCallContact = (name, number) => {
    fetchNui('pnp-ui:callStart', {
      number: number
    })

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
  }

  useNuiEvent<boolean>('closeApps', () => {
    setContactModal(false)
    setMessageModal(false)
    setLoading(false)
    setCheckmark(false)
    setPreparing(false)
    setContactModal(false)
    setMessageModal(false)
    setContactNumber("")
    setContactName("")
    setMessageNumber("")
    setMessageMessage("")
  })

  return (
    <>
      <div className={classes.contactModalContainer} style={{ display: contactModal ? '' : 'none' }}>
        <div className={classes.contactModalInnerContainer}>
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
      <div className={classes.contactMessageModalContainer} style={{ display: messageModal ? '' : 'none' }}>
        <div className={classes.contactMessageModalInnerContainer}>
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
                    onChange={updateContactMessageNumber}
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
                  onChange={updateContactMessageMessage}
                  defaultValue={messageMessage}
                  value={messageMessage}
                />
              </FormControl>
            </div>
            <div className="buttons">
              <div>
                <Button onClick={closeMessageContactModal} size="small" color="warning" variant="contained">Cancel</Button>
              </div>
              <div>
                <Button onClick={handleSendMessage} size="small" color="success" variant="contained">Submit</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AppContainer
        emptyMessage={filteredContacts.length === 0}
        primaryActions={[
          {
            type: "icon",
            title: "Add Contact",
            placement: "left",
            icon: "fas fa-user-plus fa-w-16",
            action: openAddContactModal,
            show: true,
          }
        ]}
        search={{
          filter: ['name', 'number'],
          list: contactsData,
          onChange: setFilteredContacts,
        }}
      >
        {filteredContacts && filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <div key={contact.number} id={contact.number} className="component-paper cursor-pointer" onMouseEnter={handleHoverActive} onMouseLeave={handleHoverNotActive}>
              <div className="main-container">
                <div className="image">
                  <i className="fas fa-user-circle fa-w-16 fa-fw fa-3x"></i>
                </div>
                <div className="details">
                  <div className="title">
                    <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{contact.name}</Typography>
                  </div>
                  <div className="description">
                    <div className="flex-row">
                      <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{formatPhoneNumber(contact.number)}</Typography>
                    </div>
                  </div>
                </div>
                <div className={hoverId?.toString() === contact?.number?.toString() ? "actions actions-show" : "actions"}>
                  <Tooltip title="Remove Contact" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                    <div>
                      <i onClick={handleContactRemove} id={contact.number} className="fas fa-user-slash fa-w-16 fa-fw fa-lg"></i>
                    </div>
                  </Tooltip>
                  <Tooltip title="Call" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                    <div>
                      <i onClick={() => handleCallContact(contact.name, contact.number)} className="fas fa-phone fa-w-16 fa-fw fa-lg"></i>
                    </div>
                  </Tooltip>
                  <Tooltip title="Message" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                    <div>
                      <i onClick={openMessageContactModal} id={contact.number} className="fas fa-comment fa-w-16 fa-fw fa-lg"></i>
                    </div>
                  </Tooltip>
                  <CopyToClipboard text={contact.number}>
                    <Tooltip title="Copy Number" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                      <div>
                        <i className="fas fa-clipboard fa-w-16 fa-fw fa-lg"></i>
                      </div>
                    </Tooltip>
                  </CopyToClipboard>
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

export default ContactsApp;