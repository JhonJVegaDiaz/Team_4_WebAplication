

function mi_funcion() {
    const usuario = document.getElementById('usuario').value
    const contraseña = document.getElementById('pasword').value
    const confirmar_contraseña = document.getElementById('Pasword_confirmacion').value

    const registro = {
        usuario,
        contraseña,
        confirmar_contraseña
    }
    print("ingresa",registro)
    const abrir_modal = document.getElementById('abrir_modal')

    if (!usuario) {abrir_modal.click(); return false }
    if (!contraseña) {abrir_modal.click(); return false }
    if (!confirmar_contraseña) {abrir_modal.click(); return false }

    if (!usuario.length > 6) {abrir_modal.click(); return false }

    if (!/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/i.test(contraseña)) {abrir_modal.click(); return false }

    if (!contraseña === confirmar_contraseña) {abrir_modal.click(); return false }

    console.log(registro);

    return true
}