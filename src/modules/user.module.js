import axios from 'axios';
import {API_URL, authHeader, /*userState*/} from './helper.module.js'

class NormalUser {

  getUserContent() {
    return axios.get(API_URL + '/user/home', { headers: authHeader() });
  }

}

export var normalUser = new NormalUser();