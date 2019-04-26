import { AuthService } from './auth.service';
import { map, switchMap, shareReplay } from 'rxjs/operators';
import { Observable, of, combineLatest } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';

export interface Count {
    count: number;
}

export interface Photo {
    id: string;
    url: string;
    score: number;
}

@Injectable({
    providedIn: 'root'
})
export class PhotoService {

    readonly photos: Observable<Photo[]>;

    constructor(private readonly database: AngularFirestore,
        private readonly storage: AngularFireStorage,
        private readonly authService: AuthService) {
            this.photos =  this.database.collection<Count>('/photos')
                .valueChanges()
                .pipe(
                    map(entry => Array.from(Array(entry[0].count).keys())),
                    switchMap(ids => {
                        const observables = ids.map(id => {
                            const ref = this.storage.ref(`${id}.png`);
                            const scoreObs = this.database.collection<Photo>('/scores', ref => ref.where('photo', '==', `${id}`))
                                .valueChanges()
                                .pipe(map(result => {
                                    if (result.length === 0) {
                                        return 0;
                                    } else {
                                        return result.reduce((acc, cur) => acc + cur.score, 0) / result.length;
                                    }
                                }))

                            return combineLatest(ref.getDownloadURL(), scoreObs)
                                .pipe(map(([url, score]) => {
                                    return {
                                        url,
                                        id: `${id}`,
                                        score,
                                    };
                                }));
                        });
                        return combineLatest(...observables);
                    }),
                    map(photos => {
                        return photos.sort((a, b) => (a.score > b.score) ? -1 : ((b.score > a.score) ? 1 : 0));
                    }),
                    shareReplay(1),
                );
    }

    getPhotos(): Observable<Photo[]> {
        return this.photos;
    }

    getPhotoScore(photoId: string) {
        return this.authService.user.pipe(switchMap(user => {
            if (!user) {
                return of(undefined);
            }
            return this.database.collection<Photo>('/scores', ref => ref.where('user', '==', user.uid)
                .where('photo', '==', photoId))
                .get().pipe(map(result => {
                    if (result.size >= 1) {
                        return result.docs[0].data().score;
                    } else {
                        return undefined;
                    }
                }));
        }));
    }

    scorePhoto(photo: Photo, score: number) {
        const user = this.authService.getCurrentUser();
        if (!user) {
            if (confirm('Please login to rate photos.')) {
                // Prompt for login.
                this.authService.signIn();
            }
            return false;
        }
        const matchExisting = ref => {
            return ref.where('user', '==', user.uid)
                .where('photo', '==', photo.id)
        };
        this.database.collection('/scores', matchExisting)
            .get().subscribe(existingScores => {
                if (existingScores.size >= 1) {
                    // Update previous score.
                    this.database.doc(existingScores.docs[0].ref)
                        .update({ score });
                } else if (user) {
                    // Write new score.
                    this.database.collection('/scores').add({
                        photo: photo.id,
                        score,
                        user: user.uid,
                    });
                }
            });
        return true;
    }
}
