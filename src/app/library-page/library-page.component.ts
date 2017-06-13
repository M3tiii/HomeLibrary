import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibraryService } from '../library.service'
import { StorageService } from '../storage.service'
import { SearcherComponent } from '../searcher/searcher.component';

@Component({
  selector: 'app-library-page',
  templateUrl: './library-page.component.html',
  styleUrls: ['./library-page.component.css']
})
export class LibraryPageComponent implements OnInit {

  @ViewChild(SearcherComponent) searcher;

  private libraryName: string;
  private collection: any[];

  constructor(private library: LibraryService, private storage: StorageService, private route: ActivatedRoute) {
    this.collection = this.library.collection;
    // console.log(this.collection);
    //
    // this.storage.getUser('marek3').then(res => {
    //   console.log(res);
    // });

    // this.storage.createUser('marek4', '1', '1').then(res => {
    //   // console.log(res);
    // });
    //
    // this.storage.getLibrary('marek5').then(res => {
    //   console.log(res);
    // });
    // //
    // this.storage.updateLibrary('marek5').then(res => { //serwer sie laguje jak nie ma praw trzba zatrzymac bo czeka na promise chyba
    //   console.log(res);
    // });
  }

  saveBook(book) {
    this.collection.push({ id: book.selfLink, title: book.volumeInfo.title, imgLarge: book.volumeInfo.imageLinks.large });
    // console.log(this.libraryName, this.collection);
    this.storage.updateLibrary(this.libraryName, this.collection).then(res => {
      console.log(res);
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.libraryName = params.id;
      this.storage.getLibrary(this.libraryName).then(res => {
        if (!res.error) {
          this.collection = res.data;
          this.searcher.set(this.libraryName, this.collection);
          // console.log(res, this.searcher);
        } else {
          console.log(res.error);
        }
      });
    });
  }

}
