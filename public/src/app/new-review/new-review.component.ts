import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new-review',
  templateUrl: './new-review.component.html',
  styleUrls: ['./new-review.component.css']
})
export class NewReviewComponent implements OnInit {
  review: any;
  err: any;
  rest:any;

  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router){}

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log(params['id'])
      this.getRest(params['id'])
    });
   
    this.review = {
      'name' : '',
      'star' : '',
      'description' : ''
    }
    this.err = {
      'name' : '',
      'star' : '',
      'description' : ''
    }
  }
  getRest(id){
    this._httpService.showOneRest(id).subscribe( rest => {
      console.log(rest)
      this.rest = rest;
  })
  }
  createReview(){
    this._httpService.createNewReview(this.rest, this.review).subscribe(data => {
      console.log(data);
      if(data['message'] === "Error"){
        if(data['error']['errors']['name']){
          this.err['name'] = data['error']['errors']['name']['message'];
        }
        if(data['error']['errors']['star']){
          this.err['star'] = data['error']['errors']['star']['message'];
        }
        if(data['error']['errors']['description']){
          this.err['description'] = data['error']['errors']['description']['message'];
        }
        if(data['error']['errors']['restaurant']){
          this.err['restaurant'] = data['error']['errors']['restaurant']['message'];
        }
        }else{
          this._router.navigate(['/home']);
        }
    })
  }
}
