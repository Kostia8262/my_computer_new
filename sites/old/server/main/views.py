import json
from django.http import FileResponse, Http404
from django.shortcuts import render, HttpResponse, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Course
from .serializers import CourseSerializer

# Create your views here.

# Nested relations (themes->paragraphs, specs, levels->specs) each pulled a
# separate query per course with no prefetch, so list endpoints multiplied
# queries with catalog size.
COURSE_PREFETCH = ('themes__paragraphs', 'specs', 'levels__specs')


@api_view(['GET'])
def index(request):
    courses = Course.objects.filter(demo=False, is_active=True).prefetch_related(*COURSE_PREFETCH)
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def demo(request):
    courses = Course.objects.filter(demo=True).prefetch_related(*COURSE_PREFETCH)
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def course(request, id):
    course = get_object_or_404(
        Course.objects.prefetch_related(*COURSE_PREFETCH),
        id=id, demo=False, is_active=True,
    )
    serializer = CourseSerializer(course)
    return Response(serializer.data)


@api_view(['GET'])
def download_programm(request, id):
    course = get_object_or_404(Course, id=id, demo=False, is_active=True)
    if not course.programm:
        raise Http404('No programm file for this course.')
    try:
        # .path (filesystem path), not .url (a "/media/..." web path) —
        # opening the latter directly only worked by coincidence when the
        # process's cwd happened to match MEDIA_ROOT's parent.
        file_handle = open(course.programm.path, 'rb')
    except (FileNotFoundError, ValueError):
        raise Http404('Programm file is missing on disk.')
    response = FileResponse(file_handle)
    file_name = course.programm.name.rsplit('/', 1)[-1]
    response['Content-Type'] = 'application/pdf'
    response['Content-Disposition'] = f'attachment; filename="{file_name}"'
    return response


