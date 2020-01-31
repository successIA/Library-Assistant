from django.db import models


class Book(models.Model):
    title = models.CharField(max_length=256)
    publisher = models.CharField(max_length=64, blank=True)
    author = models.CharField(max_length=32, blank=True)
    description = models.TextField(blank=True)
    num_of_pages = models.PositiveIntegerField(default=0)
    image = models.ImageField(blank=True)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
