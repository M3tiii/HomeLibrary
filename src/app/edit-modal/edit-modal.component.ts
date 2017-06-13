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
  @ViewChild(ModalDirective) childModal;

  private book = {
    title: '',
    publisher: '',
    author: '',
    note: '',
    imgSmall: '',
    imgMedium: ''
  };

  constructor() { }

  public set(book) {
    console.log(book);
    this.book.imgSmall = book.volumeInfo.imageLinks.small
    this.book.imgMedium = book.volumeInfo.imageLinks.medium
    this.book.title = book.volumeInfo.title;
    this.book.publisher = book.volumeInfo.publisher;
    this.book.author = book.volumeInfo.authors[0];
    this.book.note = '';
    // console.log(this.book, book);
    this.showChildModal();
  }

  private submitEdit(ev) {
    this.saveEditedBookEmitter.emit(this.book);
    this.hideChildModal();
  }

  ngOnInit() {
    // console.log(this.book);
  }

  public showChildModal(): void {
    this.childModal.show();
  }

  public hideChildModal(): void {
    this.childModal.hide();
  }

}
