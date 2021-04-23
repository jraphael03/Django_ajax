from django.shortcuts import render
from .models import Post
from django.http import JsonResponse

# GET all posts
def post_list_and_create(request):
    qs = Post.objects.all()
    return render(request, 'posts/main.html', {'qs': qs})

# GET selected items from each post
def load_post_data_view(request, num_posts):
    # Set up to show only 3 posts and add 3 anytime load more is pressed
    visible = 3
    upper = num_posts
    lower = upper - visible
    size = Post.objects.all().count()

    # GET all Posts and pull objects from the Posts
    qs = Post.objects.all()
    data = []
    for obj in qs:      # Use for loop to pull items serializer will pull author as pk
        item = {
            'id': obj.id,
            'title': obj.title,
            'body': obj.body,
            'liked': True if request.user in obj.liked.all() else False,    # True if user liked post false if not
            'author': obj.author.user.username,
        }
        data.append(item)
    return JsonResponse({ 'data': data[lower:upper], 'size': size })

def hello_world_view(request):
    return JsonResponse({ 'text': 'Hello World' })

