import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanService } from '../../services/plan.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBase } from '../FormBase';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

/**
 * Formulario de inserción y edición de planes
 */
@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html'
})
export class EditPlanComponent extends FormBase {
  title: string = "";

  /**
   * Inicializa el componente
   * @param route Enrutador de entrada al componente
   * @param router Enrutador de salida del componente
   * @param planService Servicio para procesar la información
   * @param _snackBar Notificador de mensajes
   */
  constructor(private route: ActivatedRoute, router: Router, private planService: PlanService, snackBar: MatSnackBar) {
    super(new FormGroup({
      id: new FormControl('', [Validators.required, Validators.min(0)]),
      value: new FormControl('', [Validators.required, Validators.min(0)]),
      initialFee: new FormControl('', [Validators.required, Validators.min(0)]),
      installmentsNumber: new FormControl('', [Validators.required, Validators.min(0)]),
      installmentValue: new FormControl('', [Validators.required, Validators.min(0)]),
      active: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    }), snackBar, router, 'plans')
    if (parseInt(route.snapshot.params["id"]) === 0) {
      this.title = "Insertar nuevo parámetro";
      this._form.setValue({ id: 0, value: 0, initialFee: 0, installmentsNumber: 0, installmentValue: 0, active: 'false', description: '' });
    }
    else {
      this.loading = true;
      planService.read(parseInt(route.snapshot.params["id"]))
        .then(x => {
          this.title = "Editar plan: " + x.description;
          this._form.setValue({
            id: x.id,
            value: x.value,
            initialFee: x.initialFee,
            installmentsNumber: x.installmentsNumber,
            installmentValue: x.installmentValue,
            active: x.active ? "true" : "false",
            description: x.description
          });
          this.loading = false;
        })
        .catch(r => {
          if (r.status === 403) {
            this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
          } else {
            this._snackBar.open("Hubo un error al consultar el plan", "Cerrar", { duration: 2000 });
          }
          this.loading = false;
        });
    }
  }

  /**
   * Inserta o actualiza el plan
   */
  submit() {
    if (this._form.get('id')!.value === 0) {//Insertar
      this.loading = true;
      this.planService.insert({
        id: this._form.get('id')!.value,
        value: parseFloat(this._form.get('value')!.value),
        initialFee: parseFloat(this._form.get('initialFee')!.value),
        installmentsNumber: parseInt(this._form.get('installmentsNumber')!.value),
        installmentValue: parseFloat(this._form.get('installmentValue')!.value),
        active: this._form.get('active')!.value == "true",
        description: this._form.get('description')!.value
      })
        .then(x => {
          lastValueFrom(this._snackBar.open("Plan insertado correctamente", "Cerrar", { duration: 2000 }).afterDismissed())
            .then(() => { this.loading = false; this._router.navigate(["/home/" + this._pathParent]) });
        })
        .catch(r => {
          if (r.status === 403) {
            this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
          } else {
            this._snackBar.open("Hubo un error al insertar el plan", "Cerrar", { duration: 2000 });
          }
          this.loading = false;
        });
    } else {//Actualizar
      this.loading = true;
      this.planService.update({
        id: this._form.get('id')!.value,
        value: parseFloat(this._form.get('value')!.value),
        initialFee: parseFloat(this._form.get('initialFee')!.value),
        installmentsNumber: parseInt(this._form.get('installmentsNumber')!.value),
        installmentValue: parseFloat(this._form.get('installmentValue')!.value),
        active: this._form.get('active')!.value == "true",
        description: this._form.get('description')!.value
      })
        .then(x => {
          lastValueFrom(this._snackBar.open("Plan actualizado correctamente", "Cerrar", { duration: 2000 }).afterDismissed())
            .then(() => { this.loading = false; this._router.navigate(["/home/" + this._pathParent]) });
        })
        .catch(r => {
          if (r.status === 403) {
            this._snackBar.open("El usuario no tiene permisos para realizar esta acción", "Cerrar", { duration: 2000 })
          } else {
            this._snackBar.open("Hubo un error al actualizar el plan", "Cerrar", { duration: 2000 });
          }
          this.loading = false;
        });
    }
  }
}
