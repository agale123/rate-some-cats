import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

export interface Photo {
    id: string;
    url: string;
    score: number;
}

@Injectable({
    providedIn: 'root'
})
export class PhotoService {

    constructor() { }

    getPhotos(): Observable<Photo[]> {
        // TODO: Fetch list of photos, images, and scores.
        const a = {
            id: '123',
            url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
            score: 4.6,
        };

        const b = {
            id: '456',
            url: 'https://www.petsfriendsunnyvale.com/storage/app/media/bigstock-British-Longhair-Cat--Months-10206431.jpg',
            score: 3.5,
        };

        return of([a, b]);
    }

    scorePhoto(photo: Photo, score: number) {
        console.log(`Photo ${photo.id} has score ${score}`);
        // TODO: Write rating to database.
    }
}
