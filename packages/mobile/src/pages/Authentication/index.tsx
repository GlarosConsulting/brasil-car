import React, { useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { FormHandles } from '@unform/core';

import SocialButton from '../../components/SocialButton';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  CreateAccount,
  CreateAccountText,
  ForgotPassword,
  ForgotPasswordText,
  SocialButtonsContainer,
  Title,
} from './styles';

const Authentication: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signInWithGoogle } = useAuth();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Container>
          <View>
            <Title>Faça seu logon</Title>
          </View>

          {/*
          <Form
            ref={formRef}
            onSubmit={()=>{console.log('shj')})}
            style={{
              width: '100%',
            }}
          > */}
          <TextInput
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="E-mail"
            keyboardType="email-address"
            returnKeyType="next"
          />

          <TextInput
            secureTextEntry
            placeholder="Senha"
            textContentType="newPassword"
            returnKeyType="send"
            onSubmitEditing={() => {
              formRef.current?.submitForm();
            }}
          />

          <TouchableOpacity
            onPress={() => {
              formRef.current?.submitForm();
            }}
          >
            <Text>Entrar</Text>
          </TouchableOpacity>
          {/* </Form> */}

          <ForgotPassword
            onPress={() => {
              console.log('ForgotPassword');
            }}
          >
            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
          </ForgotPassword>

          <SocialButtonsContainer>
            <SocialButton
              iconType="font-awesome"
              buttonTitle="Entrar com o Google"
              btnType="google"
              color="#de4d41"
              backgroundColor="#f5e7ea"
              onPress={() => signInWithGoogle()}
            />

            <SocialButton
              iconType="feather"
              buttonTitle="Entrar com o Telefone"
              btnType="phone"
              color="#617feb"
              backgroundColor="#e7eaf5"
              onPress={() => console.log('PhoneSignIn')}
            />
          </SocialButtonsContainer>
        </Container>

        <CreateAccount onPress={() => console.log('SignUp')}>
          {/* <FeatherIcon
            name="log-in"
            size={20}
            color={defaultTheme.colors.white}
          /> */}
          <CreateAccountText>Criar uma conta</CreateAccountText>
        </CreateAccount>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Authentication;
