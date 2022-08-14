from cmath import log
import sqlite3
import os

def conexion_bd():
    try:
        conexion = sqlite3.connect(os.path.dirname(os.path.abspath(__file__))+'/basedatos.sqlite')
        return conexion
    except:
        print('Error de conexion bd')

def insertar_usuario(usuario):
    query = "insert into usuarios (usuario, nombre, apellido, correo, celular, direccion, fecha, pasword, super) values ('{}','{}','{}','{}','{}','{}','{}','{}', 0);".format(usuario['usuario'],
                                                usuario['nombre'], 
                                                usuario['apellido'], usuario['correo'], 
                                                usuario['celular'], usuario['direccion'],
                                                usuario['fecha_nacimiento'], usuario['pasword'])

    conexion = conexion_bd()
    cursor = conexion.cursor()
    cursor.execute(query)
    conexion.commit()
    conexion.close()

def obenter_usuario_tabla():
    query = "select id, usuario, nombre, correo, super from usuarios;"
    conexion = conexion_bd()
    cursor = conexion.cursor()
    cursor.execute(query)
    usuarios = cursor.fetchall()
    conexion.commit()
    conexion.close()

    return usuarios

def obenter_usuario_id(id):
    query = "select * from usuarios where id={};".format(id)
    conexion = conexion_bd()
    cursor = conexion.cursor()
    cursor.execute(query)
    usuario = cursor.fetchone()
    conexion.commit()
    conexion.close()
    return usuario

def editar_usuario_id(id, usuario):
    query = "update usuarios set usuario = '{}', nombre = '{}', apellido = '{}', correo = '{}', celular = '{}', direccion = '{}', fecha = '{}', super = {} where id = {};".format(usuario['usuario'], usuario['nombre'], 
                                                usuario['apellido'], usuario['correo'], 
                                                usuario['celular'], usuario['direccion'],
                                                usuario['fecha_nacimiento'], usuario['clase'], id)

    conexion = conexion_bd()
    cursor = conexion.cursor()
    cursor.execute(query)
    conexion.commit()
    conexion.close()

def eliminar_usuario_id(id):
    query = "delete from usuarios where id={}".format(id)
    conexion = conexion_bd()
    cursor = conexion.cursor()
    cursor.execute(query)
    conexion.commit()
    conexion.close()

def obenter_usuario_usuario(usuario):
    query = "select * from usuarios where usuario='{}';".format(usuario)
    conexion = conexion_bd()
    cursor = conexion.cursor()
    cursor.execute(query)
    usuario = cursor.fetchone()
    conexion.commit()
    conexion.close()
    return usuario

def obenter_recuperacion_clave(hash):
    query = "select * from recuperacion where clave='{}';".format(hash)
    conexion = conexion_bd()
    cursor = conexion.cursor()
    cursor.execute(query)
    link = cursor.fetchone()
    conexion.commit()
    conexion.close()
    return link

def editar_usuario_usuario(usuario, nueva_pass):
    query = "update usuarios set pasword = '{}' where usuario = '{}';".format(nueva_pass, usuario)
    conexion = conexion_bd()
    cursor = conexion.cursor()
    cursor.execute(query)
    conexion.commit()
    conexion.close()

def eliminar_recuperacion_clave(hash):
    query = "delete from recuperacion where clave='{}'".format(hash)
    conexion = conexion_bd()
    cursor = conexion.cursor()
    cursor.execute(query)
    conexion.commit()
    conexion.close()