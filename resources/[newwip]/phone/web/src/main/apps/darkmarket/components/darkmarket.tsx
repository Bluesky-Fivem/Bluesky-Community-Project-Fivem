import React, { useState, useEffect } from 'react';
import '../../../index.css';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { fetchNui } from '../../../../utils/fetchNui';
import { useNuiEvent } from "../../../../hooks/useNuiEvent";
import { useRecoilState } from 'recoil';
import { activeHoverIdState } from '../../../../atoms/activeAtom';
import { Checkmark } from 'react-checkmark';
import { Button } from '@mui/material';
import useStyles from "./darkmarket.styles";
import AppContainer from '../../../components/app-container';

const DarkmarketApp: React.FC = () => {
  const classes = useStyles();

  const [hoverId, setHoverId] = useRecoilState(activeHoverIdState) // why in tarnation is this a global state?
  const [productData, setProductData] = useState([])
  const [filteredProductData, setFilteredProductData] = useState([])
  const [productId, setProductId] = useState(0)
  const [purchaseModal, setPurchaseModal] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [checkmark, setCheckmark] = useState(false)
  const [preparing, setPreparing] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    fetchNui('getDarkmarketData', {}).then(resData => {
      setProductData(resData)
      setFilteredProductData(resData)
    })
  }, []);

  const handleHoverActive = (e: any) => {
    setHoverId(e.currentTarget.id)
  }

  const handleHoverNotActive = () => {
    setHoverId("")
  }

  const handlePurchase = () => {
    setLoading(true)
    setPreparing(true)
    fetchNui('purchaseProduct', { id: productId }).then(resData => {
      if (resData.success === true) {
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
      }
    })
  }

  const openPurchaseModal = (e: any) => {
    setProductId(e.currentTarget.id)
    setPurchaseModal(true)
  }

  const closePurchaseModal = () => {
    setPurchaseModal(false)
  }

  useNuiEvent<boolean>('closeApps', () => {
    setPurchaseModal(false)
    setLoading(false)
    setCheckmark(false)
    setPreparing(false)
    setShowError(false)
    setErrorMessage("")
  })

  const primaryActions: any = [];

  return (
    <>
      <div className={classes.darkmarketConfirmModalContainer} style={{ display: purchaseModal ? '' : 'none' }}>
        <div className={classes.darkmarketConfirmModalInnerContainer}>
          <div className="spinner-wrapper" style={{ display: isLoading ? '' : 'none' }}>
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
          <div className="spinner-wrapper" style={{ display: checkmark ? '' : 'none' }}>
            <Checkmark size="56px" color='#009688' />
          </div>
          <div className="component-simple-form" style={{ display: preparing ? 'none' : '' }}>
            <div style={{ justifyContent: 'center' }}>
              <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body1" gutterBottom>Confirm purchase</Typography>
            </div>
            <div className="buttons">
              <div>
                <Button onClick={closePurchaseModal} size="small" color="warning" variant="contained">Cancel</Button>
              </div>
              <div>
                <Button onClick={handlePurchase} size="small" color="success" variant="contained">Submit</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AppContainer
        emptyMessage={filteredProductData.length === 0}
        primaryActions={primaryActions}
        search={{
          filter: ['product_name', 'product_price'],
          list: productData,
          onChange: setFilteredProductData,
        }}
      >
        {filteredProductData && filteredProductData.length > 0 ? (
          filteredProductData.map((product) => (
            <div key={product.id} id={product.id} className="component-paper cursor-pointer" onMouseEnter={handleHoverActive} onMouseLeave={handleHoverNotActive}>
              <div className="main-container">
                <div className="image">
                  <i className={`fas ${product.product_icon} fa-w-16 fa-fw fa-3x`}></i>
                </div>
                <div className="details">
                  <div className="title">
                    <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{product.product_name}</Typography>
                  </div>
                  <div className="description">
                    <div className="flex-row">
                      <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{product.product_price} {product.cryptoid === 1 ? 'SHUNGITE' : 'GUINEA'}</Typography>
                    </div>
                  </div>
                </div>
                <div className={hoverId.toString() === product.id.toString() ? "actions actions-show" : "actions"}>
                  <Tooltip title="Buy Product" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
                    <div>
                      <i onClick={openPurchaseModal} id={product.id} className="fas fa-hand-holding-usd fa-w-16 fa-fw fa-lg"></i>
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
      </AppContainer>
    </>
  );
}

export default DarkmarketApp;