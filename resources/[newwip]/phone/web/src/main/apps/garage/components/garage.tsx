import React, { useState, useEffect } from 'react';
import '../../../index.css';
import { fetchNui } from '../../../../utils/fetchNui';
import Vehicle from './vehicle';
import AppContainer from '../../../components/app-container';
import useStyles from './garage.styles';
import { useRecoilState } from 'recoil';
import { sellModalState, sellPlateState, sellPriceState, sellStateIdState } from '../../../../atoms/activeAtom';
import { useNuiEvent } from '../../../../hooks/useNuiEvent';
import { Checkmark } from 'react-checkmark';
import { Button, FormControl, InputAdornment, TextField } from '@mui/material';

const GarageApp: React.FC = () => {
  const classes = useStyles();

  const [vehicleData, setVehicleData] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);

  const [sellModal, setSellModal] = useRecoilState(sellModalState);
  const [sellStateId, setSellStateId] = useRecoilState(sellStateIdState);
  const [sellPrice, setSellPrice] = useRecoilState(sellPriceState);
  const [sellPlate, setSellPlate] = useRecoilState(sellPlateState);

  const [isLoading, setLoading] = useState(false)
  const [checkmark, setCheckmark] = useState(false)
  const [preparing, setPreparing] = useState(false)

  useEffect(() => {
    fetchNui('pnp-ui:getCars', {}).then(resData => {
      setVehicleData(resData.data)
      setFilteredVehicles(resData.data)
    })
  }, []);

  useNuiEvent<boolean>('closeApps', () => {
    setSellModal(false)
    setLoading(false)
    setCheckmark(false)
    setPreparing(false)
  })

  const handleSellCar = () => {
    setLoading(true)
    setPreparing(true)
    console.log("sellStateId", sellStateId)
    console.log("sellPrice", sellPrice)
    console.log("sellPlate", sellPlate)
    fetchNui('pnp-ui:carActionSell', { car: { plate: sellPlate }, stateId: sellStateId, price: sellPrice }).then(resData => {
      setLoading(false)
      setCheckmark(true)
      setTimeout(() => {
        setCheckmark(false)
        setSellModal(false)
        setPreparing(false)
      }, 1000)
    })
  }

  const primaryActions: any = [];

  return (
    <>
      <AppContainer
        emptyMessage={filteredVehicles.length === 0}
        primaryActions={primaryActions}
        search={{
          filter: ['model', 'plate'],
          list: vehicleData,
          onChange: setFilteredVehicles,
        }}
      >
      <div className={classes.garageSellCarModalContainer} style={{ display: sellModal ? '' : 'none' }}>
        <div className={classes.garageSellCarModalInnerContainer}>
          <div className="spinner-wrapper" style={{ display: isLoading ? '' : 'none' }}>
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
          <div className="spinner-wrapper" style={{ display: checkmark ? '' : 'none' }}>
            <Checkmark size="56px" color='#009688' />
          </div>
          <div className="component-simple-form" style={{ display: isLoading || preparing ? 'none' : '' }}>
            <div>
              <div className="input-wrapper">
                <FormControl fullWidth sx={{ width: '100%' }}>
                  <TextField
                    className={classes.input}
                    id="input-with-icon-textfield"
                    type="number"
                    label="State ID"
                    variant="standard"
                    onChange={(e) => setSellStateId(parseInt(e.target.value))}
                    value={sellStateId}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <i className="fas fa-id-card"></i>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </div>
            </div>
            <div>
              <div className="input-wrapper">
                <FormControl fullWidth sx={{ width: '100%' }}>
                  <TextField
                    className={classes.input}
                    id="input-with-icon-textfield"
                    type="number"
                    label="Price"
                    variant="standard"
                    onChange={(e) => setSellPrice(parseInt(e.target.value))}
                    value={sellPrice}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <i className="fas fa-dollar-sign"></i>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </div>
            </div>
            <div className="buttons">
              <div>
                <Button onClick={() => setSellModal(false)} size="small" color="warning" variant="contained">Cancel</Button>
              </div>
              <div>
                <Button onClick={handleSellCar} size="small" color="success" variant="contained">Submit</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
        {filteredVehicles && filteredVehicles.length > 0 ? (
          filteredVehicles.map((vehicle, index) => (
            <Vehicle key={index} vin={vehicle.vin} plate={vehicle.plate} model={vehicle.model} state={vehicle.state} garage={vehicle.garage} type={vehicle.type} spawnable={vehicle.spawnable} location={vehicle.location} damage={vehicle.damage} />
          ))
        ) : (
          <>
          </>
        )}
      </AppContainer>
    </>
  );
}

export default GarageApp;