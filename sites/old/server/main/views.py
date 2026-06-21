import json
from django.http import FileResponse
from django.shortcuts import render, HttpResponse, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Course
from .serializers import CourseSerializer

# Create your views here.


@api_view(['GET'])
def index(request):
    courses = Course.objects.filter(demo=False, is_active=True)
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def demo(request):
    courses = Course.objects.filter(demo=True)
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def course(request, id):
    course = get_object_or_404(Course, id=id, demo=False, is_active=True)
    serializer = CourseSerializer(course)
    return Response(serializer.data)

# @api_view(['GET'])


def download_programm(request, id):
    course = get_object_or_404(Course, id=id, demo=False, is_active=True)
    file_path = course.programm.url[1:]
    response = FileResponse(open(file_path, 'rb'))
    file_name = file_path[file_path.rfind('/')+1:]
    response['Content-Type'] = 'application/pdf'
    response['Content-Disposition'] = f'attachment; filename="{file_name}"'
    return response


