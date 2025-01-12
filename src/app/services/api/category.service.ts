import { inject, Injectable } from "@angular/core";
import { HttpService } from "@services/http.service";
import { Observable } from "rxjs";
import { environment } from "src/app/environment";
import { Category } from "src/app/models/category";
import { Icon } from "src/app/models/icon";

@Injectable({ 
    providedIn: "root" 
})
export class CategoryService {
    private readonly PATH = `${environment.API_URL}v1/categories`;
    private http = inject(HttpService)

    find(params?: Record<string, string | number | null | undefined>): Observable<Category[]> {
        return this.http.get<Category[]>(this.PATH, params);
    }

    get(id: number): Observable<Category> {
        return this.http.get<Category>(`${this.PATH}/${id}`);
    }

    create(category: Partial<Category>): Observable<Category> {
        return this.http.post<Category>(this.PATH, category);
    }

    update(id: number, category: Partial<Category>): Observable<Category> {
        return this.http.put<Category>(`${this.PATH}/${id}`, category); 
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.PATH}/${id}`);
    }

    getIcons(): Observable<Icon[]> {
        return this.http.get<Icon[]>(`${this.PATH}/icons`);
    }
}