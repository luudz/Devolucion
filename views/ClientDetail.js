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

import Icon from 'react-native-vector-icons/Ionicons';

import SideMenu from '../src/components/SideMenu'
import Header from '../src/components/Header' 

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
		    refund: 0,
		    total: 0,
		    showSideMenu: false,
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
	      	<View style = {styles.productContainer}>
	      		<View style = {styles.productDetail}>
			        <Text style = {styles.prodCod}>{products.codigo_producto}</Text>
			        <Text style = {styles.prodDesc}>{products.descr_producto}</Text>
			    </View>
			    <TouchableHighlight onPress = {() => this.subtract(products)} style = {styles.quitButton}>
					<Icon name = "md-remove" size = {30} color = "#fff" />
				</TouchableHighlight>
				<TextInput style = {styles.textInput}  
					keyboardType = 'numeric'
					placeholder = '0'
					underlineColorAndroid = "white"
					onChangeText={(refund) => {this.setState({refund:refund});}} 
					onEndEditing={() => this.saveRefund(products,this.state.refund)}/>
				<TouchableHighlight onPress = {() => this.add(products)} style = {[styles.quitButton, styles.addButton]}>
					<Icon name = "md-add" size = {30} color = "#fff" />
    			</TouchableHighlight>
		    </View>
	    )
	}

	//*********************************//
	renderIf(condition, content){
		if(condition){
			return content;
		}else{
			return null;
		}
	}
	//*********************************//


	//VISTA//
	render (){
		// console.log("ClientDetail")
		return(
			<View style = {styles.page}>
				<Header title = "Registro Devolución"/>
				<View style = {styles.logoNRoute}>
	    			<Image style = {styles.logo} resizeMode = {Image.resizeMode.contain} source={require('../src/images/grupobimbo.png')}/>
	    			<View style = {styles.routeContainer}>
	    				<Text style = {styles.routeText}>RUTA</Text>
	    				<Text style = {[styles.routeText, styles.route]}>{this.state.route}</Text>
	    			</View>
				</View>
				<View style = {styles.clientContainer}>
    				<Text style = {styles.routeText}>CLIENTE</Text>
    				<Text style = {[styles.routeText, styles.route]}>{this.passProps.clients[0].CLINOM}</Text>
    			</View>
    			<Text style = {styles.product}>Productos</Text>
    			<ScrollView>
    			<ListView 
				        dataSource={this.state.dataSource}
				        renderRow={(products, rowId) => this.renderProductList(products, rowId)}
				    />
				</ScrollView>
				<TouchableHighlight style = {styles.goButton} onPress={(this.onContinue.bind(this))}>
		        	<Text style = {styles.goButtonText}>Guardar</Text>
		      	</TouchableHighlight>
				<View style = {styles.navState}>
					<Icon name = "md-radio-button-off" size = {10} color = "#000" style = {styles.dot}/>
					<Icon name = "md-radio-button-on" size = {10} color = "#000" style = {styles.dot}/>
					<Icon name = "md-radio-button-off" size = {10} color = "#000" style = {styles.dot}/>
					<Icon name = "md-radio-button-off" size = {10} color = "#000" style = {styles.dot}/>
			    </View>
			</View>
		);
	}

	add(product){

	}

	subtract(product){

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
	onMenu(){
		//Si el usuario selecciona "salir", se termina la sesión y es redireccionado al Login
		// this.setState({showSideMenu: !this.state.showSideMenu})
		Alert.alert (
	  	  	"JASJIAD",
	  	  	"blasdr "
	  	  );
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
  		console.log("refund");
  		if (refund === ""){
  			console.log("vacío")
  			refund = "0";
  		}
  		console.log(refund);
  		if(product.devolucionPZ !== "0"){
  			total -= parseFloat(product.precio_fresco) * parseFloat(product.devolucionPZ);
  		}
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
		backgroundColor: '#FFFFFF',
		justifyContent: 'center',
		alignItems: 'stretch',
	},
	logoNRoute: {
		flexDirection: 'row',
		height: '9%',
		alignItems: 'center',
	},
	logo: {
		flex: 1,
		height: '80%',
	},
	routeContainer: {
		flex: 1,
		alignItems: 'stretch',
	},
	clientContainer: {
		height: '9%',
		justifyContent: 'flex-start'
	},
	routeText: {
		flex: 1,
		textAlign: 'right',
		marginRight: '5%',
		textAlignVertical: 'bottom',
		color: 'gray',
		fontSize: 12,
	},
	route: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlignVertical: 'top',
	},
	product: {
		fontSize: 20,
		fontWeight: 'bold',
		marginTop: '5%',
		paddingLeft: '5%',
		borderBottomWidth: 1.5,
	},
	goButton: {
		height: '8%',
		borderRadius: 4,
		marginHorizontal: '5%',
		marginTop: '2%',
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
	navState: {
		height: '1%',
		alignItems: 'center', 
		flexDirection: 'row', 
		justifyContent: 'center',
		marginBottom: '1%', 
		marginTop: 5
	},
	dot: {
		marginHorizontal: '2%',
	},
	productContainer: {
		flex: 1,
		height: '50%',
		flexDirection: 'row',
		borderBottomWidth: 0.5,
		alignItems: 'center'
	},
	productDetail: {
		width: '60%',
		marginLeft: '5%',
	},
	prodCod: {
		flex:1,
		fontSize: 15,
		fontWeight: 'bold',
		marginTop: '3%',
	},
	prodDesc: {
		flex:2,
		fontSize: 10,
		marginBottom: '3%'
	},
	quitButton: {
		flex: 1,
		height: '80%',
		borderRadius: 3,
		justifyContent: 'center',
		backgroundColor: '#8C8C8C',
		alignItems: 'center'
	},
	addButton: {
		backgroundColor: '#FD9325',
		marginRight: '1%',
	},
	textInput:{
		fontSize: 15,
		color: 'gray',
		textAlign: 'center',
	},
});

module.exports = ClientDetail;

