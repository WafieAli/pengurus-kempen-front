import axios from 'axios';
import {API_URL, authHeader, /*userState,*/ API_CALL_TIMEOUT} from './helper.module.js'

class Payment { 

  getPayment(user) {
    let auth_header = authHeader();
    let request_body = {
      'x-access-token':auth_header['x-access-token'],
      'user':user
    }
    return axios.post(API_URL + '/payment/getpay', {request_body}, { timeout : API_CALL_TIMEOUT });
  }

  updPayment(data,user) {
    let auth_header = authHeader();
    let request_body = {
      'x-access-token':auth_header['x-access-token'],
      'user':user,
      'data':data
    }
    return axios.post(API_URL + '/payment/updpay', {request_body}, { timeout : API_CALL_TIMEOUT });
  }

  getPayLogs(user) {
    let auth_header = authHeader();
    let request_body = {
      'x-access-token':auth_header['x-access-token'],
      'user':user
    }
    return axios.post(API_URL + '/payment/getlogs', {request_body}, { timeout : API_CALL_TIMEOUT });
  }

}

export var payment = new Payment();
