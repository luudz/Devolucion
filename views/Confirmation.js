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
	ListView, 
} from 'react-native';

class Confirmation extends Component{

	constructor(props){
	    super(props);
	    this.passProps = this.props.route.passProps
  	}

  	//Renderiza la lista de de productos del cliente correspondiente
	renderProductList(products, rowId){
	    return(
	      	<View style = {{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch', borderTopWidth: 0.5}}>
		        <Text style = {{flex:1, fontSize: 15, textAlign: 'center', marginTop: 5, marginBottom: 5}}>{products.CLICOD}</Text>
		        <Text style = {{flex:2, fontSize: 15, marginTop: 5, marginBottom: 5}}>{products.descr_producto}</Text>
		        <Text style = {{flex:1, fontSize: 15, textAlign: 'center', marginTop: 5, marginBottom: 5}}>{products.devolucionPZ}</Text>
		    </View>
	    )
	}

  	//VISTA//
	render (){
		return(
			<View style={styles.page}>
				<View style = {styles.header}>
					<TouchableHighlight style = {{flex: 2, justifyContent: 'center', alignItems: 'flex-start'}}>
	        			<Image style = {{height: 40, width: 40}}resizeMode = {Image.resizeMode.center} source={require('../src/images/menu.png')}/>
					</TouchableHighlight>
        			<Image style = {styles.logo} resizeMode = {Image.resizeMode.contain} source={require('../src/images/grupobimbo.png')}/>
				</View>
				<Text style = {styles.textTitle}>Registro devolución</Text>
				<View style = {styles.container}>
	        		<Image style = {styles.imageContain} resizeMode = {Image.resizeMode.center} source={require('../src/images/person.png')}/>
					<Text style = {styles.textContain}>{this.passProps.clients[0].CLINOM}</Text>
				</View>
				<View style = {styles.container}>
						<Image style = {styles.imageContain} resizeMode = {Image.resizeMode.center} source={require('../src/images/cash.png')}/>
						<Text style = {styles.textContain}>{this.passProps.clients[0].dpvolicionPesos}</Text>
					</View>
				<View style = {styles.headerListView}>
					<Text style={styles.textHeaderListView}>Código</Text>
					<Text style={styles.textHeaderListView}>Producto</Text>
					<Text style={{flex:2, fontSize: 20, fontWeight: 'bold', textAlign: 'right', color: '#0076B7', paddingRight: 10}}>Devolución</Text>
				</View>
				<ListView
			        dataSource={this.passProps.dataSource}
			        renderRow={(products, rowId) => this.renderProductList(products, rowId)}
			        renderSeparator={(rowId) => <View key={rowId} style={styles.separator} />}
			    />
		      	<View style = {{alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
	        		<Image style = {{height: 10}} resizeMode = {Image.resizeMode.center} source={require('../src/images/views.png')}/>
	        		<Image style = {{height: 10}} resizeMode = {Image.resizeMode.center} source={require('../src/images/views.png')}/>
	        		<Image style = {{height: 10}} resizeMode = {Image.resizeMode.center} source={require('../src/images/currentView.png')}/>
			    </View>
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
			passProps: {clients: this.passProps.clients, count: this.passProps.count}
			// passProps: {clients: this.passProps.clients, client: this.passProps.client, count: this.passProps.count}
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
		marginBottom: 20,
		height: 70
	},
	logo: {
		flex: 1,
        height: 70,
    },
	textTitle: {
		fontSize: 25,
		justifyContent: 'flex-start',
		alignItems: 'center',
		fontWeight: 'bold',
		color: '#EF6C00',
		marginLeft: 30,
		marginBottom: 10,
	},
	button: {
		height: 40,
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
		marginBottom: 20,
	},
	imageContain: {
		height: 30,
	},
	textContain: {
		flex: 1,
		color: "#000000",
		fontSize: 15,
		fontWeight: 'bold',
	},
	clientText: {
		flex: 1,
		fontSize: 15,
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
	headerListView: {
	    flexDirection: 'row',
	    alignItems: 'center',
	    justifyContent: 'space-between',
	    borderBottomWidth: 1.5,
	    borderColor: '#0076B7',
	},
	textHeaderListView: {
		flex:1,
		fontSize: 20,
		color: '#0076B7',
		fontWeight: 'bold',
		textAlign: 'center',
	},
});

module.exports = Confirmation;