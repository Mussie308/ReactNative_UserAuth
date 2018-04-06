import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: 'Enter Here',
      password: 'Password',
    }
  }
  bark(e){
    this.props.navigation.navigate('MyPage', {
      userName: this.state.userName,
      password: this.state.password
    })
  }

  render() {
    return(
      <View>
        <Text>Username:</Text>
        <TextInput
          onChangeText={(userName) => this.setState({userName: userName})}
          value={this.state.userName}
        />
        <Text>Password: </Text>
        <TextInput
          onChangeText={(password) => this.setState({password: password})}
          value={this.state.password}
        />
        <Button
          title="Submit"
          onPress={(e) => this.bark(e)}
        />
      </View>
    )
  }
}
