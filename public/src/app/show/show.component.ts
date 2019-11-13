import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  rest:any;
  reviews:any;

  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router){}

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log(params['id'])
      this.getRest(params['id'])
  });

  this.getReviews();
  }
  getRest(id){
    this._httpService.showOneRest(id).subscribe( data => {
      console.log(data)
      this.rest = data;
  })
}
getReviews(){
  this._httpService.getAllReviews().subscribe( data => {
    console.log(data);
    this.reviews = data;
  })
}

}
