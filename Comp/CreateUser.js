import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class CreateUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'enter here',
      password: 'enter here',
      checkPassword: 'enter here',
      message: '',
    }
  }

  meow(e) {
    e.preventDefault();
    if(this.state.password === this.state.checkPassword) {
      fetch('http://localhost:5000/hogsmeade/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      })
      .then((res) => {
        console.log(res)
        return res;
      })
      .catch((err) => {
        console.log(err)
        return err;
      })
      this.props.navigation.navigate('Login');
    } else {
      this.setState({
        message:"Password doesn't match!"
      })
    }
  }

  render() {
    return(
      <View>
      <Text>Username: </Text>
      <TextInput
        onChangeText={(username) => this.setState({username: username})}
        value={this.state.username}
        autoCapitalize = 'none'
      />
      <Text>Password: </Text>
      <TextInput
        onChangeText={(password) => this.setState({password: password})}
        value={this.state.password}
        autoCapitalize = 'none'
      />
      <Text>Confirm Password: </Text>
      <TextInput
        onChangeText={(password) => this.setState({checkPassword: password})}
        value={this.state.checkPassword}
        autoCapitalize = 'none'
      />
      <Button
        title="Submit"
        onPress={(e) => this.meow(e)}
      />
      <Text>{this.state.message}</Text>
      </View>
    )
  }
}
