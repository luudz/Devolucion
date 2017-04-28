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
	ListView
} from 'react-native';

var count = 0;//corresponde al número de clientes de la ruta 

class ClientList extends Component{

	constructor(props) {
	    super(props);
	    this.passProps = this.props.route.passProps
		this.showClientList(this.passProps.data)
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	    this.state = {
		    route: '',
		    count: 0,
		    dataSource: ds.cloneWithRows(this.passProps.data)
		};
	}

	componentDidMount(){
		this._loadInitialState().done();
	}

	_loadInitialState =  async () => {
		var route = await AsyncStorage.getItem('route');
		if (route !== null){
		    this.setState({route: route});
		}
	}

	//Renderiza la lista de clientes como un Botón, para poder mostrar detalles al tocar cada cliente
	renderClient(client, rowId){
		// console.log(client);
	    return(
	      <TouchableHighlight style = {{alignItems: 'stretch', borderTopWidth: .5, justifyContent: 'center', marginLeft:20, marginRight: 20}} onPress={() => this.onClientPressed(rowId, client)}>
	      	<View style = {{flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'stretch'}}>
		        <Text style = {{flex:1, fontSize: 15, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, marginTop: 10}}>{client.CLICOD}</Text>
		        <Text style = {{flex:2, fontSize: 15, fontWeight: 'bold', marginBottom: 10, marginTop: 10}}>{client.CLINOM}</Text>
		    </View>
	      </TouchableHighlight>
	    )
	}

	//VISTA//
	render (){
		return(
			<View style={styles.page}>
				<View style = {{height: 70, flex: 1,}}>
				<View style={styles.header}>
					<TouchableHighlight onPress={(this.onExit.bind(this))} style = {{flex: 2, justifyContent: 'center', alignItems: 'flex-start'}}>
						<View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}>
		        			<Image style = {{height: 40, width: 40}}resizeMode = {Image.resizeMode.center} source={require('../src/images/exit.png')}/>
							<Text style = {{flex: 1, color: '#FFFFFF', fontSize: 15, paddingTop: 10}}>Salir</Text>
						</View>
					</TouchableHighlight>
        			<Image style = {styles.logo} resizeMode = {Image.resizeMode.center} source={require('../src/images/grupobimbo.png')}/>
				</View>
				</View>
				<Text style = {styles.text}>Lista de clientes</Text>
				<View style = {styles.route}>
	        		<Image style = {styles.imageRoute} resizeMode = {Image.resizeMode.contain} source={require('../src/images/route.png')}/>
					<Text style = {styles.textRoute}>{this.state.route}</Text>
				</View>
				<View style = {{flexDirection: 'row', justifyContent: 'space-around', borderBottomWidth: 1.5, borderColor: '#0076B7', marginRight: 20, marginLeft: 20}}>
			        <Text style={{flex: 1, color: "#0076B7", fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>ID</Text>
			        <Text style={{flex: 2, color: "#0076B7", fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>Cliente</Text>
			    </View>
				<ListView
			        dataSource={this.state.dataSource}
			        renderRow={(client, rowId) => this.renderClient(client, rowId)}
			    />
			    <View style = {{alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginBottom: 40, paddingTop: 5}}>
	        		<Image style = {{height: 10}} resizeMode = {Image.resizeMode.center} source={require('../src/images/currentView.png')}/>
	        		<Image style = {{height: 10}} resizeMode = {Image.resizeMode.center} source={require('../src/images/views.png')}/>
	        		<Image style = {{height: 10}} resizeMode = {Image.resizeMode.center} source={require('../src/images/views.png')}/>
			    </View>
			</View>
		);
	}

	//Cuenta cuántos clientes falta por registar
	showClientList(data){
		// console.log(data)
		var i = 0;
		count = data.length-1;
		console.log(count);
		for(i = 0; i<data.length; i++){
			if(data[i].status === "visitado"){
				data.splice(i, 1);
				break;
			}
		}
	}

	//Funcionalidad "Salir"
	onExit(){
		//Si el usuario selecciona "salir", se termina la sesión y es redireccionado al Login
		console.log("exit");
		this.props.navigator.resetTo({
			title: 'Login',
			name: 'Login',
			passProps: {}
		});
	}

	//Funcionalidad al tocar cada cliente
	onClientPressed(rowId, client){
		// console.log("onClientPressed")
	    // console.log(client);
	    //Redirecciona al detalle del cliente
	    this.props.navigator.replace({
	      name: 'ClientDetail',
	      title: 'ClientDetail',
	      passProps: {clients: this.passProps.data}
	      // passProps: {clients: this.passProps.data, client: client, count: count}
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
		flex: 1, 
		height: 5,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#0076B7',
	},
	logo: {
		flex: 1,
        height: 50,
    },
	text: {
		fontSize: 25,
		justifyContent: 'flex-start',
		alignItems: 'center',
		fontWeight: 'bold',
		color: '#EF6C00',
		marginLeft: 30,
		marginTop: 20,
	},
	route: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginBottom: 15,
		marginLeft: 30,
	},
	imageRoute: {
		height: 65,
	},
	textRoute: {
		flex: 1,
		color: "#000000",
		fontSize: 25,
		fontWeight: 'bold',
	},
	separator: {
	    flex: 1,
	    backgroundColor: '#000000',
	},
	clientText: {
		flex: 1,
		margin: 20,
		fontSize: 15,
		fontWeight: 'bold',
	}
});

module.exports = ClientList;