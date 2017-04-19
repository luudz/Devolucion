//***************************************************************//
// El usuario configura la URL para la selección de la lista de  //
// CeVe's a mostrar en el Picker (comboBox) de inicio del Login.  //
// Para modificar la configuración se debe autentificar con un   //
// nombre de usuario y Contraseña                                //
//***************************************************************//
'use strict'

import React, {Component} from 'react';
import {Text, TextInput, View, StyleSheet, TouchableHighlight, Alert} from 'react-native';

class Settings extends Component{

	constructor(props) {
	    super(props);
	    this.state = {
		    url: 'https://goo.gl/pbdCRX'
		};
	 }

	//VISTA// 
	render(){
		return(
			<View style = {styles.container}>
				<Text style = {styles.text}>URL</Text>
				<TextInput style = {styles.textInput} 
				ref = "url"
				defaultValue = "https://goo.gl/pbdCRX"
				onChangeText={(text) => {
          			this.setState({url:text});
        		 }}
        		 onSubmitEditing={(event) => {
     				this.refs.usr.focus();}}/>
				<TextInput style = {styles.textInput}
				ref = 'usr'
				autoFocus = {true} 
				placeholder="Usuario"
				onChangeText={(text) => {
          			this.setState({user:text});
        		 }}
        		 onSubmitEditing={(event) => {
     				this.refs.psw.focus();}}/>
				<TextInput secureTextEntry= {true} 
				ref = 'psw' 
				style = {styles.textInput} 
				placeholder="Contraseña"
				onChangeText={(text) => {
          			this.setState({password:text});
        		 }}/>
				<TouchableHighlight secureTextEntry= {true} style = {styles.button} onPress={(this.onSave.bind(this))}>
		        	<Text style = {styles.buttonText} >Guardar</Text>
		      	</TouchableHighlight>
			</View>
		);
	}

	//Funcionalidad del botón guardar
	onSave(){
		//Valida que los campos requeridos estén llenos
	  	if(!this.state.user || !this.state.password||!this.state.url){
			Alert.alert("Error",
			"Debes llenar todos los campos"	
			);
		}
		else{
			//Almacena el valor de las variables correspondientes a URL, usuario y contraseña
			var url = this.state.url;
			var user = this.state.user;
			var password = this.state.password;
			Alert.alert ("Sesión",
			"Datos guardados: URL: " + url + " usuario: " + user);

		  	this.props.navigator.pop();	
		}
  	}
}

//*************HOJA DE ESTILOS***********
const styles = StyleSheet.create({
	container: {
	    flex: 1,
	    alignItems: 'center',
	    paddingTop: 50,
	    justifyContent: 'space-between',
	},
	text: {
		width:200,
		fontWeight: 'bold',
	},
	textInput: {
		width: 300,
	},
	button: {
		height: 60,
		width: 400,
		backgroundColor: '#0076B7',
		justifyContent: 'center',
		borderRadius: 5
	},
	buttonText: {
		color: 'white',
		textAlign: 'center',
	}
});

module.exports = Settings;