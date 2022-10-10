#!/usr/bin/env node
import moment from 'moment-timezone';
import fetch from 'node-fetch';
import minimist from 'minimist';

const args = (process.argv.slice(2));

if(args.h){
	Console.log(`Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
    -h            Show this help message and exit.
    -n, -s        Latitude: N positive; S negative.
    -e, -w        Longitude: E positive; W negative.
    -z            Time zone: uses tz.guess() from moment-timezone by default.
    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
    -j            Echo pretty JSON from open-meteo API and exit.`)
}

const timezone = moment.tz.guess()

let url = "https://api.open-meteo.com/v1/forecast?"

if(args.n) {
	url = url + "latitude=" + args.n
} else if (args.s) {
	let temp = args.s
	temp *= -1
	let str = temp.toFixed(2)
	url = url + "latitude=" + str 
 
}

if(args.e) {
	url = url + "&longitude=" + args.e
} else if(args.w) {
	let temp = args.w
	temp *= -1
	let str = temp.toFixed(2)	
	url = url + "&longitude=" + str 

}

if(args.z) {
	url = url + "&timezone=" + args.z
} else if(!args.z) {
	url = url + "&timezone=" + timezone
}
url = url + "&daily=precipitation_hours"
if(args.d) {
	if(args.d == 0) {
                url = url + "&start_date=2022-10-04&end_date=2022-10-04"
	} else if (args.d == 1) {
		url = url + "&start_date=2022-10-04&end_date=2022-10-05"
	} else if(args.d == 2) {
                url = url + "&start_date=2022-10-04&end_date=2022-10-06"
	} else if(args.d == 3) {
                url = url + "&start_date=2022-10-04&end_date=2022-10-07"
	} else if(args.d == 4) {
                url = url + "&start_date=2022-10-04&end_date=2022-10-08"
	} else if(args.d == 5) {
                url = url + "&start_date=2022-10-04&end_date=2022-10-09"
	} else if(args.d == 6) {
                url = url + "&start_date=2022-10-04&end_date=2022-10-10"
	}
} else if(!args.d) {
        url = url + "&start_date=2022-10-04&end_date=2022-10-05"
}

const response = await fetch(url)

const data = await response.json();

if(args.j) {
	Console.log(data)
}

const days = args.d

if(days == 0) {
	console.log("today.")
} else if (days > 1) {
	console.log("in " + days + " days.")
} else {
	console.log("tomorrow.")
} 
