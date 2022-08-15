const btn_crear = document.getElementById('btn_crear')
const btn_editar = document.getElementById('btn_editar')
const btn_eliminar_usuario = document.querySelectorAll('.eliminar_usuario')
const btn_eliminar_habitacion = document.querySelectorAll('.eliminar_habitacion')
const btn_recuperar = document.getElementById('confirmar_recuperacion')
const btn_nueva_contrasena = document.getElementById('btn_nueva_contrasena')
const btn_crear_room = document.getElementById('register_room')
const campo_usuario= document.getElementById("usuario")
const campo_correo= document.getElementById("correo")

if (btn_crear_room) {
    btn_crear_room.addEventListener('click', (e) => {
        e.preventDefault();
        const tipo = document.getElementById('tipo').value
        const precio = document.getElementById('precio').value
        const estado = document.getElementById('estado').value

        const registrarHabitacion = {
            tipo,
            precio,
            estado
        }
        fetch('/crearHabitacion', {
            method: 'POST',
            body: JSON.stringify(registrarHabitacion),
            headers: {
                'Content-Type': 'application/json'
            }
        
        }).then(res => window.location.href = "/Create_room")
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));

})
}


if (btn_crear) {
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


        if (!usuario) { texto_modal.textContent = "Escriba un usuario"; abrir_modal.click(); return false }
        if (!(usuario.length > 6)) { texto_modal.textContent = "El usuario debe tener más de 6 caracteres"; abrir_modal.click(); return false }
        if (!correo) { texto_modal.textContent = "Escriba un correo válido"; abrir_modal.click(); return false }
        if (!pasword) { texto_modal.textContent = "Escriba una contraseña"; abrir_modal.click(); return false }
        if (!Pasword_confirmacion) { texto_modal.textContent = "Confirme la contraseña"; abrir_modal.click(); return false }

        if (!/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(correo)){ texto_modal.textContent = "Escribir un correo válido"; abrir_modal.click(); return false }

        if (!/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/i.test(pasword)) { texto_modal.textContent = "La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico."; abrir_modal.click(); return false }

        if (!(pasword === Pasword_confirmacion)) { texto_modal.textContent = 'Las contraseñas no son iguales'; abrir_modal.click(); return false }

        if (usuario.length >= 6) {
            const registro1 = { usuario }
            fetch('/validar_usuario', {
                method: 'PUT',
                body: JSON.stringify(registro1),
                headers: {
                    'Content-Type': 'application/json'
                }
            
            }).then(function (response) {
                return response.json();
            }).then(function (text) {
             if (text.mensaje){
                texto_modal.textContent = "Usuario repetido, cambiar usuario"; abrir_modal.click(); return false
                }})                        
        }

        if (correo) {
            const registro2 = { correo }
            fetch('/validar_correo', {
                method: 'PUT',
                body: JSON.stringify(registro2),
                headers: {
                    'Content-Type': 'application/json'
                }
            
            }).then(function (response) {
                return response.json();
            }).then(function (text) {
             if (text.mensaje){
                texto_modal.textContent = "El correo ya está inscrito, cambiar correo"; abrir_modal.click(); return false
                }})}


        fetch('/crear', {
            method: 'POST',
            body: JSON.stringify(registro),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => window.location.href = "/user")
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));

    })
}

