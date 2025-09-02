from django.shortcuts import render
from .models import Post
from django.contrib.auth.decorators import login_required

# Create your views here.

def home(request):
    posts = Post.objects.all().order_by('-created_at')
    return render(request, 'blog/home.html', {'posts': posts})



# داشبورد ادمین
@login_required
def admin_dashboard(request):
    posts = Post.objects.all().order_by('-created_at')
    return render(request, 'admin_blog/dashboard.html', {'posts': posts})

# افزودن پست
@login_required
def admin_post_add(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        content = request.POST.get('content')
        Post.objects.create(title=title, content=content)
        return redirect('admin_dashboard')
    return render(request, 'admin_blog/post_add.html')

# ویرایش پست
@login_required
def admin_post_edit(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    if request.method == 'POST':
        post.title = request.POST.get('title')
        post.content = request.POST.get('content')
        post.save()
        return redirect('admin_dashboard')
    return render(request, 'admin_blog/post_edit.html', {'post': post})

# حذف پست
@login_required
def admin_post_delete(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    post.delete()
    return redirect('admin_dashboard')