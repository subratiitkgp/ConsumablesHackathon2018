'use strict';

import React, { Component } from 'react';
import { Alert, View, Button, FlatList, Text, Image, TextInput } from 'react-native';
import { Store } from '../../data/Store';
import { AmazonAsinStore } from '../../data/AmazonAsinStore';
import { RNCamera } from 'react-native-camera';
import {QuantitySlider} from './QuantitySlider';
import {GrammageSelector} from './GrammageSelector';
import {StringUtil} from '../../util/StringUtil';
import {CartStore} from '../../data/CartStore';

export class CompareAndSaveDP extends Component {

  constructor(props) {
    super(props);
    const asin = this.props.asin;

    this.asinName = asin.title;
    this.imageUri = asin.imageURL;
    this.ourPrice = asin.price;
    this.defaultGrammage = asin.variation;
    const variations = AmazonAsinStore.getVariationsForVarationGroup(asin.variationgroup)
    this.grammageValues = variations;

    this.offer1Price = 10; // this.ourPrice * 0.9;
    this.offer2Price = 11; // this.ourPrice * 0.85;
    this.state = { text:  this.ourPrice, quantity: 0};
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1}}>
        {this.renderName()}
        {this.renderATF()}
        {this.renderBTF()}
      </View>
    )
  }

  renderATF() {
    return (
      <View style={{flex: 1, flexDirection: 'row', borderWidth: 0.5}}>
      {this.renderImage()}
      {this.renderDetail()}
    </View>
    )
  }
  
  renderImage() {
    return (
      <View style={{flex: 1, margin: 5}}>
      <Image source={{uri: this.imageUri}} style={{width: 150 , height: 150}} />
      </View>
    )
  }

  renderDetail() {
    return (
      <View style={{flex: 1, margin: 5}}>
      {this.renderOurPrice()}
      {this.renderYourPrice()}    
      {this.renderPicker()}
      {this.renderATCButton()}
    </View>
    )
  }

  renderName() {
    return (
      <View>
      <Text style={{fontSize: 20, fontWeight: 'bold', color: 'blue'}}>{this.asinName}</Text>
      </View>
    )
  }

  renderOurPrice() {
    return (
      <View style={{flexDirection: 'row'}}>
      <Text style={{fontSize: 15, fontWeight: 'bold'}}>Our Price: </Text>
      <Text style={{fontSize: 15, color: 'red'}}> ₹{this.ourPrice} </Text>
      </View>
    )
  }

  renderYourPrice() {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{fontSize: 15, fontWeight: 'bold'}}>Your Price: </Text>
        <Text style={{fontSize: 15}}>₹</Text>
        <TextInput
          style={{fontSize: 15}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text.toString()}
        />
      </View>
    )
  }

  renderPicker() {
    return (
      <View style={{ flexDirection: 'row'}}>
        <Text style={{fontSize: 15, fontWeight: 'bold'}}>Weight: </Text>
        <GrammageSelector defaultGrammage={this.defaultGrammage} grammageValues={this.grammageValues} />              
      </View>
    )
  }

  renderATCButton() {
    let defaultQuantity = 1;
    if (this.props.pageMode === "Internal") {
      const cartItem = this.props.cartItem;
      defaultQuantity = cartItem.quantity;
    }

    return (
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <QuantitySlider defaultQuantity={defaultQuantity} 
                        onQuantityChange={(quantity) => this.onQuantityChange(this.props.cartItem, quantity)}/>
        <View style={{marginLeft: 5}}>
          <Button
            title="OK"
            onPress={() => this.confirm()}
          />
        </View>
      </View>
    )
  }

  renderBTF() {
    return (
      <View style={{height:100, borderWidth: 0.5, backgroundColor: 'yellow', margin: 5 , padding: 5}}>
        <Text style={{fontSize: 15, fontWeight: 'bold'}}>Offers: </Text>

        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 15}}>1. Effective Price on Cart >= 1000: </Text>
          <Text style={{fontSize: 15, color: 'red'}}>₹{this.offer1Price.toFixed(2)}</Text>             
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 15}}>2. Effective Price on Cart >= 2000: </Text>
          <Text style={{fontSize: 15, color: 'red'}}>₹{this.offer2Price.toFixed(2)}</Text>             
        </View>

        <Text style={{fontSize: 15}}>3. Buy 2 and Get 1 FREE</Text>
    </View>
    )
  }

  confirm() {
    this.props.onBack();
    return;
  }

  onQuantityChange(cartItem, quantity) {
    this.state.quantity = quantity;
    const newCartItem = StringUtil.cloneObject(cartItem);
    if (quantity <= 0) {
      CartStore.deleteCartItem(cartItem.cartItemId);
    } else {
      newCartItem.quantity = quantity;
      CartStore.saveCartItem(newCartItem);
    }

    if (this.props.onQuantityChange != undefined) {
      this.props.onQuantityChange(newCartItem);
    }
  }
}
