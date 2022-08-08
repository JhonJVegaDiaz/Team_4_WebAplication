from cmath import log
import sqlite3

def conexion_bd():
    try:
        conexion = sqlite3.connect('db/basedatos.sqlite')
        return conexion
    except:
        print('Error de conexion bd')

def insertar_usuario(usuario):
    query = "insert into usuarios (usuario, nombre, apellido, correo, celular, direccion, fecha, pasword, super, pregunta, respuesta) values ('{}','{}','{}','{}','{}','{}','{}','{}', 0,'{}','{}');".format(usuario['usuario'],
                                                usuario['nombre'], 
                                                usuario['apellido'], usuario['correo'], 
                                                usuario['celular'], usuario['direccion'],
                                                usuario['fecha_nacimiento'], usuario['pasword'],
                                                usuario['pregunta'], usuario['respuesta'])

    conexion = conexion_bd()
    cursor = conexion.cursor()
    cursor.execute(query)
    conexion.commit()
    conexion.close()

def obenter_usuario_tabla():
    query = "select id, nombre, correo, fecha from usuarios;"
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
    query = "update usuarios set usuario = '{}', nombre = '{}', apellido = '{}', correo = '{}', celular = '{}', direccion = '{}', fecha = '{}' where id = {};".format(usuario['cedula'], usuario['nombre'], 
                                                usuario['apellido'], usuario['correo'], 
                                                usuario['celular'], usuario['direccion'],
                                                usuario['fecha_nacimiento'], id)

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
    print(query)
    conexion = conexion_bd()
    cursor = conexion.cursor()
    cursor.execute(query)
    usuario = cursor.fetchone()
    conexion.commit()
    conexion.close()

    return usuario