import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-file-loading',
  templateUrl: './file-loading.component.html',
  styleUrls: ['./file-loading.component.scss']
})
export class FileLoadingComponent implements OnInit {

  @Input() accept: string = '';
  @Input() text: string = 'button';
  @Input() loading: boolean = false;
  @Output() change = new EventEmitter<FileList>();

  constructor() { }

  ngOnInit() {
  }

  onChange(files: FileList) {
    this.change.emit(files);
  }
}
