import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import { useNuiEvent } from "../hooks/useNuiEvent";
import { useExitListener } from "../hooks/useExitListener";
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import { isEnvBrowser } from "../utils/misc";
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import { fetchNui } from '../utils/fetchNui';
import useNotificationManager from '../hooks/useNotificationManager';
import NotificationIItem from '../items/NotificationIItem';
import { Link } from 'react-router-dom'
import { Button, FormControl, InputAdornment, TextField } from '@mui/material';
import { Checkmark } from 'react-checkmark'
import { useRecoilState } from 'recoil';
import { callsDataState, cidState, filteredCallsDataState, hasVPNState, phoneBackgroundState, phoneBrandState, phoneEmbeddedImagesState, phoneNewTweetState, phoneReceiveEmailState, phoneReceiveSMSState } from '../atoms/activeAtom';
import moment from 'moment';
import InformationApp from './apps/information/components/information';
import ContactsApp from './apps/contacts/components/contacts';
import CallsApp from './apps/calls/components/calls';
import PingerApp from './apps/erpinger/components/erpinger';
import EmailApp from './apps/email/components/email';
import YpApp from './apps/yellow-pages/components/yellow-pages';
import TwitterApp from './apps/twatter/components/twatter';
import GarageApp from './apps/garage/components/garage';
import DocumentsApp from './apps/documents/components/documents';
import HousingApp from './apps/housing/components/housing';
import CryptoApp from './apps/crypto/components/crypto';
import RacingApp from './apps/racing/components/racing';
import JobsApp from './apps/jobs/components/jobs';
import DarkmarketApp from './apps/darkmarket/components/darkmarket';
import EmploymentApp from './apps/employment/components/employment';
import EmployeesApp from './apps/employment/components/employees';
import MessagesApp from './apps/messages/components/messages';
import ChatApp from './apps/messages/components/chat';
import DebtApp from './apps/debt/components/debt';
import WenmoApp from './apps/wenmo/components/wenmo';
import CalculatorApp from './apps/calculator/components/calculator';
import BankBustersApp from './apps/bank-busters/components/bank-busters';
import DOJApp from './apps/doj/components/doj';
import SportsbookApp from './apps/sports-book/components/sports-book';
import PaynlessApp from './apps/paynless/components/paynless';
import useStyles from './index.styles';

const darkTheme = createTheme({
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor: "#2f2f2f",
          "&.Mui-selected": {
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            "&.Mui-focusVisible": { background: "rgba(0, 0, 0, 0.24)" }
          },
          "&.Mui-selected:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.08)",
          }
        }
      }
    },
    MuiCircularProgress: {
      styleOverrides: {
        circle: {
          strokeLinecap: 'butt'
        }
      }
    },
    MuiInput: {
      styleOverrides: {
        root: {
          "& .MuiInput-root": {
            color: "white",
            fontSize: '1.3vmin'
          },
          "& label.Mui-focused": {
            color: "darkgray"
          },
          "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderColor: "darkgray"
          },
          "& .MuiInput-underline:before": {
            borderColor: "darkgray",
            color: "darkgray"
          },
          "& .MuiInput-underline:after": {
            borderColor: "white",
            color: "darkgray"
          },
          "& .Mui-focused:after": {
            color: "darkgray",
            fontSize: '1.5vmin'
          },
          "& .MuiInputAdornment-root": {
            color: "darkgray",
          }
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "1em",
          maxWidth: "1000px"
        },
      }
    }
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#95ef77'
    },
    secondary: {
      main: '#424cab'
    },
    success: {
      main: '#95ef77'
    },
    warning: {
      main: '#f2a365'
    },
    error: {
      main: '#ffffff'
    },
    info: {
      main: '#2d465b'
    },
  },
});

