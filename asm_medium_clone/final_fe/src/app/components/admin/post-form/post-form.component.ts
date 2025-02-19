import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Post } from '../../../models/post';
import { PostService } from '../../../services/post.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-post-form',
    templateUrl: './post-form.component.html',
    imports: [CommonModule, RouterModule, FormsModule]
})
export class PostFormComponent implements OnInit {
    post: Post = {
        title: '',
        content: '',
        category: '',
        createdAt: new Date(),
        author: 'DwcksDinh'
    };
    isEditing = false;
    categories: string[] = ['Technology', 'Lifestyle', 'Travel', 'Food'];

    constructor(
        private postService: PostService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEditing = true;
            const existingPost = this.postService.getPostById(Number(id));
            if (existingPost) {
                this.post = { ...existingPost };
            }
        }
    }

    onSubmit() {
        if (this.isEditing) {
            this.postService.updatePost(this.post);
        } else {
            this.postService.addPost(this.post);
        }
        this.router.navigate(['/admin/posts']);
    }
}