if (btn_editar) {
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


        if (!usuario) { texto_modal.textContent = "Escriba un usuario"; abrir_modal.click(); return false }
        if (!(usuario.length > 6)) { texto_modal.textContent = "El usuario debe tener más de 6 caracteres"; abrir_modal.click(); return false }
        if (!correo) { texto_modal.textContent = "Escriba un correo válido"; abrir_modal.click(); return false }
        if (!(clase in [0, 1, 2])) { texto_modal.textContent = "Se requiere una de estas categorias (0, 1, 2)"; abrir_modal.click(); return false }

        const url = window.location.href
        const id = url.substring(url.lastIndexOf('/') + 1)

        fetch(`/editar/${id}`, {
            method: "PUT",
            body: JSON.stringify(registro),
            headers: {
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


if (btn_eliminar_habitacion) {

    btn_eliminar_habitacion.forEach(btn_eliminar => {
        btn_eliminar.addEventListener('click', () => {
            id_usuario = btn_eliminar.getAttribute('id')

            const abrir_modal = document.getElementById('abrir_modal')
            const texto_modal = document.getElementById('modal-body')

            texto_modal.textContent = `Está seguro de eliminar la habitación id:${id_usuario}`
            abrir_modal.click()

            const btn_confirmar_modal = document.getElementById('confirmar_modal')

            btn_confirmar_modal.addEventListener('click', () => {
                window.location.href = `/eliminarRoom/${id_usuario}`
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
                    body: JSON.stringify({ correo })
                })
                    .then(res => res.json())
                    .then(result => console.log(result))
                    .catch(error => console.log(error))
            } else {
                modal_body.innerHTML = `<div class="alert alert-danger" role="alert">
                                                Correo invalido
                                        </div>` + modal_body.innerHTML
            }
        } else {
            modal_body.innerHTML = `<div class="alert alert-danger" role="alert">
                                            Campo de correo vacío
                                    </div>` + modal_body.innerHTML
        }



    })
}

if (btn_nueva_contrasena) {

    btn_nueva_contrasena.addEventListener('click', () => {

        const contraseña = document.getElementById('nueva_contrasena').value
        const confirmar_contraseña = document.getElementById('nueva_confirmar_contrasena').value
        const abrir_modal = document.getElementById('abrir_modal')
        const texto_modal = document.getElementById('modal-body')

        if (!contraseña) { texto_modal.textContent = "Escriba una contraseña"; abrir_modal.click(); return false }
        if (!confirmar_contraseña) { texto_modal.textContent = "Confirme la contraseña"; abrir_modal.click(); return false }
        if (!/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/i.test(contraseña)) { texto_modal.textContent = "La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico."; abrir_modal.click(); return false }
        if (!(contraseña === confirmar_contraseña)) { texto_modal.textContent = 'Las contraseñas no son iguales'; abrir_modal.click(); return false }

        const url = window.location.href
        const registro = { contraseña }

        fetch(url, {
            method: "POST",
            body: JSON.stringify(registro),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => window.location.href = "/")
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));

    })
}

if (campo_usuario){
    campo_usuario.addEventListener('change', () => {

        const abrir_modal = document.getElementById('abrir_modal')
        const texto_modal = document.getElementById('modal-body')
        const usuario = campo_usuario.value

        if (usuario.length > 6) {
            const contenedor = document.getElementById('registrar')
            const registro = { usuario }
            fetch('/validar_usuario', {
                method: 'PUT',
                body: JSON.stringify(registro),
                headers: {
                    'Content-Type': 'application/json'
                }
            
            }).then(function (response) {
                return response.json();
            }).then(function (text) {
             if (text.mensaje){
                texto_modal.textContent = "Usuario repetido, cambiar usuario"; abrir_modal.click()
                }}).catch(error => console.error('Error:', error))
                .then(response => console.log('Success:', response));
        
        }
    } )

}

if (campo_correo){
    campo_correo.addEventListener('change', () => {

        const abrir_modal = document.getElementById('abrir_modal')
        const texto_modal = document.getElementById('modal-body')
        const correo = campo_correo.value

        if (/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(correo)) {
            const registro = { correo }
            fetch('/validar_correo', {
                method: 'PUT',
                body: JSON.stringify(registro),
                headers: {
                    'Content-Type': 'application/json'
                }
            
            }).then(function (response) {
                return response.json();
            }).then(function (text) {
             if (text.mensaje){
                texto_modal.textContent = "El correo ya está inscrito, cambiar correo"; abrir_modal.click()
                }}).catch(error => console.error('Error:', error))
                .then(response => console.log('Success:', response));
        
        }
    } )

}