import os
import cgi
import cgitb; cgitb.enable()
import sys
import mysql.connector
from mysql.connector import errorcode

form = cgi.FieldStorage() 

Username = form.getvalue('username')
Email    = form.getvalue('email')
Password = form.getvalue('password')

print ("Content-Type: text/html")
print("Access-Control-Allow-Methods: POST, GET, OPTIONS")
print("Access-Control-Allow-Headers: Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token")
print ("Access-Control-Allow-Origin: *")

print("<\h2>Welcome, your credentials are as follows Username: %s Email: %s Password: %s </h2>" % (Username, Email, Password))  
print ("""
<html>
<head>
</head>
<body>
""")

try:
    cnx = mysql.connector.connect(user='xxxxxx', password='xxxxxxx', host='127.0.0.1', database='xxxxxxx')
    cursor = cnx.cursor()
    #cursor.execute("INSERT INTO `user_information` (`User_ID`, `Email`, `Username`, `Password`) VALUES (NULL, %s, %s, %s)", (Email, Username, Password))
    cursor.execute("SELECT * FROM  `user_information` LIMIT 0 , 30")
    data = cursor.fetchall()
    print(data)
    cnx.commit()
    cursor.close()
    cnx.close()
except mysql.connector.Error as err:
    print("Something went wrong: {}".format(err))

print ("""
</body>
</html>
""")