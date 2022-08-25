import axios from 'axios';
import {API_URL/*, authHeader, userState*/} from './helper.module.js'

class PublicUser {

  getPublicContent() {
    return axios.get(API_URL + '/public/home');
  }

}

export var publicUser = new PublicUser();