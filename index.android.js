//*******************************//
// Acceso a la app desde android //
//*******************************//


import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  TouchableHighlight,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

var NavigatorMapper = {
  //Header en todas las vistas que permiten la opción de volver a la vista anterior
  LeftButton: function (route, navigator, index){ 
            if (index == 0){
              return null;
            }
            return (
              <TouchableHighlight style = {{alignItems: 'center', justifyContent: 'center', height: '100%'}} onPress = {() => {
                if (index > 0){
                  navigator.pop();
                }
              }}>
                <Icon name = "md-arrow-round-back" size = {30} color = "#fff" />
              </TouchableHighlight>
            ); 
  },
  RightButton: function (route, navigator, index){ 
    return null; 
  },
  Title: function (route, navigator, index){ 
      return null;
  },
};

//Constantes de todas las vistas a las que se puede acceder desde el Navigator
const Login = require ('./views/LoginView');
const ClientList = require ('./views/ClientList');
const ClientDetail = require ('./views/ClientDetail');
const Confirmation = require ('./views/Confirmation');
const Success = require ('./views/Success');
const Settings = require ('./src/components/Settings');


export default class Devolucion extends Component {
  
  //Define la vista a la que se va a direccionar al usuario con base en el nombre de la vista
  renderScene(route, navigator){
    switch(route.name){
      case 'Login': 
        return(<Login navigator = {navigator} route = {route}/>);
      case 'Settings':
        return(<Settings navigator = {navigator} route = {route}/>);
      case 'ClientList':
        return(<ClientList navigator = {navigator} route = {route}/>);
      case 'ClientDetail':
        return(<ClientDetail navigator = {navigator} route = {route}/>);
      case 'Confirmation':
        return(<Confirmation navigator = {navigator} route = {route}/>);
      case 'Success':
        return(<Success navigator = {navigator} route = {route}/>);
    }
  }

  render() {
    return (
      <Navigator
        initialRoute = {{name: 'Login'}}
        renderScene = {this.renderScene}
        configureScene = {(route)=> {
          if (route.sceneConfig){
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromLeft
        }}
        navigationBar = {
          <Navigator.NavigationBar
            routeMapper= {NavigatorMapper}/>
        }/>
    );
  }
}

AppRegistry.registerComponent('Devolucion', () => Devolucion);
