'use strict';

import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

export class LogoTitleCompareAndSearch extends Component {
    render() {
        return (
            <View style={{flexDirection: 'row', width: '97%', borderWidth: 0, margin: 5, alignItems: 'center', justifyContent: "flex-start"}}>
            <Image
                source={{uri: "https://images-eu.ssl-images-amazon.com/images/I/51Kt7nFLqEL._SS140_.jpg"}}
                style={{ width: 30 , height: 40 }}
            />
            <Text style={{fontSize: 20, alignItems: 'center', marginLeft: 30}}>{"Compare & Save"}</Text>
            </View>
        );
    }
}