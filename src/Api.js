//Requisições do sistema

//webToken : checkToken
//login : singUp
//cadastro : singIn

//API externa
const BASE_API = 'https://api.b7web.com.br/devbarber/api';

export default {
  checkToken: async token => {
    const req = await fetch(`${BASE_API}/auth/refresh`, {
      method: 'POST',
      headers: {
        //aceita JSON
        Accept: 'application/json',
        //Tipo json
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token}),
    });
    //transformando em JSON
    const json = await req.json();
    return json;
  },

  signIn: async (email, password) => {
    const req = await fetch(`${BASE_API}/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    });
    const json = await req.json();
    return json;
  },

  // signIn: async (email, password) => {
  //   console.log('email :', email);
  //   console.log('senha :', password);
  //   const req = await fetch(`${BASE_API}/auth/login`, {
  //     method: 'POST',
  //     headers: {
  //       //aceita JSON
  //       Accept: 'application/json',
  //       //Tipo json
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({email, password}),
  //   });
  //   //transformando em JSON
  //   const json = await req.json();
  //   return json;
  // },

  signUp: async (name, email, password) => {
    const req = await fetch(`${BASE_API}/user`, {
      method: 'POST',
      headers: {
        //aceita JSON
        Accept: 'application/json',
        //Tipo json
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email, password}),
    });
    //transformando em JSON
    const json = await req.json();
    return json;
  },
};
