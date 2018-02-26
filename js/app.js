$(document).foundation();

const form = document.getElementById('form');
const inputN = form.getElementsByTagName('input');
const error = document.getElementById('error');
let valido = 0;

//ponemos un listener al form
form.addEventListener("submit", e => {
  console.log('ok');
  if(valido==0){
      alert("Yeiiii!! el form es correcto!!");
  }else{
      alert("debes completar todos los campos");
  }
  e.preventDefault();
});

//primero convierto los inputs del form en un array
let inp = Array.from(inputN);

//para todo el arreglo inputs, valido el lenght de cada campo
inp.forEach((element, index) =>{
    element.addEventListener('keyup', e => {
      if (element.value.trim().length > 0){
          //el caso es el atributo data-validacion que me permite
          //saber que campo voy a evaluar y con que condiciones
          caso=element.dataset.validacion;
          valor = element.value
          validCampo(caso,valor);
      }
    });
});
//valido los casos posibles de cada campos
const validCampo = (caso, valor) => {
    //aqui evaluo el input nombre
    if(caso=='nombre'){
        const nombre = valor;
        //regex para validar que solo sean a a la z sin numeros
        preg = /^[a-zA-Z\s]*$/.test(nombre);
        //validamos si es alfanumerico
        if(preg){
            error.innerHTML='';
            //evaluo el length del nombre
            lenght(valor, 30);


        }else{
            //tiro un error
            valido=1;
            error.innerHTML='No puedes usar numeros';
        }
    }
    //aca evaluo el numero tarjeta
    if(caso=='tarjeta'){
        const tarjeta = valor;
        preg = /^[0-9\s]*$/.test(tarjeta);

        if(preg){
            error.innerHTML='';
            //evaluo el length de la tarjeta a 16 digitos
            lenght(valor, 16);
        }else{
            valido=1;
            error.innerHTML='No puedes usar letras, solo numeros';
        }
    }
    //aca evaluo el numero tarjeta
    if(caso=='ccv'){
        const ccv = valor;
        preg = /^[0-9\s]*$/.test(ccv);

        if(preg){
            error.innerHTML='';
            //evaluo el length de la tarjeta a 16 digitos
            lenght(valor, 3);
        }else{
            valido=1;
            error.innerHTML='No puedes usar letras, solo numeros';
        }
    }
    //aca evaluo el numero tarjeta
    if(caso=='expirames'){
        const ccv = valor;
        preg = /^[0-9\s]*$/.test(ccv);

        if(preg){
            error.innerHTML='';
            //evaluo el length de la tarjeta a 16 digitos
            lenght(valor, 2);
        }else{
            valido=1;
            error.innerHTML='No puedes usar letras, solo numeros';
        }
    }
    if(caso=='expiraanio'){
        const ccv = valor;
        preg = /^[0-9\s]*$/.test(ccv);

        if(preg){
            error.innerHTML='';
            //evaluo el length de la tarjeta a 16 digitos
            lenght(valor, 4);
        }else{
            valido=1;
            error.innerHTML='No puedes usar letras, solo numeros';
        }
    }

}
//aqui valido lenghts con valor variable
const lenght = (data,num, id) => {
    if(data.length > num){
        error.innerHTML='No debe ser mayor a '+num+' caracteres';
    }
}
