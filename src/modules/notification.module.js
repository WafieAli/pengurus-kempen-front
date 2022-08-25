import axios from 'axios';
import {API_URL, authHeader, /*userState,*/ API_CALL_TIMEOUT} from './helper.module.js'

class Notification { 

  getNotiSettings(user) {
    let auth_header = authHeader();
    let request_body = {
      'x-access-token':auth_header['x-access-token'],
      'user':user
    }
    return axios.post(API_URL + '/notification/getnotiset', {request_body}, { timeout : API_CALL_TIMEOUT });
  }

  updNotiSettings(data,user) {
    let auth_header = authHeader();
    let request_body = {
      'x-access-token':auth_header['x-access-token'],
      'user':user,
      'data':data
    }
    return axios.post(API_URL + '/notification/updnotiset', {request_body}, { timeout : API_CALL_TIMEOUT });
  }

  //Notification Log
  getNotificationLogs(user) {
    let auth_header = authHeader();
    let request_body = {
      'x-access-token':auth_header['x-access-token'],
      'user':user
    }
    return axios.post(API_URL + '/notification/getnotilog', {request_body}, { timeout : API_CALL_TIMEOUT });
  }

}

export var notification = new Notification();
