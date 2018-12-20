from django.shortcuts import render
from django.http import HttpResponse
import subprocess
from django.template import loader
import json
import os
from django.views.decorators.csrf import ensure_csrf_cookie


from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from emacs_api.serializers import UserSerializer, DocumentSerializer
from rest_framework.permissions import IsAuthenticated
from emacs_api.models import Document


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    permission_classes = (IsAuthenticated,)
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

class DocumentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows documents to be viewed or edited.
    """
    permission_classes = (IsAuthenticated,)
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    def list(self, request):
        queryset = Document.objects.filter(author=request.user.pk)
        serializer = DocumentSerializer(queryset, many=True)
        return Response(serializer.data)



from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        return Response({'token': token.key, 'id': token.user_id})



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

from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def submit(request):
    if request.method != 'POST':
        return HttpResponse('ERROR')

    org = json.loads(request.body)['org']
    filename = json.loads(request.body)['filename'] + ".org"
    with open(f"/tmp/{filename}", "w") as text_file:
        text_file.write(org)

    stdout = create_pdf(filename)

    return HttpResponse(stdout)


@ensure_csrf_cookie
def index(request):
    template = loader.get_template('static/js/frontend/build/index.html')

    return HttpResponse(template.render({}, request))
