import mysql.connector

def get_db_connection():
    print("Password =", repr("Nova@Cloud7Sun"))

    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="Nova@Cloud7Sun",
        database="School"
    )