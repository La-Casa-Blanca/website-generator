Cómo generar La-Casa-Blanca.org
----------------------------------
[README English](/README.md).

Clonar el repositorio de páginas de GH: https://github.com/La-Casa-Blanca/La-Casa-Blanca.github.io

Establezca la ruta del proyecto en su ENV:

    export CASABLANCA_STATIC_PATH="$HOME/La-Casa-Blanca.github.io"

Chrome
-----
Requiere un navegador Chrome con la extensión [Save Page WE](https://chromewebstore.google.com/detail/save-page-we/dhhpefjklgkmgeafimnjhojgjamoafof?hl=es) instalada en el perfil predeterminado. Establezca la ruta de descarga del archivo en una cadena fija en Opciones > Información del archivo, como "save_page.html".

Establezca la ruta de la página de guardado de cadena fija desde ^ en su ENV:

    export CASABLANCA_DLOAD_PATH="$HOME/Descargas/guardar_pagina.html"

Node
----
Este proyecto se ha probado con Node v23.4.0 y requiere Puppeteer. Clone este repositorio, cambia al directorio del proyecto e instale las dependencias con:

    npm install

xdotool
-------
Esto se utiliza para escribir en el teclado y activar la traducción de la página y guardarla. Es necesario porque Puppetteer no puede interactuar con el menú contextual ni enviar teclas para activar los accesos directos de la extensión. Instale xdotool para que esté disponible en su PATH.

Otro
-----
También requiere jq, perl y un shell compatible con POSIX.

Uso
-----
En un shell, cambia al directorio del proyecto. Asegúrese de que Chrome se esté ejecutando con su perfil predeterminado conectado. Con los valores ENV anteriores configurados y las dependencias instaladas, escriba:

    ./run.sh

Licencia
-------
Licencia MIT (ver archivo LICENSE para más detalles).

Copyright (c) 2025 La Casa Blanca
