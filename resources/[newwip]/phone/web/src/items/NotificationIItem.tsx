import { useEffect, useState } from "react";
import '../main/index.css'
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { fetchNui } from '../utils/fetchNui';
import { useNuiEvent } from "../hooks/useNuiEvent";

interface INotificationItem {
  notification,
  deleteNotification(id: number): void;
}

var toHHMMSS = (secs) => {
  var sec_num = parseInt(secs, 10)
  var hours = Math.floor(sec_num / 3600)
  var minutes = Math.floor(sec_num / 60) % 60
  var seconds = sec_num % 60

  return [hours, minutes, seconds]
    .map(v => v < 10 ? "0" + v : v)
    .filter((v, i) => v !== "00" || i > 0)
    .join(":")
}

const useCountDown = (start: number, id: number, callback: string) => {
  const [counter, setCounter] = useState(start);
  useEffect(() => {
    if (counter === 0) {
      fetchNui(callback, { action: 'reject', _data: { confirmationId: id } })
      return;
    }
    setTimeout(() => {
      setCounter(counter - 1);
    }, 1000);
  }, [counter]);
  return counter;
};

function Countdown({ seconds, text, id, callback }): JSX.Element {
  let timeLeft = useCountDown(seconds, id, callback);
  let newTimeLeft = toHHMMSS(timeLeft)
  //if(timeLeft < 10){//swap this shit out against the toHHMMSS
  //  newTimeLeft = "0" + timeLeft
  //}else{
  //  newTimeLeft = timeLeft
  //}
  return <div>{newTimeLeft} - {text}</div>;
}

const useStopWatch = () => {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setCounter(counter + 1);
    }, 1000);
  }, [counter]);
  return counter;
};

function Stopwatch({ }): JSX.Element {
  let timeLeft = useStopWatch();
  let newTimeLeft = toHHMMSS(timeLeft) //new Date(timeLeft * 1000).toISOString().substr(14, 5)
  return <div>{newTimeLeft}</div>;
}

