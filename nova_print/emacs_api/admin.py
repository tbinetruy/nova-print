from django.contrib import admin
from emacs_api.models import Document, Figure

# Register your models here.

class DocumentAdmin(admin.ModelAdmin):
    pass

class FigureAdmin(admin.ModelAdmin):
    pass

admin.site.register(Document, DocumentAdmin)
admin.site.register(Figure, FigureAdmin)
