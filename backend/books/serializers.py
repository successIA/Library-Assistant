from rest_framework import serializers
from math import ceil

from .models import Book


class BookSerializer(serializers.HyperlinkedModelSerializer):
    page_num = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = ['id', 'title', 'publisher', 'author',
                  'description', 'num_of_pages', 'image', 'page_num', 'url']

    def get_page_num(self, obj):
        position = 0
        for book in Book.objects.all():
            position = position + 1
            if book.id == obj.id:
                break
        return ceil(position / 3)
