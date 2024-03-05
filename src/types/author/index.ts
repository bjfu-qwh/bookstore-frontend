/**
 * 国家选择器将导出被选的国家
 */
export interface SelectedNation {
    selectedNation: string
}

/**
 * 一位作家的基本信息
 */
export interface AuthorInfo {
    id: number,
    name: string,
    nation: string,
    url: string,
    brief: string
}