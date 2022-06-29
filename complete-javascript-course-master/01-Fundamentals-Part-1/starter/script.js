console.log(40+8+23-10);
let country = 'Brazil';
let continent = 'South America';
let population = '212,6';
console.log('I live in '+ country + '. It is located in '+ continent +'. Brazil population is about ' + population);
console.log(`I live in ${country}. It's located in ${continent} and its population is about ${population} million people.`);

//Code Challenge #1

let markWeight = 78;
let markHeight = 1.69;

let johnWeight = 92;
let johnHeight = 1.95;

let markBMI = markWeight/markHeight**2
let johnBMI =johnWeight/johnHeight**2

let markHigherBMI = markBMI > johnBMI;

if(markHigherBMI){
    console.log(`Mark's BMI is higher than John's!`);
}else{
    console.log(`John's BMI is higher than Mark's!`)
}

// console.log(
//     `Mark's BMI is ${markBMI}, John's BMI is ${johnBMI} and it's ${markHigherBMI} that Mark has the higher BMI.`
//     );

markHeight = 1.88;
markWeight = 95;

johnHeight = 1.76;
johnWeight = 85;

markBMI = markWeight/markHeight**2
johnBMI =johnWeight/johnHeight**2

markHigherBMI = markBMI > johnBMI

// console.log(
//     `Mark's BMI is ${markBMI}, John's BMI is ${johnBMI} and it's ${markHigherBMI} that Mark has the higher BMI.`
//     );

if(markHigherBMI){
    console.log(`Mark's BMI is higher than John's!`);
}else{
    console.log(`John's BMI is higher than Mark's!`)
}

markHigherBMI ? 
console.log(`Mark's BMI is higher than John's!`) : 
console.log(`John's BMI is higher than Mark's!`)

// Coding Challenge #3

//Data

let dolphinsScores = [96, 108, 89]
let koalasScores = [88,191, 110]

let dolphinTotal = dolphinsScores.reduce((total, score)=>{
    return total + score
},0)

let koalaTotal = koalasScores.reduce((total, score)=>{
    return total + score
}, 0)

if(dolphinTotal/dolphinsScores.length > koalaTotal/koalasScores.length){
    console.log(`Yay! The Dolphins has won the trophy!`)
} else if (dolphinTotal/dolphinsScores.length < koalaTotal/koalasScores.length){
    console.log(`Yay! The Koalas has won the trophy!`)
} else {
    console.log(`That's a draw! Everyone shares the trophy!`)
}

// Bonus 1
// dolphinsScores = [97, 112, 101];
// koalasScores = [109, 95,106];

dolphinTotal = dolphinsScores.reduce((total, score)=>{
    return total + score
},0)

koalaTotal = koalasScores.reduce((total, score)=>{
    return total + score
}, 0)
console.log(dolphinsScores)

if(dolphinTotal/dolphinsScores.length === koalaTotal/koalasScores.length){
    console.log(`That's a draw! Everyone shares the trophy!`)
}else{
    if(dolphinTotal/dolphinsScores.length > koalaTotal/koalasScores.length && dolphinTotal/dolphinsScores.length >= 100){
        console.log(`Yay! The Dolphins has won the trophy!`)
    } else if (dolphinTotal/dolphinsScores.length > koalaTotal/koalasScores.length && dolphinTotal/dolphinsScores.length < 100){
        console.log(`Oops! Not enough points for a winner!`)
    } else if (dolphinTotal/dolphinsScores.length < koalaTotal/koalasScores.length && koalaTotal/koalasScores.length >= 100){
        console.log(`Yay! The Koalas has won the trophy!`)
    } else {
        console.log(`Oops! Not enough points for a winner!`)
    } 
}
 
//bonus 2

if(dolphinTotal/dolphinsScores.length && koalaTotal/koalasScores.length <= 100 ){
    console.log(`Sorry, guys! No donuts for you...`)
}else{
    if(dolphinTotal/dolphinsScores.length > koalaTotal/koalasScores.length && dolphinTotal/dolphinsScores.length >= 100){
        console.log(`Yay! The Dolphins has won the trophy!`)
    } else if (dolphinTotal/dolphinsScores.length > koalaTotal/koalasScores.length && dolphinTotal/dolphinsScores.length < 100){
        console.log(`Oops! Not enough points for a winner!`)
    } else if (dolphinTotal/dolphinsScores.length < koalaTotal/koalasScores.length && koalaTotal/koalasScores.length >= 100){
        console.log(`Yay! The Koalas has won the trophy!`)
    } else if (dolphinTotal/dolphinsScores.length < koalaTotal/koalasScores.length && koalaTotal/koalasScores.length < 100){
        console.log(`Yay! The Koalas has won the trophy!`)
    } else {
        console.log(`That's a draw! Everyone shares the trophy!`)
    }
}

//Code Challenge #4

// const bill = 275.40;
const bill = 275;

bill >= 50 && bill <= 275 ? 
console.log(`The bill was ${bill}, the tip was ${bill * 0.15} and the final values is ${bill * 1.15}`):
console.log(`The bill was ${bill}, the tip was ${bill * 0.2} and the final values is ${bill * 1.2}`)
