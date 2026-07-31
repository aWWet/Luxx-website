(function(){
  // header scroll state
  var header = document.getElementById('siteHeader');
  var progressEmblem = document.getElementById('progressEmblem');
  var progressRing = document.getElementById('progressRing');
  var circumference = 276.5;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function onScroll(){
    var y = window.scrollY;
    header.classList.toggle('scrolled', y > 40);

    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? Math.min(1, y / docHeight) : 0;
    progressRing.setAttribute('stroke-dashoffset', String(circumference * (1 - pct)));
    progressEmblem.classList.toggle('show', y > 200);
  }
  document.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  // reveal on scroll
  var revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold:0.18 });
  revealEls.forEach(function(el){ io.observe(el); });

  // quote rotator
  var quotes = document.querySelectorAll('#quoteWrap .quote');
  var dotsWrap = document.getElementById('quoteDots');
  var current = 0;
  quotes.forEach(function(_, i){
    var b = document.createElement('button');
    if(i === 0) b.classList.add('active');
    b.setAttribute('aria-label', 'Show testimonial ' + (i+1));
    b.addEventListener('click', function(){ showQuote(i); });
    dotsWrap.appendChild(b);
  });
  function showQuote(i){
    quotes[current].classList.remove('active');
    dotsWrap.children[current].classList.remove('active');
    current = i;
    quotes[current].classList.add('active');
    dotsWrap.children[current].classList.add('active');
  }
  if(!reduceMotion){
    setInterval(function(){ showQuote((current + 1) % quotes.length); }, 5000);
  }
})();
