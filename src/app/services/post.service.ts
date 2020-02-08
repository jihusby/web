import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Post } from '../models/post';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getSuccessStories(): Observable<Post[]> {
    return this.getPostsByCategory('40');
  }

  getProfiledSuccessStories(): Observable<Post[]> {
    return this.getPostsByCategory('41');
  }

  getConsultants(): Observable<Post[]> {
    return this.getPostsByCategory('3');
  }

  getNumbers(): Observable<Post[]> {
    return this.getPostsByCategory('4');
  }

  getCareerText(): Observable<Post[]> {
    return this.getPostsByCategory('6');
  }

  getInitialPosts() {
    this.getPostsByCategory(null);
  }

  getPostsByCategory(categories: string): Observable<Post[]> {
    const httpParams = new HttpParams()
        .set('categories', categories);
    return this.http.get<Post[]>(environment.config.api + 'posts', {
        params: httpParams
    });
  }
}
