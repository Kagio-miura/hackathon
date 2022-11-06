import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, TextComponent, ToastAndroid } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { get } from 'lodash';

import { Feather } from '@expo/vector-icons';

import Scanner from '../../components/Scanner';

import { ean } from '../../services/api';

export default function New() {
    return (
        <View style={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader} >
                <View style={styles.sectionStyle}>
                    <Text style={styles.message}>Adicionar Produto</Text>
                    <TouchableOpacity style={styles.ButtonImage}>
                        <Feather name="clipboard" style={styles.imageStyle} />
                    </TouchableOpacity>
                </View>
            </Animatable.View>
            <Scanner />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#977DF8',
    },

    containerHeader: {
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%'
    },

    message: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff'
    },

    containerForm: {
        backgroundColor: '#fff',
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
    },

    title: {
        fontSize: 20,
        marginTop: 28,
    },

    input: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16,
    },

    button: {
        backgroundColor: '#977DF8',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 14,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },

    buttonRegister: {
        marginTop: 14,
        alignSelf: 'center',
    },

    registerText: {
        color: '#a1a1a1',
    },

    erroMsg: (text) => ({
        fontWeight: 'bold',
        fontSize: 14,
        color: "red",
        display: text,
    }),

    sectionStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingStart: '5%',
        paddingEnd: '5%',
        alignContent: 'center',
        alignItems: 'center'
    },

    ButtonImage: {
        backgroundColor: '#fff',
        height: 40,
        width: 40,
        borderRadius: 20,
        justifyContent: 'space-around',
        alignContent: 'center',
        alignItems: 'center',
    },

    imageStyle: {
        fontSize: 26,
        color: '#977DF8',
    },
})