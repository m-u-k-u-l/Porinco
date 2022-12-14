import axios from "axios";    
import * as common from "./common";

var token = common.getToken(); 
var api_url = "http://localhost:4000"; 
var userauth = '';
if (token) 
{ 
    userauth = token;  
}  
var API = axios.create({
    baseURL: api_url, 
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userauth,
    }
    }); 

class APIService {
    /*constructor() {
         
    }*/  
    /* for get data specific Item*/
    async getItem(url) {
        return new Promise(async (resolve, reject) => {
            await API.get(url,{}).then(res => { resolve(res); }).catch(error => { reject(error);});
        });
    }

    /* for create specific Item*/
    async postItem(url, item) { 
        return new Promise(async (resolve, reject) => {
            await API.post(url, item).then(res => { resolve(res); }).catch(error => { reject(error);});
        }); 
    }

    /* for delete specific Item*/
    async deleteItem(url) {
        return new Promise(async (resolve, reject) => {
            await API.delete(url,{}).then(res => { resolve(res); }).catch(error => { reject(error);});
        });
    }

    /* for update specific Item*/
    async patchItem(url, item) { 
        return new Promise(async (resolve, reject) => {
            await API.patch(url, item).then(res => { resolve(res); }).catch(error => { reject(error);});
        });
    }
}
export default APIService;