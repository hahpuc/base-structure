import { NgModule } from '@angular/core';

import { SharedModule } from '@/app/shared/shared.module';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { CategoryCreateEditComponent } from './create-edit/category-create-edit.component';

@NgModule({
  declarations: [CategoryComponent, CategoryCreateEditComponent],
  imports: [SharedModule, CategoryRoutingModule],
})
export class CategoryModule {}
