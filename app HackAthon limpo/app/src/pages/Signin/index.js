import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, TextComponent } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { isEmail } from 'validator';
import * as Animatable from 'react-native-animatable';
import * as actions from '../../store/modules/auth/actions';


export default function Signin() {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [erroEmail, setErroEmail] = useState('none');
    const [erroSenha, setErroSenha] = useState('none');
    
    function handleSubmit() {
        let Errors = false;

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

        dispatch(actions.loginRequest({ email, password }));

    }

    return (
        <View style={styles.container}>

            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader} >
                <Text style={styles.message}>Bem-vindo(a)</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}>Email</Text>
                <TextInput placeholder='Digite seu E-mail' style={styles.input} defaultValue={email} onChangeText={e => setEmail(e)} />
                <Text style={styles.erroMsg(erroEmail)}>E-mail Inválido</Text>

                <Text style={styles.title}>Senha</Text>
                <TextInput placeholder='Digite sua Senha' style={styles.input} defaultValue={password} secureTextEntry={true} onChangeText={e => setPassword(e)} />
                <Text style={styles.erroMsg(erroSenha)}>Senha Inválido</Text>

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Acessar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.registerText}>Não possui uma conta? Cadastre-se</Text>
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
