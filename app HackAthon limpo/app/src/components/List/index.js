import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function List({ data }) {
    const [color, setColor] = useState('#000');

    useEffect(() => {
        const str = data.data
        let date = new Date(str.split('/').reverse().join('/'));
        let novaData = new Date();

        if (date < novaData) setColor('#f53636');
    })

    return (
        <TouchableOpacity style={styles.container}>
            <Text style={styles.date(color)}>{data.data}</Text>

            <View style={styles.content}>
                <Text style={styles.nome}>{data.nome}</Text>
                <Text style={styles.nome}>{data.categoria}</Text>
                <Text style={styles.quantidade}>Qtd: {data.quantidade}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: '#DADADA',
        height: 70,
        borderRadius: 2,
        paddingStart: '2%',
        paddingEnd: '2%',
    },

    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        marginBottom: 8,
    },

    date: (value) => ({
        fontWeight: 'bold',
        color: value,
    }),

    nome: {
        fontWeight: 'bold',
        fontSize: 16,
    },

    quantidade: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})