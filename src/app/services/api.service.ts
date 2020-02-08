import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getPosts(categories: number): Observable<Post[]> {
    const params = categories !== null ? '&categories=' + categories : '';
    return this.httpClient.get(environment.config.api + 'posts/?_embed&per_page=100' + params)
      .pipe(map((response: any) => {
        const stories = response;
        return stories.map((story: any) => {
          return this.createPost(story);
        });
      }));
  }

  private createPost(story: any): Post {
    let imgMedium = '';
    if (story._embedded['wp:featuredmedia'] !== (null || undefined)) {
      imgMedium = story._embedded['wp:featuredmedia']['0'].source_url;
    }
    return {
      id: story.id,
      title: story.title,
      content: story.content,
      imgMedium
    } as Post;
  }
}
