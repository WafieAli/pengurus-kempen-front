import axios from 'axios';
import {API_URL, authHeader, /*userState,*/ API_CALL_TIMEOUT} from './helper.module.js'

class Account { 

  getAccount(user) {
    let auth_header = authHeader();
    let request_body = {
      'x-access-token':auth_header['x-access-token'],
      'user':user
    }
    return axios.post(API_URL + '/account/getacc', {request_body}, { timeout : API_CALL_TIMEOUT });
  }

  updAccount(data,user) {
    let auth_header = authHeader();
    let request_body = {
      'x-access-token':auth_header['x-access-token'],
      'user':user,
      'data':data
    }
    return axios.post(API_URL + '/account/updacc', {request_body}, { timeout : API_CALL_TIMEOUT });
  }

}

export var account = new Account();
