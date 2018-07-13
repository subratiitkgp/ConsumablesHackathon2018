'use strict';

import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

export class LogoTitleCompareAndSearch extends Component {
    render() {
        const pantryLogo = "../../images/Pantry_Logo3.jpeg";
        return (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={require(pantryLogo)} style={{width: 120 , height: 30, margin: 5, marginRight: 10}} />
              <Text style={{fontSize: 20}}>{"Compare & Save"}</Text>
            </View>
        );
    }
}