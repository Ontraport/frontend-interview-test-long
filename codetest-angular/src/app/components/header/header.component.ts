import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showAddPostDialog = false;

  constructor() { }

  ngOnInit() {
  }

  showModal($event) {
    $event.preventDefault();
    this.showAddPostDialog = true;
  }

  hideModal() {
    this.showAddPostDialog = false;
  }

}
