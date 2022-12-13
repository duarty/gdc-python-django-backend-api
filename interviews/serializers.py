import ipdb
from applications.models import Application
from applications.serializers import ApplicationSerializerCreation
from rest_framework import serializers
from users.serializers import UserSerializer

from .models import Interview


class InterviewSerializer(serializers.ModelSerializer):

    application = ApplicationSerializerCreation(read_only=True)

    class Meta:
        model = Interview
        exclude = ["user"]
        read_only_fields = ["id"]

    ...


class InterviewToggleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interview
        fields = "__all__"
        read_only_fields = [
            "id",
            "application",
            "schedule",
            "locations",
        ]

    was_aprooved = serializers.SerializerMethodField(read_only=True)

    def get_was_aprooved(self, obj: Interview) -> bool:
        new_status = obj.toggle_was_approved()
        obj.save()

        return new_status

    ...
