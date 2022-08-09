import os
from flask import Flask, redirect, render_template, request, jsonify, session
import db.scripts as scripts


app = Flask(__name__)

app.secret_key = os.urandom(24)

@app.route('/', methods=['GET','POST'])
def inicio():
    if request.method == 'GET': 
        return render_template('index.html')
    else:
        if request.form.get('ingresar') == 'Ingresar':
            return redirect('/user')
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
            if (usuario["usuario"]):
                try:
                    session["user"]= scripts.obenter_usuario_usuario(usuario["usuario"])
                    if (usuario["clave"]):
                        if session["user"][8] == usuario["clave"]:
                            if session["user"][9] == 1:
                                return redirect('/super')
                            else:    
                                return redirect('/room')
                        else:
                            category="error"
                            return render_template('user.html', category=category)

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
        elif request.form.get('accion') == 'Recuperar contraseña':
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
    usuario = request.form.to_dict(flat=True)
    usuario.pop("Pasword_confirmacion")
    scripts.insertar_usuario(usuario)
    return redirect('/user')

@app.route('/login', methods=['GET','POST'])
def login():
    if request.method == 'GET': 
        return render_template( 'user.html')
    else: 
         return redirect('/')

@app.route('/super', methods=['GET','POST'])
def super_menu():
    try:
        super = session["user"][9]
        if super == 1:
            if request.method == 'GET': 
                
                    return render_template('super.html', super=super)

            else:
                if request.form.get('accion') == 'Ingresar':
                    return redirect('/')  
        else: 
            return redirect('/') 
    except:
        return redirect('/')           

