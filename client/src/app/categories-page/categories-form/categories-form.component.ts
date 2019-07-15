import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/shared/services/category.service';
import { switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { MaterialService } from 'src/app/shared/helpers/materialize.service';
import { ICategory } from 'src/app/shared/interfaces';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {
  @ViewChild('inputFile', { static: true }) inputFileRef: ElementRef;

  form: FormGroup;
  image: File;
  imagePreview = '';
  category: ICategory | null = null;

  constructor(private route: ActivatedRoute, private categoryService: CategoryService) {}

  ngOnInit() {
    this.initForm();
    this.subscribeOnData();
  }

  initForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required])
    });
  }

  subscribeOnData() {
    this.form.disable();
    this.route.params
      .pipe(switchMap((params: Params) => (params['id'] ? this.categoryService.getById(params['id']) : of(null))))
      .subscribe(
        (category: ICategory | null) => this.initCategoryInfo(category),
        (error: HttpErrorResponse) => MaterialService.toast(error.error.message)
      );
  }

  initCategoryInfo(category: ICategory | null): void {
    if (category) {
      this.category = category;
      this.form.patchValue({ name: category.name });
      this.imagePreview = category.imageSrc;
      MaterialService.UpdateTextInputs();
    }
    this.form.enable();
  }

  triggerClick(): void {
    this.inputFileRef.nativeElement.click();
  }

  onFileSelect(e: Event) {
    this.image = (e.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => (this.imagePreview = reader.result as string);
    reader.readAsDataURL(this.image);
  }

  onSubmit(): void {
    this.form.disable();
    const $categoryObs: Observable<ICategory> = this.category
      ? this.categoryService.update(this.category._id, this.form.value.name, this.image)
      : this.categoryService.create(this.form.value.name, this.image);

    $categoryObs.subscribe(
      (category: ICategory) => {
        MaterialService.toast('Success');
        this.form.enable();
        this.category = category;
      },
      (error: HttpErrorResponse) => {
        MaterialService.toast(error.error.message);
        this.form.enable();
      }
    );
  }
}
