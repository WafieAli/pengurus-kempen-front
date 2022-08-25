import axios from 'axios';
import {API_URL, authHeader, /*userState,*/ API_CALL_TIMEOUT} from './helper.module.js'

class AdminUser {

  getAdminContent() {
    return axios.get(API_URL + '/admin/home', { headers: authHeader() });
  }
  getInfo(user,info){
    let auth_header = authHeader();
    let request_body = {
      'x-access-token':auth_header['x-access-token'],
      'user':user,
      'info':info
    }
    return axios.post(API_URL + '/admin/getInfo', {request_body}, { timeout : API_CALL_TIMEOUT });
  }

  getAllUsers(query){
    let auth_header = authHeader();
    let request_body = {
      'x-access-token':auth_header['x-access-token'],
      'query':query
    }
    return axios.post(API_URL + '/admin/getAllUsers', {request_body}, { timeout : API_CALL_TIMEOUT });
  }

}

export var adminUser = new AdminUser();