import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { get } from 'lodash';

import api from '../../services/api';
import List from '../../components/List';


// fazer try e cath

export default function Search() {
  const id = useSelector(state => state.auth.user.id);

  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);

  const [list, setList] = useState('none');
  const [msg, setMsg] = useState('flex');

  useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        const response = await api.get(`/users/${id}`);
        setData([...response.data.Produtos]);
        setOriginalData([...response.data.Produtos]);
      } catch (e) {
        const errors = get(e, 'response.data.errors', []);
        console.log(errors);
      }
    }
    getData();
  }, [])

  function busca(value) {
    if (!value == '') {
      setList('flex');
      setMsg('none');
    } else {
      setList('none');
      setMsg('flex');
    }

    let arr = JSON.parse(JSON.stringify(originalData))
    setData(arr.filter((dado) => dado.nome.includes(value) || dado.data.includes(value) || dado.categoria.includes(value)));
  }


  return (
    <View style={styles.container}>

      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader} >
        <Text style={styles.message}>Procurar Produto</Text>
        <View style={styles.sectionStyle}>
          <TextInput placeholder='Pesquisar ...' style={styles.input} onChangeText={(value) => busca(value)} autoCapitalize='none' />
          <Feather name="search" style={styles.imageStyle} />
        </View>
      </Animatable.View>


      <Animatable.View animation="fadeInUp" style={styles.containerForm}>

        <Text style={styles.msg(msg)}>Pesquise o Nome, Data ou Categoria</Text>
        <FlatList
          style={styles.list(list)}
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

  list: (text) => ({
    marginTop: 20,
    display: text,
  }),

  msg: (text) => ({
    fontSize: 19,
    marginTop: 25,
    marginBottom: 10,
    textAlign: 'center',
    display: text,
  }),

  containerHeader: {
    marginTop: '10%',
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
})
