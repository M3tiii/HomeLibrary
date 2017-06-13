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

  onType(event) {
    this.library.get(this.searchText).then(res => {
      this.searchResult = res.items;
      // console.log(this.searchResult);
    })
  }

  saveBook(book) {
    this.library.getDetail(book.id).then(result => {
      // console.log(result, this.saveBookEmitter);
      // this.library.collection.push(result);
      this.saveBookEmitter.emit(result);
    })

  }

  ngOnInit() {
  }

}
