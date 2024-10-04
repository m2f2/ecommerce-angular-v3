import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IUser } from '../../models/iuser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private router: Router, private httpClient: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.httpClient.post(`${environment.URL}/users`, { email, password });
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  setLoggedInStatus(status: boolean): void {
    this.isLoggedInSubject.next(status);
  }
  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
