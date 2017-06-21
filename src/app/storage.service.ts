import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, RequestOptions, URLSearchParams, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class StorageService {

  public isLogged = new BehaviorSubject(null);

  URL: string = 'https://myhomelibrary.herokuapp.com/';
  userId: string;
  userName: string;
  userPassword: string;
  userEmail: string;
  userLastRead: string;
  userTotalRead: number;
  userMembers: any[];
  headers: Headers = new Headers();

  constructor(private http: Http) {
    this.headers.append('Content-Type', 'application/json');
    this.isLogged.next(false);
  }

  getUser(name) {
    return this.get('user/' + name);
  }

  refresh() {
    return this.login(this.userName, this.userPassword);
  }

  login(username, password) {
    const packet = JSON.stringify({
      username,
      password
    });

    return this.post('login/', packet);
  }

  clearLocal() {
    this.userId = '';
    this.userName = '';
    this.userPassword = '';
    this.userEmail = '';
    this.userMembers = [];
  }

  saveLocal(res) {
    this.userId = res._id;
    this.userName = res.username;
    this.userPassword = res.password;
    this.userEmail = res.email;
    this.userMembers = res.members;
    this.userLastRead = res.lastRead;
    this.userTotalRead = Math.round(res.totalRead * 100) / 100;
  }

  sendInvitation(link) {
    return this.get(link + '/' + this.userName);
  }

  registerUser(username, password, email) {
    const packet = JSON.stringify({
      username,
      password,
      email
    });

    return this.post('register/', packet);
  }

  getLibrary(username = this.userName) {
    return this.get('library/' + username);
  }

  updateLibrary(username, data = null, members = null, userDetails = {}) {
    const packet = JSON.stringify({
      username: this.userName,
      password: this.userPassword,
      data: JSON.stringify(data),
      userDetails: JSON.stringify(userDetails),
      members
    });
    // console.log(userDetails);
    return this.put('library/' + username, packet);
  }

  get(query) {
    return this.http.get(this.URL + query, { headers: this.headers })
      .toPromise()
      .then(response => {
        return response.json()
      })
  }

  post(query, requestOptions) {
    return this.http.post(this.URL + query, requestOptions, { headers: this.headers })
      .toPromise()
      .then(response => {
        return response.json()
      })
  }

  put(query, requestOptions) {
    return this.http.put(this.URL + query, requestOptions, { headers: this.headers })
      .toPromise()
      .then(response => {
        return response.json()
      })
  }
}
