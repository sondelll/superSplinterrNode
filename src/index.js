import dotenv from "dotenv";
import read from './sensor';
import {LocalStorage} from 'node-localstorage';

const localStorage = new LocalStorage('./');

dotenv.config();

const refreshLoop = async () => {
   read(localStorage);
   console.log(`${localStorage.getItem('s1c1')}°C`);
}

setInterval(() => refreshLoop(),15000);



