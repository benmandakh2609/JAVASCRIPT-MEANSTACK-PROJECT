import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient) { }
//// Rests
  getAllRests(){
    return this._http.get('/rests')
  }
  createNewRest(rest){
    return this._http.post("/rest/new", rest)
  }
  deleteOneRest(id){
    return this._http.delete(`/rests/${id}`)
  }
  showOneRest(id){
    return this._http.get(`/rests/${id}`)
  }
  editOneRest(rest){
    return this._http.put(`/rests/${rest._id}`, rest)
  }
//// Review
getAllReviews(){
  return this._http.get('/reviews')
}
createNewReview(rest, review){
  return this._http.post(`/review/new/${rest._id}`, review)
}

}
