//******************************************************************************//
// Carga la lista de los clientes que corresponden a la ruta en forma de lista. //
//******************************************************************************//

import React, {Component} from 'react';
import { 
	View, 
	Text, 
	Image, 
	StyleSheet, 
	AsyncStorage, 
	TouchableHighlight, 
	ListView, 
	Dimensions,
	Animated,
	Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

var count = 0;//corresponde al número de clientes de la ruta
import Header from '../src/components/Header' 
import SideMenu from '../src/components/SideMenu' 
const {width, height} = Dimensions.get('window')

class ClientList extends Component{

	constructor(props) {
	    super(props);
	    this.passProps = this.props.route.passProps
	    console.log(this.passProps.data);
	    const clientList = this.makeClientList(this.passProps.data)
		this.showClientList(clientList)
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	    this.state = {
		    route: '',
		    count: 0,
		    dataSource: ds.cloneWithRows(clientList),

		    isLoaded: false,
            isOpenMenu: false,
            translateX: new Animated.Value(width),
            menuAnimation: new Animated.Value(0)
		};
	}

	componentDidMount(){
		this._loadInitialState().done();
	}

	_loadInitialState =  async () => {
		var route = await AsyncStorage.getItem('route');
		// AsyncStorage.multiGet(['route', 'dataSource'])
		// AsyncStorage.multiGet(['route', 'dataSource', 'isLogged'])
		// .then((data) => {
		// 	// this.setState({route: data[0][1]});
		// 	console.log(data);
		// // 	// console.log(data[0][1]);
		// // 	// console.log(data[1][1]);
		//     this.setState({route: route});
		// });
		if (route !== null){		
		    this.setState({route: route});
		}
	}

	showMenu(){
        if(this.state.isOpenMenu){
            this.setState({isOpenMenu: false})
                Animated.timing(
                    this.state.translateX, {
                        toValue: width
                    }
                ).start()
        } else {
            this.setState({isOpenMenu: true})
            Animated.parallel([
                Animated.timing(
                    this.state.translateX, {
                        toValue: width * 0.20
                    }
                ),
                Animated.timing(
                    this.state.menuAnimation, {
                        toValue: 1,
                        duration: 800
                    }
                )
            ]).start()
        }
    }

    closeMenu(){
        this.setState({isOpenMenu: false})
        Animated.parallel([
            Animated.timing(
                this.state.translateX, {
                    toValue: width
                }
            ),
            Animated.timing(
                this.state.menuAnimation, {
                    toValue: 0,
                    duration: 300
                }
            )
        ]).start()
    }

	//Renderiza la lista de clientes como un Botón, para poder mostrar detalles al tocar cada cliente
	renderClient(client, rowId){
		// console.log(client);
	    return(	
	      <TouchableHighlight style = {styles.touchableClient} onPress = {() => this.onClientPressed(rowId, client)}>
	      	<View style = {styles.clientDetail}>
	      		<View style = {{flex: 1}}>
			        <Text style = {styles.cliCod}>{client.CLICOD}</Text>
			        <Text style = {styles.cliNom}>{client.CLINOM}</Text>
		        </View>
            <View style = {styles.statusVisited}>
              <Icon name = "md-checkmark" size = {30} color = "#fff"/>
            </View>
		    </View>
	      </TouchableHighlight>
	    )
	}

	//VISTA//
	render (){
		console.log(ClientList);
		return(
			<View style = {styles.page}>
                <Animated.View
                    style={{
                        width: width,
                        flex: 1,
                        zIndex: 1,
                        transform: [
                            {
                                perspective: 450
                            },
                            {
                                translateX: this.state.translateX.interpolate({
                                    inputRange: [0, width],
                                    outputRange: [width, 0]
                                })
                            },
                        ]
                    }}
                >

                {this.state.isOpenMenu ? <Header title = "Clientes" onPress={this.closeMenu.bind(this)}/> : <Header title = "Clientes" onPress={this.showMenu.bind(this)}/>}
				<View style = {styles.logoNRoute}>
	    			<Image style = {styles.logo} resizeMode = {Image.resizeMode.contain} source={require('../src/images/grupobimbo.png')}/>
	    			<View style = {styles.routeContainer}>
	    				<Text style = {styles.routeText}>RUTA</Text>
	    				<Text style = {[styles.routeText, styles.route]}>{this.state.route}</Text>
	    			</View>
				</View>
				<Text style = {styles.client}>Cliente</Text>
				<ListView
			        dataSource={this.state.dataSource}
			        renderRow={(client, rowId) => this.renderClient(client, rowId)}
			    />
			    <View style = {styles.navState}>
              <Icon name = "md-radio-button-on" size = {10} color = "#000" style = {styles.dot}/>
              <Icon name = "md-radio-button-off" size = {10} color = "#000" style = {styles.dot}/>
              <Icon name = "md-radio-button-off" size = {10} color = "#000" style = {styles.dot}/>
              <Icon name = "md-radio-button-off" size = {10} color = "#000" style = {styles.dot}/>
			    </View>
			    </Animated.View>
                <Animated.View
                    style={{
                        opacity: this.state.menuAnimation,
                        position: 'absolute',
                        width: '80%',
                        left: 0,
                        top: 0,
                        height: '100%',
                        backgroundColor: '#EEEEEE'
                    }}
                >
                    <SideMenu navigator = {this.props.navigator}/>
                </Animated.View>
			</View>
		);
	}


	makeClientList(data){
		var clientList = [];

		clientList[0] = {CLICOD: data[0].CLICOD , CLINOM: data[0].CLINOM, estatusVisita: data[0].estatusVisita}
		
		function checkClient(client){
			return client;
		}

		for (client in data){
			if( clientList.findIndex(checkClient) === -1){
				clientList.push({CLICOD: client.CLICOD, CLINOM: client.CLINOM, estatusVisita: data[0].estatusVisita});
			}
		}
		return clientList;
	}

	//Cuenta cuántos clientes falta por registar
	showClientList(data){
		// console.log(data)
		var i = 0;
		count = data.length-1;
		for(i = 0; i<data.length; i++){
			console.log(data[i].estatusVisita)
			if(data[i].estatusVisita === "1"){
				data.splice(i, 1);
				break;
			}
		}
		if (data.length == 0){
			Alert.alert("Registro terminado",
				"Se ha completado el registro del día",
				[
					{text: 'Entendido'}
				]
			)
		}
	}

	//Funcionalidad "Salir"
	onExit(){
		// Si el usuario selecciona "salir", se termina la sesión y es redireccionado al Login
		console.log("exit");
    // AsyncStorage.multiRemove(['route', 'CeVe', 'pass'])
		// this.props.navigator.resetTo({
		// 	title: 'Login',
		// 	name: 'Login',
		// 	passProps: {}
		// });
		Alert.alert("HAHA!", "El Botón funciona");
	}

	productList(client, data){

		function checkClient(pdt){
			return pdt.CLICOD == client.CLICOD;
		}

		return data.filter(checkClient);
	}

	//Funcionalidad al tocar cada cliente
	onClientPressed(rowId, client){
		console.log("onClientPressed")
	 //    console.log(client);
	 	var productList = this.productList(client, this.passProps.data);
	 	console.log(productList)
	    //Redirecciona al detalle del cliente
	    this.props.navigator.replace({
	      name: 'ClientDetail',
	      title: 'ClientDetail',
	      passProps: {clients: productList, count: count}
	      // passProps: {clients: this.passProps.data, client: client, count: count}
	    });
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
		height: '15%',
		alignItems: 'center',
		marginBottom: '10%'
	},
	logo: {
		flex: 1,
		height: '60%',
	},
	routeContainer: {
		flex: 1,
		alignItems: 'stretch',
		justifyContent: 'center',
	},
	routeText: {
		flex: 1,
		textAlign: 'center',
		textAlignVertical: 'bottom',
		color: 'gray',
		fontSize: 15,
	},
	route: {
		fontSize: 25,
		fontWeight: 'bold',
		textAlignVertical: 'top',
	},
	client: {
		fontSize: 25,
		fontWeight: 'bold',
		paddingLeft: '5%',
		borderBottomWidth: 1.5,
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
		marginHorizontal: '2%'
	},
	touchableClient: {
		borderBottomWidth: .5,
	},
	clientDetail: {
		flex: 1,
		flexDirection: 'row',
		marginLeft: '5%'
	},
	cliCod: {
		flex:1,
		fontSize: 20,
		fontWeight: 'bold',
		marginTop: 10
	},
	cliNom: {
		flex:2,
		fontSize: 15,
		marginBottom: 10
	},
	statusVisited: {
		backgroundColor: '#00B200',
    justifyContent: 'center',
    alignItems: 'center',
		width: '13%'
	},
});

module.exports = ClientList;