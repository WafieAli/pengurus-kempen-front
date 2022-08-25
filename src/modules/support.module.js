import axios from 'axios';
import {API_URL, authHeader} from './helper.module.js'

class Support {

  getSupport() {
    return axios.get(API_URL + '/support/get', { headers: authHeader() });
  }

}

export var support = new Support();