from email.mime.text import MIMEText
from smtplib import SMTP

def correo(correo, mensaje):
 from_address = "mintic2022.grupo4@gmail.com"
 to_address = correo
 message = "Para recuperar la contraseña seguir este enlace: " + mensaje
 mime_message = MIMEText(message)
 mime_message["From"] = from_address
 mime_message["To"] = to_address
 mime_message["Subject"] = "Correo recuperación contraseña"
 smtp = SMTP("smtp.gmail.com", 587)
 smtp.ehlo()
 smtp.starttls()
 smtp.ehlo()
 smtp.login(from_address, "obglpuhjypxboaoe")
 smtp.sendmail(from_address, to_address, mime_message.as_string())
 smtp.quit()
 
if __name__ == "__main__":
 correo()