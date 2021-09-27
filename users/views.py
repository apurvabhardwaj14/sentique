from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .forms import UserRegisterForm
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt

from users.twitter import twitter
from users.parseLink import parseLink



def register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            messages.success(
                request, f'Your account has been created! You are now able to log in.')
            return redirect('login')
    else:
        form = UserRegisterForm()
    return render(request, 'users/register.html', {'form': form})


@csrf_exempt
def searchpost(request):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        responseObj = twitter(body['keyword'], 0)
        return JsonResponse(responseObj)


@csrf_exempt
def searchlink(request):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        responseObj = parseLink(body['link'], 0)
        return JsonResponse(responseObj)


@login_required
def profile(request):
    return render(request, 'users/profile.html')


@login_required
def search(request):
    return render(request, 'users/search.html')
