import React, { useState, useEffect } from 'react';
import '../../../index.css';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Checkmark } from 'react-checkmark';
import Button from '@mui/material/Button';
import { fetchNui } from '../../../../utils/fetchNui';
import { useNuiEvent } from "../../../../hooks/useNuiEvent";
import { Link } from 'react-router-dom';
import useStyles from "./messages.styles";
import AppContainer from '../../../components/app-container';

const MessagesApp: React.FC = () => {
  const classes = useStyles();

  const [messageData, setMessageData] = useState([])
  const [filteredMessages, setFilteredMessages] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [checkmark, setCheckmark] = useState(false)
  const [preparing, setPreparing] = useState(false)
  const [messageModal, setMessageModal] = useState(false)
  const [myNumber, setMyNumber] = useState("")
  const [messageNumber, setMessageNumber] = useState("")
  const [messageMessage, setMessageMessage] = useState("")

  useEffect(() => {
    fetchNui('getMessageData', {}).then(resData => {
      setMessageData(resData.data)
      setFilteredMessages(resData.data)
      setMyNumber(resData.mynumber)
    })
  }, []);

  const openMessageModal = (e: any) => {
    setMessageModal(true)
  }

  const closeMessageModal = () => {
    setMessageModal(false)
  }

  const updateMessageNumber = (e: any) => {
    setMessageNumber(e.target.value)
  }

  const updateMessageMessage = (e: any) => {
    setMessageMessage(e.target.value)
  }

  const formatPhoneNumber = (phoneNumberString) => {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumberString;
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

  useNuiEvent<boolean>('updateMessages', (data: any) => {
    setMessageData(data.data)
    setFilteredMessages(data.data)
    setMyNumber(data.mynumber)
  })

  useNuiEvent<boolean>('closeApps', () => {
    setMessageModal(false)
    setLoading(false)
    setCheckmark(false)
    setPreparing(false)
    setMessageNumber("")
    setMessageMessage("")
  })

  return (
    <>
      <div className={classes.messageMessageModalContainer} style={{ display: messageModal ? '' : 'none' }}>
        <div className={classes.messageMessageModalInnerContainer}>
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
                    onChange={updateMessageNumber}
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
                  rows={2}
                  id="input-with-icon-textfield"
                  label="Message"
                  variant="standard"
                  onChange={updateMessageMessage}
                  value={messageMessage}
                />
              </FormControl>
            </div>
            <div className="buttons">
              <div>
                <Button onClick={closeMessageModal} size="small" color="warning" variant="contained">Cancel</Button>
              </div>
              <div>
                <Button onClick={handleSendMessage} size="small" color="success" variant="contained">Submit</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AppContainer
        emptyMessage={filteredMessages.length === 0}
        primaryActions={[
          {
            type: "icon",
            title: "Send Message",
            placement: "left",
            icon: "fas fa-comment fa-w-16",
            action: openMessageModal,
            show: true,
          }
        ]}
        search={{
          filter: ['msgDisplayName'],
          list: messageData,
          onChange: setFilteredMessages,
        }}
      >
        {filteredMessages && filteredMessages.length > 0 ? (
          filteredMessages.map((message) => (
            <Link to={`/chat/${message.receiver?.toString() === myNumber?.toString() ? message.sender : message.receiver}`} style={{ color: '#fff', textDecoration: 'none' }}>
              <div className="component-paper cursor-pointer">
                <div className="notification" style={{ display: 'none', backgroundColor: 'rgb(77, 208, 225)' }}></div>
                <div className="main-container">
                  <div className="image">
                    <i className="fas fa-user-circle fa-w-16 fa-fw fa-3x"></i>
                  </div>
                  <div className="details">
                    <div className="title">
                      <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{formatPhoneNumber(message.msgDisplayName)}</Typography>
                    </div>
                    <div className="description">
                      <div className="flex-row">
                        <Typography style={{ color: '#fff', wordBreak: 'break-word', overflow: 'hidden', textOverflow: 'ellipsis', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', display: '-webkit-box' }} variant="body2" gutterBottom>{message.message}</Typography>
                      </div>
                    </div>
                  </div>
                  <div className="actions">
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <>
          </>
        )}
      </AppContainer>
    </>
  );
}

export default MessagesApp;