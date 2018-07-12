'use strict';

import React, { Component } from 'react';
import { Alert, View, Button, FlatList, Text, Image, Picker } from 'react-native';
import {QuantitySlider} from './QuantitySlider';
import {GrammageSelector} from './GrammageSelector';

export class CartItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      grammageSelected: "10"
    }
  }

  render() {
    const imageUri = "https://images-eu.ssl-images-amazon.com/images/I/512D8AJfEGL._SS125_.jpg";
    return (
      <View style={{width: "95%", flexDirection: 'row'}}>
         <Image source={{uri: imageUri}} style={{width: 30 , height: 40, margin: 2, marginRight: 50}} />
         <QuantitySlider />
         <GrammageSelector defaultGrammage="10" grammageValues={["10", "20"]} />
      </View>
    )
  }
}