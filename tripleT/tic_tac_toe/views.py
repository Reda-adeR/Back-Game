from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.template import loader
import json

def index(request):
    temp = loader.get_template("tic_tac_toe/index.html")
    return HttpResponse(temp.render({}, request))
# Create your views here.
def home(request):
    if request.method == "POST":
        data = json.loads(request.body)
        print(data.get('action'))
        return JsonResponse({"message":"hello world"})
        # print("here")
    else:
        temp = loader.get_template("tic_tac_toe/home.html")
        return HttpResponse(temp.render({}, request))