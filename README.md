# ApiYa
Para hacerlo funcionar se debe instalar primero los "node_modules", esto se hace en la terminal a través del comando **npm install i**
Despues de esto, se hace la instalacion de angular, esto a través del comando **npm install -g @angular/cli** y listo, ahora se podra iniciar la app movil a través de "ionic serve".

## Hacerlo funcionar a través de linux:

Primero se debe instalar node, esto se hace a través del siguiente link si la distro es basada en Ubuntu (tomese como ejemplo, POP-OS):
```
https://github.com/nodesource/distributions#installation-instructions
```
Se instalaran las dependencias y al momento de finalizar, se debe comprobar las versiones instaladas en la terminal de la siguiente manera:
```
node -v
npm -v
```
Esto arrojara las versiones instaladas.

#Importante, en caso de error

Al momento de realizar estos comandos, me encontre que en POP-OS se instala una version de node.js incompatible con la versión de npm, para poder solucionar esto, tuve que desinstalar node con el siguiente comando:
```
sudo uninstall npm
```
Luego, debes descargar node.js en archivo tar.xz desde la pagina oficial https://nodejs.org/en/download, se elije la version de linux x64 bits.
Con el archivo descargado, se debe descomprimir, se debe abrir la terminal de linux en la carpeta de descargas (o en donde hayas guardado el node), esto se hace con click derecho -> abrir terminal.
se coloca el siguiente comando:
```
sudo tar -xvf node-v18.17.1-linux-x64.tar.xz
```
recuerda reemplazar el nombre y la versión de node con el archivo que hayas descargado.
Ahora se tipea el siguiente comando:
```
sudo cp -r nombre_directorio/{bin,include,lib,share} /usr/
```
recuerda reemplazar el "nombre_directorio", con el nombre de la carpeta node descargada.
Por ultimo, se escribe el siguiente comando:
```
export PATH=/usr/node-v16.18.0-linux-x64/bin:PATH
```
Reemplazas el nombre del node con tu version y listo, el error deberia estar funcionando, la version de node deberia ser compatible con tu version de NPM, simplemente quedaria revisar la versión del npm con el comando:
```
npm -v
```
Ahora podrias instalar la carpeta node_modules y las demas dependencias correctamente para hacer funcionar el programa.

                                                                                                                                            
