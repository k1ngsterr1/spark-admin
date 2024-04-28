export interface AddRequest {
    table: string;
    key: string | number;
    data: object;
}
export interface DeleteRequest {
    table: string;
    key: string | number;
}
export interface UpdateRequest {
    table: string;
    key: string | number;
    data: object;
}