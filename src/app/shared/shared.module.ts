import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HeadingComponent } from './heading/heading.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, HeadingComponent],
  imports: [CommonModule, AngularMaterialModule],
  exports: [HeaderComponent, FooterComponent, HeadingComponent],
})
export class SharedModule {}
