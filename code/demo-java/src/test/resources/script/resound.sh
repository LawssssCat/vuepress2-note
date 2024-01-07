#!/bin/bash

msg=$1
time=${2:-0}

#echo $msg
#echo $time

sleep "$time"
echo "$msg"
