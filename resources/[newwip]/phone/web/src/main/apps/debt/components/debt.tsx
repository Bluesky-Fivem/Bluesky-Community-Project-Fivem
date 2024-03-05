import React from 'react';
import '../../../index.css';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import useStyles from "./debt.styles";

const DebtApp: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.debtOuterContainer} style={{ zIndex: 500 }}>
        <div className={classes.debtInnerContainer}>
          <div className="debt-container">
            <div className={classes.debtSearch}>
              <div className={classes.debtSearchWrapper}>
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
            <div className={classes.debtIcon}>
              <div className={classes.debtIconWrapper}>
                <Tooltip title="Pay Loan" placement="left" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                  <i style={{ fontSize: '1.2em' }} className="fas fa-donate fa-w-16 fa-fw fa-lg"></i>
                </Tooltip>
              </div>
            </div>

            <div className={classes.debtWrapper}>
              <div className={classes.debtFees}>
                <Typography style={{ color: '#fff', wordBreak: 'break-word', marginTop: '5px' }} variant="body1" gutterBottom>Maintenance Fees</Typography>
                <div className="component-paper cursor-pointer">
                  <div className="main-container">
                    <div className="image">
                      <i className="fas fa-car fa-w-16 fa-fw fa-3x"></i>
                    </div>
                    <div className="details">
                      <div className="title">
                        <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>$670,000.00</Typography>
                      </div>
                      <div className="description">
                        <div className="flex-row">
                          <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>Vehicles</Typography>
                        </div>
                      </div>
                    </div>
                    <div className="actions">
                    </div>
                  </div>
                </div>
              </div>


              <div className={classes.debtLoans}>
                <Typography style={{ color: '#fff', wordBreak: 'break-word', marginTop: '5px' }} variant="body1" gutterBottom>Loans</Typography>
                <div className="component-paper cursor-pointer">
                  <div className="main-container">
                    <div className="image">
                      <i className="fas fa-file-invoice-dollar fa-w-16 fa-fw fa-3x"></i>
                    </div>
                    <div className="details">
                      <div className="title">
                        <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>Diamond Hand Credit</Typography>
                      </div>
                      <div className="description">
                        <div className="flex-row">
                          <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>$547,800.00</Typography>
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
      </div>
    </>
  );
}

export default DebtApp;