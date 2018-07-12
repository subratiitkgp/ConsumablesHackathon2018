'use strict';

import React, { Component } from 'react';
import { Alert, View, Button, FlatList, Text, Image, TouchableWithoutFeedback } from 'react-native';

export class QuantitySlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: this.props.defaultQuantity === undefined ? 1 : this.props.defaultQuantity
    };
  }

  onPlusClick() {
    const updatedQuantity = this.state.quantity + 1;
    this.setState({quantity: updatedQuantity});
    if (this.props.onQuantityChange != undefined) {
      this.props.onQuantityChange(updatedQuantity);
    }
  }

  onMinusClick() {
    const updatedQuantity = this.state.quantity > 0 ? this.state.quantity - 1 : 0;
    this.setState({quantity: updatedQuantity})
    if (this.props.onQuantityChange != undefined) {
      this.props.onQuantityChange(updatedQuantity);
    }
  }

  render() {
    const plusImageSource = "../../images/PlusIcon.jpg";
    const minusImageSource = "../../images/MinusIcon.jpg";

    return (
      <View style={{width: 100, height: 30,
                    flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          
        <TouchableWithoutFeedback onPress={() => this.onMinusClick()}>
          <Image source={require(minusImageSource)} style={{width: 30 , height: 30}} />
        </TouchableWithoutFeedback>
        <View style={{width: 30, height: 30, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 20}}>{this.state.quantity}</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => this.onPlusClick()}>
          <Image source={require(plusImageSource)} style={{width: 30 , height: 30}} />
        </TouchableWithoutFeedback>
      </View>
    )
  }
}