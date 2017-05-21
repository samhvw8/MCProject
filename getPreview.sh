#!/usr/bin/env bash

for entry in "./storage"/*
do

	echo $entry
	if [ ${entry: -4} == ".mp4" ]
	then
		img="${entry/mp4/png}"
		img="${img/storage/public}"
		echo $img
		ffmpeg -i $entry -ss 00:00:4 -f image2 -vframes 1 $img
	fi

  
done