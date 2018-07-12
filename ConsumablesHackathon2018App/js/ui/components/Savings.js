'use strict';

import React, { Component } from 'react';
import { CartStore } from '../../data/CartStore';
import { AmazonAsinStore } from '../../data/AmazonAsinStore';
import { View, Button, FlatList, Text, Image, ToastAndroid, TouchableWithoutFeedback, Alert } from 'react-native';

export class Savings extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            savings: 0.00
          }

    }

    computeSavings() {
        const cartItems = CartStore.getAllCartItems();
        let savings = 0.0;
        for(let cartItem of cartItems) {
            if(cartItem.source === 'Internal' || cartItem.source === 'internal'){
               const asin = AmazonAsinStore.getAsin(cartItem.asin);
               savings = savings + (asin.actualprice - asin.price);
            } else {
                if(cartItem.externalPrice > 0) {
                    savings = savings + (cartItem.actualprice - cartItem.externalPrice);
                }
            }
        }
        this.state.savings = savings;
        return this.state.savings.toFixed(2);
    }

    render() {
        const savings = this.computeSavings();
        return (
          <View style={{margin:5, flexDirection: 'row'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Total Savings: </Text>
          <Text style={{fontSize: 20, color: 'red'}}>₹{savings}</Text>             
      </View>
        )
      }
}