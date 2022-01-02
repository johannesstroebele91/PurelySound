import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Entry, RootObject} from "../models/topalbums";

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  constructor(private http: HttpClient) {
  }

  getAlbumsData(): Observable<Entry[]> {
    return this.http.get<RootObject>('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
      .pipe(map((data) => data.feed?.entry));
  }
}
