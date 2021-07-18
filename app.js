require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerOpt, 
        pausa,
        leerInput, 
        listadoTareasBorrar,
        confirmar,
        mostrarListadoCheckList
    } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

console.clear();


const main = async() =>{
    //mostrarMenu();
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();
    if(tareasDB ){ //cargar tareas
        tareas.cargarTareasFromArray(tareasDB);
    }
    
    do{
        //imprimir el menu
        opt = await inquirerOpt(); //recibe el valor ingresado en el menu   
        switch(opt){
            case '1':
                const desc = await leerInput('descripcion: ');
                tareas.crearTarea(desc);
            break;
            case '2':
                tareas.listadoCompleto();
                //console.log(tareas.listadoArr);
            break;
            case '3':
                tareas.listarPendientesCompletadas(true);
            break;
            case '4':
                tareas.listarPendientesCompletadas(false);
            break;
            case '5':  //completado | pendientes
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
            break;

            case '6': //borrar
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if(id!=='0'){ //valido si el usuario selecciono 0
                    const ok = await confirmar('Estas seguro?');
                        if(ok){
                            tareas.borrarTarea(id);
                            console.log('Tarea Borrada');
                        }
                }
                
                
            break;
        }

        guardarDB(tareas.listadoArr);

        await pausa();
    }while(opt !== '0');
}

main();