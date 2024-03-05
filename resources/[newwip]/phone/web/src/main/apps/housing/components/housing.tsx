import React, { useState, useEffect } from 'react';
import '../../../index.css';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { useRecoilState } from 'recoil';
import { activeHoverIdState, editDataState, editModeState } from '../../../../atoms/activeAtom';
import { Checkmark } from 'react-checkmark';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { fetchNui } from '../../../../utils/fetchNui';
import { useNuiEvent } from "../../../../hooks/useNuiEvent";
import useStyles from "./housing.styles";
import { Divider, FormControl, InputAdornment, TextField } from '@mui/material';
import Input from '../../../components/input/input';

const HousingApp: React.FC = () => {
  const classes = useStyles();

  const [hoverId, setHoverId] = useRecoilState(activeHoverIdState) // why in tarnation is this a global state?
  const [isLoading, setLoading] = useState(false)
  const [checkmark, setCheckmark] = useState(false)
  const [preparing, setPreparing] = useState(false)
  const [roomNumber, setRoomNumber] = useState(0)
  const [roomType, setRoomType] = useState("")
  const [housingOwned, setHousingOwned] = useState([])
  const [housingAccess, setHousingAccess] = useState([])
  const [availableRooms, setAvailabeRooms] = useState([])
  const [foundHousing, setFoundHousing] = useState(false)
  const [nothingFound, setNothingFound] = useState(false)
  const [keysModal, setKeysModal] = useState(false)
  const [foundHousingName, setFoundHousingName] = useState("") //need to clear this when closing app
  const [foundHousingCat, setFoundHousingCat] = useState("") //need to clear this when closing app
  const [foundHousingPrice, setFoundHousingPrice] = useState(0) //need to clear this when closing app
  const [foundHousingIsOwned, setFoundHousingIsOwned] = useState(false) //need to clear this when closing app
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [editMode, setEditMode] = useRecoilState(editModeState)
  const [editData, setEditData] = useRecoilState<any>(editDataState)

  useEffect(() => {
    fetchNui('getHousingData', {}).then(resData => {
      setHousingOwned(resData.owned)
      setHousingAccess(resData.access)
      setAvailabeRooms(resData.available)
      setRoomNumber(resData.roomNumber)
      setRoomType(resData.roomType)
    })
  }, []);

  const closeHousingFoundModal = () => {
    setFoundHousing(false)
    setShowError(false)
  }

  const handleHousingPurchase = () => {
    setLoading(true)
    setPreparing(true)
    fetchNui('purchaseHousing', {}).then(resData => {
      if (resData.success === true) {
        setHousingOwned(resData.owned)
        setTimeout(() => {
          setLoading(false)
          setCheckmark(true)
          setTimeout(() => {
            setCheckmark(false)
            setFoundHousing(false)
            setPreparing(false)
          }, 1500)
        }, 500)
      } else {
        setLoading(false)
        setPreparing(false)
        setErrorMessage(resData.owned)
        setShowError(true)
      }
    })
  }

  const closeNothingFoundModal = () => {
    setNothingFound(false)
  }

  const [housingTab, setHousingTab] = React.useState(0);

  const handleHousingTab = (event, newValue) => {
    setHousingTab(newValue);
  };

  const handleHoverActive = (e: any) => {
    setHoverId(e.currentTarget.id)
  }

  const handleHoverNotActive = () => {
    setHoverId("")
  }

  const handleCheckLocation = () => {
    fetchNui('checkLocation', {}).then(resData => {
      if (resData.foundHouse === true) {
        setFoundHousing(true)
        setFoundHousingName(resData.foundHouseName)
        setFoundHousingCat(resData.foundHouseCategory)
        setFoundHousingPrice(resData.foundHousePrice)
        setFoundHousingIsOwned(resData.foundHouseIsOwned)
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
        }, 500)
      } else {
        setNothingFound(true)
      }
    })
  }

  const handleHousingLocks = (e: any, action) => {
    fetchNui('manageHousingLocks', { id: e.currentTarget.id, action: action }).then(resData => {
      setHousingOwned([])
      setHousingAccess([])
      setHousingOwned(resData.owned)
      setHousingAccess(resData.access)
    })
  }

  const handleHousingGps = (e: any) => {
    fetchNui('setHousingGps', { id: e.currentTarget.id })
  }

  const handleEditMode = (enabled: boolean, propertyId?: string) => {
    console.log("handleEditMode")
    //fetches everything from housing, and shows buttons accordingly
    //when edit mode is true, everything on the property tab hides

    setCheckmark(false)
    setShowError(false)
    setErrorMessage("")

    setFoundHousing(true)
    setLoading(true)
    setPreparing(true)
    setTimeout(() => {
      if(enabled) {
        fetchNui('enterEditMode', {id: propertyId}).then(resData => {
          console.log("enterEditMode", resData)
          if (resData.meta.ok === true) {
            setFoundHousing(false)
            setLoading(false)
            setPreparing(false)
            setEditMode(true)
            setEditData(resData.data)
          } else {
            setLoading(false)
            setPreparing(false)
            setErrorMessage(resData.meta.message)
            setShowError(true)
            setEditData({})
          }
        })
        // setFoundHousing(false)
        // setLoading(false)
        // setPreparing(false)
        // setEditMode(true)
      } else {
        fetchNui('exitEditMode', {id: propertyId}).then(resData => {
          console.log("exitEditMode", resData)
          if (resData.meta.ok === true) {
            setFoundHousing(false)
            setLoading(false)
            setPreparing(false)
            setEditMode(false)
            setEditData({})
          } else {
            setLoading(false)
            setPreparing(false)
            setErrorMessage(resData.meta.message)
            setShowError(true)
            setEditData({})
          }
        })
      }
    }, 500)
  }

  useNuiEvent<boolean>('closeApps', () => {
    setNothingFound(false)
    setFoundHousing(false)
    setFoundHousingIsOwned(false)
    setKeysModal(false)
    setLoading(false)
    setPreparing(false)
    setCheckmark(false)
    setShowError(false)
    setErrorMessage("")
  })

  return (
    <>
      <div className={classes.housingFoundModalContainer} style={{ display: foundHousing ? '' : 'none' }}>
        <div className={classes.housingFoundModalInnerContainer}>
          <div className="spinner-wrapper" style={{ display: isLoading ? '' : 'none' }}>
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
          <div className="spinner-wrapper" style={{ display: checkmark ? '' : 'none' }}>
            <Checkmark size="56px" color='#009688' />
          </div>
          <div className="component-simple-form" style={{ display: isLoading || preparing ? 'none' : '' }}>
            <div style={{ justifyContent: 'center', marginBottom: '10px', display: showError ? '' : 'none' }}>
              <i className="fas fa-exclamation fa-2x" style={{ color: '#ffa726' }}></i>
            </div>
            <div style={{ justifyContent: 'center', display: showError ? '' : 'none' }}>
              <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{errorMessage}</Typography>
            </div>
            <div style={{ justifyContent: 'center' }}>
              <Typography style={{ color: '#fff', wordBreak: 'break-word', display: showError ? 'none' : '' }} variant="body2">Name: {foundHousingName}</Typography>
            </div>
            <div style={{ justifyContent: 'center' }}>
              <Typography style={{ color: '#fff', wordBreak: 'break-word', display: showError ? 'none' : '' }} variant="body2">Category: {foundHousingCat}</Typography>
            </div>
            <div style={{ justifyContent: 'center' }}>
              <Typography style={{ color: '#fff', wordBreak: 'break-word', display: showError ? 'none' : '' }} variant="body2">Price: {foundHousingPrice.toLocaleString('en-Us', { style: 'currency', currency: 'USD' })}</Typography>
            </div>
            <div style={{ justifyContent: 'center' }}>
              <Typography style={{ color: '#fff', wordBreak: 'break-word', display: foundHousingIsOwned ? '' : 'none' }} variant="body2">Already Owned</Typography>
            </div>
            <div className="buttons" style={{ justifyContent: showError || foundHousingIsOwned ? 'center' : '' }}>
              <div>
                <Button onClick={closeHousingFoundModal} size="small" color={showError ? "success" : "warning"} variant="contained">{showError ? 'Okay' : 'Cancel'}</Button>
              </div>
              <div style={{ display: showError || foundHousingIsOwned ? 'none' : '' }}>
                <Button onClick={handleHousingPurchase} size="small" color="success" variant="contained">Purchase</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.housingNothingFoundModalContainer} style={{ display: nothingFound ? '' : 'none' }}>
        <div className={classes.housingNothingFoundModalInnerContainer}>
          <div className="spinner-wrapper" style={{ display: isLoading ? '' : 'none' }}>
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
          <div className="spinner-wrapper" style={{ display: checkmark ? '' : 'none' }}>
            <Checkmark size="56px" color='#009688' />
          </div>
          <div className="component-simple-form" style={{ display: preparing ? 'none' : '' }}>
            <div style={{ justifyContent: 'center', marginBottom: '10px' }}>
              <i className="fas fa-exclamation fa-2x" style={{ color: '#ffa726' }}></i>
            </div>
            <div style={{ justifyContent: 'center' }}>
              <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>No property found</Typography>
            </div>
            <div className="buttons" style={{ justifyContent: 'center' }}>
              <div>
                <Button onClick={closeNothingFoundModal} size="small" color="success" variant="contained">Okay</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.housingKeysModalContainer} style={{ display: keysModal ? '' : 'none' }}>
        <div className={classes.housingKeysModalInnerContainer}>
          <div className="spinner-wrapper" style={{ display: isLoading ? '' : 'none' }}>
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
          <div className="spinner-wrapper" style={{ display: checkmark ? '' : 'none' }}>
            <Checkmark size="56px" color='#009688' />
          </div>
          <div className="component-simple-form" style={{ display: isLoading || preparing ? 'none' : '' }}>
            <div style={{ justifyContent: 'center', marginBottom: '10px', display: showError ? '' : 'none' }}>
              <i className="fas fa-exclamation fa-2x" style={{ color: '#ffa726' }}></i>
            </div>
            <div style={{ justifyContent: 'center', display: showError ? '' : 'none' }}>
              <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{errorMessage}</Typography>
            </div>
            <div style={{ display: showError ? 'none' : '' }}>
              <div className="input-wrapper">
                <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body1" gutterBottom>Add:</Typography>
                <FormControl fullWidth sx={{ width: '100%' }}>
                  <TextField
                    id="input-with-icon-textfield"
                    label="State ID"
                    variant="standard"
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
            <div className="buttons" style={{ justifyContent: showError ? 'center' : '' }}>
              <div>
                <Button onClick={() => setKeysModal(false)} size="small" color="warning" variant="contained">{showError ? 'Close' : 'Cancel'}</Button>
              </div>
              <div style={{ display: showError ? 'none' : '' }}>
                <Button onClick={() => setKeysModal(false)} size="small" color="success" variant="contained">Submit</Button>
              </div>
            </div>
          </div>
          <div className="component-simple-form" style={{ display: isLoading || preparing ? 'none' : '' }}>
            <Divider variant="fullWidth" sx={{borderColor: 'rgba(255, 255, 255, 255)', paddingTop: '5%', paddingBottom: '5%'}} />
            <div style={{ justifyContent: 'center', marginBottom: '10px', display: showError ? '' : 'none' }}>
              <i className="fas fa-exclamation fa-2x" style={{ color: '#ffa726' }}></i>
            </div>
            <div style={{ justifyContent: 'center', display: showError ? '' : 'none' }}>
              <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{errorMessage}</Typography>
            </div>
            <div style={{ display: showError ? 'none' : '' }}>
              <div className="input-wrapper">
                <Input.Select
                  label="Remove"
                  value={""}
                  onChange={v => {}}
                  items={[
                    { id: '1', name: 'Kevin Malagnaggi'}
                  ]} 
                />
              </div>
            </div>
            <div className="buttons" style={{ justifyContent: showError ? 'center' : '' }}>
              <div>
                <Button onClick={() => setKeysModal(false)} size="small" color="warning" variant="contained">{showError ? 'Close' : 'Cancel'}</Button>
              </div>
              <div style={{ display: showError ? 'none' : '' }}>
                <Button onClick={() => setKeysModal(false)} size="small" color="success" variant="contained">Submit</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.housingOuterContainer} style={{ zIndex: 500 }}>
        <div className={classes.housingInnerContainer}>
          <div className="housing-container">
            <div className={classes.housingSearch}>
              <div className={classes.housingSearchWrapper}>
                <Tabs centered variant="fullWidth" value={housingTab} onChange={handleHousingTab} aria-label="icon tabs example">
                  <Tab icon={<i className="fas fa-house-user fa-lg" />} aria-label="apartments" />
                  <Tab icon={<i className="fas fa-building fa-lg" />} aria-label="properties" />
                </Tabs>
              </div>
            </div>
            <div className={classes.housingIcon}>
              <div className={classes.housingIconWrapper}>
              </div>
            </div>
            <div className={classes.housingUpgrades} style={{ height: '17.4%', display: housingTab === 0 ? '' : 'none' }}>
              <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body1" gutterBottom>Current</Typography>
              <div className="component-paper cursor-pointer">
                <div className="main-container">
                  <div className="image">
                    <i className="fas fa-house-user fa-w-16 fa-fw fa-3x"></i>
                  </div>
                  <div className="details">
                    <div className="title">
                      <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>Room: {roomNumber}</Typography>
                    </div>
                    <div className="description">
                      <div className="flex-row">
                        <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{roomType}</Typography>
                      </div>
                    </div>
                  </div>
                  <div className="actions">
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.housingUpgrades} style={{ display: housingTab === 0 ? '' : 'none' }}>
              <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body1" gutterBottom>Available</Typography>
              {availableRooms.length && availableRooms.map((room) => (
                <div id={room.id} className="component-paper cursor-pointer" onMouseEnter={handleHoverActive} onMouseLeave={handleHoverNotActive}>
                  <div className="main-container">
                    <div className="image">
                      <i className="fas fa-home fa-w-16 fa-fw fa-3x"></i>
                    </div>
                    <div className="details">
                      <div className="title">
                        <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{room.price.toLocaleString('en-Us', { style: 'currency', currency: 'USD' })}</Typography>
                      </div>
                      <div className="description">
                        <div className="flex-row">
                          <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{room.name}</Typography>
                        </div>
                      </div>
                    </div>
                    <div className={hoverId.toString() === room.id.toString() ? "actions actions-show" : "actions"}>
                      <Tooltip title="Upgrade" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                        <div>
                          <i id={room.id} className="fas fa-dollar-sign fa-w-16 fa-fw fa-lg"></i>
                        </div>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={classes.housingButtons} style={{ display: housingTab === 1 ? '' : 'none' }}>
              <Button onClick={handleCheckLocation} style={{ display: editMode ? 'none' : '' }} size="small" color="success" variant="contained">View Current Location</Button>
              <Button onClick={() => handleEditMode(false)} style={{ display: editMode ? '' : 'none' }} size="small" color="success" variant="contained">Leave Edit Mode</Button>
            </div>
            <div style={{ display: housingTab === 1 && editMode ? '' : 'none', width: '100%', marginBottom: '1vh' }}>
              <Divider variant="middle" sx={{borderColor: 'rgba(255, 255, 255, 255)'}} />
            </div>
            <div style={{ display: housingTab === 1 && editMode ? 'flex' : 'none', width: '100%', flexDirection: 'column' }}>
              <div style={{ display: editData.garage ? 'flex' : 'none', justifyContent: 'center', marginBottom: '1vh' }}>
                <Button size="small" color="success" variant="contained">Place Garage Here</Button>
              </div>
              <div style={{ display: editData.stash ? 'flex' : 'none', justifyContent: 'center', marginBottom: '1vh' }}>
                <Button size="small" color="success" variant="contained">Place Stash Here</Button>
              </div>
              <div style={{ display: editData.backdoor ? 'flex' : 'none', justifyContent: 'center', marginBottom: '1vh' }}>
                <Button size="small" color="success" variant="contained">Place Backdoor Here</Button>
              </div>
              <div style={{ display: editData.wardrobe ? 'flex' : 'none', justifyContent: 'center', marginBottom: '1vh' }}>
                <Button size="small" color="success" variant="contained">Place Wardrobe Here</Button>
              </div>
              <div style={{ display: editData.furniture ? 'flex' : 'none', justifyContent: 'center', marginBottom: '1vh' }}>
                <Button size="small" color="success" variant="contained">Open Furniture</Button>
              </div>
            </div>
            <div className={classes.housingUpgrades} style={{ height: 'fit-content', display: housingTab === 1 && !editMode ? '' : 'none' }} onMouseEnter={handleHoverActive} onMouseLeave={handleHoverNotActive}>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <Button size="small" color="success" variant="contained"><i className="fas fa-edit" style={{color: '#000'}}></i></Button>
              </div>
              <Typography style={{ display: housingOwned.length > 0 && !editMode ? '' : 'none', color: '#fff', wordBreak: 'break-word', marginTop: '5px' }} variant="body1" gutterBottom>Owned</Typography>
              {housingOwned && housingOwned.length > 0 && !editMode ? (
                housingOwned.map((owned) => (
                  <div id={owned.property_id} className="component-paper cursor-pointer" onMouseEnter={handleHoverActive} onMouseLeave={handleHoverNotActive}>
                    <div className="main-container">
                      <div className="image">
                        <i className={`fas ${owned.category === 'warehouse' ? 'fa-warehouse' : 'fa-home'} fa-w-16 fa-fw fa-3x`}></i>
                      </div>
                      <div className="details">
                        <div className="title">
                          <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{owned.propertyname}</Typography>
                        </div>
                        <div className="description">
                          <div className="flex-row">
                            <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{owned.category === 'warehouse' ? 'warehouse' : 'housing'}</Typography>
                          </div>
                        </div>
                      </div>
                      <div className={hoverId.toString() === owned.property_id.toString() ? "actions actions-show" : "actions"}>
                        <Tooltip title="Set GPS" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                          <div>
                            <i id={owned.property_id} onClick={(e) => handleHousingGps(e)} className="fas fa-map-marked fa-w-16 fa-fw fa-lg"></i>
                          </div>
                        </Tooltip>
                        <Tooltip title={owned.locked ? "Unlock" : "Lock"} placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                          <div>
                            <i id={owned.property_id} onClick={(e) => handleHousingLocks(e, owned.locked ? 'unlock' : 'lock')} className={`fas ${owned.locked ? "fa-lock" : "fa-lock-open"} fa-w-16 fa-fw fa-lg`}></i>
                          </div>
                        </Tooltip>
                        <Tooltip title="Edit Property" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                          <div>
                            <i onClick={() => handleEditMode(true, owned.property_id)} className="fas fa-edit fa-w-16 fa-fw fa-lg"></i>
                          </div>
                        </Tooltip>
                        <Tooltip title="Keys" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                          <div>
                            <i onClick={() => setKeysModal(true)} className="fas fa-key fa-w-16 fa-fw fa-lg"></i>
                          </div>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <>
                </>
              )}
            </div>

            <div className={classes.housingUpgrades} style={{ display: housingTab === 1 ? '' : 'none' }}>
              <div style={{ marginTop: '5px' }}>
                <Typography style={{ display: housingAccess.length > 0 && !editMode ? '' : 'none', color: '#fff', wordBreak: 'break-word' }} variant="body1" gutterBottom>Access</Typography>
              </div>
              {housingAccess && housingAccess.length > 0 && !editMode ? (
                housingAccess.map((access) => (
                  <div id={access.property_id} className="component-paper cursor-pointer" onMouseEnter={handleHoverActive} onMouseLeave={handleHoverNotActive}>
                    <div className="main-container">
                      <div className="image">
                        <i className={`fas ${access.category === 'warehouse' ? 'fa-warehouse' : 'fa-home'} fa-w-16 fa-fw fa-3x`}></i>
                      </div>
                      <div className="details">
                        <div className="title">
                          <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{access.propertyname}</Typography>
                        </div>
                        <div className="description">
                          <div className="flex-row">
                            <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{access.category === 'warehouse' ? 'warehouse' : 'housing'}</Typography>
                          </div>
                        </div>
                      </div>
                      <div className={hoverId.toString() === access.property_id.toString() ? "actions actions-show" : "actions"}>
                        <Tooltip title="Set GPS" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                          <div>
                            <i id={access.property_id} onClick={(e) => handleHousingGps(e)} className="fas fa-map-marked fa-w-16 fa-fw fa-lg"></i>
                          </div>
                        </Tooltip>
                        <Tooltip title={access.locked ? "Unlock" : "Lock"} placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                          <div>
                            <i id={access.property_id} onClick={(e) => handleHousingLocks(e, access.locked ? 'unlock' : 'lock')} className={`fas ${access.locked ? "fa-lock" : "fa-lock-open"} fa-w-16 fa-fw fa-lg`}></i>
                          </div>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <>
                </>
              )}

            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default HousingApp;