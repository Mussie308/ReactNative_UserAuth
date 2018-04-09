import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: 'Enter Here',
      password: 'Password',
      message: '',
    }
  }

  bark(e){
    fetch('http://localhost:5000/api/userId')
      .then((results) => {
        return results.json()
      }).then((data) => {
        console.log(data, "bananas")
        for(let i = 0; i < data.length; i++) {
          if(data[i].username === this.state.userName && data[i].password === this.state.password) {
            this.props.navigation.navigate('MyPage', {
              userName: this.state.userName,
              password: this.state.password
            })
          } else {
            this.setState({message: 'Incorrect login information.', password: ''})
          }
        }
      })
  }

  render() {
    console.log('console log works!');
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
        <Text>{this.state.message}
        </Text>
        <Button
          title="Submit"
          onPress={(e) => this.bark(e)}
        />
      </View>
    )
  }
}
