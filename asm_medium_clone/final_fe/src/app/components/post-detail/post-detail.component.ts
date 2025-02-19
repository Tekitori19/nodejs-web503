import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-post-detail',
    templateUrl: './post-detail.component.html',
    imports: [CommonModule]
})
export class PostDetailComponent implements OnInit {
    post?: Post;

    constructor(
        private route: ActivatedRoute,
        private postService: PostService
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.post = this.postService.getPostById(Number(id));
        }
    }
}
