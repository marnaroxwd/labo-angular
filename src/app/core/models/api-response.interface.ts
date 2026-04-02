export interface ApiResponse<T> {
    data: T;
}

//api response est un générique (grâce au T)
//Un générique c'est qd on défini le type au moment ou on l'utilise

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    limit: number;
    offset: number;
}