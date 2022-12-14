#from crypt import methods
import os
from flask import Flask, redirect, render_template, request, jsonify, session
import db.scripts as scripts
from werkzeug.security import generate_password_hash, check_password_hash
import re 
import json
import uuid
import mensaje


app = Flask(__name__)

app.secret_key = os.urandom(24)


@app.before_request
def before_request():
    if 'user' not in session and request.endpoint in ['super_menu']:
        return redirect('/')
  
    elif 'user' not in session and request.endpoint in ['room']:
        return redirect('/')



@app.route('/', methods=['GET','POST'])
def inicio():
    if request.method == 'GET': 
        return render_template('index.html')
    else:
        if request.form.get('ingresar') == 'Ingresar':
            return redirect('/user')
        else: 
            return redirect('/')


@app.route('/login', methods=['GET','POST'])
def login():
    if request.method == 'GET': 
        return render_template( 'user.html')
    else: 
         return redirect('/')


@app.route('/user', methods=['GET','POST'])
def usuario():
    if request.method == 'GET': 
        category=""
        return render_template('user.html', category=category)
    else:
        if request.form.get('accion') == 'Ingresar':
            usuario = request.form.to_dict(flat=True)
            if (usuario["usuario"]) and (usuario["clave"]):
                try:
                    data= scripts.obenter_usuario_usuario(usuario["usuario"])
                    if check_password_hash(data[8], usuario["clave"]):
                        session["user"]=data
                        if session["user"][9] == 1:
                            return redirect('/super')
                        else:    
                             return redirect('/room')
                    else:
                        category="error"
                        return render_template('user.html', category=category)
                except:
                    category="error"
                    return render_template('user.html', category=category)                    

            else:
                category="error"
                return render_template('user.html', category=category)
        elif request.form.get('accion') == 'Registrarse':
            return redirect('/user_registrarse')
        elif request.form.get('accion') == 'Recuperar contrase??a':
            return redirect('/')      
        else: 
            return redirect('/user')

@app.route('/room', methods=['GET','POST'])
def room():
    if request.method == 'GET': 
        return render_template( 'room.html')
    else: 
         return redirect('/')

@app.route('/user_registrarse')
def registrarse():
    return render_template( 'user_registrarse.html')


@app.route('/crear', methods=['POST'])
def crear():
    usuario = json.loads(request.data.decode("utf-8"))
    valid = validaciones_registro(usuario)
    if valid:
        usuario["pasword"]= generate_password_hash(usuario["pasword"])
        usuario.pop("Pasword_confirmacion")
        scripts.insertar_usuario(usuario)
        return redirect('/user')
    else:
        return redirect('/user_registrarse')

@app.route('/crearHabitacion', methods=['POST'])
def crearHabitacion():
    try:
        super = session["user"][9]
        if super == 1:    
            habitacion = json.loads(request.data.decode("utf-8"))
            scripts.insertar_habitacion(habitacion)
            print (habitacion)
            return redirect('/Create_room')
        else: 
            return redirect('/') 
    except:
        return redirect('/') 

def validaciones_registro(registro):
    user = registro['usuario']
    password = registro['pasword']
    confirm_pass = registro['Pasword_confirmacion']

    if not(len(user) > 6):
        return False

    regEx = re.compile(r'^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$')
    if not(regEx.match(password)):
        return False

    if not(password == confirm_pass):
        return False

    return True


@app.route('/super', methods=['GET','POST'])
def super_menu():
    try:
        super = session["user"][9]
        if (super == 1) or (super == 2):
            if request.method == 'GET': 
                    return render_template('super.html', super=super)
            else:
                if request.form.get('accion') == 'Editar Usuarios':
                    return redirect('/editUsers')  
                elif request.form.get('accion') == 'Editar Habitaciones':
                    return redirect('/editRoom') 
                else:
                    return redirect('/super')  
        else: 
            return redirect('/') 
    except:
        return redirect('/') 


@app.route('/editUsers', methods=['GET','POST'])
def super_editar_usuarios():
    try:
        super = session["user"][9]
        if (super == 1) or (super == 2):
            if request.method == 'GET':    
                    usuarios = scripts.obenter_usuario_tabla()
                    return render_template('editUsers.html', usuarios=usuarios)
            else:
                return redirect('/super')  
        else: 
            return redirect('/') 
    except:
        return redirect('/')

@app.route('/ver/<int:id>')
def ver(id):
    try:
        super = session["user"][9]
        if (super == 1) or (super == 2):    
            usuario = scripts.obenter_usuario_id(id)
            return render_template('ver.html', usuario=usuario)
        else: 
            return redirect('/') 
    except:
        return redirect('/')

