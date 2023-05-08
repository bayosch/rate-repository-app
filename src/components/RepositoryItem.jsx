import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import theme from '../theme';
import RepositoryStats from './RepositoryStats';
import StyledText from './StyledText';

const styles = StyleSheet.create({
    container: {
        padding: 20, paddingBottom: 5, paddingTop: 5
    },
    language: {
        padding: 4,
        color: theme.colors.white,
        backgroundColor: theme.colors.primary,
        alignSelf: 'flex-start',
        borderRadius: 4,
        overflow: 'hidden',
        marginTop: 4,
        marginBottom: 4
    },
    image: {
        width: 48,
        height: 48,
        borderRadius:4
    }
});

const RepositoryItemHeader = (props) => {
    return (
        <View style={{ flexDirection: 'row', paddingBottom: 3, paddingRight:50}}> 
            <View style={{flexGrow:0,paddingRight:10}}>
                <Image style={styles.image} source={{ uri: props.ownerAvatarUrl }} />
            </View>
            <View style={{flexGrow:1} }>
                <StyledText fontWeight='bold'>{props.fullName}</StyledText>
                <StyledText color='secondary' style={{textAlign:'justify'}}>{props.description}</StyledText>
                <StyledText style={styles.language} > {props.language}</StyledText>
            </View>
        </View>
    );
}

const RepositoryItem = (props) => {
    return (
        <View key={props.id} style={styles.container}>
            <RepositoryItemHeader {...props} />
            <RepositoryStats {...props} />
    </View>)
};

export default RepositoryItem;