import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Concert } from '../models/concert.model';

@Injectable({
  providedIn: 'root',
})
export class ConcertsService {
  private readonly _url: string = 'http://localhost:3000/concerts';

  constructor(private httpClient: HttpClient) {}

  getById(id: number): Observable<Concert> {
    const getByIdUrl = this._url +  '/' + id;

    return this.httpClient.get<Concert>(getByIdUrl);
  }

  getAll(): Observable<Concert[]> {
    const url = 'http://localhost:3000/concerts';

    const httpParams = new HttpParams({
      fromObject: {
        _expand: 'powerup'
      }
    });

    return this.httpClient.get<Concert[]>(url, {
      params: httpParams
    });  
  }

  create(concert: Concert): Observable<Concert> {
    concert.date = new Date();

    return this.httpClient.post<Concert>(this._url, concert);
  }

  update(concert: Concert): Observable<Concert> {
    const updateUrl = this._url + '/' + concert.id;

    return this.httpClient.patch<Concert>(updateUrl, concert);
  }

  save(concert: Concert): Observable<Concert> {
    if (concert.id) {
      return this.update(concert);
    } else {
      return this.create(concert);
    }
  }

  delete(id: number): Observable<void> {
    const deleteUrl = this._url + '/' + id;

    return this.httpClient.delete<void>(deleteUrl);
  }
}
