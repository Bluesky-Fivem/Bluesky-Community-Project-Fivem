import React, { useState, useEffect } from 'react';
import '../../../index.css';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Checkmark } from 'react-checkmark';
import { fetchNui } from '../../../../utils/fetchNui';
import { useNuiEvent } from "../../../../hooks/useNuiEvent";
import moment from 'moment';
import useStyles from "./twatter.styles";
import TwitterImage from './twatter-image';
import AppContainer from '../../../components/app-container';
import { useRecoilState } from 'recoil';
import { phoneEmbeddedImagesState } from '../../../../atoms/activeAtom';

const TwitterApp: React.FC = () => {
  const classes = useStyles();

  const [twatData, setTwatData] = useState([])
  const [filteredTwats, setFilteredTwats] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [checkmark, setCheckmark] = useState(false)
  const [preparing, setPreparing] = useState(false)
  const [twatModal, setTwatModal] = useState(false)
  const [twatMessage, setTwatMessage] = useState("")
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [phoneEmbeddedImages, setPhoneEmbeddedImages] = useRecoilState(phoneEmbeddedImagesState)

  useEffect(() => {
    fetchNui('getTwitterData', {}).then(resData => {
      setTwatData(resData)
      setFilteredTwats(resData)
    })
  }, []);

  const openTwatModal = (e: any) => {
    setTwatModal(true)
  }

  const closeTwatModal = () => {
    setTwatModal(false)
    setTwatMessage("")
  }

  const updateTwatMessage = (e: any) => {
    setTwatMessage(e.target.value)
  }

  const handleTwatPost = () => {
    setLoading(true)
    setPreparing(true)
    fetchNui('postTwitter', { message: twatMessage }).then(resData => {
      if (resData.success === true) {
        setTwatMessage("")
        setTwatData(resData.data)
        setFilteredTwats(resData.data)
        setLoading(false)
        setCheckmark(true)
        setTimeout(() => {
          setCheckmark(false)
          setTwatModal(false)
          setPreparing(false)
        }, 1000)
      } else {
        setLoading(false)
        setPreparing(false)
        setErrorMessage(resData.message)
        setShowError(true)
        setTwatMessage("")
      }
    })
  }

  const handleTwatReply = (e: any) => {
    setTwatMessage(e)
    setTwatModal(true)
  }

  const handleTwatRetweet = (e: any) => {
    setTwatMessage(e)
    setTwatModal(true)
  }

  useNuiEvent<any>('updateTwitter', (data: any) => {
    setTwatData(data)
    setFilteredTwats(data)
  })

  useNuiEvent<boolean>('closeApps', () => {
    setTwatModal(false)
    setLoading(false)
    setPreparing(false)
    setCheckmark(false)
    setShowError(false)
    setErrorMessage("")
    setTwatMessage("")
  })

  return (
    <>
      <div className={classes.twitterTwatModalContainer} style={{ display: twatModal ? '' : 'none' }}>
        <div className={classes.twitterTwatModalInnerContainer}>
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
                    label="Twat"
                    variant="standard"
                    onChange={updateTwatMessage}
                    value={twatMessage}
                    multiline
                    maxRows={10}
                    inputProps={{ maxLength: 255 }}
                    helperText={`${twatMessage.length}/255`}
                  />
                </FormControl>
              </div>
            </div>
            <div className="buttons">
              <div>
                <Button onClick={closeTwatModal} size="small" color="warning" variant="contained">Cancel</Button>
              </div>
              <div>
                <Button onClick={handleTwatPost} size="small" color="success" variant="contained">Submit</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AppContainer
        emptyMessage={filteredTwats.length === 0}
        primaryActions={[
          {
            type: "icon",
            title: "Twat",
            placement: "left",
            icon: "fab fa-twitter fa-w-16",
            action: openTwatModal,
            show: true,
          }
        ]}
        search={{
          filter: ['sender', 'message'],
          list: twatData,
          onChange: setFilteredTwats,
        }}
      >
        <div id="twats">
          {filteredTwats && filteredTwats.length > 0 ? (
            filteredTwats.map((twat) => (
              <>
                <div className={classes.twitterComponentContainer}>
                  {twat.message.indexOf("imgur.com") >= 0 && phoneEmbeddedImages || twat.message.indexOf("discordapp.com") >= 0 && phoneEmbeddedImages ? (
                    <TwitterImage sender={twat.sender} message={twat.message} date={twat.date} />
                  ) : (
                    <>
                      <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body1" gutterBottom>@{twat.sender}</Typography>
                      <Typography style={{ color: '#fff', wordBreak: 'break-word', marginBottom: '0.25em' }} variant="body2" gutterBottom>{twat.message}</Typography>
                    </>
                  )}
                  <div style={{ fontSize: '13px', display: 'flex', paddingBottom: '1vh' }}>
                    <Tooltip title="Reply" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                      <i onClick={() => handleTwatReply(`@${twat.sender} `)} className="fas fa-reply"></i>
                    </Tooltip>
                    <Tooltip title="Retwat" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                      <i onClick={() => handleTwatRetweet(`RT @${twat.sender} ${twat.message}`)} className="fas fa-retweet" style={{ paddingLeft: '1vh' }}></i>
                    </Tooltip>
                    <Tooltip title="Report" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                      <i className="fas fa-flag" style={{ paddingLeft: '1vh' }}></i>
                    </Tooltip>
                    <Typography style={{ color: '#fff', wordBreak: 'break-word', position: 'absolute', float: 'right', right: '5%', bottom: '1%' }} variant="body2" gutterBottom>{moment(twat.date * 1000).fromNow()}</Typography>
                  </div>
                </div>
              </>
            ))
          ) : (
            <>
            </>
          )}
        </div>
      </AppContainer>
    </>
  );
}

export default TwitterApp;