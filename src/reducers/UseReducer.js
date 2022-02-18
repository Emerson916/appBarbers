//Ações especificas e local de armazenamento do usuario
export const initialState = {
  //dados do usuario
  avatar: '',
  favorites: [],
  appointments: [],
};

export const UserReducer = (state, action) => {
  switch (action.type) {
    case 'setAvatar':
      return {...state, avatar: action.payload.avatar};
    // break;
    default:
      return state;
  }
};
