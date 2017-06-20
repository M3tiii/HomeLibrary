import { Component, OnInit, EventEmitter, Output, ViewChild} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css'],
  inputs: ['element']
})
export class EditModalComponent implements OnInit {

  @Output() saveEditedBookEmitter = new EventEmitter();
  @Output() putEditedEmitter = new EventEmitter();

  @ViewChild(ModalDirective) childModal;

  private edited = false;

  private book = {
    id: '',
    title: '',
    publisher: '',
    author: '',
    note: '',
    imgSmall: '',
    imgMedium: '',
    isReading: false,
    duration: 0
  };

  constructor() { }

  public set(book) {
    this.book = book;
    this.edited = false;
    this.book.id = book.id;
    this.book.duration = 0;
    console.log(this.book);
    if (book.hasOwnProperty('volumeInfo')) {
      if (book.volumeInfo.hasOwnProperty('imageLinks')) {
        const tmpImage = book.volumeInfo.imageLinks[Object.keys(book.volumeInfo.imageLinks)[0]];
        this.book.imgSmall = book.volumeInfo.imageLinks.hasOwnProperty('small') ? book.volumeInfo.imageLinks.small : tmpImage;
        this.book.imgMedium = book.volumeInfo.imageLinks.hasOwnProperty('medium') ? book.volumeInfo.imageLinks.medium : tmpImage;
      }

      if (book.volumeInfo.hasOwnProperty('title'))
        this.book.title = book.volumeInfo.title;
      if (book.volumeInfo.hasOwnProperty('publisher'))
        this.book.publisher = book.volumeInfo.publisher;
      if (book.volumeInfo.hasOwnProperty('authors'))
        this.book.author = book.volumeInfo.authors.length > 0 ? book.volumeInfo.authors[0] : '';
    }
    this.book.note = '';
    this.showChildModal();
  }

  public editBook(book) {
    this.book = book;
    this.edited = true;
    this.book = book;
    this.showChildModal();
  }

  public submitEdit(ev) {
    if (this.edited) {
      this.putEditedEmitter.emit(this.book);
    } else {
      this.saveEditedBookEmitter.emit(this.book);
    }
    this.hideChildModal();
  }

  public showChildModal(): void {
    this.childModal.show();
  }

  public hideChildModal(): void {
    this.childModal.hide();
  }

  ngOnInit() {
  }

}
