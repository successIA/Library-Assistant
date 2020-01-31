from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from books import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('books.urls')),
    path('admin/books', views.AdminBookList.as_view()),
    path('admin/books/<int:pk>', views.AdminBookDetail.as_view(), name='admin-book-detail'),
    path('books/', include('books.urls')),
    path('auth/', include('accounts.urls')),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
