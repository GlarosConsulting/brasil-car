import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

interface IAuthContextData {
  user: FirebaseAuthTypes.UserCredential;
  signInWithEmailAndPassword(email: string, password: string): Promise<void>;
  signUp(email: string, password: string): Promise<void>;
  signOut(): Promise<void>;
  signInWithGoogle(): Promise<void>;
  signInWithPhoneNumber(
    phoneNumber: string,
  ): Promise<FirebaseAuthTypes.ConfirmationResult | undefined>;
  confirmPhoneCode(
    code: string,
    confirm: FirebaseAuthTypes.ConfirmationResult,
  ): Promise<void>;
  passwordReset(email: string): Promise<void>;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<FirebaseAuthTypes.UserCredential>(
    {} as FirebaseAuthTypes.UserCredential,
  );

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const user = await AsyncStorage.getItem('@GlarosApp:user');

      if (user) {
        setData({ user: JSON.parse(user) });
      }
    }

    loadStorageData();
  }, []);

  const signInWithEmailAndPassword = useCallback(async (email, password) => {
    try {
      const user = await auth().signInWithEmailAndPassword(email, password);

      setData(user);

      await AsyncStorage.setItem('@GlarosApp:user', JSON.stringify(user));
    } catch (error) {
      console.log(error);
      throw new Error('error.');
    }
  }, []);

  const signUp = useCallback(async (email, password): Promise<void> => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      throw new Error('error');
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      } catch (err) {
        await auth().signOut();
      }
      await AsyncStorage.removeItem('@GlarosApp:user');

      setData({} as FirebaseAuthTypes.UserCredential);
    } catch (error) {
      console.log(error);
    }
  }, [setData]);

  const signInWithGoogle = useCallback(async () => {
    try {
      GoogleSignin.configure({
        webClientId:
          '824008646225-5ongm6o09g4fm4npe5qio1fskbv300la.apps.googleusercontent.com',
      });
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const user = await auth().signInWithCredential(googleCredential);

      setData(user);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        throw new Error(error);
      }
    }
  }, []);

  const confirmPhoneCode = useCallback(
    async (code: string, confirm: FirebaseAuthTypes.ConfirmationResult) => {
      try {
        if (!confirm) {
          throw new Error('error.');
        }

        const response = await confirm.confirm(code);

        if (!response) {
          throw new Error('error.');
        }

        setData(response);
      } catch (error) {
        throw new Error(error);
      }
    },
    [],
  );

  const signInWithPhoneNumber = useCallback(
    async (
      phoneNumber: string,
    ): Promise<FirebaseAuthTypes.ConfirmationResult | undefined> => {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);

      return confirmation;
    },
    [],
  );

  const passwordReset = useCallback(async (email: string): Promise<void> => {
    await auth().sendPasswordResetEmail(email);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data,
        signInWithEmailAndPassword,
        signOut,
        signUp,
        signInWithGoogle,
        signInWithPhoneNumber,
        confirmPhoneCode,
        passwordReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}
