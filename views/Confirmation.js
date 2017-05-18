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
	AsyncStorage, 
	ListView, 
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import Header from '../src/components/Header'

class Confirmation extends Component{

	constructor(props){
	    super(props);
	    this.passProps = this.props.route.passProps
	    let total = this.passProps.clients[0].dpvolicionPesos === "0"  ? 0 : this.passProps.clients[0].dpvolicionPesos
	    this.state = {
		    route: '',
		    success: '',
		    total: total.toFixed(2),
		    showDetail: false,
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
			<View style = {styles.page}>
				<Header title = "Registro Devolución"/>
				<View style = {styles.logoNTotal}>
	    			<Image style = {styles.logo} resizeMode = {Image.resizeMode.contain} source={require('../src/images/grupobimbo.png')}/>
	    			<View style = {styles.totalContainer}>
	    				<Text style = {styles.totalText}>TOTAL DEVOLUCIÓN</Text>
	    				<Text style = {[styles.totalText, styles.total]}>{"$ " + this.state.total}</Text>
	    			</View>
				</View>
				<View style = {styles.clientNRouteContainer}>
    				<Text style = {styles.clientNRouteText}>RUTA</Text>
    				<Text style = {[styles.clientNRouteText, styles.clientNRoute]}>{this.state.route}</Text>
    			</View>
    			<View style = {styles.clientNRouteContainer}>
    				<Text style = {styles.clientNRouteText}>CLIENTE</Text>
    				<Text style = {[styles.clientNRouteText, styles.clientNRoute]}>{this.passProps.clients[0].CLINOM}</Text>
    			</View>
    			<TouchableHighlight style = {styles.detailButton} onPress ={(this.showDetail.bind(this))}>
		        	<Text style = {styles.detailButtonText}>Ver Detalle</Text>
		      	</TouchableHighlight>
		      	{this.renderIf(this.state.showDetail,
		      		<View style = {{flex: 1}}> 
						<Text style = {styles.resum}>RESUMEN</Text>
						<ListView
					        dataSource={this.passProps.dataSource}
					        renderRow={(products, rowId) => this.renderProductList(products, rowId)}
					        renderSeparator={(rowId) => <View key={rowId} style={styles.separator} />}
					    />
					</View>
				)}
		      	<TouchableHighlight style = {[styles.detailButton, styles.backButton]} onPress ={(this.onBack.bind(this))}>
		        	<Text style = {[styles.detailButtonText, styles.backButtonText]}>Regresar</Text>
		      	</TouchableHighlight>
		      	{this.renderIf(!this.state.showDetail,
		      		<View style = {{flex: 1}}> 
					</View>
				)}
				<TouchableHighlight style = {styles.goButton} onPress ={(this.onSave.bind(this))}>
		        	<Text style = {styles.goButtonText}>Confirmar</Text>
		      	</TouchableHighlight>
		      	<View style = {styles.navState}>
	              	<Icon name = "md-radio-button-off" size = {10} color = "#000" style = {styles.dot}/>
	              	<Icon name = "md-radio-button-off" size = {10} color = "#000" style = {styles.dot}/>
	        		<Icon name = "md-radio-button-on" size = {10} color = "#000" style = {styles.dot}/>
	              	<Icon name = "md-radio-button-off" size = {10} color = "#000" style = {styles.dot}/>
			    </View>
			</View>
		);
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

	showDetail(){
		this.setState({showDetail: !this.state.showDetail})
	}

	sendInventory() {
		// var data = 'ceve='+this.state.CeVe+'&FECHA=20160812&'+'RUTA='+this.state.route+'&'+'PASS='+this.state.password
		// console.log("data: "+data)
		const URL = 'http://192.168.2.210:7001/MarinaWS/json/pc/app/ruta_cliente/put?'// + data	
		// console.log("URL: "+URL);
		// console.log(base64.encode("SALES.FORCE:123qwe"));

		let fetchData = {
			method: 'GET',
			headers: {
		    	'Authorization': "Basic U0FMRVMuRk9SQ0U6MTIzcXdl",
			    'Accept': 'application/json',
			    'Content-Type': 'application/json',
			  },
		}

		fetch(URL, fetchData)
		.then(function(response) {console.log(response.json); return response.json()})
		.then((res) => {
		  	if(res.success === true){
		  		this.props.navigator.resetTo({
					title: 'Success',
					name: 'Success',
					passProps: {clients: this.passProps.clients, count: this.passProps.count}
					// passProps: {clients: this.passProps.clients, client: this.passProps.client, count: this.passProps.count}
				});
	  	  	}else{
  	  			Alert.alert("ERROR", res.responseMsg)
	  	  	}
		})
		.done();
  	}

  	onBack(){
  		this.props.navigator.resetTo({
			title: 'ClientDetail',
			name: 'ClientDetail',
			passProps: {clients: this.passProps.clients, count: this.passProps.count}
			// passProps: {clients: this.passProps.clients, client: this.passProps.client, count: this.passProps.count}
		});
  	}

	sendData() {
		// var data = 'ceve='+this.state.CeVe+'&FECHA=20160812&'+'RUTA='+this.state.route+'&'+'PASS='+this.state.password
		// console.log("data: "+data)
		const URL = 'http://192.168.2.210:7001/MarinaWS/json/pc/app/ruta_cliente/put?'
		// console.log("URL: "+URL);
		// console.log(base64.encode("SALES.FORCE:123qwe"));

		let fetchData = {
			// method: 'GET',
			method: 'POST',
			headers: {
		    	'Authorization': "Basic U0FMRVMuRk9SQ0U6MTIzcXdl",
			    'Accept': 'application/json',
			    'Content-Type': 'application/json',
			  },
			  // body: JSON.stringify({
			  //   "FECHA" : 'fecha',
			  //   "codigo_ruta": 'yourOtherValue',
			  //   "ITEMID": 'yourValue',
			  //   "DEVPZ" : 'productsList',
			  // })
		}

		fetch(URL, fetchData)
		.then(function(response) {console.log(response.json); return response.json()})
		.then((res) => {
		  	if(res.success === "true"){
		  		this.sendInventory();
			}else{
				Alert.alert("Error", res.responseMsg);
			}
		})
		.done();
  	}

	//Funcionalidad botón 
	onSave(){
		//********Servicio de validación del registro******** 
		//si es satisfactorio: redirecciona al usuario a la pantalla de registro exitoso
		console.log("onSave");
		// this.sendData();
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
		backgroundColor: '#FFFFFF',
		alignItems: 'stretch',
	},
	logoNTotal: {
		flexDirection: 'row',
		height: '11%',
		alignItems: 'center',
	},
	logo: {
		flex: 1,
		height: '50%',
	},
	totalContainer: {
		flex: 1,
		alignItems: 'stretch',
	},
	clientNRouteContainer: {
		height: '9%',
		justifyContent: 'flex-start'
	},
	totalText: {
		flex: 1,
		textAlign: 'right',
		marginRight: '5%',
		textAlignVertical: 'bottom',
		color: 'gray',
		fontSize: 15,
	},
	total : {
		fontSize: 25,
		fontWeight: 'bold',
		textAlignVertical: 'top',
	},
	clientNRouteText: {
		fontSize: 15,
		textAlign: 'right',
		marginRight: '5%',
	},
	clientNRoute: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	detailButton: {
		backgroundColor: '#EEEEEE',
		height: '9%',
	},
	detailButtonText: {
		flex: 1,
		color: 'gray',
		textAlignVertical: 'center',
		textAlign: 'center',
		fontSize: 23,
	},
	backButton: {
		backgroundColor: '#8C8C8C',
	},
	backButtonText: {
		color: '#FFFFFF'
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
	resum: {
		fontSize: 25,
		fontWeight: 'bold',
		paddingLeft: '5%',
		borderBottomWidth: 1.5,
	},
});

module.exports = Confirmation;