const btn_crear = document.document.getElementById('btn_crear')

if (btn_crear){
    btn_editar_usuario.addEventListener('click', () => {

    console.log("entro")
    const usuario = document.getElementById('usuario').value
    const pregunta = document.getElementById('pregunta').value
    const respuesta = document.getElementById('respuesta').value
    const contraseña = document.getElementById('pasword').value
    const confirmar_contraseña = document.getElementById('Pasword_confirmacion').value

    const registro = {
        usuario,
        pregunta,
        respuesta,
        contraseña,
        confirmar_contraseña
    }

    const abrir_modal = document.getElementById('abrir_modal')
    const texto_modal = document.getElementById('modal-body')
    

    if (!usuario) {texto_modal.textContent = "Escriba un usuario"; abrir_modal.click(); return false }
    if (!pregunta) {texto_modal.textContent = "Escriba una pregunta para recuperar contraseña"; abrir_modal.click(); return false }
    if (!respuesta) {texto_modal.textContent = "Escriba un respuesta para recuperar contraseña"; abrir_modal.click(); return false }
    if (!contraseña) {texto_modal.textContent = "Escriba una contraseña"; abrir_modal.click(); return false }
    if (!confirmar_contraseña) {texto_modal.textContent = "Confirme la contraseña"; abrir_modal.click(); return false }

    if (!usuario.length > 6) {texto_modal.textContent = "El usuario debe tener más de 6 caracteres"; abrir_modal.click(); return false }

    if (!/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/i.test(contraseña)) {texto_modal.textContent = "La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico."; abrir_modal.click(); return false }

    if (!contraseña === confirmar_contraseña) { abrir_modal.click(); return false }

    return true
}
}