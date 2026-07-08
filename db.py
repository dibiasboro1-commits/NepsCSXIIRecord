import mysql.connector

def get_db_connection():
    return mysql.connector.connect(
        host="gateway01.ap-southeast-1.prod.aws.tidbcloud.com",
        
        user="3CtSNVW5UEePkaK.root",
        password="cn5hmISK8UCGm4qD",
        database="School",
        port=4000,
        ssl_verify_cert=True,
        ssl_ca="isrgrootx1.pem"
    )