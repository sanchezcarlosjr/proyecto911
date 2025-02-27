# Ecosistema

El ecosistema software es el sistema de tecnologías integradas manualmente cuyo fin es soportar el ciclo de vida del software: gestión, requisitos, análisis, diseño, construcción, pruebas y despliegue. A los elementos del sistema también se les llama herramientas CASE.

Nuestro ecosistema es el siguiente:

```plantuml:md-ecosistema
@startwbs
* Ecosistema
** Proceso de desarrollo de software
*** RUP.
*** Minutas en Google Docs.
*** Cada correo debe pasar por la profesora Judith. 
** Control de versiones
*** Git
*** GitHub
** Pruebas
*** Pruebas unitarias
**** Jest
*** Pruebas de integración
**** Cypress. Usamos el servidor de preproducción.
** Modelado
*** MermaidJS (por defecto en notion).
*** PlantUML (cuando MermaidJS no permita modelar, usamos este).
** Capa de presentación
*** TypeScript-NPM-Node
**** ReactAdmin
** Interfaces de comunicación
*** Servicio web
*** JSON
*** API REST
*** Pruebas manuales
**** Postman
** Capa de negocio/dominio 
*** Tecnologías
**** JavaScript,TypeScript,NodeJS
***** NextJS
***** Moongose
** Capa de datos
*** Excel (.csv)
*** MongoDB
*** API Cimarrón
** Documentación
*** Referente a gestión
**** Notion
*** Referente al desarrollo
**** GitHub, Markdown
** Vista de Despliegue
*** Continua integracion/despliegue
**** GitHub Action
*** Servidor de producción
**** Coordinación en Mexicali.
*** Desarrollo de preproducción
**** Computadora proporcionada por la profesora Judith
@endwbs
```

![](./md-ecosistema.svg)

Consideraciones
* ¿Por qué seleccionamos un ecosistema JS? Permite un rápido desarrollo, no necesitamos más poder computacional. 
