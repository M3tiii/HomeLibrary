import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibraryService } from '../library.service'
import { StorageService } from '../storage.service'
import { SearcherComponent } from '../searcher/searcher.component';
import { EditModalComponent } from '../edit-modal/edit-modal.component';

@Component({
  selector: 'app-library-page',
  templateUrl: './library-page.component.html',
  styleUrls: ['./library-page.component.css']
})
export class LibraryPageComponent implements OnInit {

  @ViewChild(SearcherComponent) searcher;
  @ViewChild(EditModalComponent) editModal;

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

  loadBook(book) {
    this.editModal.set(book);
  }

  saveEditedBook(book) {
    this.fetchCollection().then(() => {
      this.collection.push(book);
      this.storage.updateLibrary(this.libraryName, this.collection).then(res => {
        if (res.error)
          console.log(res.error);
      });
    });
  }

  deleteBook(book) {
    this.fetchCollection().then(() => {
      const bookIndex = this.collection.indexOf(book);
      if (bookIndex !== -1) {
        this.collection.splice(bookIndex, 1);
      }
      console.log(bookIndex, this.collection);
      this.storage.updateLibrary(this.libraryName, this.collection).then(res => {
        if (res.error)
          console.log(res.error);
      });
    });
  }

  fetchCollection() {
    return this.storage.getLibrary(this.libraryName).then(res => {
      if (!res.error) {
        this.collection = res.data;
        this.searcher.set(this.libraryName, this.collection);
      } else {
        console.log(res.error);
      }
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.libraryName = params.id;
      this.fetchCollection();
    });
  }

}
