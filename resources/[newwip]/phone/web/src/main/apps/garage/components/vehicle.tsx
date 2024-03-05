import React, { useState } from 'react';
import '../../../index.css';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import { fetchNui } from '../../../../utils/fetchNui';
import { useRecoilState } from 'recoil';
import { sellModalState, sellPlateState } from '../../../../atoms/activeAtom';

const Vehicle: React.FC<VehicleProps> = (props) => {
  const [expanded, setExpanded] = useState(false)
  const [sellModal, setSellModal] = useRecoilState(sellModalState);
  const [sellPlate, setSellPlate] = useRecoilState(sellPlateState);

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleTrackCar = (e: any) => {
    e.stopPropagation();
    fetchNui('pnp-ui:carActionTrack', { car: { location: props.location } })
  }

  const handleSpawnCar = (e: any) => {
    e.stopPropagation();
    fetchNui('pnp-ui:carActionSpawn', { car: { vin: props.vin, plate: props.plate, location: props.location, model: props.model } })
  }

  const handleSellCar = (e: any) => {
    e.stopPropagation();
    //fetchNui('pnp-ui:carActionSell', { car: { plate: props.plate } })
    setSellModal(true)
    setSellPlate(props.plate)
  }

  const engineDamage = JSON.parse(props.damage).engine / 1000 * 100;
  const bodyDamage = JSON.parse(props.damage).body / 1000 * 100;

  return (
    <>
      <div className="component-paper cursor-pointer" onClick={handleExpandClick}>
        <div className="main-container">
          <div className="image">
            <i className={`fas fa-${props.type} fa-w-16 fa-fw fa-3x`}></i>
          </div>
          <div className="details">
            <div className="title">
              <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{props.plate}</Typography>
            </div>
            <div className="description">
              <div className="flex-row">
                <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{props.model}</Typography>
              </div>
            </div>
          </div>
          <div className="actions">
          </div>
          <div className="image">
            <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{props.state}</Typography>
          </div>
        </div>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <FormControl sx={{ width: '85%', marginLeft: '7.5%', marginBottom: '1.5%' }}>
            <TextField
              id="input-with-icon-textfield"
              variant="standard"
              value={props.garage}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <i className="fas fa-map-marker-alt"></i>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl sx={{ width: '85%', marginLeft: '7.5%', marginBottom: '1.5%' }}>
            <TextField
              id="input-with-icon-textfield"
              variant="standard"
              value={props.plate}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <i className="fas fa-closed-captioning"></i>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl sx={{ width: '85%', marginLeft: '7.5%', marginBottom: '1.5%' }}>
            <TextField
              id="input-with-icon-textfield"
              variant="standard"
              value={`${engineDamage}%`}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <i className="fas fa-oil-can"></i>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl sx={{ width: '85%', marginLeft: '7.5%', marginBottom: '1.5%' }}>
            <TextField
              id="input-with-icon-textfield"
              variant="standard"
              value={`${bodyDamage}%`}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <i className="fas fa-car-crash"></i>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <div className="buttons" style={{ display: 'flex', justifyContent: 'center', marginTop: '1%' }}>
            <Stack direction="row" spacing={2}>
              <Button id={props.plate} onClick={(e) => handleTrackCar(e)} size="small" color="success" variant="contained">Track</Button>
              <Button id={props.plate} onClick={(e) => handleSpawnCar(e)} size="small" color="success" variant="contained" style={{display: props.spawnable ? '' : 'none'}}>Spawn</Button>
              <Button id={props.plate} onClick={(e) => handleSellCar(e)} size="small" color="error" variant="contained" style={{display: props.state === "Out" ? '' : 'none'}}>Sell</Button>
            </Stack>
          </div>
        </Collapse>
      </div>
    </>
  )
}

export default Vehicle