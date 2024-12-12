import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function primeraLetraMayuscula(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const valor = <string>control.value;

        if (!valor) return null;
        if (valor.length === 0) return null;

        const primeraLetra = valor[0];

        if (primeraLetra !== primeraLetra.toUpperCase()){
            return {
                primeraLetraMayuscula: {
                    mensaje: 'La primera letra debe ser mayúscula'
                }
            }
        }

        return null;
    }
}

export function obtenerGenero(genero: string): string {
    // Verifica si la primera letra es 'f' o 'F'
    return genero.charAt(0).toLowerCase() === 'f' ? "Femenino" : "Masculino";
}


export function fechaNoPuedeSerFutura(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const fechaEscogidaPorElUsuario = new Date(control.value);
        const hoy = new Date();

        if (fechaEscogidaPorElUsuario > hoy){
            return {
                futuro: {
                    mensaje: 'La fecha no puede ser del futuro'
                }
            }
        }

        return null;
    }
}