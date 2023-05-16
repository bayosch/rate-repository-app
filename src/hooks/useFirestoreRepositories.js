import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const useFirestoreRepositories = () => {
    const [repositories, setRepositories] = useState(null);
    const fetchRepositories = async () => {
        const querydb = getFirestore();
        const queryCollection = collection(querydb, 'repositories');
        const response = await getDocs(queryCollection);
        const jsonResponse = response.docs.map(product => ({ ...product.data() }));
        setRepositories(jsonResponse);
    }

    useEffect(() => {
        fetchRepositories()
    }, []);
    const repositoriesNodes = repositories ? repositories : []
    return { repositories: repositoriesNodes }
}

export default useFirestoreRepositories;
