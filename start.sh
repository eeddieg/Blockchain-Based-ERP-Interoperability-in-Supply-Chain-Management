#! /bin/bash

rootDir="$(cd -P -- "$(dirname -- "$0")" && pwd -P)"

declare -a back=(
"blockchain"
"layer_1/erp1/backend"
"layer_1/erp2/backend"
"layer_2/erp1/backend"
"layer_3/erp1/backend"
"layer_4/erp1/backend"
"layer_5/erp1/backend"
"layer_6/erp1/backend"
"layer_7/erp1/backend"
"layer_8/erp1/backend"
"layer_9/erp1/backend"
)
declare -a front=(
"layer_1/erp1/frontend"
"layer_1/erp2/frontend"
"layer_2/erp1/frontend"
"layer_3/erp1/frontend"
"layer_4/erp1/frontend"
"layer_5/erp1/frontend"
"layer_6/erp1/frontend"
"layer_7/erp1/frontend"
"layer_8/erp1/frontend"
"layer_9/erp1/frontend"
)

clear;

for path in "${back[@]}"; do
  cd "$rootDir/$path" || exit
  echo "$PWD"
  npm i 
  cd "$rootDir" || exit
  printf "\n"
done

for path in "${front[@]}"; do
  cd "$rootDir/$path" || exit
  echo "$PWD"
  npm i 
  cd "$rootDir" || exit
  printf "\n"
done

docker compose up