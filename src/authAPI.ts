import axios from 'axios';
import { User } from './models/User';

const SERVER = "http://127.0.0.1:8000/login"

export  function  login(user: User) {
    // console.log(user);
    return  axios.post(SERVER, user)
}
