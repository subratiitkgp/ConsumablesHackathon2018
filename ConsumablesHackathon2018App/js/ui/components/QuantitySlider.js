'use strict';

import React, { Component } from 'react';
import { Alert, View, Button, FlatList, Text, Image, TouchableWithoutFeedback } from 'react-native';

export class QuantitySlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 1
    };
  }

  onPlusClick() {
    this.setState({quantity: this.state.quantity + 1});
    if (this.props.onQuantityChange != undefined) {
      this.props.onQuantityChange(this.state.quantity);
    }
  }

  onMinusClick() {
    this.setState({quantity: this.state.quantity > 0 ? this.state.quantity - 1 : 0})
    if (this.props.onQuantityChange != undefined) {
      this.props.onQuantityChange(this.state.quantity);
    }
  }

  render() {
    const plusImageSource = "../../images/PlusIcon.jpg";
    const minusImageSource = "../../images/MinusIcon.jpg";

    return (
      <View style={{width: 100, height: 30,
                    flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          
        <TouchableWithoutFeedback onPress={() => this.onPlusClick()}>
          <Image source={require(plusImageSource)} style={{width: 30 , height: 30}} />
        </TouchableWithoutFeedback>
        <View style={{width: 30, height: 30, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 20}}>{this.state.quantity}</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => this.onMinusClick()}>
          <Image source={require(minusImageSource)} style={{width: 30 , height: 30}} />
        </TouchableWithoutFeedback>
      </View>
    )
  }
}