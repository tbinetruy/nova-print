from django.shortcuts import render
from django.http import HttpResponse
import subprocess
from django.template import loader
import json

def create_pdf():

    cmd = "cd /tmp && emacs output.org --batch --eval '(progn (load-file \"~/.emacs.d/nova-print/main.el\")(nova-print//export))' --kill"
    sp = subprocess.Popen(cmd, stdout=subprocess.PIPE, shell=True)
    stdout = sp.communicate()[0]
    return stdout

def submit(request):
    if request.method != 'POST':
        return HttpResponse('ERROR')

    org = json.loads(request.body)['org']
    filename = "output.org"
    with open(f"/tmp/{filename}", "w") as text_file:
        text_file.write(org)

    stdout = create_pdf()

    return HttpResponse(stdout)


def index(request):
    template = loader.get_template('emacs_api/index.html')

    return HttpResponse(template.render({}, request))
