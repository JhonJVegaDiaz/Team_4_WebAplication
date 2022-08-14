const btn_crear = document.getElementById('btn_crear')
const btn_editar = document.getElementById('btn_editar')
const btn_eliminar_usuario = document.querySelectorAll('.eliminar_usuario')
const btn_recuperar = document.getElementById('confirmar_recuperacion')
const btn_nueva_contrasena = document.getElementById('btn_nueva_contrasena')


if (btn_crear){
    btn_crear.addEventListener('click', () => {


    const usuario = document.getElementById('usuario').value
    const nombre = document.getElementById("nombre").value
    const apellido = document.getElementById("apellido").value
    const correo = document.getElementById("correo").value
    const celular = document.getElementById("celular").value
    const direccion = document.getElementById("direccion").value
    const fecha_nacimiento = document.getElementById("fecha_nacimiento").value
    const pasword = document.getElementById('pasword').value
    const Pasword_confirmacion = document.getElementById('Pasword_confirmacion').value

    const registro = {
        usuario,
        pasword,
        nombre,
        apellido,
        correo,
        celular,
        direccion,
        fecha_nacimiento,
        Pasword_confirmacion
    }

    const abrir_modal = document.getElementById('abrir_modal')
    const texto_modal = document.getElementById('modal-body')
    

    if (!usuario) {texto_modal.textContent = "Escriba un usuario"; abrir_modal.click(); return false }
    if (!(usuario.length > 6)) {texto_modal.textContent = "El usuario debe tener más de 6 caracteres"; abrir_modal.click(); return false }
    if (!correo) {texto_modal.textContent = "Escriba un correo válido"; abrir_modal.click(); return false }
    if (!pasword) {texto_modal.textContent = "Escriba una contraseña"; abrir_modal.click(); return false }
    if (!Pasword_confirmacion) {texto_modal.textContent = "Confirme la contraseña"; abrir_modal.click(); return false }

    

    if (!/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/i.test(pasword)) {texto_modal.textContent = "La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico."; abrir_modal.click(); return false }

    if (!pasword === Pasword_confirmacion) { abrir_modal.click(); return false }

    

    fetch('/crear', {
        method: 'POST', 
        body: JSON.stringify(registro), 
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => window.location.href = "/user")
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
      
})
}

if (btn_editar){
    btn_editar.addEventListener('click', () => {

    console.log('Entra')

    const usuario = document.getElementById('usuario').value
    const nombre = document.getElementById("nombre").value
    const apellido = document.getElementById("apellido").value
    const correo = document.getElementById("correo").value
    const celular = document.getElementById("celular").value
    const direccion = document.getElementById("direccion").value
    const fecha_nacimiento = document.getElementById("fecha_nacimiento").value
    const clase = document.getElementById("clase").value

    const registro = {
        usuario,
        nombre,
        apellido,
        correo,
        celular,
        direccion,
        fecha_nacimiento,
        clase
    }

    const abrir_modal = document.getElementById('abrir_modal')
    const texto_modal = document.getElementById('modal-body')
    

    if (!usuario) {texto_modal.textContent = "Escriba un usuario"; abrir_modal.click(); return false }
    if (!(usuario.length > 6)) {texto_modal.textContent = "El usuario debe tener más de 6 caracteres"; abrir_modal.click(); return false }
    if (!correo) {texto_modal.textContent = "Escriba un correo válido"; abrir_modal.click(); return false }
    if (!(clase in [0,1,2])) {texto_modal.textContent = "Se requiere una de estas categorias (0, 1, 2)"; abrir_modal.click(); return false }
    
    const url = window.location.href
    const id = url.substring(url.lastIndexOf('/') + 1)

    fetch(`/editar/${id}`, {
        method: "PUT", 
        body: JSON.stringify(registro), 
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => window.location.href = "/editUsers")
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
      
})
}


if (btn_eliminar_usuario) {

    btn_eliminar_usuario.forEach(btn_eliminar => {
        btn_eliminar.addEventListener('click', () => {
            id_usuario = btn_eliminar.getAttribute('id')

            const abrir_modal = document.getElementById('abrir_modal')
            const texto_modal = document.getElementById('modal-body')

            texto_modal.textContent = `Está seguro de eliminar al usuario id:${id_usuario}`
            abrir_modal.click()

            const btn_confirmar_modal = document.getElementById('confirmar_modal')
            
            btn_confirmar_modal.addEventListener('click', () => {
                window.location.href = `/eliminar/${id_usuario}`
            })
            
        
        })
    });

}


if (btn_recuperar) {
    btn_recuperar.addEventListener('click', () => {
        const btn_cerrar_modal = document.getElementById('cerrar_modal')
        const contenedor_login = document.getElementById('login')
        const correo = document.getElementById('correo_recp').value.trim()
        const alerta = document.querySelector('div[role="alert"]')

        if (alerta) {
            alerta.remove()
        }

        const modal_body = document.getElementById('modal-body')

        if (correo.length > 0) {
            if (/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(correo)) {
                contenedor_login.innerHTML = `<div class="alert alert-success" role="alert">
                                                        Correo enviado, revise su bandeja de entrada
                                                </div>` + contenedor_login.innerHTML
                btn_cerrar_modal.click()

                fetch('/recuperar', {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({correo})
                })
                .then(res => res.json())
                .then(result => console.log(result))
                .catch(error => console.log(error))
            } else {
                modal_body.innerHTML  = `<div class="alert alert-danger" role="alert">
                                                Correo invalido
                                        </div>` + modal_body.innerHTML
            }
        } else {
            modal_body.innerHTML  = `<div class="alert alert-danger" role="alert">
                                            Campo de correo vacío
                                    </div>` + modal_body.innerHTML
        }


        
    })
}

if (btn_nueva_contrasena) {
    btn_nueva_contrasena.addEventListener('click', () => {
        console.log('holaaaaaaa');
    })
    
}

function validar_pass() {
    const contraseña = document.getElementById('nueva_contrasena').value
    const confirmar_contraseña = document.getElementById('nueva_confirmar_contrasena').value

    if (!contraseña) return setear_modal(abrir_modal, 'El campo contraseña se encuentra vacío')
    if (!confirmar_contraseña) return setear_modal(abrir_modal, 'El campo confirmar contraseña se encuentra vacío')

    if (!/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/i.test(contraseña)) return setear_modal(abrir_modal, 'La contraseña debe tener minimo 6 caracteres, una mayuscula, una minuscula y un caracter especial')

    if (!(contraseña === confirmar_contraseña)) return setear_modal(abrir_modal, 'Las contraseñas no son iguales')

    return true
}