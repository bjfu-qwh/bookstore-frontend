import {expect, test} from 'vitest'
import {AESDecrypt, AESEncrypt, SHA256Encrypt} from '@/utils/encrypt'

test("SHA256", () => {
    let test = "test";
    const encoded = SHA256Encrypt(test);
    console.log(encoded, encoded.length)
})

test("AES_ENV", () => {
    console.log(import.meta.env.VITE_AES_KEY);
})

test("AES_TEST", () => {
    let test = "test";
    const encoded = AESEncrypt(test);
    expect(AESDecrypt(encoded)).toBe(test);
});