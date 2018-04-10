import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class CreateUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'enter here',
      checkUserName: 'hi',
      password: 'enter here',
      checkPassword: 'enter here',
      message: '',
    }
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/userId')
      .then((results) => {
        return results.json()
      })
      .then((data) => {
        let userData = data.map((value) => value.username);
        this.setState({
          data: userData,
        })
      })
  }

  meow(e) {
    e.preventDefault();
    for(let i = 0; i < this.state.data.length; i++) {
      console.log(this.state.data[i] + " " + this.state.username);
      if(this.state.username == this.state.data[i]) {
        this.setState({
          checkUserName: 'That username is already taken!'
        })
      }
      console.log(this.state.checkUserName);
    }
    if(this.state.password === this.state.checkPassword
      && this.state.checkUserName === '') {
      fetch('http://localhost:5000/api/userId', {
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
      <Text>Username:</Text>
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
