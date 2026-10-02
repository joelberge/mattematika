/* "Lag din egen helt": personalises a booklet in the browser.
   Settings come from the link's #hash (or ?query when rendering PDFs locally), e.g.
     monsterkamp.html#d=2&navn=Sara&figur=prinsesse&har=2a1f2e&hud=c68a5a&klaer=3fae6a&venn=Luna&skurk=Grumpo
     dyreredning.html#d=1&navn=Ola&figur=helt&dyr=Snuppa&tittel=prins
   Using the hash means the child's name never leaves the browser (it is not sent to the web server).
   Nothing here runs unless a setting is present, so a plain booklet is unchanged. */
(function () {
  const raw = location.hash.includes('=') ? location.hash.slice(1) : location.search.slice(1);
  const q = new URLSearchParams(raw);
  const clean = (v, max = 14) => (v || '').replace(/[<>&"'`\\]/g, '').replace(/\s+/g, ' ').trim().slice(0, max);
  const hex = v => /^[0-9a-fA-F]{6}$/.test(v || '') ? '#' + v : null;
  const shade = (c, f) => {
    const n = parseInt(c.slice(1), 16), ch = s => Math.round(((n >> s) & 255) * f).toString(16).padStart(2, '0');
    return '#' + ch(16) + ch(8) + ch(0);
  };
  const C = {
    navn: clean(q.get('navn')),
    figur: ['helt', 'prinsesse'].includes(q.get('figur')) ? q.get('figur') : '',
    har: hex(q.get('har')), hud: hex(q.get('hud')), klaer: hex(q.get('klaer')),
    venn: clean(q.get('venn')), skurk: clean(q.get('skurk')), dyr: clean(q.get('dyr')),
    tittel: q.get('tittel') === 'prins' ? 'prins' : '',
  };
  const custom = Object.values(C).some(Boolean);

  // The two hero figures (same pixel rows as in the booklets).
  const KID_ROWS = ["....H.H.", "...HHHHH", "..HHHHHH", ".HHHhHHH", ".BBBBBBB", ".HSSSSSS", ".HSWbSSS", ".HSWbSSS", "sSSSSSSS", ".SSSSSSK",
    "..sSSSSS", "..TTTTTT", ".TTTTTTY", ".TtTTTYY", ".StTTTTY", ".SLLLLLL", "..PPPPPP", "...PPP..", "..OOOO.."];
  const KID_PAL = { H:'#7a4520', h:'#4a2a12', B:'#ff7a1a', S:'#f5c996', s:'#dd9f68', W:'#ffffff', b:'#1a78c2',
    T:'#1fa8a0', t:'#13716c', Y:'#ffd23f', L:'#5a3418', P:'#3a4a8a', O:'#5a3418' };
  const PRIN_ROWS = ["....c..c", "....cccj", "...HHHHH", "..HHHHHH", ".HHHHHHH", ".HHHSSSS", ".HSWESSS", ".HSEESSS", "HHpSSSSS", "HHSSSSSK",
    "HH.sSSSS", "HH.dDDDD", "HHddDDDj", "H.SDDDDD", "..SDDDDD", "..DDdDDD", ".DDDdDDD", ".DDdDDDD", "DDDdDDDD", "LLLLLLLL", "....jj.."];
  const PRIN_PAL = { c:'#ffd23f', j:'#ff3d8b', H:'#b5552c', S:'#f8d2ae', s:'#e3a882', W:'#ffffff', E:'#2a1a3a', p:'#ff9cc4',
    D:'#ff8fc2', d:'#e0609e', L:'#ffffff' };

  function kidPal() {
    const p = { ...KID_PAL };
    if (C.har) { p.H = C.har; p.h = shade(C.har, .6); }
    if (C.hud) { p.S = C.hud; p.s = shade(C.hud, .86); }
    if (C.klaer) { p.T = C.klaer; p.t = shade(C.klaer, .65); }
    return p;
  }
  function prinPal() {
    const p = { ...PRIN_PAL };
    if (C.har) p.H = C.har;
    if (C.hud) { p.S = C.hud; p.s = shade(C.hud, .86); }
    if (C.klaer) { p.D = C.klaer; p.d = shade(C.klaer, .78); }
    return p;
  }
  // [rows, palette, options] for the hero of a booklet. Monsterkamp's default is the kid, Dyreredning's the princess.
  function heroFor(book, extra = {}) {
    const princess = book === 'elliot' ? C.figur === 'prinsesse' : C.figur !== 'helt';
    return princess ? [PRIN_ROWS, prinPal(), { mirror: true, ...extra }] : [KID_ROWS, kidPal(), { mirror: true, ...extra }];
  }

  // Names as they are written in the booklets' own text.
  const BASE = { elliot: { hero: 'Max', friend: 'Nogi', villain: 'Blodio' }, yuna: { hero: 'Mira', ko: '미라', pet: 'Pip' } };
  const swap = (html, from, to) => html.split(from.toUpperCase()).join(to.toUpperCase()).split(from).join(to);
  const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  function names(book, html) {
    if (!custom) return html;
    const B = BASE[book];
    if (book === 'elliot') {
      if (C.navn) html = swap(html, B.hero, C.navn);
      if (C.venn) html = swap(html, B.friend, C.venn);
      if (C.skurk) html = swap(html, B.villain, C.skurk);
      return html;
    }
    if (C.navn) {
      const ko = esc(B.ko), hero = esc(B.hero);
      html = html.replace(new RegExp(`<li><span class="ko">${ko}</span>[^<]*<i>[^<]*</i></li>`, 'g'), '');   // "미라 = Mira på koreansk"
      html = html.replace(new RegExp(`<span class="ko">${ko}</span> \\(${hero}\\)`, 'g'), B.hero);
      html = html.replace(new RegExp(`(${hero})\\s*<(span|b) class="ko">${ko}</\\2>`, 'gi'), '$1');
      html = html.replace(new RegExp(`</b><span class="ko">${ko}</span>`, 'g'), '</b>');
      html = html.replace(new RegExp(`<(span|b) class="ko">${ko}</\\1>`, 'g'), B.hero);
      html = html.split(B.ko).join(C.navn);
      html = swap(html, B.hero, C.navn);
    }
    if (C.dyr) html = swap(html, B.pet, C.dyr);
    if (C.tittel === 'prins') {
      for (const [a, b] of [['PRINSESSEN', 'PRINSEN'], ['Prinsessen', 'Prinsen'], ['prinsessen', 'prinsen'],
                            ['PRINSESSE', 'PRINS'], ['Prinsesse', 'Prins'], ['prinsesse', 'prins'], [' og blir med henne.', ' og blir med ham.']])
        html = html.split(a).join(b);
    }
    return html;
  }

  window.HELT = { C, custom, heroFor, names, KID_ROWS, KID_PAL, PRIN_ROWS, PRIN_PAL, kidPal, prinPal };
})();
