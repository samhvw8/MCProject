#!/usr/bin/env bash

for entry in "./storage"/*
do

	if [ ${entry: -4} == ".mp4" ]
	then
		if ! [ ${entry: -8} == "-360.mp4" ]
		then

			output="$(ffprobe -v error -of flat=s=_ -select_streams v:0 -show_entries stream=height $entry)"
			output=${output:24}
			
			if ! (( $output <= 360 )) 
			then
				video360="${entry/.mp4/-360.mp4}"

				if ! [ -f "$video360" ]
				then
		    		ffmpeg -i $entry -filter:v scale=-1:360 -c:a copy $video360
				fi
			fi

			
		fi
	fi

  
done