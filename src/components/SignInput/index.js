import React from 'react';
import {SingInputContainer, Input} from './styles';

const SignInput = ({IconSvg, placeholder, value, onChangeText, password}) => {
  return (
    <SingInputContainer>
      <IconSvg width="24" height="24" fill="#268596" />
      <Input
        placeholder={placeholder}
        placeholderTextColor="#268596"
        //pegando o valor dos state (email e password)
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={password}
      />
    </SingInputContainer>
  );
};

export default SignInput;
