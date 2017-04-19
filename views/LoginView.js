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
	AsyncStorage
} from 'react-native';

const Item = Picker.Item;
const data = require('../src/data/data');

class LoginView extends Component{
	
	constructor(props) {
	    super(props);
	    this.state = {
		    CeVe: '',
		    route: '',
		    password: '',
		};
	 }

	 render(){
		return(
			<View style = {styles.container}>
				<View style = {{flex:1, alignItems: 'center', justifyContent: 'space-around'}}>
	        		<Image resizeMode = {Image.resizeMode.center} style = {styles.logo} source={require('../src/images/grupobimbo.png')}/>
					<Picker style={styles.picker} 
						prompt="Selecciona Centro de Ventas" 
						selectedValue={this.state.CeVe}
	            		onValueChange={(ceve) => {this.setState({CeVe: ceve});}}>
			            <Item label="46981" value="46981" />
			            <Item label="78910" value="78910" />
			            <Item label="98244" value="98244" />
			            <Item label="36589" value="36589" />
			            <Item label="98514" value="98514" />
			            <Item label="78152" value="78152" />
			            <Item label="98212" value="98212" />
			            <Item label="39742" value="39742" />
			            <Item label="98252" value="98252" />
			        </Picker>
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

		      	<TouchableHighlight style = {styles.buttonConfig} onPress={(this.onSettings.bind(this))}>
		        	<Image resizeMode = {Image.resizeMode.contain} style = {styles.imageConfig} source={require('../src/images/settings.png')}/>
		      	</TouchableHighlight>

				<TouchableHighlight style = {styles.button} onPress={this.onLogin.bind(this)}>
		        	<Text style = {styles.buttonText} >Entrar</Text>
		      	</TouchableHighlight>
			</View>
		)
	}

	onLogin() {
		// fetch('https://mywebsite.com/endpoint/', {
		//   method: 'POST',
		//   headers: {
		//     'Accept': 'application/json',
		//     'Content-Type': 'application/json',
		//   },
		//   body: JSON.stringify({
		//     firstParam: 'yourValue',
		//     secondParam: 'yourOtherValue',
		//   })
		// })
			
      if(!this.state.route || !this.state.password){
      	Alert.alert("Error",
      	"Debes llenar todos los campos"	
      	);
      }
      else{
	  	  if(this.state.route === data[0].route){
	  		  // var route = this.state.route;
		  	  // var password = this.state.password;
		  	  // Alert.alert ("Sesión",
		  	  // "Vas a iniciar sesión con la ruta: " + route	
		  	  // );
		  	  console.log(data[0].clients);
		  	  AsyncStorage.setItem('route', data[0].route);

		  	  this.props.navigator.replace({
		  	  	title: 'ClientList',
		  	  	name: 'ClientList',
		  	  	passProps: {data: data[0].clients}
		  	  });
	  	  }else{
	  	  	Alert.alert ("Sesión",
		  	  "Ruta incorrecta, intenta nuevamente"	
		  	  );
	  	  }
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
        height: 100,
    },
    picker: {
    	width: 300,
    },
	textInput: {
		width: 300,
	},
	buttonConfig: {
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
		marginBottom: 20,
		marginTop: 20,
	},
	imageConfig: {
		height: 40,
	},
	button: {
		height: 60,
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
});

module.exports = LoginView;