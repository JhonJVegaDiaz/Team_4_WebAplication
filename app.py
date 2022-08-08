import os
from flask import Flask, redirect, render_template, request, jsonify
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
        return render_template('user.html')
    else:
        if request.form.get('accion') == 'Ingresar':
            return redirect('/room')
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