@app.route('/editar/<int:id>', methods=['GET','PUT'])
def editar(id):
    try:
        super = session["user"][9]
        if super == 1:       
            if request.method == 'GET':
                usuario = scripts.obenter_usuario_id(id)
                return render_template('editar.html', usuario=usuario)
            else:
                usuario = json.loads(request.data.decode("utf-8"))
                print("PUT")
                scripts.editar_usuario_id(id, usuario)
                return '/editUsers'
        elif super == 2:
            return '/editUsers'
        else: 
            return redirect('/') 
    except:
        return redirect('/')         

@app.route('/eliminar/<int:id>')
def eliminar(id):
    try:
        super = session["user"][9]
        if super == 1:      
            scripts.eliminar_usuario_id(id)
            return redirect('/editUsers')
        else: 
            return redirect('/') 
    except:
        return redirect('/') 

@app.route('/eliminarRoom/<int:id>')
def eliminar_habitacion(id):
    try:
        super = session["user"][9]
        if (super == 1) or (super == 2):    
            scripts.eliminar_habitacion_id(id)
            return redirect('/Create_room')
        else: 
            return redirect('/') 
    except:
        return redirect('/') 

@app.route('/editRoom', methods=['GET','POST'])
def super_editar_habitaciones():
    try:
        super = session["user"][9]
        if (super == 1) or (super == 2):
            if request.method == 'GET': 
                    return redirect('/Create_room')
            else:
                return redirect('/super')  
        else: 
            return redirect('/') 
    except:
        return redirect('/')                         

@app.route('/Create_room', methods = ['GET', 'POST'])
def super_crear_habitaciones():
    try:
        super = session["user"][9]
        if (super == 1) or (super == 2):    
            if request.method == 'GET':
                rooms = scripts.obtener_habitaciones_tabla()
                return render_template('Create_room.html',rooms=rooms)
            else:
                return render_template('/')
        else: 
            return redirect('/') 
    except:
        return redirect('/')      

@app.route('/CrearRoom', methods=['GET','POST'])
def formroom():
    try:
        super = session["user"][9]
        if super == 1:       
            if request.method == 'GET': 
                return render_template('CrearRoom.html')
            else:
                return redirect('/')
        else: 
            return redirect('/') 
    except:
        return redirect('/')  

@app.route('/recuperar', methods=['POST'])
def recuperar():
    correo = json.loads(request.data.decode("utf-8"))
    usuario = scripts.obenter_usuario_correo(correo["correo"])
    recuperacion = scripts.obenter_recuperacion_id(usuario[0])
    if recuperacion:
        scripts.eliminar_recuperacion_clave(recuperacion[3])

    if usuario:
        hash = uuid.uuid4().hex
        scripts.insertar_hash(usuario[0], correo["correo"], hash)
        mensaje.correo(correo["correo"], request.url_root +'crear_nueva_contrasena/'+hash)
        return jsonify({'mensaje': hash})
    
    return jsonify({'mensaje': 'error'})


@app.route('/crear_nueva_contrasena/<string:hash>', methods=['GET', 'POST'])
def crear_nueva_contrasena(hash):
    link = scripts.obenter_recuperacion_clave(hash)
    if link:
        if request.method == 'GET':
            return render_template('cambiarContrase??a.html')
        else:
            nueva_pass = json.loads(request.data.decode("utf-8"))
            id = link[1]
            nueva_pass['contrasena'] = generate_password_hash(nueva_pass['contrase??a'])

            scripts.editar_usuario_contrase??a(id, nueva_pass['contrasena'])
            scripts.eliminar_recuperacion_clave(hash)

            return redirect('/')
    else:
        return 'Hash invalido'

@app.route('/cerrar')
def cerrar_sesion():
    session.pop('usuario', None)
    return redirect('/')

@app.route('/validar_usuario', methods=['PUT'])
def validar_usuario():
    usuario = json.loads(request.data.decode("utf-8"))
    try:
        session=scripts.obenter_usuario_usuario(usuario["usuario"])
        if (session):
            return jsonify({'mensaje': True})
        else:
            return jsonify({'mensaje': False})
    except:
        return jsonify({'mensaje': False})

@app.route('/validar_correo', methods=['PUT'])
def validar_correo():
    usuario = json.loads(request.data.decode("utf-8"))
    try:
        session=scripts.obenter_usuario_correo(usuario["correo"])
        if (session):
            return jsonify({'mensaje': True})
        else:
            return jsonify({'mensaje': False})
    except:
        return jsonify({'mensaje': False})