export default (props: INotificationItem) => {//maye hook NUI event here, that changes the state of content etc or deletes specific id
  //have a state in here saving all the information that you want to be able to change
  //then have a nui event catcher, that sets the state if the id matches
  //for the notifications you can change, maybe fetchNui the overlayInd and save it and use that
  const { deleteNotification, notification } = props;
  //this needs the callId, so it can use it to hangup calls etc
  const { id, isCall, calls, isConfirmation, confirmation, header, content, isPerma, cancelButton, jobGroupId, icon, iconColor, bgColor } = notification;

  const [alive, setAlive] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [ran, setRan] = useState(false);
  const [disconnected, setDisconnected] = useState(false)
  const [headerState, setHeaderState] = useState("");
  const [contentState, setContentState] = useState("");
  const [groupId, setGroupId] = useState("")

  useEffect(() => {
    if (!ran) {
      setRan(true)
      setHeaderState(header)
      setContentState(content)
      setGroupId(jobGroupId)
    }
  }, []);

  useEffect(() => {//here check if perma noti, and if it is ignore this timer
    if (isPerma) { return }
    //if(isCall && !calls.inactive){return} //&& calls.progress
    const timer = setTimeout(() => setAlive(false), isConfirmation ? Number(confirmation.timeOut * 1000) : 3000); //2000
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!alive) {
      setFadeOut(true)
      setTimeout(() => {
        deleteNotification(id);
      }, 500)
    }
  }, [alive, deleteNotification, id]);

  //update callnotify here,
  //takes callId as parameter to make sure its the right noti
  useNuiEvent<any>('updateNotify', (data) => {
    if (Number(data.id) === Number(groupId)) {
      //update title/content state
      //check if data.title, 
      //or data.body is null 
      //and if it is dont do it
      if (data.title !== undefined || data.title !== "") {
        setHeaderState(data.title)
      }
      if (data.body !== undefined || data.body !== "") {
        setContentState(data.body)
      }
    }
  })

  useNuiEvent<any>('closeNotify', (data) => {
    if (Number(data.id) === Number(groupId)) {
      setAlive(false)
      if (!alive) {
        setFadeOut(true)
        setTimeout(() => {
          deleteNotification(id);
        }, 500)
      }
    }
  })

  useNuiEvent<any>('closeNotifyByCallID', (data) => {
    if (Number(data.callId) === calls.callId) {
      setAlive(false)
      if (!alive) {
        //setFadeOut(true)
        //setTimeout(() => {
        deleteNotification(id);
        //}, 500)
      }
    }
  })

  useNuiEvent<any>('updateNotifyByCallID', (data) => {
    if (Number(data.callId) === calls.callId) {
      //need to set disconnect state here
      setDisconnected(true)
      setContentState("Disconnected!") //dont do this at all, just dismiss the noti fully for both parties
      setTimeout(() => {
        setFadeOut(true)
        setTimeout(() => {
          setDisconnected(false)
          deleteNotification(id)
        }, 500)
      }, 500)
    }
  })

  const handleClick = (id) => {
    if (isCall) { return } //!calls.inactive makes you able to click active ones??
    if (isConfirmation) { return }
    if (isPerma) { return }
    setFadeOut(true)
    setTimeout(() => {
      deleteNotification(id)
    }, 500)
  }

  const handleConfirmationAccept = () => {
    fetchNui(confirmation.onAccept, { action: 'accept', _data: { confirmationId: confirmation.id } })
    setFadeOut(true)
    setTimeout(() => {
      deleteNotification(id)
    }, 500)
  }

  const handleConfirmationReject = () => {
    fetchNui(confirmation.onReject, { action: 'reject', _data: { confirmationId: confirmation.id } })
    setFadeOut(true)
    setTimeout(() => {
      deleteNotification(id)
    }, 500)
  }

  const handleCallAnswer = () => {
    fetchNui('cool-ui:callAccept', { callId: calls.callId }).then(resData => {
    })
  }

  const handleCallHangup = () => {//make it so, it toggles disconnected state if it matches receiver end?
    //fetchNui(confirmation.onReject, {action: 'reject', _data: {confirmationId: confirmation.id}})
    fetchNui('cool-ui:callEnd', { callId: calls.callId }).then(resData => {
      //setDisconnected(true)
      //setContentState("Disconnected!") //dont do this at all, just dismiss the noti fully for both parties
      //setTimeout(() => {
      //  setFadeOut(true)
      //  setTimeout(() => {
      //      setDisconnected(false)
      //      deleteNotification(id)
      //  }, 500)
      //}, 500)
    })
  }

  const handleCancelActivity = () => {
    //should close notify for all group members
    fetchNui('cancelActivity', { id: groupId })
  }

  return (
    <div id={id} className={fadeOut ? "notification-container notification-container-fade-out" : "notification-container "} onClick={() => handleClick(id)}>
      <div className="app-bar">
        <div className="icon" style={{ background: bgColor, color: iconColor }}>
          <i className={`${icon} fa-w-16 fa-fw fa-sm`} style={{ WebkitTextStrokeColor: 'black', WebkitTextStrokeWidth: '0.3px' }}></i>
        </div>
        <div className="name">
          <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{headerState}</Typography>
        </div>
        <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>just now</Typography>
      </div>
      <div className="content">
        <div className="text" style={{ display: isConfirmation || isCall && calls.progress ? 'none' : '' }}>
          <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{contentState}</Typography>
        </div>
        <div className="text" style={{ display: isConfirmation ? '' : 'none' }}>
          <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom><Countdown seconds={Number(confirmation.timeOut)} text={contentState} id={confirmation.id} callback={confirmation.onAccept} /></Typography>
        </div>
        <div className="text" style={{ display: isCall && calls.progress ? '' : 'none' }}>
          <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{disconnected ? contentState : <Stopwatch />}</Typography>
        </div>

        <div className="actions">
          <div className="action action-reject" style={{ display: isCall && calls.receive && !disconnected ? '' : 'none' }}>
            <Tooltip title="Hang Up" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px' }} arrow>
              <i onClick={handleCallHangup} className="fas fa-times-circle fa-w-16 fa-fw"></i>
            </Tooltip>
          </div>
          <div className="action action-accept" style={{ display: isCall && calls.receive && !disconnected ? '' : 'none' }}>
            <Tooltip title="Answer" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px' }} arrow>
              <i onClick={handleCallAnswer} className="fas fa-check-circle fa-w-16 fa-fw"></i>
            </Tooltip>
          </div>

          <div className="action action-reject" style={{ display: isCall && calls.dialing && !disconnected ? '' : 'none' }}>
            <Tooltip title="Hang Up" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px' }} arrow>
              <i onClick={handleCallHangup} className="fas fa-times-circle fa-w-16 fa-fw"></i>
            </Tooltip>
          </div>

          <div className="action action-reject" style={{ display: isCall && calls.progress && !disconnected ? '' : 'none' }}>
            <Tooltip title="Hang Up" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px' }} arrow>
              <i onClick={handleCallHangup} className="fas fa-times-circle fa-w-16 fa-fw"></i>
            </Tooltip>
          </div>

          <div className="action action-reject" style={{ display: isConfirmation ? '' : 'none' }}>
            <Tooltip title="Decline" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px' }} arrow>
              <i onClick={handleConfirmationReject} className="fas fa-times-circle fa-w-16 fa-fw"></i>
            </Tooltip>
          </div>
          <div className="action action-accept" style={{ display: isConfirmation ? '' : 'none' }}>
            <Tooltip title="Accept" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px' }} arrow>
              <i onClick={handleConfirmationAccept} className="fas fa-check-circle fa-w-16 fa-fw"></i>
            </Tooltip>
          </div>

          <div className="action action-reject" style={{ display: isPerma && cancelButton ? '' : 'none' }}>
            <Tooltip title="Cancel Activity" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px' }} arrow>
              <i onClick={handleCancelActivity} className="fas fa-times-circle fa-w-16 fa-fw"></i>
            </Tooltip>
          </div>

        </div>
      </div>
    </div>
  );
};