import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class MyPage extends React.Component {
  render() {
    const { params } = this.props.navigation.state;
    const userName = params ? params.userName : null;
    const password = params ? params.password : null;

    return(
      <View>
        <Text>Welcome back, {userName}!</Text>
        <Text> your password is {password}</Text>
      </View>
    )
  }
}
