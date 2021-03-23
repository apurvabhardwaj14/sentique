from django.http import HttpResponse
from django.shortcuts import render
from .models import Post

# Create your views here.
def home(request):    
    context = {
        'posts': Post.objects.all()
    }
    return render(request, 'blogs/home.html', context)

def about(request):
    return render(request, 'blogs/about.html', {'title': 'About'})