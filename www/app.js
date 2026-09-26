/* Lumora — движок. Всё локально, ни одного сетевого запроса. */
'use strict';

/* ================= ЛОКАЛИЗАЦИЯ (берётся из системы) ================= */
const IOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
            (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
// язык: сохранённый выбор → иначе язык системы
let LANG = (()=>{ try{ const v=localStorage.getItem('nia.lang'); if(v==='ru'||v==='en') return v; }catch(e){}
  return (navigator.language||'en').toLowerCase().startsWith('ru') ? 'ru' : 'en'; })();
let CLOUD, BIO, T;
function buildDict(){
  CLOUD = IOS ? 'iCloud' : (LANG==='ru'?'Google Диск':'Google Drive');
  BIO   = IOS ? 'Face ID' : (LANG==='ru'?'отпечатку пальца':'fingerprint');
  T = DICT()[LANG];
}
function setLang(l){ LANG = l; try{ localStorage.setItem('nia.lang', l); }catch(e){} buildDict(); }
function DICT(){ return {
ru:{tagline:'цикл, который знаете только вы',
 hello:'Привет, я Ниа', hello2:'Давай настроим твой календарь',
 w1:'Ваш цикл — только ваш', w1s:`Записи хранятся на телефоне и в вашем личном ${CLOUD}. Ни рекламные сети, ни мы не имеем к ним доступа.`,
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
 nope:'Что мы не делаем', nopes:'Не передаём данные рекламным сетям, не просим почту и телефон, не строим ваш профиль. Реклама контекстная: она не знает, кто вы.',
 delnote:'Удалить все данные можно в любой момент, одной кнопкой.',
 hi:'Привет', dayof:'день цикла', logday:'Заполнить день', marktoday:'Отметить сегодня',
 ph_period:'Менструация', ph_fert:'Фертильное окно', ph_ovu:'Овуляция', ph_luteal:'Вторая фаза', ph_foll:'После менструации',
 nodata:'Отметьте первый день менструации', nodatas:'После этого построим прогноз.',
 cal:'Календарь', ins:'Аналитика', near:'Я рядом', more:'Ещё', today:'Сегодня',
 hist:'История циклов', noHist:'Пока нет завершённых циклов', allfree:'История открыта целиком и бесплатно.',
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
 invT:'Неделя без рекламы за каждую подругу', invS:'Она получает неделю тоже. Приглашение — обычная ссылка: мы не читаем адресную книгу.',
 invcopy:'Скопировать ссылку', invshare:'Поделиться',
 partadd:'Добавить партнёра', partadds:'Будет видеть только фазу цикла',
 remP:'Скоро менструация', remPs:'За 2 дня, в 20:00', remM:'Приём таблеток', remMs:'Ежедневно, 09:00',
 remD:'Сухой тон уведомлений', remDs:'Только факты, без эмодзи и обращений',
 noads:'Убрать рекламу', noadss:'Весь остальной функционал бесплатен всегда',
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
 accHi:'Прогноз построен по вашим данным.', accLow:'Цикл нерегулярный — показываем диапазон. Так честнее, чем ошибиться на неделю.',
 accNew:'Точность вырастет после двух-трёх циклов.',
 bcNote:'Вы принимаете гормональную контрацепцию — овуляцию не прогнозируем.',
 mon:['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'],
 monS:['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
 wd:['ПН','ВТ','СР','ЧТ','ПТ','СБ','ВС'],
 hdr:['Дата','День цикла','Менструация','Настроение','Боль','Сон','Энергия','Температура'],
 repT:'Отчёт для врача', repP:'Период', repGen:'Сформирован',
 pwT:'7 дней бесплатно', pwS:'Полный доступ. Отмена в любой момент — напомним за 2 дня до списания.',
 pw1:'Прогноз цикла и овуляции', pw1s:'Работает даже при нерегулярном цикле',
 pw2:'Вся история и аналитика', pw2s:'Без ограничений по времени',
 pw3:'Отчёт для врача', pw3s:'PDF и CSV, формируются на телефоне',
 pw4:'Данные только у вас', pw4s:'Ни рекламы, ни передачи третьим лицам',
 pwQ:'3 месяца', pwQP:'$3,99', pwQN:'$1,33 в месяц',
 pwYear:'Год', pwYearP:'$15,99', pwYearN:'$1,33 в месяц · выгоднее всего', pwBest:'ХИТ',
 pwLife:'Навсегда', pwLifeP:'$34,99', pwLifeN:'Разовый платёж, без подписки',
 pwCta:'Начать 7 дней бесплатно', pwRestore:'Восстановить покупку',
 pwNote:'Списание через 7 дней, если не отменить. Управление в настройках Apple ID.',
 trialLeft:'Пробный период', trialDays:'дн. осталось',
 expT:'Пробный период закончился', expS:'Ваши записи сохранены и никуда не делись. Оформите доступ, чтобы продолжить.',
 subOn:'Подписка активна', subLife:'Доступ навсегда',
 langT:'Выберите язык', langS:'Можно поменять позже в настройках.', langName:'Русский', langOther:'English',
 secLang:'Язык', langCur:'Русский'},

en:{tagline:'a cycle only you can see',
 hello:'Hi, I\u2019m Nia', hello2:'Let\u2019s set up your calendar',
 w1:'Your cycle is yours alone', w1s:`Entries stay on your phone and in your own ${CLOUD}. Neither ad networks nor we can read them.`,
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
 dunno:"I don't remember", dunnos:"We'll start from the first day you log a period",
 q4:'Cycle and period length', q4s:"Not sure? Leave the defaults. After two cycles we'll work it out ourselves.",
 cyclel:'days per cycle', periodl:'days of bleeding',
 q5:'How regular is your cycle?', q5s:'This changes the algorithm. If it varies, we show a range instead of a single date.',
 r1:'Regular', r1s:'Cycles differ by up to 3 days',
 r2:'Shifts a little', r2s:'Cycles differ by up to a week',
 r3:'Irregular', r3s:'Varies a lot, late periods are normal for me',
 r4:"I don't know", r4s:"We'll work it out from your entries",
 bc:'Hormonal birth control', bcn:'Not taking any', bcy:'I take it', bcys:"Then we won't predict ovulation",
 q6:'What do you want to track?', q6s:'Pick what appears on your home screen. The rest stays hidden. Changeable later.',
 m_mood:'Mood', m_pain:'Pain and cramps', m_disch:'Discharge', m_sleep:'Sleep',
 m_energy:'Energy', m_bbt:'Basal temperature', m_med:'Medication and vitamins',
 q7:'Where your data lives', q7s:'So nothing is lost when you change phones.',
 bk:`Backup to your ${CLOUD}`, bks:'Encrypted on your phone before it leaves. We cannot read it',
 lock:`Unlock with ${BIO}`, locks:'Locked if someone else picks up your phone',
 rem:'Reminders', rems:'Period and medication. You choose the tone',
 nope:'What we never do', nopes:'No data to ad networks, no email or phone number, no profile of you. Ads are contextual: they do not know who you are.',
 delnote:'You can delete everything at any time, with one button.',
 hi:'Hi', dayof:'day of cycle', logday:'Log today', marktoday:'Log today',
 ph_period:'Period', ph_fert:'Fertile window', ph_ovu:'Ovulation', ph_luteal:'Luteal phase', ph_foll:'Follicular phase',
 nodata:'Log your first period day', nodatas:"Then we'll build your prediction.",
 cal:'Calendar', ins:'Insights', near:'Nearby', more:'More', today:'Today',
 hist:'Cycle history', noHist:'No completed cycles yet', allfree:'Your full history, free, forever.',
 cyclen:'Cycle length', avgc:'Average cycle', spread:'Variation', avgp:'Average period', lut:'Luteal phase',
 days:'days', daysx:'days', patterns:'Patterns', nopat:'Patterns appear after two or three cycles.',
 pdf:"Doctor's report · PDF", csv:'Export data · CSV',
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
 invT:'A week ad-free for every friend', invS:'She gets a week too. The invite is just a link: we never read your contacts.',
 invcopy:'Copy link', invshare:'Share',
 partadd:'Add a partner', partadds:'They will only see your cycle phase',
 remP:'Period coming up', remPs:'2 days before, 8:00 PM', remM:'Medication', remMs:'Daily, 9:00 AM',
 remD:'Plain notification tone', remDs:'Facts only, no emoji, no nicknames',
 noads:'Remove ads', noadss:'Everything else stays free forever',
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
 accHi:'Built from your own entries.', accLow:'Your cycle varies — we show a range. More honest than being a week off.',
 accNew:'Accuracy improves after two or three cycles.',
 bcNote:"You're on hormonal birth control — we don't predict ovulation.",
 mon:['January','February','March','April','May','June','July','August','September','October','November','December'],
 monS:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
 wd:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
 hdr:['Date','Cycle day','Bleeding','Mood','Pain','Sleep','Energy','Temperature'],
 repT:'Report for your doctor', repP:'Period', repGen:'Generated',
 pwT:'7 days free', pwS:'Full access. Cancel anytime — we remind you 2 days before billing.',
 pw1:'Cycle and ovulation predictions', pw1s:'Works with irregular cycles too',
 pw2:'Your whole history and insights', pw2s:'No time limits',
 pw3:'Doctor\u2019s report', pw3s:'PDF and CSV, built on your phone',
 pw4:'Your data stays yours', pw4s:'No ads, nothing shared with anyone',
 pwQ:'3 months', pwQP:'$3.99', pwQN:'$1.33 per month',
 pwYear:'Yearly', pwYearP:'$15.99', pwYearN:'$1.33 per month · best value', pwBest:'BEST',
 pwLife:'Lifetime', pwLifeP:'$34.99', pwLifeN:'One payment, no subscription',
 pwCta:'Start 7 days free', pwRestore:'Restore purchase',
 pwNote:'Billed after 7 days unless cancelled. Manage in your Apple ID settings.',
 trialLeft:'Trial', trialDays:'days left',
 expT:'Your trial has ended', expS:'All your entries are safe. Subscribe to keep going.',
 subOn:'Subscription active', subLife:'Lifetime access',
 langT:'Choose your language', langS:'You can change this later in settings.', langName:'English', langOther:'Русский',
 secLang:'Language', langCur:'English'}
};}
buildDict();

/* ================= ХРАНИЛИЩЕ ================= */
const KEY = 'nia.v1';
const blank = () => ({
  user:{name:'',birthYear:1998,goal:null,cycleLen:28,periodLen:5,lutealLen:14,
        regularity:null,bc:null,metrics:['mood','pain','disch'],onboarded:false},
  cycles:[],        // {start:'YYYY-MM-DD', end:null, atypical:false}
  logs:{},          // 'YYYY-MM-DD': {flow,mood[],pain[],energy,sleep,bbt}
  sub:{status:'none',trialStart:null,plan:null},
  settings:{backup:true,lock:true,reminders:true,discreet:false,plainTone:true,
            remPeriod:true,remMed:true,lastBackup:null,invites:0}
});
let S = load();

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
const TODAY = iso(new Date());
function fmtDate(s){ const d = parse(s);
  return LANG==='ru' ? `${d.getDate()} ${T.mon[d.getMonth()]}` : `${T.mon[d.getMonth()]} ${d.getDate()}`; }

/* ================= ДВИЖОК ПРОГНОЗА ================= */
function lengths(){
  const cs = S.cycles.filter(c=>!c.atypical).slice().sort((a,b)=>a.start<b.start?-1:1);
  const out = [];
  for(let i=0;i<cs.length-1;i++){
    const n = diffDays(cs[i].start, cs[i+1].start);
    if(n>=15 && n<=70) out.push(n);
  }
  return out;
}
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
  let day = diffDays(lastStart, TODAY)+1;
  const nextP = addDays(lastStart, len);
  const lut = S.user.lutealLen;
  const ovu = addDays(nextP, -lut);
  const pLen = periodLengths().length ? Math.round(periodLengths().reduce((a,b)=>a+b,0)/periodLengths().length) : S.user.periodLen;
  return {len,sd,irregular,day,lastStart,nextP,ovu,pLen,
          fertStart:addDays(ovu,-5), fertEnd:addDays(ovu,1),
          count:cs.length, lengths:L};
}
function phaseOf(dateStr, p){
  if(!p) return null;
  if(dateStr>=p.lastStart && diffDays(p.lastStart,dateStr)<p.pLen) return 'period';
  if(dateStr>=p.nextP && diffDays(p.nextP,dateStr)<p.pLen) return 'pred';
  if(S.user.bc!=='yes'){
    if(dateStr===p.ovu) return 'ovu';
    if(dateStr>=p.fertStart && dateStr<=p.fertEnd) return 'fert';
  }
  return null;
}

/* ================= ДОСТУП ================= */
// ВАЖНО: это состояние интерфейса. Реальная проверка покупки — через магазин
// (StoreKit / Play Billing), обычно RevenueCat. Он же не даёт получить второй триал
// после переустановки: пробный период привязан к Apple ID / Google-аккаунту.
function trialDaysLeft(){
  if(!S.sub.trialStart) return 0;
  return Math.max(0, 7 - diffDays(S.sub.trialStart, TODAY));
}
function hasAccess(){
  if(S.sub.status==='paid' || S.sub.status==='lifetime') return true;
  if(S.sub.status==='trial') return trialDaysLeft() > 0;
  return false;
}
function startTrial(plan){
  // здесь вызывается покупка магазина; в прототипе — локально
  S.sub.status='trial'; S.sub.trialStart=TODAY; S.sub.plan=plan||'year'; save();
}
function buyLifetime(){ S.sub.status='lifetime'; S.sub.plan='life'; save(); }

/* ================= ВСПОМОГАТЕЛЬНОЕ ================= */
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let tt; function toast(m){ const t=$('toast'); t.textContent=m; t.classList.add('on');
  clearTimeout(tt); tt=setTimeout(()=>t.classList.remove('on'),2300); }

const VIEWS = ['vlang','vpw','v0','v1','v2','v3','v4','v5','v6','v7','home','calv','insv','chatv','setv'];
let onb = 0, tab = 0, inApp = false;
function show(id){
  VIEWS.forEach(v=>$(v).classList.toggle('active', v===id));
  $(id).scrollTop = 0; $('appbar').classList.remove('sc');
}

/* ================= ОНБОРДИНГ ================= */
function renderPaywall(expired){
  const v = $('vpw');
  const row = (t,s)=>`<div style="display:flex;gap:12px;margin-bottom:13px">
    <span style="color:var(--sage);font-size:15px;flex:0 0 auto">✓</span>
    <span><b style="font-size:14px;display:block">${t}</b>
    <small style="font-size:12px;color:var(--ink-soft)">${s}</small></span></div>`;
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
    <div class="pick" data-plan="quarter" style="justify-content:space-between">
      <span><b>${T.pwQ}</b><small>${T.pwQN}</small></span>
      <b style="font-family:'Fraunces',serif;font-size:19px">${T.pwQP}</b></div>
    <div class="pick" data-plan="life" style="justify-content:space-between">
      <span><b>${T.pwLife}</b><small>${T.pwLifeN}</small></span>
      <b style="font-family:'Fraunces',serif;font-size:19px">${T.pwLifeP}</b></div>
    <button class="cta" id="pwGo">${T.pwCta}</button>
    <button class="cta ghost" id="pwRes">${T.pwRestore}</button>
    <p class="note" style="text-align:center">${T.pwNote}</p>`;
  let plan='year';
  v.querySelectorAll('[data-plan]').forEach(el=>el.onclick=()=>{
    v.querySelectorAll('[data-plan]').forEach(x=>x.classList.remove('on'));
    el.classList.add('on'); plan=el.dataset.plan;
    $('pwGo').textContent = plan==='life' ? T.pwLifeP : T.pwCta;
  });
  $('pwGo').onclick = ()=>{
    if(plan==='life') buyLifetime(); else startTrial(plan);
    enterApp();
  };
  $('pwRes').onclick = ()=>toast(LANG==='ru'?'Покупки не найдены':'No purchases found');
  show('vpw');
  $('backBtn').classList.remove('on');
  $('barTitle').textContent = '';
}

function renderLang(){
  const v = $('vlang');
  v.innerHTML = `<div class="hero" style="padding-top:44px"><div class="heroico">◐</div>
    <h1>${T.langT}</h1><p class="sub" style="margin:10px auto 26px">${T.langS}</p></div>
    <div class="pick ${LANG==='ru'?'on':''}" data-l="ru"><span class="ic">RU</span><span><b>Русский</b></span></div>
    <div class="pick ${LANG==='en'?'on':''}" data-l="en"><span class="ic">EN</span><span><b>English</b></span></div>
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
      if(d){ S.cycles = [{start:d,end:null,atypical:false}]; save(); }
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
function finish(){
  S.user.onboarded = true;
  if(S.settings.backup) S.settings.lastBackup = new Date().toISOString();
  save();
  if(hasAccess()) enterApp(); else renderPaywall(false);
}
function enterApp(){
  inApp = true; document.body.classList.add('app');
  renderNav(); goTab(0);
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
  if(inApp) return goTab(0);
  if(onb>0) step(onb-1); else renderLang();
};

/* ================= ГЛАВНЫЙ ЭКРАН ================= */
function renderHome(){
  const p = predict();
  const greet = S.user.name ? `${T.hi}, ${esc(S.user.name)}` : T.hi;
  const d = new Date();
  const dstr = LANG==='ru'
    ? `${d.getDate()} ${T.mon[d.getMonth()]}`
    : d.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'});

  if(!p){
    $('home').innerHTML = `<h1>${greet}</h1><p class="sub">${dstr}</p>
      <div class="card" style="text-align:center;padding:34px 20px">
        <div class="heroico" style="margin-bottom:18px">◐</div>
        <h3 style="font-size:17px">${T.nodata}</h3><p>${T.nodatas}</p></div>
      <button class="cta" id="hLog">${T.logday}</button>`;
    $('hLog').onclick = ()=>openSheet(TODAY);
    return;
  }

  let phase = phaseOf(TODAY,p);
  const phLbl = {period:T.ph_period,fert:T.ph_fert,ovu:T.ph_ovu,pred:T.ph_period}[phase]
    || (S.user.bc==='yes' ? T.ph_luteal : (TODAY>p.ovu ? T.ph_luteal : T.ph_foll));

  let title, body;
  if(S.user.bc==='yes'){ title = `${T.predP} ${fmtDate(p.nextP)}`; body = T.bcNote; }
  else if(p.irregular){ title = `${T.predRange} ${fmtDate(addDays(p.ovu,-2))} — ${fmtDate(addDays(p.ovu,3))}`; body = T.accLow; }
  else { title = `${T.predO} ${fmtDate(p.ovu)}`; body = p.count>=3 ? T.accHi : T.accNew; }

  const trialBar = S.sub.status==='trial'
    ? `<div class="card" style="background:var(--mist);border-color:transparent;padding:12px 16px;
        display:flex;justify-content:space-between;align-items:center">
        <span style="font-size:12.5px">${T.trialLeft}</span>
        <b style="font-size:12.5px;color:var(--bloom)">${trialDaysLeft()} ${T.trialDays}</b></div>` : '';
  const QM = {mood:['◔',T.m_mood],pain:['◈',T.m_pain],disch:['◍',T.m_disch],
              sleep:['☾',T.m_sleep],energy:['◇',T.m_energy],bbt:['△',T.m_bbt],med:['◐',T.m_med]};
  const quick = S.user.metrics.slice(0,5).map(k=>
    `<div class="q" data-q="${k}"><i>${QM[k][0]}</i><span>${QM[k][1]}</span></div>`).join('');

  $('home').innerHTML = `<h1>${greet}</h1><p class="sub">${dstr}</p>
    <div class="dial-wrap"><svg class="dial" id="dial" viewBox="0 0 200 200"></svg>
      <div class="dc"><div class="dn">${Math.max(1,p.day)}</div><div class="dl">${T.dayof}</div>
      <div class="pp">${phLbl}</div></div></div>
    ${trialBar}
    <div class="card" style="margin-top:12px"><h3>${title}</h3><p>${body}</p></div>
    <div class="eyebrow">${T.marktoday}</div>
    <div class="quickrow">${quick}</div>
    <button class="cta" id="hLog">${T.logday}</button>`;
  drawDial(p);
  $('hLog').onclick = ()=>openSheet(TODAY);
  $('home').querySelectorAll('[data-q]').forEach(q=>q.onclick=()=>openSheet(TODAY));
}
function drawDial(p){
  const C = p.len, cx=100, cy=100, r=78;
  let h='';
  for(let i=1;i<=C;i++){
    const ds = addDays(p.lastStart, i-1);
    const a = (i-1)/C*2*Math.PI;
    const x1 = cx+Math.cos(a)*(r-9), y1 = cy+Math.sin(a)*(r-9);
    const x2 = cx+Math.cos(a)*(r+9), y2 = cy+Math.sin(a)*(r+9);
    let c='#E5DCD6', w=3;
    const ph = phaseOf(ds,p);
    if(ph==='period') { c='#C4577A'; w=4; }
    else if(ph==='fert'){ c='#B9D2BF'; w=4; }
    if(ph==='ovu'){ c='#6E9478'; w=6; }
    if(ds===TODAY){ c='#2B2140'; w=7; }
    h += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}" stroke-linecap="round" opacity="${i<=p.day?1:.4}"/>`;
  }
  $('dial').innerHTML = h;
}

/* ================= КАЛЕНДАРЬ ================= */
let calM = new Date().getMonth(), calY = new Date().getFullYear();
function renderCal(){
  const p = predict();
  const first = new Date(calY, calM, 1);
  const lead = (first.getDay()+6)%7;
  const dim = new Date(calY, calM+1, 0).getDate();
  let cells = '';
  for(let i=0;i<lead;i++) cells += `<div class="cd off"></div>`;
  for(let d=1; d<=dim; d++){
    const ds = `${calY}-${String(calM+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const ph = phaseOf(ds,p);
    let cls='cd';
    if(ph) cls += ' '+ph;
    if(ds===TODAY) cls += ' today';
    if(S.logs[ds]) cls += ' dot';
    cells += `<div class="${cls}" data-d="${ds}">${d}</div>`;
  }
  const cs = S.cycles.slice().sort((a,b)=>a.start<b.start?1:-1);
  const hist = cs.length ? cs.map((c,i)=>{
    const nx = cs[i-1];
    const len = nx ? diffDays(c.start,nx.start) : null;
    const pd = c.end ? diffDays(c.start,c.end)+1 : null;
    const d = parse(c.start);
    return `<div class="card"><h3>${T.monS[d.getMonth()]} ${d.getFullYear()} · ${len? len+' '+T.daysx : '—'}</h3>
      <p>${pd? (LANG==='ru'?`Менструация ${pd} дн.`:`Period ${pd} days`) : fmtDate(c.start)}${c.atypical? (LANG==='ru'?' · нетипичный':' · atypical'):''}</p></div>`;
  }).join('') : `<div class="card"><p>${T.noHist}</p></div>`;

  $('calv').innerHTML = `
    <div class="mnav"><button data-m="-1">‹</button>
      <h1 style="margin:0;font-size:22px">${T.mon[calM]} ${calY}</h1>
      <button data-m="1">›</button></div>
    <div class="calhead">${T.wd.map(w=>`<div>${w}</div>`).join('')}</div>
    <div class="cal">${cells}</div>
    <div class="legend">
      <span><i class="sw" style="background:var(--bloom)"></i>${T.ph_period}</span>
      <span><i class="sw" style="background:var(--bloom-soft)"></i>${LANG==='ru'?'Прогноз':'Predicted'}</span>
      <span><i class="sw" style="background:var(--sage-soft)"></i>${T.ph_fert}</span>
      <span><i class="sw" style="box-shadow:inset 0 0 0 2px var(--sage)"></i>${T.ph_ovu}</span></div>
    <div class="eyebrow">${T.hist}</div>${hist}
    <p class="note">${T.allfree}</p>`;
  $('calv').querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{
    calM += +b.dataset.m;
    if(calM<0){calM=11;calY--;} if(calM>11){calM=0;calY++;}
    renderCal();
  });
  $('calv').querySelectorAll('[data-d]').forEach(c=>c.onclick=()=>openSheet(c.dataset.d));
}

/* ================= АНАЛИТИКА ================= */
function renderIns(){
  const p = predict();
  const L = lengths();
  const PL = periodLengths();
  const avg = L.length ? (L.reduce((a,b)=>a+b,0)/L.length) : S.user.cycleLen;
  const sd = stdev(L);
  const pAvg = PL.length ? (PL.reduce((a,b)=>a+b,0)/PL.length) : S.user.periodLen;

  const showL = L.slice(-6);
  const mx = Math.max(...showL, 1), mn = Math.min(...showL, mx);
  const bars = showL.length ? showL.map(n=>
    `<div class="bar ${sd>0 && Math.abs(n-avg)>sd*1.5?'hi':''}" style="height:${mx===mn?60:((n-mn+2)/(mx-mn+4)*100)}%"></div>`).join('') : '';
  const labels = S.cycles.slice(-7,-1).map(c=>`<div>${T.monS[parse(c.start).getMonth()]}</div>`).join('');

  const pat = patterns();
  const patHtml = pat.length ? pat.map(x=>`<div class="card"><h3>${x.t}</h3><p>${x.d}</p></div>`).join('')
    : `<div class="card"><p>${T.nopat}</p></div>`;

  $('insv').innerHTML = `<h1>${T.ins}</h1>
    <p class="sub">${S.cycles.length} ${LANG==='ru'?'циклов':'cycles'}${S.cycles.length?` · ${LANG==='ru'?'с':'since'} ${fmtDate(S.cycles[0].start)}`:''}</p>
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
      tally[t] = tally[t]||[]; tally[t].push(cd);
    });
  });
  Object.entries(tally).forEach(([t,days])=>{
    if(days.length<3) return;
    const avg = Math.round(days.reduce((a,b)=>a+b,0)/days.length);
    out.push({t, d: LANG==='ru'
      ? `Отмечено ${days.length} раз, чаще всего около ${avg} дня цикла.`
      : `Logged ${days.length} times, most often around day ${avg} of your cycle.`});
  });
  return out.slice(0,4);
}

