import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  rest:any;
  err: any;
  constructor(private _httpService: HttpService,
              private _route: ActivatedRoute,
              private _router: Router){}

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log(params['id'])
      this.getRest(params['id'])
  });
  }

  getRest(id){
    this._httpService.showOneRest(id).subscribe( data => {
      console.log(data)
      this.rest = data;
  })
}
editRest(){
  this._httpService.editOneRest(this.rest).subscribe( data =>{
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
