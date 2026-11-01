/* Nia — движок. Данные пользователя хранятся только на телефоне.
   Сетевые запросы: шрифты Google Fonts, RevenueCat (статус покупки), на Android в бесплатной версии — реклама Google AdMob. */
'use strict';

/* ================= ЛОКАЛИЗАЦИЯ (берётся из системы) ================= */
const IOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
            (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const PLATFORM = (window.Capacitor && window.Capacitor.getPlatform) ? window.Capacitor.getPlatform() : 'web';
const STORE_URL = PLATFORM==='ios'
  ? 'https://apps.apple.com/app/id6818955026'
  : 'https://play.google.com/store/apps/details?id=online.forwardip.nia';
const STORE_NAME = PLATFORM==='ios' ? 'App Store' : 'Google Play';
// Android: приложение бесплатное с рекламой, подписка убирает рекламу. iOS не меняется.
const ADS = PLATFORM==='android';
// язык: сохранённый выбор → иначе язык системы → иначе английский
const SUPPORTED = ['ru','kk','en','es','fr','de','ar'];
let LANG = (()=>{ try{ const v=localStorage.getItem('nia.lang'); if(SUPPORTED.indexOf(v)>=0) return v; }catch(e){}
  const n = (navigator.language||'en').toLowerCase().slice(0,2);
  return SUPPORTED.indexOf(n)>=0 ? n : 'en'; })();
let CLOUD, BIO, T;
function buildDict(){
  CLOUD = IOS ? 'iCloud' : CLOUD_A[LANG];
  BIO   = IOS ? 'Face ID' : BIO_A[LANG];
  T = DICT()[LANG]; DT = DZ[LANG];
  try{ document.documentElement.lang = LANG; document.documentElement.dir = LANG==='ar' ? 'rtl' : 'ltr'; }catch(e){}
}
function setLang(l){ if(SUPPORTED.indexOf(l)<0) return; LANG = l; try{ localStorage.setItem('nia.lang', l); }catch(e){} buildDict(); }
const ruPl = (n, f) => { const a = n % 10, b = n % 100;
  return f[(a===1 && b!==11) ? 0 : (a>=2 && a<=4 && (b<10 || b>=20)) ? 1 : 2]; };
const cap1 = s => s.charAt(0).toUpperCase() + s.slice(1);
const LANGS = [['ru','Русский','RU'],['kk','Қазақша','KZ'],['en','English','EN'],['es','Español','ES'],['fr','Français','FR'],['de','Deutsch','DE'],['ar','العربية','AR']];
const CLOUD_A = {ru:'Google Диск', kk:'Google Drive', en:'Google Drive', es:'Google Drive', fr:'Google Drive', de:'Google Drive', ar:'Google Drive'};
const BIO_A = {ru:'отпечатку пальца', kk:'саусақ ізі', en:'fingerprint', es:'huella dactilar', fr:'empreinte digitale', de:'Fingerabdruck', ar:'بصمة الإصبع'};
// арабские числительные: 1 يوم واحد, 2 يومان, 3–10 أيام, 11+ يومًا
const arDayWord = n => { const k=n%100; return n===1?'يوم':n===2?'يومان':(k>=3&&k<=10)?'أيام':'يومًا'; };
const arDays = n => n===1?'يوم واحد':n===2?'يومان':`${n} ${arDayWord(n)}`;
const arCycles = n => { const k=n%100; return n===1?'دورة واحدة':n===2?'دورتان':(k>=3&&k<=10)?`${n} دورات`:`${n} دورة`; };
/* ================= ОФОРМЛЕНИЯ (7 интерфейсов) ================= */
const DESIGNS = ['A','B','C','D','E','F','G'];
const DZ = {
 ru:{q:s=>`${s}?`,A:'Лента',B:'Орбита',C:'Шкала',D:'Капля',E:'Счётчик',F:'Росток',G:'Диалог',
   As:'Лента дней и ближайшие события',Bs:'Тёмное кольцо цикла',Cs:'Шкала и яркие плитки',Ds:'Капля наполняется за цикл',
   Es:'Крупный счётчик дней',Fs:'Растение растёт по дням',Gs:'Nia пишет сообщениями',
   secLook:'Оформление', lookT:'Выберите оформление', lookS:'Меняется в одно касание, записи не теряются.',
   dayNth:n=>`${n}-й день`, untilP:n=>`Менструация через ${n} ${ruPl(n,['день','дня','дней'])}`,
   dayOf:(n,l)=>`День ${n} из ${l}`, evFert:'Начало фертильных дней', cycFill:p=>`Цикл пройден на ${p}%`,
   tapDay:'Нажмите на точку, чтобы открыть день', qOf:(i,n)=>`Вопрос ${i} из ${n}`, back:'Назад',
   todayIs:n=>`Сегодня ${n}-й день цикла.`, chatHow:'Отметим, как проходит день?',
   leafS:'Один день цикла — один листок', untilLbl:'До менструации', daysW:n=>ruPl(n,['день','дня','дней']),
   rowHint:'Каждая строка — один цикл', wk:'Нед.', thisCycle:'Этот цикл', noHome:'Нажмите, чтобы отметить первый день менструации'},
 kk:{q:s=>`${s}?`,A:'Таспа',B:'Орбита',C:'Шкала',D:'Тамшы',E:'Санауыш',F:'Өскін',G:'Диалог',
   As:'Күндер таспасы және жақын оқиғалар',Bs:'Циклдің күңгірт сақинасы',Cs:'Шкала және жарқын тақтайшалар',Ds:'Тамшы цикл бойы толады',
   Es:'Күндердің ірі санауышы',Fs:'Өсімдік күн сайын өседі',Gs:'Nia хабарлама жазады',
   secLook:'Безендіру', lookT:'Безендіруді таңдаңыз', lookS:'Бір рет басып ауыстырылады, жазбалар сақталады.',
   dayNth:n=>`${n}-күн`, untilP:n=>`Етеккірге ${n} күн қалды`,
   dayOf:(n,l)=>`${l} күннің ${n}-і`, evFert:'Құнарлы күндердің басы', cycFill:p=>`Циклдің ${p}% өтті`,
   tapDay:'Күнді ашу үшін нүктені басыңыз', qOf:(i,n)=>`${n} сұрақтың ${i}-сі`, back:'Артқа',
   todayIs:n=>`Бүгін циклдің ${n}-күні.`, chatHow:'Күніңізді белгілейміз бе?',
   leafS:'Циклдің бір күні — бір жапырақ', untilLbl:'Етеккірге дейін', daysW:n=>'күн',
   rowHint:'Әр жол — бір цикл', wk:'Апта', thisCycle:'Осы цикл', noHome:'Етеккірдің бірінші күнін белгілеу үшін басыңыз'},
 en:{q:s=>`${s}?`,A:'Tape',B:'Orbit',C:'Scale',D:'Drop',E:'Counter',F:'Sprout',G:'Chat',
   As:'A strip of days and what comes next',Bs:'A dark ring of your cycle',Cs:'A scale and bright tiles',Ds:'A drop that fills over your cycle',
   Es:'A big day counter',Fs:'A plant that grows each day',Gs:'Nia talks to you in messages',
   secLook:'Appearance', lookT:'Choose a look', lookS:'Switch in one tap. Your entries stay.',
   dayNth:n=>`Day ${n}`, untilP:n=>`Period in ${n} day${n===1?'':'s'}`,
   dayOf:(n,l)=>`Day ${n} of ${l}`, evFert:'Fertile days begin', cycFill:p=>`${p}% of your cycle`,
   tapDay:'Tap a dot to open that day', qOf:(i,n)=>`Question ${i} of ${n}`, back:'Back',
   todayIs:n=>`Today is day ${n} of your cycle.`, chatHow:'Want to log today?',
   leafS:'One day of your cycle, one leaf', untilLbl:'Until your period', daysW:n=>n===1?'day':'days',
   rowHint:'Each row is one cycle', wk:'Wk', thisCycle:'This cycle', noHome:'Tap to log the first day of your period'},
 es:{q:s=>`¿${s}?`,A:'Cinta',B:'Órbita',C:'Escala',D:'Gota',E:'Contador',F:'Brote',G:'Chat',
   As:'Una cinta de días y lo que viene',Bs:'Un anillo oscuro de tu ciclo',Cs:'Una escala y mosaicos vivos',Ds:'Una gota que se llena con el ciclo',
   Es:'Un gran contador de días',Fs:'Una planta que crece cada día',Gs:'Nia te escribe mensajes',
   secLook:'Apariencia', lookT:'Elige un estilo', lookS:'Cambia con un toque. Tus registros se quedan.',
   dayNth:n=>`Día ${n}`, untilP:n=>`Regla en ${n} ${n===1?'día':'días'}`,
   dayOf:(n,l)=>`Día ${n} de ${l}`, evFert:'Empiezan los días fértiles', cycFill:p=>`${p}% del ciclo`,
   tapDay:'Toca un punto para abrir ese día', qOf:(i,n)=>`Pregunta ${i} de ${n}`, back:'Atrás',
   todayIs:n=>`Hoy es el día ${n} de tu ciclo.`, chatHow:'¿Registramos tu día?',
   leafS:'Un día del ciclo, una hoja', untilLbl:'Hasta la regla', daysW:n=>n===1?'día':'días',
   rowHint:'Cada fila es un ciclo', wk:'Sem', thisCycle:'Este ciclo', noHome:'Toca para registrar el primer día de tu regla'},
 fr:{q:s=>`${s} ?`,A:'Ruban',B:'Orbite',C:'Échelle',D:'Goutte',E:'Compteur',F:'Pousse',G:'Dialogue',
   As:'Un ruban de jours et ce qui arrive',Bs:'Un anneau sombre de ton cycle',Cs:'Une échelle et des tuiles vives',Ds:'Une goutte qui se remplit au fil du cycle',
   Es:'Un grand compteur de jours',Fs:'Une plante qui pousse chaque jour',Gs:'Nia t’écrit des messages',
   secLook:'Apparence', lookT:'Choisis un style', lookS:'Change en un geste. Tes données restent.',
   dayNth:n=>`Jour ${n}`, untilP:n=>`Règles dans ${n} jour${n>1?'s':''}`,
   dayOf:(n,l)=>`Jour ${n} sur ${l}`, evFert:'Début des jours fertiles', cycFill:p=>`${p} % du cycle`,
   tapDay:'Touche un point pour ouvrir ce jour', qOf:(i,n)=>`Question ${i} sur ${n}`, back:'Retour',
   todayIs:n=>`Aujourd’hui, c’est le jour ${n} de ton cycle.`, chatHow:'On note ta journée ?',
   leafS:'Un jour du cycle, une feuille', untilLbl:'Avant tes règles', daysW:n=>n>1?'jours':'jour',
   rowHint:'Chaque ligne est un cycle', wk:'Sem', thisCycle:'Ce cycle', noHome:'Touche pour noter le premier jour de tes règles'},
 de:{q:s=>`${s}?`,A:'Band',B:'Orbit',C:'Skala',D:'Tropfen',E:'Zähler',F:'Spross',G:'Dialog',
   As:'Ein Band aus Tagen und was als Nächstes kommt',Bs:'Ein dunkler Ring deines Zyklus',Cs:'Eine Skala und helle Kacheln',Ds:'Ein Tropfen, der sich im Zyklus füllt',
   Es:'Ein großer Tageszähler',Fs:'Eine Pflanze, die jeden Tag wächst',Gs:'Nia schreibt dir Nachrichten',
   secLook:'Aussehen', lookT:'Wähle einen Stil', lookS:'Mit einem Tippen wechseln. Deine Einträge bleiben.',
   dayNth:n=>`Tag ${n}`, untilP:n=>`Periode in ${n} ${n===1?'Tag':'Tagen'}`,
   dayOf:(n,l)=>`Tag ${n} von ${l}`, evFert:'Fruchtbare Tage beginnen', cycFill:p=>`${p} % des Zyklus`,
   tapDay:'Tippe auf einen Punkt, um den Tag zu öffnen', qOf:(i,n)=>`Frage ${i} von ${n}`, back:'Zurück',
   todayIs:n=>`Heute ist Tag ${n} deines Zyklus.`, chatHow:'Möchtest du heute eintragen?',
   leafS:'Ein Tag im Zyklus, ein Blatt', untilLbl:'Bis zur Periode', daysW:n=>n===1?'Tag':'Tage',
   rowHint:'Jede Zeile ist ein Zyklus', wk:'KW', thisCycle:'Dieser Zyklus', noHome:'Tippe, um den ersten Tag deiner Periode einzutragen'},
 ar:{q:s=>`${s}؟`,A:'شريط',B:'مدار',C:'مقياس',D:'قطرة',E:'عدّاد',F:'نبتة',G:'محادثة',
   As:'شريط من الأيام وما يأتي بعدها',Bs:'حلقة داكنة لدورتك',Cs:'مقياس ومربعات زاهية',Ds:'قطرة تمتلئ مع تقدّم الدورة',
   Es:'عدّاد أيام كبير',Fs:'نبتة تنمو كل يوم',Gs:'نيا تكتب لك رسائل',
   secLook:'المظهر', lookT:'اختاري مظهرًا', lookS:'غيّريه بلمسة واحدة. تبقى بياناتك كما هي.',
   dayNth:n=>`اليوم ${n}`, untilP:n=>`الدورة بعد ${arDays(n)}`,
   dayOf:(n,l)=>`اليوم ${n} من ${l}`, evFert:'بداية الأيام الخصبة', cycFill:p=>`${p}% من الدورة`,
   tapDay:'المسي نقطة لفتح ذلك اليوم', qOf:(i,n)=>`السؤال ${i} من ${n}`, back:'رجوع',
   todayIs:n=>`اليوم هو اليوم ${n} من دورتك.`, chatHow:'هل نسجّل يومك؟',
   leafS:'يوم من الدورة، ورقة واحدة', untilLbl:'حتى الدورة', daysW:n=>arDayWord(n),
   rowHint:'كل صف دورة واحدة', wk:'أسبوع', thisCycle:'هذه الدورة', noHome:'المسي لتسجيل أول يوم من دورتك'}
};
// палитры: canvas, surface, ink, soft, period, period-soft, fertile, fertile-soft, mist, line, cta, cta-text
const PAL = {
 A:['#FFFFFF','#F2F5F4','#13322B','#6D817B','#F0644B','#FDE3DD','#2E9E78','#DDF1E8','#EEF2F0','#E3E9E7','#F0644B','#FFFFFF','Golos Text','999px','18px'],
 B:['#121434','#1F2352','#F3EEFF','#9C99D0','#FF7A9A','#3A2547','#7CE3C2','#1E3F47','#262A6B','#2B2F66','#F3EEFF','#121434','Onest','16px','22px'],
 C:['#F6F1FF','#FFFFFF','#2A2346','#6E6690','#FF8FB1','#FFE1EA','#2FA77A','#C9F0DD','#E9E2FB','#E6DEFA','#7B5CFF','#FFFFFF','Nunito','24px','24px'],
 D:['#E9F6F4','#FFFFFF','#0E4652','#4E7F87','#FF6B57','#FFE0DA','#1E9A8C','#CDEBE7','#D2E8E5','#D2E8E5','#0E4652','#FFFFFF','Rubik','16px','20px'],
 E:['#FFD84D','#FFF3B8','#1A1714','#5C5440','#FF4F7B','#FFC2D2','#1A1714','#FFF3B8','#F2C53A','#1A1714','#1A1714','#FFD84D','Onest','0px','0px'],
 F:['#F1F4E6','#FFFFFF','#2F3B22','#6B7A58','#E86A92','#FBDDE7','#4F7A2F','#DCEBC8','#DDE5C9','#DDE5C9','#4F7A2F','#FFFFFF','Nunito','18px','20px'],
 G:['#FBFAFF','#EEE8FF','#1F1B3A','#8A84A8','#FF5C8A','#FFE0EA','#2FAE86','#C9F0E1','#DCD3FA','#ECE8F8','#FF5C8A','#FFFFFF','Golos Text','999px','20px']
};
let DS = 'A', DT = DZ.en;
function designCSS(){
  let css = '';
  DESIGNS.forEach(k=>{ const c = PAL[k];
    css += `body[data-d="${k}"]{--canvas:${c[0]};--surface:${c[1]};--ink:${c[2]};--ink-soft:${c[3]};--bloom:${c[4]};--bloom-soft:${c[5]};
      --sage:${c[6]};--sage-soft:${c[7]};--mist:${c[8]};--line:${c[9]};--cta:${c[10]};--ctai:${c[11]};--ff:'${c[12]}';--rb:${c[13]};--r:${c[14]};}`; });
  css += `
body[data-d]{font-family:var(--ff),system-ui,sans-serif;background:var(--canvas);color:var(--ink)}
body[data-d] h1,body[data-d] .stepper b,body[data-d] .stat b,body[data-d] .dn{font-family:var(--ff),sans-serif;font-weight:800;letter-spacing:-.025em}
body[data-d] .cta{background:var(--cta);color:var(--ctai);border-radius:var(--rb);font-family:var(--ff),sans-serif}
body[data-d] .cta.ghost{background:transparent;color:var(--ink-soft)}
body[data-d] .inp{font-family:var(--ff),sans-serif}
body[data-d] .pick,body[data-d] .row,body[data-d] .card,body[data-d] .stepper{border-radius:var(--r)}
body[data-d] .opt{font-family:var(--ff),sans-serif}
body[data-d] .opt.on{background:var(--cta);color:var(--ctai);border-color:var(--cta)}
body[data-d="B"] .toggle{background:#3A3F7A}
body[data-d="E"] .card,body[data-d="E"] .row,body[data-d="E"] .pick,body[data-d="E"] .stepper,body[data-d="E"] .inp{border:2px solid #1A1714;background:#FFF3B8}
body[data-d="E"] .pick.on{background:#1A1714;color:#FFD84D}body[data-d="E"] .pick.on small{color:#FFD84D}
body[data-d="E"] .cta.ghost{border:2px solid #1A1714;color:#1A1714}
body[data-d="E"] h1{font-weight:800;letter-spacing:-.04em}
body[data-d="G"] .card{border-color:transparent}

/* ---- навигация ---- */
body[data-d] .nb i{display:none}body[data-d] .nb span{font-size:11.5px;font-weight:700}
body[data-d] .badge{display:none}
body[data-d="A"] .nav{border-top:1px solid var(--line)}body[data-d="A"] .nb.on{color:var(--ink)}
body[data-d="A"] .nb.on span{border-bottom:2px solid var(--bloom);padding-bottom:4px}
body[data-d="B"] .nav{left:16px;right:16px;bottom:calc(14px + var(--sb));height:56px;border-radius:28px;background:#1F2352;border:0;padding:4px}
body[data-d="B"] .nb{border-radius:24px;color:#9C99D0}body[data-d="B"] .nb.on{background:#F3EEFF;color:#121434}
body[data-d="C"] .nav{left:16px;right:16px;bottom:calc(14px + var(--sb));height:60px;border-radius:30px;background:#2A2346;border:0;padding:6px}
body[data-d="C"] .nb{border-radius:24px;color:#BDB4E6}body[data-d="C"] .nb.on{background:#FFE59A;color:#2A2346}
body[data-d="D"] .nav{background:#fff;border:0}body[data-d="D"] .nb i{display:block;width:22px;height:22px;border-radius:7px;background:#C9E3E0;font-size:0}
body[data-d="D"] .nb.on{color:var(--ink)}body[data-d="D"] .nb.on i{background:var(--bloom)}
body[data-d="E"] .nav{border-top:2px solid #1A1714;background:#FFD84D}body[data-d="E"] .nb{color:#1A1714}
body[data-d="E"] .nb.on{background:#1A1714;color:#FFD84D}
body[data-d="F"] .nav{left:16px;right:16px;bottom:calc(14px + var(--sb));height:60px;border-radius:20px;background:#fff;border:0}
body[data-d="F"] .nb{color:#9AA88A}body[data-d="F"] .nb.on{color:var(--ink)}
body[data-d="G"] .nav{background:#fff;border-top:1px solid var(--line)}body[data-d="G"] .nb.on{color:var(--ink)}
body[data-d="B"] .view,body[data-d="C"] .view,body[data-d="F"] .view{padding-bottom:calc(110px + var(--sb))}

/* ---- общие элементы новых экранов ---- */
.xh{font-size:30px;font-weight:800;letter-spacing:-.025em;line-height:1.1;margin:4px 0 6px}
.xs{color:var(--ink-soft);font-size:14px;line-height:1.45}
.fab{position:fixed;right:20px;bottom:calc(96px + var(--sb));z-index:20;height:54px;padding:0 24px;border:0;border-radius:27px;
  background:var(--cta);color:var(--ctai);font:700 15px var(--ff),sans-serif;box-shadow:0 8px 20px rgba(0,0,0,.15)}
/* A */
.tape{display:flex;gap:6px;overflow-x:auto;margin:8px -20px 0;padding:6px 20px}.tape::-webkit-scrollbar{display:none}
.tp{flex:0 0 46px;height:72px;border-radius:23px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;font-size:11px;color:var(--ink-soft);background:var(--surface);cursor:pointer}
.tp b{font-size:17px;color:var(--ink)}.tp.period{background:var(--bloom);color:#fff}.tp.period b{color:#fff}.tp.pred{background:var(--bloom-soft)}
.tp.fert{background:var(--sage-soft)}.tp.ovu{background:var(--ink);color:var(--sage-soft)}.tp.ovu b{color:#fff}.tp.today{box-shadow:inset 0 0 0 2px var(--bloom)}
.abig{font-size:32px;line-height:1.1;font-weight:800;letter-spacing:-.02em;margin-top:24px}.abig span{color:var(--sage)}
.tl{margin:24px 0 0 6px;border-left:2px solid var(--line);padding-left:20px}
.ev{position:relative;padding-bottom:20px}.ev:before{content:'';position:absolute;left:-27px;top:3px;width:12px;height:12px;border-radius:50%;background:var(--c)}
.ev small{font-size:12px;color:var(--ink-soft);display:block}.ev b{font-size:17px;font-weight:600;display:block;margin-top:2px}
.yr{display:grid;grid-template-columns:repeat(3,1fr);gap:18px 14px;margin-top:16px}
.mo small{font-size:12px;font-weight:700;display:block;margin-bottom:6px}.mo div{display:grid;grid-template-columns:repeat(7,1fr);gap:3px}
.mo i{aspect-ratio:1;border-radius:50%;background:var(--mist);cursor:pointer}.mo i.x{visibility:hidden}
.mo i.period{background:var(--bloom)}.mo i.pred{background:var(--bloom-soft);box-shadow:inset 0 0 0 1.5px var(--bloom)}.mo i.fert{background:var(--sage-soft)}.mo i.ovu{background:var(--sage)}.mo i.today{background:var(--ink)}
/* B */
.orb{position:relative;margin:4px auto 0;width:100%;max-width:340px}.orb svg{width:100%;display:block}
.orb circle{cursor:pointer}
.oc{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;pointer-events:none;text-align:center}
.oc small{font-size:12px;color:var(--ink-soft)}.oc b{font-size:78px;font-weight:800;letter-spacing:-.05em;line-height:1}.oc em{font-style:normal;font-size:14px;color:var(--sage);margin-top:4px}
.bsheet{background:var(--surface);border-radius:26px;padding:16px 18px;margin-top:10px}
.bsheet h3{font-size:18px}.bsheet p{font-size:14px;color:var(--ink-soft);margin-top:4px;line-height:1.45}
.chips{display:flex;gap:8px;margin-top:14px;flex-wrap:wrap}.chips span{flex:1;min-width:30%;text-align:center;padding:12px 6px;border-radius:14px;background:var(--mist);font-size:13px;cursor:pointer}
.mrow{display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--line);font-size:14px}
.mrow .bar{flex:1;height:10px;border-radius:5px;background:var(--mist);position:relative;overflow:hidden}.mrow .bar i{position:absolute;top:0;bottom:0;border-radius:5px}
/* C */
.cw{display:flex;gap:16px;margin-top:18px}
.scale{flex:0 0 60px;height:440px;border-radius:30px;background:var(--surface);position:relative;overflow:hidden}
.scale i{position:absolute;left:0;right:0}.scale .now{left:0;right:0;height:6px;background:var(--ink);border-radius:3px;z-index:2}
.cside{flex:1;display:flex;flex-direction:column;gap:12px}
.tile{border-radius:24px;padding:16px;background:var(--surface);cursor:pointer}
.tile b{display:block;font-size:21px;font-weight:800;line-height:1.15}.tile small{display:block;font-size:13px;color:var(--ink-soft);margin-top:4px}
.tile.m{background:var(--sage-soft)}.tile.y{background:#FFE59A}.tile.p{background:var(--bloom-soft)}
/* D */
.drop{width:72%;max-width:280px;display:block;margin:6px auto 0}
.dlv{text-align:center;margin-top:10px}.dlv b{display:block;font-size:30px;font-weight:700;letter-spacing:-.02em}.dlv span{font-size:15px;color:var(--ink-soft)}
.dpill{background:var(--surface);border-radius:20px;padding:14px 16px;display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:20px}
.dpill b{font-size:15px;display:block}.dpill small{font-size:13px;color:var(--ink-soft)}
.dpill button{border:0;background:var(--bloom);color:#fff;font:700 14px var(--ff),sans-serif;padding:11px 14px;border-radius:14px;white-space:nowrap}
.dr{display:flex;align-items:center;gap:14px;padding:11px 0;border-bottom:1px solid var(--line);cursor:pointer}
.dr .n{width:34px;font-size:20px;font-weight:700}.dr .w{width:30px;font-size:12px;color:var(--ink-soft)}.dr .b{width:6px;height:30px;border-radius:3px;background:var(--mist)}
.dr .t{font-size:15px}.dr.period .b{background:var(--bloom)}.dr.pred .b{background:var(--bloom-soft);box-shadow:inset 0 0 0 1.5px var(--bloom)}
.dr.fert .b,.dr.ovu .b{background:var(--sage)}.dr.today{background:var(--surface);border-radius:16px;padding-left:10px;margin:0 -10px;border:0}
/* E */
.elab{font-size:16px;font-weight:600;margin-top:6px}.enum{font-size:min(60vw,240px);font-weight:800;letter-spacing:-.07em;line-height:.85;margin-left:-6px}
.eunit{font-size:26px;font-weight:700;line-height:1.15}
.ecards{display:flex;gap:12px;overflow-x:auto;margin:26px -20px 0;padding:0 20px}.ecards::-webkit-scrollbar{display:none}
.ec{flex:0 0 230px;min-height:140px;padding:16px;background:#1A1714;color:#FFD84D;display:flex;flex-direction:column;justify-content:space-between;cursor:pointer}
.ec.l{background:#FFF3B8;color:#1A1714;border:2px solid #1A1714}.ec small{font-size:13px;opacity:.75}.ec b{font-size:21px;font-weight:700;line-height:1.15}
.wr{display:grid;grid-template-columns:38px repeat(7,1fr);align-items:center;border-bottom:2px solid #1A1714;min-height:54px}
.wr>b{font-size:12px}.wr i{font-style:normal;text-align:center;font-size:15px;font-weight:700;height:38px;display:flex;align-items:center;justify-content:center;cursor:pointer}
.wr i.period{background:var(--bloom);color:#fff}.wr i.pred{background:var(--bloom-soft)}.wr i.fert,.wr i.ovu{background:#1A1714;color:#FFD84D}.wr i.ovu{text-decoration:underline}
.wr i.today{outline:3px solid #1A1714;outline-offset:-3px;background:#fff}
/* F */
.plant{width:100%;max-width:340px;display:block;margin:0 auto}
.fl{display:flex;gap:10px;margin-top:8px}.fl div{flex:1;background:var(--surface);border-radius:20px;padding:14px;cursor:pointer}
.fl b{display:block;font-size:19px;font-weight:800}.fl small{font-size:12px;color:var(--ink-soft)}
/* сетки месяца для A/B/C/E/F/G */
.gm{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin-top:6px}
.gm i{font-style:normal;aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;cursor:pointer;background:var(--mist);border-radius:50%}
.gm i.x{visibility:hidden}.gm i.period{background:var(--bloom);color:#fff}.gm i.pred{background:var(--bloom-soft);color:var(--bloom)}
.gm i.fert{background:var(--sage-soft);color:var(--sage)}.gm i.ovu{background:var(--sage);color:#fff}.gm i.today{box-shadow:0 0 0 2.5px var(--ink)}
.gm i.dot:after{content:'';position:absolute}
.gm.sq i{border-radius:10px}.gm.hm i{border-radius:12px}
.gmh{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin-top:12px;font-size:11px;font-weight:700;color:var(--ink-soft);text-align:center}
/* G: чат */
.gfeed{display:flex;flex-direction:column;gap:8px;margin-top:8px}
.gm1{max-width:84%;background:var(--surface);border-radius:20px 20px 20px 6px;padding:12px 14px;font-size:15px;line-height:1.45}
.gm1.u{margin-left:auto;background:var(--ink);color:#fff;border-radius:20px 20px 6px 20px}
.gday{text-align:center;font-size:12px;color:var(--ink-soft);margin:6px 0}
.mini{display:flex;gap:3px;margin-top:10px}.mini i{flex:1;height:20px;border-radius:5px;background:var(--mist)}
.mini i.period{background:var(--bloom)}.mini i.fert{background:var(--sage-soft)}.mini i.ovu{background:var(--sage)}.mini i.today{background:var(--ink)}
.gchips{display:flex;gap:8px;flex-wrap:wrap;margin-top:6px}.gchips span{padding:10px 14px;border-radius:999px;border:1.5px solid var(--mist);font-size:14px;font-weight:600;cursor:pointer;background:#fff}
.gchips span.on{background:var(--bloom);border-color:var(--bloom);color:#fff}
/* лист ввода: варианты */
.opts.tiles{display:grid;grid-template-columns:1fr 1fr;gap:10px}.opts.tiles .opt{height:78px;border-radius:22px;display:flex;align-items:flex-end;padding:12px;font-weight:800;font-size:14px;border:0;background:var(--surface)}
.opts.squares{display:grid;grid-template-columns:repeat(3,1fr);gap:0;border-top:2px solid #1A1714;border-left:2px solid #1A1714}
.opts.squares .opt{border:0;border-right:2px solid #1A1714;border-bottom:2px solid #1A1714;border-radius:0;height:70px;display:flex;align-items:flex-end;background:#FFF3B8;font-weight:700}
.opts.checks{display:flex;flex-direction:column;gap:8px}.opts.checks .opt{display:flex;align-items:center;gap:12px;background:var(--surface);border:0;border-radius:16px;padding:13px 14px;font-size:15px;color:var(--ink)}
.opts.checks .opt:before{content:'';width:22px;height:22px;border-radius:7px;border:2.5px solid var(--sage);flex:0 0 auto}
.opts.checks .opt.on{background:var(--surface);color:var(--ink)}.opts.checks .opt.on:before{background:var(--sage);box-shadow:inset 0 0 0 3px var(--surface)}
.opts.dots{display:flex;gap:10px;align-items:center;flex-wrap:wrap}.opts.dots .opt{width:34px;height:34px;padding:0;border-radius:50%;font-size:0;border:0;background:var(--mist)}
.opts.dots .opt.on,.opts.dots .opt.lit{background:var(--bloom)}.opts.dots+.dl{font-size:13px;color:var(--ink-soft);margin:-8px 0 14px;text-transform:none;letter-spacing:0;font-weight:500}
.qcard{background:var(--surface);border-radius:28px;padding:22px 18px;margin-top:8px}
.qcard small{font-size:13px;color:var(--ink-soft)}.qcard h2{font:700 26px var(--ff),sans-serif;margin:8px 0 18px;line-height:1.15}
.qcard .opts.tiles .opt{background:var(--canvas)}.qcard .opts.tiles .opt.on{background:var(--cta);color:var(--ctai)}
body[data-d] .bars .bar{background:var(--sage);opacity:.45}body[data-d] .bars .bar.hi{background:var(--bloom);opacity:1}
.qprog{display:flex;gap:6px;margin:14px 0}.qprog i{flex:1;height:5px;border-radius:3px;background:var(--mist)}.qprog i.on{background:var(--ink)}
.qnav{display:flex;gap:10px}.qnav .cta{margin-top:0}
.lkp{display:flex;gap:12px;align-items:center}.lkp .sw{display:flex;gap:3px;flex:0 0 auto}.lkp .sw i{width:14px;height:34px;border-radius:5px}
`;
  return css;
}
function applyDesign(){
  DS = DESIGNS.indexOf(S.settings.design)>=0 ? S.settings.design : 'A';
  document.body.dataset.d = DS;
  if(!document.getElementById('nia-design-css')){
    const l = document.createElement('link'); l.rel='stylesheet';
    l.href='https://fonts.googleapis.com/css2?family=Golos+Text:wght@400;500;600;700;800&family=Onest:wght@400;500;700;800&family=Nunito:wght@400;600;800;900&family=Rubik:wght@400;500;700&display=swap';
    document.head.appendChild(l);
    const s = document.createElement('style'); s.id='nia-design-css'; s.textContent = designCSS(); document.head.appendChild(s);
  }
  try{ const m=document.querySelector('meta[name="theme-color"]'); if(m) m.setAttribute('content', PAL[DS][0]); }catch(e){}
}
function setDesign(k){ S.settings.design = k; save(); applyDesign(); }

/* ---------- общие данные для экранов ---------- */
function homeCtx(){
  const p = predict(); if(!p) return null;
  const phase = phaseOf(TODAY,p);
  const phLbl = {period:T.ph_period,fert:T.ph_fert,ovu:T.ph_ovu,pred:T.ph_period}[phase]
    || (S.user.bc==='yes' ? T.ph_luteal : (TODAY>p.ovu ? T.ph_luteal : T.ph_foll));
  let title, body;
  if(p.late>0 && phase!=='period'){ title = T.lateT(p.late); body = T.lateS; }
  else if(S.user.bc==='yes'){ title = `${T.predP} ${fmtDate(p.nextP)}`; body = T.bcNote; }
  else if(p.irregular){ title = `${T.predRange} ${fmtDate(addDays(p.ovu,-2))} — ${fmtDate(addDays(p.ovu,3))}`; body = T.accLow; }
  else if(TODAY>p.ovu){ title = `${T.predP} ${fmtDate(p.nextP)}`; body = p.count>=3 ? T.accHi : T.accNew; }
  else { title = `${T.predO} ${fmtDate(p.ovu)}`; body = p.count>=3 ? T.accHi : T.accNew; }
  const day = Math.max(1,p.day), len = Math.max(p.len, day);
  const until = Math.max(0, diffDays(TODAY, p.nextP));
  const untilTxt = p.late>0 ? T.lateT(p.late) : DT.untilP(until);
  const events = [];
  if(S.user.bc!=='yes' && !p.late){
    if(p.fertStart>TODAY) events.push([p.fertStart, DT.evFert, 'var(--sage-soft)']);
    if(p.ovu>=TODAY) events.push([p.ovu, T.ph_ovu, 'var(--sage)']);
  }
  events.push([p.nextP, p.irregular ? `${T.ph_period}, ±${Math.max(2,Math.round(p.sd))}` : T.ph_period, 'var(--bloom)']);
  const greet = S.user.name ? `${T.hi}${LANG==="ar"?"،":","} ${esc(S.user.name)}` : T.hi;
  return {p,phase,phLbl,title,body,day,len,until,untilTxt,events,greet};
}
const trialBar = ()=> S.sub.status==='trial'
  ? `<div class="card" style="background:var(--mist);border-color:transparent;padding:12px 16px;margin-top:14px;display:flex;justify-content:space-between;align-items:center">
     <span style="font-size:12.5px">${T.trialLeft}</span><b style="font-size:12.5px;color:var(--bloom)">${trialDaysLeft()} ${T.trialDays}</b></div>` : '';
function dayCls(ds,p){ let c = phaseOf(ds,p) || ''; if(ds===TODAY) c += ' today'; return c.trim(); }
const wdShort = ds => T.wd[(parse(ds).getDay()+6)%7].toLowerCase();
function bindDays(root){ root.querySelectorAll('[data-d]').forEach(e=>e.onclick=()=>openSheet(e.dataset.d)); }

/* ---------- ГЛАВНЫЙ ЭКРАН: 7 вариантов ---------- */
function renderHome(){
  const c = homeCtx(), v = $('home');
  if(!c){
    v.innerHTML = `<div class="xh">${S.user.name?`${T.hi}${LANG==="ar"?"،":","} ${esc(S.user.name)}`:T.hi}</div><p class="xs">${T.dateLong(new Date())}</p>
      <div class="tile p" id="hLog" style="margin-top:22px;padding:26px 20px"><b>${T.nodata}</b><small>${DT.noHome}</small></div>`;
    $('hLog').onclick = ()=>openSheet(TODAY); return;
  }
  HOME[DS](c, v);
  bindDays(v);
  v.querySelectorAll('[data-log]').forEach(e=>e.onclick=()=>openSheet(TODAY));
}
const HOME = {
 A(c,v){
  let tape=''; for(let i=-2;i<=12;i++){ const ds=addDays(TODAY,i);
    tape+=`<div class="tp ${dayCls(ds,c.p)}" data-d="${ds}">${wdShort(ds)}<b>${parse(ds).getDate()}</b></div>`; }
  v.innerHTML = `<p class="xs">${T.dateLong(new Date())}</p><div class="tape">${tape}</div>
   <div class="abig">${DT.dayNth(c.day)}.<br><span>${c.title}</span></div><p class="xs" style="margin-top:10px">${c.body}</p>
   <div class="tl">${c.events.map(([d,t,col])=>`<div class="ev" style="--c:${col}"><small>${fmtDate(d)}</small><b>${t}</b></div>`).join('')}</div>
   ${trialBar()}<button class="fab" data-log>+ ${T.logday}</button>`;
 },
 B(c,v){
  const R=118,cx=150,cy=150,N=c.len; let s='';
  for(let i=0;i<N;i++){ const ds=addDays(c.p.lastStart,i), a=-Math.PI/2+(i-(c.day-1))/N*2*Math.PI;
    const x=cx+Math.cos(a)*R, y=cy+Math.sin(a)*R, ph=phaseOf(ds,c.p);
    const col= ds===TODAY?'var(--ink)': ph==='period'||ph==='pred'?'var(--bloom)': ph==='ovu'?'var(--sage)': ph==='fert'?'var(--sage)':'var(--mist)';
    const r = ds===TODAY?12: ph==='ovu'?8: ph?6:5;
    s+=`<circle data-d="${ds}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" style="fill:${col}" opacity="${ph==='fert'?.75:1}"/>`;
    if(ds!==TODAY && (i+1)%7===1) s+=`<text x="${(cx+Math.cos(a)*(R+22)).toFixed(1)}" y="${(cy+Math.sin(a)*(R+22)+4).toFixed(1)}" font-size="11" style="fill:var(--ink-soft)" text-anchor="middle">${i+1}</text>`;
  }
  v.innerHTML = `<p class="xs" style="text-align:center">${T.dateLong(new Date())}</p>
   <div class="orb"><svg viewBox="0 0 300 300">${s}</svg><div class="oc"><small>${T.dayof}</small><b>${c.day}</b><em>${c.phLbl}</em></div></div>
   <p class="xs" style="text-align:center;font-size:12.5px">${DT.tapDay}</p>
   <div class="bsheet"><h3>${c.untilTxt}</h3><p>${c.title}. ${c.body}</p>
   <div class="chips">${S.user.metrics.slice(0,3).map(k=>`<span data-log>${T['m_'+k]}</span>`).join('')}</div></div>${trialBar()}`;
 },
 C(c,v){
  const L=c.len, seg=[]; let prev=null,start=0;
  for(let i=0;i<=L;i++){ const ph = i<L ? (phaseOf(addDays(c.p.lastStart,i),c.p)||'') : '#';
    const k = ph==='ovu'?'fert':ph==='pred'?'period':ph; if(k!==prev){ if(prev!==null) seg.push([start,i,prev]); prev=k; start=i; } }
  const col = k=> k==='period'?'var(--bloom)':k==='fert'?'var(--sage-soft)':'var(--mist)';
  const scale = seg.map(([a,b,k])=>`<i style="top:${a/L*100}%;height:${(b-a)/L*100}%;background:${col(k)}"></i>`).join('')
    + `<i class="now" style="top:calc(${(c.day-.5)/L*100}% - 3px)"></i>`;
  v.innerHTML = `<div class="xh">${DT.dayOf(c.day,L)}</div><p class="xs">${T.dateLong(new Date())}</p>
   <div class="cw"><div class="scale">${scale}</div><div class="cside">
    <div class="tile m"><b>${c.phLbl}</b><small>${c.title}</small></div>
    <div class="tile"><b>${c.untilTxt}</b><small>${fmtDate(c.p.nextP)}</small></div>
    <div class="tile y" data-log><b>${T.logday}</b><small>${T.sheetS}</small></div></div></div>${trialBar()}`;
 },
 D(c,v){
  const lvl = Math.min(1, c.day/c.len), y = 350 - lvl*330;
  const drop = `<svg class="drop" viewBox="0 0 280 360"><defs><clipPath id="dclip"><path d="M140 6C140 6 20 150 20 230a120 120 0 0 0 240 0C260 150 140 6 140 6z"/></clipPath></defs>
   <path d="M140 6C140 6 20 150 20 230a120 120 0 0 0 240 0C260 150 140 6 140 6z" style="fill:var(--surface)"/>
   <g clip-path="url(#dclip)"><path d="M0 ${y} q35 -14 70 0 t70 0 t70 0 t70 0 V360 H0z" fill="${c.phase==='period'?'var(--bloom)':'var(--sage)'}"/>
   <path d="M0 ${y+10} q35 12 70 0 t70 0 t70 0 t70 0 V360 H0z" style="fill:var(--ink)" opacity=".18"/></g></svg>`;
  v.innerHTML = `<div style="display:flex;justify-content:space-between;font-weight:700;font-size:15px"><span>${T.dateLong(new Date())}</span><span>${c.day} / ${c.len}</span></div>
   ${drop}<div class="dlv"><b>${c.phLbl}</b><span>${DT.cycFill(Math.round(lvl*100))}</span></div>
   <div class="dpill"><div><b>${c.untilTxt}</b><small>${c.title}</small></div><button data-log>${T.logday}</button></div>${trialBar()}`;
 },
 E(c,v){
  const late = c.p.late>0;
  v.innerHTML = `<div class="elab">${late?T.lateT(c.p.late):DT.untilLbl}</div>
   <div class="enum">${late?c.p.late:c.until}</div>
   <div class="eunit">${DT.daysW(late?c.p.late:c.until)}.<br>${late?'':fmtDate(c.p.nextP)+'.'}</div>
   <div class="ecards"><div class="ec" data-log><small>${DT.dayNth(c.day)}</small><b>${c.phLbl}</b></div>
   ${c.events.filter(e=>e[0]!==c.p.nextP).map(([d,t])=>`<div class="ec l"><small>${fmtDate(d)}</small><b>${t}</b></div>`).join('')}
   <div class="ec l" data-log><small>${T.today}</small><b>${T.logday}</b></div></div>${trialBar()}`;
 },
 F(c,v){
  const L=c.len, step=Math.min(15, 380/L), H=Math.round(L*step+50);
  let leaves='';
  for(let i=0;i<L;i++){ const yy=H-30-i*step, side=i%2?1:-1, ds=addDays(c.p.lastStart,i), ph=phaseOf(ds,c.p);
    const col = ph==='period'||ph==='pred'?'var(--bloom)': ph==='fert'||ph==='ovu'?'var(--sage)':'#A9BE8C';
    const cxp=195+side*17;
    leaves += i<c.day
      ? `<ellipse data-d="${ds}" cx="${cxp}" cy="${yy}" rx="17" ry="7" transform="rotate(${side*-28} ${cxp} ${yy})" style="fill:${col}"/>`
      : `<ellipse data-d="${ds}" cx="${cxp}" cy="${yy}" rx="17" ry="7" transform="rotate(${side*-28} ${cxp} ${yy})" fill="none" stroke="#C5CFB0" stroke-width="2" stroke-dasharray="4 4"/>`;
    if(ph==='ovu') leaves += `<circle cx="${195-side*16}" cy="${yy}" r="9" fill="${i<c.day?'#FFD27A':'none'}" stroke="#E0A93C" stroke-width="2"/>`;
  }
  const grown = H-30-(c.day-1)*step;
  v.innerHTML = `<div class="xh">${c.day} / ${c.len}</div><p class="xs">${DT.leafS}</p>
   <svg class="plant" viewBox="0 0 390 ${H}"><path d="M195 ${H} V${H-30-(L-1)*step}" stroke="#C5CFB0" stroke-width="3" stroke-dasharray="5 5"/>
   <path d="M195 ${H} V${grown}" style="stroke:var(--sage)" stroke-width="5" stroke-linecap="round"/>${leaves}</svg>
   <div class="fl"><div><b>${c.p.late?T.lateT(c.p.late):c.until+' '+DT.daysW(c.until)}</b><small>${T.ph_period}: ${fmtDate(c.p.nextP)}</small></div>
   <div data-log><b>${T.logday}</b><small>${c.phLbl}</small></div></div>${trialBar()}`;
 },
 G(c,v){
  let mini=''; for(let i=0;i<c.len;i++){ const ds=addDays(c.p.lastStart,i); mini+=`<i class="${dayCls(ds,c.p)}"></i>`; }
  const lg = S.logs[TODAY];
  v.innerHTML = `<div class="gfeed"><div class="gday">${T.dateLong(new Date())}</div>
   <div class="gm1">${c.greet}! ${DT.todayIs(c.day)}<div class="mini">${mini}</div></div>
   <div class="gm1"><b>${c.title}.</b> ${c.body}</div>
   <div class="gm1">${c.untilTxt}.</div>
   ${lg ? `<div class="gm1 u">${[lg.flow!=null?T['f'+lg.flow]:null,...(lg.mood||[]).map(labelOf),...(lg.pain||[]).map(labelOf)].filter(Boolean).join(' · ')||T.saved}</div>`
        : `<div class="gm1">${DT.chatHow}</div>`}
   <div class="gchips"><span class="on" data-log>${T.logday}</span><span id="gCal">${T.cal}</span></div></div>${trialBar()}`;
  $('gCal').onclick = ()=>goTab(1);
 }
};

/* ---------- КАЛЕНДАРЬ: 7 вариантов ---------- */
let calM = new Date().getMonth(), calY = new Date().getFullYear();
function monthDays(y,m){
  const p = predict(), out=[], lead=(new Date(y,m,1).getDay()+6)%7, dim=new Date(y,m+1,0).getDate();
  for(let i=0;i<lead;i++) out.push(null);
  for(let d=1; d<=dim; d++){ const ds=`${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    out.push({ds,d,c:(p?dayCls(ds,p):(ds===TODAY?'today':''))+(S.logs[ds]?' dot':'')}); }
  return out;
}
const gridHtml = (y,m,extra='') => `<div class="gmh">${T.wd.map(w=>`<div>${w}</div>`).join('')}</div>
  <div class="gm ${extra}">${monthDays(y,m).map(x=>x?`<i class="${x.c}" data-d="${x.ds}">${x.d}</i>`:'<i class="x"></i>').join('')}</div>`;
const monthNav = ()=> `<div class="mnav"><button data-m="-1">‹</button><h1 style="margin:0;font-size:22px">${T.monN[calM]} ${calY}</h1><button data-m="1">›</button></div>`;
const legend = ()=> `<div class="legend"><span><i class="sw" style="background:var(--bloom)"></i>${T.ph_period}</span>
  <span><i class="sw" style="background:var(--bloom-soft)"></i>${T.predicted}</span><span><i class="sw" style="background:var(--sage-soft)"></i>${T.ph_fert}</span>
  <span><i class="sw" style="background:var(--sage)"></i>${T.ph_ovu}</span></div>`;
function histHtml(){
  const cs = S.cycles.slice().sort((a,b)=>a.start<b.start?1:-1);
  return `<div class="eyebrow">${T.hist}</div>` + (cs.length ? cs.map((c,i)=>{
    const nx=cs[i-1], len=nx?diffDays(c.start,nx.start):null, pd=c.end?diffDays(c.start,c.end)+1:null, d=parse(c.start);
    return `<div class="card"><h3>${T.monS[d.getMonth()]} ${d.getFullYear()} · ${len? len+' '+T.daysx : '—'}</h3><p>${pd? T.calPd(pd) : fmtDate(c.start)}${c.atypical? T.atyp:''}</p></div>`;
  }).join('') : `<div class="card"><p>${T.noHist}</p></div>`) + `<p class="note">${T.allfree}</p>`;
}
function renderCal(){
  const v = $('calv'); CAL[DS](v);
  v.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{ calM += +b.dataset.m;
    if(calM<0){calM=11;calY--;} if(calM>11){calM=0;calY++;} renderCal(); });
  bindDays(v);
}
const CAL = {
 A(v){
  let yr=''; for(let k=-2;k<=3;k++){ const dt=new Date(calY,calM+k,1), y=dt.getFullYear(), m=dt.getMonth();
    yr += `<div class="mo"><small>${T.monS[m]}${y!==new Date().getFullYear()?' '+y:''}</small><div>${monthDays(y,m).map(x=>x?`<i class="${x.c}" data-d="${x.ds}"></i>`:'<i class="x"></i>').join('')}</div></div>`; }
  v.innerHTML = `<div class="mnav"><button data-m="-6">‹</button><h1 style="margin:0;font-size:22px">${T.monS[(calM+10)%12]} — ${T.monS[(calM+3)%12]}</h1><button data-m="6">›</button></div>
   <div class="yr">${yr}</div>${legend()}<div style="margin-top:22px">${monthNav()}${gridHtml(calY,calM)}</div>${histHtml()}`;
 },
 B(v){
  const cs=S.cycles.slice().sort((a,b)=>a.start<b.start?-1:1).slice(-6), p=predict(); let rows='';
  cs.forEach((c,i)=>{ const nx=cs[i+1], L=nx?diffDays(c.start,nx.start):(p?p.len:S.user.cycleLen), pd=c.end?diffDays(c.start,c.end)+1:(p?p.pLen:S.user.periodLen);
    const ov=L-(S.user.lutealLen||14), d=parse(c.start), W=Math.max(L,35);
    rows += `<div class="mrow"><span style="width:44px">${T.monS[d.getMonth()]}</span><div class="bar">
      <i style="left:0;width:${pd/W*100}%;background:var(--bloom)"></i>${S.user.bc!=='yes'?`<i style="left:${(ov-5)/W*100}%;width:${7/W*100}%;background:var(--sage)"></i>`:''}</div>
      <span style="color:var(--ink-soft);font-size:13px;width:38px;text-align:right">${nx?L+' '+T.daysx.slice(0,1):'…'}</span></div>`; });
  v.innerHTML = `${rows?`<div class="xh" style="font-size:24px">${T.hist}</div>${rows}<p class="xs" style="margin:10px 0 18px">${DT.rowHint}</p>`:''}
   ${monthNav()}${gridHtml(calY,calM)}${legend()}`;
 },
 C(v){
  const p=predict();
  v.innerHTML = `${monthNav()}${gridHtml(calY,calM,'hm')}
   ${p?`<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:16px">
     <div class="tile p"><b>${T.ph_period}</b><small>${fmtDate(p.nextP)}</small></div>
     ${S.user.bc!=='yes'?`<div class="tile m"><b>${T.ph_fert}</b><small>${fmtDate(p.fertStart)} — ${fmtDate(p.fertEnd)}</small></div>`:''}</div>`:''}
   ${legend()}${histHtml()}`;
 },
 D(v){
  const p=predict();
  const rows = monthDays(calY,calM).filter(Boolean).map(x=>{
    const ph=(x.c.match(/period|pred|fert|ovu/)||[''])[0];
    const lbl = x.ds===TODAY ? T.today : ph==='ovu'?T.ph_ovu: ph==='fert'?T.ph_fert: ph==='period'?T.ph_period: ph==='pred'?T.predicted+' · '+T.ph_period:'';
    return `<div class="dr ${x.c}" data-d="${x.ds}"><span class="n">${x.d}</span><span class="w">${wdShort(x.ds)}</span><span class="b"></span><span class="t">${lbl}${S.logs[x.ds]?' ✓':''}</span></div>`;
  }).join('');
  v.innerHTML = `${monthNav()}${rows}${histHtml()}`;
 },
 E(v){
  const days=monthDays(calY,calM); let rows='';
  for(let i=0;i<days.length;i+=7){ const wk=days.slice(i,i+7); while(wk.length<7) wk.push(null);
    const first=wk.find(Boolean); const dt=parse(first.ds); const onejan=new Date(dt.getFullYear(),0,1);
    const wn=Math.ceil(((dt-onejan)/864e5 + ((onejan.getDay()+6)%7)+1)/7);
    rows += `<div class="wr"><b>${wn}</b>${wk.map(x=>x?`<i class="${x.c}" data-d="${x.ds}">${x.d}</i>`:'<i></i>').join('')}</div>`; }
  v.innerHTML = `${monthNav()}<div class="wr" style="min-height:30px"><b>${DT.wk}</b>${T.wd.map(w=>`<i style="font-size:11px;cursor:default">${w}</i>`).join('')}</div>${rows}${legend()}${histHtml()}`;
 },
 F(v){ v.innerHTML = `${monthNav()}${gridHtml(calY,calM)}${legend()}${histHtml()}`; },
 G(v){
  v.innerHTML = `<div class="gfeed"><div class="gm1" style="max-width:100%">${monthNav()}${gridHtml(calY,calM,'sq')}</div>
   <div class="gm1">${legend()}</div></div>${histHtml()}`;
 }
};

/* ---------- ЛИСТ ВВОДА ДНЯ: стили по оформлению ---------- */
let sheetDate = null, draft = {};
function logGroups(){
  const M=S.user.metrics, g=[[T.flow,'flow',['f0','f1','f2','f3','f4'],true]];
  if(M.includes('mood')) g.push([T.mood,'mood',['mo1','mo2','mo3','mo4','mo5'],false]);
  if(M.includes('pain')) g.push([T.pain,'pain',['pa1','pa2','pa3','pa4','pa5'],false]);
  if(M.includes('energy')) g.push([T.energy,'energy',['en1','en2','en3','en4'],true]);
  return g;
}
function grpHtml([lbl,key,items,single], style){
  const isDots = style==='dots' && single;
  const sel = single ? (draft[key]!=null ? T[items[draft[key]]] : '—') : '';
  return `<div class="lbl">${lbl}</div><div class="opts ${isDots?'dots':style==='dots'?'':style}" data-g="${key}" data-single="${single?1:0}">
    ${items.map((k,i)=>{ const on = single ? draft[key]===i : (draft[key]||[]).includes(k);
      const lit = isDots && draft[key]!=null && i<=draft[key];
      return `<div class="opt ${on?'on':''} ${lit?'lit':''}" data-v="${single?i:k}">${T[k]}</div>`; }).join('')}</div>${isDots?`<div class="dl" data-dl="${key}">${sel}</div>`:''}`;
}
function extraInputs(){
  const M=S.user.metrics;
  return `${M.includes('sleep')? `<div class="lbl">${T.sleeph}</div><input class="inp" type="number" step="0.5" min="0" max="16" id="slp" value="${draft.sleep??''}">`:''}
    ${M.includes('bbt')? `<div class="lbl">${T.m_bbt}</div><input class="inp" type="number" step="0.01" min="34" max="42" id="bbt" value="${draft.bbt??''}">`:''}`;
}
function bindGroups(root){
  root.querySelectorAll('[data-g]').forEach(g=>{
    const key = g.dataset.g, single = g.dataset.single === '1', dots = g.classList.contains('dots');
    g.querySelectorAll('[data-v]').forEach(o=>o.onclick=()=>{
      if(single){ const v=+o.dataset.v;
        draft[key] = draft[key]===v ? null : v;
        g.querySelectorAll('[data-v]').forEach(x=>{ const i=+x.dataset.v;
          x.classList.toggle('on', draft[key]===i); x.classList.toggle('lit', dots && draft[key]!=null && i<=draft[key]); });
        const dl = root.querySelector(`[data-dl="${key}"]`); if(dl) dl.textContent = draft[key]!=null ? o.textContent : '—';
      } else { const v=o.dataset.v; draft[key]=draft[key]||[];
        if(draft[key].includes(v)){ draft[key]=draft[key].filter(x=>x!==v); o.classList.remove('on'); }
        else { draft[key].push(v); o.classList.add('on'); } }
    });
  });
}
function openSheet(d){
  sheetDate = d;
  draft = JSON.parse(JSON.stringify(S.logs[d] || {flow:null,mood:[],pain:[],energy:null,sleep:null,bbt:null}));
  draft.mood = (draft.mood||[]).map(normKey).filter(Boolean);
  draft.pain = (draft.pain||[]).map(normKey).filter(Boolean);
  const sh = $('sheet');
  if(DS==='D') return questionSheet(0);
  const style = {A:'',B:'dots',C:'tiles',E:'squares',F:'checks',G:''}[DS];
  const groups = logGroups().map(g=> DS==='G'
    ? `<div class="gm1" style="margin:14px 0 8px">${DT.q(g[0])}</div>${grpHtml(g,'').replace(/<div class="lbl">.*?<\/div>/,'').replace('class="opts ','class="opts gchips ')}`
    : grpHtml(g,style)).join('');
  sh.innerHTML = `<div class="grab"></div><h1 style="font-size:21px;margin-bottom:4px">${fmtDate(d)}</h1>
    <p class="sub">${T.sheetS}</p>${groups}${extraInputs()}<button class="cta" id="sv">${T.save}</button>`;
  if(DS==='G') sh.querySelectorAll('.gchips .opt').forEach(o=>o.style.cssText='padding:10px 14px;border-radius:999px;font-size:14px');
  bindGroups(sh);
  $('sv').onclick = saveDay;
  sh.classList.add('on'); $('scrim').classList.add('on');
}
function questionSheet(i){
  const sh=$('sheet'), G=logGroups(), n=G.length + (extraInputs().trim()?1:0);
  const cur = i<G.length ? grpHtml(G[i],'tiles') : extraInputs();
  const title = i<G.length ? G[i][0] : (S.user.metrics.includes('sleep')?T.m_sleep:T.m_bbt);
  sh.innerHTML = `<div class="grab"></div><h1 style="font-size:19px">${fmtDate(sheetDate)}</h1>
    <div class="qprog">${Array.from({length:n},(_,k)=>`<i class="${k<=i?'on':''}"></i>`).join('')}</div>
    <div class="qcard"><small>${DT.qOf(i+1,n)}</small><h2>${DT.q(title)}</h2>${cur.replace(/<div class="lbl">.*?<\/div>/,'')}</div>
    <div class="qnav">${i>0?`<button class="cta ghost" id="qb">${DT.back}</button>`:''}<button class="cta" id="qn">${i<n-1?T.next:T.save}</button></div>`;
  bindGroups(sh);
  const keep = ()=>{ const sl=$('slp'), bb=$('bbt'); if(sl) draft.sleep = sl.value===''?null:+sl.value; if(bb) draft.bbt = bb.value===''?null:+bb.value; };
  $('qn').onclick = ()=>{ keep(); if(i<n-1) questionSheet(i+1); else saveDay(); };
  if($('qb')) $('qb').onclick = ()=>{ keep(); questionSheet(i-1); };
  sh.classList.add('on'); $('scrim').classList.add('on');
}

/* ---------- выбор оформления ---------- */
function openLookSheet(){
  $('sheet').innerHTML = `<div class="grab"></div><h1 style="font-size:21px;margin-bottom:4px">${DT.lookT}</h1><p class="sub">${DT.lookS}</p>
   ${DESIGNS.map(k=>{ const c=PAL[k]; return `<div class="pick ${DS===k?'on':''}" data-look="${k}"><span class="lkp"><span class="sw">
     <i style="background:${c[0]};box-shadow:inset 0 0 0 1px rgba(0,0,0,.12)"></i><i style="background:${c[4]}"></i><i style="background:${c[6]}"></i><i style="background:${c[2]}"></i></span>
     <span><b>${DT[k]}</b><small>${DT[k+'s']}</small></span></span></div>`; }).join('')}`;
  $('sheet').querySelectorAll('[data-look]').forEach(e=>e.onclick=()=>{
    setDesign(e.dataset.look); closeSheet(); renderNav(); renderSet(); $('barTitle').textContent = T.set; });
  $('sheet').classList.add('on'); $('scrim').classList.add('on');
}

function DICT(){ return {
ru:{tagline:'цикл, который знаете только вы',
 hello:'Привет, я Ниа', hello2:'Давай настроим твой календарь',
 w1s:`Записи хранятся на телефоне и в вашем личном ${CLOUD}. Ни рекламные сети, ни мы не имеем к ним доступа.`,
 start:'Начать', restore:'У меня уже есть резервная копия', noreg:'Настройка займёт около минуты. Без регистрации и без почты.',
 next:'Дальше', skip:'Пропустить', done:'Всё готово',
 q1:'Зачем вы здесь?', q1s:'От этого зависит, что мы покажем на главном экране.',
 g1:'Следить за циклом', g1s:'Знать, когда ждать менструацию и ПМС',
 g2:'Планирую беременность', g2s:'Точное фертильное окно и овуляция',
 g3:'Хочу избежать беременности', g3s:'Дни с низкой вероятностью зачатия',
 g4:'Разобраться с симптомами', g4s:'Боль, настроение, сон и их связь с циклом',
 q2:'Как к вам обращаться?', q2s:'Имя остаётся на телефоне. Можно пропустить.',
 nameph:'Имя или ник', byear:'Год рождения',
 byears:'Нужен, чтобы точнее считать норму: цикл в 17 и в 45 ведёт себя по-разному. Полную дату не спрашиваем.',
 byearl:'год рождения',
 q3:'Когда начались последние месячные?', q3s:'Это точка отсчёта для первого прогноза. Позже можно поправить в календаре.',
 dunno:'Не помню', dunnos:'Начнём с первого дня, когда отметите менструацию',
 q4:'Длина цикла и менструации', q4s:'Не знаете точно — оставьте как есть. Через два цикла посчитаем сами.',
 cyclel:'дней в цикле', periodl:'дней менструация',
 q5:'Насколько цикл регулярный?', q5s:'Это меняет алгоритм. При нестабильном цикле покажем диапазон вместо точной даты.',
 r1:'Стабильный', r1s:'Разница между циклами до 3 дней',
 r2:'Бывает сдвигается', r2s:'Разница до недели',
 r3:'Нерегулярный', r3s:'Может отличаться сильно, задержки обычны',
 r4:'Не знаю', r4s:'Определим по вашим записям',
 bc:'Гормональная контрацепция', bcn:'Не принимаю', bcy:'Принимаю', bcys:'Тогда овуляцию прогнозировать не будем',
 q6:'Что отслеживать?', q6s:'Выберите, что будет на главном экране. Остальное скроем. Позже можно изменить.',
 m_mood:'Настроение', m_pain:'Боль и спазмы', m_disch:'Выделения', m_sleep:'Сон',
 m_energy:'Энергия', m_bbt:'Базальная температура', m_med:'Лекарства и витамины',
 q7:'Где хранить данные', q7s:'Чтобы записи не пропали при смене телефона.',
 bk:`Копия в вашем ${CLOUD}`, bks:'Зашифровано на телефоне до отправки. Мы не можем это прочитать',
 lock:`Вход по ${BIO}`, locks:'Приложение закрыто, если телефон возьмёт кто-то другой',
 rem:'Напоминания', rems:'О начале цикла и приёме таблеток. Тон выбираете вы',
 nope:'Что мы не делаем', nopes:'Не показываем рекламу, не передаём данные третьим лицам, не просим почту и телефон, не строим ваш профиль.',
 delnote:'Удалить все данные можно в любой момент, одной кнопкой.',
 hi:'Привет', dayof:'день цикла', logday:'Заполнить день', marktoday:'Отметить сегодня',
 ph_period:'Менструация', ph_fert:'Фертильное окно', ph_ovu:'Овуляция', ph_luteal:'Вторая фаза', ph_foll:'После менструации',
 nodata:'Отметьте первый день менструации', nodatas:'После этого построим прогноз.',
 cal:'Календарь', ins:'Аналитика', near:'Я рядом', more:'Ещё', today:'Сегодня',
 hist:'История циклов', noHist:'Пока нет завершённых циклов', allfree:'История открыта целиком.',
 cyclen:'Длина цикла', avgc:'Средняя длина цикла', spread:'Разброс', avgp:'Средняя менструация', lut:'Лютеиновая фаза',
 days:'дня', daysx:'дней', patterns:'Закономерности', nopat:'Закономерности появятся после двух-трёх циклов.',
 pdf:'Отчёт для врача · PDF', csv:'Выгрузить данные · CSV',
 expnote:'Файл собирается на телефоне. Кому его отправить — решаете вы.',
 soon:'Скоро', nearT:'Я рядом', nearS:'Спокойный разговор о том, что происходит с телом и настроением. Без диагнозов и без осуждения.',
 n1:'Объяснит простым языком', n1s:'Почему цикл сдвинулся, что такое лютеиновая фаза, чего ждать на этой неделе.',
 n2:'Заметит закономерности', n2s:'Свяжет записи о сне, боли и настроении с фазой цикла.',
 n3:'Поможет подготовиться к врачу', n3s:'Соберёт вопросы из вашей истории и приложит к отчёту.',
 notifyme:'Сообщить о запуске', neardis:'Справочный помощник, а не врач. При тревожных симптомах направит к специалисту.',
 set:'Настройки', setS:'Всё под вашим контролем',
 secData:'Данные и копия', secPriv:'Приватность', secInv:'Пригласить подругу', secPart:'Партнёр', secRem:'Напоминания', secSub:'Подписка', secDel:'Данные',
 bkon:'включён', bklast:'Последняя копия', bkrestore:'Восстановить на новом телефоне',
 bkrestores:`Установите Nia и войдите в тот же ${CLOUD}`,
 bkfile:'Сохранить копию в файл', bkfiles:'Если хотите держать её отдельно',
 discreet:'Незаметный режим', discreets:'Нейтральное имя и иконка в уведомлениях',
 invT:'Расскажи подруге о Nia', invS:`Приглашение — обычная ссылка на ${STORE_NAME}: мы не читаем адресную книгу.`,
 invcopy:'Скопировать ссылку', invshare:'Поделиться',
 partadd:'Добавить партнёра', partadds:'Будет видеть только фазу цикла',
 remP:'Скоро менструация', remPs:'За 2 дня, в 20:00', remM:'Приём таблеток', remMs:'Ежедневно, 09:00',
 remD:'Сухой тон уведомлений', remDs:'Только факты, без эмодзи и обращений',
 remDay:'Как прошёл день', remDayS:'Ежедневно, 20:30', remOvu:'Овуляция и фертильные дни', remOvuS:'За день, в 10:00',
 nDayT:'Как прошёл ваш день?', nDayB:'Отметьте самочувствие, сон и настроение — это займёт минуту.',
 nPerT:'Скоро менструация', nPerB:'Ожидается через 2 дня.',
 nPer0T:'Сегодня ожидается менструация', nPer0B:'Когда начнётся, отметьте первый день — прогноз станет точнее.',
 nFertT:'Завтра начинаются фертильные дни', nFertB:'Вероятность зачатия повышается.',
 nOvuT:'Завтра ожидается овуляция', nOvuB:'Самый фертильный день цикла.',
 nMedT:'Лекарства и витамины', nMedB:'Время принять то, что запланировано.',
 nRateT:'Нравится Nia?', nRateB:`Оцените приложение в ${STORE_NAME} — это очень нам помогает.`,
 nDiscT:'Nia', nDiscB:'У вас новое напоминание', nChan:'Напоминания',
 delall:'Удалить всё', delalls:'Сразу, без писем и периода ожидания',
 privnote:'Nia не использует рекламные идентификаторы и не строит профиль пользователя.',
 sheetS:'Отметьте, что чувствуете. Всё необязательно.', save:'Сохранить',
 f0:'Нет', f1:'Мажущие', f2:'Слабые', f3:'Умеренные', f4:'Обильные',
 mo1:'Спокойно', mo2:'Радостно', mo3:'Тревожно', mo4:'Раздражение', mo5:'Упадок',
 pa1:'Спазмы', pa2:'Голова', pa3:'Поясница', pa4:'Грудь', pa5:'ЖКТ',
 en1:'Очень низкая', en2:'Низкая', en3:'Обычная', en4:'Высокая',
 sleeph:'Часов сна', flow:'Менструация', mood:'Настроение', pain:'Боль', energy:'Энергия',
 saved:'День сохранён', copied:'Ссылка скопирована', deleted:'Все данные удалены',
 confirmDel:'Удалить все записи? Отменить будет нельзя.',
 predP:'Менструация ожидается', predO:'Овуляция ожидается', predRange:'Фертильные дни',
 lateT:n=>`Задержка ${n} ${ruPl(n,['день','дня','дней'])}`, lateS:'Когда менструация начнётся, отметьте первый день — прогноз пересчитается.',
 accHi:'Прогноз построен по вашим данным.', accLow:'Цикл нерегулярный — показываем диапазон. Так честнее, чем ошибиться на неделю.',
 accNew:'Точность вырастет после двух-трёх циклов.',
 bcNote:'Вы принимаете гормональную контрацепцию — овуляцию не прогнозируем.',
 mon:['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'],
 monN:['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
 monS:['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
 wd:['ПН','ВТ','СР','ЧТ','ПТ','СБ','ВС'],
 wdL:['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
 fmt:(d,m)=>`${d} ${T.mon[m]}`,
 dateLong:d=>`${cap1(T.wdL[d.getDay()])}, ${d.getDate()} ${T.mon[d.getMonth()]}`,
 hdr:['Дата','День цикла','Менструация','Настроение','Боль','Сон','Энергия','Температура'],
 repT:'Отчёт для врача', repGen:'Сформирован',
 pwT:'Месяц бесплатно', pwS:'Полный доступ. Отмена в любой момент — напомним за 2 дня до списания.',
 pw1:'Прогноз цикла и овуляции', pw1s:'Работает даже при нерегулярном цикле',
 pw2:'Вся история и аналитика', pw2s:'Без ограничений по времени',
 pw3:'Отчёт для врача', pw3s:'PDF и CSV, формируются на телефоне',
 pw4:'Данные только у вас', pw4s:'Ни рекламы, ни передачи третьим лицам',
 pwM:'Месяц', pwMP:'$2,99', pwMN:'Отмена в любой момент',
 pwQ:'3 месяца', pwQP:'$3,99', pwQN:'$1,33 в месяц',
 pwYear:'Год', pwYearP:'$15,99', pwYearN:'$1,33 в месяц · выгоднее всего', pwBest:'ХИТ',
 pwLife:'Навсегда', pwLifeP:'$34,99', pwLifeN:'Разовый платёж, без подписки',
 pwCta:'Начать месяц бесплатно', pwRestore:'Восстановить покупку', lnkPriv:'Политика конфиденциальности', lnkTerms:'Условия использования (EULA)',
 pwNoteIos:'Списание через месяц, если не отменить. Управление в настройках Apple ID.',
 pwNoteAnd:'Списание через месяц, если не отменить. Управление в Google Play.',
 pwNoteLife:'Разовый платёж. Без подписки и автоматических списаний.',
 trialLeft:'Пробный период', trialDays:'дн. осталось',
 expT:'Пробный период закончился', expS:'Ваши записи сохранены и никуда не делись. Оформите доступ, чтобы продолжить.',
 subOn:'Подписка активна', subLife:'Доступ навсегда', subNone:'Нет подписки', subNoneS:'Открыть тарифы',
 subManage:'Управлять подпиской', subManageS:`Отмена и смена тарифа в ${STORE_NAME}`,
 storeNA:'Магазин недоступен, попробуйте позже', buyFail:'Покупка не прошла', noPurch:'Покупки не найдены',
 langT:'Выберите язык', langS:'Можно поменять позже в настройках.',
 secLang:'Язык', langCur:'Русский',
 predicted:'Прогноз', calPd:n=>`Менструация ${n} ${ruPl(n,['день','дня','дней'])}`, atyp:' · нетипичный',
 cyclesN:n=>`${n} ${ruPl(n,['цикл','цикла','циклов'])}`, since:d=>`с ${d}`,
 patD:(n,a)=>`Отмечено ${n} ${ruPl(n,['раз','раза','раз'])}, чаще всего около ${a}-го дня цикла.`,
 nothingExp:'Пока нечего выгружать', csvSaved:'CSV сохранён', savePdf:'Сохранить как PDF',
 summary:'Сводка', cyclesRec:'Циклов в истории', yes:'да', no:'нет',
 colStart:'Начало', colLen:'Длина', colBleed:'Менструация', dailyLog:'Дневник', noEntries:'Записей пока нет.',
 repFoot:'Отчёт сформирован приложением Nia на устройстве пользователя. Это записи самонаблюдения, а не медицинское заключение.',
 notifyOk:'Сообщим, когда откроем доступ', bkSaved:'Копия сохранена',
 invTxt:u=>`Попробуй Nia — трекер цикла, который хранит данные только у тебя на телефоне. ${u}`,
 errT:'Что-то пошло не так', errBtn:'Начать заново', locale:'ru-RU'},

kk:{tagline:'тек өзіңіз білетін цикл',
 hello:'Сәлем, мен Ниа', hello2:'Күнтізбеңізді баптайық',
 w1s:`Жазбалар телефоныңызда және жеке ${CLOUD} қоймаңызда сақталады. Оларды жарнама желілері де, біз де көре алмаймыз.`,
 start:'Бастау', restore:'Менде сақтық көшірме бар', noreg:'Баптау шамамен бір минут алады. Тіркеусіз әрі поштасыз.',
 next:'Әрі қарай', skip:'Өткізіп жіберу', done:'Бәрі дайын',
 q1:'Қолданба сізге не үшін керек?', q1s:'Басты экранда не көрсететінімізді осы анықтайды.',
 g1:'Циклді бақылау', g1s:'Етеккір мен ПМС қашан болатынын білу',
 g2:'Жүкті болуды жоспарлаймын', g2s:'Нақты құнарлы терезе мен овуляция',
 g3:'Жүктіліктен сақтанғым келеді', g3s:'Жүкті болу ықтималдығы төмен күндер',
 g4:'Белгілерді түсінгім келеді', g4s:'Ауырсыну, көңіл күй, ұйқы және олардың циклмен байланысы',
 q2:'Сізге қалай жүгінейік?', q2s:'Атыңыз телефонда қалады. Өткізіп жіберуге болады.',
 nameph:'Аты немесе лақап аты', byear:'Туған жыл',
 byears:'Норманы дәлірек есептеу үшін керек: 17 мен 45 жастағы цикл әртүрлі болады. Толық күнді сұрамаймыз.',
 byearl:'туған жыл',
 q3:'Соңғы етеккір қашан басталды?', q3s:'Бұл алғашқы болжамның бастапқы нүктесі. Кейін күнтізбеде түзетуге болады.',
 dunno:'Есімде жоқ', dunnos:'Етеккірді алғаш белгілеген күннен бастаймыз',
 q4:'Цикл мен етеккір ұзақтығы', q4s:'Нақты білмесеңіз, осылай қалдырыңыз. Екі циклден кейін өзіміз есептейміз.',
 cyclel:'циклдегі күн', periodl:'етеккір күні',
 q5:'Циклыңыз қаншалықты тұрақты?', q5s:'Бұл алгоритмді өзгертеді. Цикл тұрақсыз болса, нақты күннің орнына аралық көрсетеміз.',
 r1:'Тұрақты', r1s:'Циклдер арасындағы айырма 3 күнге дейін',
 r2:'Кейде ауысады', r2s:'Айырма бір аптаға дейін',
 r3:'Тұрақсыз', r3s:'Қатты өзгеруі мүмкін, кешігу жиі болады',
 r4:'Білмеймін', r4s:'Жазбаларыңыз бойынша анықтаймыз',
 bc:'Гормондық контрацепция', bcn:'Қабылдамаймын', bcy:'Қабылдаймын', bcys:'Онда овуляцияны болжамаймыз',
 q6:'Нені бақылаймыз?', q6s:'Басты экранда не болатынын таңдаңыз. Қалғанын жасырамыз. Кейін өзгертуге болады.',
 m_mood:'Көңіл күй', m_pain:'Ауырсыну мен түйілу', m_disch:'Бөлінділер', m_sleep:'Ұйқы',
 m_energy:'Қуат', m_bbt:'Базальды температура', m_med:'Дәрілер мен дәрумендер',
 q7:'Деректер қайда сақталады', q7s:'Телефон ауыстырғанда жазбалар жоғалмас үшін.',
 bk:`Жеке ${CLOUD} қоймаңыздағы көшірме`, bks:'Жібермес бұрын телефонда шифрланады. Біз оны оқи алмаймыз',
 lock:`${BIO} арқылы кіру`, locks:'Телефонды басқа біреу алса, қолданба жабық болады',
 rem:'Еске салғыштар', rems:'Цикл басталуы мен дәрі қабылдау туралы. Үнін өзіңіз таңдайсыз',
 nope:'Біз не істемейміз', nopes:'Жарнама көрсетпейміз, деректерді үшінші тұлғаларға бермейміз, пошта мен телефон сұрамаймыз, профиліңізді құрмаймыз.',
 delnote:'Барлық деректі кез келген уақытта бір батырмамен өшіруге болады.',
 hi:'Сәлем', dayof:'цикл күні', logday:'Күнді толтыру', marktoday:'Бүгінді белгілеу',
 ph_period:'Етеккір', ph_fert:'Құнарлы терезе', ph_ovu:'Овуляция', ph_luteal:'Екінші фаза', ph_foll:'Етеккірден кейін',
 nodata:'Етеккірдің бірінші күнін белгілеңіз', nodatas:'Осыдан кейін болжам жасаймыз.',
 cal:'Күнтізбе', ins:'Талдау', near:'Жаныңдамын', more:'Тағы', today:'Бүгін',
 hist:'Циклдер тарихы', noHist:'Әзірге аяқталған цикл жоқ', allfree:'Тарих толығымен ашық.',
 cyclen:'Цикл ұзақтығы', avgc:'Орташа цикл ұзақтығы', spread:'Ауытқу', avgp:'Орташа етеккір', lut:'Лютеиндік фаза',
 days:'күн', daysx:'күн', patterns:'Заңдылықтар', nopat:'Заңдылықтар екі-үш циклден кейін пайда болады.',
 pdf:'Дәрігерге есеп · PDF', csv:'Деректерді жүктеу · CSV',
 expnote:'Файл телефонда жасалады. Оны кімге жіберуді өзіңіз шешесіз.',
 soon:'Жақында', nearT:'Жаныңдамын', nearS:'Дене мен көңіл күйде не болып жатқаны туралы байыпты әңгіме. Диагнозсыз әрі сынсыз.',
 n1:'Қарапайым тілмен түсіндіреді', n1s:'Цикл неге жылжыды, лютеиндік фаза деген не, осы аптада не күту керек.',
 n2:'Заңдылықтарды байқайды', n2s:'Ұйқы, ауырсыну және көңіл күй жазбаларын цикл фазасымен байланыстырады.',
 n3:'Дәрігерге дайындалуға көмектеседі', n3s:'Тарихыңыздан сұрақтар жинап, есепке қосады.',
 notifyme:'Іске қосылғанда хабарлау', neardis:'Бұл дәрігер емес, анықтамалық көмекші. Алаңдатарлық белгілер болса, маманға бағыттайды.',
 set:'Баптаулар', setS:'Бәрі сіздің бақылауыңызда',
 secData:'Деректер және көшірме', secPriv:'Құпиялылық', secInv:'Құрбыңды шақыр', secPart:'Серіктес', secRem:'Еске салғыштар', secSub:'Жазылым', secDel:'Деректер',
 bkon:'қосулы', bklast:'Соңғы көшірме', bkrestore:'Жаңа телефонда қалпына келтіру',
 bkrestores:`Nia орнатып, сол ${CLOUD} аккаунтына кіріңіз`,
 bkfile:'Көшірмені файлға сақтау', bkfiles:'Оны бөлек сақтағыңыз келсе',
 discreet:'Байқалмайтын режим', discreets:'Хабарламаларда бейтарап атау мен белгіше',
 invT:'Құрбыңа Nia туралы айт', invS:`Шақыру — ${STORE_NAME} дүкеніне қарапайым сілтеме: мекенжай кітабыңызды оқымаймыз.`,
 invcopy:'Сілтемені көшіру', invshare:'Бөлісу',
 partadd:'Серіктес қосу', partadds:'Тек цикл фазасын көреді',
 remP:'Жақында етеккір', remPs:'2 күн бұрын, 20:00', remM:'Дәрі қабылдау', remMs:'Күн сайын, 09:00',
 remD:'Қарапайым хабарлама үні', remDs:'Тек деректер, эмодзи мен жүгінусіз',
 remDay:'Күніңіз қалай өтті', remDayS:'Күн сайын, 20:30', remOvu:'Овуляция және құнарлы күндер', remOvuS:'Бір күн бұрын, 10:00',
 nDayT:'Күніңіз қалай өтті?', nDayB:'Көңіл күйіңізді, ұйқыңызды белгілеңіз — бір минут қана.',
 nPerT:'Жақында етеккір', nPerB:'2 күннен кейін күтіледі.',
 nPer0T:'Бүгін етеккір күтіледі', nPer0B:'Басталғанда бірінші күнін белгілеңіз — болжам дәлірек болады.',
 nFertT:'Ертең құнарлы күндер басталады', nFertB:'Жүкті болу ықтималдығы артады.',
 nOvuT:'Ертең овуляция күтіледі', nOvuB:'Циклдің ең құнарлы күні.',
 nMedT:'Дәрілер мен дәрумендер', nMedB:'Жоспарланғанды қабылдайтын уақыт.',
 nRateT:'Nia ұнай ма?', nRateB:`Қолданбаны ${STORE_NAME} дүкенінде бағалаңыз — бұл бізге көп көмектеседі.`,
 nDiscT:'Nia', nDiscB:'Сізде жаңа еске салғыш бар', nChan:'Еске салғыштар',
 delall:'Бәрін өшіру', delalls:'Бірден, хатсыз әрі күтусіз',
 privnote:'Nia жарнамалық идентификаторларды қолданбайды және пайдаланушы профилін құрмайды.',
 sheetS:'Сезімдеріңізді белгілеңіз. Бәрі міндетті емес.', save:'Сақтау',
 f0:'Жоқ', f1:'Жағылатын', f2:'Әлсіз', f3:'Орташа', f4:'Мол',
 mo1:'Тыныш', mo2:'Қуанышты', mo3:'Мазасыз', mo4:'Ашулы', mo5:'Көңілсіз',
 pa1:'Түйілу', pa2:'Бас', pa3:'Бел', pa4:'Кеуде', pa5:'Ас қорыту',
 en1:'Өте төмен', en2:'Төмен', en3:'Қалыпты', en4:'Жоғары',
 sleeph:'Ұйқы сағаты', flow:'Етеккір', mood:'Көңіл күй', pain:'Ауырсыну', energy:'Қуат',
 saved:'Күн сақталды', copied:'Сілтеме көшірілді', deleted:'Барлық деректер өшірілді',
 confirmDel:'Барлық жазбаларды өшіру керек пе? Мұны қайтару мүмкін болмайды.',
 predP:'Етеккір күтіледі', predO:'Овуляция күтіледі', predRange:'Құнарлы күндер',
 lateT:n=>`${n} күн кешігу`, lateS:'Етеккір басталғанда бірінші күнін белгілеңіз — болжам қайта есептеледі.',
 accHi:'Болжам сіздің деректеріңіз бойынша жасалды.', accLow:'Цикл тұрақсыз — аралық көрсетеміз. Бір аптаға қателескеннен гөрі бұл адалырақ.',
 accNew:'Дәлдік екі-үш циклден кейін артады.',
 bcNote:'Сіз гормондық контрацепция қабылдайсыз — овуляцияны болжамаймыз.',
 mon:['қаңтар','ақпан','наурыз','сәуір','мамыр','маусым','шілде','тамыз','қыркүйек','қазан','қараша','желтоқсан'],
 monN:['Қаңтар','Ақпан','Наурыз','Сәуір','Мамыр','Маусым','Шілде','Тамыз','Қыркүйек','Қазан','Қараша','Желтоқсан'],
 monS:['Қаң','Ақп','Нау','Сәу','Мам','Мау','Шіл','Там','Қыр','Қаз','Қар','Жел'],
 wd:['ДС','СС','СР','БС','ЖМ','СБ','ЖС'],
 wdL:['жексенбі','дүйсенбі','сейсенбі','сәрсенбі','бейсенбі','жұма','сенбі'],
 fmt:(d,m)=>`${d} ${T.mon[m]}`,
 dateLong:d=>`${d.getDate()} ${T.mon[d.getMonth()]}, ${T.wdL[d.getDay()]}`,
 hdr:['Күні','Цикл күні','Етеккір','Көңіл күй','Ауырсыну','Ұйқы','Қуат','Температура'],
 repT:'Дәрігерге есеп', repGen:'Жасалған уақыты',
 pwT:'Бір ай тегін', pwS:'Толық қолжетімділік. Кез келген уақытта бас тартуға болады — төлемнен 2 күн бұрын еске саламыз.',
 pw1:'Цикл мен овуляция болжамы', pw1s:'Тұрақсыз циклде де жұмыс істейді',
 pw2:'Бүкіл тарих пен талдау', pw2s:'Уақыт шектеуінсіз',
 pw3:'Дәрігерге есеп', pw3s:'PDF және CSV, телефонда жасалады',
 pw4:'Деректер тек сізде', pw4s:'Жарнамасыз, үшінші тұлғаларға берілмейді',
 pwM:'Ай', pwMP:'$2,99', pwMN:'Кез келген уақытта бас тарту',
 pwQ:'3 ай', pwQP:'$3,99', pwQN:'айына $1,33',
 pwYear:'Жыл', pwYearP:'$15,99', pwYearN:'айына $1,33 · ең тиімді', pwBest:'ҮЗДІК',
 pwLife:'Мәңгілік', pwLifeP:'$34,99', pwLifeN:'Бір реттік төлем, жазылымсыз',
 pwCta:'Бір айды тегін бастау', pwRestore:'Сатып алуды қалпына келтіру', lnkPriv:'Құпиялылық саясаты', lnkTerms:'Пайдалану шарттары (EULA)',
 pwNoteIos:'Бас тартпасаңыз, бір айдан кейін ақы алынады. Басқару — Apple ID баптауларында.',
 pwNoteAnd:'Бас тартпасаңыз, бір айдан кейін ақы алынады. Басқару — Google Play ішінде.',
 pwNoteLife:'Бір реттік төлем. Жазылымсыз және автоматты төлемсіз.',
 trialLeft:'Сынақ кезеңі', trialDays:'күн қалды',
 expT:'Сынақ кезеңі аяқталды', expS:'Жазбаларыңыз сақталған. Жалғастыру үшін жазылым рәсімдеңіз.',
 subOn:'Жазылым белсенді', subLife:'Мәңгілік қолжетімділік', subNone:'Жазылым жоқ', subNoneS:'Тарифтерді ашу',
 subManage:'Жазылымды басқару', subManageS:`Бас тарту және тарифті өзгерту — ${STORE_NAME} ішінде`,
 storeNA:'Дүкен қолжетімсіз, кейінірек көріңіз', buyFail:'Сатып алу өтпеді', noPurch:'Сатып алулар табылмады',
 langT:'Тілді таңдаңыз', langS:'Кейін баптауларда өзгертуге болады.',
 secLang:'Тіл', langCur:'Қазақша',
 predicted:'Болжам', calPd:n=>`Етеккір ${n} күн`, atyp:' · типтік емес',
 cyclesN:n=>`${n} цикл`, since:d=>`басы: ${d}`,
 patD:(n,a)=>`${n} рет белгіленді, көбіне циклдің ${a}-күні шамасында.`,
 nothingExp:'Әзірге жүктейтін ештеңе жоқ', csvSaved:'CSV сақталды', savePdf:'PDF ретінде сақтау',
 summary:'Қорытынды', cyclesRec:'Тарихтағы циклдер', yes:'иә', no:'жоқ',
 colStart:'Басталуы', colLen:'Ұзақтығы', colBleed:'Етеккір', dailyLog:'Күнделік', noEntries:'Әзірге жазба жоқ.',
 repFoot:'Есепті Nia қолданбасы пайдаланушының құрылғысында жасады. Бұл — өзін-өзі бақылау жазбалары, медициналық қорытынды емес.',
 notifyOk:'Қолжетімділік ашылғанда хабарлаймыз', bkSaved:'Көшірме сақталды',
 invTxt:u=>`Nia қолданбасын байқап көр — деректерді тек телефоныңда сақтайтын цикл трекері. ${u}`,
 errT:'Бірдеңе дұрыс болмады', errBtn:'Қайта бастау', locale:'kk-KZ'},

en:{tagline:'a cycle only you can see',
 hello:'Hi, I’m Nia', hello2:'Let’s set up your calendar',
 w1s:`Entries stay on your phone and in your own ${CLOUD}. Neither ad networks nor we can read them.`,
 start:'Get started', restore:'I already have a backup', noreg:'Takes about a minute. No sign-up, no email.',
 next:'Next', skip:'Skip', done:'All set',
 q1:'What brings you here?', q1s:'This decides what we show on your home screen.',
 g1:'Track my cycle', g1s:'Know when your period and PMS are due',
 g2:'Trying to conceive', g2s:'Precise fertile window and ovulation',
 g3:'Avoiding pregnancy', g3s:'Days with low chance of conception',
 g4:'Understand my symptoms', g4s:'Pain, mood, sleep and how they link to your cycle',
 q2:'What should we call you?', q2s:'Your name stays on this phone. You can skip this.',
 nameph:'Name or nickname', byear:'Year of birth',
 byears:'Helps us judge what is normal: a cycle at 17 behaves differently than at 45. We never ask for a full date.',
 byearl:'year of birth',
 q3:'When did your last period start?', q3s:'The starting point for your first prediction. You can fix it later in the calendar.',
 dunno:'I don’t remember', dunnos:'We’ll start from the first day you log a period',
 q4:'Cycle and period length', q4s:'Not sure? Leave the defaults. After two cycles we’ll work it out ourselves.',
 cyclel:'days per cycle', periodl:'days of bleeding',
 q5:'How regular is your cycle?', q5s:'This changes the algorithm. If it varies, we show a range instead of a single date.',
 r1:'Regular', r1s:'Cycles differ by up to 3 days',
 r2:'Shifts a little', r2s:'Cycles differ by up to a week',
 r3:'Irregular', r3s:'Varies a lot, late periods are normal for me',
 r4:'I don’t know', r4s:'We’ll work it out from your entries',
 bc:'Hormonal birth control', bcn:'Not taking any', bcy:'I take it', bcys:'Then we won’t predict ovulation',
 q6:'What do you want to track?', q6s:'Pick what appears on your home screen. The rest stays hidden. Changeable later.',
 m_mood:'Mood', m_pain:'Pain and cramps', m_disch:'Discharge', m_sleep:'Sleep',
 m_energy:'Energy', m_bbt:'Basal temperature', m_med:'Medication and vitamins',
 q7:'Where your data lives', q7s:'So nothing is lost when you change phones.',
 bk:`Backup to your ${CLOUD}`, bks:'Encrypted on your phone before it leaves. We cannot read it',
 lock:`Unlock with ${BIO}`, locks:'Locked if someone else picks up your phone',
 rem:'Reminders', rems:'Period and medication. You choose the tone',
 nope:'What we never do', nopes:'No ads, no data shared with third parties, no email or phone number, no profile of you.',
 delnote:'You can delete everything at any time, with one button.',
 hi:'Hi', dayof:'day of cycle', logday:'Log today', marktoday:'Log today',
 ph_period:'Period', ph_fert:'Fertile window', ph_ovu:'Ovulation', ph_luteal:'Luteal phase', ph_foll:'Follicular phase',
 nodata:'Log your first period day', nodatas:'Then we’ll build your prediction.',
 cal:'Calendar', ins:'Insights', near:'Nearby', more:'More', today:'Today',
 hist:'Cycle history', noHist:'No completed cycles yet', allfree:'Your full history, with no time limits.',
 cyclen:'Cycle length', avgc:'Average cycle', spread:'Variation', avgp:'Average period', lut:'Luteal phase',
 days:'days', daysx:'days', patterns:'Patterns', nopat:'Patterns appear after two or three cycles.',
 pdf:'Doctor’s report · PDF', csv:'Export data · CSV',
 expnote:'The file is built on your phone. Who sees it is up to you.',
 soon:'Soon', nearT:'Nearby', nearS:'A calm conversation about what your body and mood are doing. No diagnoses, no judgement.',
 n1:'Explains in plain words', n1s:'Why your cycle shifted, what the luteal phase is, what to expect this week.',
 n2:'Spots patterns', n2s:'Links your sleep, pain and mood entries to your cycle phase.',
 n3:'Preps you for the doctor', n3s:'Collects questions from your history and attaches them to the report.',
 notifyme:'Notify me at launch', neardis:'A reference assistant, not a doctor. Worrying symptoms are referred to a professional.',
 set:'Settings', setS:'All of it under your control',
 secData:'Data and backup', secPriv:'Privacy', secInv:'Invite a friend', secPart:'Partner', secRem:'Reminders', secSub:'Subscription', secDel:'Data',
 bkon:'on', bklast:'Last backup', bkrestore:'Restore on a new phone',
 bkrestores:`Install Nia and sign in to the same ${CLOUD}`,
 bkfile:'Save a copy to a file', bkfiles:'If you want to keep it separately',
 discreet:'Discreet mode', discreets:'Neutral name and icon in notifications',
 invT:'Tell a friend about Nia', invS:`The invite is just a ${STORE_NAME} link: we never read your contacts.`,
 invcopy:'Copy link', invshare:'Share',
 partadd:'Add a partner', partadds:'They will only see your cycle phase',
 remP:'Period coming up', remPs:'2 days before, 8:00 PM', remM:'Medication', remMs:'Daily, 9:00 AM',
 remD:'Plain notification tone', remDs:'Facts only, no emoji, no nicknames',
 remDay:'How was your day', remDayS:'Daily, 8:30 PM', remOvu:'Ovulation and fertile days', remOvuS:'A day before, 10:00 AM',
 nDayT:'How was your day?', nDayB:'Log your mood, sleep and how you feel — it takes a minute.',
 nPerT:'Period coming up', nPerB:'Expected in 2 days.',
 nPer0T:'Period expected today', nPer0B:'When it starts, log the first day to sharpen your prediction.',
 nFertT:'Fertile days start tomorrow', nFertB:'Your chance of conception is rising.',
 nOvuT:'Ovulation expected tomorrow', nOvuB:'The most fertile day of your cycle.',
 nMedT:'Medication and vitamins', nMedB:'Time to take what you planned.',
 nRateT:'Enjoying Nia?', nRateB:`Rate us on the ${STORE_NAME} — it really helps.`,
 nDiscT:'Nia', nDiscB:'You have a new reminder', nChan:'Reminders',
 delall:'Delete everything', delalls:'Immediately, no emails, no waiting period',
 privnote:'Nia uses no advertising identifiers and builds no profile of you.',
 sheetS:'Note how you feel. Nothing is required.', save:'Save',
 f0:'None', f1:'Spotting', f2:'Light', f3:'Medium', f4:'Heavy',
 mo1:'Calm', mo2:'Happy', mo3:'Anxious', mo4:'Irritable', mo5:'Low',
 pa1:'Cramps', pa2:'Headache', pa3:'Lower back', pa4:'Breast', pa5:'Digestive',
 en1:'Very low', en2:'Low', en3:'Normal', en4:'High',
 sleeph:'Hours of sleep', flow:'Bleeding', mood:'Mood', pain:'Pain', energy:'Energy',
 saved:'Day saved', copied:'Link copied', deleted:'All data deleted',
 confirmDel:'Delete every entry? This cannot be undone.',
 predP:'Period expected', predO:'Ovulation expected', predRange:'Fertile days',
 lateT:n=>`${n} day${n===1?'':'s'} late`, lateS:'When your period starts, log the first day and we will recalculate.',
 accHi:'Built from your own entries.', accLow:'Your cycle varies — we show a range. More honest than being a week off.',
 accNew:'Accuracy improves after two or three cycles.',
 bcNote:'You’re on hormonal birth control — we don’t predict ovulation.',
 mon:['January','February','March','April','May','June','July','August','September','October','November','December'],
 monN:['January','February','March','April','May','June','July','August','September','October','November','December'],
 monS:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
 wd:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
 wdL:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
 fmt:(d,m)=>`${T.mon[m]} ${d}`,
 dateLong:d=>`${T.wdL[d.getDay()]}, ${T.mon[d.getMonth()]} ${d.getDate()}`,
 hdr:['Date','Cycle day','Bleeding','Mood','Pain','Sleep','Energy','Temperature'],
 repT:'Report for your doctor', repGen:'Generated',
 pwT:'1 month free', pwS:'Full access. Cancel anytime — we remind you 2 days before billing.',
 pw1:'Cycle and ovulation predictions', pw1s:'Works with irregular cycles too',
 pw2:'Your whole history and insights', pw2s:'No time limits',
 pw3:'Doctor’s report', pw3s:'PDF and CSV, built on your phone',
 pw4:'Your data stays yours', pw4s:'No ads, nothing shared with anyone',
 pwM:'Monthly', pwMP:'$2.99', pwMN:'Cancel anytime',
 pwQ:'3 months', pwQP:'$3.99', pwQN:'$1.33 per month',
 pwYear:'Yearly', pwYearP:'$15.99', pwYearN:'$1.33 per month · best value', pwBest:'BEST',
 pwLife:'Lifetime', pwLifeP:'$34.99', pwLifeN:'One payment, no subscription',
 pwCta:'Start 1 month free', pwRestore:'Restore purchase', lnkPriv:'Privacy Policy', lnkTerms:'Terms of Use (EULA)',
 pwNoteIos:'Billed after 1 month unless cancelled. Manage in your Apple ID settings.',
 pwNoteAnd:'Billed after 1 month unless cancelled. Manage in Google Play.',
 pwNoteLife:'One-time payment. No subscription, no automatic charges.',
 trialLeft:'Trial', trialDays:'days left',
 expT:'Your trial has ended', expS:'All your entries are safe. Subscribe to keep going.',
 subOn:'Subscription active', subLife:'Lifetime access', subNone:'No subscription', subNoneS:'See plans',
 subManage:'Manage subscription', subManageS:`Cancel or change your plan in ${STORE_NAME}`,
 storeNA:'Store unavailable, try again later', buyFail:'Purchase failed', noPurch:'No purchases found',
 langT:'Choose your language', langS:'You can change this later in settings.',
 secLang:'Language', langCur:'English',
 predicted:'Predicted', calPd:n=>`Period ${n} day${n===1?'':'s'}`, atyp:' · atypical',
 cyclesN:n=>`${n} cycle${n===1?'':'s'}`, since:d=>`since ${d}`,
 patD:(n,a)=>`Logged ${n} times, most often around day ${a} of your cycle.`,
 nothingExp:'Nothing to export yet', csvSaved:'CSV saved', savePdf:'Save as PDF',
 summary:'Summary', cyclesRec:'Cycles recorded', yes:'yes', no:'no',
 colStart:'Start', colLen:'Length', colBleed:'Bleeding', dailyLog:'Daily log', noEntries:'No entries yet.',
 repFoot:'Generated by Nia on the user’s device. These are self-reported records, not a medical assessment.',
 notifyOk:'We’ll let you know at launch', bkSaved:'Backup saved',
 invTxt:u=>`Try Nia — a cycle tracker that keeps your data on your phone only. ${u}`,
 errT:'Something went wrong', errBtn:'Start over', locale:'en-US'},

es:{tagline:'un ciclo que solo tú conoces',
 hello:'Hola, soy Nia', hello2:'Vamos a configurar tu calendario',
 w1s:`Tus registros se guardan en tu teléfono y en tu ${CLOUD} personal. Ni las redes publicitarias ni nosotros podemos verlos.`,
 start:'Empezar', restore:'Ya tengo una copia de seguridad', noreg:'La configuración dura un minuto. Sin registro y sin correo.',
 next:'Siguiente', skip:'Omitir', done:'Todo listo',
 q1:'¿Para qué usarás Nia?', q1s:'De esto depende lo que mostraremos en la pantalla principal.',
 g1:'Seguir mi ciclo', g1s:'Saber cuándo llegan la regla y el SPM',
 g2:'Busco un embarazo', g2s:'Ventana fértil y ovulación precisas',
 g3:'Quiero evitar un embarazo', g3s:'Días con baja probabilidad de concepción',
 g4:'Entender mis síntomas', g4s:'Dolor, ánimo, sueño y su relación con el ciclo',
 q2:'¿Cómo te llamamos?', q2s:'Tu nombre se queda en el teléfono. Puedes omitirlo.',
 nameph:'Nombre o apodo', byear:'Año de nacimiento',
 byears:'Nos ayuda a valorar qué es normal: el ciclo a los 17 y a los 45 se comporta distinto. Nunca pedimos la fecha completa.',
 byearl:'año de nacimiento',
 q3:'¿Cuándo empezó tu última regla?', q3s:'Es el punto de partida del primer pronóstico. Luego puedes corregirlo en el calendario.',
 dunno:'No lo recuerdo', dunnos:'Empezaremos desde el primer día que registres la regla',
 q4:'Duración del ciclo y de la regla', q4s:'¿No lo sabes con certeza? Déjalo así. Tras dos ciclos lo calcularemos nosotros.',
 cyclel:'días de ciclo', periodl:'días de regla',
 q5:'¿Qué tan regular es tu ciclo?', q5s:'Esto cambia el algoritmo. Si varía, mostraremos un rango en lugar de una fecha exacta.',
 r1:'Regular', r1s:'Los ciclos difieren hasta 3 días',
 r2:'A veces se desplaza', r2s:'Difieren hasta una semana',
 r3:'Irregular', r3s:'Varía mucho, los retrasos son habituales',
 r4:'No lo sé', r4s:'Lo deduciremos de tus registros',
 bc:'Anticonceptivo hormonal', bcn:'No tomo', bcy:'Sí tomo', bcys:'Entonces no pronosticaremos la ovulación',
 q6:'¿Qué quieres registrar?', q6s:'Elige qué aparece en la pantalla principal. El resto quedará oculto. Puedes cambiarlo luego.',
 m_mood:'Estado de ánimo', m_pain:'Dolor y cólicos', m_disch:'Flujo vaginal', m_sleep:'Sueño',
 m_energy:'Energía', m_bbt:'Temperatura basal', m_med:'Medicamentos y vitaminas',
 q7:'Dónde se guardan tus datos', q7s:'Para no perder nada al cambiar de teléfono.',
 bk:`Copia en tu ${CLOUD}`, bks:'Se cifra en el teléfono antes de enviarse. No podemos leerla',
 lock:`Desbloqueo con ${BIO}`, locks:'La app se bloquea si otra persona toma tu teléfono',
 rem:'Recordatorios', rems:'Sobre el inicio del ciclo y las pastillas. Tú eliges el tono',
 nope:'Lo que nunca hacemos', nopes:'Sin anuncios, sin compartir datos con terceros, sin pedir correo ni teléfono, sin crear un perfil tuyo.',
 delnote:'Puedes borrar todos los datos en cualquier momento, con un botón.',
 hi:'Hola', dayof:'día del ciclo', logday:'Registrar el día', marktoday:'Registrar hoy',
 ph_period:'Regla', ph_fert:'Ventana fértil', ph_ovu:'Ovulación', ph_luteal:'Fase lútea', ph_foll:'Fase folicular',
 nodata:'Registra el primer día de tu regla', nodatas:'Después crearemos tu pronóstico.',
 cal:'Calendario', ins:'Análisis', near:'Contigo', more:'Más', today:'Hoy',
 hist:'Historial de ciclos', noHist:'Aún no hay ciclos completos', allfree:'Tu historial completo, sin límite de tiempo.',
 cyclen:'Duración del ciclo', avgc:'Ciclo promedio', spread:'Variación', avgp:'Regla promedio', lut:'Fase lútea',
 days:'días', daysx:'días', patterns:'Patrones', nopat:'Los patrones aparecen tras dos o tres ciclos.',
 pdf:'Informe para el médico · PDF', csv:'Exportar datos · CSV',
 expnote:'El archivo se crea en tu teléfono. Tú decides a quién enviarlo.',
 soon:'Pronto', nearT:'Contigo', nearS:'Una conversación tranquila sobre lo que pasa con tu cuerpo y tu ánimo. Sin diagnósticos ni juicios.',
 n1:'Explica con palabras sencillas', n1s:'Por qué se movió tu ciclo, qué es la fase lútea, qué esperar esta semana.',
 n2:'Detecta patrones', n2s:'Relaciona tus registros de sueño, dolor y ánimo con la fase del ciclo.',
 n3:'Te prepara para el médico', n3s:'Reúne preguntas de tu historial y las añade al informe.',
 notifyme:'Avísame del lanzamiento', neardis:'Un asistente informativo, no un médico. Ante síntomas preocupantes te remitirá a un profesional.',
 set:'Ajustes', setS:'Todo bajo tu control',
 secData:'Datos y copia', secPriv:'Privacidad', secInv:'Invita a una amiga', secPart:'Pareja', secRem:'Recordatorios', secSub:'Suscripción', secDel:'Datos',
 bkon:'activada', bklast:'Última copia', bkrestore:'Restaurar en un teléfono nuevo',
 bkrestores:`Instala Nia e inicia sesión en la misma cuenta de ${CLOUD}`,
 bkfile:'Guardar una copia en un archivo', bkfiles:'Si quieres guardarla por separado',
 discreet:'Modo discreto', discreets:'Nombre e icono neutros en las notificaciones',
 invT:'Háblale de Nia a una amiga', invS:`La invitación es un simple enlace a ${STORE_NAME}: nunca leemos tus contactos.`,
 invcopy:'Copiar enlace', invshare:'Compartir',
 partadd:'Añadir pareja', partadds:'Solo verá la fase de tu ciclo',
 remP:'La regla se acerca', remPs:'2 días antes, a las 20:00', remM:'Pastillas', remMs:'A diario, 09:00',
 remD:'Tono sobrio en avisos', remDs:'Solo datos, sin emojis ni apodos',
 remDay:'Cómo fue tu día', remDayS:'A diario, 20:30', remOvu:'Ovulación y días fértiles', remOvuS:'Un día antes, 10:00',
 nDayT:'¿Cómo fue tu día?', nDayB:'Registra tu ánimo, sueño y cómo te sientes: te llevará un minuto.',
 nPerT:'La regla se acerca', nPerB:'Prevista en 2 días.',
 nPer0T:'Hoy se espera la regla', nPer0B:'Cuando empiece, registra el primer día para afinar el pronóstico.',
 nFertT:'Mañana empiezan los días fértiles', nFertB:'Aumenta la probabilidad de concepción.',
 nOvuT:'Mañana se espera la ovulación', nOvuB:'El día más fértil del ciclo.',
 nMedT:'Medicamentos y vitaminas', nMedB:'Es hora de tomar lo que tenías previsto.',
 nRateT:'¿Te gusta Nia?', nRateB:`Valóranos en ${STORE_NAME}: nos ayuda muchísimo.`,
 nDiscT:'Nia', nDiscB:'Tienes un nuevo recordatorio', nChan:'Recordatorios',
 delall:'Borrar todo', delalls:'Al instante, sin correos ni periodo de espera',
 privnote:'Nia no usa identificadores publicitarios ni crea perfiles de usuario.',
 sheetS:'Anota cómo te sientes. Nada es obligatorio.', save:'Guardar',
 f0:'Nada', f1:'Manchado', f2:'Leve', f3:'Moderado', f4:'Abundante',
 mo1:'Tranquila', mo2:'Alegre', mo3:'Ansiosa', mo4:'Irritable', mo5:'Decaída',
 pa1:'Cólicos', pa2:'Cabeza', pa3:'Lumbar', pa4:'Pecho', pa5:'Digestivo',
 en1:'Muy baja', en2:'Baja', en3:'Normal', en4:'Alta',
 sleeph:'Horas de sueño', flow:'Regla', mood:'Ánimo', pain:'Dolor', energy:'Energía',
 saved:'Día guardado', copied:'Enlace copiado', deleted:'Todos los datos borrados',
 confirmDel:'¿Borrar todos los registros? No se podrá deshacer.',
 predP:'Regla prevista', predO:'Ovulación prevista', predRange:'Días fértiles',
 lateT:n=>`${n} ${n===1?'día':'días'} de retraso`, lateS:'Cuando empiece la regla, registra el primer día y recalcularemos.',
 accHi:'Pronóstico basado en tus datos.', accLow:'Tu ciclo varía: mostramos un rango. Es más honesto que fallar por una semana.',
 accNew:'La precisión mejora tras dos o tres ciclos.',
 bcNote:'Tomas anticonceptivos hormonales: no pronosticamos la ovulación.',
 mon:['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'],
 monN:['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
 monS:['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
 wd:['LU','MA','MI','JU','VI','SÁ','DO'],
 wdL:['domingo','lunes','martes','miércoles','jueves','viernes','sábado'],
 fmt:(d,m)=>`${d} de ${T.mon[m]}`,
 dateLong:d=>`${cap1(T.wdL[d.getDay()])}, ${d.getDate()} de ${T.mon[d.getMonth()]}`,
 hdr:['Fecha','Día del ciclo','Regla','Ánimo','Dolor','Sueño','Energía','Temperatura'],
 repT:'Informe para el médico', repGen:'Generado',
 pwT:'1 mes gratis', pwS:'Acceso completo. Cancela cuando quieras: te avisamos 2 días antes del cobro.',
 pw1:'Pronóstico del ciclo y la ovulación', pw1s:'Funciona incluso con ciclos irregulares',
 pw2:'Todo tu historial y análisis', pw2s:'Sin límite de tiempo',
 pw3:'Informe para el médico', pw3s:'PDF y CSV, creados en tu teléfono',
 pw4:'Tus datos son solo tuyos', pw4s:'Sin anuncios ni cesión a terceros',
 pwM:'Mensual', pwMP:'$2.99', pwMN:'Cancela cuando quieras',
 pwQ:'3 meses', pwQP:'$3.99', pwQN:'$1.33 al mes',
 pwYear:'Anual', pwYearP:'$15.99', pwYearN:'$1.33 al mes · la mejor opción', pwBest:'TOP',
 pwLife:'De por vida', pwLifeP:'$34.99', pwLifeN:'Pago único, sin suscripción',
 pwCta:'Empezar 1 mes gratis', pwRestore:'Restaurar compra', lnkPriv:'Política de privacidad', lnkTerms:'Condiciones de uso (EULA)',
 pwNoteIos:'Se cobra tras 1 mes si no cancelas. Gestiónalo en los ajustes de tu Apple ID.',
 pwNoteAnd:'Se cobra tras 1 mes si no cancelas. Gestiónalo en Google Play.',
 pwNoteLife:'Pago único. Sin suscripción ni cobros automáticos.',
 trialLeft:'Prueba', trialDays:'días restantes',
 expT:'Tu prueba ha terminado', expS:'Todos tus registros están a salvo. Suscríbete para continuar.',
 subOn:'Suscripción activa', subLife:'Acceso de por vida', subNone:'Sin suscripción', subNoneS:'Ver planes',
 subManage:'Gestionar suscripción', subManageS:`Cancela o cambia tu plan en ${STORE_NAME}`,
 storeNA:'Tienda no disponible, inténtalo más tarde', buyFail:'La compra no se completó', noPurch:'No se encontraron compras',
 langT:'Elige tu idioma', langS:'Puedes cambiarlo luego en los ajustes.',
 secLang:'Idioma', langCur:'Español',
 predicted:'Previsto', calPd:n=>`Regla de ${n} ${n===1?'día':'días'}`, atyp:' · atípico',
 cyclesN:n=>`${n} ${n===1?'ciclo':'ciclos'}`, since:d=>`desde el ${d}`,
 patD:(n,a)=>`Registrado ${n} veces, sobre todo alrededor del día ${a} del ciclo.`,
 nothingExp:'Aún no hay nada que exportar', csvSaved:'CSV guardado', savePdf:'Guardar como PDF',
 summary:'Resumen', cyclesRec:'Ciclos registrados', yes:'sí', no:'no',
 colStart:'Inicio', colLen:'Duración', colBleed:'Regla', dailyLog:'Diario', noEntries:'Aún no hay registros.',
 repFoot:'Generado por Nia en el dispositivo de la usuaria. Son registros de autoobservación, no una valoración médica.',
 notifyOk:'Te avisaremos en el lanzamiento', bkSaved:'Copia guardada',
 invTxt:u=>`Prueba Nia: un calendario menstrual que guarda tus datos solo en tu teléfono. ${u}`,
 errT:'Algo salió mal', errBtn:'Empezar de nuevo', locale:'es-ES'},
fr:{tagline:'un cycle que toi seule connais',
 hello:'Salut, je suis Nia', hello2:'Configurons ton calendrier',
 w1s:`Tes données restent sur ton téléphone et dans ton ${CLOUD} personnel. Ni les régies publicitaires ni nous n’y avons accès.`,
 start:'Commencer', restore:'J’ai déjà une sauvegarde', noreg:'Environ une minute. Sans inscription ni e-mail.',
 next:'Suivant', skip:'Passer', done:'C’est prêt',
 q1:'Pourquoi es-tu ici ?', q1s:'Cela définit ce que nous affichons sur l’écran principal.',
 g1:'Suivre mon cycle', g1s:'Savoir quand arrivent les règles et le SPM',
 g2:'Je veux un bébé', g2s:'Fenêtre de fertilité et ovulation précises',
 g3:'Éviter une grossesse', g3s:'Jours à faible probabilité de conception',
 g4:'Comprendre mes symptômes', g4s:'Douleur, humeur, sommeil et leur lien avec ton cycle',
 q2:'Comment t’appeler ?', q2s:'Ton prénom reste sur ce téléphone. Tu peux passer.',
 nameph:'Prénom ou surnom', byear:'Année de naissance',
 byears:'Cela nous aide à savoir ce qui est normal : un cycle à 17 ans n’est pas le même qu’à 45 ans. Nous ne demandons jamais la date complète.',
 byearl:'année de naissance',
 q3:'Quand tes dernières règles ont-elles commencé ?', q3s:'Le point de départ de la première prévision. Tu pourras corriger dans le calendrier.',
 dunno:'Je ne m’en souviens pas', dunnos:'Nous partirons du premier jour de règles que tu noteras',
 q4:'Durée du cycle et des règles', q4s:'Pas sûre ? Garde les valeurs par défaut. Après deux cycles, nous ajusterons nous-mêmes.',
 cyclel:'jours par cycle', periodl:'jours de règles',
 q5:'Ton cycle est-il régulier ?', q5s:'Cela change l’algorithme. S’il varie, nous affichons une plage plutôt qu’une date.',
 r1:'Régulier', r1s:'Les cycles varient de 3 jours maximum',
 r2:'Un peu variable', r2s:'Les cycles varient d’une semaine maximum',
 r3:'Irrégulier', r3s:'Très variable, les retards sont normaux pour moi',
 r4:'Je ne sais pas', r4s:'Nous le déduirons de tes données',
 bc:'Contraception hormonale', bcn:'Je n’en prends pas', bcy:'J’en prends', bcys:'Alors nous ne prévoirons pas l’ovulation',
 q6:'Que veux-tu suivre ?', q6s:'Choisis ce qui apparaît sur l’écran principal. Le reste est masqué. Modifiable plus tard.',
 m_mood:'Humeur', m_pain:'Douleurs et crampes', m_disch:'Pertes', m_sleep:'Sommeil',
 m_energy:'Énergie', m_bbt:'Température basale', m_med:'Médicaments et vitamines',
 q7:'Où sont tes données', q7s:'Pour ne rien perdre en changeant de téléphone.',
 bk:`Sauvegarde dans ton ${CLOUD}`, bks:'Chiffrée sur ton téléphone avant l’envoi. Nous ne pouvons pas la lire',
 lock:`Déverrouillage par ${BIO}`, locks:'Verrouillée si quelqu’un d’autre prend ton téléphone',
 rem:'Rappels', rems:'Règles et médicaments. Tu choisis le ton',
 nope:'Ce que nous ne faisons jamais', nopes:'Pas de publicité, aucun partage avec des tiers, ni e-mail ni téléphone, aucun profil de toi.',
 delnote:'Tu peux tout supprimer à tout moment, en un bouton.',
 hi:'Salut', dayof:'jour du cycle', logday:'Noter la journée', marktoday:'Noter aujourd’hui',
 ph_period:'Règles', ph_fert:'Fenêtre fertile', ph_ovu:'Ovulation', ph_luteal:'Phase lutéale', ph_foll:'Phase folliculaire',
 nodata:'Note ton premier jour de règles', nodatas:'Ensuite, nous établirons ta prévision.',
 cal:'Calendrier', ins:'Analyses', near:'À tes côtés', more:'Plus', today:'Aujourd’hui',
 hist:'Historique des cycles', noHist:'Pas encore de cycle terminé', allfree:'Tout ton historique, sans limite de durée.',
 cyclen:'Durée du cycle', avgc:'Cycle moyen', spread:'Variation', avgp:'Règles en moyenne', lut:'Phase lutéale',
 days:'jours', daysx:'jours', patterns:'Tendances', nopat:'Les tendances apparaissent après deux ou trois cycles.',
 pdf:'Rapport pour le médecin · PDF', csv:'Exporter les données · CSV',
 expnote:'Le fichier est créé sur ton téléphone. Tu décides qui le voit.',
 soon:'Bientôt', nearT:'À tes côtés', nearS:'Une conversation calme sur ce que vivent ton corps et ton humeur. Sans diagnostic ni jugement.',
 n1:'Explique simplement', n1s:'Pourquoi ton cycle a bougé, ce qu’est la phase lutéale, à quoi t’attendre cette semaine.',
 n2:'Repère les liens', n2s:'Relie ton sommeil, tes douleurs et ton humeur à la phase du cycle.',
 n3:'Prépare le rendez-vous', n3s:'Rassemble des questions à partir de ton historique et les joint au rapport.',
 notifyme:'Me prévenir au lancement', neardis:'Un assistant d’information, pas un médecin. Les symptômes inquiétants sont orientés vers un professionnel.',
 set:'Réglages', setS:'Tout est sous ton contrôle',
 secData:'Données et sauvegarde', secPriv:'Confidentialité', secInv:'Inviter une amie', secPart:'Partenaire', secRem:'Rappels', secSub:'Abonnement', secDel:'Données',
 bkon:'activée', bklast:'Dernière sauvegarde', bkrestore:'Restaurer sur un nouveau téléphone',
 bkrestores:`Installe Nia et connecte-toi au même ${CLOUD}`,
 bkfile:'Enregistrer une copie dans un fichier', bkfiles:'Si tu veux la garder à part',
 discreet:'Mode discret', discreets:'Nom et icône neutres dans les notifications',
 invT:'Parle de Nia à une amie', invS:`L’invitation n’est qu’un lien ${STORE_NAME} : nous ne lisons jamais tes contacts.`,
 invcopy:'Copier le lien', invshare:'Partager',
 partadd:'Ajouter un partenaire', partadds:'Il ne verra que la phase de ton cycle',
 remP:'Règles bientôt', remPs:'2 jours avant, 20 h 00', remM:'Médicaments', remMs:'Chaque jour, 9 h 00',
 remD:'Ton neutre des notifications', remDs:'Des faits, sans emoji ni surnoms',
 remDay:'Comment s’est passée ta journée', remDayS:'Chaque jour, 20 h 30', remOvu:'Ovulation et jours fertiles', remOvuS:'La veille, 10 h 00',
 nDayT:'Comment s’est passée ta journée ?', nDayB:'Note ton humeur, ton sommeil et ton ressenti — une minute suffit.',
 nPerT:'Règles bientôt', nPerB:'Attendues dans 2 jours.',
 nPer0T:'Règles attendues aujourd’hui', nPer0B:'Quand elles commencent, note le premier jour pour affiner la prévision.',
 nFertT:'Les jours fertiles commencent demain', nFertB:'La probabilité de conception augmente.',
 nOvuT:'Ovulation attendue demain', nOvuB:'Le jour le plus fertile du cycle.',
 nMedT:'Médicaments et vitamines', nMedB:'C’est l’heure de prendre ce que tu as prévu.',
 nRateT:'Tu aimes Nia ?', nRateB:`Note l’app sur ${STORE_NAME} — ça nous aide beaucoup.`,
 nDiscT:'Nia', nDiscB:'Tu as un nouveau rappel', nChan:'Rappels',
 delall:'Tout supprimer', delalls:'Immédiatement, sans e-mail ni délai d’attente',
 privnote:'Nia n’utilise aucun identifiant publicitaire et ne crée aucun profil de toi.',
 sheetS:'Note ce que tu ressens. Rien n’est obligatoire.', save:'Enregistrer',
 f0:'Aucun', f1:'Spotting', f2:'Léger', f3:'Moyen', f4:'Abondant',
 mo1:'Calme', mo2:'Joyeuse', mo3:'Anxieuse', mo4:'Irritable', mo5:'Déprimée',
 pa1:'Crampes', pa2:'Tête', pa3:'Bas du dos', pa4:'Poitrine', pa5:'Digestion',
 en1:'Très faible', en2:'Faible', en3:'Normale', en4:'Élevée',
 sleeph:'Heures de sommeil', flow:'Règles', mood:'Humeur', pain:'Douleur', energy:'Énergie',
 saved:'Journée enregistrée', copied:'Lien copié', deleted:'Toutes les données ont été supprimées',
 confirmDel:'Supprimer toutes les données ? C’est irréversible.',
 predP:'Règles attendues', predO:'Ovulation attendue', predRange:'Jours fertiles',
 lateT:n=>`${n} jour${n>1?'s':''} de retard`, lateS:'Quand tes règles commencent, note le premier jour et nous recalculerons.',
 accHi:'Prévision basée sur tes données.', accLow:'Ton cycle varie — nous affichons une plage. C’est plus honnête qu’une erreur d’une semaine.',
 accNew:'La précision s’améliore après deux ou trois cycles.',
 bcNote:'Tu prends une contraception hormonale — nous ne prévoyons pas l’ovulation.',
 mon:['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'],
 monN:['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
 monS:['janv.','févr.','mars','avr.','mai','juin','juil.','août','sept.','oct.','nov.','déc.'],
 wd:['lun','mar','mer','jeu','ven','sam','dim'],
 wdL:['dimanche','lundi','mardi','mercredi','jeudi','vendredi','samedi'],
 fmt:(d,m)=>`${d} ${T.mon[m]}`,
 dateLong:d=>cap1(`${T.wdL[d.getDay()]} ${d.getDate()} ${T.mon[d.getMonth()]}`),
 hdr:['Date','Jour du cycle','Règles','Humeur','Douleur','Sommeil','Énergie','Température'],
 repT:'Rapport pour le médecin', repGen:'Généré le',
 pwT:'1 mois gratuit', pwS:'Accès complet. Annulable à tout moment — nous te prévenons 2 jours avant le paiement.',
 pw1:'Prévisions du cycle et de l’ovulation', pw1s:'Fonctionne aussi avec un cycle irrégulier',
 pw2:'Tout l’historique et les analyses', pw2s:'Sans limite de durée',
 pw3:'Rapport pour le médecin', pw3s:'PDF et CSV, créés sur ton téléphone',
 pw4:'Tes données restent à toi', pw4s:'Pas de publicité, rien n’est partagé',
 pwM:'Mensuel', pwMP:'2,99 $', pwMN:'Annulable à tout moment',
 pwQ:'3 mois', pwQP:'3,99 $', pwQN:'1,33 $ par mois',
 pwYear:'Annuel', pwYearP:'15,99 $', pwYearN:'1,33 $ par mois · le plus avantageux', pwBest:'TOP',
 pwLife:'À vie', pwLifeP:'34,99 $', pwLifeN:'Paiement unique, sans abonnement',
 pwCta:'Essayer 1 mois gratuit', pwRestore:'Restaurer l’achat', lnkPriv:'Politique de confidentialité', lnkTerms:'Conditions d’utilisation (EULA)',
 pwNoteIos:'Facturé après 1 mois sauf annulation. Gère l’abonnement dans les réglages de ton identifiant Apple.',
 pwNoteAnd:'Facturé après 1 mois sauf annulation. Gère l’abonnement dans Google Play.',
 pwNoteLife:'Paiement unique. Sans abonnement ni prélèvement automatique.',
 trialLeft:'Essai', trialDays:'jours restants',
 expT:'L’essai est terminé', expS:'Toutes tes données sont en sécurité. Abonne-toi pour continuer.',
 subOn:'Abonnement actif', subLife:'Accès à vie', subNone:'Aucun abonnement', subNoneS:'Voir les offres',
 subManage:'Gérer l’abonnement', subManageS:`Annuler ou changer d’offre dans ${STORE_NAME}`,
 storeNA:'Boutique indisponible, réessaie plus tard', buyFail:'L’achat a échoué', noPurch:'Aucun achat trouvé',
 langT:'Choisis ta langue', langS:'Tu pourras la changer dans les réglages.',
 secLang:'Langue', langCur:'Français',
 predicted:'Prévision', calPd:n=>`Règles ${n} jour${n>1?'s':''}`, atyp:' · atypique',
 cyclesN:n=>`${n} cycle${n>1?'s':''}`, since:d=>`depuis le ${d}`,
 patD:(n,a)=>`Noté ${n} fois, le plus souvent vers le jour ${a} du cycle.`,
 nothingExp:'Rien à exporter pour l’instant', csvSaved:'CSV enregistré', savePdf:'Enregistrer en PDF',
 summary:'Résumé', cyclesRec:'Cycles enregistrés', yes:'oui', no:'non',
 colStart:'Début', colLen:'Durée', colBleed:'Règles', dailyLog:'Journal', noEntries:'Aucune donnée pour l’instant.',
 repFoot:'Généré par Nia sur l’appareil de l’utilisatrice. Il s’agit d’auto-observations, pas d’un avis médical.',
 notifyOk:'Nous te préviendrons au lancement', bkSaved:'Sauvegarde enregistrée',
 invTxt:u=>`Essaie Nia — un suivi de cycle qui garde tes données uniquement sur ton téléphone. ${u}`,
 errT:'Un problème est survenu', errBtn:'Recommencer', locale:'fr-FR'},
de:{tagline:'ein Zyklus, den nur du kennst',
 hello:'Hallo, ich bin Nia', hello2:'Lass uns deinen Kalender einrichten',
 w1s:`Deine Einträge bleiben auf deinem Handy und in deinem eigenen ${CLOUD}. Weder Werbenetzwerke noch wir können sie lesen.`,
 start:'Los geht’s', restore:'Ich habe schon ein Backup', noreg:'Dauert etwa eine Minute. Ohne Anmeldung, ohne E-Mail.',
 next:'Weiter', skip:'Überspringen', done:'Fertig',
 q1:'Was führt dich her?', q1s:'Davon hängt ab, was wir auf dem Startbildschirm zeigen.',
 g1:'Zyklus verfolgen', g1s:'Wissen, wann Periode und PMS kommen',
 g2:'Kinderwunsch', g2s:'Genaues fruchtbares Fenster und Eisprung',
 g3:'Schwangerschaft vermeiden', g3s:'Tage mit geringer Empfängniswahrscheinlichkeit',
 g4:'Symptome verstehen', g4s:'Schmerz, Stimmung, Schlaf und ihr Zusammenhang mit dem Zyklus',
 q2:'Wie dürfen wir dich nennen?', q2s:'Dein Name bleibt auf diesem Handy. Du kannst das überspringen.',
 nameph:'Name oder Spitzname', byear:'Geburtsjahr',
 byears:'Hilft einzuschätzen, was normal ist: Ein Zyklus mit 17 verhält sich anders als mit 45. Nach dem vollen Datum fragen wir nie.',
 byearl:'Geburtsjahr',
 q3:'Wann hat deine letzte Periode begonnen?', q3s:'Der Startpunkt für die erste Prognose. Du kannst es später im Kalender ändern.',
 dunno:'Ich weiß es nicht mehr', dunnos:'Wir starten mit dem ersten Periodentag, den du einträgst',
 q4:'Zyklus- und Periodenlänge', q4s:'Unsicher? Lass die Standardwerte. Nach zwei Zyklen rechnen wir selbst.',
 cyclel:'Tage pro Zyklus', periodl:'Tage Blutung',
 q5:'Wie regelmäßig ist dein Zyklus?', q5s:'Das ändert den Algorithmus. Schwankt er, zeigen wir einen Zeitraum statt eines Datums.',
 r1:'Regelmäßig', r1s:'Zyklen weichen bis zu 3 Tage ab',
 r2:'Schwankt etwas', r2s:'Zyklen weichen bis zu einer Woche ab',
 r3:'Unregelmäßig', r3s:'Schwankt stark, Verspätungen sind bei mir normal',
 r4:'Weiß ich nicht', r4s:'Wir ermitteln es aus deinen Einträgen',
 bc:'Hormonelle Verhütung', bcn:'Nehme ich nicht', bcy:'Nehme ich', bcys:'Dann sagen wir keinen Eisprung voraus',
 q6:'Was möchtest du erfassen?', q6s:'Wähle, was auf dem Startbildschirm erscheint. Der Rest bleibt verborgen. Später änderbar.',
 m_mood:'Stimmung', m_pain:'Schmerzen und Krämpfe', m_disch:'Ausfluss', m_sleep:'Schlaf',
 m_energy:'Energie', m_bbt:'Basaltemperatur', m_med:'Medikamente und Vitamine',
 q7:'Wo deine Daten liegen', q7s:'Damit beim Handywechsel nichts verloren geht.',
 bk:`Backup in deinem ${CLOUD}`, bks:'Wird auf deinem Handy verschlüsselt, bevor es gesendet wird. Wir können es nicht lesen',
 lock:`Entsperren per ${BIO}`, locks:'Gesperrt, wenn jemand anderes dein Handy nimmt',
 rem:'Erinnerungen', rems:'Periode und Medikamente. Den Ton wählst du',
 nope:'Was wir nie tun', nopes:'Keine Werbung, keine Weitergabe an Dritte, keine E-Mail oder Telefonnummer, kein Profil von dir.',
 delnote:'Du kannst jederzeit alles mit einem Knopf löschen.',
 hi:'Hallo', dayof:'Zyklustag', logday:'Tag eintragen', marktoday:'Heute eintragen',
 ph_period:'Periode', ph_fert:'Fruchtbares Fenster', ph_ovu:'Eisprung', ph_luteal:'Lutealphase', ph_foll:'Follikelphase',
 nodata:'Trage deinen ersten Periodentag ein', nodatas:'Dann erstellen wir deine Prognose.',
 cal:'Kalender', ins:'Auswertung', near:'Für dich', more:'Mehr', today:'Heute',
 hist:'Zyklusverlauf', noHist:'Noch keine abgeschlossenen Zyklen', allfree:'Dein ganzer Verlauf, ohne Zeitlimit.',
 cyclen:'Zykluslänge', avgc:'Durchschnittlicher Zyklus', spread:'Schwankung', avgp:'Durchschnittliche Periode', lut:'Lutealphase',
 days:'Tage', daysx:'Tage', patterns:'Muster', nopat:'Muster erscheinen nach zwei bis drei Zyklen.',
 pdf:'Bericht für die Ärztin · PDF', csv:'Daten exportieren · CSV',
 expnote:'Die Datei wird auf deinem Handy erstellt. Wer sie sieht, entscheidest du.',
 soon:'Bald', nearT:'Für dich', nearS:'Ein ruhiges Gespräch darüber, was Körper und Stimmung gerade tun. Ohne Diagnosen, ohne Urteil.',
 n1:'Erklärt verständlich', n1s:'Warum sich dein Zyklus verschoben hat, was die Lutealphase ist, was diese Woche zu erwarten ist.',
 n2:'Erkennt Zusammenhänge', n2s:'Verknüpft Schlaf, Schmerzen und Stimmung mit deiner Zyklusphase.',
 n3:'Bereitet auf den Arzttermin vor', n3s:'Sammelt Fragen aus deinem Verlauf und hängt sie an den Bericht.',
 notifyme:'Zum Start benachrichtigen', neardis:'Ein Info-Assistent, keine Ärztin. Bei bedenklichen Symptomen verweisen wir an Fachleute.',
 set:'Einstellungen', setS:'Alles unter deiner Kontrolle',
 secData:'Daten und Backup', secPriv:'Datenschutz', secInv:'Freundin einladen', secPart:'Partner', secRem:'Erinnerungen', secSub:'Abo', secDel:'Daten',
 bkon:'aktiv', bklast:'Letztes Backup', bkrestore:'Auf neuem Handy wiederherstellen',
 bkrestores:`Installiere Nia und melde dich im selben ${CLOUD} an`,
 bkfile:'Kopie als Datei speichern', bkfiles:'Falls du sie separat aufbewahren willst',
 discreet:'Diskreter Modus', discreets:'Neutraler Name und neutrales Symbol in Benachrichtigungen',
 invT:'Erzähl einer Freundin von Nia', invS:`Die Einladung ist nur ein ${STORE_NAME}-Link: Wir lesen nie deine Kontakte.`,
 invcopy:'Link kopieren', invshare:'Teilen',
 partadd:'Partner hinzufügen', partadds:'Er sieht nur deine Zyklusphase',
 remP:'Periode steht bevor', remPs:'2 Tage vorher, 20:00', remM:'Medikamente', remMs:'Täglich, 9:00',
 remD:'Neutraler Ton', remDs:'Nur Fakten, keine Emojis, keine Kosenamen',
 remDay:'Wie war dein Tag', remDayS:'Täglich, 20:30', remOvu:'Eisprung und fruchtbare Tage', remOvuS:'Einen Tag vorher, 10:00',
 nDayT:'Wie war dein Tag?', nDayB:'Trage Stimmung, Schlaf und Befinden ein — das dauert eine Minute.',
 nPerT:'Periode steht bevor', nPerB:'Erwartet in 2 Tagen.',
 nPer0T:'Periode heute erwartet', nPer0B:'Wenn sie beginnt, trage den ersten Tag ein — so wird die Prognose genauer.',
 nFertT:'Morgen beginnen die fruchtbaren Tage', nFertB:'Die Empfängniswahrscheinlichkeit steigt.',
 nOvuT:'Eisprung morgen erwartet', nOvuB:'Der fruchtbarste Tag des Zyklus.',
 nMedT:'Medikamente und Vitamine', nMedB:'Zeit für das, was du geplant hast.',
 nRateT:'Gefällt dir Nia?', nRateB:`Bewerte uns im ${STORE_NAME} — das hilft uns sehr.`,
 nDiscT:'Nia', nDiscB:'Du hast eine neue Erinnerung', nChan:'Erinnerungen',
 delall:'Alles löschen', delalls:'Sofort, ohne E-Mails und Wartezeit',
 privnote:'Nia nutzt keine Werbe-IDs und erstellt kein Profil von dir.',
 sheetS:'Notiere, wie du dich fühlst. Nichts ist Pflicht.', save:'Speichern',
 f0:'Keine', f1:'Schmierblutung', f2:'Leicht', f3:'Mittel', f4:'Stark',
 mo1:'Ruhig', mo2:'Fröhlich', mo3:'Ängstlich', mo4:'Gereizt', mo5:'Niedergeschlagen',
 pa1:'Krämpfe', pa2:'Kopf', pa3:'Unterer Rücken', pa4:'Brust', pa5:'Verdauung',
 en1:'Sehr niedrig', en2:'Niedrig', en3:'Normal', en4:'Hoch',
 sleeph:'Stunden Schlaf', flow:'Blutung', mood:'Stimmung', pain:'Schmerz', energy:'Energie',
 saved:'Tag gespeichert', copied:'Link kopiert', deleted:'Alle Daten gelöscht',
 confirmDel:'Alle Einträge löschen? Das lässt sich nicht rückgängig machen.',
 predP:'Periode erwartet', predO:'Eisprung erwartet', predRange:'Fruchtbare Tage',
 lateT:n=>`${n} ${n===1?'Tag':'Tage'} verspätet`, lateS:'Wenn deine Periode beginnt, trage den ersten Tag ein und wir rechnen neu.',
 accHi:'Prognose auf Basis deiner Einträge.', accLow:'Dein Zyklus schwankt — wir zeigen einen Zeitraum. Ehrlicher, als eine Woche danebenzuliegen.',
 accNew:'Die Genauigkeit steigt nach zwei bis drei Zyklen.',
 bcNote:'Du verhütest hormonell — wir sagen keinen Eisprung voraus.',
 mon:['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
 monN:['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
 monS:['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'],
 wd:['Mo','Di','Mi','Do','Fr','Sa','So'],
 wdL:['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'],
 fmt:(d,m)=>`${d}. ${T.mon[m]}`,
 dateLong:d=>`${T.wdL[d.getDay()]}, ${d.getDate()}. ${T.mon[d.getMonth()]}`,
 hdr:['Datum','Zyklustag','Blutung','Stimmung','Schmerz','Schlaf','Energie','Temperatur'],
 repT:'Bericht für die Ärztin', repGen:'Erstellt',
 pwT:'1 Monat gratis', pwS:'Voller Zugang. Jederzeit kündbar — wir erinnern dich 2 Tage vor der Abbuchung.',
 pw1:'Zyklus- und Eisprungprognosen', pw1s:'Auch bei unregelmäßigem Zyklus',
 pw2:'Gesamter Verlauf und Auswertung', pw2s:'Ohne Zeitlimit',
 pw3:'Bericht für die Ärztin', pw3s:'PDF und CSV, auf deinem Handy erstellt',
 pw4:'Deine Daten bleiben deine', pw4s:'Keine Werbung, keine Weitergabe',
 pwM:'Monatlich', pwMP:'2,99 $', pwMN:'Jederzeit kündbar',
 pwQ:'3 Monate', pwQP:'3,99 $', pwQN:'1,33 $ pro Monat',
 pwYear:'Jährlich', pwYearP:'15,99 $', pwYearN:'1,33 $ pro Monat · bester Preis', pwBest:'TOP',
 pwLife:'Lebenslang', pwLifeP:'34,99 $', pwLifeN:'Einmalzahlung, kein Abo',
 pwCta:'1 Monat gratis starten', pwRestore:'Kauf wiederherstellen', lnkPriv:'Datenschutzerklärung', lnkTerms:'Nutzungsbedingungen (EULA)',
 pwNoteIos:'Abbuchung nach 1 Monat, sofern nicht gekündigt. Verwaltung in den Einstellungen deines Apple-Accounts.',
 pwNoteAnd:'Abbuchung nach 1 Monat, sofern nicht gekündigt. Verwaltung in Google Play.',
 pwNoteLife:'Einmalzahlung. Kein Abo, keine automatischen Abbuchungen.',
 trialLeft:'Testphase', trialDays:'Tage übrig',
 expT:'Deine Testphase ist abgelaufen', expS:'Alle Einträge sind sicher. Abonniere, um weiterzumachen.',
 subOn:'Abo aktiv', subLife:'Lebenslanger Zugang', subNone:'Kein Abo', subNoneS:'Tarife ansehen',
 subManage:'Abo verwalten', subManageS:`Im ${STORE_NAME} kündigen oder Tarif ändern`,
 storeNA:'Store nicht verfügbar, versuche es später', buyFail:'Kauf fehlgeschlagen', noPurch:'Keine Käufe gefunden',
 langT:'Wähle deine Sprache', langS:'Du kannst sie später in den Einstellungen ändern.',
 secLang:'Sprache', langCur:'Deutsch',
 predicted:'Prognose', calPd:n=>`Periode ${n} ${n===1?'Tag':'Tage'}`, atyp:' · untypisch',
 cyclesN:n=>`${n} ${n===1?'Zyklus':'Zyklen'}`, since:d=>`seit ${d}`,
 patD:(n,a)=>`${n}-mal eingetragen, meist um Tag ${a} des Zyklus.`,
 nothingExp:'Noch nichts zu exportieren', csvSaved:'CSV gespeichert', savePdf:'Als PDF speichern',
 summary:'Übersicht', cyclesRec:'Erfasste Zyklen', yes:'ja', no:'nein',
 colStart:'Beginn', colLen:'Länge', colBleed:'Blutung', dailyLog:'Tagebuch', noEntries:'Noch keine Einträge.',
 repFoot:'Von Nia auf dem Gerät der Nutzerin erstellt. Es handelt sich um Selbstbeobachtungen, nicht um eine ärztliche Beurteilung.',
 notifyOk:'Wir sagen dir zum Start Bescheid', bkSaved:'Backup gespeichert',
 invTxt:u=>`Probier Nia aus — ein Zyklustracker, der deine Daten nur auf deinem Handy speichert. ${u}`,
 errT:'Etwas ist schiefgelaufen', errBtn:'Neu beginnen', locale:'de-DE'},
ar:{tagline:'دورة لا يعرفها أحد سواكِ',
 hello:'مرحبًا، أنا نيا', hello2:'لنُعدّ تقويمك',
 w1s:`تبقى بياناتك على هاتفك وفي ${CLOUD} الخاص بك. لا يمكننا ولا شبكات الإعلانات الاطلاع عليها.`,
 start:'ابدئي', restore:'لدي نسخة احتياطية', noreg:'يستغرق نحو دقيقة. بلا تسجيل وبلا بريد إلكتروني.',
 next:'التالي', skip:'تخطٍّ', done:'تمّ',
 q1:'ما الذي جاء بكِ؟', q1s:'على ذلك يعتمد ما نعرضه في الشاشة الرئيسية.',
 g1:'متابعة دورتي', g1s:'معرفة موعد الدورة وأعراض ما قبلها',
 g2:'أرغب في الحمل', g2s:'نافذة خصوبة وموعد إباضة دقيقان',
 g3:'تجنّب الحمل', g3s:'أيام احتمال الحمل فيها منخفض',
 g4:'فهم أعراضي', g4s:'الألم والمزاج والنوم وعلاقتها بالدورة',
 q2:'بماذا نناديكِ؟', q2s:'يبقى اسمك على هذا الهاتف. يمكنكِ التخطي.',
 nameph:'الاسم أو اللقب', byear:'سنة الميلاد',
 byears:'يساعدنا على تقدير ما هو طبيعي: الدورة في سن 17 تختلف عنها في سن 45. لا نطلب تاريخ الميلاد كاملًا أبدًا.',
 byearl:'سنة الميلاد',
 q3:'متى بدأت آخر دورة؟', q3s:'نقطة البداية لأول توقّع. يمكنكِ تعديلها لاحقًا في التقويم.',
 dunno:'لا أتذكر', dunnos:'سنبدأ من أول يوم دورة تسجّلينه',
 q4:'طول الدورة ومدة الحيض', q4s:'لستِ متأكدة؟ اتركي القيم الافتراضية. بعد دورتين سنحسبها بأنفسنا.',
 cyclel:'يومًا في الدورة', periodl:'أيام الحيض',
 q5:'ما مدى انتظام دورتك؟', q5s:'هذا يغيّر الخوارزمية. إذا كانت متقلبة نعرض نطاقًا بدل تاريخ واحد.',
 r1:'منتظمة', r1s:'الفرق بين الدورات حتى 3 أيام',
 r2:'تتغير قليلًا', r2s:'الفرق بين الدورات حتى أسبوع',
 r3:'غير منتظمة', r3s:'تتغير كثيرًا، والتأخير أمر عادي لدي',
 r4:'لا أعرف', r4s:'سنستنتج ذلك من بياناتك',
 bc:'وسائل منع الحمل الهرمونية', bcn:'لا أستخدمها', bcy:'أستخدمها', bcys:'إذن لن نتوقّع موعد الإباضة',
 q6:'ماذا تريدين أن تتابعي؟', q6s:'اختاري ما يظهر في الشاشة الرئيسية. الباقي مخفي. يمكن تغييره لاحقًا.',
 m_mood:'المزاج', m_pain:'الألم والتقلصات', m_disch:'الإفرازات', m_sleep:'النوم',
 m_energy:'الطاقة', m_bbt:'درجة الحرارة القاعدية', m_med:'الأدوية والفيتامينات',
 q7:'أين تُحفظ بياناتك', q7s:'حتى لا يضيع شيء عند تغيير الهاتف.',
 bk:`نسخ احتياطي في ${CLOUD}`, bks:'تُشفَّر على هاتفك قبل إرسالها. لا يمكننا قراءتها',
 lock:`فتح القفل بـ${BIO}`, locks:'يُقفل التطبيق إذا أخذ شخص آخر هاتفك',
 rem:'التذكيرات', rems:'الدورة والأدوية. أنتِ تختارين الأسلوب',
 nope:'ما لا نفعله أبدًا', nopes:'لا إعلانات، ولا مشاركة للبيانات مع أطراف ثالثة، ولا بريد أو رقم هاتف، ولا ملف تعريفي عنكِ.',
 delnote:'يمكنكِ حذف كل شيء في أي وقت بزر واحد.',
 hi:'مرحبًا', dayof:'يوم الدورة', logday:'سجّلي اليوم', marktoday:'سجّلي اليوم',
 ph_period:'الحيض', ph_fert:'نافذة الخصوبة', ph_ovu:'الإباضة', ph_luteal:'المرحلة الأصفرية', ph_foll:'المرحلة الجريبية',
 nodata:'سجّلي أول يوم من دورتك', nodatas:'بعدها سنبني توقّعك.',
 cal:'التقويم', ins:'التحليلات', near:'بجانبك', more:'المزيد', today:'اليوم',
 hist:'سجل الدورات', noHist:'لا توجد دورات مكتملة بعد', allfree:'سجلك الكامل، بلا حدود زمنية.',
 cyclen:'طول الدورة', avgc:'متوسط الدورة', spread:'التفاوت', avgp:'متوسط الحيض', lut:'المرحلة الأصفرية',
 days:'أيام', daysx:'يومًا', patterns:'الأنماط', nopat:'تظهر الأنماط بعد دورتين أو ثلاث.',
 pdf:'تقرير للطبيب · PDF', csv:'تصدير البيانات · CSV',
 expnote:'يُنشأ الملف على هاتفك. أنتِ من يقرر من يراه.',
 soon:'قريبًا', nearT:'بجانبك', nearS:'حديث هادئ عمّا يحدث لجسمك ومزاجك. بلا تشخيص وبلا أحكام.',
 n1:'يشرح بكلمات بسيطة', n1s:'لماذا تغيّرت دورتك، وما المرحلة الأصفرية، وماذا تتوقعين هذا الأسبوع.',
 n2:'يلاحظ الأنماط', n2s:'يربط نومك وألمك ومزاجك بمرحلة الدورة.',
 n3:'يحضّرك لزيارة الطبيب', n3s:'يجمع أسئلة من سجلك ويرفقها بالتقرير.',
 notifyme:'أعلميني عند الإطلاق', neardis:'مساعد معلوماتي وليس طبيبًا. عند الأعراض المقلقة نحيلكِ إلى مختص.',
 set:'الإعدادات', setS:'كل شيء تحت سيطرتك',
 secData:'البيانات والنسخ الاحتياطي', secPriv:'الخصوصية', secInv:'ادعي صديقة', secPart:'الشريك', secRem:'التذكيرات', secSub:'الاشتراك', secDel:'البيانات',
 bkon:'مفعّل', bklast:'آخر نسخة', bkrestore:'الاستعادة على هاتف جديد',
 bkrestores:`ثبّتي نيا وسجّلي الدخول إلى ${CLOUD} نفسه`,
 bkfile:'حفظ نسخة في ملف', bkfiles:'إذا أردتِ الاحتفاظ بها منفصلة',
 discreet:'الوضع الخفي', discreets:'اسم وأيقونة محايدان في الإشعارات',
 invT:'أخبري صديقة عن نيا', invS:`الدعوة مجرد رابط من ${STORE_NAME}: لا نقرأ جهات اتصالك أبدًا.`,
 invcopy:'نسخ الرابط', invshare:'مشاركة',
 partadd:'إضافة الشريك', partadds:'سيرى مرحلة دورتك فقط',
 remP:'اقتراب الدورة', remPs:'قبل يومين، 20:00', remM:'الأدوية', remMs:'يوميًا، 9:00',
 remD:'أسلوب إشعارات محايد', remDs:'حقائق فقط، بلا رموز تعبيرية أو ألقاب',
 remDay:'كيف كان يومك', remDayS:'يوميًا، 20:30', remOvu:'الإباضة والأيام الخصبة', remOvuS:'قبل يوم، 10:00',
 nDayT:'كيف كان يومك؟', nDayB:'سجّلي مزاجك ونومك وحالتك — يستغرق دقيقة واحدة.',
 nPerT:'اقتراب الدورة', nPerB:'متوقعة بعد يومين.',
 nPer0T:'الدورة متوقعة اليوم', nPer0B:'عندما تبدأ، سجّلي أول يوم ليصبح التوقّع أدق.',
 nFertT:'تبدأ الأيام الخصبة غدًا', nFertB:'يرتفع احتمال الحمل.',
 nOvuT:'الإباضة متوقعة غدًا', nOvuB:'أكثر أيام الدورة خصوبة.',
 nMedT:'الأدوية والفيتامينات', nMedB:'حان وقت تناول ما خططتِ له.',
 nRateT:'هل يعجبك نيا؟', nRateB:`قيّمي التطبيق في ${STORE_NAME} — هذا يساعدنا كثيرًا.`,
 nDiscT:'Nia', nDiscB:'لديكِ تذكير جديد', nChan:'التذكيرات',
 delall:'حذف كل شيء', delalls:'فورًا، بلا رسائل وبلا فترة انتظار',
 privnote:'لا يستخدم نيا معرّفات إعلانية ولا يبني ملفًا تعريفيًا عنكِ.',
 sheetS:'سجّلي ما تشعرين به. لا شيء إلزامي.', save:'حفظ',
 f0:'لا يوجد', f1:'تبقيع', f2:'خفيف', f3:'متوسط', f4:'غزير',
 mo1:'هادئة', mo2:'سعيدة', mo3:'قلقة', mo4:'متوترة', mo5:'حزينة',
 pa1:'تقلصات', pa2:'صداع', pa3:'أسفل الظهر', pa4:'الصدر', pa5:'الهضم',
 en1:'منخفضة جدًا', en2:'منخفضة', en3:'عادية', en4:'مرتفعة',
 sleeph:'ساعات النوم', flow:'الحيض', mood:'المزاج', pain:'الألم', energy:'الطاقة',
 saved:'تم حفظ اليوم', copied:'تم نسخ الرابط', deleted:'تم حذف كل البيانات',
 confirmDel:'حذف كل السجلات؟ لا يمكن التراجع عن ذلك.',
 predP:'الدورة المتوقعة', predO:'الإباضة المتوقعة', predRange:'الأيام الخصبة',
 lateT:n=>`تأخير ${arDays(n)}`, lateS:'عندما تبدأ دورتك، سجّلي أول يوم وسنعيد الحساب.',
 accHi:'التوقّع مبني على بياناتك.', accLow:'دورتك متقلبة — لذلك نعرض نطاقًا. هذا أصدق من خطأ بأسبوع.',
 accNew:'تتحسن الدقة بعد دورتين أو ثلاث.',
 bcNote:'أنتِ تستخدمين وسيلة منع حمل هرمونية — لا نتوقّع موعد الإباضة.',
 mon:['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'],
 monN:['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'],
 monS:['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'],
 wd:['إثن','ثلا','أرب','خمي','جمع','سبت','أحد'],
 wdL:['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'],
 fmt:(d,m)=>`${d} ${T.mon[m]}`,
 dateLong:d=>`${T.wdL[d.getDay()]}، ${d.getDate()} ${T.mon[d.getMonth()]}`,
 hdr:['التاريخ','يوم الدورة','الحيض','المزاج','الألم','النوم','الطاقة','الحرارة'],
 repT:'تقرير للطبيب', repGen:'تاريخ الإنشاء',
 pwT:'شهر مجاني', pwS:'وصول كامل. يمكنكِ الإلغاء في أي وقت — نذكّرك قبل الدفع بيومين.',
 pw1:'توقّع الدورة والإباضة', pw1s:'يعمل مع الدورة غير المنتظمة أيضًا',
 pw2:'كامل السجل والتحليلات', pw2s:'بلا حدود زمنية',
 pw3:'تقرير للطبيب', pw3s:'PDF وCSV، يُنشآن على هاتفك',
 pw4:'بياناتك لكِ وحدك', pw4s:'بلا إعلانات وبلا مشاركة',
 pwM:'شهري', pwMP:'$2.99', pwMN:'إلغاء في أي وقت',
 pwQ:'3 أشهر', pwQP:'$3.99', pwQN:'$1.33 شهريًا',
 pwYear:'سنوي', pwYearP:'$15.99', pwYearN:'$1.33 شهريًا · الأوفر', pwBest:'الأفضل',
 pwLife:'مدى الحياة', pwLifeP:'$34.99', pwLifeN:'دفعة واحدة، بلا اشتراك',
 pwCta:'ابدئي شهرًا مجانيًا', pwRestore:'استعادة الشراء', lnkPriv:'سياسة الخصوصية', lnkTerms:'شروط الاستخدام (EULA)',
 pwNoteIos:'يُخصم المبلغ بعد شهر ما لم تلغي. الإدارة من إعدادات Apple ID.',
 pwNoteAnd:'يُخصم المبلغ بعد شهر ما لم تلغي. الإدارة من Google Play.',
 pwNoteLife:'دفعة واحدة. بلا اشتراك وبلا خصومات تلقائية.',
 trialLeft:'التجربة', trialDays:'أيام متبقية',
 expT:'انتهت الفترة التجريبية', expS:'كل سجلاتك محفوظة. اشتركي للمتابعة.',
 subOn:'الاشتراك مفعّل', subLife:'وصول مدى الحياة', subNone:'لا يوجد اشتراك', subNoneS:'عرض الخطط',
 subManage:'إدارة الاشتراك', subManageS:`الإلغاء أو تغيير الخطة في ${STORE_NAME}`,
 storeNA:'المتجر غير متاح، حاولي لاحقًا', buyFail:'فشل الشراء', noPurch:'لم يُعثر على مشتريات',
 langT:'اختاري لغتك', langS:'يمكنكِ تغييرها لاحقًا في الإعدادات.',
 secLang:'اللغة', langCur:'العربية',
 predicted:'متوقّع', calPd:n=>`الحيض ${arDays(n)}`, atyp:' · غير معتادة',
 cyclesN:n=>arCycles(n), since:d=>`منذ ${d}`,
 patD:(n,a)=>`سُجّل ${n} مرة، غالبًا حول اليوم ${a} من الدورة.`,
 nothingExp:'لا شيء للتصدير بعد', csvSaved:'تم حفظ CSV', savePdf:'حفظ بصيغة PDF',
 summary:'الملخص', cyclesRec:'الدورات المسجلة', yes:'نعم', no:'لا',
 colStart:'البداية', colLen:'المدة', colBleed:'الحيض', dailyLog:'السجل اليومي', noEntries:'لا توجد سجلات بعد.',
 repFoot:'أنشأه تطبيق نيا على جهاز المستخدمة. هذه ملاحظات ذاتية وليست تقييمًا طبيًا.',
 notifyOk:'سنعلمك عند الإطلاق', bkSaved:'تم حفظ النسخة',
 invTxt:u=>`جرّبي نيا — تطبيق لمتابعة الدورة يحفظ بياناتك على هاتفك فقط. ${u}`,
 errT:'حدث خطأ ما', errBtn:'البدء من جديد', locale:'ar-u-nu-latn'}
};}
// тексты для Android-версии с рекламой
const ADS_TXT = {
 ru:{pwFree:'Продолжить бесплатно, с рекламой', pwT:'Nia без рекламы', pwS:'Все функции бесплатны. Подписка убирает рекламу. Первый месяц бесплатно, отмена в любой момент.',
   pw4:'Без рекламы', pw4s:'Подписка полностью отключает рекламу', subNone:'Убрать рекламу', subNoneS:'Оформить подписку',
   expT:'Nia без рекламы', expS:'Пользуйтесь бесплатно с рекламой или оформите подписку без рекламы.',
   nopes:'Не передаём записи о цикле никому, не просим почту и телефон. В бесплатной версии есть неперсонализированная реклама Google: она не использует ваши записи о здоровье.',
   privnote:'Записи о цикле хранятся только на телефоне. Реклама в бесплатной версии неперсонализированная и не использует ваши данные о здоровье.', adPriv:'Настройки рекламы'},
 kk:{pwFree:'Тегін жалғастыру, жарнамамен', pwT:'Nia жарнамасыз', pwS:'Барлық функция тегін. Жазылым жарнаманы өшіреді. Алғашқы ай тегін, кез келген уақытта бас тартуға болады.',
   pw4:'Жарнамасыз', pw4s:'Жазылым жарнаманы толық өшіреді', subNone:'Жарнаманы өшіру', subNoneS:'Жазылым рәсімдеу',
   expT:'Nia жарнамасыз', expS:'Жарнамамен тегін пайдаланыңыз немесе жарнамасыз жазылым рәсімдеңіз.',
   nopes:'Цикл жазбаларын ешкімге бермейміз, пошта мен телефон сұрамаймыз. Тегін нұсқада Google-дың жекелендірілмеген жарнамасы бар: ол денсаулық жазбаларыңызды қолданбайды.',
   privnote:'Цикл жазбалары тек телефонда сақталады. Тегін нұсқадағы жарнама жекелендірілмеген және денсаулық деректеріңізді қолданбайды.', adPriv:'Жарнама баптаулары'},
 en:{pwFree:'Continue free, with ads', pwT:'Nia without ads', pwS:'Every feature is free. A subscription removes ads. First month free, cancel anytime.',
   pw4:'No ads', pw4s:'A subscription turns ads off completely', subNone:'Remove ads', subNoneS:'Subscribe',
   expT:'Nia without ads', expS:'Keep using Nia free with ads, or subscribe to remove them.',
   nopes:'We never share your cycle entries and never ask for email or phone. The free version shows non-personalized Google ads that do not use your health entries.',
   privnote:'Your cycle entries stay on your phone. Ads in the free version are non-personalized and do not use your health data.', adPriv:'Ad privacy settings'},
 es:{pwFree:'Seguir gratis, con anuncios', pwT:'Nia sin anuncios', pwS:'Todas las funciones son gratis. La suscripción quita los anuncios. Primer mes gratis, cancela cuando quieras.',
   pw4:'Sin anuncios', pw4s:'La suscripción desactiva los anuncios por completo', subNone:'Quitar anuncios', subNoneS:'Suscribirse',
   expT:'Nia sin anuncios', expS:'Sigue usando Nia gratis con anuncios o suscríbete para quitarlos.',
   nopes:'Nunca compartimos tus registros del ciclo ni pedimos correo o teléfono. La versión gratuita muestra anuncios no personalizados de Google que no usan tus datos de salud.',
   privnote:'Tus registros del ciclo se quedan en tu teléfono. Los anuncios de la versión gratuita no son personalizados y no usan tus datos de salud.', adPriv:'Ajustes de privacidad de anuncios'},
 fr:{pwFree:'Continuer gratuitement, avec publicité', pwT:'Nia sans publicité', pwS:'Toutes les fonctions sont gratuites. L’abonnement supprime la publicité. Premier mois gratuit, annulable à tout moment.',
   pw4:'Sans publicité', pw4s:'L’abonnement supprime complètement la publicité', subNone:'Supprimer la publicité', subNoneS:'S’abonner',
   expT:'Nia sans publicité', expS:'Continue gratuitement avec publicité ou abonne-toi pour la supprimer.',
   nopes:'Nous ne partageons jamais tes données de cycle et ne demandons ni e-mail ni téléphone. La version gratuite affiche des publicités Google non personnalisées qui n’utilisent pas tes données de santé.',
   privnote:'Tes données de cycle restent sur ton téléphone. La publicité de la version gratuite n’est pas personnalisée et n’utilise pas tes données de santé.', adPriv:'Paramètres de confidentialité des annonces'},
 de:{pwFree:'Kostenlos weiter, mit Werbung', pwT:'Nia ohne Werbung', pwS:'Alle Funktionen sind kostenlos. Das Abo entfernt die Werbung. Erster Monat gratis, jederzeit kündbar.',
   pw4:'Ohne Werbung', pw4s:'Das Abo schaltet die Werbung komplett ab', subNone:'Werbung entfernen', subNoneS:'Abonnieren',
   expT:'Nia ohne Werbung', expS:'Nutze Nia kostenlos mit Werbung oder abonniere, um sie zu entfernen.',
   nopes:'Wir geben deine Zyklusdaten nie weiter und fragen nicht nach E-Mail oder Telefon. Die kostenlose Version zeigt nicht personalisierte Google-Werbung, die deine Gesundheitsdaten nicht nutzt.',
   privnote:'Deine Zyklusdaten bleiben auf deinem Handy. Die Werbung in der kostenlosen Version ist nicht personalisiert und nutzt keine Gesundheitsdaten.', adPriv:'Datenschutzeinstellungen für Werbung'},
 ar:{pwFree:'المتابعة مجانًا مع إعلانات', pwT:'نيا بلا إعلانات', pwS:'كل الميزات مجانية. الاشتراك يزيل الإعلانات. الشهر الأول مجاني، ويمكن الإلغاء في أي وقت.',
   pw4:'بلا إعلانات', pw4s:'الاشتراك يوقف الإعلانات تمامًا', subNone:'إزالة الإعلانات', subNoneS:'اشتركي',
   expT:'نيا بلا إعلانات', expS:'استخدمي نيا مجانًا مع الإعلانات أو اشتركي لإزالتها.',
   nopes:'لا نشارك بيانات دورتك أبدًا ولا نطلب بريدًا أو رقم هاتف. تعرض النسخة المجانية إعلانات Google غير مخصصة لا تستخدم بياناتك الصحية.',
   privnote:'تبقى بيانات دورتك على هاتفك. الإعلانات في النسخة المجانية غير مخصصة ولا تستخدم بياناتك الصحية.', adPriv:'إعدادات خصوصية الإعلانات'}
};
const _buildDict = buildDict;
const ADS_W1S = {
 ru:c=>`Записи о цикле хранятся на телефоне и в вашем личном ${c}. Мы не имеем к ним доступа, и они не используются для рекламы.`,
 kk:c=>`Цикл жазбалары телефоныңызда және жеке ${c} қоймаңызда сақталады. Біз оларды көре алмаймыз және олар жарнамаға қолданылмайды.`,
 en:c=>`Your cycle entries stay on your phone and in your own ${c}. We can't read them, and they are never used for ads.`,
 es:c=>`Tus registros del ciclo se guardan en tu teléfono y en tu ${c} personal. No podemos verlos y nunca se usan para anuncios.`,
 fr:c=>`Tes données de cycle restent sur ton téléphone et dans ton ${c} personnel. Nous ne pouvons pas les lire et elles ne servent jamais à la publicité.`,
 de:c=>`Deine Zyklusdaten bleiben auf deinem Handy und in deinem eigenen ${c}. Wir können sie nicht lesen, und sie werden nie für Werbung genutzt.`,
 ar:c=>`تبقى بيانات دورتك على هاتفك وفي ${c} الخاص بك. لا يمكننا قراءتها ولا تُستخدم للإعلانات أبدًا.`
};
buildDict = function(){ _buildDict(); if(ADS){ Object.assign(T, ADS_TXT[LANG]); T.w1s = ADS_W1S[LANG](CLOUD); } };
buildDict();

/* ================= ХРАНИЛИЩЕ ================= */
const KEY = 'nia.v1';
const blank = () => ({
  user:{name:'',birthYear:1998,goal:null,cycleLen:28,periodLen:5,lutealLen:14,
        regularity:null,bc:null,metrics:['mood','pain','disch'],onboarded:false},
  cycles:[],        // {start:'YYYY-MM-DD', end:null, atypical:false}
  logs:{},          // 'YYYY-MM-DD': {flow,mood[],pain[],energy,sleep,bbt}
  sub:{status:'none',trialStart:null,plan:null,expires:null,mgmt:null},
  settings:{backup:true,lock:true,reminders:true,discreet:false,plainTone:true,
            remPeriod:true,remMed:true,remDay:true,remOvu:true,lastBackup:null,invites:0,
            installDate:null,notifAsked:false}
});
let S = load();
applyDesign();

function load(){
  try{ const r = localStorage.getItem(KEY); if(!r) return blank();
       const p = JSON.parse(r); const b = blank();
       return {user:{...b.user,...p.user}, cycles:p.cycles||[], logs:p.logs||{},
               settings:{...b.settings,...p.settings}, sub:{...b.sub,...(p.sub||{})}};
  }catch(e){ return blank(); }
}
function save(){ try{ localStorage.setItem(KEY, JSON.stringify(S)); }catch(e){} }

/* ================= ДАТЫ ================= */
const iso = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const parse = s => { const [y,m,d] = s.split('-').map(Number); return new Date(y,m-1,d); };
const addDays = (s,n) => { const d = parse(s); d.setDate(d.getDate()+n); return iso(d); };
const diffDays = (a,b) => Math.round((parse(b)-parse(a))/86400000);
let TODAY = iso(new Date());
function fmtDate(s){ const d = parse(s);
  return T.fmt(d.getDate(), d.getMonth()); }

/* ================= ДВИЖОК ПРОГНОЗА ================= */
// длины циклов вместе с датой начала цикла (для подписей на графике)
function lengthItems(){
  const cs = S.cycles.filter(c=>!c.atypical).slice().sort((a,b)=>a.start<b.start?-1:1);
  const out = [];
  for(let i=0;i<cs.length-1;i++){
    const n = diffDays(cs[i].start, cs[i+1].start);
    if(n>=15 && n<=70) out.push({n, start:cs[i].start});
  }
  return out;
}
function lengths(){ return lengthItems().map(x=>x.n); }
function weightedMedian(arr){
  if(!arr.length) return null;
  const last = arr.slice(-6);
  const exp = [];
  last.forEach((v,i)=>{ const w = i+1; for(let k=0;k<w;k++) exp.push(v); });
  exp.sort((a,b)=>a-b);
  const m = Math.floor(exp.length/2);
  return exp.length%2 ? exp[m] : Math.round((exp[m-1]+exp[m])/2);
}
function stdev(arr){
  if(arr.length<2) return 0;
  const m = arr.reduce((a,b)=>a+b,0)/arr.length;
  return Math.sqrt(arr.reduce((a,b)=>a+(b-m)**2,0)/(arr.length-1));
}
function periodLengths(){
  return S.cycles.filter(c=>c.end).map(c=>diffDays(c.start,c.end)+1).filter(n=>n>=1&&n<=14);
}
function predict(){
  const cs = S.cycles.slice().sort((a,b)=>a.start<b.start?-1:1);
  if(!cs.length) return null;
  const L = lengths();
  const len = L.length>=3 ? weightedMedian(L) : S.user.cycleLen;
  const sd  = stdev(L);
  const irregular = S.user.regularity==='irr' || sd>7;
  const lastStart = cs[cs.length-1].start;
  const day = diffDays(lastStart, TODAY)+1;
  const rawNext = addDays(lastStart, len);
  const late = Math.max(0, diffDays(rawNext, TODAY));
  const nextP = late>0 ? TODAY : rawNext;
  const lut = S.user.lutealLen;
  const ovu = addDays(rawNext, -lut);
  const PL = periodLengths();
  const pLen = PL.length ? Math.round(PL.reduce((a,b)=>a+b,0)/PL.length) : S.user.periodLen;
  return {len,sd,irregular,day,lastStart,nextP,late,ovu,pLen,
          fertStart:addDays(ovu,-5), fertEnd:addDays(ovu,1),
          count:cs.length, lengths:L};
}
function phaseOf(dateStr, p){
  if(!p) return null;
  // все записанные менструации, не только последняя
  for(const c of S.cycles){
    const isLast = c.start===p.lastStart;
    const byLen = addDays(c.start, p.pLen-1);
    const end = c.end ? (isLast && c.end<byLen ? byLen : c.end) : byLen;
    if(dateStr>=c.start && dateStr<=end) return 'period';
  }
  if(dateStr>=p.nextP && diffDays(p.nextP,dateStr)<p.pLen) return 'pred';
  if(S.user.bc!=='yes' && !p.late){
    if(dateStr===p.ovu) return 'ovu';
    if(dateStr>=p.fertStart && dateStr<=p.fertEnd) return 'fert';
  }
  return null;
}

/* ================= ПОКУПКИ (RevenueCat) ================= */
const RC_KEYS = { android: '__RC_ANDROID_KEY__', ios: '__RC_IOS_KEY__' };
const NATIVE = !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
const RC = () => window.NiaPurchases;
let rcReady = false, rcPkgs = {}, rcInitP = null;
const RC_KEY = RC_KEYS[PLATFORM] || '__';
function applyInfo(ci){
  if(!ci) return;
  S.sub.mgmt = ci.managementURL || null;
  const e = ci.entitlements && ci.entitlements.active && ci.entitlements.active.premium;
  if(e){
    const pid = e.productIdentifier || '';
    S.sub.status = pid.indexOf('lifetime')>=0 ? 'lifetime' : (e.periodType==='TRIAL' ? 'trial' : 'paid');
    S.sub.plan = pid.indexOf('lifetime')>=0 ? 'life' : pid.indexOf('3month')>=0 ? 'quarter' : pid.indexOf('monthly')>=0 ? 'month' : 'year';
    S.sub.expires = e.expirationDate || null;
  } else { S.sub.status = 'none'; S.sub.expires = null; }
  save(); adSync();
}
// запуск RevenueCat один раз; при ошибке можно повторить
function rcInit(){
  if(!NATIVE || !RC() || RC_KEY.indexOf('__')===0) return Promise.resolve();
  if(rcReady) return Promise.resolve();
  if(rcInitP) return rcInitP;
  rcInitP = (async ()=>{
    try{
      const opts = { apiKey: RC_KEY };
      if(PLATFORM==='ios'){
        const SK = window.NiaStoreKit;
        opts.storeKitVersion = (SK && SK.STOREKIT_1) || 'STOREKIT_1';
      }
      await RC().configure(opts);
      rcReady = true;
      const r = await RC().getCustomerInfo(); applyInfo(r.customerInfo);
    }catch(e){ console.log('rc init', e); }
    finally{ rcInitP = null; }
  })();
  return rcInitP;
}
async function rcRefresh(){
  if(!rcReady) return;
  try{ const r = await RC().getCustomerInfo(); applyInfo(r.customerInfo); }catch(e){}
}
async function rcLoadPackages(){
  if(!rcReady) await rcInit();
  if(!rcReady) return;
  try{
    const o = await RC().getOfferings(); const c = o && o.current; if(!c) return;
    (c.availablePackages||[]).forEach(p=>{
      const t = p.packageType, id = p.identifier;
      if(t==='ANNUAL'||id==='$rc_annual') rcPkgs.year = p;
      else if(t==='MONTHLY'||id==='$rc_monthly') rcPkgs.month = p;
      else if(t==='THREE_MONTH'||id==='$rc_three_month') rcPkgs.quarter = p;
      else if(t==='LIFETIME'||id==='$rc_lifetime') rcPkgs.life = p;
    });
  }catch(e){ console.log('rc offerings', e); }
}
async function rcBuy(plan){
  if(!rcPkgs[plan]) await rcLoadPackages();   // повторная попытка, если магазин не успел загрузиться
  const pkg = rcPkgs[plan];
  if(!pkg){ toast(T.storeNA); return false; }
  try{ const r = await RC().purchasePackage({ aPackage: pkg }); applyInfo(r.customerInfo); return hasAccess(); }
  catch(e){ if(!(e && (e.userCancelled || e.code==='1'))) toast(T.buyFail); return false; }
}
async function rcRestore(){
  if(!rcReady) await rcInit();
  if(!rcReady){ toast(T.storeNA); return false; }
  try{ const r = await RC().restorePurchases(); applyInfo(r.customerInfo); }catch(e){}
  if(hasAccess()) return true;
  toast(T.noPurch); return false;
}
function manageUrl(){
  if(S.sub.mgmt) return S.sub.mgmt;
  return PLATFORM==='ios'
    ? 'https://apps.apple.com/account/subscriptions'
    : 'https://play.google.com/store/account/subscriptions?package=online.forwardip.nia';
}

function trialDaysLeft(){
  if(S.sub.expires) return Math.max(0, Math.ceil((new Date(S.sub.expires)-new Date())/864e5));
  if(!S.sub.trialStart) return 0;
  return Math.max(0, 30 - diffDays(S.sub.trialStart, TODAY));
}
function hasAccess(){
  if(S.sub.status==='lifetime') return true;
  if(NATIVE) return (S.sub.status==='paid'||S.sub.status==='trial') && (!S.sub.expires || new Date(S.sub.expires) > new Date());
  if(S.sub.status==='paid') return true;
  if(S.sub.status==='trial') return trialDaysLeft() > 0;
  return false;
}
// только для веб-версии (в браузере), в приложении покупка идёт через магазин
function startTrial(plan){ S.sub.status='trial'; S.sub.trialStart=TODAY; S.sub.plan=plan||'year'; save(); }
function buyLifetime(){ S.sub.status='lifetime'; S.sub.plan='life'; save(); }

/* ================= УВЕДОМЛЕНИЯ (на телефоне, без сервера) ================= */
const LN = () => window.NiaNotif;
const NBASE = 7000;            // id наших уведомлений: 7000…7999
let notifBound = false, pendingTap = null;
const REVIEW_URL = PLATFORM==='ios' ? 'https://apps.apple.com/app/id6818955026?action=write-review' : STORE_URL;
function atTime(ds,h,m){ const d = parse(ds); d.setHours(h,m,0,0); return d; }
function buildNotifs(){
  const out = [], now = new Date(), st = S.settings, p = predict();
  const em = st.plainTone ? {} : {day:'🌙 ',period:'🩸 ',fert:'🌱 ',ovu:'🌼 ',med:'💊 ',rate:'⭐ '};
  let id = NBASE;
  const add = (at, title, body, kind)=>{
    if(!(at > now)) return;
    const n = { id:id++, title: st.discreet ? T.nDiscT : (em[kind]||'')+title,
      body: st.discreet ? T.nDiscB : body, schedule:{ at, allowWhileIdle:true }, extra:{ kind } };
    if(PLATFORM==='android') n.channelId = 'nia';
    out.push(n);
  };
  // «Как прошёл день?» — 14 дней вперёд, кроме уже заполненных дней
  if(st.remDay) for(let i=0;i<14;i++){ const ds = addDays(TODAY,i); if(!S.logs[ds]) add(atTime(ds,20,30), T.nDayT, T.nDayB, 'day'); }
  // лекарства — ежедневно в 9:00, если выбран этот пункт
  if(st.remMed && S.user.metrics.includes('med')) for(let i=0;i<14;i++) add(atTime(addDays(TODAY,i),9,0), T.nMedT, T.nMedB, 'med');
  if(p && !p.late){
    for(let k=0;k<3;k++){                       // текущий и два следующих цикла
      const nextP = addDays(p.nextP, k*p.len), ovu = addDays(p.ovu, k*p.len);
      if(st.remPeriod){
        add(atTime(addDays(nextP,-2),20,0), T.nPerT, T.nPerB, 'period');
        add(atTime(nextP,9,0), T.nPer0T, T.nPer0B, 'period');
      }
      if(st.remOvu && S.user.bc!=='yes'){
        add(atTime(addDays(ovu,-6),10,0), T.nFertT, T.nFertB, 'fert');
        add(atTime(addDays(ovu,-1),10,0), T.nOvuT, T.nOvuB, 'ovu');
      }
    }
  }
  // просьба оценить — один раз, через 14 дней после установки
  if(st.installDate) add(atTime(addDays(st.installDate,14),19,0), T.nRateT, T.nRateB, 'rate');
  return out;
}
function onNotifTap(kind){
  if(kind==='rate'){ try{ window.open(REVIEW_URL,'_blank'); }catch(e){} return; }
  if(!inApp){ pendingTap = kind; return; }
  goTab(0);
  if(kind==='day' || kind==='med') openSheet(TODAY);
}
async function notifSync(ask){
  if(!NATIVE || !LN()) return;
  try{
    if(!notifBound){
      notifBound = true;
      if(PLATFORM==='android') await LN().createChannel({ id:'nia', name:T.nChan, importance:4, visibility:0 });
      LN().addListener('localNotificationActionPerformed', a=>{
        const x = a && a.notification && a.notification.extra; onNotifTap(x && x.kind); });
    }
    const pend = await LN().getPending();
    const old = (pend.notifications||[]).filter(n=>n.id>=NBASE && n.id<NBASE+1000).map(n=>({id:n.id}));
    if(old.length) await LN().cancel({ notifications: old });
    if(!S.user.onboarded || !S.settings.reminders) return;
    let perm = await LN().checkPermissions();
    if(perm.display!=='granted'){
      if(!ask) return;
      perm = await LN().requestPermissions();
      if(perm.display!=='granted') return;
    }
    const list = buildNotifs();
    if(list.length) await LN().schedule({ notifications: list });
  }catch(e){ console.log('notif', e); }
}

/* ================= РЕКЛАМА (AdMob, только Android) =================
   Неперсонализированный баннер внизу. Не показывается подписчикам,
   при открытом листе ввода, на пейволе и во время онбординга. */
const ADMOB_BANNER_ID = 'ca-app-pub-1286571991466831/4576622874';      // ca-app-pub-XXXX/YYYY из AdMob
const AD_TEST = false;                                    // true — тестовая реклама при отладке
const AD = () => window.NiaAdMob;
let adReady = false, adInitP = null, adShown = false, adHidden = false, adConsentPriv = false;
async function adInit(){
  if(!ADS || !NATIVE || !AD() || ADMOB_BANNER_ID.indexOf('__')===0) return false;
  if(adReady) return true;
  if(adInitP) return adInitP;
  adInitP = (async ()=>{
    try{
      await AD().initialize();
      // согласие (обязательно для ЕЭЗ/Великобритании): форма Google UMP
      try{
        let ci = await AD().requestConsentInfo();
        if(ci.isConsentFormAvailable && ci.status==='REQUIRED') ci = await AD().showConsentForm();
        adConsentPriv = ci.status==='OBTAINED' || ci.status==='REQUIRED';
      }catch(e){ console.log('ump', e); }
      AD().addListener('bannerAdSizeChanged', sz=>{
        const h = Math.round((sz && sz.height) || 0);
        document.documentElement.style.setProperty('--adh', h+'px');
        document.body.classList.toggle('ads', h>0);
      });
      adReady = true;
    }catch(e){ console.log('admob init', e); }
    finally{ adInitP = null; }
    return adReady;
  })();
  return adInitP;
}
function adWanted(){
  if(!ADS || !inApp || hasAccess()) return false;
  if($('sheet') && $('sheet').classList.contains('on')) return false;
  if($('vpw') && $('vpw').classList.contains('active')) return false;
  return true;
}
async function adSync(){
  if(!ADS || !NATIVE) return;
  const want = adWanted();
  if(!want){
    if(adShown){
      try{ if(hasAccess() || !inApp){ await AD().removeBanner(); adShown=false; } else { await AD().hideBanner(); adHidden=true; } }catch(e){}
      document.body.classList.remove('ads');
    }
    return;
  }
  if(!(await adInit())) return;
  try{
    if(!adShown){
      await AD().showBanner({adId:ADMOB_BANNER_ID, adSize:'ADAPTIVE_BANNER', position:'BOTTOM_CENTER', margin:0, npa:true, isTesting:AD_TEST});
      adShown = true; adHidden = false;
    } else if(adHidden){ await AD().resumeBanner(); adHidden = false; document.body.classList.add('ads'); }
  }catch(e){ console.log('banner', e); }
}
// лист ввода и экраны открываются в разных местах — следим за ними централизованно
try{ new MutationObserver(()=>adSync()).observe(document.getElementById('sheet'), {attributes:true, attributeFilter:['class']});
     new MutationObserver(()=>adSync()).observe(document.getElementById('vpw'), {attributes:true, attributeFilter:['class']}); }catch(e){}
// место под баннер: навигация и контент поднимаются на высоту рекламы
try{ const st=document.createElement('style');
  st.textContent='body.ads{--sb:calc(env(safe-area-inset-bottom,0px) + var(--adh,0px))}';
  document.head.appendChild(st); }catch(e){}

/* ================= ВСПОМОГАТЕЛЬНОЕ ================= */
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let tt; function toast(m){ const t=$('toast'); t.textContent=m; t.classList.add('on');
  clearTimeout(tt); tt=setTimeout(()=>t.classList.remove('on'),2300); }
// симптомы хранятся ключами (mo1, pa2…), старые записи текстом на любом языке переводятся в ключ
const SYM_KEYS = ['mo1','mo2','mo3','mo4','mo5','pa1','pa2','pa3','pa4','pa5'];
let _symMap = null;
function normKey(v){
  if(SYM_KEYS.indexOf(v)>=0) return v;
  if(!_symMap){ _symMap = {}; const D = DICT();
    SUPPORTED.forEach(l=>SYM_KEYS.forEach(k=>{ _symMap[D[l][k]] = k; })); }
  return _symMap[v] || null;
}
const labelOf = v => { const k = normKey(v); return k ? T[k] : String(v); };
const locDate = d => { try{ return d.toLocaleDateString(T.locale); }catch(e){ return d.toLocaleDateString(); } };
const locDateTime = d => { try{ return d.toLocaleString(T.locale); }catch(e){ return d.toLocaleString(); } };
const cssVar = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();

const VIEWS = ['vlang','vpw','v0','v1','v2','v3','v4','v5','v6','v7','home','calv','insv','chatv','setv'];
let onb = 0, tab = 0, inApp = false;
function show(id){
  VIEWS.forEach(v=>$(v).classList.toggle('active', v===id));
  $(id).scrollTop = 0; $('appbar').classList.remove('sc');
}

/* ================= ПЕЙВОЛ ================= */
function renderPaywall(expired){
  const v = $('vpw');
  const row = (t,s)=>`<div style="display:flex;gap:12px;margin-bottom:13px">
    <span style="color:var(--sage);font-size:15px;flex:0 0 auto">✓</span>
    <span><b style="font-size:14px;display:block">${t}</b>
    <small style="font-size:12px;color:var(--ink-soft)">${s}</small></span></div>`;
  const subNote = PLATFORM==='android' ? T.pwNoteAnd : T.pwNoteIos;
  v.innerHTML = `<div style="text-align:center;padding:26px 0 4px">
      <div class="heroico">◐</div>
      <h1>${expired ? T.expT : T.pwT}</h1>
      <p class="sub" style="max-width:290px;margin:8px auto 0">${expired ? T.expS : T.pwS}</p></div>
    <div class="card" style="margin-top:20px">
      ${row(T.pw1,T.pw1s)}${row(T.pw2,T.pw2s)}${row(T.pw3,T.pw3s)}${row(T.pw4,T.pw4s)}</div>
    <div class="pick on" data-plan="year" style="justify-content:space-between;position:relative">
      <span><b>${T.pwYear}</b><small>${T.pwYearN}</small></span>
      <b style="font-family:'Fraunces',serif;font-size:19px">${T.pwYearP}</b>
      <span style="position:absolute;top:-9px;left:14px;background:var(--bloom);color:#fff;font-size:8.5px;
        font-weight:700;letter-spacing:.08em;padding:3px 8px;border-radius:99px">${T.pwBest}</span></div>
    <div class="pick" data-plan="month" style="justify-content:space-between">
      <span><b>${T.pwM}</b><small>${T.pwMN}</small></span>
      <b style="font-family:'Fraunces',serif;font-size:19px">${T.pwMP}</b></div>
    <div class="pick" data-plan="quarter" style="justify-content:space-between">
      <span><b>${T.pwQ}</b><small>${T.pwQN}</small></span>
      <b style="font-family:'Fraunces',serif;font-size:19px">${T.pwQP}</b></div>
    <div class="pick" data-plan="life" style="justify-content:space-between">
      <span><b>${T.pwLife}</b><small>${T.pwLifeN}</small></span>
      <b style="font-family:'Fraunces',serif;font-size:19px">${T.pwLifeP}</b></div>
    <button class="cta" id="pwGo">${T.pwCta}</button>
    ${ADS ? `<button class="cta ghost" id="pwFree">${T.pwFree}</button>` : ''}
    <button class="cta ghost" id="pwRes">${T.pwRestore}</button>
    <p class="note" style="text-align:center" id="pwNote">${subNote}</p>
    <p class="note" style="text-align:center"><a href="https://nia.forwardip.online/privacy.html" target="_blank" rel="noopener" style="color:inherit">${T.lnkPriv}</a>${PLATFORM==='ios' ? ` · <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" target="_blank" rel="noopener" style="color:inherit">${T.lnkTerms}</a>` : ''}</p>`;
  let plan='year';
  const lifePrice = ()=> (rcPkgs.life && rcPkgs.life.product && rcPkgs.life.product.priceString) || T.pwLifeP;
  v.querySelectorAll('[data-plan]').forEach(el=>el.onclick=()=>{
    v.querySelectorAll('[data-plan]').forEach(x=>x.classList.remove('on'));
    el.classList.add('on'); plan=el.dataset.plan;
    $('pwGo').textContent = plan==='life' ? lifePrice() : T.pwCta;
    $('pwNote').textContent = plan==='life' ? T.pwNoteLife : subNote;
  });
  const setPrices = ()=>{
    const ps = {year:rcPkgs.year, month:rcPkgs.month, quarter:rcPkgs.quarter, life:rcPkgs.life};
    Object.keys(ps).forEach(k=>{ const p=ps[k]; if(!p||!p.product) return;
      const el = v.querySelector(`[data-plan="${k}"] > b`); if(el) el.textContent = p.product.priceString; });
    if(plan==='life') $('pwGo').textContent = lifePrice();
  };
  if(NATIVE){ rcLoadPackages().then(setPrices); }
  let busy=false;
  $('pwGo').onclick = async ()=>{
    if(!NATIVE){ if(plan==='life') buyLifetime(); else startTrial(plan); enterApp(); return; }
    if(busy) return; busy=true; $('pwGo').disabled=true;
    const ok = await rcBuy(plan);
    setPrices();
    busy=false; $('pwGo').disabled=false;
    if(ok) enterApp();
  };
  if($('pwFree')) $('pwFree').onclick = ()=>enterApp();
  $('pwRes').onclick = async ()=>{
    if(!NATIVE){ toast(T.noPurch); return; }
    if(busy) return; busy=true;
    const ok = await rcRestore();
    busy=false;
    if(ok) enterApp();
  };
  show('vpw');
  // если открыт из настроек — можно вернуться назад
  $('backBtn').classList.toggle('on', inApp);
  $('barTitle').textContent = '';
}

/* ================= ОНБОРДИНГ ================= */
function renderLang(){
  const v = $('vlang');
  v.innerHTML = `<div class="hero" style="padding-top:44px"><div class="heroico">◐</div>
    <h1>${T.langT}</h1><p class="sub" style="margin:10px auto 26px">${T.langS}</p></div>
    ${LANGS.map(([k,n,c])=>`<div class="pick ${LANG===k?'on':''}" data-l="${k}"><span class="ic" style="font-size:12px;font-weight:700">${c}</span><span><b>${n}</b></span></div>`).join('')}
    <button class="cta" id="lnext">${T.next}</button>`;
  v.querySelectorAll('[data-l]').forEach(el=>el.onclick=()=>{
    setLang(el.dataset.l); renderLang();
  });
  $('lnext').onclick = ()=>step(0);
  show('vlang');
  $('backBtn').classList.remove('on');
  $('barTitle').textContent = '';
}

function renderOnb(n){
  onb = n; const v = $('v'+n);
  const pr = p => `<div class="prog"><i style="width:${p}%"></i></div>`;
  if(n===0){
    v.innerHTML = `<div class="hero"><div class="heroico">◐</div>
      <h1>${T.hello}</h1>
      <p class="sub" style="font-size:16px;color:var(--ink);margin:6px 0 14px">${T.hello2}</p>
      <p class="sub" style="max-width:290px;margin:0 auto">${T.w1s}</p></div>
      <div style="margin-top:28px">
      <button class="cta" id="oStart">${T.start}</button>
      <button class="cta ghost" id="oRestore">${T.restore}</button>
      <p class="note" style="text-align:center">${T.noreg}</p></div>`;
    $('oStart').onclick = ()=>step(1);
    $('oRestore').onclick = ()=>{ toast(T.bkrestores); };
  }
  if(n===1){
    v.innerHTML = pr(14)+`<h1>${T.q1}</h1><p class="sub">${T.q1s}</p>
      ${[['track','◔',T.g1,T.g1s],['conceive','◍',T.g2,T.g2s],['avoid','◇',T.g3,T.g3s],['health','◈',T.g4,T.g4s]]
      .map(([k,i,t,s])=>`<div class="pick ${S.user.goal===k?'on':''}" data-goal="${k}">
        <span class="ic">${i}</span><span><b>${t}</b><small>${s}</small></span></div>`).join('')}
      <button class="cta" id="b1" ${S.user.goal?'':'disabled'}>${T.next}</button>`;
    v.querySelectorAll('[data-goal]').forEach(el=>el.onclick=()=>{
      v.querySelectorAll('[data-goal]').forEach(x=>x.classList.remove('on'));
      el.classList.add('on'); S.user.goal = el.dataset.goal; save(); $('b1').disabled = false; });
    $('b1').onclick = ()=>step(2);
  }
  if(n===2){
    v.innerHTML = pr(28)+`<h1>${T.q2}</h1><p class="sub">${T.q2s}</p>
      <input class="inp" id="nm" placeholder="${T.nameph}" value="${esc(S.user.name)}" maxlength="24">
      <div class="eyebrow">${T.byear}</div><p class="sub" style="margin-top:-4px">${T.byears}</p>
      <div class="stepper"><button class="sbtn" data-b="-1">−</button>
        <div style="text-align:center"><b id="yv">${S.user.birthYear}</b><small>${T.byearl}</small></div>
        <button class="sbtn" data-b="1">+</button></div>
      <button class="cta" id="b2">${T.next}</button>
      <button class="cta ghost" id="b2s">${T.skip}</button>`;
    $('nm').oninput = e=>{ S.user.name = e.target.value.slice(0,24); save(); };
    v.querySelectorAll('[data-b]').forEach(b=>b.onclick=()=>{
      S.user.birthYear = Math.min(2012, Math.max(1955, S.user.birthYear + +b.dataset.b));
      $('yv').textContent = S.user.birthYear; save(); });
    $('b2').onclick = $('b2s').onclick = ()=>step(3);
  }
  if(n===3){
    const def = S.cycles.length ? S.cycles[S.cycles.length-1].start : addDays(TODAY,-10);
    v.innerHTML = pr(42)+`<h1>${T.q3}</h1><p class="sub">${T.q3s}</p>
      <input class="inp" type="date" id="ld" value="${def}" max="${TODAY}">
      <div class="pick" id="noIdea"><span class="ic">◌</span><span><b>${T.dunno}</b><small>${T.dunnos}</small></span></div>
      <button class="cta" id="b3">${T.next}</button>`;
    $('noIdea').onclick = ()=>{ S.cycles = []; save(); step(4); };
    $('b3').onclick = ()=>{
      const d = $('ld').value;
      if(d && d<=TODAY){ S.cycles = [{start:d,end:null,atypical:false}]; save(); }
      step(4);
    };
  }
  if(n===4){
    v.innerHTML = pr(56)+`<h1>${T.q4}</h1><p class="sub">${T.q4s}</p>
      <div class="stepper"><button class="sbtn" data-c="-1">−</button>
        <div style="text-align:center"><b id="cv">${S.user.cycleLen}</b><small>${T.cyclel}</small></div>
        <button class="sbtn" data-c="1">+</button></div>
      <div class="stepper"><button class="sbtn" data-p="-1">−</button>
        <div style="text-align:center"><b id="pv">${S.user.periodLen}</b><small>${T.periodl}</small></div>
        <button class="sbtn" data-p="1">+</button></div>
      <button class="cta" id="b4">${T.next}</button>`;
    v.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{
      S.user.cycleLen = Math.min(60, Math.max(18, S.user.cycleLen + +b.dataset.c));
      $('cv').textContent = S.user.cycleLen; save(); });
    v.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{
      S.user.periodLen = Math.min(12, Math.max(1, S.user.periodLen + +b.dataset.p));
      $('pv').textContent = S.user.periodLen; save(); });
    $('b4').onclick = ()=>step(5);
  }
  if(n===5){
    const ok = ()=> S.user.regularity && S.user.bc;
    v.innerHTML = pr(70)+`<h1>${T.q5}</h1><p class="sub">${T.q5s}</p>
      ${[['stable','◉',T.r1,T.r1s],['mid','◎',T.r2,T.r2s],['irr','◌',T.r3,T.r3s],['unknown','?',T.r4,T.r4s]]
      .map(([k,i,t,s])=>`<div class="pick ${S.user.regularity===k?'on':''}" data-reg="${k}">
        <span class="ic">${i}</span><span><b>${t}</b><small>${s}</small></span></div>`).join('')}
      <div class="eyebrow">${T.bc}</div>
      <div class="pick ${S.user.bc==='no'?'on':''}" data-bc="no"><span class="ic">—</span><span><b>${T.bcn}</b></span></div>
      <div class="pick ${S.user.bc==='yes'?'on':''}" data-bc="yes"><span class="ic">◈</span><span><b>${T.bcy}</b><small>${T.bcys}</small></span></div>
      <button class="cta" id="b5" ${ok()?'':'disabled'}>${T.next}</button>`;
    v.querySelectorAll('[data-reg]').forEach(el=>el.onclick=()=>{
      v.querySelectorAll('[data-reg]').forEach(x=>x.classList.remove('on'));
      el.classList.add('on'); S.user.regularity = el.dataset.reg; save(); $('b5').disabled=!ok(); });
    v.querySelectorAll('[data-bc]').forEach(el=>el.onclick=()=>{
      v.querySelectorAll('[data-bc]').forEach(x=>x.classList.remove('on'));
      el.classList.add('on'); S.user.bc = el.dataset.bc; save(); $('b5').disabled=!ok(); });
    $('b5').onclick = ()=>step(6);
  }
  if(n===6){
    const M = [['mood','◔',T.m_mood],['pain','◈',T.m_pain],['disch','◍',T.m_disch],['sleep','☾',T.m_sleep],
               ['energy','◇',T.m_energy],['bbt','△',T.m_bbt],['med','◐',T.m_med]];
    v.innerHTML = pr(84)+`<h1>${T.q6}</h1><p class="sub">${T.q6s}</p>
      ${M.map(([k,i,t])=>`<div class="pick ${S.user.metrics.includes(k)?'on':''}" data-m="${k}">
        <span class="ic">${i}</span><span><b>${t}</b></span></div>`).join('')}
      <button class="cta" id="b6">${T.next}</button>`;
    v.querySelectorAll('[data-m]').forEach(el=>el.onclick=()=>{
      const k = el.dataset.m;
      if(S.user.metrics.includes(k)) S.user.metrics = S.user.metrics.filter(x=>x!==k);
      else S.user.metrics.push(k);
      el.classList.toggle('on'); save(); });
    $('b6').onclick = ()=>step(7);
  }
  if(n===7){
    v.innerHTML = pr(100)+`<h1>${T.q7}</h1><p class="sub">${T.q7s}</p>
      <div class="row" data-s="backup"><div><div class="t">${T.bk}</div><div class="d">${T.bks}</div></div>
        <div class="toggle ${S.settings.backup?'on':''}"></div></div>
      <div class="row" data-s="lock"><div><div class="t">${T.lock}</div><div class="d">${T.locks}</div></div>
        <div class="toggle ${S.settings.lock?'on':''}"></div></div>
      <div class="row" data-s="reminders"><div><div class="t">${T.rem}</div><div class="d">${T.rems}</div></div>
        <div class="toggle ${S.settings.reminders?'on':''}"></div></div>
      <div class="card" style="background:var(--sage-soft);border-color:transparent;margin-top:16px">
        <h3>${T.nope}</h3><p>${T.nopes}</p></div>
      <button class="cta" id="b7">${T.done}</button>
      <p class="note" style="text-align:center">${T.delnote}</p>`;
    v.querySelectorAll('[data-s]').forEach(r=>r.onclick=()=>{
      const k = r.dataset.s; S.settings[k] = !S.settings[k];
      r.querySelector('.toggle').classList.toggle('on', S.settings[k]); save(); });
    $('b7').onclick = finish;
  }
  show('v'+n);
  $('backBtn').classList.toggle('on', n>0);
  $('barTitle').textContent = '';
}
function step(n){ renderOnb(n); }
async function finish(){
  S.user.onboarded = true;
  if(S.settings.backup) S.settings.lastBackup = new Date().toISOString();
  if(!S.settings.installDate) S.settings.installDate = TODAY;
  S.settings.notifAsked = true;
  save();
  notifSync(true);
  if(NATIVE) await rcRefresh();   // подписка могла быть оформлена раньше (например, после «Удалить всё»)
  if(hasAccess()) enterApp(); else renderPaywall(false);   // на Android на пейволе есть «Продолжить бесплатно»
}
function enterApp(){
  inApp = true; adSync(); document.body.classList.add('app');
  renderNav(); goTab(0);
  if(!S.settings.installDate){ S.settings.installDate = TODAY; save(); }
  const ask = !S.settings.notifAsked; S.settings.notifAsked = true; save();
  notifSync(ask);
  if(pendingTap){ const k = pendingTap; pendingTap = null; onNotifTap(k); }
}

