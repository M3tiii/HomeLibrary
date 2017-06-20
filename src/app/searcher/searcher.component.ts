import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LibraryService } from '../library.service'

@Component({
  selector: 'searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements OnInit {

  @Output() saveBookEmitter = new EventEmitter();

  private searchText: string = '';
  private searchResult: any[] = [];

  constructor(private library: LibraryService) {
  }

  public set(libraryName, collection) {
    // console.log(libraryName, collection);
  }

  private onType(event) {
    this.library.get(this.searchText).then(res => {
      this.searchResult = res.items;
      // console.log(this.searchResult);
    })
  }

  private getImage(book) {
    if (book.volumeInfo.imageLinks) {
      const tmpImg = book.volumeInfo.imageLinks[Object.keys(book.volumeInfo.imageLinks)[0]];
      return book.volumeInfo.imageLinks.hasOwnProperty('thumbnail') ? book.volumeInfo.imageLinks.thumbnail : tmpImg;
    }
    return '';
  }

  private saveBook(book) {
    this.library.getDetail(book.id).then(result => {
      // console.log(result, this.saveBookEmitter);
      // this.library.collection.push(result);
      this.saveBookEmitter.emit(result);
    })

  }

  ngOnInit() {
  }

}
