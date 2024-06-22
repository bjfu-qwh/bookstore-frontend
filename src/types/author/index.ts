/**
 * 国家选择器将导出被选的国家
 */
export interface SelectedNation {
    selectedNation: string
}

/**
 * 作家详细信息，用于专题页展示。
 */
export interface AuthorDetail {
    id: number,
    name: string,
    nation: string,
    url: string,
    brief: string
}

export interface AuthorBrief {
    id: number,
    name: string,
    nation: string
}

export interface NewAuthorDTO {
    name: string,
    nation: string,
    url: string,
    brief: string
}

export interface AuthorSelectItem {
    id: number,
    name: string,
    nation: string
}