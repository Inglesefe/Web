# Web

- dev: [![dev](https://github.com/Inglesefe/Web/actions/workflows/build.yml/badge.svg?branch=dev)](https://github.com/Inglesefe/Web/actions/workflows/build.yml)  
- test: [![test](https://github.com/Inglesefe/Web/actions/workflows/build.yml/badge.svg?branch=test)](https://github.com/Inglesefe/Web/actions/workflows/build.yml)  
- main: [![main](https://github.com/Inglesefe/Web/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/Inglesefe/Web/actions/workflows/build.yml)

Aplicación Web del sistema Golden

## Guía de inicio

Estas instrucciones le darán una copia del proyecto funcionando en su máquina local con fines de desarrollo y prueba.
Consulte implementación para obtener notas sobre la implementación del proyecto en un sistema en vivo.

### Prerequisitos

Este proyecto está desarrollado en Angular 14, y hace referencia a las distintas API's

## Pruebas

Para ejecutar las pruebas unitarias, es necesario tener instalado MySQL en el ambiente y ejecutar el script db-test.sql que se encuentra en el proyecto de pruebas.
La conexión se realiza por defecto con el usuario root y el password root, si necesita cambiarlos debe realizarlo en el archivo appsettings.json del proyecto de pruebas.

## Despliegue

El proyecto se despliega como un contenedor en linux en el repositorio [Contenedores de GitHub](https://github.com/Inglesefe/Web/pkgs/nuget/web)