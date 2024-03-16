import {expect, test} from 'vitest'
import {hideEmail, hidePhone} from "@/utils/info";

test("PHONE_TEST", () => {
    const test = "18029923929";
    const expected = "180****3929";
    expect(hidePhone(test)).toBe(expected);
})

test("EMAIL_TEST", () => {
    let testInvalidEmail = "invalid";
    expect(hideEmail(testInvalidEmail)).toBe(testInvalidEmail);
    let shortEmail = "bjfu@qq.com";
    expect(hideEmail(shortEmail)).toBe("b***u@qq.com");
    let middle = "bfuqwh@qq.com";
    expect(hideEmail(middle)).toBe("b***h@qq.com");
    let longEmail = "bjfuqwh202406@bjfu.edu.cn";
    expect(hideEmail(longEmail)).toBe("b******6@bjfu.edu.cn");
})