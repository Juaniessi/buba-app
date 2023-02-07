# Single page aplication para crear informes de archivos .txt devueltos por equipos de Revisión técnica Obligatoria

## Tecnologías aplicadas: React.js y JavaScript

### Modo de uso

1. Seleccionar el tipo de vehículo.
2. Cargar un archivo ".txt" devuelto por el equipo.
3. Cargar la foto del vehículo.
4. Seleccionar el estado de aptitud del vehículo.
5. Si corresponde, varíe el período de vigencia.
6. Proceder con la carga manual de la descripción de los defectos encontrados.
   1. Para ello seleccione la severidad del problema (Leve por defecto)
   2. Luego el grupo, la sección y la descripción.
      - Si el problema en cuestión no se encuentra listado seleccione "Otros" en la descripción y complete dentro del campo "Defecto no listado" con el texto personalizado que desee.
   3. Para finalizar presione el botón de "Agregar a la lista".
7. Repita el paso 6 y sus incisos hasta haber terminado de cargar todas las descripciones.
8. Cuando haya terminado, si desea imprimir el archivo, puede hacerlo tocando el botón "Imprimir Informe" en la esquina superior derecha. Para guardarlo como PDF Repita este paso, pero seleccione una impresora de PDF.

9. Para comenzar con un vehículo nuevo, tiene dos caminos
   1. puede o bien "Reiniciar todos los campos". Esto se puede hacer con el botón rojo grande destinado a tal fin, que se encuentra arriba a la derecha.
   2. Puede simplemente cargar un archivo .txt nuevo y una foto nueva asegurándose que ambos pertenezcan a otro vehículo (si lo que quiere es cargar una versión actualizada de alguno de los dos archivos, primero debe ejecutar el paso de "Reiniciar todos los campos")

### Modo de testeo

Para poder probar el funcionamiento del sistema, usted pude descargar los archivos adjuntos en el proyecto, que han sido formateados y cuya información no representa el estado real de ningún vehículo. Todos datos en dichos archivos han sido alterados para resguardar la identidad de las personas y sus vehículos.

[Los archivos para probar Automóviles se encuentran aquí](src/assets/examples/Automovil)

[Los archivos para probar Motocicletas se encuentran aquí](src/assets/examples/Moto)

Simplemente descargue estos archivos y búsquelos en su computadora haciendo primero clic en el botón del paso 2 del apartado "Modo de uso".

Adicionalmente usted pude editar estos archivos para verificar el comportamiento del sistema.

> Como el sistema utiliza la función "onChange" para verificar el archivo .txt si usted decide cambiar los valores dentro de un archivo, guardarlo y volver a seleccionar el mismo, si no cambia el nombre de archivo el sistema no se refrescará. Motivo por el cual usted debe primero "Reiniciar todos los campos". Esto se puede hacer con el botón rojo grande destinado a tal fin, que se encuentra arriba a la derecha.

> Si decide cambiar entre vehículo de 4 ruedas y Motocicleta luego de haber analizado el archivo .txt puede que no se renderice adecuadamente. Idealmente primero debe "Reiniciar todos los campos"

> Tenga en cuenta que si decide probar un archivo destinado a una Motocicleta en el formato para un automóvil puede que el resultado no sea el esperado. Lo mismo pasará en el caso contrario.
