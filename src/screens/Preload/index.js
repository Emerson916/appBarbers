import React, {useEffect, useContext} from 'react';
import {Container, LoadingIcon} from './styles';
import BarberLogo from '../../assets/barber.svg';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../contexts/UserContext';

import Api from '../../Api';
// import {Button} from 'react-native';

const Preload = () => {
  const dispatch = useContext(UserContext);
  const navigation = useNavigation();

  // Fazendo uma verificação, se existe um token
  useEffect(() => {
    const checkToken = async () => {
      //Pega o token que esta salvo no app
      const token = await AsyncStorage.getItem('token');

      if (token) {
        //validar o token
        let res = await Api.checkToken(token);
        //Validando o token para se ainda existe
        if (res.token) {
          //salvando o token do usuario com AsyncStorage
          await AsyncStorage.setItem('token', res.token);

          //salvando o avatar no context
          //OBS : dados pegos do reducer
          // dispatch({
          //   type: 'setAvatar',
          //   payload: {
          //     avatar: res.data.avatar,
          //   },
          // });

          navigation.reset({
            routes: [{name: 'MainTab'}],
          });
        } else {
          navigation.navigate('SignIn');
        }
      } else {
        //mandar para a tela de login
        navigation.navigate('SignIn');
      }
    };
    checkToken();
  });
  // }, []);

  return (
    <Container>
      <BarberLogo width="100%" height="160" />
      <LoadingIcon size="large" color="#FFF" />
      {/* <Button title="Teste" onPress={() => navigation.navigate('MainTab')} /> */}
    </Container>
  );
};

export default Preload;
