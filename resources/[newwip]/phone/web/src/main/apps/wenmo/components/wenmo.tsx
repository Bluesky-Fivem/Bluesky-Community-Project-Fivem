import React from 'react';
import '../../../index.css';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import useStyles from "./wenmo.styles";

const WenmoApp: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.wenmoOuterContainer} style={{ zIndex: 500 }}>
        <div className={classes.wenmoInnerContainer}>
          <div className="wenmo-container">
            <div className={classes.wenmoSearch}>
              <div className={classes.wenmoSearchWrapper}>
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
            <div className={classes.wenmoIcon}>
              <div className={classes.wenmoIconWrapper}>
                <Tooltip title="Send Money" placement="left" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                  <i style={{ fontSize: '1.2em' }} className="fas fa-hand-holding-usd fa-w-16 fa-fw fa-lg"></i>
                </Tooltip>
              </div>
            </div>
            <div className={classes.wenmoLogs}>
              <Typography style={{ color: '#fff', wordBreak: 'break-word', marginTop: '5px' }} variant="body1" gutterBottom>Transfers</Typography>
              <div className="component-paper cursor-pointer">
                <div className="main-container">
                  <div className="details">
                    <div className="description">
                      <div className="flex-row" style={{ justifyContent: 'space-between' }}>
                        <Typography style={{ color: '#8afc88', wordBreak: 'break-word' }} variant="body2" gutterBottom>$2,200.00</Typography>
                        <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>Jerry Padel</Typography>
                      </div>
                      <div className="flex-row" style={{ justifyContent: 'flex-end' }}>
                        <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>12 minutes ago</Typography>
                      </div>
                    </div>
                  </div>
                  <div className="actions">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WenmoApp;