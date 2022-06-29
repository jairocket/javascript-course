// Remember, we're gonna use strict mode in all scripts now!
'use strict';

///////////////////////////////////////////////////////////

//Code Challenge #1

/*
Given an array of forecasted maximum temperatures, the thermometer displays a
string with these temperatures.

Example: [17, 21, 23] will print "... 17ºC in 1 days ... 21ºC in 2 days ... 23ºC in 3 days ..."

Create a function 'printForecast' which takes in an array 'arr' and logs a string like the
above to the console.

Use the problema-solving framework: Understand the problem and break it up into sub-problems!

TEST DATA 1: [17, 21, 23]
TEST DATA 2: [12, 5, -5, 0, 4]
*/

function printForecast(arr){
    let counts ={}
    let times = 0
    let string = ''
    for(let item of arr){
        let target = item
        for(let index of arr){
            if(index === target) times++
        }
        counts[target] = times
        times = 0   
    }

    for(let count in counts){
        string += `${count}ºC in ${counts[count]} days ... `
    }
   console.log("... " + string) 
}
console.log('Test data 1')
printForecast([17, 21, 23])
console.log('Test data 2')
printForecast([12, 5, -5, 0, 4, 4, 4, 0, 12, 12, 12])