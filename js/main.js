const API = "https://api.github.com/users/";



const ella = Vue.createApp({
    data() { //En data tenemos los atributos
        return {
            busqueda: null,  //agregamos esto y mandamos el input del formulario donde esta el texto 
            resultado: null, //null es vacío
            fail: null, 
        }
     },
     methods: { //La palabra methods hace q  todo sean funciones entoces no se pone funtion
        
        async Buscar(){
            try {
                const response = await fetch(API + this.busqueda) 
                if(!response.ok) throw new Error ("Usuario no encontrado") //Si el error es falso es decir si ok que lo arroja el servidor y se ve en el console es falso que marque este error. 
                const data = await response.json() //Data es el mismo response de arriba pero convertido a un json
                this.resultado = data //despues de haber hecho la busqueda es trueahora lo ponemos como un data para poder que se pueda interpolar en el index
                this.fail= null //con este quitamos el mensaje de error cuando despues de un usuario inventado ponemos un usuario valido
                console.log(data) //Adjuntamos data
                

            } catch (error){
                this.fail = error 
                this.resultado = false 
                //Finalmente hacer que la busqeuda quede vacia
            } finally{
                this.busqueda = null
            }
            
        }
     }

  })