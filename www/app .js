/* Nia — движок. Данные пользователя хранятся только на телефоне.
   Сетевые запросы: шрифты Google Fonts и RevenueCat (статус покупки). */
'use strict';

/* ================= ЛОКАЛИЗАЦИЯ (берётся из системы) ================= */
const IOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
            (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const PLATFORM = (window.Capacitor && window.Capacitor.getPlatform) ? window.Capacitor.getPlatform() : 'web';
const STORE_URL = PLATFORM==='ios'
  ? 'https://apps.apple.com/app/id6818955026'
  : 'https://play.google.com/store/apps/details?id=online.forwardip.nia';
const STORE_NAME = PLATFORM==='ios' ? 'App Store' : 'Google Play';
// язык: сохранённый выбор → иначе язык системы → иначе английский
const SUPPORTED = ['ru','kk','en','es'];
let LANG = (()=>{ try{ const v=localStorage.getItem('nia.lang'); if(SUPPORTED.indexOf(v)>=0) return v; }catch(e){}
  const n = (navigator.language||'en').toLowerCase().slice(0,2);
  return SUPPORTED.indexOf(n)>=0 ? n : 'en'; })();
let CLOUD, BIO, T;
function buildDict(){
  CLOUD = IOS ? 'iCloud' : CLOUD_A[LANG];
  BIO   = IOS ? 'Face ID' : BIO_A[LANG];
  T = DICT()[LANG];
  try{ document.documentElement.lang = LANG; }catch(e){}
}
function setLang(l){ if(SUPPORTED.indexOf(l)<0) return; LANG = l; try{ localStorage.setItem('nia.lang', l); }catch(e){} buildDict(); }
const ruPl = (n, f) => { const a = n % 10, b = n % 100;
  return f[(a===1 && b!==11) ? 0 : (a>=2 && a<=4 && (b<10 || b>=20)) ? 1 : 2]; };
const cap1 = s => s.charAt(0).toUpperCase() + s.slice(1);
const LANGS = [['ru','Русский','RU'],['kk','Қазақша','KZ'],['en','English','EN'],['es','Español','ES']];
const CLOUD_A = {ru:'Google Диск', kk:'Google Drive', en:'Google Drive', es:'Google Drive'};
const BIO_A = {ru:'отпечатку пальца', kk:'саусақ ізі', en:'fingerprint', es:'huella dactilar'};
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
 errT:'Algo salió mal', errBtn:'Empezar de nuevo', locale:'es-ES'}
};}
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
  save();
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
  save();
  if(NATIVE) await rcRefresh();   // подписка могла быть оформлена раньше (например, после «Удалить всё»)
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
  if(inApp) return goTab($('vpw').classList.contains('active') ? 4 : 0);
  if(onb>0) step(onb-1); else renderLang();
};

