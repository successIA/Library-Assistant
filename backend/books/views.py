
from .serializers import BookSerializer
from .models import Book
from rest_framework import generics, filters
from rest_framework.parsers import MultiPartParser, FormParser

from rest_framework.permissions import IsAuthenticated, AllowAny


class AdminBookList(generics.ListCreateAPIView):
    # parser_classes = [MultiPartParser, FormParser]
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["title"]
    # permission_classes = [IsAuthenticated]


class AdminBookDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated]


class BookList(generics.ListAPIView):
    # parser_classes = [MultiPartParser, FormParser]
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["title"]


class BookDetail(generics.RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
