'use strict';

import React, { Component } from 'react';
import { Alert, View, Button, FlatList, Text, Image, TouchableHighlight } from 'react-native';

export class QuantitySlider extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const plusImageSource = "../../images/PlusIcon.jpg";
    const minusImageSource = "../../images/MinusIcon.jpg";


    return (
      <View style={{flex: 1}}>
        <Text>Hello</Text>
        <TouchableHighlight>
        <Image source={require(plusImageSource)} style={{width: 40 , height: 40, margin: 2, marginRight: 50}} />
        <Image source={require(minusImageSource)} style={{width: 40 , height: 40, margin: 2, marginRight: 50}} />
        </TouchableHighlight>
      </View>
    )
  }
}