const KEY: string = "token";

export function getToken(): string | null {
    return localStorage.getItem(KEY);
}