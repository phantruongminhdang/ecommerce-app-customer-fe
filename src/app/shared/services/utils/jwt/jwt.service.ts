import { Injectable } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  getDecodedAccessToken(token: string): JwtPayload | null {
    try {
      return jwtDecode<JwtPayload>(token);
    } catch (Error) {
      return null;
    }
  }

  isTokenExpired(token: JwtPayload | null): boolean {
    if (!token) {
      return true;
    }
    try {
      const currentTime = Date.now() / 1000;
      return (token?.exp || 0) < currentTime;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true;
    }
  }
}
