import React, {Component} from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    flex:1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default class HeaderListView extends Component{
  constructor(){
    super()
  }
  render (){
    return(
      <View style = {styles.container}>
        <Text style={styles.text}>Códgo</Text>
        <Text style={styles.text}>Producto</Text>
        <Text style={{flex:2, fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>Devolución</Text>
      </View>
    );
  }
}