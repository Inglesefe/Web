import { Component } from '@angular/core';
import { Application } from '../entities/Application';

const ELEMENT_DATA: Application[] = [
  { id: 1, name: 'Autenticación' },
  { id: 2, name: 'Otra cosa' }
];

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent {
  displayedColumns: string[] = ['id', 'name'];
  dataSource = ELEMENT_DATA;
}
