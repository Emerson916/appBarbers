import React, {useContext, useState} from 'react';
import {
  Container,
  InputArea,
  CustomButton,
  CustomButtonText,
  MessageLink,
  SingMessageButtonText,
  SingMessageButtonTextBold,
} from './styles';
import BarberLogo from '../../assets/barber.svg';
import SignInput from '../../components/SignInput';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import {useNavigation} from '@react-navigation/native';

import Api from '../../Api';
import AsyncStorage from '@react-native-community/async-storage';
import {UserContext} from '../../contexts/UserContext';

const SignIn = () => {
  //dispatch - para mandar informações para o context
  // mudando o nome de 'dispatch -> userDispatch'
  const dispatch = useContext(UserContext);
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignClick = async () => {
    if (email != '' && password != '') {
      //Utilizando a api para fazer o cadastro
      let res = await Api.signIn(email, password);

      if (res.token) {
        //salvando o token do usuario com AsyncStorage
        await AsyncStorage.setItem('token', res.token);

        //salvando o avatar no context
        //OBS : dados pegos do reducer
        dispatch({
          type: 'setAvatar',
          payload: {
            avatar: res.data.avatar,
          },
        });

        navigation.reset({
          routes: [{name: 'MainTab'}],
        });
      } else {
        alert('E-mail ou Senha invalidos!');
      }
    } else {
      alert('Preencha os campos!');
    }
  };

  const handleMessageButtonClick = () => {
    //mandando o usuario para a proxima tela, mas sem deixar com que ele consiga voltar
    navigation.reset({
      routes: [{name: 'SignUp'}],
    });
  };

  return (
    <Container>
      <BarberLogo width="100%" height="160" />

      <InputArea>
        <SignInput
          IconSvg={EmailIcon}
          placeholder="Digite seu e-mail"
          value={email}
          //pegando o texto do input e jogando dentro da função do state para mudar a variavel
          onChangeText={t => setEmail(t)}
        />
        <SignInput
          IconSvg={LockIcon}
          placeholder="Digite sua senha"
          value={password}
          //pegando o texto do input e jogando dentro da função do state para mudar a variavel
          onChangeText={t => setPassword(t)}
          password={true}
        />

        <CustomButton onPress={handleSignClick}>
          <CustomButtonText> LOGIN </CustomButtonText>
        </CustomButton>
      </InputArea>

      <MessageLink onPress={handleMessageButtonClick}>
        <SingMessageButtonText>
          Ainda não possui uma conta ?
        </SingMessageButtonText>

        <SingMessageButtonTextBold> Cadastre-se</SingMessageButtonTextBold>
      </MessageLink>
    </Container>
  );
};

export default SignIn;
