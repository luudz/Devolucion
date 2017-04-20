//*********************************************************************************************//
// Muestra al usuario una tabla de productos con el valor de devolción que va a ser registrado. //
//*********************************************************************************************//
'use strict'

import React, {Component} from 'react';
import {
	View, 
	Text, 
	Image, 
	TouchableHighlight, 
	Alert, 
	StyleSheet, 
	ListView 
} from 'react-native';

import HeaderListView from '../src/components/HeaderListView'

class Confirmation extends Component{

	constructor(props){
	    super(props);
	    this.passProps = this.props.route.passProps
  	}

  	//Renderiza la lista de de productos del cliente correspondiente
	renderProductList(products, rowId){
	    return(
	      	<View style = {{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
		        <Text style = {styles.clientText}>{products.sku}</Text>
		        <Text style = {styles.clientText}>{products.product}</Text>
		        <Text style = {styles.clientText}>{products.refund}</Text>
		    </View>
	    )
	}

  	//VISTA//
	render (){
		return(
			<View style={styles.page}>
				<View style = {styles.header}>
					<Text style = {styles.text}>Registro de devolución</Text>
        			<Image style = {styles.logo} resizeMode = {Image.resizeMode.center} source={require('../src/images/grupobimbo.png')}/>
				</View>
				<View style = {styles.container}>
	        		<Image style = {styles.imageContain} resizeMode = {Image.resizeMode.center} source={require('../src/images/person.png')}/>
					<Text style = {styles.textContain}>{this.passProps.client.name}</Text>
				</View>
				<HeaderListView/>
				<ListView
			        dataSource={this.passProps.dataSource}
			        renderRow={(products, rowId) => this.renderProductList(products, rowId)}
			        renderSeparator={(rowId) => <View key={rowId} style={styles.separator} />}
			    />
			    <TouchableHighlight style = {styles.buttonCancel} onPress={(this.onCancel.bind(this))}>
		        	<Image resizeMode = {Image.resizeMode.contain} style = {styles.imageCancel} source={require('../src/images/cancel.png')}/>
		      	</TouchableHighlight>
				<TouchableHighlight style = {styles.button} onPress ={(this.onSave.bind(this))}>
		        	<Text style = {styles.buttonText}>Guardar</Text>
		      	</TouchableHighlight>
			</View>
		);
	}

	//Funcionalidad botón 
	onSave(){
		//********Servicio de validación del registro******** 
		//si es satisfactorio: redirecciona al usuario a la pantalla de registro exitoso
		this.props.navigator.resetTo({
			title: 'Success',
			name: 'Success',
			passProps: {clients: this.passProps.clients, client: this.passProps.client, count: this.passProps.count}
		});
		//si falla: muestra mensaje de error
	}

	onCancel(){
  	  // Alert.alert ("Configuración");
  	  this.props.navigator.replace({
  	  	title: 'ClientDetail',
  	  	name: 'ClientDetail',
  	  	passProps: {}
  	  });  	
  	}
}


//*************HOJA DE ESTILOS***********
const styles = StyleSheet.create({
	page: {
	    flex: 1,
	    alignItems: 'stretch',
	    justifyContent: 'space-between',
	},
	header:{
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#0076B7',
		marginBottom: 30,
		height: 70
	},
	logo: {
		flex: 1,
        height: 50,
    },
	text: {
		fontSize: 25,
		textAlign: 'center',
		flex: 2,
		color: 'white',
	},
	button: {
		height: 40,
		marginTop: 20,
		alignItems: 'stretch',
		backgroundColor: '#0076B7',
		justifyContent: 'space-between',
		borderRadius: 1
	},
	buttonText: {
		flex: 1,
		margin:5,
		color: 'white',
		textAlign: 'center',
		fontSize: 20,
	},
	container: {
		flexDirection: 'row',
		marginBottom: 30,
	},
	imageContain: {
		height: 30,
	},
	textContain: {
		flex: 1,
		color: "#000000",
		fontSize: 20,
		fontWeight: 'bold',
	},
	clientText: {
		flex: 1,
		fontSize: 20,
	},
	buttonCancel: {
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
		marginBottom: 20,
		marginTop: 20,
	},
	imageCancel: {
		height: 40,
	},
});

module.exports = Confirmation;