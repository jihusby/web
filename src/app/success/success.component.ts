import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../models/post';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-success-component',
  templateUrl: './success.component.html'
})
export class SuccessComponent implements OnInit, OnDestroy {

  successStoryRows = [];

  closeResult: string;

  private subscription: Subscription = new Subscription();
  successStories: Post[];

  constructor(
    private service: PostService) {}

  ngOnInit() {

    this.subscription.add(this.service.getSuccessStories().subscribe(stories => {
      let successStoryRow = [];
      let i = 0;
      this.successStories = stories;
      for (const story of stories) {
        i++;
        successStoryRow.push(story);
        if (i % 4 === 0) {
          this.successStoryRows.push(successStoryRow);
          successStoryRow = [];
        }
      }
    }));

  }

  getImgPath(title: string): string {
    return './assets/img/' + title.replace(' ', '').toLowerCase();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}


