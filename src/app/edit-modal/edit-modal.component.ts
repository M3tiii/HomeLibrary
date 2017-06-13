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
    this.edited = false;
    this.book.id = book.id;
    this.book.imgSmall = book.volumeInfo.imageLinks.small
    this.book.imgMedium = book.volumeInfo.imageLinks.medium
    this.book.title = book.volumeInfo.title;
    this.book.publisher = book.volumeInfo.publisher;
    this.book.author = book.volumeInfo.authors[0];
    this.book.note = '';
    this.showChildModal();
  }

  public editBook(book) {
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
