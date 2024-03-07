const KEY: string = "token";

export function getToken(): string | null {
    return localStorage.getItem(KEY);
}

export function setToken(token: string) {
    localStorage.setItem(KEY, token);
}

export function removeToken() {
    localStorage.removeItem(KEY);
}
