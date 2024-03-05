import React, { useState, useEffect } from 'react';
import '../../../index.css';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { useRecoilValue, useRecoilState } from 'recoil';
import { cryptoIdState, exchangeModalState, purchaseModalState } from '../../../../atoms/activeAtom';
import { Checkmark } from 'react-checkmark';
import Button from '@mui/material/Button';
import { fetchNui } from '../../../../utils/fetchNui';
import { useNuiEvent } from "../../../../hooks/useNuiEvent";
import useStyles from "./crypto.styles";
import Dropdown from './dropdown';
import AppContainer from '../../../components/app-container';

const CryptoApp: React.FC = () => {
  const classes = useStyles();

  const [cryptoData, setCryptoData] = useState([])
  const [filteredCryptos, setFilteredCryptos] = useState([]);
  const [cryptoBuyAmount, setCryptoBuyAmount] = useState("")
  const [cryptoExchangeNumber, setCryptoExchangeNumber] = useState("")
  const [cryptoExchangeAmount, setCryptoExchangeAmount] = useState("")
  const cryptoPurchaseModal = useRecoilValue(purchaseModalState);
  const [purchaseModal, setPurchaseModal] = useRecoilState(purchaseModalState)
  const cryptoExchangeModal = useRecoilValue(exchangeModalState);
  const [exchangeModal, setExchangeModal] = useRecoilState(exchangeModalState)
  const cryptoExchangeId = useRecoilValue(cryptoIdState);
  const [isLoading, setLoading] = useState(false)
  const [checkmark, setCheckmark] = useState(false)
  const [preparing, setPreparing] = useState(false)
  const [showError, setShowError] = useState(false)
  const [validation, setValidation] = useState(false)
  const [phoneNrValidate, setPhoneNrValidate] = useState(false)
  const [amountValidate, setAmountValidate] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    fetchNui('getCryptoData', {}).then(resData => {
      setCryptoData(resData)
      setFilteredCryptos(resData)
    })
  }, []);

  const searchCryptos = (searchValue) => {
    if (searchValue !== '') {
      const filteredCryptos = cryptoData.filter((item) => {
        return item.name.toLowerCase().startsWith(searchValue.toLowerCase());
      })
      setFilteredCryptos(filteredCryptos)
    } else {
      setFilteredCryptos(cryptoData)
    }
  }

  const closeCryptoPurchaseModal = () => {
    setPurchaseModal(false)
    setShowError(false)
    setValidation(false)
    setAmountValidate(false)
    setCryptoBuyAmount("")
  }

  const closeCryptoExchangeModal = () => {
    setExchangeModal(false)
    setShowError(false)
    setValidation(false)
    setPhoneNrValidate(false)
    setAmountValidate(false)
    setCryptoExchangeNumber("")
    setCryptoExchangeAmount("")
  }

  const updateCryptoBuyAmount = (e: any) => {
    setCryptoBuyAmount(e.target.value)
  }

  const handleCryptoPurchase = () => {
    if (cryptoBuyAmount.length === 0) {
      setValidation(true)
      setAmountValidate(true)
      return
    }

    setLoading(true)
    setPreparing(true)
    fetchNui('purchaseCrypto', { id: cryptoExchangeId, amount: cryptoBuyAmount }).then(resData => {
      if (resData.success === true) {
        setCryptoBuyAmount("")
        setCryptoData(resData.data)
        setFilteredCryptos(resData.data)
        setValidation(false)
        setTimeout(() => {
          setLoading(false)
          setCheckmark(true)
          setTimeout(() => {
            setCheckmark(false)
            setPurchaseModal(false)
            setPreparing(false)
          }, 1500)
        }, 500)
      } else {
        setLoading(false)
        setPreparing(false)
        setErrorMessage(resData.message)
        setShowError(true)
        setCryptoBuyAmount("")
        setValidation(false)
      }
    })
  }

  const updateCryptoExchangeNumber = (e: any) => {
    setCryptoExchangeNumber(e.target.value)
  }

  const updateCryptoExchangeAmount = (e: any) => {
    setCryptoExchangeAmount(e.target.value)
  }

  const handleCryptoExchange = () => {
    if (cryptoExchangeNumber.length === 0 && cryptoExchangeAmount.length === 0) {
      setValidation(true)
      setPhoneNrValidate(true)
      setAmountValidate(true)
      return
    } else {
      setValidation(false)
      setPhoneNrValidate(false)
      setAmountValidate(false)
    }

    if (cryptoExchangeNumber.length === 0 && cryptoExchangeAmount.length !== 0) {
      setValidation(true)
      setPhoneNrValidate(true)
      return
    } else {
      setValidation(false)
      setPhoneNrValidate(false)
    }

    if (cryptoExchangeAmount.length === 0 && cryptoExchangeNumber.length !== 0) {
      setValidation(true)
      setAmountValidate(true)
      return
    } else {
      setValidation(false)
      setAmountValidate(false)
    }

    if (cryptoExchangeNumber.length < 10) {
      setValidation(true)
      setPhoneNrValidate(true)
      return
    } else {
      setValidation(false)
      setPhoneNrValidate(false)
    }

    setValidation(false)
    setPhoneNrValidate(false)
    setAmountValidate(false)

    setLoading(true)
    setPreparing(true)
    fetchNui('exchangeCrypto', { id: cryptoExchangeId, number: cryptoExchangeNumber, amount: cryptoExchangeAmount }).then(resData => {
      if (resData.success === true) {
        setCryptoExchangeNumber("")
        setCryptoExchangeAmount("")
        setCryptoData(resData.data)
        setFilteredCryptos(resData.data)
        setTimeout(() => {
          setLoading(false)
          setCheckmark(true)
          setTimeout(() => {
            setCheckmark(false)
            setExchangeModal(false)
            setPreparing(false)
          }, 1500)
        }, 500)
      } else {
        setLoading(false)
        setPreparing(false)
        setErrorMessage(resData.message)
        setShowError(true)
        setCryptoExchangeNumber("")
        setCryptoExchangeAmount("")
      }
    })
  }

  useNuiEvent<boolean>('closeApps', () => {
    setLoading(false)
    setCheckmark(false)
    setPreparing(false)
    setShowError(false)
    setValidation(false)
    setPhoneNrValidate(false)
    setAmountValidate(false)
    setPurchaseModal(false)
    setExchangeModal(false)
    setCryptoBuyAmount("")
    setCryptoExchangeNumber("")
    setCryptoExchangeAmount("")
  })

  const primaryActions: any = [];

  return (
    <>
      <div className={classes.cryptoPurchaseModalContainer} style={{ display: cryptoPurchaseModal ? '' : 'none' }}>
        <div className={classes.cryptoPurchaseModalInnerContainer}>
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
                <FormControl fullWidth sx={{ width: '100%' }}>
                  <TextField
                    className={classes.input}
                    id="input-with-icon-textfield"
                    type="number"
                    label="Amount"
                    variant="standard"
                    onChange={updateCryptoBuyAmount}
                    value={cryptoBuyAmount}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <i className="fas fa-sliders-h"></i>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </div>
            </div>
            <div className="validation-messages" style={{ display: validation ? '' : 'none' }}>
              <div className="message" style={{ display: validation && amountValidate ? '' : 'none' }}>
                <i className="fas fa-exclamation fa-w-6 fa-fw fa-sm"></i>
                <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>Amount must be at least 1 character</Typography>
              </div>
            </div>
            <div className="buttons" style={{ justifyContent: showError ? 'center' : '' }}>
              <div>
                <Button onClick={closeCryptoPurchaseModal} size="small" color="warning" variant="contained">{showError ? 'Close' : 'Cancel'}</Button>
              </div>
              <div style={{ display: showError ? 'none' : '' }}>
                <Button onClick={handleCryptoPurchase} size="small" color="success" variant="contained">Submit</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.cryptoExchangeModalContainer} style={{ display: cryptoExchangeModal ? '' : 'none' }}>
        <div className={classes.cryptoExchangeModalInnerContainer}>
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
                <FormControl fullWidth sx={{ width: '100%' }}>
                  <TextField
                    className={classes.input}
                    id="input-with-icon-textfield"
                    label="Crypto ID"
                    type="number"
                    variant="standard"
                    //onChange={updateCryptoBuyAmount}
                    //value={cryptoBuyAmount}
                    value={cryptoExchangeId}
                    InputProps={{
                      readOnly: true,
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
            <div style={{ display: showError ? 'none' : '' }}>
              <div className="input-wrapper">
                <FormControl fullWidth sx={{ width: '100%' }}>
                  <TextField
                    id="input-with-icon-textfield"
                    label="Phone Number"
                    type="tel"
                    variant="standard"
                    onChange={updateCryptoExchangeNumber}
                    value={cryptoExchangeNumber}
                    inputProps={{ maxLength: 10 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <i className="fas fa-phone-volume"></i>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </div>
            </div>
            <div style={{ display: showError ? 'none' : '' }}>
              <div className="input-wrapper">
                <FormControl fullWidth sx={{ width: '100%' }}>
                  <TextField
                    className={classes.input}
                    id="input-with-icon-textfield"
                    label="Amount"
                    type="number"
                    variant="standard"
                    onChange={updateCryptoExchangeAmount}
                    value={cryptoExchangeAmount}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <i className="fas fa-sliders-h"></i>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </div>
            </div>
            <div className="validation-messages" style={{ display: validation ? '' : 'none' }}>
              <div className="message" style={{ display: validation && phoneNrValidate ? '' : 'none' }}>
                <i className="fas fa-exclamation fa-w-6 fa-fw fa-sm"></i>
                <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>Phone Number must be 10 numbers</Typography>
              </div>
              <div className="message" style={{ display: validation && amountValidate ? '' : 'none' }}>
                <i className="fas fa-exclamation fa-w-6 fa-fw fa-sm"></i>
                <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>Amount must be at least 1 character</Typography>
              </div>
            </div>
            <div className="buttons" style={{ justifyContent: showError ? 'center' : '' }}>
              <div>
                <Button onClick={closeCryptoExchangeModal} size="small" color="warning" variant="contained">{showError ? 'Close' : 'Cancel'}</Button>
              </div>
              <div style={{ display: showError ? 'none' : '' }}>
                <Button onClick={handleCryptoExchange} size="small" color="success" variant="contained">Submit</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AppContainer
        emptyMessage={filteredCryptos.length === 0}
        primaryActions={primaryActions}
        search={{
          filter: ['name'],
          list: cryptoData,
          onChange: setFilteredCryptos,
        }}
      >
        {filteredCryptos && filteredCryptos.length > 0 ? (
          filteredCryptos.map((crypto, index) => (
            <Dropdown key={index} id={crypto.id} icon={crypto.icon} name={crypto.name} amount={crypto.amount} tag={crypto.tag} value={crypto.value} buyable={crypto.canbuy} exchangeable={crypto.canexchange} sellable={crypto.cansell} />
          ))
        ) : (
          <>
          </>
        )}
      </AppContainer>
    </>
  );
}

export default CryptoApp;