// Esta función muestra un mensaje con el tipo de input
function showMessage(input, message, type) {
	// Selecciona el elemento <small> (ver registro.html) y settea el mensaje
	const msg = input.parentNode.querySelector("small");
	msg.innerText = message;
	// Si type es true, se cambia la clase de CSS a success; si es false, se cambia a error
	input.className = type ? "success" : "error";
	return type; // Se devuelve el valor del tipo
}

function showError(input, message) {
	return showMessage(input, message, false); // Siempre devuelve false
}

function showSuccess(input) {
	return showMessage(input, "", true); //Siempre devuelve true
}

function hasValue(input, message) {
	if (input.value.trim() === "") { // Comprueba si el elemento de input tiene un valor o no
		return showError(input, message); // Muestra un error si no tiene valor
	}
	return showSuccess(input); // Muestra sucess si tiene valor
}

function validateEmail(input, requiredMsg, invalidMsg) { // Comprueba si es un email válido o no
	// Primero comprueba si se ha rellenado el campo de input
	if (!hasValue(input, requiredMsg)) {
		return false;
	}
	// Valida si es el formato correcto de email
	const emailRegex =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	const email = input.value.trim();
	if (!emailRegex.test(email)) {
		return showError(input, invalidMsg); //Si no es el formato correcto, devuelve un error
	}
	return true;
}

const form = document.querySelector("#signup");

// Constantes para almacenar mensajes de error
const NAME_REQUIRED = "Por favor, introduce tu nombre";
const EMAIL_REQUIRED = "Por favor, introduce tu email";
const EMAIL_INVALID = "Por favor, introduce un email válido";

form.addEventListener("submit", function (event) {
	// Por defecto no se entrega/envía nada (hay que hacer las validaciones antes)
	event.preventDefault();

	// Validaciones de los campos del formulario
	let nameValid = hasValue(form.elements["name"], NAME_REQUIRED);
	let emailValid = validateEmail(form.elements["email"], EMAIL_REQUIRED, EMAIL_INVALID);
	// Si los campos son válidos, se envía el formulario
	if (nameValid && emailValid) {
		alert("Gracias por contactarnos, "+ form.elements["name"].value+ ". \nInformación enviada correctamente");
	}
});