import React, { useState } from 'react';
import '../../../index.css';
import { useNuiEvent } from "../../../../hooks/useNuiEvent";
import { fetchNui } from '../../../../utils/fetchNui';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import { useRecoilValue } from 'recoil';
import { hasVPNState } from '../../../../atoms/activeAtom';
import useStyles from "./erpinger.style";

const PingerApp: React.FC = () => {
  const classes = useStyles();

  const [pingTarget, setPingTarget] = useState("")
  const vpn = useRecoilValue(hasVPNState)

  const updatePingTarget = (e: any) => {
    setPingTarget(e.target.value)
  }

  const handleSendPing = (isAnon: boolean) => {
    if (pingTarget === undefined || pingTarget === "") { return }
    fetchNui('sendPlayerPing', { target: pingTarget, anon: isAnon }).then(resData => {
      if (resData) {
        setPingTarget("")
      }
    })
  }

  useNuiEvent<boolean>('closeApps', () => {
    setPingTarget("")
  })

  return (
    <>
      <div className={classes.erpingerOuterContainer} style={{ zIndex: 500 }}>
        <div className={classes.erpingerInnerContainer}>
          <div className="erpinger-container">
            <div className={classes.erpingerHeader}>
              <Typography style={{ color: '#fff', wordBreak: 'break-word', textAlign: 'center', position: 'relative', top: '15%' }} variant="h6" gutterBottom>🍆 eRPinger 🍑</Typography>
            </div>
            <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <TextField
                id="input-with-icon-textfield"
                label="Paypal ID"
                onChange={updatePingTarget}
                value={pingTarget}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <i className="fas fa-id-card"></i>
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
            </div>
            <div style={{ position: 'absolute', top: '28%', left: '48.2%', transform: 'translate(-50%, -50%)' }}>
              <Button sx={{ width: '107.92%' }} onClick={() => handleSendPing(false)} variant="contained" color="info" size="medium" startIcon={<i className="fas fa-map-pin"></i>}>
                Send Ping
              </Button>
            </div>
            <div style={{ display: vpn ? '' : 'none', position: 'absolute', top: '35%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <Button onClick={() => handleSendPing(true)} variant="contained" color="info" size="medium" startIcon={<i className="fas fa-user-secret"></i>}>
                Anon Ping
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PingerApp;