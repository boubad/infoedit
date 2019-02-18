
export interface ILocalDataManager {
    findById(key: string): any | undefined;
    hasKey(key: string): boolean ;
    put(key: string, val: any): void;
    remove(key: string): void;
    getAllKeys(): string[];
}// interface ILocalDataManager
