import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as RNFS from 'react-native-fs';

const styles = StyleSheet.create({
    error: {
        color: 'red',
        fontSize: 10,
        marginBottom: 20,
        marginTop: -5
    },
    form: {
        margin: 12
    }
});

_pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: false
    });
    const uri = FileSystem.documentDirectory + result.name;
    await FileSystem.copyAsync({
        from: result.uri,
        to: uri
    });
    const data = RNFS.readFile(uri);
    console.log(data);
    //const reader: FileReader = new FileReader();
    //var workbook = XLSX.read(uri, { type: "file" });
    //const sheetName = workbook.SheetNames[0];
    //const worksheet = workbook.Sheets[sheetName];
    //const json = XLSX.utils.sheet_to_json(worksheet, { header: 'A1' });
    //console.log(json);

}


export default function PrinterList() {
    return (
        <View style={styles.form}>
            <Button title="Select Document" onPress={this._pickDocument} />
        </View>
    )
}