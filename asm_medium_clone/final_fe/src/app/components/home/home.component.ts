import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    imports: [FormsModule, RouterModule, CommonModule],
})
export class HomeComponent implements OnInit {
    posts: Post[] = [];
    searchTerm: string = '';
    selectedCategory: string = '';
    categories: string[] = ['Technology', 'Lifestyle', 'Travel', 'Food'];

    constructor(private postService: PostService) { }

    ngOnInit() {
        this.postService.getPosts().subscribe(posts => {
            this.posts = posts;
        });
    }

    search() {
        this.posts = this.postService.searchPosts(this.searchTerm, this.selectedCategory);
    }
}
