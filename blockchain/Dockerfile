FROM node:16.20.1-bookworm
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
RUN apt-get update
RUN apt-get -y upgrade
RUN apt-get install -y build-essential libssl-dev libffi-dev software-properties-common
RUN apt-get install -y python3-dev python3-pip

USER 0
RUN curl -o /usr/bin/solc -fL https://github.com/ethereum/solidity/releases/download/v0.8.4/solc-static-linux
RUN chmod 777 /usr/bin/solc

USER node
RUN npm i
# RUN npm i express
RUN mkdir -p /home/node/.local/bin

ENV PATH="${PATH}:/home/node/.local/bin"
SHELL ["/bin/bash", "-c", "source ~/.bashrc"]
COPY --chown=node:node . .
EXPOSE 3001 8545
# USER 0
CMD [ "npm", "run", "dev" ]