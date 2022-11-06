import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import * as Animatable from 'react-native-animatable';

import * as actions from '../../store/modules/auth/actions';
import * as RootNavigation from '../../services/RootNavigation';

export default function Profile() {
    const dispatch = useDispatch()
    
    function heandleSubmit(){
      dispatch(actions.loginFailure());
      RootNavigation.reset(0, "Signin");
    }

    return (
        <View style={styles.container}>

            <View style={styles.containerLogo}>
                <Animatable.Image
                    animation="flipInY"
                    source={require('../../assets/logo.jpeg')}
                    style={{ width: '100%' }}
                    resizeMode="contain"
                />
            </View>

            <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}>Monitore, organize seus Alimentos de qualquer lugar!</Text>
                <Text style={styles.text}>Faça o login para começar</Text>

                <TouchableOpacity style={styles.button} onPress={heandleSubmit}>
                    <Text style={styles.buttomText}>Logout</Text>
                </TouchableOpacity>
            </Animatable.View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#977DF8',
    },

    containerLogo: {
        flex: 2,
        backgroundColor: '#977DF8',
        justifyContent: 'center',
        alignItems: 'center'
    },

    containerForm: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 28,
        marginBottom: 12,
    },

    text: {
        color: '#a1a1a1',
    },

    button: {
        position: 'absolute',
        backgroundColor: '#977DF8',
        borderRadius: 50,
        paddingVertical: 8,
        width: '60%',
        alignSelf: 'center',
        bottom: '15%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttomText: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold'
    }

})