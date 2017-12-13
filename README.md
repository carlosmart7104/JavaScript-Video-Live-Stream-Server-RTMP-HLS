# JavaScript Video LiveStream Server with RTMP and HLS

Transmisiones de video en vivo vía web por HLS (estilo facebook live, youtube live, twitch, etc.) compatible con Open Broadcaster, Wirecast y otros clientes de transmisión rtmp.

** Requiere NodeJS instalado **

```
// Usa los siguientes comandos para probar el ejemplo

// Clona el repositorio con git
git clone https://github.com/carlosmart7104/JavaScript-Video-Live-Stream-Server-RTMP-HLS.git rtmp-hls-server

// Desplazate a la carpeta del proyecto (rtmp-hls-server)
cd rtmp-hls-server

// Instala los paquetes con npm
npm install
```

- Inicia el servidor
```
npm start
```

- Conecta tu cliente rtmp a la dirección http://localhost:1935/channel y usa la clave "keyword" (sin comillas)

- Inicia la transmisión desde tu cliente

- Abre tu navegador en la dirección http://localhost:8000/ y visualiza la transmisión

### LICENSE
Este código está bajo licencia Apache 2.0

Created By: carlosmart7104
