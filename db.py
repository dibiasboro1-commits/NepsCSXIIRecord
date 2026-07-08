import mysql.connector

def get_db_connection():
    print("Password =", repr("Nova@Cloud7Sun"))

    return mysql.connector.connect(
        host="gateway01.ap-southeast-1.prod.aws.tidbcloud.com",
        user="3CtSNVW5UEePkaK.root",
        password="70TFN2qVnkl909PF",
        database="sys"
    )