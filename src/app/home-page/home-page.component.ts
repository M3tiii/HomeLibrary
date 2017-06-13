import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service';
import { StorageService } from '../storage.service'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private storage: StorageService, private library: LibraryService) {
    // console.log(this.storage.userMembers);
  }

  ngOnInit() {

  }

}