/* ================= ЭКСПОРТ ================= */
function rows(){
  const p = predict();
  return Object.keys(S.logs).sort().map(d=>{
    const l = S.logs[d];
    const cd = p ? diffDays(p.lastStart,d)+1 : '';
    return [d, cd>0?cd:'', l.flow!=null?l.flow:'', (l.mood||[]).join(' '),
            (l.pain||[]).join(' '), l.sleep!=null?l.sleep:'', l.energy!=null?l.energy:'', l.bbt!=null?l.bbt:''];
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
  if(!r.length) return toast(LANG==='ru'?'Пока нечего выгружать':'Nothing to export yet');
  const csv = '\uFEFF' + [T.hdr, ...r].map(x=>x.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
  download(`nia-${TODAY}.csv`, csv, 'text/csv;charset=utf-8');
  toast(LANG==='ru'?'CSV сохранён':'CSV saved');
}
function exportReport(){
  const p = predict();
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
<button class="noprint" onclick="window.print()">${LANG==='ru'?'Сохранить как PDF':'Save as PDF'}</button>
<h1>${T.repT}</h1>
<div class="meta">${T.repGen}: ${new Date().toLocaleString()} · Nia</div>
<h2>${LANG==='ru'?'Сводка':'Summary'}</h2>
<div class="kv"><span>${T.avgc}</span><b>${avg} ${T.days}</b></div>
<div class="kv"><span>${T.spread}</span><b>± ${sd} ${T.days}</b></div>
<div class="kv"><span>${T.avgp}</span><b>${pAvg} ${T.days}</b></div>
<div class="kv"><span>${LANG==='ru'?'Циклов в истории':'Cycles recorded'}</span><b>${cs.length}</b></div>
<div class="kv"><span>${LANG==='ru'?'Год рождения':'Year of birth'}</span><b>${S.user.birthYear}</b></div>
<div class="kv"><span>${T.bc}</span><b>${S.user.bc==='yes'?(LANG==='ru'?'да':'yes'):(LANG==='ru'?'нет':'no')}</b></div>
<h2>${T.hist}</h2>
<table><tr><th>${LANG==='ru'?'Начало':'Start'}</th><th>${LANG==='ru'?'Длина':'Length'}</th><th>${LANG==='ru'?'Менструация':'Bleeding'}</th></tr>
${cs.map((c,i)=>{const nx=cs[i+1];const len=nx?diffDays(c.start,nx.start):'—';
  const pd=c.end?diffDays(c.start,c.end)+1:'—';
  return `<tr><td>${c.start}</td><td>${len}</td><td>${pd}</td></tr>`;}).join('')}
</table>
<h2>${LANG==='ru'?'Дневник':'Daily log'}</h2>
${r.length?`<table><tr>${T.hdr.map(h=>`<th>${h}</th>`).join('')}</tr>
${r.map(x=>`<tr>${x.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</table>`
:`<p>${LANG==='ru'?'Записей пока нет.':'No entries yet.'}</p>`}
<div class="foot">${LANG==='ru'
 ? 'Отчёт сформирован приложением Nia на устройстве пользователя. Это записи самонаблюдения, а не медицинское заключение.'
 : 'Generated by Nia on the user\u2019s device. These are self-reported records, not a medical assessment.'}</div>
</body></html>`;
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
  $('nf').onclick = ()=>toast(LANG==='ru'?'Сообщим, когда откроем доступ':'We\u2019ll let you know at launch');
}

/* ================= НАСТРОЙКИ ================= */
function renderSet(){
  const lb = S.settings.lastBackup ? new Date(S.settings.lastBackup).toLocaleDateString() : '—';
  const tog = (k,t,d)=>`<div class="row" data-s="${k}"><div><div class="t">${t}</div><div class="d">${d}</div></div>
    <div class="toggle ${S.settings[k]?'on':''}"></div></div>`;
  $('setv').innerHTML = `<h1>${T.set}</h1><p class="sub">${T.setS}</p>
    <div class="eyebrow">${T.secData}</div>
    ${tog('backup', `${CLOUD} · ${S.settings.backup?T.bkon:'—'}`, `${T.bklast}: ${lb}`)}
    <div class="row" id="rst"><div><div class="t">${T.bkrestore}</div><div class="d">${T.bkrestores}</div></div><span>›</span></div>
    <div class="row" id="bkf"><div><div class="t">${T.bkfile}</div><div class="d">${T.bkfiles}</div></div><span>›</span></div>
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
    ${tog('plainTone', T.remD, T.remDs)}
    <div class="eyebrow">${T.secSub}</div>
    <div class="row" id="sub"><div><div class="t">${
      S.sub.status==='lifetime' ? T.subLife : S.sub.status==='trial'
        ? `${T.trialLeft} · ${trialDaysLeft()} ${T.trialDays}` : T.subOn}</div>
      <div class="d">${S.sub.status==='lifetime' ? T.pwLifeN
        : S.sub.plan==='quarter' ? `${T.pwQ} · ${T.pwQP}` : `${T.pwYear} · ${T.pwYearP}`}</div></div><span>›</span></div>
    <div class="eyebrow">${T.secDel}</div>
    <div class="row" id="del"><div><div class="t" style="color:var(--bloom)">${T.delall}</div><div class="d">${T.delalls}</div></div></div>
    <p class="note">${T.privnote}</p>`;
  $('setv').querySelectorAll('[data-s]').forEach(r=>r.onclick=()=>{
    const k = r.dataset.s; S.settings[k] = !S.settings[k];
    if(k==='backup' && S.settings[k]) S.settings.lastBackup = new Date().toISOString();
    r.querySelector('.toggle').classList.toggle('on', S.settings[k]); save();
  });
  $('lng').onclick = ()=>{ setLang(LANG==='ru'?'en':'ru'); renderNav(); renderSet();
    $('barTitle').textContent = T.set; };
  $('rst').onclick = ()=>toast(T.bkrestores);
  $('bkf').onclick = ()=>{ download(`nia-backup-${TODAY}.json`, JSON.stringify(S), 'application/json');
    S.settings.lastBackup = new Date().toISOString(); save();
    toast(LANG==='ru'?'Копия сохранена':'Backup saved'); };
  $('inv').onclick = async ()=>{
    const txt = LANG==='ru' ? 'Попробуй Nia — трекер цикла, который хранит данные только у тебя на телефоне.'
                            : 'Try Nia — a cycle tracker that keeps your data on your phone only.';
    try{ if(navigator.share){ await navigator.share({title:'Nia', text:txt}); }
         else { await navigator.clipboard.writeText(txt); toast(T.copied); } }
    catch(e){}
  };
  $('prt').onclick = ()=>toast(T.soon);
  $('sub').onclick = ()=>renderPaywall(false);
  $('del').onclick = ()=>{ if(confirm(T.confirmDel)){ localStorage.removeItem(KEY); S = blank();
    document.body.classList.remove('app'); inApp = false; toast(T.deleted); step(0); } };
}

/* ================= ЛИСТ ВВОДА ДНЯ ================= */
let sheetDate = TODAY, draft = {};
function openSheet(d){
  sheetDate = d;
  draft = JSON.parse(JSON.stringify(S.logs[d] || {flow:null,mood:[],pain:[],energy:null,sleep:null,bbt:null}));
  const M = S.user.metrics;
  const grp = (lbl,key,items,single)=>`<div class="lbl">${lbl}</div><div class="opts" data-g="${key}" data-single="${single?1:0}">
    ${items.map((t,i)=>{
      const on = single ? draft[key]===i : (draft[key]||[]).includes(t);
      return `<div class="opt ${on?'on':''}" data-v="${single?i:t}">${t}</div>`;}).join('')}</div>`;

  $('sheet').innerHTML = `<div class="grab"></div>
    <h1 style="font-size:21px;margin-bottom:4px">${fmtDate(d)}</h1>
    <p class="sub">${T.sheetS}</p>
    ${grp(T.flow,'flow',[T.f0,T.f1,T.f2,T.f3,T.f4],true)}
    ${M.includes('mood')? grp(T.mood,'mood',[T.mo1,T.mo2,T.mo3,T.mo4,T.mo5],false):''}
    ${M.includes('pain')? grp(T.pain,'pain',[T.pa1,T.pa2,T.pa3,T.pa4,T.pa5],false):''}
    ${M.includes('energy')? grp(T.energy,'energy',[T.en1,T.en2,T.en3,T.en4],true):''}
    ${M.includes('sleep')? `<div class="lbl">${T.sleeph}</div>
      <input class="inp" type="number" step="0.5" min="0" max="16" id="slp" value="${draft.sleep??''}">`:''}
    ${M.includes('bbt')? `<div class="lbl">${T.m_bbt}</div>
      <input class="inp" type="number" step="0.01" min="34" max="42" id="bbt" value="${draft.bbt??''}">`:''}
    <button class="cta" id="sv">${T.save}</button>`;

  $('sheet').querySelectorAll('[data-g]').forEach(g=>{
    const key = g.dataset.g, single = g.dataset.single === '1';
    g.querySelectorAll('[data-v]').forEach(o=>o.onclick=()=>{
      if(single){
        const v = +o.dataset.v;
        if(draft[key]===v){ draft[key]=null; o.classList.remove('on'); }
        else { g.querySelectorAll('[data-v]').forEach(x=>x.classList.remove('on'));
               o.classList.add('on'); draft[key]=v; }
      } else {
        const v = o.dataset.v;
        draft[key] = draft[key]||[];
        if(draft[key].includes(v)){ draft[key]=draft[key].filter(x=>x!==v); o.classList.remove('on'); }
        else { draft[key].push(v); o.classList.add('on'); }
      }
    });
  });
  $('sv').onclick = saveDay;
  $('sheet').classList.add('on'); $('scrim').classList.add('on');
}
function closeSheet(){ $('sheet').classList.remove('on'); $('scrim').classList.remove('on'); }
$('scrim').onclick = closeSheet;

function saveDay(){
  const sl = $('slp'), bb = $('bbt');
  if(sl) draft.sleep = sl.value===''? null : +sl.value;
  if(bb) draft.bbt  = bb.value===''? null : +bb.value;

  const empty = draft.flow==null && !(draft.mood||[]).length && !(draft.pain||[]).length
                && draft.energy==null && draft.sleep==null && draft.bbt==null;
  if(empty) delete S.logs[sheetDate]; else S.logs[sheetDate] = draft;

  // кровотечение отмечено → обновляем циклы
  if(draft.flow>=2){ markPeriod(sheetDate); }
  else { unmarkPeriod(sheetDate); }

  save(); closeSheet(); toast(T.saved);
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
    if(diffDays(d, c.start) === 1){ c.start = d; return; }
  }
  S.cycles.push({start:d, end:d, atypical:false});
  S.cycles.sort((a,b)=>a.start<b.start?-1:1);
}
function unmarkPeriod(d){
  S.cycles = S.cycles.filter(c=>{
    if(c.start===d && (!c.end || c.end===d)) return false;
    if(c.end===d) c.end = addDays(d,-1);
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

function boot(){
  try{
    if(!S.user.onboarded) renderLang();
    else if(hasAccess()) enterApp();
    else renderPaywall(true);
  }catch(err){
    // даже при ошибке пользователь не остаётся на пустом экране
    document.body.innerHTML = '<div style="padding:40px 24px;font-family:sans-serif">'+
      '<h2>'+(LANG==='ru'?'Что-то пошло не так':'Something went wrong')+'</h2>'+
      '<p style="color:#888;font-size:13px">'+String(err && err.message || err)+'</p>'+
      '<button onclick="localStorage.removeItem(\'nia.v1\');location.reload()" '+
      'style="margin-top:16px;padding:14px 22px;border:0;border-radius:14px;background:#2B2140;color:#fff;font-size:15px">'+
      (LANG==='ru'?'Начать заново':'Start over')+'</button></div>';
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
