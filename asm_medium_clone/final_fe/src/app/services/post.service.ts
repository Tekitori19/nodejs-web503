import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private posts: Post[] = [];
    private postsSubject = new BehaviorSubject<Post[]>([]);

    constructor() {
        // Mock data
        this.posts = [
            {
                id: 1,
                title: 'First Post',
                content: 'This is the first post content',
                category: 'Technology',
                createdAt: new Date(),
                author: 'DwcksDinh'
            }
        ];
        this.updatePosts();
    }

    private updatePosts() {
        this.postsSubject.next([...this.posts]);
    }

    getPosts(): Observable<Post[]> {
        return this.postsSubject.asObservable();
    }

    getPostById(id: number): Post | undefined {
        return this.posts.find(post => post.id === id);
    }

    addPost(post: Post) {
        post.id = this.posts.length + 1;
        post.createdAt = new Date();
        this.posts.push(post);
        this.updatePosts();
    }

    updatePost(post: Post) {
        const index = this.posts.findIndex(p => p.id === post.id);
        if (index !== -1) {
            this.posts[index] = post;
            this.updatePosts();
        }
    }

    deletePost(id: number) {
        this.posts = this.posts.filter(post => post.id !== id);
        this.updatePosts();
    }

    searchPosts(term: string, category?: string): Post[] {
        return this.posts.filter(post => {
            const matchesTerm = post.title.toLowerCase().includes(term.toLowerCase());
            const matchesCategory = !category || post.category === category;
            return matchesTerm && matchesCategory;
        });
    }
}
