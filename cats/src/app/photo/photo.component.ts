import { Photo } from './../photo.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-photo',
    templateUrl: './photo.component.html',
    styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {

    @Input() photo: Photo;

    constructor() { }

    ngOnInit() {
    }

}
