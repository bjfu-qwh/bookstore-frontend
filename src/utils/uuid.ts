export function createUUID() {
    return crypto.randomUUID().replace("-", "");
}