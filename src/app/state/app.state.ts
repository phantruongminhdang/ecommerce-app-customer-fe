export interface AppState<T> {
    data: T | null;
    loading: boolean;
    error: any;
}