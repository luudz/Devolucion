import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
} from 'react-native';

const Login = require ('./views/LoginView');

export default class Devolucion extends Component {
  render() {
    return (
      <Login></Login>
    );
  }
}

const styles = StyleSheet.create({
});

AppRegistry.registerComponent('Devolucion', () => Devolucion);
