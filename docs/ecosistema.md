# Ecosistema

El ecosistema software es el sistema de tecnologías integradas manualmente cuyo fin es soportar el ciclo de vida del software: gestión, requisitos, análisis, diseño, construcción, pruebas y despliegue. A los elementos del sistema también se les llama herramientas CASE.

Nuestro ecosistema es el siguiente:

```plantuml:md-ecosistema
@startwbs
@startwbs
* Ecosistema
** Control de versiones
*** Git
*** GitHub
** Pruebas unitarias
*** Jest
** Modelado
*** MermaidJS (por defecto en notion).
*** PlantUML (cuando MermaidJS no permita modelar, usamos este).
** Capa de presentación
*** JavaScript
**** React
** Capa de negocio/dominio
*** Tipo y características
**** Servicio web
**** JSON
**** API REST
*** Pruebas manuales del servicio web
**** Postman
*** Tecnologías
**** JavaScript,TypeScript,NodeJS
***** Express
***** Moongose
** Capa de datos
*** Excel (.xlx)
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
**** Mexicali?
*** Desarrollo de preproducción
**** Computadora proporcionada por la profesora Judith
@endwbs

```

![](./md-ecosistema.svg)

Consideraciones
* ¿Por qué seleccionamos un ecosistema JS? Permite un rápido desarrollo, no necesitamos más poder computacional. 
