//***************************************************************************************//
// Se muestra la lista de productos correspondientes al cliente seleccionado.			 //
// Permite modificar el valor de la devolución, agregar y quitar productos de la lista.  //
//***************************************************************************************//

import React, {Component} from 'react';
import { View, Text, Image, TouchableHighlight, StyleSheet, AsyncStorage, ListView, TextInput, Alert, RefreshControl } from 'react-native';

import HeaderListView from '../src/components/HeaderListView'

// import dataSource from '../src/data/products'

class ClientDetail extends Component{

	
	constructor(props){
	    super(props);
		var total = 0; //Total en pesos del valor de la devolución
	    this.passProps = this.props.route.passProps
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	    this.state = {
		    route: '',
		    refund: 0,
		    dataSource: ds.cloneWithRows(this.passProps.client.products),
		    total: 0,
	    };
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

	//Renderiza la lista de de productos del cliente correspondiente
	renderProductList(products, rowId){
	    return(
	      	<View style = {{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
		        <Text style = {styles.clientText}>{products.sku}</Text>
		        <Text style = {styles.clientText}>{products.product}</Text>
    			<TextInput style = {styles.textInput}  
  					keyboardType = 'numeric'
    				placeholder = '0' 
    				onChangeText={(text) => this.saveRefund(rowId,text)}/>
    			<TouchableHighlight style = {{alignItems: 'center'}} onPress={() => this.onDelete(rowId,products.product)}>
					<Image style = {styles.clientImage} resizeMode = {Image.resizeMode.contain} source={require('../src/images/delete.png')}/>
				</TouchableHighlight>
		    </View>
	    )
	}

	//VISTA//
	render (){
		return(
			<View style={styles.page}>
				<View style={styles.header}>
					<Text style = {styles.textHeader}>Detalle Cliente</Text>
        			<Image style = {styles.logo} resizeMode = {Image.resizeMode.center} source={require('../src/images/grupobimbo.png')}/>
				</View>
				<View style = {styles.container}>
	        		<Image style = {styles.imageContain} resizeMode = {Image.resizeMode.contain} source={require('../src/images/person.png')}/>
					<Text style = {styles.textContain} >{this.passProps.client.name}</Text>
				</View>
				<View style = {styles.container}>
					<Image style = {styles.imageContain} resizeMode = {Image.resizeMode.contain} source={require('../src/images/route.png')}/>
					<Text style = {styles.textContain} >{this.state.route}</Text>
				</View>
				<HeaderListView/>
				<ListView 
			        dataSource={this.state.dataSource}
			        renderRow={(products, rowId) => this.renderProductList(products, rowId)}
			        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
			    />
				<TouchableHighlight style = {{alignItems: 'center'}} onPress={(this.onAdd.bind(this))}>
					<Image resizeMode = {Image.resizeMode.center} source={require('../src/images/add.png')}/>
				</TouchableHighlight>
				<View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch'}}>
					<Text style = {styles.text}>Total $ </Text>
					<Text style = {styles.text}>{this.state.total}</Text>
				</View>
				<TouchableHighlight onPress={(this.onExit.bind(this))}> 
					<View style={styles.containerExit}>
						<Text style = {styles.textExit} >Salir</Text>
	        			<Image style = {styles.imageExit} resizeMode = {Image.resizeMode.center} source={require('../src/images/exit.png')}/>
					</View>
				</TouchableHighlight>
				<TouchableHighlight style = {styles.button} onPress={(this.onContinue.bind(this))}>
		        	<Text style = {styles.buttonText}>Continuar</Text>
		      	</TouchableHighlight>
			</View>
		);
	}

	//Funcionalidad botón
	onContinue(){
		//Redirecciona al usuario a la pantalla de confirmación
		//Almacenamiento temporal de los valores modificados
		this.props.navigator.push({
			title: 'Confirmation',
			name: 'Confirmation',
			passProps: {clients: this.passProps.clients, client: this.passProps.client, count: this.passProps.count, total: this.state.total, dataSource: this.state.dataSource.cloneWithRows(this.passProps.client.products)}
		});
	}

	//Funcionalidad "Salir"
	onExit(){
		//Si el usuario selecciona "salir", se termina la sesión y es redireccionado al Login
		this.props.navigator.resetTo({
			title: 'Login',
			name: 'Login',
			passProps: {}
		});
	}

	//Funcionalidad "Agregar producto"
	onAdd(){
  	  // Alert.alert ("Configuración");
  	  this.props.navigator.push({
  	  	title: 'AddProduct',
  	  	name: 'AddProduct',
  	  	passProps: {}
  	  });  	
  	}

  	makeDelete(rowID){
  	  dataSource.splice(rowID,1);
  	  this.setState({
  	  	dataSource: this.state.dataSource.cloneWithRows(dataSource)
  	  })
  	  console.log(this.state.dataSource)
  	}

  	onDelete(rowID, product){
  	  Alert.alert (
  	  	"BORRAR",
  	  	"¿Deseas borrar " + product + "?",
  	  	[
  	  		{text: 'Si', onPress: (this.makeDelete.bind(this))},
  	  		{text: 'No'}
  	  	]
  	  );
  	}

  	saveRefund(row, refund){
	  	dataSource[row].refund = refund
	  	
	  	total += parseInt(dataSource[row].price) * parseInt(dataSource[row].refund);
	  	this.setState({total: total});
	  	// this.passProps.client.refund = total;
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
		height: 70,
		marginBottom: 10,
	},
	logo: {
		flex: 1,
        height: 50,
    },
	textHeader: {
		fontSize: 30,
		textAlign: 'center',
		flex: 2,
		color: 'white',
	},
	text: {
		flex: 1,
		color: "#000000",
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center'
	},
	container: {
		flexDirection: 'row',
		marginBottom: 10,
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
	containerExit: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end'
	},
	textExit: {
		flex: 1,
		textAlign: 'right',
		fontSize: 20,
	},
	imageExit: {
		height: 40,
	},
	button: {
		height: 60,
		backgroundColor: '#0076B7',
		justifyContent: 'center',
		alignItems: 'stretch',
		borderRadius: 1
	},
	buttonText: {
		flex:1,
		margin: 15,
		color: 'white',
		textAlign: 'center',
		fontSize: 20,
	},
	clientText: {
		flex: 1,
		fontSize: 20,
	},
	clientImage:{
		height: 20,
	},
	textInput: {
		fontSize: 20,
		alignItems: 'flex-end',
	}
});

module.exports = ClientDetail;

