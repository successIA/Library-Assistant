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
        write_only_fields = ['password']

    def create(self, validated_data):
        username = validated_data['username']
        email = validated_data['email']
        password = validated_data['password']
        user = User.objects.create_user(username, email, password)
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")
