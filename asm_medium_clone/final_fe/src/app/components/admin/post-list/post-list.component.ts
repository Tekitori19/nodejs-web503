import { Component, OnInit } from '@angular/core';
import { Post } from '../../../models/post';
import { PostService } from '../../../services/post.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    imports: [CommonModule, RouterModule]
})
export class PostListComponent implements OnInit {
    posts: Post[] = [];

    constructor(private postService: PostService) { }

    ngOnInit() {
        this.postService.getPosts().subscribe(posts => {
            this.posts = posts;
        });
    }

    deletePost(id: number | undefined) {
        if (id) {
            if (confirm('Are you sure you want to delete this post?')) {
                this.postService.deletePost(id);
            }
        }
    }
}
