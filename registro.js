// Esta función muestra un mensaje con el tipo de input
function mostrarMensaje(input, mensaje, tipo) {
	// Selecciona el elemento <small> (ver registro.html) y settea el mensaje
	const msg = input.parentNode.querySelector("small");
	msg.innerText = mensaje;
	// Si tipo es true, se cambia la clase de CSS a success; si es false, se cambia a error
	input.className = tipo ? "success" : "error";
	return tipo; // Se devuelve el valor del tipo
}

function mostrarError(input, mensaje) {
	return mostrarMensaje(input, mensaje, false); // Siempre devuelve false
}

function mostrarExito(input) {
	return mostrarMensaje(input, "", true); //Siempre devuelve true
}

function tieneValor(input, mensaje) {
	if (input.value.trim() === "") { // Comprueba si el elemento de input tiene un valor o no
		return mostrarError(input, mensaje); // Muestra un error si no tiene valor
	}
	return mostrarExito(input); // Muestra sucess si tiene valor
}

function validarEmail(input, msjRequerido, msjInvalido) { // Comprueba si es un email válido o no
	// Primero comprueba si se ha rellenado el campo de input
	if (!tieneValor(input, msjRequerido)) {
		return false;
	}
	// Valida si es el formato correcto de email (regular expression de JavaScript)
	const emailRegex =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	const email = input.value.trim();
	if (!emailRegex.test(email)) {
		return mostrarError(input, msjInvalido); //Si no es el formato correcto, devuelve un error
	}
	return true;
}

const form = document.querySelector("#signup");

// Constantes para almacenar mensajes de error
const NOMBRE_REQUERIDO = "Por favor, introduce tu nombre";
const EMAIL_REQUERIDO = "Por favor, introduce tu email";
const EMAIL_INVALIDO = "Por favor, introduce un email válido";

form.addEventListener("submit", function (event) {
	// Por defecto no se entrega/envía nada (hay que hacer las validaciones antes)
	event.preventDefault();

	// Validaciones de los campos del formulario
	let nameValido = tieneValor(form.elements["name"], NOMBRE_REQUERIDO);
	let emailValido = validarEmail(form.elements["email"], EMAIL_REQUERIDO, EMAIL_INVALIDO);
	// Si los campos son válidos, se envía el formulario
	if (nameValido && emailValido) {
		alert("Gracias por contactarnos, "+ form.elements["name"].value+ ". \nInformación enviada correctamente");
	}
});