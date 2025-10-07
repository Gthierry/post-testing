import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { PostList } from '../components/Pages/post-list/post-list';
import { PostDetails } from '../components/Pages/post-details/post-details';
import { PostUpdate } from '../components/Pages/post-update/post-update';
import { PostAdd } from '../components/Pages/post-add/post-add';

export const routes: Routes = [
  { path: '', component: PostList },
  { path: 'post-detail/:id', component: PostDetails },
  { path: 'post-update/:id', component: PostUpdate },
  { path: 'post-add', component: PostAdd },
];