/* ================= ГЛАВНЫЙ ЭКРАН ================= */
function renderHome(){
  const p = predict();
  const greet = S.user.name ? `${T.hi}, ${esc(S.user.name)}` : T.hi;
  const d = new Date();
  const dstr = T.dateLong(d);

  if(!p){
    $('home').innerHTML = `<h1>${greet}</h1><p class="sub">${dstr}</p>
      <div class="card" style="text-align:center;padding:34px 20px">
        <div class="heroico" style="margin-bottom:18px">◐</div>
        <h3 style="font-size:17px">${T.nodata}</h3><p>${T.nodatas}</p></div>
      <button class="cta" id="hLog">${T.logday}</button>`;
    $('hLog').onclick = ()=>openSheet(TODAY);
    return;
  }

  const phase = phaseOf(TODAY,p);
  const phLbl = {period:T.ph_period,fert:T.ph_fert,ovu:T.ph_ovu,pred:T.ph_period}[phase]
    || (S.user.bc==='yes' ? T.ph_luteal : (TODAY>p.ovu ? T.ph_luteal : T.ph_foll));

  let title, body;
  if(p.late>0 && phase!=='period'){ title = T.lateT(p.late); body = T.lateS; }
  else if(S.user.bc==='yes'){ title = `${T.predP} ${fmtDate(p.nextP)}`; body = T.bcNote; }
  else if(p.irregular){ title = `${T.predRange} ${fmtDate(addDays(p.ovu,-2))} — ${fmtDate(addDays(p.ovu,3))}`; body = T.accLow; }
  else if(TODAY>p.ovu){ title = `${T.predP} ${fmtDate(p.nextP)}`; body = p.count>=3 ? T.accHi : T.accNew; }
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
  const C = Math.max(p.len, p.day), cx=100, cy=100, r=78;
  // цвета из темы — корректно и в светлой, и в тёмной
  const cLine = cssVar('--line') || '#E5DCD6', cBloom = cssVar('--bloom') || '#C4577A',
        cSage = cssVar('--sage') || '#6E9478', cSageS = cssVar('--sage-soft') || '#B9D2BF',
        cInk = cssVar('--ink') || '#2B2140';
  let h='';
  for(let i=1;i<=C;i++){
    const ds = addDays(p.lastStart, i-1);
    const a = (i-1)/C*2*Math.PI;
    const x1 = cx+Math.cos(a)*(r-9), y1 = cy+Math.sin(a)*(r-9);
    const x2 = cx+Math.cos(a)*(r+9), y2 = cy+Math.sin(a)*(r+9);
    let c=cLine, w=3;
    const ph = phaseOf(ds,p);
    if(ph==='period') { c=cBloom; w=4; }
    else if(ph==='fert'){ c=cSageS; w=4; }
    if(ph==='ovu'){ c=cSage; w=6; }
    if(ds===TODAY){ c=cInk; w=7; }
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
      <p>${pd? T.calPd(pd) : fmtDate(c.start)}${c.atypical? T.atyp:''}</p></div>`;
  }).join('') : `<div class="card"><p>${T.noHist}</p></div>`;

  $('calv').innerHTML = `
    <div class="mnav"><button data-m="-1">‹</button>
      <h1 style="margin:0;font-size:22px">${T.monN[calM]} ${calY}</h1>
      <button data-m="1">›</button></div>
    <div class="calhead">${T.wd.map(w=>`<div>${w}</div>`).join('')}</div>
    <div class="cal">${cells}</div>
    <div class="legend">
      <span><i class="sw" style="background:var(--bloom)"></i>${T.ph_period}</span>
      <span><i class="sw" style="background:var(--bloom-soft)"></i>${T.predicted}</span>
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
  return `<div class="row" id="sub"><div><div class="t">${T.subNone}</div><div class="d">${T.subNoneS}</div></div><span>›</span></div>`;
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
    ${subRow()}
    <div class="eyebrow">${T.secDel}</div>
    <div class="row" id="del"><div><div class="t" style="color:var(--bloom)">${T.delall}</div><div class="d">${T.delalls}</div></div></div>
    <p class="note">${T.privnote}</p>`;
  $('setv').querySelectorAll('[data-s]').forEach(r=>r.onclick=()=>{
    const k = r.dataset.s; S.settings[k] = !S.settings[k];
    if(k==='backup' && S.settings[k]) S.settings.lastBackup = new Date().toISOString();
    r.querySelector('.toggle').classList.toggle('on', S.settings[k]); save();
  });
  $('lng').onclick = openLangSheet;
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
  $('del').onclick = async ()=>{ if(confirm(T.confirmDel)){
    try{ localStorage.removeItem(KEY); }catch(e){}
    S = blank();
    document.body.classList.remove('app'); inApp = false; toast(T.deleted); step(0);
    if(NATIVE) await rcRefresh();   // вернуть статус подписки из магазина
  } };
}

function openLangSheet(){
  $('sheet').innerHTML = `<div class="grab"></div>
    <h1 style="font-size:21px;margin-bottom:14px">${T.langT}</h1>
    ${LANGS.map(([k,n,c])=>`<div class="pick ${LANG===k?'on':''}" data-l="${k}"><span class="ic" style="font-size:12px;font-weight:700">${c}</span><span><b>${n}</b></span></div>`).join('')}`;
  $('sheet').querySelectorAll('[data-l]').forEach(el=>el.onclick=()=>{
    setLang(el.dataset.l); closeSheet(); renderNav(); renderSet();
    $('barTitle').textContent = T.set;
  });
  $('sheet').classList.add('on'); $('scrim').classList.add('on');
}

/* ================= ЛИСТ ВВОДА ДНЯ ================= */
let sheetDate = TODAY, draft = {};
function openSheet(d){
  sheetDate = d;
  draft = JSON.parse(JSON.stringify(S.logs[d] || {flow:null,mood:[],pain:[],energy:null,sleep:null,bbt:null}));
  draft.mood = (draft.mood||[]).map(normKey).filter(Boolean);
  draft.pain = (draft.pain||[]).map(normKey).filter(Boolean);
  const M = S.user.metrics;
  const grp = (lbl,key,items,single)=>`<div class="lbl">${lbl}</div><div class="opts" data-g="${key}" data-single="${single?1:0}">
    ${items.map((k,i)=>{
      const on = single ? draft[key]===i : (draft[key]||[]).includes(k);
      return `<div class="opt ${on?'on':''}" data-v="${single?i:k}">${T[k]}</div>`;}).join('')}</div>`;

  $('sheet').innerHTML = `<div class="grab"></div>
    <h1 style="font-size:21px;margin-bottom:4px">${fmtDate(d)}</h1>
    <p class="sub">${T.sheetS}</p>
    ${grp(T.flow,'flow',['f0','f1','f2','f3','f4'],true)}
    ${M.includes('mood')? grp(T.mood,'mood',['mo1','mo2','mo3','mo4','mo5'],false):''}
    ${M.includes('pain')? grp(T.pain,'pain',['pa1','pa2','pa3','pa4','pa5'],false):''}
    ${M.includes('energy')? grp(T.energy,'energy',['en1','en2','en3','en4'],true):''}
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

  const prevFlow = S.logs[sheetDate] ? S.logs[sheetDate].flow : null;
  const empty = draft.flow==null && !(draft.mood||[]).length && !(draft.pain||[]).length
                && draft.energy==null && draft.sleep==null && draft.bbt==null;
  if(empty) delete S.logs[sheetDate]; else S.logs[sheetDate] = draft;

  // менструация: слабые и сильнее — отмечаем; «Нет» или снятая отметка — убираем;
  // мажущие не начинают цикл и не удаляют его
  if(draft.flow>=2) markPeriod(sheetDate);
  else if(draft.flow===0 || (draft.flow==null && prevFlow>=2)) unmarkPeriod(sheetDate);

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
  if(inApp && !$('sheet').classList.contains('on') && !$('vpw').classList.contains('active')){
    if(!hasAccess()){ document.body.classList.remove('app'); inApp=false; renderPaywall(true); }
    else if(dayChanged) goTab(tab);
  }
});
// тема поменялась — перерисовать круг
try{ window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ()=>{ if(inApp && tab===0) renderHome(); }); }catch(e){}

async function boot(){
  if(NATIVE) await Promise.race([rcInit(), new Promise(r=>setTimeout(r,6000))]);
  try{
    if(!S.user.onboarded) renderLang();
    else if(hasAccess()) enterApp();
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
