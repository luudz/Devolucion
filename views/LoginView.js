//********************************************************************//
// Incio de sesión. Para iniciar la sesión se valida el CeVe + Ruta y //
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

const base64 = require('base-64');
const Item = Picker.Item;
// const data = require('../src/data/data');

class LoginView extends Component{
	
	constructor(props) {
	    super(props);
	    this.state = {
	    	dataSoruce: [],
		    CeVe: '0',
		    route: '',
		    password: '',
		};
	 }

	 render(){
		return(
			<View style = {styles.container}>
				<View style = {{flex:1, alignItems: 'center', justifyContent: 'space-around'}}>
					<View style = {styles.title}>
        				<Image style = {styles.logo} resizeMode = {Image.resizeMode.center} source={require('../src/images/grupobimbo.png')}/>
	        			<View style = {{flex: 1, alignItems: 'stretch', justifyContent: 'center', marginLeft: 10}}>
	        				<Text style = {{color: "#EF6C00", fontSize: 20, fontWeight: 'bold'}}>Registro</Text>
	        				<Text style = {{color: "#EF6C00", fontSize: 30, fontWeight: 'bold'}}>Devolución</Text>
	        			</View>
	        		</View>
	        		<View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
		        		<Text style = {{flex: 1, textAlign: 'center', fontSize: 15, fontWeight: 'bold'}}>Centro de ventas:</Text>
						<Picker style={styles.picker}
							selectedValue={this.state.CeVe}
		            		onValueChange={(ceve) => {this.setState({CeVe: ceve})}}>
				            <Item label="Selecciona CeVe" value= "0"/>
				            <Item label="78910" value="78910" />
				            <Item label="13506" value="13506" />
				            <Item label="36589" value="36589" />
				            <Item label="98514" value="98514" />
				            <Item label="78152" value="78152" />
				            <Item label="98212" value="98212" />
				            <Item label="39742" value="39742" />
				            <Item label="98252" value="98252" />
				        </Picker>
			        </View>
					<TextInput style = {styles.textInput}
					 ref = "rte"
					 keyboardType = 'numeric' 
					 placeholder="Ruta" 
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
					onChangeText={(text) => {
	          			this.setState({password:text});
	        		}}/>
	        	</View>
	        	<View  style = {{flexDirection: 'row', alignItems: 'center', justifyContent:'center', marginBottom: 20}}>
		        	<Switch
			          onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
			          style={{marginLeft: 25}}
			          value={this.state.falseSwitchIsOn} />
			        <Text style = {{flex: 1}}>Recuérdame</Text>
			      	<TouchableHighlight style = {styles.buttonConfig} onPress={(this.onSettings.bind(this))}>
			        	<Image resizeMode = {Image.resizeMode.contain} style = {styles.imageConfig} source={require('../src/images/settings.png')}/>
			      	</TouchableHighlight>
			    </View>

				<TouchableHighlight style = {styles.button} onPress={this.onLogin.bind(this)}>
		        	<Text style = {styles.buttonText}>Entrar</Text>
		      	</TouchableHighlight>
			</View>
		)
	}

	onLogin() {
		console.log("onLogin")

		if(!this.state.route || !this.state.password || !this.state.CeVe){
			Alert.alert("Error",
				"Debes llenar todos los campos"	
			);
		}else{
			var data = 'ceve='+this.state.CeVe+'&FECHA=20160812&'+'RUTA='+this.state.route+'&'+'PASS='+this.state.password
			console.log("data: "+data)
			const URL = 'http://192.168.2.210:7001/MarinaWS/json/pc/app/ruta_cliente/get?' + data	
			console.log("URL: "+URL);
			console.log(base64.encode("SALES.FORCE:123qwe"));

			let fetchData = {
				method: 'GET',
			    headers: {
			    	'Authorization': "Basic U0FMRVMuRk9SQ0U6MTIzcXdl",
					'Content-Type': 'application/json',
			    },
			}

			fetch(URL, fetchData)
			.then(function(response) {return response.json()})
			.then((res) => {this.setState({dataSoruce: res}); console.log(this.state.dataSoruce);
			  	if(res.success === true){
			  		AsyncStorage.setItem('route', this.state.route);
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
	container: {
	    flex: 1,
	    alignItems: 'stretch',
	    justifyContent: 'space-between',
	},
	logo: {
		flex:1, 
        height: 90,
    },
    picker: {
    	flex:1,
    	marginRight: 30
    },
	textInput: {
		width: 300,
	},
	buttonConfig: {
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
	},
	imageConfig: {
		height: 40,
	},
	button: {
		height: 40,
		backgroundColor: '#0076B7',
		justifyContent: 'center',
		borderRadius: 1
	},
	buttonText: {
		color: 'white',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 20,
	},
	title: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	}
});

module.exports = LoginView;