import { FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

/**
 * Formulario base
 */
export abstract class FormBase {

  /**
   * Formulario reactivo
   */
  protected _form: FormGroup;

  /**
   * Si se está cargando o procesando el formulario
   */
  protected loading: boolean;

  /**
   * Snackbar para notificar el resultado del procesamiento del formulario
   */
  protected _snackBar: MatSnackBar;

  /**
   * Ruteador de la aplicación
   */
  protected _router: Router;

  protected _pathParent: string;

  /**
   * Inicializa los atributos del formulario
   * @param form Formulario reactivo a procesar
   * @param snackBar Notificador de mensajes
   * @param router Ruteador de salida del componente
   * @param pathParent Ruta a la que se retorna desde el formulario actual
   */
  protected constructor(form: FormGroup, snackBar: MatSnackBar, router: Router, pathParent: string) {
    this._form = form;
    this._snackBar = snackBar;
    this._router = router;
    this._pathParent = pathParent;
    this.loading = false;
  }

  /**
   * Retorna una cadena de texto con el error que debe mostar el campo de formulario
   * @param control Control a validar
   * @returns Cadena de texto con el error
   */
  protected getError(control: string): string {
    let ctrl = this._form.get(control);
    if (ctrl!.errors && ctrl!.hasError('required')) {
      return "El campo no puede estar vacío"
    }
    if (ctrl!.errors && ctrl!.hasError('email')) {
      return "El campo debe ser un email válido"
    }
    if (ctrl!.errors && ctrl!.hasError('minlength')) {
      return "El campo debe ser mínimo de " + ctrl!.errors["minlength"].requiredLength + " caracteres"
    }
    if (ctrl!.errors && ctrl!.hasError('maxlength')) {
      return "El campo debe ser máximo de " + ctrl!.errors["maxlength"].requiredLength + " caracteres"
    }
    console.log(ctrl!.errors);
    return "";
  }

  /**
   * Retorna al listado de aplicaciones
   */
  back() {
    this._router.navigate(["/home/" + this._pathParent]);
  }

  /**
   * Debe implementar el método submit para procesar el formulario
   */
  protected abstract submit() : void;
}
