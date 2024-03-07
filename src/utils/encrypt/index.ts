/**
 * 本脚本基于CryptoJS，定义各种用于加密和解密的算法。如果发现IDE提示有问题，多半是它自己的
 *
 * 在test/utils/encrypt.test.js文件进行了相关测试。
 * @author bjfu-qwh
 */
import {AES, enc, SHA256} from "crypto-js"

const AES_KEY: string = import.meta.env.VITE_AES_KEY;

/**
 *
 * 实现SHA256单向加密
 *
 * @param value 需要单向加密的值
 * @constructor
 */
export function SHA256Encrypt(value: string) {
    const hash = SHA256(value);
    return hash.toString();
}

/**
 *
 * @param value
 * @constructor
 */
export function AESEncrypt(value: string) {
    return AES.encrypt(value, AES_KEY).toString();
}

/**
 *
 * @param value
 * @constructor
 */
export function AESDecrypt(value: string) {
    return AES.decrypt(value, AES_KEY).toString(enc.Utf8);
}
