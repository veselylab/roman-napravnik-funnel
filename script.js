// hero image
  var heroImg = new Image();
  heroImg.onload = function(){ document.getElementById('heroBg').style.backgroundImage = 'url('+this.src+')'; };
  heroImg.src = 'https://raw.githubusercontent.com/veselylab/roman-napravnik-webinar-light/main/hero.jpg';

  // nav scroll
  window.addEventListener('scroll', function(){
    document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 80);
  });

  // faq accordion
  function toggleFaq(q){ q.closest('.faq-item').classList.toggle('open'); }

  // iframe resize – postMessage primary, generous fixed fallback for cross-origin
  (function(){
    var f = document.getElementById('regFrame');
    if(!f) return;
    // Listen for height message from the form (if PMG sends one)
    window.addEventListener('message', function(e){
      if(!e.data) return;
      var h = 0;
      if(typeof e.data === 'number') h = e.data;
      else if(typeof e.data === 'object'){
        h = e.data.height || e.data.frameHeight || e.data.scrollHeight || 0;
      }
      if(h > 200) f.style.height = (h + 32) + 'px';
    });
    // Same-origin fallback (silently fails for cross-origin)
    function trySameOriginResize(){
      try{
        var h = f.contentWindow.document.body.scrollHeight;
        if(h > 200) f.style.height = (h + 32) + 'px';
      }catch(e){ /* cross-origin – ignore, fixed CSS height is the fallback */ }
    }
    f.addEventListener('load', trySameOriginResize);
  })();