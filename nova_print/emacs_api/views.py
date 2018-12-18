from django.shortcuts import render
from django.http import HttpResponse
import subprocess
from django.template import loader
import json
import os
from django.views.decorators.csrf import ensure_csrf_cookie

def create_pdf(filename):
    cmd = f"cd /tmp && emacs {filename} --batch --eval '(progn (load-file \"~/.emacs.d/nova-print/main.el\")(nova-print//export))' --kill"
    sp = subprocess.Popen(cmd, stdout=subprocess.PIPE, shell=True)
    stdout = sp.communicate()[0]

    target_path = os.environ.get(
        'nova_print_pdf_target_dir',
        '/home/thomas/nova-print/nova_print/static_root'
        )
    pdfname = filename.split('.')[0] + '.pdf'
    cmd = f"cp /tmp/exports/{pdfname} {target_path}"
    sp = subprocess.Popen(cmd, stdout=subprocess.PIPE, shell=True)

    return stdout

def submit(request):
    if request.method != 'POST':
        return HttpResponse('ERROR')

    org = json.loads(request.body)['org']
    filename = "output.org"
    with open(f"/tmp/{filename}", "w") as text_file:
        text_file.write(org)

    stdout = create_pdf(filename)

    return HttpResponse(stdout)


@ensure_csrf_cookie
def index(request):
    template = loader.get_template('emacs_api/index.html')

    return HttpResponse(template.render({}, request))
