from django.shortcuts import render
from django.http import HttpResponse
import subprocess
from django.template import loader


def submit(request):
    cmd = "ls -la ."
    sp = subprocess.Popen(cmd, stdout=subprocess.PIPE, shell=True)
    stdout = sp.communicate()[0]

    return HttpResponse(stdout)

def index(request):
    cmd = "ls -la ."
    sp = subprocess.Popen(cmd, stdout=subprocess.PIPE, shell=True)
    stdout = sp.communicate()[0]
    template = loader.get_template('emacs_api/index.html')


    return HttpResponse(template.render({}, request))
