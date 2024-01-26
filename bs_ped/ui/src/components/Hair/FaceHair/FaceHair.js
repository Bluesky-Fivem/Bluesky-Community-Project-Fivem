import React, { Fragment, useEffect } from 'react';
import ElementBox from '../../UIComponents/ElementBox/ElementBox';
import { Overlay } from '../../PedComponents';
import { useSelector } from 'react-redux';
import { Ticker } from '../../UIComponents';
import { SetPedHairColor } from '../../../actions/pedActions';
import { makeStyles } from '@material-ui/core/styles';
import Nui from '../../../util/Nui';

const useStyles = makeStyles(theme => ({
  body: {
    maxHeight: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
    margin: 25,
    display: 'grid',
    gridGap: 0,
    gridTemplateColumns: '20% 80%',
    justifyContent: 'space-around',
    background: '#3e4148a3',
    border: '2px solid #3e4148',
  },
  color: {
    width: '50%',
    height: '50%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
    position: 'relative',
    border: '2px solid #3e4148',
  },
}));

export default props => {
  const classes = useStyles();
  const ped = useSelector(state => state.app.ped);
  const colorsMax = useSelector(state => state.app.hairColors);

  useEffect(() => {
    Nui.send("GetPedHairRgbColor", {
      type: 'color1',
      name: 'facialhair',
      colorId: ped.customization.colors.facialhair.color1.index
    })
  }, [ped.customization.colors.facialhair.color1.index]);

  useEffect(() => {
    Nui.send("GetPedHairRgbColor", {
      type: 'color2',
      name: 'facialhair',
      colorId: ped.customization.colors.facialhair.color2.index
    })
  }, [ped.customization.colors.facialhair.color2.index]);

  return <Fragment>
    <Overlay
      label={'Facial Hair'}
      data={{
        type: 'facialhair',
        id: 1,
      }}
      current={ped.customization.overlay.facialhair}
      max={28}
    />
    <ElementBox label={'Color'} bodyClass={classes.body}>
      <div className={classes.color} style={{ backgroundColor: ped.customization.colors.facialhair.color1.rgb }}/>
      <Ticker
        label={'Hair Color'}
        event={SetPedHairColor}
        data={{
          type: 'color1',
          name: 'facialhair',
        }}
        current={ped.customization.colors.facialhair.color1.index}
        min={0}
        max={colorsMax ? colorsMax - 1 : 0}
      />
      <div className={classes.color} style={{ backgroundColor: ped.customization.colors.facialhair.color2.rgb }}/>
      <Ticker
        label={'Highlight Color'}
        event={SetPedHairColor}
        data={{
          type: 'color2',
          name: 'facialhair',
        }}
        current={ped.customization.colors.facialhair.color2.index}
        min={0}
        max={colorsMax ? colorsMax - 1 : 0}
      />
    </ElementBox>
  </Fragment>;
}
