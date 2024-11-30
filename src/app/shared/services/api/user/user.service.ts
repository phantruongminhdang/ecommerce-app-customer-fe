import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../constant/constant';
import { Observable } from 'rxjs';
import { UserResponseDTO } from '../../../models/User/UserReponseDTO';
import { UserRequestUpdateDTO } from '../../../models/User/UserRequestUpdateDTO';
import { UserRequestCreateDTO } from '../../../models/User/UserRequestCreateDTO';
import { Pagination } from '../../../models/Pagination/Pagination';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(pageIndex: number = 0, pageSize: number = 10): Observable<Pagination<UserResponseDTO>> {
    return this.http.get<Pagination<UserResponseDTO>>(Constant.API_URL + Constant.API_RESOURCES.USERS.GET_ALL + `?pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  getUserById(userId: string): Observable<UserResponseDTO> {
    return this.http.get<UserResponseDTO>(Constant.API_URL + Constant.API_RESOURCES.USERS.GET_BY_ID(userId));
  }

  saveUser(userObj: UserRequestUpdateDTO, userId: string): Observable<any> {
    return this.http.put(
      Constant.API_URL + Constant.API_RESOURCES.USERS.GET_BY_ID(userId),
      userObj
    )
  }

  createUser(userObj: UserRequestCreateDTO): Observable<any> {
    return this.http.post(
      Constant.API_URL + Constant.API_RESOURCES.USERS.GET_ALL,
      userObj
    )
  }

  lockOrUnlockUser(userId: string): Observable<any> {
    return this.http.patch(
      Constant.API_URL + Constant.API_RESOURCES.USERS.LOCK_OR_UNLOCK(userId), null
    )
  }
}
