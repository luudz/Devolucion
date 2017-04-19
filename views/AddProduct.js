//*********************************************************************//
// El usuario ingresa el código de producto que quiere Agregar         //
//*********************************************************************//
'use strict'

import React, {Component} from 'react';
import {Text, TextInput, View, StyleSheet, TouchableHighlight, Alert, Picker} from 'react-native';

import data from '../src/data/clients'
const Item = Picker.Item;

class AddProduct extends Component{

  constructor(props) {
      super(props);
      this.state = {
        sku: ''
      };
   }

   renderProductList(products, sectionId, rowId){
      return(
        <Text style = {styles.textInput}>{products.sku}</Text>
      )
  }

  //Vista// 
  render(){
    return(
      <View style = {styles.container}>
        <Text style = {styles.text}>Código</Text>
        <Picker style={styles.picker} 
            prompt="Selecciona Producto" 
            selectedValue={this.state.sku}
                  onValueChange={(sku) => {this.setState({sku: sku});}}>
                  <Item label="987456" value="987456" />
                  <Item label="321654" value="321654" />
                  <Item label="963852" value="963852" />
                  <Item label="789123" value="789123" />
                  <Item label="582693" value="582693" />
                  <Item label="456789" value="456789" />
                  <Item label="791346" value="791346" />
                  <Item label="172839" value="172839" />
                  <Item label="895623" value="895623" />
                  <Item label="415263" value="415263" />
                  <Item label="159753" value="159753" />
                  <Item label="493768" value="493768" />
                  <Item label="761943" value="761943" />
                  <Item label="987312" value="987312" />
              </Picker>
        <Text></Text>
        <TouchableHighlight secureTextEntry= {true} style = {styles.button} onPress={(this.onSave.bind(this))}>
              <Text style = {styles.buttonText}>Agregar</Text>
            </TouchableHighlight>
      </View>
    );
  }

  //Funcionalidad guardar nuevo producto
  onSave(){
      if(!this.state.sku){
      Alert.alert("Error",
      "Debes agregar un código de producto" 
      );
    }
    else{
      var sku = this.state.sku;
      Alert.alert ("Datos guardados",
      "Producto" + sku);

        this.props.navigator.pop(); 
    }
    }
}

//*************HOJA DE ESTILOS***********
const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 50,
      justifyContent: 'space-between',
  },
  picker: {
      width: 300,
    },
  text: {
    width:200,
    fontWeight: 'bold',
  },
  textInput: {
    width: 300,
  },
  button: {
    height: 60,
    width: 400,
    backgroundColor: '#0076B7',
    justifyContent: 'center',
    borderRadius: 5
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  }
});

module.exports = AddProduct;