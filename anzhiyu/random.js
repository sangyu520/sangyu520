var posts=["2025/04/03/hello-world/","2025/04/05/markown/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };