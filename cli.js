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
	process.exit(0);
}

const timezone = moment.tz.guess()

let url = "https://api.open-meteo.com/v1/forecast?"

if(args.n) {
	url = url + "latitude=" + args.n
} else if (args.s) {
	url = url + "latitude=" + (args.s * -1) 
 
}

if(args.e) {
	url = url + "&longitude=" + args.e
} else if(args.w) {
	url = url + "&longitude=" + (args.w * -1) 

}

if(args.z) {
	url = url + "&timezone=" + args.z
} else if(!args.z) {
	url = url + "&timezone=" + timezone
}
url = url + "&daily=precipitation_hours"
console.log(url);
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
