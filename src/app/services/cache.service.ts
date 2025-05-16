import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class CacheService<T> {
    private cache: Record<string, T> = {};

    set(key: string, value: T): void {
        this.cache[key] = value;
    }

    get(key: string): T {
        return this.cache[key];
    }

    remove(key: string): void {
        delete this.cache[key];
    }

    clear(): void {
        this.cache = {};
    }
}