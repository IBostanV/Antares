import CryptoJS from 'crypto-js';

export default (data) => {
    const key = CryptoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_DECRYPT_SECRET_KEY);
    const decrypted = CryptoJS.AES.decrypt(data, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});

    return decrypted.toString(CryptoJS.enc.Utf8);
};