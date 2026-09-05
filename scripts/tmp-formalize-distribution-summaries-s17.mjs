import fs from 'node:fs';

function edit(path, anchor, edits) {
  let text = fs.readFileSync(path, 'utf8');
  if (text.includes(anchor)) {
    console.log(`already applied: ${path}`);
    return;
  }
  for (const [oldText, newText] of edits) {
    if (!text.includes(oldText)) {
      throw new Error(`S17 replacement target not found in ${path}: ${oldText.slice(0, 100)}`);
    }
    text = text.replace(oldText, newText);
  }
  fs.writeFileSync(path, text);
  console.log(`updated: ${path}`);
}

edit(
  'textbook/volumes/01_probability/P2_02_期待値_分散_共分散_母関数/index.md',
  'def-p2-02-mode',
  [
    [
      '> **定義（パーセント点・四分位数・四分位範囲）**  \n> 累積分布関数を $F$ とし、$0<p<1$ に対して一般化逆関数\n>\n> $q_p=\\inf\\{x:F(x)\\ge p\\}$\n>\n> を $p$ 分位点とする。$100p$ パーセント点は $q_p$、四分位数は $Q_1=q_{0.25}$、$Q_2=q_{0.50}$、$Q_3=q_{0.75}$、四分位範囲は $IQR=Q_3-Q_1$ である。',
      '> **定義（パーセント点・中央値・四分位数・四分位範囲）**  \n> 累積分布関数を $F$ とし、$0<p<1$ に対して一般化逆関数\n>\n> $q_p=\\inf\\{x:F(x)\\ge p\\}$\n>\n> を $p$ 分位点とする。$100p$ パーセント点は $q_p$、**中央値**は $Q_2=q_{0.50}$、四分位数は $Q_1=q_{0.25}$、$Q_2=q_{0.50}$、$Q_3=q_{0.75}$、四分位範囲は $IQR=Q_3-Q_1$ である。この一般化逆関数による定義では、離散分布などで中央値の候補が複数ある場合も一つの規則で $Q_2$ を選べる。'
    ],
    [
      '<!-- definition-example-end -->\n\n### 3A.1 例：同じ標準偏差でも変動係数は違う',
      `<!-- definition-example-end -->\n\n<a id="def-p2-02-mode"></a>\n\n<!-- formal-statement-start -->\n> **定義（最頻値）**  \n> 離散型確率変数では確率質量関数 $p(x)$ を最大にする値、連続型確率変数では本章で用いる確率密度関数 $f(x)$ を最大にする値を **最頻値（mode）** という。最大化点が複数あれば最頻値も複数あり得る。\n<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-p2-02-mode -->\n**定義の確認**  \n$X\\sim\\operatorname{Bernoulli}(p)$ で $p>1/2$ なら $P(X=1)=p>P(X=0)$ なので最頻値は1です。$N(\\mu,\\sigma^2)$ の密度は $x=\\mu$ で最大になるので、正規分布の最頻値は $\\mu$ です。\n<!-- definition-example-end -->\n\n### 3A.1 例：同じ標準偏差でも変動係数は違う`
    ]
  ]
);

edit(
  'textbook/volumes/02_distributions/P3_02_主要な連続分布/index.md',
  'def-p3-02-survival-function',
  [[
    '### 2.3 指数分布\n\n$\\lambda>0$ とします。',
    `### 2.3 指数分布\n\n<a id="def-p3-02-survival-function"></a>\n\n<!-- formal-statement-start -->\n> **定義（生存関数）**  \n> 累積分布関数を $F(x)=P(X\\le x)$ とするとき\n>\n> $S(x)=P(X>x)=1-F(x)$\n>\n> を **生存関数** という。寿命変数では「時点 $x$ を超えて生存する確率」を表す。\n<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-p3-02-survival-function -->\n**定義の確認**  \nある寿命分布で $F(2)=0.7$ なら、時点2を超えて生存する確率は $S(2)=1-0.7=0.3$ です。\n<!-- definition-example-end -->\n\n$\\lambda>0$ とします。`
  ]]
);

edit(
  'textbook/volumes/02_distributions/P4_01_変数変換_順序統計量/index.md',
  'def-p4-01-order-statistic',
  [[
    `## 4. 順序統計量\n\n独立同分布の連続確率変数\n$$\nX_1,\\ldots,X_n\n$$\nを小さい順に並べ、\n$$\nX_{(1)}\\le X_{(2)}\\le\\cdots\\le X_{(n)}\n$$\nと書きます。\n\n- $X_{(1)}$: 最小値\n- $X_{(n)}$: 最大値\n- $X_{(k)}$: 第 $k$ 順序統計量\n\n共通の累積分布関数を`,
    `## 4. 順序統計量\n\n<a id="def-p4-01-order-statistic"></a>\n\n<!-- formal-statement-start -->\n> **定義（順序統計量）**  \n> 標本 $X_1,\\ldots,X_n$ を小さい順に並べて\n>\n> $X_{(1)}\\le X_{(2)}\\le\\cdots\\le X_{(n)}$\n>\n> と書くとき、$X_{(k)}$ を **第 $k$ 順序統計量** という。特に $X_{(1)}$ は標本最小値、$X_{(n)}$ は標本最大値である。順序統計量という定義自体には独立同分布や連続性を仮定しない。\n<!-- formal-statement-end -->\n\n<a id="def-p4-01-range"></a>\n\n<!-- formal-statement-start -->\n> **定義（範囲・標本範囲）**  \n> 標本最大値と標本最小値の差\n>\n> $R=X_{(n)}-X_{(1)}$\n>\n> を **範囲（標本範囲）** という。\n<!-- formal-statement-end -->\n\n<!-- definition-example-start: def-p4-01-order-statistic, def-p4-01-range -->\n**定義の確認**  \n標本が $2,5,1,4$ なら、並べ替えると $1,2,4,5$ なので $X_{(2)}=2$、標本最小値は1、標本最大値は5、範囲は $R=5-1=4$ です。\n<!-- definition-example-end -->\n\n以下の分布公式では $X_1,\\ldots,X_n$ を独立同分布の連続確率変数とします。共通の累積分布関数を`
  ]]
);
