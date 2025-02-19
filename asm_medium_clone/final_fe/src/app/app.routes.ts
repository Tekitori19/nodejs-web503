import { Routes } from '@angular/router';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { PostFormComponent } from './components/admin/post-form/post-form.component';
import { PostListComponent } from './components/admin/post-list/post-list.component';
import { HomeComponent } from './components/home/home.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'post/:id', component: PostDetailComponent },
    { path: 'admin', component: DashboardComponent },
    { path: 'admin/posts', component: PostListComponent },
    { path: 'admin/post/new', component: PostFormComponent },
    { path: 'admin/post/edit/:id', component: PostFormComponent }
];
