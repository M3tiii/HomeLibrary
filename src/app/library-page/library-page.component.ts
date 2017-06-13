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
  }

  loadBook(book) {
    this.editModal.set(book);
  }

  saveEditedBook(book) {
    this.fetchCollection().then(() => {
      let repeat = this.collection.find(b => b.id == book.id);
      console.log(repeat);
      if (!repeat) {
        this.collection.push(book);
        this.storage.updateLibrary(this.libraryName, this.collection).then(res => {
          if (res.error)
            console.log(res.error);
        });
      } else {
        console.log("Juz posiadasz tą książkę");
      }
    });
  }

  showDetails(book) {
    this.editModal.editBook(book);
  }

  putEdited(book) {
    this.fetchCollection().then(() => {
      const index = this.findBook(book);
      if (index !== -1) {
        this.collection[index] = book;
      }
      this.storage.updateLibrary(this.libraryName, this.collection).then(res => {
        if (res.error)
          console.log(res.error);
      });
    });
  }

  deleteBook(book) {
    this.fetchCollection().then(() => {
      const index = this.findBook(book);
      if (index !== -1) {
        this.collection.splice(index, 1);
      }
      this.storage.updateLibrary(this.libraryName, this.collection).then(res => {
        if (res.error)
          console.log(res.error);
      });
    });
  }

  findBook(book) {
    let index = -1;
    this.collection.forEach((b, i) => {
      if (b.id == book.id)
        index = i;
    });
    return index;
  }

  toggleReaging(book, state) {
    this.fetchCollection().then(() => {
      const index = this.findBook(book);
      this.collection[index].isReading = state;

      if (state == false) {
        this.collection[index].endTime = JSON.stringify(new Date().getTime());
        const time = this.collection[index].endTime - this.collection[index].startTime;
        this.collection[index].duration += time / 60000;
      } else {
        this.collection[index].startTime = JSON.stringify(new Date().getTime());
      }

      this.storage.updateLibrary(this.libraryName, this.collection).then(res => {
        if (res.error)
          console.log(res.error);
      });
    });
  }

  round(time) {
    return Math.round(time * 100) / 100
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
