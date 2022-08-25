import axios from 'axios';
import {API_URL, authHeader, /*userState*/} from './helper.module.js'

class ModeratorUser {

  getModeratorContent() {
    return axios.get(API_URL + '/moderator/home', { headers: authHeader() });
  }

}

export var moderatorUser = new ModeratorUser();