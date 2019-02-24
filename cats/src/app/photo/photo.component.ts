import { Photo, PhotoService } from './../photo.service';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-photo',
    templateUrl: './photo.component.html',
    styleUrls: ['./photo.component.scss']
})
export class PhotoComponent {

    readonly stars = [1, 2, 3, 4, 5];

    score: number|undefined;

    @Input() photo: Photo;

    constructor(private readonly photoService: PhotoService) { }

    getStarFill(index: number) {
        if (index <= this.score) {
            return 'star';
        }
        return 'star_border';
    }

    scorePhoto(index: number) {
        this.score = index;
        this.photoService.scorePhoto(this.photo, this.score);
    }
}
