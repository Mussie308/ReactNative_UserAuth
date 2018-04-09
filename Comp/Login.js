import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'Enter Here',
      password: 'Password',
      message: '',
      data: ''
    }
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/userId')
      .then((results) => {
        return results.json()
      })
      .then((data) => {
        let userData = data;
        this.setState({
          data: userData,
        })
      })
  }

  bark(e) {
    for(let i = 0; i < this.state.data.length; i++) {
      if(this.state.data[i].username === this.state.username
        && this.state.data[i].password === this.state.password) {
        this.props.navigation.navigate('MyPage', {
          username: this.state.username,
          password: this.state.password
        })
      } else {
        this.setState({
          message: 'Incorrect login information.',
          password: ''
        })
      }
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
        <Text>{this.state.message}
        </Text>
        <Button
          title="Submit"
          onPress={(e) => this.bark(e)}
        />
        <Text>Don't have an account? Make one </Text>
        <Button
          title="here!"
          onPress = {()=>{this.props.navigation.navigate('CreateUser')}}
        />
      </View>
    )
  }
}
