import React, { useEffect } from 'react';
import { requestMultiple, PERMISSIONS } from 'react-native-permissions';

import Home from './pages/Home';

const App = () => {
  useEffect(() => {
    requestMultiple([
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    ]);
  }, []);

  return (
    <>
      <Home />
    </>
  );
};

export default App;
