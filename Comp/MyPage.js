import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { userName } from './Login.js';

export default class MyPage extends React.Component {
  render() {
    const { params } = this.props.navigation.state;
    const userName = params ? params.userName : null;

    return(
      <View>
        <Text>Welcome back, {userName}!</Text>
      </View>
    )
  }
}
