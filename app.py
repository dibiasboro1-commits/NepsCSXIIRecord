"""
Student Management System Backend
Flask + MySQL
"""

from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import mysql.connector
from db import get_db_connection

app = Flask(__name__)
CORS(app)


# =========================
# HOME PAGE
# =========================
@app.route("/")
def home():
    return render_template("index.html")


# =========================
# GET ALL STUDENTS
# =========================
@app.route("/students", methods=["GET"])
def get_all_students():
    conn = get_db_connection()

    if not conn:
        return jsonify({"message": "Database connection failed"}), 500

    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM students")
        students = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify(students)

    except Exception as e:
        return jsonify({"message": str(e)}), 500


# =========================
# GET ONE STUDENT
# =========================
@app.route("/students/<int:roll_no>", methods=["GET"])
def get_student(roll_no):
    conn = get_db_connection()

    if not conn:
        return jsonify({"message": "Database connection failed"}), 500

    try:
        cursor = conn.cursor(dictionary=True)

        cursor.execute(
            "SELECT * FROM students WHERE Roll_No=%s",
            (roll_no,)
        )

        student = cursor.fetchone()

        cursor.close()
        conn.close()

        if student:
            return jsonify(student)

        return jsonify({"message": "Student not found"}), 404

    except Exception as e:
        return jsonify({"message": str(e)}), 500


# =========================
# ADD STUDENT
# =========================
@app.route("/students", methods=["POST"])
def add_student():

    data = request.json
    print("Received data:", data)
    print("Keys:", data.keys() if data else "No data")
    conn = get_db_connection()

    if not conn:
        return jsonify({"message": "Database connection failed"}), 500

    try:
        cursor = conn.cursor()

        sql = """
        INSERT INTO students
        (Roll_No, Name, Class, Section, Marks)
        VALUES (%s,%s,%s,%s,%s)
        """

        values = (
            data["Roll_No"],
            data["Name"],
            data["Class"],
            data["Section"],
            data["Marks"]
        )

        cursor.execute(sql, values)

        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({"message": "Student Added Successfully"})

    except Exception as e:
        return jsonify({"message": str(e)}), 500


# =========================
# UPDATE STUDENT
# =========================
@app.route("/students/<int:roll_no>", methods=["PUT"])
def update_student(roll_no):

    data = request.json
    print(data)
    print(data.keys())
    conn = get_db_connection()

    if not conn:
        return jsonify({"message": "Database connection failed"}), 500

    try:
        cursor = conn.cursor()

        sql = """
        UPDATE students
        SET Name=%s,
            Class=%s,
            Section=%s,
            Marks=%s
        WHERE Roll_No=%s
        """

        values = (
            data["Name"],
            data["Class"],
            data["Section"],
            data["Marks"],
            roll_no
        )

        cursor.execute(sql, values)

        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({"message": "Student Updated Successfully"})

    except Exception as e:
        return jsonify({"message": str(e)}), 500


# =========================
# DELETE STUDENT
# =========================
@app.route("/students/<int:roll_no>", methods=["DELETE"])
def delete_student(roll_no):

    conn = get_db_connection()

    if not conn:
        return jsonify({"message": "Database connection failed"}), 500

    try:
        cursor = conn.cursor()

        cursor.execute(
            "DELETE FROM students WHERE Roll_No=%s",
            (roll_no,)
        )

        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({"message": "Student Deleted Successfully"})

    except Exception as e:
        return jsonify({"message": str(e)}), 500


# =========================
# RUN APP
# =========================
if __name__ == "__main__":
    app.run(debug=True)