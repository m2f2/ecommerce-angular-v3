import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/iuser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersURL = `${environment.URL}/users`;

  constructor(private httpClient: HttpClient) {}

  addUser(user: IUser): Observable<IUser> {
    return this.httpClient.post<IUser>(this.usersURL, user);
  }
}
