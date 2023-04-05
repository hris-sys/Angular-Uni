import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Powerup } from '../models/powerup.model';

@Injectable({
    providedIn: 'root'
})
export class PowerupsService{
    private readonly _url: string = "http://localhost:3000/Powerups";

    constructor(private httpClient: HttpClient){
    }

    getAll(): Observable<Powerup[]> {
        return this.httpClient.get<Powerup[]>(this._url);
    }

    create(powerup: Powerup): Observable<Powerup>{
        let powerupForSave = new Powerup();

        powerupForSave.lastDateModified = new Date();
        powerupForSave.credits = powerup.credits;
        powerupForSave.description = powerup.description;
        powerupForSave.title = powerup.title;
        
        return this.httpClient.post<Powerup>(this._url, powerupForSave);
    }

    update(powerup: Powerup): Observable<Powerup>{
        const updateUrl = this._url + '/' + powerup.id;
        powerup.lastDateModified = new Date();

        return this.httpClient.patch<Powerup>(updateUrl, Powerup);
    }

    save(powerup: Powerup): Observable<Powerup>{
       if(powerup.id){
           return this.update(powerup);
       }
       else{
           return this.create(powerup);
       }
    }

    delete(id: number): Observable<void> {
        const deleteUrl = this._url + '/' + id;
    
        return this.httpClient.delete<void>(deleteUrl);
      }
        
}