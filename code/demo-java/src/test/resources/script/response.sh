#!/bin/bash

# echo "----- response.sh -----"

while true; do
  read -r input
  if [ "exit" == "$input" ]; then
    exit
  else
    echo "response: $input"
  fi
done
