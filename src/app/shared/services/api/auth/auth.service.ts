import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../constant/constant';
import { AuthRequest } from '../../../models/Auth/AuthRequest';
import { Observable } from 'rxjs';
import { AuthResponse } from '../../../models/Auth/AuthResponse';
import { RegistrationRequest } from '../../../models/Auth/RegistrationRequest';
import { RegistrationResponse } from '../../../models/Auth/RegistrationResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(loginObj: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      Constant.API_URL + Constant.API_RESOURCES.AUTH.LOGIN,
      loginObj,
      // {
      //   headers: new HttpHeaders(
      //     { 'Content-Type': 'multipart/form-data' }
      //   )
      // },
    )
  }

  register(reigsterObj: RegistrationRequest): Observable<RegistrationResponse> {
    return this.http.post<any>(
      Constant.API_URL + Constant.API_RESOURCES.AUTH.REGISTER,
      reigsterObj,
      // {
      //   headers: new HttpHeaders(
      //     { 'Content-Type': 'multipart/form-data' }
      //   )
      // },
    )
  }
}
