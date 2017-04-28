//***************************************************************************************//
// Se muestra la lista de productos correspondientes al cliente seleccionado.			 //
// Permite modificar el valor de la devolución, agregar y quitar productos de la lista.  //
//***************************************************************************************//

import React, {Component} from 'react';
import { 
	View, 
	Text, 
	Image, 
	TouchableHighlight, 
	StyleSheet, 
	AsyncStorage, 
	ListView, 
	TextInput, 
	Alert, 
	RefreshControl,
	ScrollView, 
} from 'react-native';

// import dataSource from '../src/data/products'
var total = 0;

class ClientDetail extends Component{

	
	constructor(props){
	    super(props);
		// var total = 0; //Total en pesos del valor de la devolución
	    this.passProps = this.props.route.passProps
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	    this.state = {
		    route: '',
		    dataSource: ds.cloneWithRows(this.passProps.clients),
		    // dataSource: ds.cloneWithRows(this.passProps.client.products),
		    total: 0,
	    };
  	}

  	componentDidMount(){
		this._loadInitialState().done();
	}

	_loadInitialState =  async () => {
		var route = await AsyncStorage.getItem('route');
		  if (route !== null){
		    this.setState({route: route});
		    // console.log(route);
		}
	}

	//Renderiza la lista de de productos del cliente correspondiente
	renderProductList(products, rowId){
		console.log("renderProductList");
	    return(
	      	<View style = {{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch', borderTopWidth: 0.5}}>
		        <Text style = {{flex:1, fontSize: 15, textAlign: 'center', marginTop: 5, marginBottom: 5}}>{products.codigo_producto}</Text>
		        <Text style = {{flex:2, fontSize: 15, marginTop: 5, marginBottom: 5}}>{products.descr_producto}</Text>
    				<TextInput style = {styles.textInput}  
  						keyboardType = 'numeric'
    					placeholder = '0' 
    					onChangeText={(text) => this.saveRefund(products,text)}/>
    				<TouchableHighlight style = {{justifyContent: 'center', alignItems: 'center', width: 40,}} onPress={() => this.onDelete(rowId,products)}>
						<Image style = {styles.clientImage} resizeMode = {Image.resizeMode.center} source={require('../src/images/delete.png')}/>
					</TouchableHighlight>
		    </View>
	    )
	}

	//VISTA//
	render (){
		// console.log("ClientDetail")
		return(
			<View style={styles.page}>
				<View style={styles.header}>
					<TouchableHighlight style = {{flex: 2, justifyContent: 'center', alignItems: 'flex-start'}} onPress={(this.onExit.bind(this))}>
	        			<Image style = {{height: 40, width: 40}}resizeMode = {Image.resizeMode.center} source={require('../src/images/menu.png')}/>
					</TouchableHighlight>
        			<Image style = {styles.logo} resizeMode = {Image.resizeMode.center} source={require('../src/images/grupobimbo.png')}/>
				</View>
				<Text style = {styles.textTitle}>Detalle Cliente</Text>
				<View>
					<View style = {styles.container}>
		        		<Image style = {styles.imageContain} resizeMode = {Image.resizeMode.contain} source={require('../src/images/person.png')}/>
						<Text style = {styles.textContain} >{this.passProps.clients[0].CLINOM}</Text>
					</View>
					<View style = {styles.container}>
						<Image style = {styles.imageContain} resizeMode = {Image.resizeMode.contain} source={require('../src/images/route.png')}/>
						<Text style = {styles.textContain} >{this.state.route}</Text>
					</View>
				</View>
				<View style = {styles.headerListView}>
					<Text style={styles.textHeaderListView}>Código</Text>
					<Text style={styles.textHeaderListView}>Producto</Text>
					<Text style={{flex:2, fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#0076B7'}}>Devolución</Text>
				</View>
				<ScrollView>
					<ListView 
				        dataSource={this.state.dataSource}
				        renderRow={(products, rowId) => this.renderProductList(products, rowId)}
				        renderSeparator={(rowId) => <View key={rowId} style={styles.separator} />}
				    />
				</ScrollView>
				<TouchableHighlight style = {{alignItems: 'center',height: 40, justifyContent:'center'}} onPress={(this.onAdd.bind(this))}>
					<Image resizeMode = {Image.resizeMode.center} source={require('../src/images/add.png')}/>
				</TouchableHighlight>
				<View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch', marginBottom:10}}>
					<Text style = {styles.text}>Total $ </Text>
					<Text style = {styles.text}>{this.state.total}</Text>
				</View>
				<View style = {{alignItems: 'center', flexDirection: 'row', justifyContent: 'center', paddingTop: 5}}>
	        		<Image style = {{height: 10}} resizeMode = {Image.resizeMode.center} source={require('../src/images/views.png')}/>
	        		<Image style = {{height: 10}} resizeMode = {Image.resizeMode.center} source={require('../src/images/currentView.png')}/>
	        		<Image style = {{height: 10}} resizeMode = {Image.resizeMode.center} source={require('../src/images/views.png')}/>
			    </View>
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
		// this.passProps.clients.refund = this.state.total
		this.props.navigator.replace({
			title: 'Confirmation',
			name: 'Confirmation',
			passProps: {clients: this.passProps.clients, count: this.passProps.count, dataSource: this.state.dataSource.cloneWithRows(this.passProps.clients)}
			// passProps: {clients: this.passProps.clients, client: this.passProps.client, count: this.passProps.count, dataSource: this.state.dataSource.cloneWithRows(this.passProps.client.products)}
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
  	  // let newProductList = this.passProps.client.products.splice(rowID,1);
  	  let newProductList = this.passProps.clients.slice()
  	  // this.passProps.client.products.splice(rowID,1);
  	  newProductList.splice(rowID,1);

  	  this.setState({
  	  	dataSource: this.state.dataSource.cloneWithRows(newProductList)
  	  })
  	  console.log(this.state.dataSource)
  	}

  	onDelete(rowID, product){
  	  Alert.alert (
  	  	"BORRAR",
  	  	"¿Deseas borrar " + product.descr_producto + "?",
  	  	[
  	  		{text: 'Si', onPress: (this.makeDelete.bind(this))},
  	  		{text: 'No'}
  	  	]
  	  );
  	}

  	saveRefund(product, refund){
	  	product.devolucionPZ = refund
	  	// product.refund = refund
	  	total += parseFloat(product.precio_fresco) * parseFloat(product.devolucionPZ);
	  	this.setState({total: total.toFixed(2)});
	  	this.passProps.clients[0].dpvolicionPesos = total;
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
	},
	logo: {
		flex: 1,
        height: 50,
    },
	textTitle: {
		fontSize: 25,
		justifyContent: 'flex-start',
		alignItems: 'center',
		fontWeight: 'bold',
		color: '#EF6C00',
		marginLeft: 30,
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
		fontSize: 15,
		fontWeight: 'bold',
	},
	containerExit: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end'
	},
	// textExit: {
	// 	flex: 1,
	// 	textAlign: 'right',
	// 	fontSize: 20,
	// },
	imageExit: {
		height: 40,
	},
	button: {
		height: 40,
		backgroundColor: '#0076B7',
		justifyContent: 'center',
		alignItems: 'stretch',
		borderRadius: 1
	},
	buttonText: {
		flex:1,
		margin: 5,
		color: 'white',
		textAlign: 'center',
		fontSize: 20,
	},
	clientText: {
		flex: 1,
		fontSize: 15,
	},
	clientImage:{
		height: 20,
	},
	textInput: {
		fontSize: 15,
		textAlign: 'center',
		justifyContent: 'center',
		flex: 1,
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

module.exports = ClientDetail;

