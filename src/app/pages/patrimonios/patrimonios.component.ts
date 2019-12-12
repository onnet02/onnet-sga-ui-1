import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-patrimonios',
  templateUrl: './patrimonios.component.html',
  styleUrls: ['./patrimonios.component.scss']
})
export class PatrimoniosComponent implements OnInit {

  flipped = false;
  flipped2 = false;

  constructor() { }



  ngOnInit() {
  }

  flipCard(){
    this.flipped = !this.flipped;
  }

  flipCard2(){
    this.flipped2 = !this.flipped2;
  }

}
