import React from 'react';
import { View} from 'react-native';
import RepositoryList from './RepositoryList.jsx';
import AppBar from './AppBar';
import { Route, Routes} from 'react-router-native';
import LogInPage from '../pages/Login.jsx';
import PrinterList from '../pages/PrinterList.jsx';

const Main = () => {
    return (
        <View style={{ flex: 1 }}>
            <AppBar />
            <Routes>
                {/* <Route path='/' exact element={<RepositoryList />} /> */}
                {/* <Route path='/signin' exact element={<LogInPage />} /> */}
                <Route path='/' exact element={<PrinterList />} />
            </Routes>
        </View>
        )
}

export default Main;
