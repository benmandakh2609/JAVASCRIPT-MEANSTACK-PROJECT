import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  rests : any;
  constructor(private _httpService: HttpService){}

  ngOnInit() {
    this.getRests(); 
  }
  getRests(){
    this._httpService.getAllRests().subscribe( data => {
      console.log(data);
      this.rests = data;
    })
  }

  deleteRest(id){
    this._httpService.deleteOneRest(id).subscribe( data => {
      console.log(data)
      this.getRests();
    })
  }

  showRest(id){
    this._httpService.showOneRest(id).subscribe( data => {
      console.log(data)
      // this.getTasks();
    })
  }

}