/* ================= НАВИГАЦИЯ ================= */
function renderNav(){
  $('nav').innerHTML = [['◐',T.today],['▦',T.cal],['◭',T.ins],['◌',T.near],['◇',T.more]]
    .map(([i,t],n)=>`<div class="nb ${n===tab?'on':''}" data-t="${n}"><i>${i}</i><span>${t}</span>${n===3?`<span class="badge">${T.soon.toUpperCase()}</span>`:''}</div>`).join('');
  $('nav').querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>goTab(+b.dataset.t));
}
const TABV = ['home','calv','insv','chatv','setv'];
const TABT = ()=>['', T.cal, T.ins, T.near, T.set];
function goTab(n){
  tab = n;
  [renderHome,renderCal,renderIns,renderChat,renderSet][n]();
  show(TABV[n]); renderNav();
  $('backBtn').classList.toggle('on', n!==0);
  $('barTitle').textContent = TABT()[n];
}
$('backBtn').onclick = ()=>{
  if($('sheet').classList.contains('on')) return closeSheet();
  if(inApp) return goTab($('vpw').classList.contains('active') ? 4 : 0);
  if(onb>0) step(onb-1); else renderLang();
};

/* ================= АНАЛИТИКА ================= */
function renderIns(){
  const LI = lengthItems();
  const L = LI.map(x=>x.n);
  const PL = periodLengths();
  const avg = L.length ? (L.reduce((a,b)=>a+b,0)/L.length) : S.user.cycleLen;
  const sd = stdev(L);
  const pAvg = PL.length ? (PL.reduce((a,b)=>a+b,0)/PL.length) : S.user.periodLen;

  const showI = LI.slice(-6);
  const showL = showI.map(x=>x.n);
  const mx = Math.max(...showL, 1), mn = Math.min(...showL, mx);
  const bars = showL.length ? showL.map(n=>
    `<div class="bar ${sd>0 && Math.abs(n-avg)>sd*1.5?'hi':''}" style="height:${mx===mn?60:((n-mn+2)/(mx-mn+4)*100)}%"></div>`).join('') : '';
  const labels = showI.map(x=>`<div>${T.monS[parse(x.start).getMonth()]}</div>`).join('');

  const pat = patterns();
  const patHtml = pat.length ? pat.map(x=>`<div class="card"><h3>${x.t}</h3><p>${x.d}</p></div>`).join('')
    : `<div class="card"><p>${T.nopat}</p></div>`;
  const firstStart = S.cycles.length ? S.cycles.slice().sort((a,b)=>a.start<b.start?-1:1)[0].start : null;

  $('insv').innerHTML = `<h1>${T.ins}</h1>
    <p class="sub">${T.cyclesN(S.cycles.length)}${firstStart?` · ${T.since(fmtDate(firstStart))}`:''}</p>
    ${showL.length ? `<div class="card"><div class="lbl">${T.cyclen}</div>
      <div class="bars">${bars}</div><div class="barlbl">${labels}</div></div>` : ''}
    <div class="card">
      <div class="stat"><span>${T.avgc}</span><b>${avg.toFixed(1)} ${T.days}</b></div>
      <div class="stat"><span>${T.spread}</span><b>± ${sd.toFixed(1)} ${T.days}</b></div>
      <div class="stat"><span>${T.avgp}</span><b>${pAvg.toFixed(1)} ${T.days}</b></div>
      <div class="stat"><span>${T.lut}</span><b>${S.user.lutealLen} ${T.daysx}</b></div>
    </div>
    <div class="eyebrow">${T.patterns}</div>${patHtml}
    <button class="cta" id="expPdf">${T.pdf}</button>
    <button class="cta ghost" id="expCsv">${T.csv}</button>
    <p class="note">${T.expnote}</p>`;
  $('expPdf').onclick = exportReport;
  $('expCsv').onclick = exportCSV;
}
function patterns(){
  const out = [];
  const p = predict(); if(!p) return out;
  const tally = {};
  Object.entries(S.logs).forEach(([d,l])=>{
    (l.pain||[]).forEach(t=>{
      const cd = diffDays(p.lastStart,d)+1;
      if(cd<1||cd>p.len) return;
      const k = normKey(t) || t;
      tally[k] = tally[k]||[]; tally[k].push(cd);
    });
  });
  Object.entries(tally).forEach(([t,days])=>{
    if(days.length<3) return;
    const avg = Math.round(days.reduce((a,b)=>a+b,0)/days.length);
    out.push({t: esc(labelOf(t)), d: T.patD(days.length, avg)});
  });
  return out.slice(0,4);
}

