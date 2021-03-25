import axios from 'axios';
import {API_URL, authHeader, userState} from './helper.module.js'

class AuthService {
  
  clear(){
    axios.get(API_URL + '/auth/clear', { headers: authHeader() }).then(response => {
      if(response.data.message == 'ok')
      {
        localStorage.removeItem('user');
        location.reload();
      }
    });
  }

  login(user) {
    return axios
      .post(API_URL + '/auth/login', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data)); //this is why the root of your local storage is calles "user".
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + '/auth/register', {
      username: user.username,
      role: user.role,
      email: user.email,
      password: user.password
    });
  }
}

export var authorize = new AuthService();

export const auth = {
  namespaced: true,
  state: userState(),
  actions: {
    login({ commit }, user) { 
      return authorize.login(user).then(
        user => {
          commit('loginSuccess', user); 
          return Promise.resolve(user); 
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      authorize.logout();
      commit('logout');
    },
    register({ commit }, user) {
      return authorize.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    },
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    }
  }
};
