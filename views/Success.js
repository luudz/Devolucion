//***********************************************************************************//
//Se reciben los datos: nombre de cliente y valor total en $ (pesos) de la devolucion//
//Se muestra la pantalla de confimarción del registro de la devolución               //
//***********************************************************************************//
'use strict'

import React, {Component} from 'react';
import { 
	View, 
	Text, 
	Image, 
	TouchableHighlight, 
	StyleSheet, 
	AsyncStorage 
} from 'react-native';

class Success extends Component{

	constructor(props) {
	  super(props);
	  this.passProps = this.props.route.passProps;
	  this.state = {
		    route: '',
		    total: 0,
		}
	}

	componentDidMount(){
		this._loadInitialState().done();
	}

	_loadInitialState =  async () => {
		var route = await AsyncStorage.getItem('route');

		  if (route !== null){
		    // We have data!!
		    this.setState({route: route});
		    console.log(route);
		}
	}

	//Vista
	render (){
		return(
			<View style={styles.page}>
				<View style = {{alignItems: 'center'}}>
					<Image style = {styles.image} resizeMode = {Image.resizeMode.contain} source={require('../src/images/success.png')}/>
				</View>
				<Text style = {styles.success}>Registro exitoso</Text>
				<View style = {styles.container}>
					<Image style = {styles.imageContain} resizeMode = {Image.resizeMode.center} source={require('../src/images/route.png')}/>
					<Text style = {styles.textContain}>{this.state.route}</Text>
				</View>
        		<View style = {styles.container}>
	        		<Image style = {styles.imageContain} resizeMode = {Image.resizeMode.center} source={require('../src/images/person.png')}/>
					<Text style = {styles.textContain}>{this.passProps.client.name}</Text>
				</View>
				<View style = {styles.container}>
					<Image style = {styles.imageContain} resizeMode = {Image.resizeMode.center} source={require('../src/images/cash.png')}/>
					<Text style = {styles.textContain}>{this.passProps.total}</Text>
				</View>
				<TouchableHighlight style = {styles.button} secureTextEntry= {true} onPress={(this.onReady.bind(this))}>
		        	<Text style = {styles.buttonText}>Listo</Text>
		      	</TouchableHighlight>
			</View>
		);
	}

	//Funcionalidad del botón
	onReady(){
		//Se valida si existeste más de un cliente
		if(this.passProps.count == 1){
			//Cuando sólo existe un cliente, o es el último cliente de la lista, 
			//se regresa al usuario al login de la aplicación 
			this.props.navigator.resetTo({
		      name: 'Login',
		      title: 'Login',
		      passProps: {}
		    });
		}else{
			//Cuandoo hay un cliente sin registrar en la lista, el usuario regresa a la 
			//lista de clientes
			this.passProps.client.status = "visitado";
			console.log("success");
			console.log(this.passProps.client);
			this.props.navigator.resetTo({
				name: 'ClientList',
				title: 'ClientList',
				passProps: {data: this.passProps.clients}
			})
		}
	}
}


//*************HOJA DE ESTILOS***********
const styles = StyleSheet.create({
	page: {
	    flex: 1,
	    alignItems: 'stretch',
	    justifyContent: 'space-between',
	},
	success: {
		flex: 1,
		fontSize: 45,
		fontWeight: 'bold', 
		textAlign: 'center',
		color: "#000000"
	},
	image: {
		marginTop: 30,
		marginBottom: 30,
        height: 250,
    },
	button: {
		height: 60,
		justifyContent: 'center',
		alignItems: 'stretch',
		backgroundColor: '#0076B7',
		borderRadius: 1
	},
	buttonText: {
		flex: 1,
		margin: 15,
		color: 'white',
		textAlign: 'center',
		fontSize: 20,
	},
   container: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	imageContain: {
		height: 65,
	},
	textContain: {
		flex: 1,
		color: "#000000",
		fontSize: 20,
	},
});

module.exports = Success;