/* ================= ЭКСПОРТ ================= */
function rows(){
  const p = predict();
  return Object.keys(S.logs).sort().map(d=>{
    const l = S.logs[d];
    const cd = p ? diffDays(p.lastStart,d)+1 : '';
    return [d, cd>0?cd:'', l.flow!=null?l.flow:'', (l.mood||[]).map(labelOf).join(' '),
            (l.pain||[]).map(labelOf).join(' '), l.sleep!=null?l.sleep:'', l.energy!=null?l.energy:'', l.bbt!=null?l.bbt:''];
  });
}
function download(name, text, mime){
  const b = new Blob([text], {type:mime});
  const u = URL.createObjectURL(b);
  const a = document.createElement('a');
  a.href = u; a.download = name; document.body.appendChild(a); a.click();
  setTimeout(()=>{ URL.revokeObjectURL(u); a.remove(); }, 400);
}
function exportCSV(){
  const r = rows();
  if(!r.length) return toast(T.nothingExp);
  const csv = '\uFEFF' + [T.hdr, ...r].map(x=>x.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
  download(`nia-${TODAY}.csv`, csv, 'text/csv;charset=utf-8');
  toast(T.csvSaved);
}
function reportHtml(){
  const L = lengths(), PL = periodLengths();
  const avg = L.length ? (L.reduce((a,b)=>a+b,0)/L.length).toFixed(1) : S.user.cycleLen;
  const sd = stdev(L).toFixed(1);
  const pAvg = PL.length ? (PL.reduce((a,b)=>a+b,0)/PL.length).toFixed(1) : S.user.periodLen;
  const r = rows();
  const cs = S.cycles.slice().sort((a,b)=>a.start<b.start?-1:1);
  const html = `<!DOCTYPE html><html lang="${LANG}"><head><meta charset="utf-8">
<title>${T.repT}</title><style>
@page{size:A4;margin:18mm}
body{font-family:Georgia,'Times New Roman',serif;color:#222;line-height:1.5;font-size:11pt}
h1{font-size:19pt;margin:0 0 2px}h2{font-size:12pt;margin:22px 0 8px;border-bottom:1px solid #ccc;padding-bottom:4px}
.meta{color:#666;font-size:9.5pt;margin-bottom:6px}
table{width:100%;border-collapse:collapse;font-size:9pt;margin-top:6px}
th,td{border:1px solid #ddd;padding:5px 6px;text-align:left}
th{background:#f3f3f3;font-weight:bold}
.kv{display:flex;justify-content:space-between;border-bottom:1px solid #eee;padding:5px 0}
.foot{margin-top:24px;font-size:8.5pt;color:#777;border-top:1px solid #ddd;padding-top:8px}
@media print{.noprint{display:none}}
.noprint{background:#2B2140;color:#fff;border:0;padding:12px 22px;border-radius:8px;font-size:12pt;cursor:pointer;margin-bottom:18px;font-family:sans-serif}
</style></head><body>
<button class="noprint" onclick="window.print()">${T.savePdf}</button>
<h1>${T.repT}</h1>
<div class="meta">${T.repGen}: ${locDateTime(new Date())} · Nia</div>
<h2>${T.summary}</h2>
<div class="kv"><span>${T.avgc}</span><b>${avg} ${T.days}</b></div>
<div class="kv"><span>${T.spread}</span><b>± ${sd} ${T.days}</b></div>
<div class="kv"><span>${T.avgp}</span><b>${pAvg} ${T.days}</b></div>
<div class="kv"><span>${T.cyclesRec}</span><b>${cs.length}</b></div>
<div class="kv"><span>${T.byear}</span><b>${S.user.birthYear}</b></div>
<div class="kv"><span>${T.bc}</span><b>${S.user.bc==='yes'?T.yes:T.no}</b></div>
<h2>${T.hist}</h2>
<table><tr><th>${T.colStart}</th><th>${T.colLen}</th><th>${T.colBleed}</th></tr>
${cs.map((c,i)=>{const nx=cs[i+1];const len=nx?diffDays(c.start,nx.start):'—';
  const pd=c.end?diffDays(c.start,c.end)+1:'—';
  return `<tr><td>${c.start}</td><td>${len}</td><td>${pd}</td></tr>`;}).join('')}
</table>
<h2>${T.dailyLog}</h2>
${r.length?`<table><tr>${T.hdr.map(h=>`<th>${h}</th>`).join('')}</tr>
${r.map(x=>`<tr>${x.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</table>`
:`<p>${T.noEntries}</p>`}
<div class="foot">${T.repFoot}</div>
</body></html>`;
  return html;
}
function exportReport(){
  const html = reportHtml();
  const w = window.open('', '_blank');
  if(w){ w.document.write(html); w.document.close(); }
  else download(`nia-report-${TODAY}.html`, html, 'text/html');
}

/* ================= «Я РЯДОМ» ================= */
function renderChat(){
  $('chatv').innerHTML = `<div style="text-align:center;padding:24px 10px 6px">
    <div class="heroico">◌</div><h1>${T.nearT}</h1>
    <p class="sub" style="max-width:280px;margin:8px auto 0">${T.nearS}</p>
    <div style="display:inline-block;background:var(--sage-soft);color:var(--sage);font-size:11px;font-weight:700;
      letter-spacing:.14em;text-transform:uppercase;padding:8px 16px;border-radius:99px;margin:20px 0 22px">${T.soon}</div></div>
    <div class="card"><h3>${T.n1}</h3><p>${T.n1s}</p></div>
    <div class="card"><h3>${T.n2}</h3><p>${T.n2s}</p></div>
    <div class="card"><h3>${T.n3}</h3><p>${T.n3s}</p></div>
    <button class="cta" id="nf">${T.notifyme}</button>
    <p class="note">${T.neardis}</p>`;
  $('nf').onclick = ()=>toast(T.notifyOk);
}

/* ================= НАСТРОЙКИ ================= */
function subRow(){
  const planName = {month:T.pwM, quarter:T.pwQ, year:T.pwYear}[S.sub.plan] || T.pwYear;
  if(S.sub.status==='lifetime')
    return `<div class="row"><div><div class="t">${T.subLife}</div><div class="d">${T.pwLifeN}</div></div></div>`;
  if(hasAccess()){
    const t = S.sub.status==='trial' ? `${T.trialLeft} · ${trialDaysLeft()} ${T.trialDays}` : T.subOn;
    return `<div class="row"><div><div class="t">${t}</div><div class="d">${planName}</div></div></div>
      <a class="row" href="${manageUrl()}" target="_blank" rel="noopener" style="text-decoration:none;color:inherit">
        <div><div class="t">${T.subManage}</div><div class="d">${T.subManageS}</div></div><span>›</span></a>`;
  }
  return `<div class="row" id="sub"><div><div class="t">${T.subNone}</div><div class="d">${T.subNoneS}</div></div><span>›</span></div>`
    + (ADS && adConsentPriv ? `<div class="row" id="adpriv"><div><div class="t">${T.adPriv}</div></div><span>›</span></div>` : '');
}
function renderSet(){
  const lb = S.settings.lastBackup ? locDate(new Date(S.settings.lastBackup)) : '—';
  const tog = (k,t,d)=>`<div class="row" data-s="${k}"><div><div class="t">${t}</div><div class="d">${d}</div></div>
    <div class="toggle ${S.settings[k]?'on':''}"></div></div>`;
  $('setv').innerHTML = `<h1>${T.set}</h1><p class="sub">${T.setS}</p>
    <div class="eyebrow">${T.secData}</div>
    ${tog('backup', `${CLOUD} · ${S.settings.backup?T.bkon:'—'}`, `${T.bklast}: ${lb}`)}
    <div class="row" id="rst"><div><div class="t">${T.bkrestore}</div><div class="d">${T.bkrestores}</div></div><span>›</span></div>
    <div class="row" id="bkf"><div><div class="t">${T.bkfile}</div><div class="d">${T.bkfiles}</div></div><span>›</span></div>
    <div class="eyebrow">${DT.secLook}</div>
    <div class="row" id="look"><div><div class="t">${DT[DS]}</div><div class="d">${DT[DS+'s']}</div></div><span>›</span></div>
    <div class="eyebrow">${T.secLang}</div>
    <div class="row" id="lng"><div><div class="t">${T.secLang}</div><div class="d">${T.langCur}</div></div><span>›</span></div>
    <div class="eyebrow">${T.secPriv}</div>
    ${tog('lock', T.lock, T.locks)}
    ${tog('discreet', T.discreet, T.discreets)}
    <div class="eyebrow">${T.secInv}</div>
    <div class="card" style="background:var(--bloom-soft);border-color:transparent">
      <h3>${T.invT}</h3><p>${T.invS}</p>
      <button class="cta" id="inv">${navigator.share?T.invshare:T.invcopy}</button></div>
    <div class="eyebrow">${T.secPart}</div>
    <div class="row" id="prt"><div><div class="t">${T.partadd}</div><div class="d">${T.partadds}</div></div><span>›</span></div>
    <div class="eyebrow">${T.secRem}</div>
    ${tog('remPeriod', T.remP, T.remPs)}
    ${tog('remMed', T.remM, T.remMs)}
    ${tog('remDay', T.remDay, T.remDayS)}
    ${S.user.bc!=='yes' ? tog('remOvu', T.remOvu, T.remOvuS) : ''}
    ${tog('plainTone', T.remD, T.remDs)}
    <div class="eyebrow">${T.secSub}</div>
    ${subRow()}
    <div class="eyebrow">${T.secDel}</div>
    <div class="row" id="del"><div><div class="t" style="color:var(--bloom)">${T.delall}</div><div class="d">${T.delalls}</div></div></div>
    <p class="note">${T.privnote}</p>`;
  $('setv').querySelectorAll('[data-s]').forEach(r=>r.onclick=()=>{
    const k = r.dataset.s; S.settings[k] = !S.settings[k];
    if(k==='backup' && S.settings[k]) S.settings.lastBackup = new Date().toISOString();
    r.querySelector('.toggle').classList.toggle('on', S.settings[k]); save();
    if(/^rem|^discreet|^plainTone/.test(k)) notifSync(S.settings[k]);
  });
  $('lng').onclick = openLangSheet;
  $('look').onclick = openLookSheet;
  $('rst').onclick = ()=>toast(T.bkrestores);
  $('bkf').onclick = ()=>{ download(`nia-backup-${TODAY}.json`, JSON.stringify(S), 'application/json');
    S.settings.lastBackup = new Date().toISOString(); save();
    toast(T.bkSaved); };
  $('inv').onclick = async ()=>{
    const txt = T.invTxt(STORE_URL);
    try{ if(navigator.share){ await navigator.share({title:'Nia', text:txt}); }
         else { await navigator.clipboard.writeText(txt); toast(T.copied); } }
    catch(e){}
  };
  $('prt').onclick = ()=>toast(T.soon);
  if($('sub')) $('sub').onclick = ()=>renderPaywall(false);
  if($('adpriv')) $('adpriv').onclick = ()=>{ try{ AD().showPrivacyOptionsForm(); }catch(e){} };
  $('del').onclick = async ()=>{ if(confirm(T.confirmDel)){
    try{ localStorage.removeItem(KEY); }catch(e){}
    S = blank(); applyDesign(); adSync();
    document.body.classList.remove('app'); inApp = false; toast(T.deleted); step(0);
    notifSync(false);
    if(NATIVE) await rcRefresh();   // вернуть статус подписки из магазина
  } };
}

function openLangSheet(){
  $('sheet').innerHTML = `<div class="grab"></div>
    <h1 style="font-size:21px;margin-bottom:14px">${T.langT}</h1>
    ${LANGS.map(([k,n,c])=>`<div class="pick ${LANG===k?'on':''}" data-l="${k}"><span class="ic" style="font-size:12px;font-weight:700">${c}</span><span><b>${n}</b></span></div>`).join('')}`;
  $('sheet').querySelectorAll('[data-l]').forEach(el=>el.onclick=()=>{
    setLang(el.dataset.l); closeSheet(); renderNav(); renderSet(); notifSync(false);
    $('barTitle').textContent = T.set;
  });
  $('sheet').classList.add('on'); $('scrim').classList.add('on');
}

function closeSheet(){ $('sheet').classList.remove('on'); $('scrim').classList.remove('on'); }
$('scrim').onclick = closeSheet;

function saveDay(){
  const sl = $('slp'), bb = $('bbt');
  if(sl) draft.sleep = sl.value===''? null : +sl.value;
  if(bb) draft.bbt  = bb.value===''? null : +bb.value;

  const prevFlow = S.logs[sheetDate] ? S.logs[sheetDate].flow : null;
  const empty = draft.flow==null && !(draft.mood||[]).length && !(draft.pain||[]).length
                && draft.energy==null && draft.sleep==null && draft.bbt==null;
  if(empty) delete S.logs[sheetDate]; else S.logs[sheetDate] = draft;

  // менструация: слабые и сильнее — отмечаем; «Нет» или снятая отметка — убираем;
  // мажущие не начинают цикл и не удаляют его
  if(draft.flow>=2) markPeriod(sheetDate);
  else if(draft.flow===0 || (draft.flow==null && prevFlow>=2)) unmarkPeriod(sheetDate);

  save(); closeSheet(); toast(T.saved); notifSync(false);
  if(tab===0) renderHome(); else if(tab===1) renderCal(); else if(tab===2) renderIns();
}
function markPeriod(d){
  const cs = S.cycles.slice().sort((a,b)=>a.start<b.start?-1:1);
  // день примыкает к уже существующему циклу?
  for(const c of cs){
    const endD = c.end || c.start;
    if(d >= c.start && diffDays(c.start,d) <= 10){
      if(d > endD) c.end = d;
      return;
    }
    if(diffDays(d, c.start) === 1){ c.start = d; if(!c.end) c.end = addDays(d,1); return; }
  }
  S.cycles.push({start:d, end:d, atypical:false});
  S.cycles.sort((a,b)=>a.start<b.start?-1:1);
}
function unmarkPeriod(d){
  S.cycles = S.cycles.filter(c=>{
    if(c.start===d && (!c.end || c.end===d)) return false;   // единственный день — удаляем цикл
    if(c.start===d) c.start = addDays(d,1);                  // первый день — сдвигаем начало
    else if(c.end===d) c.end = addDays(d,-1);                // последний день — укорачиваем
    return true;
  });
}

/* ================= ЗАПУСК ================= */
VIEWS.forEach(v=>$(v).addEventListener('scroll', e=>{
  $('appbar').classList.toggle('sc', e.target.scrollTop>6);
}));
let sx=null;
document.addEventListener('touchstart', e=>{ sx = e.touches[0].clientX; }, {passive:true});
document.addEventListener('touchend', e=>{
  if(sx!==null && sx<32 && e.changedTouches[0].clientX - sx > 70) $('backBtn').click();
  sx = null;
}, {passive:true});

// возврат в приложение: обновить «сегодня» и статус подписки
document.addEventListener('visibilitychange', async ()=>{
  if(document.hidden) return;
  const t = iso(new Date());
  const dayChanged = t!==TODAY;
  TODAY = t;
  if(NATIVE) await rcRefresh();
  if(inApp) notifSync(false);
  if(inApp && !$('sheet').classList.contains('on') && !$('vpw').classList.contains('active')){
    if(!ADS && !hasAccess()){ document.body.classList.remove('app'); inApp=false; renderPaywall(true); }
    else if(dayChanged) goTab(tab);
  }
  adSync();
});
// тема поменялась — перерисовать круг
try{ window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ()=>{ if(inApp && tab===0) renderHome(); }); }catch(e){}

async function boot(){
  if(NATIVE) await Promise.race([rcInit(), new Promise(r=>setTimeout(r,6000))]);
  try{
    if(!S.user.onboarded) renderLang();
    else if(ADS || hasAccess()) enterApp();
    else renderPaywall(true);
  }catch(err){
    // даже при ошибке пользователь не остаётся на пустом экране
    document.body.innerHTML = '<div style="padding:40px 24px;font-family:sans-serif">'+
      '<h2>'+T.errT+'</h2>'+
      '<p style="color:#888;font-size:13px">'+String(err && err.message || err)+'</p>'+
      '<button onclick="localStorage.removeItem(\'nia.v1\');location.reload()" '+
      'style="margin-top:16px;padding:14px 22px;border:0;border-radius:14px;background:#2B2140;color:#fff;font-size:15px">'+
      T.errBtn+'</button></div>';
  }
}
function dropSplash(){
  const sp = $('splash');
  if(!sp) return;
  sp.classList.add('out');
  setTimeout(()=>{ if(sp.parentNode) sp.remove(); }, 520);
}
// запуск: рисуем экран сразу, заставку убираем по таймеру и по страховке
boot();
setTimeout(dropSplash, 1900);
window.addEventListener('load', ()=>setTimeout(dropSplash, 2100));
const _sp=$('splash'); if(_sp) _sp.addEventListener('click', dropSplash);
const _tg=$('tagline'); if(_tg) _tg.textContent = T.tagline;
