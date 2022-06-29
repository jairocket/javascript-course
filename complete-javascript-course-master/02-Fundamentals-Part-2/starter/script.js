'use strict';

// // Code Challenge #1

// const calcAverage = (num1, num2, num3) => (num1 + num2 + num3)/3;

// function checkWinner (avgDolphins, avgKoalas) {
//     if(avgDolphins >= (2 * avgKoalas)) {
//         console.log(`Yay! Dolphins win!`)
//     }else if (avgKoalas >= 2 * avgDolphins) {
//         console.log(`Yay! Koalas win!`)
//     } else {
//         console.log(`Come on guys! More luck next year.`)
//     }
// }

// const avgDolphins1 = calcAverage(44, 23, 71);
// const avgKoalas1 = calcAverage(65, 54, 49);

// const avgDolphins2 = calcAverage(85, 54, 41);
// const avgKoalas2 = calcAverage(23, 34, 27);

// checkWinner(avgDolphins1, avgKoalas1)
// checkWinner(avgDolphins2, avgKoalas2)

// // Code Challenge #2

 const calcTip = bill => bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2

// const bills = [125, 555, 44]

// const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])]

// const totals = [(calcTip(bills[0]) + bills[0]), (calcTip(bills[1]) + bills[1]), calcTip(bills[2]) + bills[2]]

// console.log(calcTip(100))
// console.log(bills)
// console.log(tips)
// console.log(totals)

// // Objects challenge

// const jonas = {
//     firstName: 'Jonas',
//     lastName: 'Schmedtmann',
//     calcAge: function () {
//         this.age = 2037 - this.birthYear
//         return this.age
//     },
//     job: 'teacher',
//     friends: ['Michael', 'Peter', 'Steven'],
//     birthYear: 1991,
//     hasDriversLicence: true,
//     getSummary: function (){
//         return `${this.firstName} is a ${this.calcAge()}-years old ${this.job} and ${this.hasDriversLicence ?
//             "he has a driver's license" : "he has no driver's license"}`
//     }
// }

// console.log(jonas.firstName)
// console.log(jonas['lastName'])

// jonas.location = 'Portugal'
// jonas['twitter'] = '@jonasschmedtmann'

// console.log(jonas)

// console.log(`${jonas.firstName} has ${jonas.friends.length} friends, and his best friend is ${jonas.friends[0]}`)
// console.log(jonas.getSummary())

// // Code Challenge #3

// const mark = {
//     fullName: 'Mark Miller',
//     mass: 78,
//     height: 1.69,
//     calcBMI: function (){
//         this.bmi = this.mass/ this.height**2
//         return this.bmi
//     }
// }

// const john = {
//     fullName: 'John Smith',
//     mass: 92,
//     height: 1.95,
//     calcBMI: function (){
//         this.bmi = this.mass/ this.height**2
//         return this.bmi
//     }
// }

// if(john.calcBMI() > mark.calcBMI()){
//         console.log(`${john.fullName}'s BMI (${john.calcBMI()}) is higher than ${mark.fullName}'s (${mark.calcBMI()})` )
//     }else if(mark.calcBMI() > john.calcBMI()){
//         console.log(`${mark.fullName}'s BMI (${mark.calcBMI()}) is higher than ${john.fullName}'s (${john.calcBMI()})` )
//     }else{
//         console.log(`They have the same BMI (${mark.calcBMI()})`)
    // }

//Coding Challenge #4

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
let tips = [];
let totals = [];

for(let i = 0; i < bills.length; i++){
    tips.push(calcTip(bills[i]))
    totals.push(calcTip(bills[i]) + bills[i])
}

console.log(bills)
console.log(tips)
console.log(totals)

const AverageCalculator = (arr)=>{
    let acc = 0;
    let avg
    for (let i = 0; i < arr.length; i++) {
        acc += arr[i]
    }
    avg = acc/arr.length
    return avg
}

console.log(AverageCalculator([10]))
console.log(AverageCalculator([10, 5]))
console.log(AverageCalculator([10, 5, 6]))
console.log(AverageCalculator([10, 5, 6, 21, 8]))
console.log(AverageCalculator(totals))
console.log(AverageCalculator(tips))