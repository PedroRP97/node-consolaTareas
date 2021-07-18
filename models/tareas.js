const Tarea = require('./tarea');
/*
_listado:
{'uuid-12234-12312-2: {id: 12313, desc: asda, completadoEn: null}}
*/
class Tareas {
    _listado = {} //objeto de listado

    get listadoArr(){
        const listado = [];
        //extraer cada una de las llaves que hay en un objeto
        Object.keys(this._listado).forEach( key =>{
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;
    }

    constructor (){
        this._listado = {};
    }

    borrarTarea(id = ''){
        if(this._listado[id]){ //si existe
            delete this._listado[id]; //eliminar la propiedad del objeto
        }
    }

    cargarTareasFromArray ( tareas = []){
        tareas.forEach(tarea => {
            this._listado[tarea.id] =tarea;
        })
       
    }

    crearTarea(desc = '' ){
        const tarea = new Tarea(desc); // recibe el valor de desc
        this._listado[tarea.id] = tarea; // this._listado[tarea.id] es otra forma de agregar una propiedad al objeto _listado

    }
    listadoCompleto(){
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i+1}`.green;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn)
                            ? 'completado'.green
                            : 'pendiente'.red
            console.log(`${idx} ${desc} :: ${estado}`);
            return estado;
        });
    }

    listarPendientesCompletadas(completadas = true){
        let contador = 0;
        this.listadoArr.forEach((tarea) => {
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn)
                            ? 'completado'.green
                            : 'pendiente'.red
            if(completadas){
                if(completadoEn){
                contador += 1;
                console.log(`${(contador + '.').green} ${desc} :: ${completadoEn.green}`);
                }
            }else 
                if(!completadoEn){
                contador += 1;
                console.log(`${(contador + '.').green} ${desc} :: ${estado}`);
            }  
        });
    }
    toggleCompletadas( ids = []){

        ids.forEach(id => { // validar el id
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea =>{
            if(!ids.includes(tarea.id)){ //pregunto si no existe el id tengo que limpiarlo
                this._listado[tarea.id].completadoEn = null;

            }
        })
    }
}
module.exports = Tareas;