import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { requestMultiple, PERMISSIONS } from 'react-native-permissions';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Authentication from './pages/Authentication';
import Home from './pages/Home';
import Inspection from './pages/Inspection';

const Drawer = createDrawerNavigator();

const App = () => {
  useEffect(() => {
    requestMultiple([
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    ]);
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Authentication">
        <Drawer.Screen name="Authentication" component={Authentication} />
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Inspection" component={Inspection} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
