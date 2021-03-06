import React, {useState, useContext} from 'react';
import UserContext from '../../contexts/UserContext';
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
import PersonIcon from '../../assets/person.svg';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Api from '../../Api';

const SignUp = () => {
  //dispatch - para mandar informações para o context
  // mudando o nome de 'dispatch -> userDispatch'

  const dispatch = useContext(UserContext);
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignClick = async () => {
    if (name != '' && email != '' && password != '') {
      //Utilizando a api para fazer o cadastro
      let res = await Api.signUp(name, email, password);
      //Fazendo a verificação
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
        alert('Erro :' + res.error);
      }
    } else {
      alert('Preencha todos os campos');
    }
  };

  const handleMessageButtonClick = () => {
    //mandando o usuario para a proxima tela, mas sem deixar com que ele consiga voltar
    navigation.reset({
      routes: [{name: 'SignIn'}],
    });
  };

  return (
    <Container>
      <BarberLogo width="100%" height="160" />

      <InputArea>
        <SignInput
          IconSvg={PersonIcon}
          placeholder="Digite seu nome"
          value={name}
          onChangeText={t => setName(t)}
        />

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
        {/* <Button title="Teste" onPress={() => navigation.navigate('SignIn')} /> */}

        <CustomButton onPress={handleSignClick}>
          <CustomButtonText> CADASTRAR </CustomButtonText>
        </CustomButton>
      </InputArea>

      <MessageLink onPress={handleMessageButtonClick}>
        <SingMessageButtonText>Já possui uma conta ?</SingMessageButtonText>

        <SingMessageButtonTextBold> Faça Login</SingMessageButtonTextBold>
      </MessageLink>
    </Container>
  );
};

export default SignUp;

// emer@gmail.com
// pass: 1234
