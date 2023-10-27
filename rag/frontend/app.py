from flask import (
    Flask,
    render_template,
    request,
    jsonify,
    Response,
    redirect,
    url_for,
    session
)
from ..backend.rag import RAG
from flask_bcrypt import Bcrypt
import os

rag = RAG()
app = Flask(__name__)

bcrypt = Bcrypt(app)
app.secret_key = os.environ.get("FLASK_SECRET_KEY")
user = os.environ.get("GPTCOTTS_USERNAME")
password = os.environ.get("GPTCOTTS_PASSWORD")
hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")

        if username == user and bcrypt.check_password_hash(hashed_password, password):
            # Password is correct, redirect to a protected route
            session["username"] = username
            return redirect(url_for('index'))
        else:
            return render_template("login.html", error="Invalid username or password")
    return render_template("login.html", error="")


@app.route("/", methods=["GET", "POST"])
def index():
    if 'username' in session:
        return render_template("index.html")
    return redirect(url_for('login'))


@app.route("/rag", methods=["POST"])
def get_model_response() -> Response:

    query = request.json["query"]  # type: ignore
    model_response, chunks = rag.query(query)
    return jsonify({"model_response": model_response, "chunks": chunks})


@app.route("/reset", methods=["POST"])
def reset() -> Response:

    rag.reset_context()
    return jsonify({"status": "success"})


if __name__ == "__main__":
    app.run(debug=True)
