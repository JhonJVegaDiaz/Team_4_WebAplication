from email.mime.text import MIMEText
from smtplib import SMTP

def correo():
 from_address = "mintic2022.grupo4@gmail.com"
 to_address = "mintic2022.grupo4@gmail.com"
 message = "Mensaje enviado desde python"
 mime_message = MIMEText(message)
 mime_message["From"] = from_address
 mime_message["To"] = to_address
 mime_message["Subject"] = "Correo de prueba"
 smtp = SMTP("smtp.gmail.com", 587)
 smtp.ehlo()
 smtp.starttls()
 smtp.ehlo()
 smtp.login(from_address, "obglpuhjypxboaoe")
 smtp.sendmail(from_address, to_address, mime_message.as_string())
 smtp.quit()
 
if __name__ == "__main__":
 correo()