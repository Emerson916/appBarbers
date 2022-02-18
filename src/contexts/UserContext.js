//UserContext vai lidar com as informações do usuario, como "nome" por exemplo
import React, {createContext} from 'react';
import {initialState, UserReducer} from '../reducers/UseReducer';

export const UserContext = createContext();

export default ({children}) => {
  // const [state, dispatch] = UserReducer(UserReducer, initialState);
  const {state, dispatch} = UserReducer(UserReducer, initialState);

  return (
    <UserContext.Provider value={{state, dispatch}}>
      {children}
    </UserContext.Provider>
  );
};