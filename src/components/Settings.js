//***************************************************************//
// El usuario configura la URL para la selección de la lista de  //
// CeVe's a mostrar en el Picker (comboBox) de inicio del Login.  //
// Para modificar la configuración se debe autentificar con un   //
// nombre de usuario y Contraseña                                //
//***************************************************************//
'use strict'

import React, {Component} from 'react';
import {Text,
		TextInput,
		View,
		StyleSheet,
		TouchableHighlight,
		Alert,
		AsyncStorage
} from 'react-native';

import Header from './Header'

class Settings extends Component{

	constructor(props) {
	    super(props);
	    this.state = {
		    // url: 'https://goo.gl/pbdCRX'
		    urlgs: '',
		    usergs: '',
		    passgs: '',
		};
	 }

	 componentDidMount(){
		this._loadInitialState().done();
	}

	_loadInitialState =  async () => {
		AsyncStorage.multiGet(['urlgs','usergs','passgs'])
		// AsyncStorage.multiGet(['route', 'CeVe', 'pass', 'isLogged'])
		.then((sesion) => {
			this.setState({urlgs: sesion[0][1]});
			this.setState({usergs: sesion[1][1]});
			this.setState({passgs: sesion[2][1]});
		})
	}

	//VISTA// 
	render(){
		return(
			<View style = {styles.page}>
				<Header title = "Configuración" />
				<Text style = {styles.text}>URL</Text>
				<TextInput style = {styles.textInput} 
				ref = "url"
				defaultValue = {this.state.urlgs}
				// defaultValue = "https://goo.gl/pbdCRX"
				onChangeText={(text) => {
          			this.setState({urlgs:text?text:this.state.urlgs});
        		 }}
        		 onSubmitEditing={(event) => {
     				this.refs.usr.focus();}}/>
     			<Text style = {styles.text}>USUARIO GS</Text>
				<TextInput style = {styles.textInput}
				ref = 'usr'
				autoFocus = {true} 
				onChangeText={(text) => {
          			this.setState({usergs:text});
        		 }}
        		 onSubmitEditing={(event) => {
     				this.refs.psw.focus();}}/>
     			<Text style = {styles.text}>CONTRASEÑA GS</Text>
				<TextInput secureTextEntry= {true} 
				ref = 'psw' 
				style = {styles.textInput} 
				onChangeText={(text) => {
          			this.setState({passgs:text});
        		 }}/>
        		<View style = {{flex: 1}}></View>
				<TouchableHighlight style = {styles.goButton} onPress={(this.onSave.bind(this))}>
		        	<Text style = {styles.goButtonText} >Actualizar</Text>
		      	</TouchableHighlight>
			</View>
		);
	}

	//Funcionalidad del botón guardar
	onSave(){
		//Valida que los campos requeridos estén llenos
	  	if(!this.state.usergs || !this.state.passgs||!this.state.urlgs){
			Alert.alert("Error",
			"Debes llenar todos los campos"	
			);
		}
		else{
			//Almacena el valor de las variables correspondientes a URL, usuario y contraseña
			// var url = this.state.urlgs;
			// var user = this.state.usergs;
			// var password = this.state.passgs;
			AsyncStorage.multiSet([
			  			['urlgs', this.state.urlgs],
			  			['usergs', this.state.usergs],
			  			['passgs', this.state.passgs],
			]);	

			Alert.alert ("Sesión",
			"Datos guardados: URL: " + this.state.urlgs + " usuario: " + this.state.usergs);

		  	this.props.navigator.pop({});	
		}
  	}
}

//*************HOJA DE ESTILOS***********
const styles = StyleSheet.create({
	page: {
		flex: 1,
		backgroundColor: '#EEEEEE',
		alignItems: 'stretch',
	},
	text: {
		color: 'gray',
		fontSize: 20,
		fontWeight: 'bold',
		marginLeft: '5%',
		marginTop: '5%'
	},
	textInput:{
		height: 45,
		fontSize: 15,
		marginHorizontal: '5%',
		color: 'gray',
		backgroundColor: '#FFFFFF',
	},
	goButton: {
		height: '9%',
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

module.exports = Settings;