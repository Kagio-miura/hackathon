import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { ean } from '../../services/api';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('')

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    console.log('Type: ' + type + '\nData: ' + data);
    try {
      const response = await ean.get(`desc/${data}`);
      setText(response.data);
      console.log('salve');
    } catch (e) {
      console.log('deu erro');
    }

  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>)
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => askForCameraPermission()}>
          <Text style={styles.buttonText}>Permitir acesso a camera</Text>
        </TouchableOpacity>
      </View>)
  }

  const handelSubmit = () => {
    setScanned(false);
    setText('');
  }

  // Return the View
  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }} />
      </View>
      <Text style={styles.maintext}>{text.Nome}</Text>

      {scanned && <TouchableOpacity style={styles.button} onPress={handelSubmit}>
        <Text style={styles.buttonText}>Repetir Escaneamento</Text>
      </TouchableOpacity>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#977DF8',
    alignItems: 'center',
  },

  maintext: {
    fontSize: 20,
    color: '#fff',
    margin: 20,
  },

  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: '#000'
  },

  button: {
    backgroundColor: '#fff',
    width: '50%',
    borderRadius: 4,
    paddingVertical: 14,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold'
  },
});