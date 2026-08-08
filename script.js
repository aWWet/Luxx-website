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

  // quote rotator (home page only — guarded for other pages)
  var quotes = document.querySelectorAll('#quoteWrap .quote');
  var dotsWrap = document.getElementById('quoteDots');
  if(dotsWrap && quotes.length){
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
  }
})();

/* ================= i18n : EN / RU / HY ================= */
(function(){
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var translations = {
    ru: {
      nav_house:"Дом", nav_menu:"Меню", nav_atmosphere:"Атмосфера", nav_visit:"Визит",
      hero_eyebrow:"Վանաձոր · Լոռու մարզ — Ванадзор, область Лори",
      hero_tagline:"В старом армянском доме <b>вернатун</b> был верхней комнатой — её держали чистой, тёплой и готовой для того, кто придёт следующим. У нас всё так же и сегодня.",
      hero_cta_menu:"Смотреть меню ↓",
      hero_cta_reserve:"Забронировать — +374 77 400581",
      plaque_reviews:"Отзывы Google",
      plaque_hours:"Открыто ежедневно<br>10:00 — 24:00",
      scroll_cue:"Листайте",
      story_eyebrow:"Պատմություն — Дом",
      story_h2:"Комната, что никогда не была только для семьи.",
      story_p1:"В старых горных домах Лори вернатун стоял на ступень выше остальных комнат — та, что смотрела на юг, та, где лежали лучшие ковры, и её открывали каждый раз, когда кто-то спускался с гор или поднимался из долины. Она была не на каждый день. Она была для того, кто пришёл голодным.",
      story_p2:"Мы взяли имя прямо из этой традиции. Каменные стены, медленный огонь, хлеб, который не заканчивается, и стул, отодвинутый прежде, чем вы договорите «здравствуйте». Ванадзор лежит низко в котловине Лори, окружённый тем же вулканическим туфом, из которого построен этот дом — характер для образа нам искать не пришлось.",
      story_fact1:"Открыто каждый день", story_fact2:"Рейтинг Google", story_fact3:"Региональная кухня",
      menu_eyebrow:"Ճաշացանկ — Меню",
      menu_h2:"Готовим так, как готовят в Лори — на углях, под камнем, в виноградных листьях.",
      menu_intro:"Небольшая подборка блюд с кухни. Спросите официанта, что сегодня сняли с углей — меню меняется по рынку.",
      dish1_name:"Хоровац", dish1_desc:"Свинина, баранина или форель на шампурах, медленно обжариваемые на углях в открытом очаге-оджахе.",
      dish2_name:"Хашлама", dish2_desc:"Телятина или баранина, томлённая часами с луком и травами, пока мясо не отходит от кости.",
      dish3_name:"Толма", dish3_desc:"Виноградные листья, плотно свёрнутые вокруг риса со специями и бараниной, подаются с кислым мацуном.",
      dish4_name:"Лаваш и сыр", dish4_desc:"Тонкий хлеб прямо из тонира, ещё тёплый, с косичкой сыра и свежей зеленью.",
      dish5_name:"Лорийское фасолевое рагу", dish5_desc:"Красная фасоль, сушёные травы и грецкий орех — горское блюдо для холодных вечеров.",
      dish6_name:"Гата и кофе", dish6_desc:"Сладкая слоёная выпечка с чашкой армянского кофе, сваренного медленно, вместе с гущей.",
      see_full_menu:"Смотреть полное меню →", plan_route:"Проложить маршрут от вас →",
      atmosphere_eyebrow:"Ինչպես են ասում — Что говорят гости",
      quote1:"«Безупречно чистые залы, тёплое обслуживание и цены, которые всё ещё кажутся справедливыми.»",
      quote2:"«Армянская кухня, приготовленная по-настоящему, в зале, который ощущается обжитым, а не декорацией.»",
      quote3:"«Такое место, куда привозишь родных, приехавших издалека.»",
      quote_label:"— отзыв Google",
      visit_eyebrow:"Այցելություն — Визит",
      visit_h2:"Найдите свой стол.",
      visit_k_address:"Адрес", visit_v_address:"№12, Ванадзор, область Лори, Армения",
      visit_k_phone:"Телефон",
      visit_k_hours:"Часы работы", visit_v_hours:"Открыто каждый день, 10:00 — 24:00",
      visit_k_rating:"Рейтинг", visit_v_rating:"5.0 ★ на Google",
      map_title:"Ванадзор, Лори",
      map_desc:"Расположен в котловине Лори, в паре часов к северу от Еревана, по дороге к монастырям каньона Дебед.",
      map_cta:"Открыть в Google Maps →",
      footer_address:"Vernatun · Ванадзор, область Лори, Армения",
      footer_hours:"+374 77 400581 · Открыто ежедневно, 10:00–24:00",
      foot_call:"Позвонить", foot_directions:"Маршрут", foot_menu:"Меню",

      page_menu_eyebrow:"Ճաշացանկ — Полное меню",
      page_menu_h1:"Полное меню.",
      page_menu_sub:"Настоящие блюда Vernatun — по категориям, с весом порций и ценами в драмах.",
      menu_note:"",
      cat_appetizers:"Закуски", cat_soups:"Супы", cat_hot:"Горячие блюда", cat_bbq:"Основные блюда / Гриль", cat_dough:"Мучные изделия",

      ap1_name:"Хлеб / Лаваш", ap2_name:"Сырное ассорти", ap3_name:"Овечий сыр", ap4_name:"Ассорти солений",
      ap5_name:"Овощное ассорти", ap6_name:"Ассорти зелени", ap7_name:"Мясное ассорти", ap8_name:"Оливки, лимон",
      ap9_name:"Отцеженный мацун", ap10_name:"Речан", ap11_name:"Маринованный перец", ap12_name:"Маринованные грибы (вешенки)",
      ap13_name:"Баклажанные рулетики", ap14_name:"Грибное ассорти", ap15_name:"Рыбное ассорти", ap16_name:"Холодец",
      ap17_name:"Маринованная стерлядь",

      so1_name:"Пити из баранины/телятины", so2_name:"Спас", so3_name:"Солянка",

      ho1_name:"Жареное мясо (Гаурма)", ho2_name:"Летняя долма", ho3_name:"Кустовая долма",

      bbq_sub_grill:"Шашлык на углях", bbq_sub_extra:"К шашлыку",
      bb1_name:"Телятина", bb2_name:"Куриный шашлык", bb3_name:"Свинина", bb4_name:"Баранина",
      bb5_name:"Форель", bb6_name:"Стерлядь", bb7_name:"Телячий кебаб", bb8_name:"Вырезка",
      bb9_name:"Индейка", bb10_name:"Шампиньоны", bb11_name:"Картофель", bb12_name:"Овощи",

      do1_name:"Хинкали", do2_name:"Жареные хинкали", do3_name:"Ассорти пиццы",
      do4_name:"Аджарский хачапури", do5_name:"Имеретинский хачапури",

      page_visit_eyebrow:"Այցելություն — Как нас найти",
      page_visit_h1:"Проложите путь до нас.",
      page_visit_sub:"Разрешите доступ к геолокации — покажем расстояние и направление до Vernatun прямо от вас.",
      geo_locate_btn:"Найти расстояние до нас",
      geo_locating:"Определяем ваше местоположение…",
      geo_idle:"Нажмите кнопку, чтобы узнать расстояние и направление от вас до ресторана.",
      geo_distance_prefix:"Вы примерно в",
      geo_distance_suffix:"от Vernatun по прямой.",
      geo_directions_btn:"Проложить маршрут →",
      geo_error:"Не получилось определить местоположение. Проверьте разрешения браузера или откройте карту вручную ниже.",
      geo_denied:"Доступ к геолокации не разрешён. Можно открыть маршрут вручную ниже."
    },
    hy: {
      nav_house:"Տուն", nav_menu:"Ճաշացանկ", nav_atmosphere:"Մթնոլորտ", nav_visit:"Այցելություն",
      hero_eyebrow:"Վանաձոր · Լոռու մարզ",
      hero_tagline:"Հին հայկական տանը <b>վերնատունը</b> վերևի սենյակն էր՝ միշտ մաքուր, տաք և պատրաստ հաջորդ հյուրի համար։ Մենք դեռ այդպես ենք անում։",
      hero_cta_menu:"Տեսնել ճաշացանկը ↓",
      hero_cta_reserve:"Ամրագրել — +374 77 400581",
      plaque_reviews:"Google կարծիքներ",
      plaque_hours:"Բաց ամեն օր<br>10:00 — 24:00",
      scroll_cue:"Ոլորեք",
      story_eyebrow:"Պատմություն",
      story_h2:"Սենյակ, որ երբեք միայն ընտանիքի համար չէր։",
      story_p1:"Լոռու հին լեռնային տներում վերնատունը մի աստիճան բարձր էր մյուս սենյակներից՝ դեպի հարավ նայող, լավագույն գորգերով սենյակը, որը բացվում էր ամեն անգամ, երբ մեկը իջնում էր սարերից կամ բարձրանում հովտից։ Այն ամենօրյա չէր։ Այն նրա համար էր, ով քաղցած էր հասնում։",
      story_p2:"Անունը վերցրինք հենց այդ սովորությունից։ Քարե պատեր, դանդաղ կրակ, հաց, որ չի վերջանում, և աթոռ, որ քաշվում է դեռ բարևը չասած։ Վանաձորը գտնվում է Լոռու գոգավորության մեջ՝ շրջապատված նույն հրաբխային տուֆով, որից կառուցված է այս տունը. հեռու փնտրելու կարիք չունեինք։",
      story_fact1:"Բաց ամեն օր", story_fact2:"Google վարկանիշ", story_fact3:"Տարածաշրջանային խոհանոց",
      menu_eyebrow:"Ճաշացանկ",
      menu_h2:"Եփում ենք այնպես, ինչպես Լոռիում են եփում՝ կրակի վրա, քարի տակ, խաղողի տերևով փաթաթված։",
      menu_intro:"Խոհանոցի փոքրիկ նմուշ։ Հարցրեք մատուցողին՝ ինչ է այսօր հանվել կրակից, այն փոփոխվում է շուկայի համաձայն։",
      dish1_name:"Խորոված", dish1_desc:"Խոզի, գառան կամ իշխանի միս շամփուրների վրա՝ դանդաղ խորովվում բաց օջախի կրակի վրա։",
      dish2_name:"Խաշլամա", dish2_desc:"Հորթի կամ գառան միս՝ ժամերով շոգեխաշված սոխով և խոտաբույսերով, մինչև որ ոսկորից անջատվի։",
      dish3_name:"Տոլմա", dish3_desc:"Խաղողի տերևներ՝ ամուր փաթաթված համեմունքային բրնձի և գառան մսի շուրջ, մատուցվում է թթու մածունով։",
      dish4_name:"Լավաշ և պանիր", dish4_desc:"Բարակ հաց՝ թոնիրից նոր հանված, դեռ տաք, հյուսած պանրով և թարմ կանաչիով։",
      dish5_name:"Լոռու լոբով ուտեստ", dish5_desc:"Կարմիր լոբի, չորացրած խոտաբույսեր և ընկույզ՝ լեռնային ուտեստ՝ ստեղծված ցուրտ երեկոների համար։",
      dish6_name:"Գաթա և սուրճ", dish6_desc:"Քաղցր շերտավոր հրուշակ՝ բաժակ հայկական սուրճով, դանդաղ եփված, միասին խմորակով։",
      see_full_menu:"Տեսնել ամբողջական ճաշացանկը →", plan_route:"Կառուցել երթուղին ձեզանից →",
      atmosphere_eyebrow:"Ինչպես են ասում",
      quote1:"«Անթերի մաքուր դահլիճներ, ջերմ սպասարկում և գներ, որոնք դեռ արդար են թվում»։",
      quote2:"«Հայկական խոհանոց՝ պատշաճ պատրաստված, դահլիճում, որը զգացվում է ապրված, ոչ թե բեմադրված»։",
      quote3:"«Վայր, ուր կբերես հեռվից եկած ընտանիքիդ անդամներին»։",
      quote_label:"— Google կարծիք",
      visit_eyebrow:"Այցելություն",
      visit_h2:"Գտեք ձեր սեղանը։",
      visit_k_address:"Հասցե", visit_v_address:"թիվ 12, Վանաձոր, Լոռու մարզ, Հայաստան",
      visit_k_phone:"Հեռախոս",
      visit_k_hours:"Ժամեր", visit_v_hours:"Բաց ամեն օր, 10:00 — 24:00",
      visit_k_rating:"Վարկանիշ", visit_v_rating:"5.0 ★ Google-ում",
      map_title:"Վանաձոր, Լոռի",
      map_desc:"Գտնվում է Լոռու գոգավորությունում՝ Երևանից մի քանի ժամ հյուսիս, Դեբեդի կիրճի վանքերի ճանապարհին։",
      map_cta:"Բացել Google Maps-ում →",
      footer_address:"Վերնատուն · Վանաձոր, Լոռու մարզ, Հայաստան",
      footer_hours:"+374 77 400581 · Բաց ամեն օր, 10:00–24:00",
      foot_call:"Զանգել", foot_directions:"Երթուղի", foot_menu:"Ճաշացանկ",

      page_menu_eyebrow:"Ճաշացանկ — Ամբողջական ճաշացանկ",
      page_menu_h1:"Ամբողջական ճաշացանկ։",
      page_menu_sub:"Vernatun-ի իրական ուտեստները՝ ըստ կատեգորիաների, չափաբաժնի քաշով և գներով դրամով։",
      menu_note:"",
      cat_appetizers:"Նախուտեստներ", cat_soups:"Ապուրներ", cat_hot:"Տաք ուտեստներ", cat_bbq:"Հիմնական ուտեստներ / Խորոված", cat_dough:"Խմորային ուտեստներ",

      ap1_name:"Հաց / Լավաշ", ap2_name:"Պանրի տեսականի", ap3_name:"Ոչխարի պանիր", ap4_name:"Թթուների տեսականի",
      ap5_name:"Բանջարեղենի տեսականի", ap6_name:"Կանաչիների տեսականի", ap7_name:"Մսի տեսականի", ap8_name:"Ձիթապտուղ, կիտրոն",
      ap9_name:"Քամած մածուն", ap10_name:"Ռեչան", ap11_name:"Մարինացված պղպեղ", ap12_name:"Մարինացված ուտիճասունկ",
      ap13_name:"Սմբուկի ռուլետ", ap14_name:"Սնկերի տեսականի", ap15_name:"Ձկան տեսականի", ap16_name:"Խալադեց (դոնդող)",
      ap17_name:"Մարինացված ստերլյադ",

      so1_name:"Փիթի (գառան/հորթի)", so2_name:"Սպաս", so3_name:"Սոլյանկա",

      ho1_name:"Տապակած միս (Ղաուրմա)", ho2_name:"Ամառային տոլմա", ho3_name:"Թփի տոլմա",

      bbq_sub_grill:"Խորոված կրակի վրա", bbq_sub_extra:"Խորովածին կից",
      bb1_name:"Հորթի միս", bb2_name:"Հավի խորոված", bb3_name:"Խոզի միս", bb4_name:"Գառան միս",
      bb5_name:"Իշխան", bb6_name:"Ստերլյադ", bb7_name:"Հորթի քյաբաբ", bb8_name:"Ֆիլե",
      bb9_name:"Հնդկահավ", bb10_name:"Շամպինիոն", bb11_name:"Կարտոֆիլ", bb12_name:"Բանջարեղեն",

      do1_name:"Խինկալի", do2_name:"Տապակած խինկալի", do3_name:"Պիցցայի տեսականի",
      do4_name:"Աջարական խաչապուրի", do5_name:"Իմերեթական խաչապուրի",

      page_visit_eyebrow:"Այցելություն — Ինչպես գտնել մեզ",
      page_visit_h1:"Գտեք ճանապարհը դեպի մեզ։",
      page_visit_sub:"Թույլատրեք տեղադրության հասանելիությունը՝ ցույց կտանք հեռավորությունը և ուղղությունը Վերնատուն հասնելու համար։",
      geo_locate_btn:"Գտնել հեռավորությունը մինչև մեզ",
      geo_locating:"Որոշում ենք ձեր գտնվելու վայրը…",
      geo_idle:"Սեղմեք կոճակը՝ ձեզանից մինչև ռեստորան հեռավորությունն ու ուղղությունը իմանալու համար։",
      geo_distance_prefix:"Դուք մոտավորապես",
      geo_distance_suffix:"հեռավորության վրա եք Վերնատունից՝ ուղիղ գծով։",
      geo_directions_btn:"Կառուցել երթուղին →",
      geo_error:"Չհաջողվեց որոշել ձեր գտնվելու վայրը։ Ստուգեք բրաուզերի թույլտվությունները կամ բացեք քարտեզը ձեռքով ներքևում։",
      geo_denied:"Տեղադրության հասանելիությունը թույլատրված չէ։ Կարող եք երթուղին բացել ձեռքով ներքևում։"
    }
  };

  // capture original English content as the 'en' dictionary, built from the DOM itself
  var enDict = {};
  document.querySelectorAll('[data-i18n]').forEach(function(el){
    var key = el.getAttribute('data-i18n');
    if(!(key in enDict)) enDict[key] = el.innerHTML;
  });
  translations.en = enDict;

  var langSwitch = document.getElementById('langSwitch');
  var langThumb = document.getElementById('langThumb');
  var langBtns = langSwitch ? langSwitch.querySelectorAll('.lang-btn') : [];
  var langOrder = ['en','ru','hy'];

  function moveThumb(lang){
    var idx = langOrder.indexOf(lang);
    if(idx < 0 || !langThumb) return;
    langThumb.style.transform = 'translateX(' + (idx * 40) + 'px)';
  }

  function applyLanguage(lang, animate){
    var dict = translations[lang] || translations.en;
    var els = document.querySelectorAll('[data-i18n]');

    function swap(){
      els.forEach(function(el){
        var key = el.getAttribute('data-i18n');
        if(dict[key] !== undefined) el.innerHTML = dict[key];
      });
      document.documentElement.lang = lang;
    }

    if(animate && !reduceMotion){
      els.forEach(function(el){ el.classList.add('i18n-swap'); });
      window.setTimeout(function(){
        swap();
        // next frame: release the swap class so it transitions back in
        requestAnimationFrame(function(){
          els.forEach(function(el){ el.classList.remove('i18n-swap'); });
        });
      }, 220);
    } else {
      swap();
    }

    langBtns.forEach(function(b){
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });
    moveThumb(lang);

    try{ window.localStorage.setItem('vernatun-lang', lang); }catch(e){}
  }

  langBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      var lang = btn.getAttribute('data-lang');
      if(!btn.classList.contains('active')) applyLanguage(lang, true);
    });
  });

  var savedLang = 'en';
  try{ savedLang = window.localStorage.getItem('vernatun-lang') || 'en'; }catch(e){}
  if(savedLang !== 'en'){ applyLanguage(savedLang, false); }
  else { moveThumb('en'); }
})();
