
from django.contrib import admin
from django.urls import path

from books import views

urlpatterns = [
    path('', views.BookList.as_view()),
    path('<int:pk>', views.BookDetail.as_view(), name='book-detail'),
]
