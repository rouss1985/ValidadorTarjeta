$(document).foundation();

const form = document.getElementById('form');
const inputN = form.getElementsByTagName('input');
const error = document.getElementById('error');
let valido = 0;
let ccvv = 0;
let tarjetav = 0;
let mesv = 0;
let aniov = 0;
let nombrev = 0;

//ponemos un listener al form
form.addEventListener("submit", e => {
  if(valido==0){
      error.innerHTML="No puede ir en blanco";
      e.preventDefault();
  }
  if(valido==2){
      error.innerHTML="hay un error";
      e.preventDefault();
  }
  if(valido==3 && ccvv==1 && tarjetav==1 && mesv==1 && aniov==1 && nombrev==1){
      alert("Yeii! ya funciona");
  }else{
      error.innerHTML="Todos los campos son obligatorios";
  }

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
        let nombre = valor;
        //regex para validar que solo sean a a la z sin numeros
        preg = /^[a-zA-Z\s]*$/.test(nombre);
        //validamos si es alfanumerico
        if(preg){
            error.innerHTML='';
            //evaluo el length del nombre
            valido = 3;
            nombrev = 1;
            lenght(valor, 30);
        }else{
            //tiro un error
            valido=2;
            error.innerHTML='No puedes usar numeros';
        }
    }
    //aca evaluo el numero tarjeta
    if(caso=='tarjeta'){
        let tarjeta = valor;
        preg = /^[0-9\s]*$/.test(tarjeta);

        lenght(valor, 16);
        if(preg){
            //Mando el numero para validar el algoritmo de luhn
            let tarvalida=luhn(tarjeta);
            //valido si el algoritmo es correcto
            if(tarvalida==true){
                //evaluo el length de la tarjeta a 16 digitos
                error.innerHTML='';
                valido = 3;
                tarjetav=1;
            }else{
                valido=2;
                tarjetav=0;
                error.innerHTML='Número de tarjeta inválido';
            }
        }else{
            valido=2;
            error.innerHTML='No puedes usar letras, solo numeros';
        }
    }
    //aca evaluo el numero tarjeta
    if(caso=='ccv'){
        let ccv = valor;
        preg = /^[0-9\s]*$/.test(ccv);

        if(preg){
            error.innerHTML='';
            valido = 3;
            ccvv=1;
            //evaluo el length de la tarjeta a 16 digitos
            lenght(valor, 3);
        }else{
            valido=2;
            ccvv=0;
            error.innerHTML='No puedes usar letras, solo numeros';
        }
    }
    //aca evaluo el numero tarjeta
    if(caso=='expirames'){
        let mes = valor;
        preg = /^[0-9\s]*$/.test(mes);
        if(preg){
            error.innerHTML='';
            valido = 3;
            mesv=1;
            //evaluo el length de la tarjeta a 16 digitos
            lenght(valor, 2);
        }else{
            valido=2;
            mesv=0;
            error.innerHTML='No puedes usar letras, solo numeros';
        }
    }
    if(caso=='expiraanio'){
        let anio = valor;
        preg = /^[0-9\s]*$/.test(anio);

        if(preg){
            error.innerHTML='';
            valido = 3;
            aniov=1;
            //evaluo el length de la tarjeta a 16 digitos
            lenght(valor, 4);
        }else{
            valido=2;
            aniov=0;
            error.innerHTML='No puedes usar letras, solo numeros';
        }
    }

}
//aqui valido lenghts con valor variable
const lenght = (data,num, id) => {
    if(data.length > num){
        valido=2;
        error.innerHTML='No debe ser mayor a '+num+' caracteres';
    }else{
        valido=3;
    }
}

const luhn = value =>{
    // accept only digits, dashes or spaces
if (/[^0-9-\s]+/.test(value)) return false;

// The Luhn Algorithm. It's so pretty.
var nCheck = 0, nDigit = 0, bEven = false;
value = value.replace(/\D/g, "");

for (var n = value.length - 1; n >= 0; n--) {
var cDigit = value.charAt(n),
  nDigit = parseInt(cDigit, 10);

if (bEven) {
if ((nDigit *= 2) > 9) nDigit -= 9;
}

nCheck += nDigit;
bEven = !bEven;
}

return (nCheck % 10) == 0;
}
