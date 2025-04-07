var posts=["2025/04/05/如何写一篇文章/","2025/04/03/hello-world/","2025/04/07/如何在hexo里面实现类似动态播放视频/","2025/04/07/我搭建hexo博客之路/","2025/04/05/markown/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };