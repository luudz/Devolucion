import React, {Component} from 'react'
import {
    Text,
    View,
    TouchableHighlight,
    StyleSheet,
    Alert, 
    Image
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';

export default class Header extends Component {
    render(){
        return (
            <View style = {styles.header}>
                <TouchableHighlight style = {styles.headerButton} onPress = {this.props.onPress}>
                    <Icon name = "md-menu" size = {30} color = "#fff" />
                </TouchableHighlight>
                <Text style = {styles.headerText}> {this.props.title} </Text>
            </View>
        )
    }

    onMenu(){
        Alert.alert (
            "JASJIAD",
            "blasdr "
          );
    }
}

const styles = StyleSheet.create({
    header: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        height: 60,
        paddingLeft: '5%',
        justifyContent: 'center',
        backgroundColor: '#FD9325',
    },
    headerButton:{
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 25,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
})