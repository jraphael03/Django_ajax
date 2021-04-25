from django import forms
from .models import Post

class PostForm(forms.ModelForm):

    # manipulate the way the form looks
    # title = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control'}))
    # body = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control', 'rows': 3}))

    class Meta:
        model = Post    # Model we are using
        fields = ('title', 'body',)

