
from .serializers import BookSerializer
from .models import Book
from rest_framework import generics, filters
from rest_framework.parsers import MultiPartParser, FormParser


class BookList(generics.ListCreateAPIView):
    # parser_classes = [MultiPartParser, FormParser]
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["title"]


class BookDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
