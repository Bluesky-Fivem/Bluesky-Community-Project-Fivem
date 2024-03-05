import React from 'react';
import '../../../index.css';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useNuiEvent } from "../../../../hooks/useNuiEvent";
import useStyles from "./documents.styles";

const DocumentsApp: React.FC = () => {
  const classes = useStyles();

  useNuiEvent<boolean>('closeApps', () => {
  })

  return (
    <>
      <div className={classes.documentsOuterContainer} style={{ zIndex: 500 }}>
        <div className={classes.documentsOuterContainer}>
          <div className="documents-container">
            <div className={classes.documentsSearch}>
              <div className={classes.documentsSearchWrapper}>
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
            <div className={classes.documentsIcon}>
              <div className={classes.documentsIconWrapper}>
                <Tooltip title="Create Document" placement="left" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                  <i style={{ fontSize: '1.2em' }} className="fas fa-edit fa-w-16 fa-fw fa-lg"></i>
                </Tooltip>
              </div>
            </div>

            <div className={classes.documentsSearch} style={{ paddingTop: '0px', paddingBottom: '0px', marginBottom: '0px' }}>
              <FormControl variant="standard" sx={{ width: '100%' }}>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Type"
                  defaultValue="notes"
                >
                  <MenuItem value="notes">Notes</MenuItem>
                  <MenuItem value="licenses">Licenses</MenuItem>
                  <MenuItem value="documents">Documents</MenuItem>
                  <MenuItem value="vehicleregistration">Vehicle Registration</MenuItem>
                  <MenuItem value="housingdocuments">Housing Documents</MenuItem>
                  <MenuItem value="contracts">Contracts</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className={classes.documentsDocs}>
              <div className="component-paper cursor-pointer" style={{ paddingBottom: '0.5%' }}>
                <div className="main-container">
                  <div className="details">
                    <div className="title">
                      <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>Test Document</Typography>
                    </div>
                  </div>
                  <div className="image" style={{ marginRight: '0px', marginTop: '0px' }}>
                    <i className="fas fa-edit fa-w-16 fa-fw fa-1x"></i>
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

export default DocumentsApp;