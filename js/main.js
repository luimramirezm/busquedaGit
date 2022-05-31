const API = "https://api.github.com/users/";



const ella = Vue.createApp({
    data() { //En data tenemos los atributos
        return {
            busqueda: null,  //agregamos esto y mandamos el input del formulario donde esta el texto 
            resultado: null, //null es vacío
            fail: null, 
            favoritos: new Map() //Donde guardamos los favoritos haremos un mapa
        }
     },

     computed:{
         //Es para poder eliminar en el apartado de eliminar del html
        esFavorito(){
             return this.favoritos.has(this.resultado.id);
         },
        //con esta propiedad computada se retornan todos los favoritos
        //pero unicamente los valores, no las key para eso se usa value()
        TodosFavoritos(){
            return Array.from(this.favoritos.values())
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
            
        },

        addFavorito(){
            //La clave de este map es el id y el resultado es el valor
            this.favoritos.set(this.resultado.id, this.resultado);
            this.UpdateStorage() //Aqui estamos llamando al método UpdateStorage
        },

        RemoverFavorito(){
            //vamos a eliminar con el id
            this.favoritos.delete(this.resultado.id);
            this.UpdateStorage() //Aqui llama al metodo para actualizar lo q se guardo para saber si hay más o menos favoritos guardados
        },

        UpdateStorage(){
            //localStorage te permite acceder al objeto local Storage; los datos persisten almacenados entre de las diferentes sesiones de navegación
            //Se pretende guardar en caché la información de los favoritos de manera persistente
            //JSON.stringify convierte todo lo q hay en el TodosFavoritos, en una cadena de texto y toca convertirlo asi porq el localStorage solo lee String
            window.localStorage.setItem('favoritos', JSON.stringify(this.TodosFavoritos));
        }
     }

  })