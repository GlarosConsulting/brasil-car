import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { requestMultiple, PERMISSIONS } from 'react-native-permissions';

import { NavigationContainer } from '@react-navigation/native';

import CustomDrawer from './components/CustomDrawer';
import AppProvider from './hooks';

const App = () => {
  useEffect(() => {
    requestMultiple([
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    ]);
  }, []);

  return (
    <AppProvider>
      <NavigationContainer>
        <CustomDrawer />
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
