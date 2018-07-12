'use strict';

import React, { Component } from 'react';
import { Alert, View, Button, FlatList, Text, Image, Picker, Switch } from 'react-native';
import {QuantitySlider} from './QuantitySlider';
import {GrammageSelector} from './GrammageSelector';

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

  render() {
    const imageUri = "https://images-eu.ssl-images-amazon.com/images/I/512D8AJfEGL._SS125_.jpg";
    return (
      <View>
        <View style={{width: "95%", flexDirection: 'row', alignItems: 'center', margin: 5}}>
          <Image source={{uri: imageUri}} style={{width: 50 , height: 50, margin: 2}} />
          <Text style={{fontSize: 20}}>ASIN TITLE</Text>
        </View>
        <View style={{width: "95%", flexDirection: 'row', alignItems: "center", margin: 5}}>
          <QuantitySlider />
          <GrammageSelector defaultGrammage="10" grammageValues={["10", "20"]} />
          <Text>Need Sticker</Text>
          <Switch value={this.state.needSticker} onValueChange={(value) => this.onStickerValueChange(value)}/>
        </View>
      </View>
    )
  }
}