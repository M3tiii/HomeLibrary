import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LibraryService {

  URL: string = 'https://www.googleapis.com/books/v1/volumes';
  KEY: string = 'AIzaSyBu7a198UNHynKIMDDejB9t7-45tccLB60';

  public collection: any[] = [];

  constructor(private http: Http) { }

  get(query) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('q', query);
    params.set('key', this.KEY);

    let requestOptions = new RequestOptions();
    requestOptions.search = params;

    return this.http.get(this.URL, requestOptions)
      .toPromise()
      .then(response => {
        // console.log(response.json());
        return response.json()
      })
  }

  getDetail(id) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('key', this.KEY);

    let requestOptions = new RequestOptions();
    requestOptions.search = params;

    return this.http.get(this.URL + '/' + id)
      .toPromise()
      .then(response => {
        // console.log(response.json());
        return response.json()
      })
  }
}
