import React, { useState, useEffect, useRef } from 'react';
import '../../../index.css';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { fetchNui } from '../../../../utils/fetchNui';
import { useNuiEvent } from "../../../../hooks/useNuiEvent";
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';
import useStyles from "./chat.styles";
import ChatImage from './chat-image';
import { useRecoilState } from 'recoil';
import { callsDataState, filteredCallsDataState, phoneEmbeddedImagesState } from '../../../../atoms/activeAtom';

const ChatApp: React.FC = () => {
  const classes = useStyles();

  const [chatData, setChatData] = useState([])
  const [filteredChat, setFilteredChat] = useState([])
  const [callsData, setCallsData] = useRecoilState(callsDataState);
  const [filteredCalls, setFilteredCalls] = useRecoilState(filteredCallsDataState);
  const [displayName, setDisplayName] = useState("")
  const [clientNumber, setClientNumber] = useState("")
  const [message, setMessage] = useState("")
  const messageInput = useRef<HTMLTextAreaElement>(null)
  const [isDisplayName, setIsDisplayName] = useState(false)
  const { chatId } = useParams<{ chatId: string }>();
  const [phoneEmbeddedImages, setPhoneEmbeddedImages] = useRecoilState(phoneEmbeddedImagesState)

  useEffect(() => {
    fetchNui('getChatData', { number: chatId }).then(resData => {
      setChatData(resData.messages)
      setFilteredChat(resData.messages)
      setDisplayName(resData.displayName)
      setClientNumber(resData.clientNumber)
      setIsDisplayName(resData.isDisplayName)
    })
  }, [chatId]);

  const handleSendMessage = (e: any) => {
    if (e.keyCode === 13) {
      if (e.target.value === undefined || e.target.value === "") { return }
      fetchNui('sendMessage', { number: chatId, message: e.target.value }).then(resData => {
        messageInput.current.value = ""
        setChatData(resData.messages)
        setFilteredChat(resData.messages)
        setDisplayName(resData.displayName)
        setClientNumber(resData.clientNumber)
        setIsDisplayName(resData.isDisplayName)
        setMessage('')
      })
    }
  }

  const handleCallNumber = (number) => {
    fetchNui('pnp-ui:callStart', {
      number: number
    })

    let randId = genNumbers(4)
    //let contactName = formatPhoneNumber(name)
    let unix = moment().unix()

    let arr = callsData

    let array = {
      id: randId,
      number: number,
      name: displayName,
      date: unix,
      state: "out"
    }

    let newArr = [...(arr || []), array]

    setCallsData(newArr)
    setFilteredCalls(newArr)
  }

  const openAddContactModal = () => {
    //need to open a modal to add contact
    //auto places the number in modal number input
  }

  let history = useHistory();

  const goBack = () => {
    history.push('/messages')
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

  useNuiEvent<boolean>('updateChatMessages', (data: any) => {
    if (chatId.toString() === data.sender.toString()) {
      setChatData(data.messages)
      setFilteredChat(data.messages)
      setDisplayName(data.displayName)
      setClientNumber(data.clientNumber)
      setIsDisplayName(data.isDisplayName)
    }
  })

  useNuiEvent<boolean>('closeApps', () => {
  })

  return (
    <>
      <div className={classes.chatOuterContainer} style={{ zIndex: 500 }}>
        <div className={classes.chatInnerContainer}>
          <div className="messages-container">
            <div className={classes.chatSearch}>
              <Tooltip title="Go Back" placement="right" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                <div style={{ color: '#fff', width: '40px', display: 'flex', alignItems: 'center' }}>
                  <i onClick={goBack} className="fas fa-chevron-left fa-w-10 fa-fw fa-lg"></i>
                </div>
              </Tooltip>
              <div className={classes.chatSearchWrapper}>
                <div className="input-wrapper">
                  <FormControl fullWidth sx={{ width: '100%' }}>
                    <TextField
                      id="input-with-icon-textfield"
                      label="Search"
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
            <div className={classes.chatIcon}>
              <div className={classes.chatIconWrapper}>
                <Tooltip title="Call" placement="left" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                  <i onClick={() => handleCallNumber(chatId)} style={{ fontSize: '1.2em' }} className="fas fa-phone fa-w-16 fa-fw fa-lg"></i>
                </Tooltip>
              </div>
            </div>
            <div className={classes.chatIcon} style={{ display: isDisplayName ? 'none' : '', right: '50px' }}>
              <div className={classes.chatIconWrapper}>
                <Tooltip title="Add Contact" placement="left" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                  <i onClick={openAddContactModal} style={{ fontSize: '1.2em' }} className="fas fa-user-plus fa-w-16 fa-fw fa-lg"></i>
                </Tooltip>
              </div>
            </div>
            <div className={classes.chatMessages}>
              <div className="messages-container">
                <div className="contact-info">
                  <div className="icon">
                    <i className="fas fa-user-circle fa-w-16 fa-fw fa-2x"></i>
                  </div>
                  <div className="text">
                    <Typography style={{ display: isDisplayName ? '' : 'none', color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{displayName}</Typography>
                    <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{isDisplayName ? formatPhoneNumber(chatId) : formatPhoneNumber(displayName)}</Typography>
                  </div>
                </div>

                <div className="messages" style={{ marginBottom: '20px' }}>
                  {filteredChat && filteredChat.length > 0 ? (
                    filteredChat.map((message) => (
                      <div className={`message ${message.sender === clientNumber ? 'message-out' : 'message-in'}`}>
                        {message.message.indexOf("imgur.com") >= 0 && phoneEmbeddedImages || message.message.indexOf("discordapp.com") >= 0 && phoneEmbeddedImages ? (
                          <ChatImage message={message.message} sender={message.sender} clientNumber={clientNumber} />
                        ) : (
                          <>
                            <div className={`inner ${message.sender === clientNumber ? 'inner-out' : 'inner-in'}`}>
                              <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{message.message}</Typography>
                            </div>
                          </>
                        )}



                        <div className={`timestamp ${message.sender === clientNumber ? 'timestamp-out' : 'timestamp-in'}`}>
                          <Typography style={{ wordBreak: 'break-word' }} variant="body2" gutterBottom>{moment(message.unix * 1000).fromNow()}</Typography>
                        </div>
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </div>

                <div className="send-message">
                  <textarea ref={messageInput} onKeyDown={handleSendMessage} onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault() }} placeholder="Send message..."></textarea>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatApp;