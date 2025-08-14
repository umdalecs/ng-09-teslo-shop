import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "../../components/navbar/navbar";

@Component({
  selector: 'front-layout',
  imports: [RouterOutlet, Navbar],
  templateUrl: './store-front-layout.html',
  styles: ``
})
export class StoreFrontLayout {

}
