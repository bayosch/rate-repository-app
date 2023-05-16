import React, { useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import xmlRequest from '../soapXml/xmlRequest'
import xmlConsolidateRequest from '../soapXml/xmlConsolidateRequest'
import { XMLParser } from 'fast-xml-parser'
import CustomisableAlert, { showAlert } from 'react-native-customisable-alert'
import { collection, getDocs, getFirestore } from 'firebase/firestore'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
  },
})

export default props => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingConsolidate, setIsLoadingConsolidate] = useState(false)

  const _extractCounters = async () => {
    setIsLoading(true);
    const querydb = getFirestore()
    const queryCollection = collection(querydb, 'server')
    const responseFirebase = await getDocs(queryCollection)
    const jsonResponse = responseFirebase.docs.map(product => ({ ...product.data() }));
    try {
      var result = await fetch('http://'+jsonResponse[0]["ip"]+'/lexmark-monitoring.asmx', {
        method: 'POST',
        headers: new Headers({
          'Content-Length': 'length',
          'Content-Type': 'application/soap+xml; charset=utf-8', // <-- Specifying the Content-Type
        }),
        body: xmlRequest(props)
      })
      var response = await result.text();
      const parser = new XMLParser();
      var responseObj = parser.parse(response)["soap:Envelope"]["soap:Body"]["extraerContadoresResponse"]["extraerContadoresResult"];
      if(responseObj){
        showAlert({
          title:"Exito",
          alertType: 'success',
          message: "Los contadores se extrayeron correctamente",
        });
      }else{
        showAlert({
          title:"Error",
          alertType: 'error',
          message: "Ocurrió un problema intentelo nuevamente",
        });
      }
      setIsLoading(false);
    } catch (err) {
      showAlert({
        title:"Error",
        alertType: 'error',
        message: "Ocurrio un problema intentelo nuevamente",
      });
      setIsLoading(false);
    }
  }

  const _consolidate = async () => {
    setIsLoadingConsolidate(true)
    const querydb = getFirestore()
    const queryCollection = collection(querydb, 'server')
    const responseFirebase = await getDocs(queryCollection)
    const jsonResponse = responseFirebase.docs.map(product => ({ ...product.data() }));
    try {
      var result = await fetch('http://'+jsonResponse[0]["ip"]+'/lexmark-monitoring.asmx', {
        method: 'POST',
        headers: new Headers({
          'Content-Length': 'length',
          'Content-Type': 'application/soap+xml; charset=utf-8', // <-- Specifying the Content-Type
        }),
        body: xmlConsolidateRequest()
      })
      var response = await result.text()
      const parser = new XMLParser()
      var responseObj = parser.parse(response)['soap:Envelope']['soap:Body']['consolidarContadoresResponse']['consolidarContadoresResult']
      if (responseObj) {
        showAlert({
          title: 'Exito',
          alertType: 'success',
          message: 'Se consolido correctamente',
        })
      } else {
        showAlert({
          title: 'Error',
          alertType: 'error',
          message: 'Ocurrió un problema intentelo nuevamente',
        })
      }
      setIsLoadingConsolidate(false)
    } catch (err) {
      showAlert({
        title: 'Error',
        alertType: 'error',
        message: 'Ocurrio un problema intentelo nuevamente',
      })
      setIsLoadingConsolidate(false)
    }
  }
  return (
    <View>
      <CustomisableAlert/>
      <TouchableOpacity onPress={_extractCounters} disabled={isLoading} style={{ marginBottom: 10 }}>
        <View
          style={{
            ...styles.button,
            backgroundColor: isLoading ? '#0564FF' : '#2196F3',
          }}
        >
          {isLoading && <ActivityIndicator size="small" color="white"/>}
          <Text style={styles.buttonText}>
            {isLoading ? 'Extrayendo' : 'Extraer contadores'}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={_consolidate} disabled={isLoadingConsolidate}>
        <View
          style={{
            ...styles.button,
            backgroundColor: isLoadingConsolidate ? "#0564FF" : "#2196F3",
          }}
        >
          {isLoadingConsolidate && <ActivityIndicator size="small" color="white" />}
          <Text style={styles.buttonText}>
            {isLoadingConsolidate ? "Consolidando" : "Consolidar excel"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}
