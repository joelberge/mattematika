/* The coin shop, shared by both booklets.
   Every correct answer earns one coin (coloured in on the fight/rescue page). Halfway through the booklet
   the child spends coins on things that change the game rules, ticking "Kjøpt" and later "Brukt".
   Usage:  const SHOP = Butikk({ sprite, svg, book: 'elliot' | 'yuna' });  then SHOP.coinRow(6), SHOP.page({...}). */
window.Butikk = function ({ sprite, svg, book }) {
  const COIN = sprite([".yyy.", "yYyyy", "yyYyy", "yyyYy", ".yyy."], { y:'#ffd23f', Y:'#e8a400' });
  const EMPTY = sprite([".www.", "wwwww", "wwwww", "wwwww", ".www."], { w:'#ffffff' });
  const ICON = sprite(["rwrwrwrwr", "rwrwrwrwr", ".b.....b.", ".b.....b.", "bbbbbbbbb", "bcyccycyb", "bbbbbbbbb"],
    { r:'#e0452a', w:'#ffffff', b:'#c98b4a', c:'#e9d3b2', y:'#ffd23f' });

  const S = {
    ild: sprite(["..y..", ".yoy.", ".oro.", ".oro.", ".oro.", ".oro.", ".oro.", ".oro.", "ggggg", "..b..", "..b..", ".ggg."],
      { y:'#ffe14a', o:'#ff8a1a', r:'#e0452a', g:'#e8a400', b:'#5a3418' }),
    skjold: sprite(["ggggggg", "gyyyyyg", "gyyryyg", "gyrrryg", "gyyryyg", ".gyyyg.", "..gyg..", "...g..."], { g:'#b07a00', y:'#ffd23f', r:'#e0452a' }),
    stovler: sprite(["bb...bb", "bY...bY", "bb...bb", "bbb..bbb"], { b:'#2f6fd1', Y:'#ffd23f' }),
    drikk: sprite(["..c..", "..c..", ".ppp.", "ppppp", "pWppp", "ppppp", ".ppp."], { c:'#9a6a44', p:'#8e44ff', W:'#ffffff' }),
    hund: sprite(["BB...", "BBbbb", "bbbbb", "bKbbb", "bbbbb", ".bbbK", "..bbp", ".bbbb", "bbbbb", "bb.bb"], { b:'#c98b4a', B:'#8a5a2a', p:'#ff8fb0' }, { mirror: true }),
    hjelm: sprite(["..sss..", ".sssss.", "sssssss", "sKKKKKs", "sssssss", "ss.s.ss", "s.....s"], { s:'#c0c6d0' }),
    stav: sprite(["...y.y", "....y.", "...yYy", "....y.", "...b..", "..b...", ".b....", "b....."], { y:'#ffd23f', Y:'#fff3a8', b:'#7a4520' }),
    godbit: sprite(["..g.g", "...g.", "..oo.", ".ooo.", ".oo..", "oo...", "o...."], { g:'#5cc15a', o:'#ff8a1a' }),
    lykt: sprite(["Y......", "YY.gggg", "YYggggg", "YY.gggg", "Y......"], { Y:'#ffe14a', g:'#6a6a74' }),
    floyte: sprite(["ppppppppp", "pKpKpKppp", "ppppppppp"], { p:'#c9a9d8' }),
    ugle: sprite(["b....b", "bbbbbb", "bWbbWb", "bEbbEb", "bbyybb", "bccccb", ".cccc."], { b:'#9a6a44', W:'#ffffff', E:'#2a1a3a', y:'#ff9d2e', c:'#e9c9a0' }),
    sloyfe: sprite(["pp...pp", "ppprppp", "pp...pp"], { p:'#ff6fb0', r:'#e0452a' }),
  };

  // Every item changes a rule of this game, except the one "just for fun" item.
  const ITEMS = book === 'elliot' ? [
    ['ild', 'ILDSVERD', 10, 'Gangestykker og bonuskort tar 2 liv.'],
    ['skjold', 'SUPERSKJOLD', 8, 'Ett galt svar teller ikke.'],
    ['stovler', 'LYNSTØVLER', 6, 'Hopp over én oppgave.'],
    ['drikk', 'MAGISK DRIKK', 5, 'Monsteret mister 1 liv med en gang.'],
    ['hund', 'HJELPEHUND', 4, 'Få et hint fra en voksen.'],
    ['hjelm', 'KUL HJELM', 3, 'Bare fordi den er kul!'],
  ] : [
    ['stav', 'TRYLLESTAV', 10, 'Bonuskortet gir 2 hjerter.'],
    ['godbit', 'GODBITER', 8, 'Gi et dyr ett hjerte gratis.'],
    ['lykt', 'LOMMELYKT', 6, 'Hopp over én oppgave.'],
    ['floyte', 'MAGISK FLØYTE', 5, 'Ett galt svar teller ikke.'],
    ['ugle', 'HJELPEUGLE', 4, 'Få et hint fra en voksen.'],
    ['sloyfe', 'SLØYFE', 3, 'Pynt til et dyr du har reddet.'],
  ];

  if (!document.getElementById('butikk-css')) {
    const st = document.createElement('style');
    st.id = 'butikk-css';
    st.textContent = `
      .coins { display: flex; align-items: center; gap: 1.6mm; }
      .coins svg { height: 6.5mm; width: auto; display: block; }
      .coins span { font-family: var(--pixel); font-size: 10px; margin-right: 2mm; }
      .foot.coinfoot { flex-direction: column; align-items: stretch; gap: 2mm; }
      .foot .line1 { display: flex; align-items: center; gap: 5mm; }
      .shop-top { display: flex; align-items: flex-end; justify-content: center; gap: 10mm; margin: 4mm 0 2mm; }
      .shop-top svg { width: auto; display: block; }
      .shop-top .kid { height: 34mm; } .shop-top .icon { height: 26mm; } .shop-top .coin { height: 12mm; margin-bottom: 8mm; }
      .shop-rules { margin: 3mm 3mm 0; padding: 2.5mm 4mm; background: #fff7d6; font-family: var(--read, var(--soft)); font-size: 15px; line-height: 1.45;
        box-shadow: 0 -3px 0 #16121c, 0 3px 0 #16121c, -3px 0 0 #16121c, 3px 0 0 #16121c; }
      .shop-rules b { font-family: var(--pixel); font-weight: 400; font-size: 11px; margin-right: 6px; }
      .items { margin: 6mm 3mm 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 5mm; }
      .item { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 1.5mm; padding: 3mm 2mm; background: #fff;
        box-shadow: 0 -3px 0 #16121c, 0 3px 0 #16121c, -3px 0 0 #16121c, 3px 0 0 #16121c, 4px 6px 0 #ddd6e6; }
      .item svg.pic { height: 15mm; width: auto; display: block; }
      .item b { font-family: var(--pixel); font-weight: 400; font-size: 10px; }
      .item .price { display: flex; align-items: center; gap: 1.5mm; font-family: var(--pixel); font-size: 13px; }
      .item .price svg { height: 5mm; width: auto; }
      .item p { margin: 0; font-family: var(--read, var(--soft)); font-size: 13px; line-height: 1.3; color: #5b5468; min-height: 9mm; }
      .item .ticks { display: flex; gap: 4mm; font-family: var(--soft); font-weight: 700; font-size: 14px; }
      .item .ticks span { display: flex; align-items: center; gap: 1.5mm; }
      .item .ticks i { display: inline-block; width: 5.5mm; height: 5.5mm; background: #fff; box-shadow: 0 0 0 2.5px #16121c; }
      .calc { margin: 6mm 3mm 0; padding: 4mm 5mm; background: #fff7d6; font-family: var(--read, var(--soft)); font-weight: 700; font-size: 17px; line-height: 2.3;
        box-shadow: 0 -3px 0 #16121c, 0 3px 0 #16121c, -3px 0 0 #16121c, 3px 0 0 #16121c; }
      .calc h2 { font-family: var(--pixel); font-weight: 400; font-size: 11px; margin: 0 0 1mm; line-height: 1.4; }
      .calc u { display: inline-block; width: 16mm; border-bottom: 3px solid #16121c; text-decoration: none; }
      .calc u.w { width: 40mm; }`;
    document.head.appendChild(st);
  }

  const coinRow = n => `<div class="coins"><span>MYNTER:</span>${svg(EMPTY, '').repeat(n)}</div>`;

  function page({ hero, level, next }) {
    const items = ITEMS.map(([pic, name, price, text]) => `
      <div class="item">${svg(S[pic], 'pic')}<b>${name}</b>
        <div class="price">${price} ${svg(COIN, '')}</div><p>${text}</p>
        <div class="ticks"><span><i></i> Kjøpt</span><span><i></i> Brukt</span></div></div>`).join('');
    return `
    <section class="page shop" data-page="butikk" style="--theme:#e8a400">
      <div class="head"><span class="level">${level} · SIDE 6</span><span class="name">BUTIKKEN</span></div>
      <div class="shop-top">${svg(hero, 'kid')}${svg(COIN, 'coin')}${svg(ICON, 'icon')}</div>
      <div class="shop-rules"><b>SLIK HANDLER DU</b>Tell myntene du har fargelagt så langt. Kjøp det du har råd til, og kryss av i «Kjøpt».
        Når du bruker tingen, krysser du av i «Brukt». Butikken er åpen igjen før ${next}, så du kan også spare!</div>
      <div class="items">${items}</div>
      <div class="calc"><h2>REGN UT</h2>
        Jeg har <u></u> mynter. Jeg kjøper <u class="w"></u> for <u></u> mynter.<br>
        <u></u> − <u></u> = <u></u> mynter igjen.<br>
        Jeg kjøper <u class="w"></u> for <u></u> mynter. &nbsp; <u></u> − <u></u> = <u></u> igjen.</div>
    </section>`;
  }

  return { coinRow, page, COIN, ICON };
};
