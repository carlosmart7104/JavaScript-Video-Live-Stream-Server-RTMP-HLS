const express = require('express');
const ejs     = require('ejs');
const RtmpServer = require('rtmp-server');
const ffmpeg = require('fluent-ffmpeg');
const HLSServer = require('hls-server');

const server = express();

const hls = new HLSServer(server, {
  path: '/live',
  dir: 'streams'
});

const rtmpServer = new RtmpServer();

server.set('view engine', 'ejs');
server.use('/live', express.static(__dirname + '/streams'));

server.get('/', (req, res) => {
  res.render('index');
});

server.get('*', (req,res) => {
  console.log("GET /*");
});

var ffmpegStream = new ffmpeg({ source: 'rtmp://localhost:1935/channel/keyword', nolog: true, timeout: 432000 });

ffmpegStream.setFfmpegPath("C:\\Program Files\\FFMPEG\\bin\\ffmpeg.exe");
ffmpegStream.addOptions([
    '-c:v libx264',
    '-c:a aac',
    '-ac 1',
    '-strict -2',
    '-crf 18',
    '-profile:v baseline',
    '-maxrate 400k',
    '-bufsize 1835k',
    '-pix_fmt yuv420p',
    '-hls_time 10',
    '-hls_list_size 6',
    '-hls_wrap 10',
    '-start_number 1'
  ]).output('streams/output.m3u8').on('end', () => { console.log("End"); }).run();

rtmpServer.on('client', client => { 
  client.on('connect', () => {
     console.log('connect', client.app);
  });
  
  client.on('play', ({ streamName }) => {
    console.log('PLAY', streamName);
  });
  
  client.on('publish', ({ streamName }) => {
    console.log('PUBLISH', streamName);
  });
  
  client.on('stop', () => {
    console.log('client disconnected');
  });
});

rtmpServer.on('error', err => {
  throw err;
});

rtmpServer.listen(1935, () => { console.log("RTMP Server Listen: localhost:1935"); });
server.listen(8000, () => { console.log("HTTP/HLS Server Listen: localhost:8000"); });