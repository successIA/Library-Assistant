from rest_framework import serializers
# from django.contrib.auth import get_user_model
from django.contrib.auth.models import User

from django.contrib.auth import authenticate
from books.models import Book


class UserSerializer(serializers.ModelSerializer):
    book_count = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['username', 'email', 'book_count']

    def get_book_count(self, obj):
        return Book.objects.all().count()


class RegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'password', 'email']

    def create(self, validated_data):
        username = validated_data['username']
        email = validated_data['email']
        password = validated_data['password']
        user = User.objects.create_user(
            username, email, password
        )
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        # **data is the same as username, password being passed as
        # keyword arguments to authenticate method
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")
