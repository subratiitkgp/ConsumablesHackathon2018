'use strict';

import React, { Component } from 'react';
import { Alert, View, Button, FlatList, Text, Image, Picker, Switch, TouchableWithoutFeedback } from 'react-native';
import {QuantitySlider} from './QuantitySlider';
import {GrammageSelector} from './GrammageSelector';
import {AmazonAsinStore} from '../../data/AmazonAsinStore';
import {StringUtil} from '../../util/StringUtil';
import {CartStore} from '../../data/CartStore';

export class CartItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      grammageSelected: "10",
      needSticker: false
    }
  }

  onStickerValueChange(value) {
    this.setState({needSticker: value})
    if (this.props.onStickerValueChange != undefined) {
      this.props.onStickerValueChange(value);
    }
  }

  onItemClick(asin, cartItem) {
    if (this.props.onItemClick != undefined) {
      this.props.onItemClick(cartItem);
    }
  }

  onQuantityChange(asin, cartItem, quantity) {
    if (quantity <= 0) {
      CartStore.deleteCartItem(cartItem.cartItemId);
    } else {
      const newCartItem = StringUtil.cloneObject(cartItem);
      cartItem.quantity = quantity;
      CartStore.saveCartItem(cartItem);
    }

    if (this.props.onQuantityChange != undefined) {
      this.props.onQuantityChange(newCartItem);
    }
  }

  onGrammageChange(asin, cartItem, variation) {
    const asinVariations = AmazonAsinStore.getAsinsForVariationGroup(asin.variationgroup);
    let newAsin = asin;
    for (let i = 0; i < asinVariations.length; ++i) {
      if (asinVariations[i].variation === variation) {
        newAsin = asinVariations[i];
        break;
      }
    }

    let newCartItem = StringUtil.cloneObject(cartItem);
    newCartItem.asin = newAsin.asin;

    CartStore.saveCartItem(newCartItem);

    if (this.props.onGrammageChange != undefined) {
      this.props.onGrammageChange(newCartItem);
    }
  }

  render() {
    const cartItem = this.props.cartItem;
    const asin = AmazonAsinStore.getAsin(cartItem.asin);
    return (
      <View style={{flex: 1, width: "97%", borderWidth: 1, margin: 5}}>
        {this.renderFirstRow(asin, cartItem)}
        {
          this.props.renderSecondRow === true ? this.renderSecondRow(asin, cartItem) : null
        }
      </View>
    )
  }

  renderFirstRow(asin, cartItem) {
    return (
      <View style={{flexDirection: 'row', width: '97%', alignItems: 'center', justifyContent: "space-between"}}>
        <TouchableWithoutFeedback onPress={() => this.onItemClick(asin, cartItem)}>
          <View style={{flexDirection: 'row', width: 240, alignItems: 'center'}}>
            <Image source={{uri: asin.imageURL}} style={{width: 30 , height: 40, margin: 5, marginRight: 30}} />
            <Text style={{fontSize: 15}}>{asin.title}</Text>
          </View>
        </TouchableWithoutFeedback>
        <QuantitySlider defaultQuantity={cartItem.quantity} onQuantityChange={(quantity) => this.onQuantityChange(asin, cartItem, quantity)}/>
      </View>
    )
  }

  renderSecondRow(asin, cartItem) {
    const grammageValues = AmazonAsinStore.getVariationsForVarationGroup(asin.variationgroup);
    return (
      <View style={{flexDirection: 'row', width: "97%", alignItems: 'center', justifyContent: 'space-between'}}>
        <GrammageSelector onValueChange={(variation) => this.onGrammageChange(asin, cartItem, variation)}
                                         defaultGrammage={asin.variation} grammageValues={grammageValues} />
        <Text>Need Sticker</Text>
        <Switch value={this.state.needSticker} onValueChange={(value) => this.onStickerValueChange(value)}/>
      </View>
    )
  }
}