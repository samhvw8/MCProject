#!/usr/bin/env bash

for entry in "./data"/*
do
		
	if [ ${entry: -4} == ".mp4" ]
	then

		ffmpeg -i $entry -ss 00:00:4 -f image2 -vframes 1 "${entry/mp4/png}"
	fi

  
done