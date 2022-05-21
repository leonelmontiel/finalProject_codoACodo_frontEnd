const form = document.getElementById('form_tickets')
const inputs = document.querySelectorAll('#form_tickets input')
const selects = document.querySelectorAll('#form_tickets select')
const resumen = document.getElementById('resumen')

const campos = {
	name: false,
	lastName: false,
	email: false
}

const expresiones = {
	name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
	/* usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, */ // Letras, numeros, guion y guion_bajo
	/* password: /^.{4,12}$/, */ // 4 a 12 digitos.
	/* telefono: /^\d{7,14}$/ */ // 7 a 14 numeros.
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "name":
            validarCampo(expresiones.name, e.target, 'name');
        break
        case "lastName":
            validarCampo(expresiones.name, e.target, 'lastName');
        break
        case "email":
            validarCampo(expresiones.email, e.target, 'email');
        break
    }
}

const validarCampo = (expresion, input, campo) => {
    
	if(expresion.test(input.value)){        
		document.querySelector(`#grupo_${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.querySelector(`#grupo_${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario)
    input.addEventListener('blur', validarFormulario)
})

form.addEventListener('submit', (e) => {
    e.preventDefault()

    if(campos.name && campos.lastName && campos.email) {
        form.reset()
    }
})


const calcularTotal = () => {
    const quantity = inputs[3].value
    const price = document.getElementById('ticket_price').textContent    
    const category = selects[0].value
    return quantity * priceWithDiscount(price, category)
}

const priceWithDiscount = (price, percent) => {
    return price - (price * `0.${percent}`)
}

const calcularResumen = () => {
    if (inputs[3].value > 0) {
        mostrarResumen(calcularTotal())
    }        
}

const mostrarResumen = (precioTotal) => {    
    resumen.className = "mt-3 mb-3"
    resumen.innerHTML = 
    `
    <div class="card p-3 final_price d-inline-block w-100">Total a Pagar: $ <span id="final_price">${precioTotal}</span></div>
    `
}

const resetearTotal = () => {
    resumen.innerHTML = " "
}