const App: React.FC = () => {
  const classes = useStyles();
  const { addNotification, deleteNotification, notifications } = useNotificationManager();
  const [notificationInd, setNotificationInd] = useState(0);
  const [isVisible, setIsVisible] = useState(false)
  const [devMode, setDevMode] = useState(false)
  const [vpn, setVPN] = useRecoilState(hasVPNState)
  const [cid, setCid] = useRecoilState(cidState)
  const [hasDongle, setHasDongle] = useState(false)
  const [serverId, setServerId] = useState(0)
  const [time, setTime] = useState("00:00")
  const [wifi, setWifi] = useState(false)
  const [hiddenApp, setHiddenApp] = useState(false)
  const [wifiModal, setWifiModal] = useState(false)
  const [wifiPassword, setWifiPassword] = useState("")
  const [isLoading, setLoading] = useState(false)
  const [checkmark, setCheckmark] = useState(false)
  const [preparing, setPreparing] = useState(false)
  const [currentApp, setCurrentApp] = useState("")
  const [notificationsToggled, setNotificationsToggled] = useState(false)
  //const [curShell, setCurShell] = useState("android")
  //const [curWallpaper, setCurWallpaper] = useState("")
  const [landscape, setLandscape] = useState(false)

  const [phoneBrand, setPhoneBrand] = useRecoilState(phoneBrandState)
  const [phoneBackground, setPhoneBackground] = useRecoilState(phoneBackgroundState)
  const [phoneReceiveSMS, setPhoneReceiveSMS] = useRecoilState(phoneReceiveSMSState)
  const [phoneNewTweet, setPhoneNewTweet] = useRecoilState(phoneNewTweetState)
  const [phoneReceiveEmail, setPhoneReceiveEmail] = useRecoilState(phoneReceiveEmailState)
  const [phoneEmbeddedImages, setPhoneEmbeddedImages] = useRecoilState(phoneEmbeddedImagesState)

  //calls
  const [callsData, setCallsData] = useRecoilState(callsDataState);
  const [filteredCalls, setFilteredCalls] = useRecoilState(filteredCallsDataState);

  // useEffect(() => {
  //   if(isEnvBrowser()) {
  //     const promptPassword = () => {
  //       let password = prompt("Enter password to access Phone");
  //       if(password !== "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") {
  //           return false;
  //       } else {
  //           return true;
  //       }
  //   }
  //   let result = promptPassword()
  //   console.log("result", result)
  //   if(result) {
  //     setIsVisible(true)
  //   } else {
  //     setIsVisible(false)
  //     ReactDOM.unmountComponentAtNode(document.getElementById('root'));
  //     ReactDOM.render(
  //         <>
  //             <div style={{ top: '0px', left: '0px', width: '100%', height: '100%', display: 'flex', zIndex: '1000', position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
  //                 <div>
  //                     <h1 style={{ fontSize: '10vh' }}>Don't try to steal my work you clown 🤡 cool#1337 on discord https://youtu.be/dQw4w9WgXcQ</h1>
  //                 </div>
  //             </div>
  //         </>,
  //         document.getElementById('root')
  //     );
  //   }
  //   }
  // })

  useEffect(() => {
    if (isEnvBrowser()) {
      setIsVisible(true)
    } else {
      // if (curWallpaper === "") {
      //   fetchNui('fetchWallpaper', {}).then(resData => {
      //     setCurWallpaper(resData)
      //   })
      // }
      // if (curShell === "") {
      //   fetchNui('fetchShell', {}).then(resData => {
      //     setCurShell(resData)
      //   })
      // }
    }
  })

  useNuiEvent<any>('openPhone', (data) => {
    setIsVisible(data.bool)
    setServerId(data.serverid)
    setHiddenApp(data.hiddenapp)
    setHasDongle(data.hasDongle)
    setVPN(data.hasVPN)
    setCid(data.cid)
    setNotificationsToggled(data.notifications)
    // if (curWallpaper === "") { //test this, debug it see if it works
    //   fetchNui('fetchWallpaper', {}).then(resData => {
    //     setCurWallpaper(resData)
    //   })
    // }
    // if (curShell === "") {
    //   fetchNui('fetchShell', {}).then(resData => {
    //     setCurShell(resData)
    //   })
    // }
  })

  useNuiEvent<any>('closePhone', (data) => {
    setIsVisible(false)
  })

  useNuiEvent<any>('setTime', (data) => {
    setTime(data)
  })

  useNuiEvent<any>('setSrc', (data) => {
    setServerId(data)
  })

  // useNuiEvent<any>('setShell', (data) => {
  //   setCurShell(data)
  // })

  // useNuiEvent<any>('setWallpaper', (data) => {
  //   setCurWallpaper(data)
  // })

  useNuiEvent<any>('handleWifi', (data) => {
    if (data.show === true) {
      setWifi(true)
      setHiddenApp(false)
    } else {
      setWifi(false)
      setHiddenApp(false)
    }
  })

  useNuiEvent<any>('toggleDevmode', (data) => {
    if (data.bool === true) {
      setDevMode(true)
    } else {
      setDevMode(false)
    }
  })

  let history = useHistory();

  useNuiEvent<boolean>('closeApps', () => {
    history.push('/');
    setWifiPassword("")
    setWifiModal(false)
    setPreparing(false)
    setLoading(false)
    setCheckmark(false)
    setLandscape(false)
    setCurrentApp("home")
  })

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

  useNuiEvent<any>('setPreferences', (data) => {
    if(data["phone.misc.brand"] !== undefined) {
      setPhoneBrand(data["phone.misc.brand"])
    } else {
      setPhoneBrand("android")
    }
    if(data["phone.misc.background"] !== undefined) {
      setPhoneBackground(data["phone.misc.background"])
    } else {
      setPhoneBackground("https://i.imgur.com/3KTfLIV.jpg")
    }
    if(data["phone.misc.receive.sms"] !== undefined) {
      setPhoneReceiveSMS(data["phone.misc.receive.sms"])
    }
    if(data["phone.misc.new.tweet"] !== undefined) {
      setPhoneNewTweet(data["phone.misc.new.tweet"])
    }
    if(data["phone.misc.receive.email"] !== undefined) {
      setPhoneReceiveEmail(data["phone.misc.receive.email"])
    }
    if(data["phone.misc.embedded.images"] !== undefined) {
      setPhoneEmbeddedImages(data["phone.misc.embedded.images"])
    }
  })

  useNuiEvent<boolean>('setNotify', (phone: any) => {
    let data = phone.data
    setServerId(phone.serverid)

    //console.log("[DEBUG] Current Shell: ", curShell)
    //console.log("[DEBUG] Current Wallpaper: ", curWallpaper)

    // if (curWallpaper === "") {
    //   fetchNui('fetchWallpaper', {}).then(resData => {
    //     setCurWallpaper(resData)
    //   })
    // }
    // if (curShell === "") {
    //   fetchNui('fetchShell', {}).then(resData => {
    //     setCurShell(resData)
    //   })
    // }

    if (phone.app === "phone") {
      switch (data.action) {
        case "notification":
          switch (data.target_app) {
            case "twitter":
              if (currentApp === "twitter" && !data.show_even_if_app_active) return;
              if(!phoneNewTweet) return;
              addNotification({ id: notificationInd, isCall: false, calls: { receive: false, dialing: false, progress: false, inactive: false }, isConfirmation: false, confirmation: {}, header: data.title, content: data.body, isPerma: false, cancelButton: false, jobGroupId: 0, icon: "fab fa-twitter", iconColor: "#fff", bgColor: "#0eabef" });
              break;
            case "messages":
              if(!phoneReceiveSMS) return;
              addNotification({ id: notificationInd, isCall: false, calls: { receive: false, dialing: false, progress: false, inactive: false }, isConfirmation: false, confirmation: {}, header: formatPhoneNumber(data.title), content: data.body, isPerma: false, cancelButton: false, jobGroupId: 0, icon: "fas fa-comment", iconColor: "#fff", bgColor: "#8dc348" });
              break;
            case "email":
              if(!phoneReceiveEmail) return;
              addNotification({ id: notificationInd, isCall: false, calls: { receive: false, dialing: false, progress: false, inactive: false }, isConfirmation: false, confirmation: {}, header: data.title, content: data.body, isPerma: false, cancelButton: false, jobGroupId: 0, icon: "fas fa-envelope-open", iconColor: "#fff", bgColor: "linear-gradient(0deg, rgba(114,213,227,1) 0%, rgba(0,140,237,1) 100%)" });
              break;
            case "home-screen":
              addNotification({ id: notificationInd, isCall: false, calls: { receive: false, dialing: false, progress: false, inactive: false }, isConfirmation: false, confirmation: {}, header: data.title, content: data.body, isPerma: false, cancelButton: false, jobGroupId: 0, icon: `fas fa-home`, iconColor: '#fff', bgColor: data.bgColor });
              break;
          }
          break;
        case "call-receiving":
          let randId = genNumbers(4)
          let contactName = formatPhoneNumber(data.name)
          let unix = moment().unix()
          let arr = callsData
          let array = {
            id: randId,
            number: data.number,
            name: contactName,
            date: unix,
            state: "in"
          }
          let newArr = [...(arr || []), array]
          setCallsData(newArr)
          setFilteredCalls(newArr)
          addNotification({ id: notificationInd, isCall: true, calls: { callId: data.callId, receive: true, dialing: false, progress: false, inactive: true, }, isConfirmation: false, confirmation: {}, header: formatPhoneNumber(data.name), content: "Incoming Call", isPerma: true, cancelButton: false, jobGroupId: 0, icon: "fas fa-phone", iconColor: "#fff", bgColor: "rgb(0, 150, 136)" });
          break;
        case "call-in-progress":
          addNotification({ id: notificationInd, isCall: true, calls: { callId: data.callId, receive: false, dialing: false, progress: true, inactive: false }, isConfirmation: false, confirmation: {}, header: formatPhoneNumber(data.number), content: "00:00", isPerma: true, cancelButton: false, jobGroupId: 0, icon: "fas fa-phone", iconColor: "#fff", bgColor: "rgb(0, 150, 136)" });
          break;
        case "call-dialing":
          addNotification({ id: notificationInd, isCall: true, calls: { callId: data.callId, receive: false, dialing: true, progress: false, inactive: false }, isConfirmation: false, confirmation: {}, header: formatPhoneNumber(data.number), content: "Dialing...", isPerma: true, cancelButton: false, jobGroupId: 0, icon: "fas fa-phone", iconColor: "#fff", bgColor: "rgb(0, 150, 136)" });
          break;
        case "call-inactive":
          addNotification({ id: notificationInd, isCall: false, calls: { receive: false, dialing: false, progress: false, inactive: true }, isConfirmation: false, confirmation: {}, header: formatPhoneNumber(data.number), content: "Disconnected!", isPerma: false, cancelButton: false, jobGroupId: 0, icon: "fas fa-phone", iconColor: "#fff", bgColor: "rgb(0, 150, 136)" });
          break;
        case "generic-confirmation":
          switch (data.appName) {
            case "home-screen":
              addNotification({ id: notificationInd, isCall: false, calls: { receive: false, dialing: false, progress: false, inactive: false }, isConfirmation: true, confirmation: { id: data._data.confirmationId, onAccept: data.onAccept, onReject: data.onReject, timeOut: data.timeOut }, header: data.title, content: data.text, isPerma: false, cancelButton: false, jobGroupId: 0, icon: `fas fa-${data.icon.name}`, iconColor: data.icon.color, bgColor: data.bgColor });
              break;
          }
          break;
        case "job-notification":
          addNotification({ id: notificationInd, isCall: false, calls: { receive: false, dialing: false, progress: false, inactive: false }, isConfirmation: false, confirmation: {}, header: data.title, content: data.text, isPerma: true, cancelButton: data.cancelButton, jobGroupId: data.jobGroupId, icon: `fas fa-${data.icon.name}`, iconColor: data.icon.color, bgColor: data.bgColor });
          break;
        case "racing-alias-set":
          addNotification({ id: notificationInd, isCall: false, calls: { receive: false, dialing: false, progress: false, inactive: false }, isConfirmation: false, confirmation: {}, header: data.title, content: data.text, isPerma: false, cancelButton: false, jobGroupId: 0, icon: "fas fa-flag-checkered", iconColor: "#fff", bgColor: "#177330" });
          break;
      }
    }
    setNotificationInd(notificationInd + 1);
    if (data.action === "job-notification") {
      fetchNui('setJobNotifcationId', { id: notificationInd })
    }
  })

  const handleSelfieMode = () => {
    fetchNui('activateSelfieMode')
  }

  const handleToggleNotifications = () => {
    fetchNui('toggleNotifications', {}).then(resData => {
      setNotificationsToggled(resData)
    })
  }

  const openConnectModal = () => {
    if (!wifi) { return }
    setWifiModal(true)
  }

  const handleWifiConnect = () => {
    setLoading(true)
    setPreparing(true)
    fetchNui('connectWifi', {}).then(resData => {
      setHiddenApp(true)
      setTimeout(() => {
        setLoading(false)
        setCheckmark(true)
        setTimeout(() => {
          setCheckmark(false)
          setWifiModal(false)
          setPreparing(false)
        }, 1500)
      }, 500)
    })
  }

  const closeWifiModal = () => {
    setWifiModal(false)
  }

  const updateWifiPassword = (e: any) => {
    setWifiPassword(e.target.value)
  }

  const closeApp = () => {
    history.push('/');
    setWifiPassword("")
    setWifiModal(false)
    setPreparing(false)
    setLoading(false)
    setCheckmark(false)
    setCurrentApp("home")
  }

  useExitListener(setIsVisible)

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <Grid container className={classes.root}>
          <div className={classes.phoneContainer} style={{ bottom: isVisible ? '12px' : notifications.length ? '-540px' : '-1000px', background: `url(${phoneBackground}) 0% 0% / cover no-repeat` }}> {/* right: landscape ? '0px' : '20px', width: landscape ? '978px' : '280px', height: landscape ? '420px' : '652px', minWidth: landscape ? '978px' : '280px', minHeight: landscape ? '420px' : '652px', margin: landscape ? 'auto' : 'unset', top: landscape ? '0px' : 'unset', left: landscape ? '0px' : 'unset' */}
            <div className="notch" style={{ display: phoneBrand === "ios" ? '' : 'none', zIndex: '505' }}>
              <div className="camera"></div>
              <div className="speaker"></div>
            </div>
            <div className={classes.phoneTopContainer} style={{ zIndex: 501 }}>
              <div className={classes.phoneTopLeftContainer}>
                <Typography style={{ wordBreak: 'break-word', fontSize: '0.75rem', lineHeight: '0', textShadow: 'rgb(55 71 79) -1px 1px 0px, rgb(55 71 79) 1px 1px 0px, rgb(55 71 79) 1px -1px 0px, rgb(55 71 79) -1px -1px 0px' }} variant="body2" gutterBottom>{time}</Typography>
                <div className={classes.phoneTopLeftDivider}>
                  <Typography style={{ textAlign: 'right', fontSize: '0.75rem', lineHeight: '0', textShadow: 'rgb(55 71 79) -1px 1px 0px, rgb(55 71 79) 1px 1px 0px, rgb(55 71 79) 1px -1px 0px, rgb(55 71 79) -1px -1px 0px' }} variant="body2" gutterBottom>#{serverId}</Typography>
                </div>
              </div>
              <div className={classes.phoneTopMiddleContainer}></div>
              <div className={classes.phoneTopRightContainer}>
                <i className="fas fa-sun fa-w-16 fa-fw fa-sm" style={{ WebkitTextStrokeColor: 'black', WebkitTextStrokeWidth: '0.3px', marginLeft: '4px' }}></i>
                <i className={`fas ${vpn ? 'fa-lock' : 'fa-unlock'} fa-w-14 fa-fw fa-sm`} style={{ WebkitTextStrokeColor: 'black', WebkitTextStrokeWidth: '0.3px', marginLeft: '4px', color: vpn ? 'white' : '#607D8B' }}></i>
                <i onClick={openConnectModal} className={`fas fa-${wifi ? 'wifi' : 'signal'} fa-w-20 fa-fw fa-sm`} style={{ WebkitTextStrokeColor: 'black', WebkitTextStrokeWidth: '0.3px', marginLeft: '4px' }}></i>
              </div>
            </div>
            <div className="phone-bottom-container" style={{ zIndex: 501 }}>
              <div>
                <Tooltip title="Toggle Sounds" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px' }} arrow>
                  <i onClick={handleToggleNotifications} className={`fas ${notificationsToggled ? 'fa-bell-slash' : 'fa-bell'} fa-w-14 fa-fw fa-sm`}></i>
                </Tooltip>
              </div>
              <div>
                <Tooltip title="Selfie!" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px' }} arrow>
                  <i onClick={handleSelfieMode} className="fas fa-camera fa-w-16 fa-fw fa-sm"></i>
                </Tooltip>
              </div>
              <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
                <div onClick={closeApp}>
                  <Tooltip title="Home" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px' }} arrow>
                    <i className="far fa-circle fa-w-16 fa-fw fa-lg"></i>
                  </Tooltip>
                </div>
              </Link>
              <div>
                <Tooltip title="Switch Orientation" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px' }} arrow>
                  <i onClick={() => setLandscape(landscape)} className="fas fa-sync-alt fa-w-16 fa-fw fa-sm"></i>
                </Tooltip>
              </div>{/* onClick={() => setLandscape(!landscape)} */}
              <div>
                <Tooltip title="Explorer" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                  <i className="fab fa-internet-explorer fa-w-16 fa-fw fa-sm"></i>
                </Tooltip>
              </div>
            </div>
            <div className="top-notifications-wrapper top-notifications-wrapper-mounted" style={{ zIndex: 501, display: notifications.length ? '' : 'none' }}>

              {notifications.map((notification) => (
                <NotificationIItem
                  deleteNotification={deleteNotification}
                  notification={notification}
                  key={notification.id}
                />
              ))}

            </div>
            <div className="top-notifications-wrapper top-notifications-wrapper-mounted" style={{ maxHeight: '80px', display: 'none' }}>
            </div>
            <div className={classes.wifiConnectModalContainer} style={{ display: wifiModal ? '' : 'none' }}>
              <div className={classes.wifiConnectModalInnerContainer}>
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
                          label="Password"
                          variant="standard"
                          onChange={updateWifiPassword}
                          value={wifiPassword}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <i className="fas fa-user-lock"></i>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </FormControl>
                    </div>
                  </div>
                  <div className="buttons">
                    <div>
                      <Button onClick={closeWifiModal} size="small" color="warning" variant="contained">Cancel</Button>
                    </div>
                    <div>
                      <Button onClick={handleWifiConnect} size="small" color="success" variant="contained">Submit</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="phone-app-container" style={{ background: 'rgba(0, 0, 0, 0)' }}>
              <div className={classes.phoneAppInnerContainer}>
                <div className={classes.phoneAppApps}>
                  <Link to="/information" onClick={() => setCurrentApp("information")} style={{ color: '#fff', textDecoration: 'none' }}>
                    <Tooltip title="Information" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px' }} arrow>
                      <div className={classes.phoneApp} style={{ color: '#fff', background: 'linear-gradient(356deg, rgba(0,132,255,1) 9%, rgba(75,181,255,1) 55%)' }}>
                        <img alt="useful" style={{ height: '54px', borderRadius: '14px' }} src="https://gta-assets.nopixel.net/images/phone-icons/details.png"></img>
                      </div>
                    </Tooltip>
                  </Link>
                  <Link to="/contacts" onClick={() => setCurrentApp("contacts")} style={{ color: '#fff', textDecoration: 'none' }}>
                    <Tooltip title="Contacts" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px' }} arrow>
                      <div className={classes.phoneApp} style={{ color: '#fff', background: 'linear-gradient(356deg, rgba(0,44,74,1) 9%, rgba(0,65,110,1) 55%)' }}>
                        <img alt="useful" style={{ height: '54px', borderRadius: '14px' }} src="https://gta-assets.nopixel.net/images/phone-icons/contacts.png"></img>
                      </div>
                    </Tooltip>
                  </Link>
                  <Link to="/calls" onClick={() => setCurrentApp("calls")} style={{ color: '#fff', textDecoration: 'none' }}>
                    <Tooltip title="Calls" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px' }} arrow>
                      <div className={classes.phoneApp} style={{ color: '#fff', background: 'linear-gradient(0deg, rgb(60, 194, 122) 0%, rgba(5,136,66,1) 100%)' }}>
                        <img alt="useful" style={{ height: '54px', borderRadius: '14px' }} src="https://gta-assets.nopixel.net/images/phone-icons/calls.png"></img>
                      </div>
                    </Tooltip>
                  </Link>
                  <Link to="/messages" onClick={() => setCurrentApp("messages")} style={{ color: '#fff', textDecoration: 'none' }}>
                    <Tooltip title="Messages" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px' }} arrow>
                      <div className={classes.phoneApp} style={{ color: '#fff', background: 'linear-gradient(0deg, rgba(0,182,21,1) 0%, rgba(128,236,109,1) 100%)' }}>
                        <img alt="useful" style={{ height: '54px', borderRadius: '14px' }} src="https://gta-assets.nopixel.net/images/phone-icons/conversations.png"></img>
                        <div className="app-notification" style={{ display: 'none' }}></div>
                      </div>
                    </Tooltip>
                  </Link>
                  <Link to="/erpinger" onClick={() => setCurrentApp("erpinger")} style={{ color: '#fff', textDecoration: 'none' }}>
                    <Tooltip title="Ping!" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px' }} arrow>
                      <div className={classes.phoneApp} style={{ color: '#fff', background: 'linear-gradient(0deg, rgba(72,105,255,1) 0%, rgba(121,37,255,1) 100%)' }}>
                        <img alt="useful" style={{ height: '54px', borderRadius: '14px' }} src="https://gta-assets.nopixel.net/images/phone-icons/erpinger.png"></img>
                      </div>
                    </Tooltip>
                  </Link>
                  <Link to="/email" onClick={() => setCurrentApp("email")} style={{ color: '#fff', textDecoration: 'none' }}>
                    <Tooltip title="Email" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px' }} arrow>
                      <div className={classes.phoneApp} style={{ color: '#fff', background: 'linear-gradient(0deg, rgba(114,213,227,1) 0%, rgba(0,140,237,1) 100%)' }}>
                        <img alt="useful" style={{ height: '54px', borderRadius: '14px' }} src="https://gta-assets.nopixel.net/images/phone-icons/email.png"></img>
                      </div>
                    </Tooltip>
                  </Link>
                  <Link to="/yp" onClick={() => setCurrentApp("yp")} style={{ color: '#fff', textDecoration: 'none' }}>
                    <Tooltip title="YP" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px' }} arrow>
                      <div className={classes.phoneApp} style={{ color: '#fff', background: 'linear-gradient(0deg, rgba(255,191,0,1) 0%, rgba(255,191,0,1) 100%)' }}>
                        <img alt="useful" style={{ height: '54px', borderRadius: '14px' }} src="https://gta-assets.nopixel.net/images/phone-icons/yellow-pages.png"></img>
                      </div>
                    </Tooltip>
                  </Link>
                  <Link to="/twitter" onClick={() => setCurrentApp("twitter")} style={{ color: '#fff', textDecoration: 'none' }}>
                    <Tooltip title="Twatter" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px' }} arrow>
                      <div className={classes.phoneApp} style={{ color: '#fff', background: 'linear-gradient(0deg, rgba(23,23,23,1) 0%, rgba(23,23,23,1) 100%)' }}>
                        <img alt="useful" style={{ height: '54px', borderRadius: '14px' }} src="https://gta-assets.nopixel.net/images/phone-icons/twatter.png"></img>
                      </div>
                    </Tooltip>
                  </Link>
                  <Link to="/garage" onClick={() => setCurrentApp("garage")} style={{ color: '#fff', textDecoration: 'none' }}>
                    <Tooltip title="Vehicles" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px' }} arrow>
                      <div className={classes.phoneApp} style={{ color: '#fff', background: 'linear-gradient(180deg, rgba(233, 108, 123, 1) 0%, rgba(209, 13, 53, 1) 100%)' }}>
                        <img alt="useful" style={{ height: '54px', borderRadius: '14px' }} src="https://gta-assets.nopixel.net/images/phone-icons/vehicles.png"></img>
                      </div>
                    </Tooltip>
                  </Link>
                  <Link to="/debt" onClick={() => setCurrentApp("debt")} style={{ display: devMode ? '' : 'none', color: '#fff', textDecoration: 'none' }}>
                    <Tooltip title="Debt" placement="top" sx={{ display: devMode ? '' : 'none', backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px' }} arrow>
                      <div className={classes.phoneApp} style={{ display: devMode ? '' : 'none', color: '#fff', background: '#faf8fb' }}>
                        <img alt="useful" style={{ height: '54px', borderRadius: '14px' }} src="https://gta-assets.nopixel.net/images/phone-icons/debt.png"></img>
                      </div>
                    </Tooltip>
                  </Link>
                  <Link to="/wenmo" onClick={() => setCurrentApp("wenmo")} style={{ display: devMode ? '' : 'none', color: '#fff', textDecoration: 'none' }}>
                    <Tooltip title="Wenmo" placement="top" sx={{ display: devMode ? '' : 'none', backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px' }} arrow>
                      <div className={classes.phoneApp} style={{ display: devMode ? '' : 'none', color: '#fff', background: '#151718' }}>
                        <img alt="useful" style={{ height: '54px', borderRadius: '14px' }} src="https://gta-assets.nopixel.net/images/phone-icons/wenmo.png"></img>
                      </div>
                    </Tooltip>
                  </Link>
                  <Link to="/documents" onClick={() => setCurrentApp("documents")} style={{ display: devMode ? '' : 'none', color: '#fff', textDecoration: 'none' }}>
                    <Tooltip title="Documents" placement="top" sx={{ display: devMode ? '' : 'none', backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px' }} arrow>
                      <div className={classes.phoneApp} style={{ display: devMode ? '' : 'none', color: '#fff', background: '#da54d5' }}>
                        <img alt="useful" style={{ height: '54px', borderRadius: '14px' }} src="https://gta-assets.nopixel.net/images/phone-icons/documents.png"></img>
                      </div>
                    </Tooltip>
                  </Link>
                  <Link to="/housing" onClick={() => setCurrentApp("housing")} style={{ color: '#fff', textDecoration: 'none' }}>
                    <Tooltip title="Housing" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px' }} arrow>
                      <div className={classes.phoneApp} style={{ color: '#fff', background: 'linear-gradient(0deg, rgba(61,146,69,1) 0%, rgba(61,146,69,1) 100%)' }}>
                        <i className="fas fa-house-user fa-w-16 fa-fw" style={{ fontSize: '40px', WebkitTextStrokeColor: 'rgb(34, 40, 49)', WebkitTextStrokeWidth: '0.9px' }}></i>
                      </div>
                    </Tooltip>
                  </Link>
                  <Link to="/crypto" onClick={() => setCurrentApp("crypto")} style={{ color: '#fff', textDecoration: 'none' }}>
                    <Tooltip title="Crypto" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px' }} arrow>
                      <div className={classes.phoneApp} style={{ color: '#fff', background: '#121315' }}>
                        <img alt="useful" style={{ height: '54px', borderRadius: '14px' }} src="https://gta-assets.nopixel.net/images/phone-icons/crypto.png"></img>
                      </div>
                    </Tooltip>
                  </Link>
                  <Link to="/jobs" onClick={() => setCurrentApp("jobs")} style={{ color: '#fff', textDecoration: 'none' }}>
                    <Tooltip title="Job Center" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px' }} arrow>
                      <div className={classes.phoneApp} style={{ color: '#fff', background: '#1d1d1d' }}>
                        <img alt="useful" style={{ height: '54px', borderRadius: '14px' }} src="https://gta-assets.nopixel.net/images/phone-icons/jobs.png"></img>
                      </div>
                    </Tooltip>
                  </Link>
                  <Link to="/employment" onClick={() => setCurrentApp("employment")} style={{ color: '#fff', textDecoration: 'none' }}>
                    <Tooltip title="Employment" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px' }} arrow>
                      <div className={classes.phoneApp} style={{ color: '#fff', background: '#1d1d1d' }}>
                        <img alt="useful" style={{ height: '54px', borderRadius: '14px' }} src="https://gta-assets.nopixel.net/images/phone-icons/employment.png"></img>
                      </div>
                    </Tooltip>
                  </Link>
                  <Link to="/racing" onClick={() => setCurrentApp("racing")} style={{ display: hasDongle ? '' : 'none', color: '#fff', textDecoration: 'none' }}>
                    <Tooltip title="Racing" placement="top" sx={{ display: hasDongle ? '' : 'none', backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px' }} arrow>
                      <div className={classes.phoneApp} style={{ display: hasDongle ? '' : 'none', color: '#fff', background: '#fe7228' }}>
                        <img alt="useful" style={{ height: '54px', borderRadius: '14px' }} src="https://gta-assets.nopixel.net/images/phone-icons/racing.png"></img>
                      </div>
                    </Tooltip>
                  </Link>
                  <Link to="/calculator" onClick={() => setCurrentApp("calculator")} style={{ color: '#fff', textDecoration: 'none' }}>
                    <Tooltip title="Calculator" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px' }} arrow>
                      <div className={classes.phoneApp} style={{ color: '#fff', background: 'linear-gradient(180deg, rgba(233, 108, 123, 1) 0%, rgba(209, 13, 53, 1) 100%)' }}>
                        <img alt="useful" style={{ height: '54px', borderRadius: '14px' }} src="https://gta-assets.nopixel.net/images/phone-icons/calculator.png"></img>
                      </div>
                    </Tooltip>
                  </Link>
                  <Link to="/bankbusters" onClick={() => setCurrentApp("bankbusters")} style={{ display: vpn ? '' : 'none', color: '#fff', textDecoration: 'none' }}>
                    <Tooltip title="Bank Busters" placement="top" sx={{ display: vpn ? '' : 'none', backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px' }} arrow>
                      <div className={classes.phoneApp} style={{ display: vpn ? '' : 'none', color: '#000', backgroundColor: '#ddbd03' }}>
                        <i className="fas fa-piggy-bank fa-w-16 fa-fw" style={{ fontSize: '40px' }}></i>
                      </div>
                    </Tooltip>
                  </Link>
                  <Link to="/doj" onClick={() => setCurrentApp("doj")} style={{ color: '#fff', textDecoration: 'none' }}>
                    <Tooltip title="Department of Justice" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px' }} arrow>
                      <div className={classes.phoneApp} style={{ color: '#dfcf0d', background: 'linear-gradient(0deg, rgba(63,88,187,1) 0%, rgba(63,88,187,1) 100%)' }}>
                        <i className="fas fa-gavel fa-w-16 fa-fw" style={{ fontSize: '40px' }}></i>
                      </div>
                    </Tooltip>
                  </Link>
                  <Link to="/sportsbook" onClick={() => setCurrentApp("sportsbook")} style={{ display: devMode ? '' : 'none', color: '#fff', textDecoration: 'none' }}>
                    <Tooltip title="Diamond Sports Book" placement="top" sx={{ display: devMode ? '' : 'none', backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px' }} arrow>
                      <div className={classes.phoneApp} style={{ display: devMode ? '' : 'none', color: '#fff', background: 'linear-gradient(0deg, rgba(0,0,2,1) 0%, rgba(0,0,2,1) 100%)' }}>
                        <i className="fas fa-gem fa-w-16 fa-fw" style={{ fontSize: '40px' }}></i>
                      </div>
                    </Tooltip>
                  </Link>
                  <Link to="/paynless" onClick={() => setCurrentApp("paynless")} style={{ display: devMode ? '' : 'none', color: '#fff', textDecoration: 'none' }}>
                    <Tooltip title="PayNLess" placement="top" sx={{ display: devMode ? '' : 'none', backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px' }} arrow>
                      <div className={classes.phoneApp} style={{ display: devMode ? '' : 'none', color: '#fff', background: '#1d1d1d' }}>
                        <i className="fas fa-archive fa-w-16 fa-fw" style={{ fontSize: '35px', WebkitTextStrokeColor: 'rgb(34, 40, 49)', WebkitTextStrokeWidth: '0.9px' }}></i>
                      </div>
                    </Tooltip>
                  </Link>
                  <Link to="/darkmarket" onClick={() => setCurrentApp("darkmarket")} style={{ display: wifi && hiddenApp ? '' : 'none', color: '#fff', textDecoration: 'none' }}>
                    <Tooltip style={{ display: wifi && hiddenApp ? '' : 'none' }} title="Dark Market" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px' }} arrow>
                      <div className={classes.phoneApp} style={{ display: wifi && hiddenApp ? '' : 'none', color: '#fff', background: 'linear-gradient(to bottom, #c852ff, #a21de0)' }}>
                        <i className="fas fa-user-secret fa-w-16 fa-fw" style={{ fontSize: '40px' }}></i>
                      </div>
                    </Tooltip>
                  </Link>
                </div>
              </div>
            </div>

            <Switch>
              <Route path='/information' render={() => <InformationApp />} />
            </Switch>

            <Switch>
              <Route path='/contacts' render={() => <ContactsApp />} />
            </Switch>

            <Switch>
              <Route path='/calls' render={() => <CallsApp />} />
            </Switch>

            <Switch>
              <Route path='/messages' render={() => <MessagesApp />} />
            </Switch>

            <Switch>
              <Route path='/chat/:chatId' render={() => <ChatApp />} />
            </Switch>

            <Switch>
              <Route path='/erpinger' render={() => <PingerApp />} />
            </Switch>

            <Switch>
              <Route path='/email' render={() => <EmailApp />} />
            </Switch>

            <Switch>
              <Route path='/yp' render={() => <YpApp />} />
            </Switch>

            <Switch>
              <Route path='/twitter' render={() => <TwitterApp />} />
            </Switch>

            <Switch>
              <Route path='/garage' render={() => <GarageApp />} />
            </Switch>

            <Switch>
              <Route path='/debt' render={() => <DebtApp />} />
            </Switch>

            <Switch>
              <Route path='/wenmo' render={() => <WenmoApp />} />
            </Switch>

            <Switch>
              <Route path='/documents' render={() => <DocumentsApp />} />
            </Switch>

            <Switch>
              <Route path='/housing' render={() => <HousingApp />} />
            </Switch>

            <Switch>
              <Route path='/crypto' render={() => <CryptoApp />} />
            </Switch>

            <Switch>
              <Route path='/jobs' render={() => <JobsApp />} />
            </Switch>

            <Switch>
              <Route path='/employment' render={() => <EmploymentApp />} />
            </Switch>

            <Switch>
              <Route path='/employees/:businessId' render={() => <EmployeesApp />} />
            </Switch>

            <Switch>
              <Route path='/racing' render={() => <RacingApp />} />
            </Switch>

            <Switch>
              <Route path='/calculator' render={() => <CalculatorApp />} />
            </Switch>

            <Switch>
              <Route path='/bankbusters' render={() => <BankBustersApp />} />
            </Switch>

            <Switch>
              <Route path='/doj' render={() => <DOJApp />} />
            </Switch>

            <Switch>
              <Route path='/sportsbook' render={() => <SportsbookApp />} />
            </Switch>

            <Switch>
              <Route path='/paynless' render={() => <PaynlessApp />} />
            </Switch>

            <Switch>
              <Route path='/darkmarket' render={() => <DarkmarketApp />} />
            </Switch>

          </div>

          <div className="phone-border-container" style={{ display: phoneBrand === "android" ? '' : 'none', bottom: phoneBrand === "android" && isVisible ? '12px' : notifications.length ? '-540px' : '-1000px' }}> {/* animation: landscape ? '500ms ease 0s 1 normal none running rotatelandscape' : '500ms ease 0s 1 normal none running rotateportrait', transform: landscape ? 'rotate(-90deg) scale(1.5)' : 'rotate(0deg) scale(1)', inset: landscape ? '0px' : '', margin: landscape ? 'auto' : 'unset' */}
            <div className="phone-border-inner-container">
              <div className="phone-border-inner-border"></div>
              <div className="phone-border-inner-alignment">
                <div className="phone-border-inner-white"></div>
              </div>
            </div>
          </div>

          <div className="phone-iphone-shell" style={{ display: phoneBrand === "ios" ? '' : 'none', bottom: phoneBrand === "ios" && isVisible ? '0px' : notifications.length ? '-550px' : '-1000px' }}>
            <div className="jss1264">
              <div className="jss16465" id="cores">
                <div className="jss16471"></div>
                <div className="jss16472"></div>
                <div className="jss16473"></div>
                <div className="jss16474"></div>
                <div className="jss16475">
                  <div className="inner-shadow-bg"></div>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </ThemeProvider>
    </div>
  );
}

export default App;