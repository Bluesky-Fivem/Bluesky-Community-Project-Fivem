import React, { useState } from 'react';
import '../../../index.css';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useRecoilState } from 'recoil';
import { cryptoIdState, exchangeModalState, purchaseModalState } from '../../../../atoms/activeAtom';

const Dropdown: React.FC<CryptoProps> = (props) => {
  const [expanded, setExpanded] = useState(false)

  const [purchaseModal, setPurchaseModal] = useRecoilState(purchaseModalState)
  const [exchangeModal, setExchangeModal] = useRecoilState(exchangeModalState)
  const [exchangeCryptoId, setExchangeCryptoId] = useRecoilState(cryptoIdState)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const openCryptoPurchaseModal = (e: any) => {
    e.stopPropagation();
    setExchangeCryptoId(props.id)
    setPurchaseModal(true)
  }

  const openCryptoExchangeModal = (e: any) => {
    e.stopPropagation();
    setExchangeCryptoId(props.id)
    setExchangeModal(true)
  }

  return (
    <>
      <div className="component-paper cursor-pointer" onClick={handleExpandClick}>
        <div className="main-container">
          <div className="image">
            <i className={`${props.icon} fa-w-16 fa-fw fa-3x`}></i>
          </div>
          <div className="details">
            <div className="title">
              <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{props.name}</Typography>
            </div>
            <div className="description">
              <div className="flex-row">
                <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{props.amount === undefined || "" ? '0' : props.amount}</Typography>
              </div>
            </div>
          </div>
          <div className="actions">
          </div>
        </div>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <FormControl sx={{ width: '85%', marginLeft: '7.5%', marginBottom: '1.5%' }}>
            <TextField
              id="input-with-icon-textfield"
              variant="standard"
              value={`${props.tag} (${props.id})`}
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
          <FormControl sx={{ width: '85%', marginLeft: '7.5%', marginBottom: '1.5%' }}>
            <TextField
              id="input-with-icon-textfield"
              variant="standard"
              value={props.name}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <i className="fas fa-tag"></i>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl sx={{ width: '85%', marginLeft: '7.5%', marginBottom: '1.5%' }}>
            <TextField
              id="input-with-icon-textfield"
              variant="standard"
              value={props.amount === undefined || "" ? '0' : props.amount}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <i className="fas fa-money-check-alt"></i>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl sx={{ width: '85%', marginLeft: '7.5%', marginBottom: '1.5%' }}>
            <TextField
              id="input-with-icon-textfield"
              variant="standard"
              value={props.value.toLocaleString('en-Us', { style: 'currency', currency: 'USD' })}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <i className="fas fa-poll"></i>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <Stack direction="row" sx={{ marginTop: '1%', marginLeft: '7.5%' }}>
            <Button onClick={openCryptoPurchaseModal} style={{ display: props.buyable ? '' : 'none', marginRight: '8.1%' }} size="small" color="success" variant="contained">Purchase</Button>
            <Button onClick={openCryptoExchangeModal} style={{ display: props.exchangeable ? '' : 'none', marginRight: '8.1%' }} size="small" color="warning" variant="contained">Exchange</Button>
          </Stack>
        </Collapse>
      </div>
    </>
  )
}

export default Dropdown