var posts=["2025/04/05/markown/","2025/04/03/hello-world/","2025/04/05/如何写一篇文章/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };