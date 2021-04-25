from django.shortcuts import render
from .models import Post
from django.http import JsonResponse
from .forms import PostForm
from profiles.models import Profile     # use to grab author using user

# GET all posts
def post_list_and_create(request):
    # Bring in our PostForm 
    form = PostForm(request.POST or None)

    # qs = Post.objects .all()

    if request.is_ajax():
        if form.is_valid():
            author = Profile.objects.get(user=request.user)
            instance = form.save(commit=False)
            instance.author = author
            instance.save()
    context = {
        'form': form,
    }
    
    return render(request, 'posts/main.html', context)

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
            'count': obj.like_count,
            'author': obj.author.user.username,
        }
        data.append(item)
    return JsonResponse({ 'data': data[lower:upper], 'size': size })

# POST view for liking unliking a post
def like_unlike_post(request):
    if request.is_ajax():
        pk = request.POST.get('pk') # Grab the pk that is being sent by the frontend
        obj = Post.objects.get(pk=pk)
        if request.user in obj.liked.all(): # if user liked post remove them if unliked
            liked = False
            obj.liked.remove(request.user)
        else:   # if user did not like, add if they did
            liked = True
            obj.liked.add(request.user)
        return JsonResponse({ 'liked': liked, 'count': obj.like_count })




def hello_world_view(request):
    return JsonResponse({ 'text': 'Hello World' })

