import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/shared/interfaces';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.scss']
})
export class OrderCategoriesComponent implements OnInit {
  $categories: Observable<ICategory[]>;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.$categories = this.categoryService.fetch();
  }
}
