import fs from 'node:fs';
const path='textbook/dream-theater.md';
let text=fs.readFileSync(path,'utf8');
const start=text.indexOf('## まず、どこから入る？');
const toc=text.indexOf('## 目次', start);
const route=text.indexOf('## 全体路線図', toc);
if(start<0||toc<0||route<0) throw new Error('required headings not found');
let orientation=text.slice(start, toc);
orientation=orientation.replace(/\n---\n\n$/,'');
if(!orientation.includes('### 子羊たちへの黙示録')){
  orientation=orientation.replace('## まず、どこから入る？\n','## まず、どこから入る？\n\n### 子羊たちへの黙示録\n');
}
const prefix=text.slice(0,start).replace(/\n---\n\n$/,'\n');
const tocBlock=text.slice(toc,route).replace(/\n---\n\n$/,'');
const suffix=text.slice(route);
text=prefix+tocBlock+'\n\n---\n\n'+orientation.trim()+'\n\n---\n\n'+suffix;
text=text.replace(
`        ├─→ DREAM THEATER本編\n        │      選択公理 / Zorn\n        │      外測度 / Carathéodory\n        │      Lebesgue測度 / Vitali集合`,
`        ├─→ DREAM THEATER本編\n        │      選択公理 / Zorn\n        │      測度基礎 → Lebesgue積分 → 収束定理\n        │      → 積測度 → Lp → L2完備性\n        │      └─ 深掘り: 外測度 / Carathéodory / Lebesgue測度 / Vitali集合`
);
fs.writeFileSync(path,text);
