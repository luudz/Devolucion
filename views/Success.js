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

class Success extends Component{

	constructor(props){
	    super(props);
	    this.passProps = this.props.route.passProps
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	    let total = this.passProps.clients[0].dpvolicionPesos === "0"  ? 0 : this.passProps.clients[0].dpvolicionPesos
	    this.state = {
		    route: '',
		    dataSource: ds.cloneWithRows(this.passProps.clients),
		    success: '',
		    total: total.toFixed(2),
		    showDetail: false
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
    				<Text style = {styles.clientNRouteText}>FOLIO</Text>
    				<Text style = {[styles.clientNRouteText, styles.clientNRoute]}>N012NAC3Q314343</Text>
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
					        dataSource={this.state.dataSource}
					        renderRow={(products, rowId) => this.renderProductList(products, rowId)}
					        renderSeparator={(rowId) => <View key={rowId} style={styles.separator} />}
					    />
					</View>
				)}
				{this.renderIf(!this.state.showDetail,
		      		<View style = {{flex: 1}}> 
					</View>
				)}
				<TouchableHighlight style = {styles.goButton} onPress ={(this.onReady.bind(this))}>
		        	<Text style = {styles.goButtonText}>Clientes</Text>
		      	</TouchableHighlight>
				<View style = {styles.navState}>
	        		<Icon name = "md-radio-button-off" size = {10} color = "#000" style = {styles.dot}/>
	              	<Icon name = "md-radio-button-off" size = {10} color = "#000" style = {styles.dot}/>
	              	<Icon name = "md-radio-button-off" size = {10} color = "#000" style = {styles.dot}/>
	        		<Icon name = "md-radio-button-on" size = {10} color = "#000" style = {styles.dot}/>
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

	//Funcionalidad del botón
	onReady(){
		//Se valida si existeste más de un cliente
		console.log("onReady");
		console.log(this.passProps.count)
		this.passProps.clients[0].dpvolicionPesos = "0" //Línea temporal, únicamente útil para las pruebas de "total"
		// this.sendData();
		if(this.passProps.count <= 1){
			//Cuando sólo existe un cliente, o es el último cliente de la lista, 
			//se regresa al usuario al login de la aplicación 
			console.log(this.passProps.clients);
			// if(msg === "success"){
				this.passProps.clients[0].estatusVisita = "1";
				this.props.navigator.resetTo({
			      name: 'Login',
			      title: 'Login',
			      passProps: {}
			    });
			// }else{
			// 	Alert.alert("Error", msg + ". Intente nuevamente.")
			// }
		}else{
			//Cuandoo hay un cliente sin registrar en la lista, el usuario regresa a la 
			//lista de clientes
			// this.passProps.client.status = "visitado";
			console.log("success");
			console.log(this.passProps.client);
			// if(msg === "success"){
				this.passProps.clients[0].estatusVisita = "1";
				this.props.navigator.resetTo({
					name: 'ClientList',
					title: 'ClientList',
					passProps: {data: this.passProps.clients}
				})
			// }else{
			// 	Alert.alert("Error", msg + ". Intente nuevamente.")
			// }
		}
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
		marginTop: '3%',
		alignItems: 'center',
	},
	logo: {
		flex: 1,
		height: '80%',
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

module.exports = Success;