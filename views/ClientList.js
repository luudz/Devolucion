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

// import dataSource from '../src/data/clients'

var count = 0;//corresponde al número de clientes de la ruta 

class ClientList extends Component{

	constructor(props) {
		console.log("ClientList")
	    super(props);
	    this.passProps = this.props.route.passProps
	    console.log(this.passProps.data)
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
		console.log("_loadInitialState")
		var route = await AsyncStorage.getItem('route');
		console.log(route)
		if (route !== null){
		    this.setState({route: route});
		}
	}

	//Renderiza la lista de clientes como un Botón, para poder mostrar detalles al tocar cada cliente
	renderClient(client, sectionId, rowId){
	    return(
	      <TouchableHighlight style = {{alignItems: 'stretch'}} onPress={() => this.onClientPressed(rowId, client)}>
	      	<View style = {{flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'stretch'}}>
		        <Text style = {styles.clientText}>{client.name}</Text>
		        <Text style = {styles.clientText}>{client.ID}</Text>
		    </View>
	      </TouchableHighlight>
	    )
	}

	//VISTA//
	render (){
		console.log("data");
		console.log(this.passProps.data);
		this.showClientList(this.passProps.data)
		return(
			<View style={styles.page}>
				<View style={styles.header}>
					<Text style = {styles.text}>Lista de clientes</Text>
        			<Image style = {styles.logo} resizeMode = {Image.resizeMode.center} source={require('../src/images/grupobimbo.png')}/>
				</View>
				<View style = {styles.route}>
	        		<Image style = {styles.imageRoute} resizeMode = {Image.resizeMode.contain} source={require('../src/images/route.png')}/>
					<Text style = {styles.textRoute}>{this.state.route}</Text>
				</View>
				<View style = {{flexDirection: 'row', justifyContent: 'space-around'}}>
			        <Text style={styles.textRoute}>Cliente</Text>
			        <Text style={styles.textRoute}>ID Cliente</Text>
			    </View>
				<ListView
			        dataSource={this.state.dataSource}
			        renderRow={(client, sectionId, rowId) => this.renderClient(client, sectionId, rowId)}
			        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
			    />
			</View>
		);
	}

	//Cuenta cuántos clientes falta por registar
	showClientList(data){
		console.log("showClientList")
		console.log(data.length)
		// if (data.length == 1){
		// 	this.props.navigator.replace({
		//       name: 'ClientDetail',
		//       title: 'ClientDetail',
		//       passProps: {clients: this.passProps.data, client: selectedClient, count: 1}
		//     });
		// }else{
		// 	var i = 0;
		// 	for(i = 0; i<data.length; i++){
		// 		if(data[i].status === "visitado"){
		// 			data.splice(i,1);
		// 			break;
		// 		}
		// 	}
		// 	this.setState({
		// 		dataSource: this.state.dataSource.cloneWithRows(data);
		// 	})
		// }
		// count = this.state.dataSource.length;
		// console.log("count", count)
		// this.setState({count: count});
	}

	//Una vez que se ha registrado la devolución del cliente, se quita la lista de clientes
	makeDelete(rowID){
  	  dataSource.splice(rowID,1);
  	  this.setState({
  	  	dataSource: this.state.dataSource.cloneWithRows(dataSource)
  	  })
  	  console.log(this.state.dataSource)
  	}

	//Funcionalidad al tocar cada cliente
	onClientPressed(rowId, client){
	    console.log(client);
	    this.validateCount()
	    var selectedClient = client;
	    // console.log(selectedClient);
	    // this.makeDelete(rowId);

	    //Redirecciona al detalle del cliente
	    this.props.navigator.push({
	      name: 'ClientDetail',
	      title: 'ClientDetail',
	      passProps: {clients: this.passProps.data, client: selectedClient, count: count}
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
		height: 70,
	},
	logo: {
		flex: 1,
        height: 50,
    },
	text: {
		fontSize: 30,
		textAlign: 'center',
		flex: 2,
		color: 'white',
	},
	route: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		margin: 30,
	},
	imageRoute: {
		height: 65,
	},
	textRoute: {
		flex: 1,
		color: "#000000",
		fontSize: 30,
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