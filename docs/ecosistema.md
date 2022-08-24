# Ecosistema

El ecosistema software es el sistema de tecnologías integradas manualmente cuyo fin es soportar el ciclo de vida del software: gestión, requisitos, análisis, diseño, construcción, pruebas y despliegue. A los elementos del sistema también se les llama herramientas CASE.

Nuestro ecosistema es el siguiente:

```plantuml:md-ecosistema
@startwbs
* Ecosistema
** Control de versiones
*** Git
*** GitHub
** Pruebas unitarias
*** Jest
** Modelado
*** PlantUML
** Capa de presentación
*** JavaScript
**** React
***** ReactAdmin
** Capa de negocio/dominio
*** JavaScript
**** NodeJS
***** Express?
***** GraphQL?
***** Moongose?
** Capa de datos
*** Excel (.xlx)
*** MongoDB
** Documentación
*** Referente a gestión
**** Notion
*** Referente al desarrollo
**** GitHub, Markdown
** Vista de Despliegue
*** Continua integracion/despliegue
**** GitHub Action
*** Servidor de producción
**** A?
*** Desarrollo local
**** B?
@endwbs
```

![](./md-ecosistema.svg)
