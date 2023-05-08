import React from 'react';
import { FlatList, Text } from 'react-native';
import useRepositories from '../hooks/useRepositories.js';
import useFirestoreRepositories from '../hooks/useFirestoreRepositories.js';
import RepositoryItem from './RepositoryItem.jsx';

const RepositoryList = () => {
    const { repositories } = useFirestoreRepositories();
    //const { repositories } = useRepositories();
    return (
        <FlatList data={repositories}
            ItemSeparatorComponent={() => <Text></Text>}
            renderItem={({ item: repo }) => (
                <RepositoryItem {...repo} />
                )}/>
            )
}

export default RepositoryList