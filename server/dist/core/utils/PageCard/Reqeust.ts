export type NewPageCardRequest = {
    userId: number;
    url: string;
    name: string;
    description: string;
    type: string;
}
export type AddBlockRequest = {
    userId: number;
    blockName: string;
    pageCardName: string;
}