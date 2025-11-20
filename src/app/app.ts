import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule], // << Importante
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {}
