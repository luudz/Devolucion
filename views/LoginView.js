//********************************************************************//
// Incio de sesión. 												  //
// Vista principal. Para iniciar la sesión se valida el CeVe + Ruta y //
// una contraseña.                                                    //
//********************************************************************//

'use strict'

import React, {Component} from 'react';
import {
	View, 
	Text, 
	Image, 
	TouchableHighlight, 
	Alert, 
	StyleSheet, 
	TextInput, 
	Picker, 
	AsyncStorage,
	Switch
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../src/components/Header'

const base64 = require('base-64');
const Item = Picker.Item;

class LoginView extends Component{
	
	constructor(props) {
	    super(props);
	    this.state = {
	    	dataSoruce: [],
		    CeVe: '0',
		    ceves: ["Selecciona CeVe"],
		    route: '',
		    password: '',
		    switchValue: null,
		    isLogged: 'false',
		    urlgs: '',
		    usergs: '',
		    passgs: '',
		};
	}

	makeCevesArray(ceves){
		var i = 0;
		for(i; i<ceves.length; i++){
			this.state.ceves.push(String(ceves[i].codigoCeve))
		}
	}

	componentDidMount(){
		this._loadInitialState().done();
	}

	_loadInitialState =  async () => {
		console.log("componentDidMount")
		// console.log(base64.encode("SALES.FORCE:yrtfgreyg6764rtoy"));

		fetch('http://smcsoasrv1.mx.gbimbo.com:7213/MarinaWS/ceve/list',{
			method: 'GET',
			headers: {
				'Authorization': "Basic U0FMRVMuRk9SQ0U6eXJ0ZmdyZXlnNjc2NHJ0b3k=",
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
		})
		.then((response) => response.json())
		.then((res) => {
			console.log(res.ceves)
			this.makeCevesArray(res.ceves);
			console.log(this.state.ceves);
		})

		AsyncStorage.multiGet(['route', 'CeVe', 'pass', 'isLogged','urlgs','usergs','passgs'])
		// AsyncStorage.multiGet(['route', 'CeVe', 'pass', 'isLogged'])
		.then((sesion) => {
			console.log("AsyncStorage");
			this.setState({isLogged: sesion[3][1] === 'true' ? 'false' : 'true'});
			this.setState({urlgs: sesion[4][1]?sesion[4][1]:'http://192.168.2.210:7001/MarinaWS/json/pc/app/ruta_cliente/get?'});
			this.setState({usergs: sesion[5][1]?sesion[5][1]:'SALES.FORCE'});
			this.setState({passgs: sesion[6][1]?sesion[6][1]:'123qwe'});
			console.log(sesion);
			if(sesion[3][1] === 'true'){		
				this.setState({route: sesion[0][1]});
			    this.setState({CeVe: sesion[1][1]});
		    	this.setState({password: sesion[2][1]});
		    	this.setState({switchValue: true});
		    	this.onLogin();
			}
		})
	}

	//VISTA//
	 render(){
	 	console.log(this.state.isLogged)

	 	let ceves = this.state.ceves.map((ceves, i) => {return <Item label = {ceves} value = {ceves} key = {i}/>})

		return(
			<View style = {{flex: 1, justifyContent: 'center', backgroundColor: '#FFFFFF'}}>
			{ this.state.isLogged == 'true' ?
			<View style = {styles.page}>
				<Header title = "Devolución"/>
				<Image style = {styles.logo} resizeMode = {Image.resizeMode.center} source={require('../src/images/grupobimbo.png')}/>
				<View style = {styles.container}>
					<Picker style={styles.picker}
						selectedValue={this.state.CeVe}
	            		onValueChange={(ceve) => {this.setState({CeVe: ceve})}}>
	            		{ceves}
			        </Picker>
			        <TextInput style = {styles.textInput}
					 ref = "rte"
					 keyboardType = 'numeric' 
					 placeholder="Ruta"
					 placeholderTextColor = "gray" 
					 underlineColorAndroid = "white"
					 onChangeText={(text) => {
	          			this.setState({route:text});
	        		 }}
	        		 onSubmitEditing={(event) => {
	     				this.refs.psw.focus();}}/>
					<TextInput style = {styles.textInput}
					ref = "psw" 
					secureTextEntry= {true}
					autoCapitalize = "none" 
					placeholder="Contraseña"
					placeholderTextColor = "gray"
					underlineColorAndroid = "white"
					onChangeText={(text) => {
	          			this.setState({password:text});
	        		}}/>
	        		<View style={styles.switch}>
		        		<Switch
				          onValueChange={(value) => this.setState({switchValue: value})}
				          value={this.state.switchValue}/>
				        <Text style={styles.switchText}>Recordar</Text>
			        </View>
					<TouchableHighlight style = {styles.goButton} onPress={this.onLogin.bind(this)}>
						<Text style = {styles.goButtonText}>Ingresar</Text>
					</TouchableHighlight>
					<TouchableHighlight style = {[styles.goButton, styles.configButton]} onPress={(this.onSettings.bind(this))}>
						<View style = {styles.configButtonView}>
			        		<Icon name = "md-cog" size = {30} color = "#fff" />
			        		<Text style = {[styles.goButtonText, styles.configButtonText]}>Configuración</Text>
			        	</View>
			      	</TouchableHighlight>  
				</View>
			</View>	:
			<Image style = {styles.logo} resizeMode = {Image.resizeMode.contain} source={require('../src/images/grupobimboinicio.png')}/>
			}
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

	setConfig(){
		AsyncStorage.multiSet([
  			['url', this.state.url?this.state.url:'http://192.168.2.210:7001/MarinaWS/json/pc/app/ruta_cliente/get?'],
  			['usergs', this.state.user?this.state.user:'SALES.FORCE'],
  			['passgs', this.state.pass?this.state.pass:'123qwe'],
		]);
	}

	//FUNCIONALIDAD DE LOS BOTONES//
	onLogin() {
		console.log("onLogin")

		if(!this.state.route || !this.state.password || !this.state.CeVe){
			Alert.alert("Error",
				"Debes llenar todos los campos"	
			);
		}else{
			var data = 'ceve='+this.state.CeVe+'&FECHA=20160812&'+'RUTA='+this.state.route+'&'+'PASS='+this.state.password
			console.log("data: "+data)
			const URL = this.state.urlgs + data
			// const URL = 'http://192.168.2.210:7001/MarinaWS/json/pc/app/ruta_cliente/get?' + data	
			console.log("URL: "+URL);
			console.log(base64.encode("SALES.FORCE:123qwe"));
			console.log(base64.encode(this.state.usergs+":"+this.state.passgs));

			let fetchData = {
				method: 'GET',
			    headers: {
			    	'Authorization': "Basic "+ base64.encode(this.state.usergs+":"+this.state.passgs),
			    	// 'Authorization': "Basic U0FMRVMuRk9SQ0U6MTIzcXdl",
					'Content-Type': 'application/json',
			    },
			}

			fetch(URL, fetchData)
			.then(function(response) {return response.json()})
			.then((res) => {
			  	if(res.success === true){
			  		// AsyncStorage.setItem('route', this.state.route);
					this.setConfig();
			  		this.setState({dataSoruce: res.resultadosConsulta[0].rows});
			  		AsyncStorage.multiSet([
			  			['route', this.state.route],
			  			['CeVe', this.state.CeVe],
			  			['pass', this.state.password],
			  			['isLogged', this.state.switchValue ? 'true' : 'false']
			  		]);		
			  		this.props.navigator.replace({
				  	  	title: 'ClientList',
				  	  	name: 'ClientList',
				  	  	passProps: {data: res.resultadosConsulta[0].rows}
			  		})
		  	  	}else{
		  	 		Alert.alert ("ERROR",
			  	  		res.responseMsg	
			  		);
		  	  	}
			})
			.done();
		}
  	}

  	onSettings(){
  	  // Alert.alert ("Configuración");
  	  this.props.navigator.push({
  	  	title: 'Settings',
  	  	name: 'Settings',
  	  	passProps: {}
  	  });  	
  	}
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		justifyContent: 'center',
		alignItems: 'stretch',
	},
	logo: {
		height: '20%',
		alignSelf: 'center',
	},
	container: {
		flex: 1,
		backgroundColor: '#EEEEEE',
		alignItems: 'stretch',
		justifyContent: 'space-between',
	},
	picker: {
		marginHorizontal: '5%',
		marginTop: '5%',
		color: 'gray',
		height: '10%',
		backgroundColor: '#FFFFFF',
	},
	textInput:{
		height: 45,
		fontSize: 15,
		marginHorizontal: '5%',
		color: 'gray',
		backgroundColor: '#FFFFFF',
	},
	switch:{
		height: '10%',
		flexDirection: 'row',
		marginHorizontal: '5%',
		justifyContent: 'flex-start',
	},
	switchText: {
		flex: 1,
		textAlignVertical: 'center',
		fontSize: 15,
		color: 'gray',
	},
	goButton: {
		height: '12%',
		borderRadius: 4,
		marginHorizontal: '5%',
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
	configButton: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#8C8C8C',
		marginBottom: '5%',
	},
	configButtonView: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	configButtonImage: {
		height: '80%'
	},
	configButtonText: {
		fontWeight: 'normal'
	},
});

module.exports = LoginView;