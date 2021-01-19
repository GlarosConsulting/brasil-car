import React, {
  useEffect,
  useImperativeHandle,
  useRef,
  forwardRef,
} from 'react';
import { TextInputProps } from 'react-native';

import { useField } from '@unform/core';

import { TextInput, Container, Icon } from './styles';

interface IInputProps extends TextInputProps {
  name: string;
  icon?: string;
}

interface IReferenceInputValue {
  value: string;
}

interface IRefInput {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<IRefInput, IInputProps> = (
  { name, icon, ...rest },
  ref,
) => {
  const InputElementRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const InputValueRef = useRef<IReferenceInputValue>({ value: defaultValue });

  useImperativeHandle(ref, () => ({
    focus() {
      InputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: InputValueRef.current,
      path: 'value',
      setValue(_ref, value) {
        InputValueRef.current.value = value;
        InputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        InputValueRef.current.value = '';
        InputElementRef.current.clear();
      },
    });
  }, [fieldName, InputValueRef, registerField]);

  return (
    <Container isErrored={!!error}>
      {icon ? <Icon name={icon} size={20} color="#666360" /> : null}

      <TextInput
        ref={InputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        onChangeText={(value: string) => {
          InputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
