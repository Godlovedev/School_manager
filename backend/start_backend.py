import os
import subprocess
import sys

venv_python = os.path.join("env", "Scripts", "python.exe")  # sur Windows
manage_py = os.path.join("manage.py")

subprocess.Popen([venv_python, manage_py, "runserver", "127.0.0.1:8000"])