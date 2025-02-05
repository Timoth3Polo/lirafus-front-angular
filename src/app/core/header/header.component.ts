import { Component } from '@angular/core';

import { DataService } from './../service/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private dataService: DataService) { }
  onClick(): void {
    this.dataService.setCurrentType(null);
  }
}
