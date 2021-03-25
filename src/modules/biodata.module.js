import axios from 'axios';
import {API_URL, authHeader, /*userState,*/ API_CALL_TIMEOUT} from './helper.module.js'

class Biodata {

  getInfoBio() {
    return axios.get(API_URL + '/biodata/infobio', { headers: authHeader() });
  }  

  getBiodata(user) {
    let auth_header = authHeader();
    let request_body = {
      'x-access-token':auth_header['x-access-token'],
      'user':user
    }
    return axios.post(API_URL + '/biodata/getbio', {request_body}, { timeout : API_CALL_TIMEOUT });
  }

  updBiodata(data,user) {
    let auth_header = authHeader();
    let request_body = {
      'x-access-token':auth_header['x-access-token'],
      'user':user,
      'data':data
    }
    return axios.post(API_URL + '/biodata/updbio', {request_body}, { timeout : API_CALL_TIMEOUT });
  }

  getAccount(user) {
    let auth_header = authHeader();
    let request_body = {
      'x-access-token':auth_header['x-access-token'],
      'user':user
    }
    return axios.post(API_URL + '/biodata/getacc', {request_body}, { timeout : API_CALL_TIMEOUT });
  }

  updAccount(data,user) {
    let auth_header = authHeader();
    let request_body = {
      'x-access-token':auth_header['x-access-token'],
      'user':user,
      'data':data
    }
    return axios.post(API_URL + '/biodata/updacc', {request_body}, { timeout : API_CALL_TIMEOUT });
  }

}

export var biodata = new Biodata();
