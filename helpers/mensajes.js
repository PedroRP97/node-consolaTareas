const { resolve } = require('path');

require('colors');


const mostrarMenu = () => {
    return new Promise(resolve => {
        console.log('========================'.green);
        console.log(' Selecciones una opción '.green);
        console.log('========================\n'.green);

        console.log(`${`1.`.green} crear tarea`);
        console.log(`${`2.`.green} listar tareas`);
        console.log(`${`3.`.green} listar tareas completadas`);
        console.log(`${`4.`.green} listar tareas pendientes`);
        console.log(`${`5.`.green} completar tarea(s)`);
        console.log(`${`6.`.green} borrar tarea`);
        console.log(`${`0.`.green} salir \n`);

        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readLine.question('Seleccione una opción: ', (opt)=>{
            console.log({opt}); //mostrar si esta capturando el valor ingresado
            readLine.close();
            resolve(opt);
        })
    });
    
}
const pausa = ()=>{
    return new Promise(resolve =>{
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readLine.question(`\nPresione ${'ENTER'.green} para continuar\n`, (opt)=>{
            readLine.close();
            resolve();
        })
    });
    
}
module.exports = {
    mostrarMenu,
    pausa
}