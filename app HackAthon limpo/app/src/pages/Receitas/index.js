import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Keyboard } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Feather } from '@expo/vector-icons';

import ListReceitas from '../../components/List';

import api from '../../services/api';

export default function Receitas() {
  const [data, setData] = useState([]);
  const [receita, setReceita] = useState([]);


  return (
    <View style={styles.container}>

      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader} >
        <Text style={styles.message}>Procurar Receita</Text>
        <View style={styles.sectionStyle}>
          <TextInput placeholder='Digite nome da Receita' style={styles.input}  onChangeText={(value) => setInput(value)}  />
          <Feather name="search" style={styles.imageStyle} />
        </View>
      </Animatable.View>


      <Animatable.View animation="fadeInUp" style={styles.containerForm}>



        <FlatList
          style={styles.list}
          data={receita}
          keyExtractor={item => String(item.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <ListReceitas data={item} />}
        />


        <TouchableOpacity style={styles.buttonRegister} >
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
    marginTop: '16%',
    marginBottom: '6%',
    paddingStart: '5%',
    paddingEnd: '5%',
  },

  message: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },

  input: {
    width: 260,
    fontSize: 17,
    fontWeight: '',
  },

  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingTop: 5,
    paddingBottom: 5,
    paddingStart: '5%',
    paddingEnd: '5%',
    alignContent: 'center',
    alignItems: 'center'
  },

  imageStyle: {
    fontSize: 23,
    color: '#000',
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
    marginBottom: 10,
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
