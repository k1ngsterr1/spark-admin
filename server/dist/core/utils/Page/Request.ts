// Типы для запросов страницы
export type NewPageRequest  = {
    websiteId: string;
    userId: number;
    url: string;
    name: string;
    type: string;
}

export type NewPageDataRequest = {
    userId: number;
    pageUrl: string;
    dataId: number;
}