export function showNation(nation: string) {
    if (nation === "中国") {
        return nation;
    }
    return `[${nation[0]}]`;
}