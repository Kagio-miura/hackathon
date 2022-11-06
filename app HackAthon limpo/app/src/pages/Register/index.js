import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, TextComponent, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { get } from 'lodash';
import { isEmail } from 'validator';
import * as Animatable from 'react-native-animatable';

import api from '../../services/api';

export default function Register() {
    const navigation = useNavigation();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [erroNome, setErroNome] = useState('none');
    const [erroEmail, setErroEmail] = useState('none');
    const [erroSenha, setErroSenha] = useState('none');

    async function handleSubmit() {
        let Errors = false;

        if (nome.length < 3 || nome.length > 255) {
            Errors = true;
            setErroNome('flex');
        } else {
            setErroNome('none');
        }

        if (!isEmail(email)) {
            Errors = true;
            setErroEmail('flex');
        } else {
            setErroEmail('none');
        }

        if (password.length < 6 || password.length > 50) {
            Errors = true;
            setErroSenha('flex');
        } else {
            setErroSenha('none');
        }

        if (Errors) return;

        try {
            await api.post('/users/', { nome, email, password, });
            ToastAndroid.show('Conta criada com Sucesso', ToastAndroid.SHORT);
            navigation.navigate('Signin');
        } catch (e) {
            const errors = get(e, 'response.data.errors', []);
            setErroEmail('flex');
            console.log(errors);
        }
    }

    return (
        <View style={styles.container}>

            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader} >
                <Text style={styles.message}>Crie sua Conta</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>

                <Text style={styles.title}>Nome</Text>
                <TextInput placeholder='Digite seu Nome' style={styles.input} defaultValue={nome} onChangeText={e => setNome(e)} />
                <Text style={styles.erroMsg(erroNome)}>Nome deve ter entre 3 e 255 caracteres</Text>

                <Text style={styles.title}>E-mail</Text>
                <TextInput placeholder='Digite um E-mail' style={styles.input} defaultValue={email} onChangeText={e => setEmail(e)} />
                <Text style={styles.erroMsg(erroEmail)}>E-mail Inválido ou já utilizado</Text>

                <Text style={styles.title}>Senha</Text>
                <TextInput placeholder='Digite sua Senha' style={styles.input} defaultValue={password} onChangeText={e => setPassword(e)} />
                <Text style={styles.erroMsg(erroSenha)}>Senha deve ter entre 6 e 50 caracteres</Text>

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Criar</Text>
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
})