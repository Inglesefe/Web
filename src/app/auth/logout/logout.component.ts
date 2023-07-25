import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

  /**
   * Inicializa los servicios del componente
   * @param router Servicio de ruteo
   */
  constructor(private router: Router) {
  }

  /**
   * Cierra sesión del usuario logueado
   */
  ngOnInit() {
    sessionStorage.removeItem("golden-token");
    this.router.navigate(["/login"]);
  }
}
