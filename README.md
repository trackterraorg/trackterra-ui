<h1 align="center">  
TrackTerra 
</h1>  
    
<p align="center"> 
  This repo is the ui app for the TrackTerra. It is built using react using mui framework.
</p>  
    <p align="center">  
</p>  

## Configuration
Create a .env file and set this this var
REACT_APP_API_URL=<api_url>
## Installation
  
```bash  
$ yarn install
```   

## Development
  
```bash  
$ yarn start
```   

## Deployment
```bash  
$ yarn build
``` 
It is recommended to use nginx as reverse proxy server when deploying node apps. Please refer to this [link](https://blog.logrocket.com/how-to-run-a-node-js-server-with-nginx/) for more information. 

Here is also another way to do it if using nginx directly:

after building the app copy the contents of build dir to www then configure a host in nginx and copy the following script

```bash
server {
  listen 80;
  listen [::]:80;
  root /var/www/html/ui/;
  index index.html index.htm;
  server_name localhost;
  location / {
      try_files $uri /index.html;
  }
}
```

## Special Thanks  
  
  This project wouldn't be possible without this awesome project,
  [Minimal](https://github.com/minimal-ui-kit/material-kit-react).
  
## License  
  
  This project is [MIT licensed](LICENSE).