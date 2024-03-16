/**
 * 脚本实现前端敏感信息的隐藏，如邮箱、联系方式加密等。
 */
import {Phone} from "./constants.ts";

/**
 *
 * 如果手机号长度不是11位，直接返回；否则隐藏4-7位。
 *
 * @param phone 目标手机号码
 */
export function hidePhone(phone: string) {
    if (phone.length !== Phone.PHONE_LENGTH) {
        return phone;
    }
    return `${phone.substring(0, Phone.PHONE_HIDE_START)}` +
        `****${phone.substring(Phone.PHONE_HIDE_END)}`;
}

/**
 * 邮箱的设计较为复杂，域名部分保留，用户部分进行如下操作：
 * <ol>
 *     <li>若用户邮箱不合法或者为空，直接返回</li>
 *     <li>若邮箱的用户部分少于5位，只展示首尾字符</li>
 *     <li>否则,若用户部分长n，用max(2,(n-2)/2)个*号串联首尾字符
 * </ol>
 *
 * @param email 需要掩藏的邮箱。
 */
export function hideEmail(email: string) {
    if (email === "") {
        return email;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return email;
    }
    const [user, domain] = email.split('@');
    let hiddenUser;
    if (user.length < 5) {
        hiddenUser = `${user[0]}***${user[user.length - 1]}`;
    } else {
        const middleHiddenLength = Math.max(2, Math.floor((user.length - 2) / 2));
        const startHidden = 1;
        hiddenUser = `${user[0]}${'*'.repeat(startHidden + middleHiddenLength)}` +
            `${user[user.length - 1]}`;
    }
    return `${hiddenUser}@${domain}`;
}