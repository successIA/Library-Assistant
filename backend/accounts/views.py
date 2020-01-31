from django.contrib.auth.models import User
from rest_framework import generics, permissions
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.views import APIView
from .serializers import (
    RegisterSerializer, UserSerializer, LoginSerializer
)


class RegisterAPIView(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        print("data", request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = Token.objects.create(user=user)
        data = {
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token.key
        }
        return Response(data, status=HTTP_200_OK)


class UserDetailAPIView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        return self.request.user


class LogoutAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        print("request", dir(request))
        request.user.auth_token.delete()
        return Response(status=HTTP_200_OK)


class LoginAPIView(generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        # validate the post data with LoginSerializer
        serializer = self.get_serializer(data=request.data)

        # raise_exception=True causes the serializer to raise
        # a serializers.ValidationError which would then lead to
        # a HTTP 400 Bad Request response by default
        # https://www.django-rest-framework.org/api-guide/serializers/#validation
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        # Data should be returned with the same serializer used in the
        # RegusterAPIView in order to maintain consistency.
        user_serializer = UserSerializer(user)
        token, created = Token.objects.get_or_create(user=user)
        data = {
            "user": user_serializer.data,
            "token": token.key
        }
        return Response(data)
