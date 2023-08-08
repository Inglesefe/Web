import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { EditorModule } from '@tinymce/tinymce-angular';

import { TemplatesComponent } from './templates/templates.component';
import { EditTemplateComponent } from './edit-template/edit-template.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { EditNotificationComponent } from './edit-notification/edit-notification.component';


@NgModule({
  declarations: [
    TemplatesComponent,
    EditTemplateComponent,
    NotificationsComponent,
    EditNotificationComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    EditorModule
  ]
})
export class NotiModule { }
