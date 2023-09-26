import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  readonly ROOT_URL;                            //Read only is a kinda constant.
  constructor(private http: HttpClient) {       //we can use this http class anytime we want because it has been injected by angular.
    this.ROOT_URL = "http://localhost:3000";
  }

  get(uri: string) {
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  post(uri: string, payload: Object) {
    return this.http.post(`${this.ROOT_URL}/${uri}`,payload);//payload is used for creating a new record in database or a document in a collection.
  }
  //put is used for replacing the selected directory and patch is used for selected specific update of specific part. 
  patch(uri: string, payload: Object) {
    return this.http.patch(`${this.ROOT_URL}/${uri}`,payload);
  }

  delete(uri: string) {
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }
}
