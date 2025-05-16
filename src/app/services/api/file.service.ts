import { Injectable } from "@angular/core";
import { environment } from "src/app/environment";

@Injectable({ 
    providedIn: "root" 
})
export class FileService {
    private readonly PATH = `${environment.API_URL}v1/files/`;

    async get(url: string): Promise<string> {
        const response = await fetch(`${this.PATH}${url}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.statusText}`);
        }
        const blob = await response.blob();
        return URL.createObjectURL(blob);
    }
}