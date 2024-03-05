import React, { useState, useEffect } from 'react';
import '../../../index.css';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { fetchNui } from '../../../../utils/fetchNui';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import useStyles from "./information.styles";
import { isEnvBrowser } from '../../../../utils/misc';

const InformationApp: React.FC = () => {
  const classes = useStyles();

  const [infoData, setInfoData] = useState({
    cid: 0,
    bankid: 0,
    phonenumber: 0,
    cash: 0,
    bank: 0,
    casino: 0,
    licenses: [
      {
        type: "Drivers",
        status: true
      }
    ]
  })

  useEffect(() => {
    if (!isEnvBrowser()) {
      fetchNui('getInfoData', {}).then(resData => {
        setInfoData(resData)
      })
    }
  }, []);

  const formatPhoneNumber = (phoneNumberString) => {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumberString;
  }

  return (
    <>
      <div className="information-container" style={{ zIndex: 500 }}>
        <div className={classes.outerContainer}>

          <div className={classes.container}>
            <div className={classes.moneys}>
              <div>
                <Tooltip title="State ID" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px' }} arrow>
                  <>
                    <i className="fas fa-id-card fa-fw fa-2x" style={{ color: 'white' }}></i>
                    <Typography variant="h6" style={{ color: 'white', wordBreak: 'break-word' }}>{infoData.cid}</Typography>
                  </>
                </Tooltip>
              </div>
              <div>
                <Tooltip title="Bank Account ID" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px' }} arrow>
                  <>
                    <i className="fas fa-university fa-fw fa-2x" style={{ color: 'white' }}></i>
                    <Typography variant="h6" style={{ color: 'white', wordBreak: 'break-word' }}>{infoData.bankid}</Typography>
                  </>
                </Tooltip>
              </div>
              <div>
                <Tooltip title="Phone Number" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px' }} arrow>
                  <>
                    <i className="fas fa-mobile fa-fw fa-2x" style={{ color: 'white' }}></i>
                    <Typography variant="h6" style={{ color: 'white', wordBreak: 'break-word' }}>{formatPhoneNumber(infoData.phonenumber)}</Typography>
                  </>
                </Tooltip>
              </div>
              <div className="cash">
                <Tooltip className="cash" title="Wallet" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px' }} arrow>
                  <>
                    <i className="fas fa-wallet fa-fw fa-2x"></i>
                    <Typography variant="h6" style={{ color: 'white', wordBreak: 'break-word' }}>{infoData.cash.toLocaleString('en-Us', { style: 'currency', currency: 'USD' })}</Typography>
                  </>
                </Tooltip>
              </div>
              <div className="bank">
                <Tooltip className="bank" title="Personal Bank Balance" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px' }} arrow>
                  <>
                    <i className="fas fa-wallet fa-fw fa-2x"></i>
                    <Typography variant="h6" style={{ color: 'white', wordBreak: 'break-word' }}>{infoData.bank.toLocaleString('en-Us', { style: 'currency', currency: 'USD' })}</Typography>
                  </>
                </Tooltip>
              </div>
              <div className="casino">
                <Tooltip className="casino" title="Casino Balance" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWdith: '1000px' }} arrow>
                  <>
                    <i className="fas fa-dice-three fa-fw fa-2x"></i>
                    <Typography variant="h6" style={{ color: 'white', wordBreak: 'break-word' }}>{infoData.casino.toLocaleString('en-Us', { style: 'currency', currency: 'USD' })}</Typography>
                  </>
                </Tooltip>
              </div>
            </div>
            <div className={classes.licenses}>
              <Typography variant="h5" style={{ color: 'white', wordBreak: 'break-word' }}>Licenses</Typography>
              {infoData.licenses && infoData.licenses.length > 0 ? (
                infoData.licenses.map((license) => (
                  <div key={license.type} className={classes.license}>
                    <div style={{ flex: 1 }}>
                      <Typography variant="body1" style={{ color: 'white', wordBreak: 'break-word' }}>{license.type} License</Typography>
                    </div>
                    <div className={`icon icon-${license.status ? 'green' : 'red'}`} style={{ maxWidth: 60 }}>
                      <i className={`fas fa-${license.status ? 'check-circle' : 'times-circle'} fa-fw fa-lg`}></i>
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

export default InformationApp;