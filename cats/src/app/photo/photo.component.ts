import { Photo, PhotoService } from './../photo.service';
import { Component, Input, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-photo',
    templateUrl: './photo.component.html',
    styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements AfterViewInit {

    readonly stars = [1, 2, 3, 4, 5];

    score: number|undefined;

    @Input() photo: Photo;

    constructor(private readonly photoService: PhotoService) { 
     }

     ngAfterViewInit() {
        this.photoService.getPhotoScore(this.photo.id).subscribe(score => {
            this.score = score;
        });
     }

    getStarFill(index: number) {
        if (index <= this.score) {
            return 'star';
        }
        return 'star_border';
    }

    scorePhoto(index: number) {
        if (this.photoService.scorePhoto(this.photo, index)) {
            this.score = index;
        }
    }
}
