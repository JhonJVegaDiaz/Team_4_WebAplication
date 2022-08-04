import os
from flask import Flask, redirect, render_template, request



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
            return redirect('/room')
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


