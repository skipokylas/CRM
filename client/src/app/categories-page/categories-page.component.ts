import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../shared/services/category.service';
import { Observable } from 'rxjs';
import { ICategory } from '../shared/interfaces';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit {
  $categories: Observable<ICategory[]>;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.$categories = this.categoryService.fetch();
  }
}
