export interface ApiResponse<T> {
    data: T;
    error: string | undefined;
    isLoading: boolean;
}