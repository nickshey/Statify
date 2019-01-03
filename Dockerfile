# In your Dockerfile.
FROM node:8.11.3

# The base node image sets a very verbose log level.
ENV NPM_CONFIG_LOGLEVEL warn

# In your Dockerfile.
COPY ./Client /Client
COPY ./Server /Server

RUN (ls Client)
RUN (cd Server; ls;)

RUN (cd Client; npm install -g serve;)
RUN (cd Client; rm yarn.lock; rm -R node_modules; yarn;)
RUN (cd Client; yarn run build)
CMD (cd Client; serve -s build)

RUN (cd Server; npm install;)
CMD (node Server/authorization_code/app.js)