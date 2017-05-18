//*********************************************************************//
// Menú lateral visible en todas la vista ClientDetail y Confirmation  //
//*********************************************************************//
'use strict'

import React, {Component} from 'react';
import {Text,
        View,
        StyleSheet,
        TouchableHighlight,
        AsyncStorage,
        Image
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

class SideMenu extends Component{

  constructor(props) {
      super(props);
   }

  //Vista// 
  render(){
    return(
      <View style = {styles.container}>
        <View style = {styles.title}>
          <Image style = {styles.logo} resizeMode = {Image.resizeMode.contain} source={require('../images/grupobimbo.png')}/>
          <Text style = {styles.menu}>Menú</Text>
        </View>
        <TouchableHighlight style = {styles.menuButton} onPress={() => this.onClientes()}>
          <View style = {styles.menuView}>
            <Icon name = "md-people" size = {30} color = "#fff" />
            <Text style = {styles.menuText}>Clientes</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style = {styles.menuButton} onPress={() => this.onResumen()}>
          <View style = {styles.menuView}>
            <Icon name = "md-clipboard" size = {30} color = "#fff" />
            <Text style = {styles.menuText}>Resumen</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style = {styles.menuButton} onPress={() => this.onCambiarRuta()}>
          <View style = {styles.menuView}>
            <Icon name = "md-exit" size = {30} color = "#fff" />
            <Text style = {styles.goButtonTextt}>Cambiar Ruta</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style = {styles.menuButton} onPress={() => this.onConfiguracion()}>
          <View style = {styles.menuView}>
            <Icon name = "md-cog" size = {30} color = "#fff" />
            <Text style = {styles.menuText}>Configuración</Text>
          </View>
        </TouchableHighlight>
        <View style = {{flex: 1}}></View>
        <TouchableHighlight style = {styles.goButton} onPress={() => this.onExit(() => this.onSalir())}>
          <View style = {styles.menuView}>
            <Icon name="md-power" size={30} color="#fff" />
            <Text style = {styles.goButtonText}>Salir</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  onRegister(){
    this.props.navigator.replace({
      title: 'ClientDetail',
      name: 'ClientList',
      passProps: {}
      // passProps: {clients: this.passProps.clients, client: this.passProps.client, count: this.passProps.count, dataSource: this.state.dataSource.cloneWithRows(this.passProps.client.products)}
    });
  }

  onList(){
    this.props.navigator.replace({
      title: 'ClientList',
      name: 'ClientList',
      passProps: {}
      // passProps: {clients: this.passProps.clients, client: this.passProps.client, count: this.passProps.count, dataSource: this.state.dataSource.cloneWithRows(this.passProps.client.products)}
    });
  }

  onSalir(){
    // Si el usuario selecciona "salir", se termina la sesión y es redireccionado al Login
    console.log("exit");
    // AsyncStorage.setItem('isLogged', false);
    AsyncStorage.multiRemove(['route', 'CeVe', 'pass', 'isLogged']);
    this.props.navigator.resetTo({
      title: 'Login',
      name: 'Login',
      passProps: {}
    });
  }
    // Alert.alert("HAHA!", "El Botón funciona");
}  

//*************HOJA DE ESTILOS***********
const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'space-between',
      backgroundColor: '#8C8C8C',
  },
  title: {
    flexDirection: 'row', 
    flex: 1, 
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  logo: {
    flex: 1, 
    height: 40
  },
  menu: {
    flex: 1, 
    color: "#fff", 
    textAlign: 'center', 
    fontWeight: 'bold', 
    fontSize: 20
  },
  menuButton: {
    flex: .8, 
    borderBottomWidth: .5, 
    borderTopWidth: .5
  },
  menuView: {
    flexDirection: 'row', 
    flex: 1, 
    alignItems: 'center', 
    marginHorizontal: '10%'
  },
  menuText: {
    flex: 1, 
    color: '#fff', 
    fontSize: 20, 
    marginLeft: '4%'
  },
  goButton: {
    height: '8%',
    borderRadius: 4,
    marginHorizontal: '5%',
    marginBottom: '5%',
    backgroundColor: '#FD9325',
  },
  goButtonText: {
    flex: 1,
    color: '#FFFFFF',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

module.exports = SideMenu;