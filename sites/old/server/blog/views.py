from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Post
from .serializers import PostSerializer
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404


@api_view(['GET', 'POST'])
def posts(request):
    if request.method == 'GET':
        posts = Post.objects.filter(is_published=True)
        serializer = PostSerializer(posts, many=True, context={
                                    'request': request})
        return Response(serializer.data)
    elif request.method == 'POST':
        if not request.user.is_authenticated:
            return Response({'detail': 'Authentication required.'}, status=status.HTTP_401_UNAUTHORIZED)
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def post_detail(request, post_id):
    post = get_object_or_404(Post, pk=post_id)

    if not post.is_published:
        return Response({'detail': 'Post is not published.'}, status=status.HTTP_403_FORBIDDEN)

    if request.method == 'GET':
        serializer = PostSerializer(post, context={
                                    'request': request})
        return Response(serializer.data)
    elif request.method == 'PUT':
        if not request.user.is_authenticated:
            return Response({'detail': 'Authentication required.'}, status=status.HTTP_401_UNAUTHORIZED)
        serializer = PostSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        if not request.user.is_authenticated:
            return Response({'detail': 'Authentication required.'}, status=status.HTTP_401_UNAUTHORIZED)
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
