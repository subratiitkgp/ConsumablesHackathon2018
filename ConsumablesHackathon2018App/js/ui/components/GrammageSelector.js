'use strict';

import React, { Component } from 'react';
import { Alert, View, Button, FlatList, Text, Image, Picker } from 'react-native';
import {QuantitySlider} from './QuantitySlider';

export class GrammageSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      grammageSelected: this.props.defaultGrammage
    }
  }

  onValueChange(itemValue) {
    this.setState({grammageSelected: itemValue});
    if(this.props.onValueChange != undefined) {
      this.props.onValueChange(itemValue);
    }
  }

  render() {
    return (
      <Picker
        mode="dropdown"
        selectedValue={this.state.grammageSelected}
        style={{ height: 30, width: 100 }}
        onValueChange={(itemValue, itemIndex) => this.onValueChange(itemValue)}>
        {
          this.props.grammageValues.map( (item, index) => {
            return (
              <Picker.Item key={item} label={item} value={item} />
            )
          })
        }
      </Picker>
    );
  }
}