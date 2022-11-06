import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useSelector } from 'react-redux';
import { get } from 'lodash';

import api from '../../services/api';
import List from '../../components/List';


export default function Home() {
    const id = useSelector(state => state.auth.user.id);
    const nomeStored = useSelector(state => state.auth.user.nome);

    const [nomeUser, setNomeUser] = useState('');

    const [data, setData] = useState([]);

    useEffect(() => {
        if (!id) return;
        setNomeUser(nomeStored);

        async function getData() {
            try {
              const response = await api.get(`/users/${id}`);
              setData([...response.data.Produtos]);
            } catch (e) {
              const errors = get(e, 'response.data.errors', []);
              console.log(errors);
            }
          }
          getData();
    }, [])

    return (
        <View style={styles.container}>

            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader} >
                <Text style={styles.message}>Olá, {nomeUser}</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}>Lista dos Produtos</Text>

                <FlatList
                    style={styles.list}
                    data={data}
                    keyExtractor={item => String(item.id)}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <List data={item} />}
                />
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
        marginTop: '10%',
        marginBottom: '8%',
        paddingStart: '5%'
    },

    message: {
        fontSize: 24,
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
        marginTop: 18,
        marginBottom: 16,
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
