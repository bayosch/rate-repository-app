import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import * as DocumentPicker from 'expo-document-picker'
import * as FileSystem from 'expo-file-system'
import * as XLSX from 'xlsx'
import StyledText from '../components/StyledText'
import PrinterExtract from './PrinterExtract'

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 10,
    marginBottom: 20,
    marginTop: -5
  },
  form: {
    margin: 12
  },
  container: {
    padding: 20
  },
})

export default function PrinterList () {
  const [sheetData, setSheetData] = useState(null)
  const _pickDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: false,
        type: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
      })
      if (result.type !== 'cancel') {
        const uri = FileSystem.documentDirectory + result.name
        await FileSystem.copyAsync({
          from: result.uri,
          to: uri
        })
        const contenido = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 })
        const workbook = XLSX.read(contenido, { type: 'base64' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 'A1' });
        setSheetData(json);
      }
    } catch (err) {
      throw err
    }
  }
  return (
    <View style={styles.form}>
      <Button title="Selecciona el documento" onPress={_pickDocument}/>
      {sheetData && (
        <View style={styles.container}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 10
          }}>
            <StyledText fontWeight="bold">Impresoras consultadas</StyledText>
            <StyledText fontWeight="bold">{sheetData.length}</StyledText>
          </View>
          <PrinterExtract {...sheetData}/>
        </View>
      )}
    </View>
  )
}
