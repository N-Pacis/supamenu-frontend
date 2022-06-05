import CryptoJS from 'crypto-js';
import { PRIVATE_KEY } from '../helpers/temp.js';

const encrypt = (data) => {

    const cipherText = CryptoJS.AES.encrypt(JSON.stringify(data), PRIVATE_KEY).toString();
    return cipherText;
}

const decrypt = (cipherText) => {
    const bytes = CryptoJS.AES.decrypt(cipherText, PRIVATE_KEY);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    return decryptedData;
}

export { encrypt, decrypt };