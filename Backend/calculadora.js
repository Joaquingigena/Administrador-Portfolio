
//Aca agarro los parametros que se pasan por consola
var params= process.argv.slice(2);
console.log(params);

var num1= parseFloat(params[0]);
var num2= parseFloat(params[1]);

console.log(num1);
console.log(num2);

var plantilla= `
la suma es: ${num1 + num2}
` ;




console.log(plantilla);