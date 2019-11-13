import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  rest: any;
  err: any;

  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router){}

  ngOnInit() {
    this.rest = {
      'name' : '',
      'cuisine' : ''
    }
    this.err = {
      'name' : '',
      'cuisine' : ''
    }
  }

  createRest(){
    this._httpService.createNewRest(this.rest).subscribe(data => {
      console.log(data);
      if(data['message'] === "Error"){
        if(data['error']['errors']['name']){
          this.err['name'] = data['error']['errors']['name']['message'];
        }
        if(data['error']['errors']['cuisine']){
          this.err['cuisine'] = data['error']['errors']['cuisine']['message'];
        }
        }else{
        this._router.navigate(['/home']);
        }
    })
  }
}
