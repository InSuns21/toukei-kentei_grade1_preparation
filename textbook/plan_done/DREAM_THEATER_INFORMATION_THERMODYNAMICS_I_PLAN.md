# DREAM THEATER 情報熱力学 I（ITD系列・講数可変）

分冊: 2026-10-11  
再設計: 2026-11-07（標準教科書・総説との照合）  
状態: completed（ITD1〜ITD17実装・横断収支監査・一般連続模型と量子分岐の依存整理を2026-11-08に完了）

## 中心問い

**測定によって得た情報から仕事を取り出せるなら、第二法則はどこで守られるのか。**

巨視的な第二法則を微小系の一回ごとの揺らぎに持ち込み、確率的な軌道、測定、条件付き制御、記憶の初期化までを同一のエネルギー・情報収支として追う。Maxwellの悪魔を単なる歴史的逆説で終わらせず、**「どの系を境界に含め、何を平均し、何を初期状態へ戻したか」**を数式と模型で判定できることを出口とする。

## 範囲・既習事項・担当の切り分け

- **直接前提の正本：** [熱力学 TH](../plan_done/DREAM_THEATER_THERMODYNAMICS_PLAN.md)（特にTH2・TH4・TH5）、[統計力学 SM](../plan_done/DREAM_THEATER_STATISTICAL_MECHANICS_PLAN.md)（特にSM2・SM3）、[情報理論 INFO](../plan_done/DREAM_THEATER_INFORMATION_THEORY_I_PLAN.md)（特にINFO1・INFO2）。確率過程は有限状態Markov連鎖・条件付き確率・遷移率を最初に定義し、必要な既習章が存在する場合だけ実在するstable anchorへ接続する。
- **本PLANのcanonical owner：** 熱浴に接した確率軌道の仕事・熱・全エントロピー生成の結合、測定とフィードバックによる情報付き第二法則、記憶の測定・消去費用、全装置の循環収支。平衡エントロピー・分配関数・Shannon情報量の一般定理を重複して所有しない。
- **標準ルート：** 古典的な有限状態模型、単一温度の熱浴、操作で変わるエネルギー準位、相互に逆向きの遷移が許されるMarkov動力学を用いる。後から連続状態のLangevin模型、複数浴・化学ポテンシャル、粗視化、強結合、非Markov性を扱う場合は追加の仮定と変更点を明記する。
- **停止線：** 量子測定・量子フィードバックは[量子情報の既習正本](../plan_done/DREAM_THEATER_QUANTUM_INFORMATION_I_PLAN.md)と接続する発展入口にとどめる。古典測定の相互情報量による式を任意の量子計測へ無条件に移植しない。ブラックホールの情報問題にも古典的なLandauer評価をそのまま適用しない。
- **横断読順：** [熱・時空・情報ルート](../plans/DREAM_THEATER_BLACK_HOLE_THERMODYNAMICS_INFORMATION_ROUTE_PLAN.md)。数理物理の厳密化を必要とする発展分岐は[時空・量子場数学ルート](../plans/DREAM_THEATER_LORENTZIAN_QFT_MATH_FOUNDATIONS_PLAN.md)で位置付ける。

初回の設計改稿は実装開始ではなかったが、2026-11-07にITD1を実装してITD系列manifestを設けた。旧案のITD1〜ITD15は固定講数とみなさず、後続の章数は証明・演習のまとまりで決める。

## 数式・模型の共通契約

教材の冒頭で次を固定し、その後の定理・例題・解答で符号を変更しない。

1. **熱・仕事の向き：** $W$は外部が系にした仕事、$Q$は熱浴から系へ入った熱を正とし、各軌道で$\Delta E=W+Q$。取り出した仕事は$W_{\mathrm{ext}}=-W$、浴へ捨てた熱は$Q_{\mathrm{bath}}=-Q$とする。TH2の規約と一致させる。
2. **有限状態模型：** 状態$x\in X$、制御パラメータ$\lambda_t$、エネルギー$E(x,\lambda_t)$、温度$T>0$、$\beta=(k_{\mathrm B}T)^{-1}$、分布$p_t(x)$を明記する。連続状態では基準測度・密度と積分の存在条件を追加する。$\log$は自然対数で情報量はnat、熱力学的エントロピーには$k_{\mathrm B}$を掛ける。
3. **平衡と非平衡：** $\pi_\lambda(x)=e^{-\beta E(x,\lambda)}/Z_\lambda$、$F_{\mathrm{eq}}(\lambda)=-k_{\mathrm B}T\log Z_\lambda$をSM3から引く。非平衡自由エネルギーを有限分布について$\mathcal F[p,\lambda]=\sum_xp(x)E(x,\lambda)+k_{\mathrm B}T\sum_xp(x)\log p(x)$と定義し、$0\log0=0$、$D(p\|\pi_\lambda)<\infty$等の条件を固定する。INFO2の $D$ は底2の対数（bit 単位）なので、自然対数で定めた本PLANのエントロピー・自由エネルギーへ換算するときは $\ln2$ を掛ける。
4. **時間反転：** 正方向の実験・逆方向の実験の初期分布とプロトコル、軌道反転写像、遷移の対応、経路確率の支持を別々に定める。詳細釣合いと局所詳細釣合い、逆実験と随伴動力学、積分型と詳細型のゆらぎ関係を同義語として扱わない。
5. **測定と記憶：** 真の状態$x$、観測結果$y$、測定チャネル$p(y\mid x)$、記憶状態$m$、結果依存プロトコル$\lambda_t(y)$を区別する。事後分布$p(x\mid y)$、軌道ごとの情報量$i(x;y)=\log[p(y\mid x)/p(y)]$と平均$I(X;Y)$の関係を確認し、$p(y)=0$の結果を排除して定義する。
6. **等号成立と限界：** 「可逆」「準静的」「初期平衡」「循環」「完全測定」「無誤差消去」を混同しない。各評価について、成立する量化（各軌道・平均・極限）、必要な初期条件、絶対連続性、等号条件、適用不能な反例を明示する。

## 学習ブロック（章数・講数は証明のまとまりで決める）

以下のA〜Fは学習順と論証のまとまりであり、1ブロック＝1章ではない。旧15テーマはこの順序へ統合・再配置した。独習者が途中計算を再構成できない場合は、補題・模型・演習のために分割する。

### A. 微小系で「熱」「仕事」「不可逆」をどう測るか

**入口：** THの巨視的な熱・仕事、SMの正準分布から、離散状態を操作する一つの実験へ進む。

- 有限状態の離散時間Markov連鎖／連続時間ジャンプ過程を、遷移確率・遷移率・master方程式・経路確率から導入する。どちらを基本模型とするか章内で固定し、他方への橋を示す。
- パラメータ変更時の仕事と、固定パラメータでの状態ジャンプ時の熱を区別し、各軌道で第一法則を直接検算する。局所詳細釣合い$\log[k_{xy}(\lambda)/k_{yx}(\lambda)]=\beta Q_{\mathrm{bath}}(x\to y)$は**単一平衡熱浴とその遷移の熱交換に関する仮定**として導入する。
- 確率的系エントロピー$-k_{\mathrm B}\log p_t(x_t)$、浴のエントロピー変化、全エントロピー生成を分け、平均生成と瞬間の負の揺らぎの両立を二状態模型で見る。
- **再導出すべき核：** 状態と操作の交互更新による$\Delta E=W+Q$、ジャンプ率比から経路確率比へ進む積の展開、熱浴の寄与の符号。
- **直接例：** 非対称二準位系の一回のquenchと緩和。workを伴う操作とheatを伴う緩和を別々に計算する。

### B. 時間反転から第二法則とゆらぎ関係へ

**入口：** 一回の実験では負のエントロピー生成も起こり得る。では多数回の実験でどのような厳密な制約があるか。

- 正逆の経路測度を明示し、$\Sigma[\gamma]=\log\{P_{\mathrm F}[\gamma]/P_{\mathrm R}[\gamma^\dagger]\}$を無次元の全エントロピー生成として定義する。両実験の対応する軌道の支持が一致する条件を課して、$\langle e^{-\Sigma}\rangle=1$を経路和から証明し、Jensen不等式から$\langle\Sigma\rangle\ge0$を導く。支持が欠ける場合は式が補正され得ることを反例で説明する。
- 平衡初期分布、逆プロトコル、微視的可逆性と仕事の定義をそろえて、Jarzynski等式$\langle e^{-\beta W}\rangle=e^{-\beta\Delta F_{\mathrm{eq}}}$を証明する。そこから$\langle W\rangle\ge\Delta F_{\mathrm{eq}}$を導く。
- Crooksの仕事分布関係$P_{\mathrm F}(W)/P_{\mathrm R}(-W)=e^{\beta(W-\Delta F_{\mathrm{eq}})}$は、密度の零点・逆過程の初期平衡を明記した上で導く。詳細型から積分型への積分を示し、Jarzynskiと同じ仮定ではない場合を区別する。
- **直接例：** 二準位系の瞬間quenchで$Z_1/Z_0$と指数平均を有限和で照合し、平均仕事との違いを示す。反例では非平衡初期分布を「通常のJarzynski等式」に無条件で代入しない。

### C. 非平衡自由エネルギーと情報の意味

**入口：** 同じHamiltonianでも、確率分布の偏りによって取り出せる仕事が変わる。

- INFO2の相対エントロピーを用いて$\mathcal F[p,\lambda]-F_{\mathrm{eq}}(\lambda)=k_{\mathrm B}T(\ln2)D(p\|\pi_\lambda)$を出発点から展開する（INFO2の $D$ は bit 単位）。自由エネルギー差と散逸、相対エントロピーの非負性の関係を、時間発展の仮定つきで説明する。
- 「情報＝仕事」ではなく、分布・制御・浴の条件が整ったときに情報が仕事の上限へ寄与することを示す。未知の状態に関するShannon情報と、系・記憶間の相互情報量を区別する。
- **直接例：** 同一準位二状態の一様分布と偏った分布から$\mathcal F-F_{\mathrm{eq}}$を計算し、logの底と$k_{\mathrm B}T$の係数を検算する。

### D. Maxwellの悪魔：測定とフィードバック

**入口：** 測定結果に応じて操作を切り替えると、系だけを見た仕事の上限が変わる。

- Szilardエンジンを、粒子の位置測定、隔壁、体積変化、等温膨張、再初期化の区別を付けて導入する。理想的な完全測定・可逆膨張で$k_{\mathrm B}T\log2$が取り出せる条件を計算する。
- ノイズを持つ測定$p(y\mid x)$について、結合分布・事後分布・軌道ごとの情報量を定義する。測定後の系と記憶の相関がない場合には同じ式を適用できないことを示す。
- **再導出すべき核：** 明示した「単一測定、結果依存フィードバック、適切な初期平衡・支持条件」の模型で情報付きゆらぎ関係と$\langle W_{\mathrm{ext}}\rangle\le-\Delta F_{\mathrm{eq}}+k_{\mathrm B}TI(X;Y)$を導く。一般化した等式に絶対不可逆性や測定装置の反作用が影響する場合は、別命題として条件を記載する。
- **直接例：** 二値状態の二値対称誤り率$\varepsilon$の測定で$I(X;Y)=\log2-h(\varepsilon)$（$h$はnat単位の二値エントロピー）を計算し、完全測定と無情報測定の両端点を検算する。

### E. Landauer原理と物理的な記憶

**入口：** 測定で得た相関を使い終わった後、悪魔の記憶をもう一度使える状態へ戻すには何が必要か。

- 記憶を実在するエネルギー準位・確率分布として表し、論理的な状態写像と物理的な操作を区別する。ビットのコピー、測定、フィードバック、消去の仕事を一律に$k_{\mathrm B}T\log2$とみなさない。
- **再導出すべき核：** 等エネルギー二状態、初期一様分布、初期・終状態で同じHamiltonian、単一温度の熱浴、無誤差resetという理想条件から$W_{\mathrm{reset}}\ge k_{\mathrm B}T\log2$を非平衡自由エネルギー差として導く。熱浴への放熱下限を述べるときは記憶の内部エネルギー変化が零であることも確認する。
- 初期分布が偏っている場合、消去誤り率$\varepsilon>0$の場合、最終Hamiltonianを変更する場合には下限を計算し直す。二状態の等エネルギー模型では最終分布$(1-\varepsilon,\varepsilon)$への操作につき$W\ge k_{\mathrm B}T\{H(p_{\mathrm{initial}})-h(\varepsilon)\}$となる条件を示す。
- 有限時間では可逆下限に到達しない場合、障壁制御・準静的極限の可否・モデル化されないコントローラの費用を区別する。
- **直接例：** 二準位記憶の消去を、確率分布の図と自由エネルギーの変化で追い、零誤り極限と半々の出力を比較する。

### F. 全装置の循環収支と発展分岐

**入口：** 系だけを循環させることと、測定器・記憶・浴を含む装置全体を循環させることは違う。

- 系$X$、記憶$M$、浴$B$、外部仕事源を区別し、初期相関・最後に残る相関・記憶の再初期化・装置の周期性を一つの帳簿にまとめる。各段階の$\Delta E$、$\Delta S$、$I(X;M)$、$W$、$Q$を追跡し、全系で第二法則を回復する。
- **総合演習の核：** ノイズのある二値測定→条件付き仕事抽出→記憶消去の独立模型を設計し、系だけの「利得」と全循環の仕事収支の違いを厳密に算出する。測定の費用や相関の最終値を勝手にゼロと置かない。
- 発展入口としてLangevin運動の連続経路、複数浴・情報流・情報reservoir、有限時間制御、粗視化による隠れた散逸を比較する。量子測定は古典模型の射程を確認する比較節とし、量子情報・量子熱力学の別の仮定を先取り証明したことにしない。

## 定義・定理の初出順と証明責任

| 使用する主要語・結果 | 最初の導入／再利用先 | このPLANで閉じる論証・留意点 |
|---|---|---|
| 仕事・熱・熱力学ポテンシャル | TH2・TH5、SM3 | 軌道ごとの分割と符号の統一。既存の平衡導出を重複しない |
| Shannon・相対エントロピー・相互情報量 | INFO1・INFO2 | natと熱力学単位の換算、測定チャネルへの代入 |
| 遷移率・master方程式・経路確率・局所詳細釣合い | Aで通常文→直接例→formal statement | 経路確率比と全エントロピー生成の接続 |
| 時間反転・ゆらぎ関係 | Aの経路確率の後、Bで定義 | 積分型の経路和、Jensen、Jarzynski・Crooksの前提差 |
| 非平衡自由エネルギー | Cで分布の偏りを導入 | $\mathcal F-F_{\mathrm{eq}}=k_{\mathrm B}TD$と適用条件 |
| 測定チャネル・事後分布・情報付き第二法則 | Dの操作模型と定義例の後 | noisy measurement・feedback付きの上限、結果の分布による平均 |
| 論理的消去・記憶の物理的reset | Eの記憶模型の後 | 不可逆過程の仕事下限、偏り・誤り・有限時間の条件 |
| 装置全体の循環・情報収支 | Fで全構成要素を明示 | 完全周期と不完全周期を分けて総合検算 |

初出のformal statementは、ここにある先行語だけで対象・仮定・結論を読める位置に置く。本文で既習結果を実際に使う箇所には、実在する章内・章間stable anchorをリンクする。PLAN段階で未確認のanchorや未作成のITD章IDを捏造しない。

## 演習・計算の設計

- **Level A（定義を動かす）：** 二準位系の仕事・熱、正逆遷移の比、quenchの指数平均、相対エントロピーと自由エネルギー、測定誤りと相互情報量、消去誤り率の各直接計算。
- **Level B（仮定を使う）：** 一般の有限状態経路和で積分型ゆらぎ関係を導く、JarzynskiとCrooksを比較する、支持が一致しない逆過程の反例を調べる、初期偏りを持つ記憶の最小仕事を評価する、測定誤りに応じた制御の損益分岐を計算する。
- **Level C（複数概念の接続）：** ノイズ測定・情報を用いた仕事抽出・記憶の初期化を閉じた循環にしたうえで、仕事・熱・相互情報量・全エントロピー生成を独立した二通りの導出で照合し、どの仮定を外すとどの関係が使えないかを説明する。

各**実装章**には、理由付き例外を除きLevel A 4題・B 3題・C 1題以上と全詳細解答を設ける。これは下限であり、上記すべてを少数の問題で無理に兼ねない。各問の出発点、使用結果と適用条件、主要中間式、単位・符号・極限、結論を再現可能にする。論文の定理名を引用しただけの「証明」や、数値シミュレーションだけによる検証を完了とみなさない。

## 教科書・総説との対応（構成を参照し、本文は独自に執筆する）

1. Luca Peliti and Simone Pigolotti, *[Stochastic Thermodynamics: An Introduction](https://press.princeton.edu/books/hardcover/9780691201771/stochastic-thermodynamics)* (Princeton University Press, 2021), Chapters 2–5, 7. **基礎→軌道の熱・仕事→ゆらぎ関係→情報熱力学**という順序、二状態模型、exerciseの配置を参照。本PLANのA〜Fをそのまま章にコピーしない。
2. Udo Seifert, *[Stochastic Thermodynamics](https://www.cambridge.org/core/books/stochastic-thermodynamics/)* (Cambridge University Press, 2025), 特に過程・第一／第二法則、非平衡定常状態、情報処理。局所詳細釣合い、軌道・時間反転、ゆらぎの使い分けを比較する。
3. Takahiro Sagawa, *[Thermodynamics of Information Processing in Small Systems](https://link.springer.com/book/10.1007/978-4-431-54168-4)* (Springer, 2013), 特にMaxwellの悪魔、測定・フィードバック、記憶装置、情報付き非平衡等式。D〜Fの収支境界を設計する際の主参照。
4. J. M. R. Parrondo, J. M. Horowitz and T. Sagawa, *[Thermodynamics of information](https://doi.org/10.1038/nphys3230)*, Nature Physics **11**, 131–139 (2015). 測定・フィードバック・resetを一つの物理的装置の操作として捉える俯瞰に参照。
5. 基礎式の一次文献：C. Jarzynski, *[Nonequilibrium Equality for Free Energy Differences](https://doi.org/10.1103/PhysRevLett.78.2690)* (1997); G. E. Crooks, *[Entropy production fluctuation theorem and the nonequilibrium work relation for free energy differences](https://doi.org/10.1103/PhysRevE.60.2721)* (1999); U. Seifert, *[Entropy Production along a Stochastic Trajectory and an Integral Fluctuation Theorem](https://doi.org/10.1103/PhysRevLett.95.040602)* (2005)。Bの元の仮定を照合する。
6. 情報付き関係の一次文献：T. Sagawa and M. Ueda, *[Minimal Energy Cost for Thermodynamic Information Processing: Measurement and Information Erasure](https://doi.org/10.1103/PhysRevLett.102.250602)* (2009); *[Generalized Jarzynski Equality under Nonequilibrium Feedback Control](https://doi.org/10.1103/PhysRevLett.104.090602)* (2010)。D・Eの「何の費用に下限があるか」を区別する。

書誌・目次を設計上の比較資料とし、未閲覧の本文・解答全体を照合済みとは書かない。教材には逐語転載を行わず、採用した結果の条件と独自の模型・再導出を記す。

## 実装時のゲートと完了条件

1. 入口となるTH2・TH4・TH5、SM3、INFO1・INFO2の**実在**するformal resultとanchorを点検し、各ITD章の`chapter.yaml`・`knowledge.yaml`に必要最小の直接prerequisiteを登録する。未実装の命題を既習定理として扱わない。
2. 有限模型でエネルギー・情報・経路確率の全てを先に定義し、重要な導出を軌道和／分布和から閉じる。数値実験は中間式の検算や直感補助に用い、存在・等号・一般性の証明の代わりにしない。
3. 各章に動機→初出定義と条件検証例→仮定を含む主要結果→主要中間式を省略しない証明→演習と詳細解答を設ける。定義語の**使用位置より前**への導入と既習resultへの使用箇所リンクを査読する。
4. 新規執筆・実質改稿（区分C）の章自身では全主要証明・全演習詳細解答を出発点から再計算し、完成稿を別観点で再読する。書式だけ（A）・局所数学修正（B）は現行standardの変更範囲別ゲートに従う。**別の完了章の追跡監査は、ユーザーが対象を明示した場合のみ**行う。
5. changed-only validationを基本とし、共通routing・knowledge DAG・全体索引・validator等を変えた場合はfull validationへ拡張する。対象系列のmanifest、公開目次、リンク、演習数、proof/formal、KaTeX、Pagesの直接必要な検証を確認する。
6. B・D・E・Fをまたぐ最終横断監査で、情報付き仕事の上限とresetの下限を同じ系境界・符号・単位で対照し、全循環の第二法則、前提依存、canonical owner、公開導線を検証する。**完了は学習成果と実検証で判定**し、旧15項目の消化だけで`plan_done/`へ移さない。

## ITD1 着手記録（2026-11-07）

- ITD1「有限状態の確率軌道・仕事・熱・エントロピー生成」を初回章として新規実装。離散時間で制御パラメータの変更と熱浴によるジャンプを交互に記述し、軌道第一法則、局所詳細釣合い、経路確率比と平均エントロピー生成まで有限和で導く。
- 系列の進捗正本を `textbook/dream-theater-series/ITD.yaml` に作成した。次の候補はITD2の逆実験に基づく積分型ゆらぎ関係、Jarzynski・Crooksの証明。測定・フィードバック、Landauer、全装置循環と最終横断監査は残るため本PLANは進行中とする。

## ITD4 着手記録（2026-11-07）

- ITD2（ゆらぎ関係）・ITD3（非平衡自由エネルギー）完了後に、学習ブロックDをITD4「測定・フィードバックと情報付き第二法則」として実装。有限測定チャネル、条件付き分布、情報付き仕事の上限、完全測定における経路支持欠損、二値センサーとSzilardエンジンの理想極限を扱う。
- 次はブロックE（物理的記憶・Landauer原理）。ブロックFの全装置循環収支と最終横断監査は引き続き未完了なので、このPLANを `plans_progress/` に維持する。

## ITD5 着手記録（2026-11-07）

- ITD4完了を確認し、ブロックEをITD5「物理的記憶とLandauer原理：消去に必要な仕事」として実装。論理的resetと物理的操作の区別、分布・終端準位からの仕事下限、放熱、偏り・誤り、準静的可逆極限、零誤りの支持制約、相関のある記憶の共同操作を扱う。
- ブロックFの全装置循環、測定を含む費用の詳細、系列横断監査が残るので、PLANを `plans_progress/` に維持する。

## ITD6 着手記録（2026-11-07）

- ITD1〜ITD5の完了を確認し、ブロックFの中心課題である系・記憶・浴・外部仕事源の全循環をITD6として実装。結合分布の自由エネルギーと相互情報量を使い、測定費用を仮定せず、二値対称測定→条件付き抽出→記憶resetの仕事・熱・相関を段階ごとに検算した。
- 可逆極限と有限時間の不可逆測定を区別し、周辺分布だけが元に戻る不完全循環では相関が仕事収支に残ることを示した。連続状態・複数浴・粗視化などの発展分岐の整理とITD系列横断監査を残すため、PLANは引き続き `plans_progress/` とする。

## ITD7 着手記録（2026-11-07）

- ITD1〜ITD6が完了した状態から、発展分岐を「観測で失われる散逸」という中心問いでITD7へまとめた。浴ラベル付きジャンプ経路、複数浴の経路比、定常二浴熱流と隠れた散逸、有限経路の粗視化による相対エントロピー分解を有限和で証明した。
- 連続Langevin経路の仕事・浴熱・Stratonovich/伊藤補正は、既知の確率積分公式を適用する比較入口として扱い、一般的な経路測度のゆらぎ関係まで証明済みとはしていない。
- ITD1〜ITD7をまたぐ最終横断監査、連続経路・量子理論など発展テーマの本格的な依存整理は残るため、このPLANを `plans_progress/` に維持する。

## ITD8 着手記録（2026-11-07）

- ITD1〜ITD7の完了と、ITD7で有限時間制御を扱っていないことを確認し、発展ブロックFの有限時間散逸をITD8「有限時間の記憶消去：確率流・活動度・余分な散逸」として実装した。
- 有限状態・単一温度・双方向正率の時間依存Markovジャンプ過程を明示し、瞬間の確率流と活動度からエントロピー生成率を再導出した。対数の不等式、Cauchy–Schwarz、総変動距離の時間発展を組み合わせ、有限の平均ジャンプ回数の下での散逸下限を証明した。
- ITD5の誤り付きLandauer下限へ有限時間の上乗せを導いた。経路測度の一般論、複数浴・量子計測への無条件な適用はせず、ITD1〜ITD8の系列横断監査と連続・量子理論の本格的な依存整理は未完了としてPLANを `plans_progress/` に維持する。

## ITD9 着手記録（2026-11-07）

- ITD1〜ITD8完了と未実装の発展テーマ「情報流」を確認し、二部分系ジャンプ模型による自律的な情報流をITD9に配置した。
- 相互情報量の時間微分をX/Y遷移別に分解し、各浴の局所詳細釣合いから部分エントロピー生成の非負性と情報流補正を証明する。二浴四状態の定常模型で熱と情報の反対向きの流れを直接計算し、全系の収支と区別する。
- 系列横断監査、連続経路の厳密化と量子理論への依存整理は未完了のため、このPLANを `plans_progress/` に維持する。

## ITD10 着手記録（2026-11-07）

- ITD1〜ITD9完了を確認し、ITD6の再利用可能な記憶装置とITD9の自律情報流とは別に、「新鮮なビットを供給して出力テープを捨てる」情報リザーバーの収支をITD10へ配置した。
- 単一ビットの仕事下限を装置の非平衡自由エネルギー・ビットエントロピー・残留相関へ分解し、初期相関がある場合の補正も示した。複数ビットでは出力全相関と装置・テープ相関を含む仕事下限を証明し、繰り返し可逆コピーと独立乱雑化を対照した。
- ビット供給設備まで戻す循環はITD6の収支対象であり、古典有限状態模型の上限を連続・量子の一般結果と同一視しない。系列横断監査、連続経路の厳密化、量子理論への依存整理は残るのでPLANは `plans_progress/` に維持する。

## ITD11 着手記録（2026-11-07）

- ITD1〜ITD10の完了を確認し、ITD7で第一法則までしか導いていなかった連続経路について、一定駆動の円周Langevin模型をITD11に配置した。経路の持ち上げ変位と浴熱を定義し、Gaussian増分の正逆比から連続経路測度の比を厳密に導く。
- 互いに絶対連続な正逆経路測度から積分型ゆらぎ関係、境界エントロピー、平均第二法則を導き、一様定常状態の詳細型変位対称性も検算する。符号一ビットへの粗視化が捨てる散逸を条件付き相対エントロピーで評価する。
- 位置依存ドリフト・拡散、零密度、複数浴、非Markov性、量子測定の一般理論まで解決したとはしない。ITD系列横断監査と量子分岐の依存整理は残るため `plans_progress/` に維持する。

## ITD12 着手記録（2026-11-08）

- ITD1〜ITD11の完了と、ITD11が位置依存の力を未検証事項としたことを確認した。周期ポテンシャルと一定外力・一定拡散係数に限定した円周Langevin拡散をITD12へ配置した。
- 確率流の保存則とStratonovich平均浴熱率をItô公式から導き、系・浴の平均エントロピー生成率を確率流の平方積分へまとめた。周期境界の定常解を積分因子で構成し、平衡密度と周回流の正の散逸を比較した。
- 位置依存拡散、非周期境界、一般経路測度の時間反転比、量子測定への一般化は本章の結論に含めない。ITD系列横断監査と量子分岐の依存整理が残るためPLANは `plans_progress/` に維持する。

## ITD13 着手記録（2026-11-08）

- ITD1〜ITD12完了を確認し、ITD11の一定駆動の正逆経路比とITD12の位置依存力による確率流を結ぶ。時間依存の滑らかな周期ポテンシャル・外力、一定移動度・一定拡散係数、正の円周密度に限定し、ITD13でGirsanov密度から時間反転の経路比を導く。
- 一様Brown基準測度の時間反転対称性、Itô–Stratonovich補正、逆実験の初期分布を追跡し、積分型ゆらぎ関係・確率流の平方積分・Jarzynski等式（初期平衡かつ別の逆実験）を照合する。
- 位置依存拡散と境界のある領域、密度の支持欠損、量子測定をこの章の結論へ含めない。ITD系列横断監査と量子分岐の依存整理は継続のためPLANは `plans_progress/` のままとする。

## ITD14 着手記録（2026-11-08）

- ITD1〜ITD13が完了していることを確認し、ITD12・ITD13で一定としていた拡散係数を、一定温度の下で位置に依存する正の滑らかな関数へ拡張する。中心問いは「雑音の強度が位置で変わるとき、どのドリフトが平衡と第二法則を保つか」。
- 熱浴温度一定・Einstein関係・円周・正密度・固定の位置依存移動度という範囲で、Itô形の雑音誘起ドリフト、確率流、可逆基準過程へのGirsanov作用、時間反転経路比、散逸平方公式、平衡初期のJarzynski等式を証明する。
- 温度勾配、時間依存拡散係数、境界局所時、零密度、慣性除去の一般極限、量子測定へは一般化しない。系列横断監査と量子分岐の整理が残るためPLANは `plans_progress/` を維持する。

## ITD16 着手記録（2026-11-08）

- ITD1〜ITD15の完了と、ITD14の位置拡散とITD15の慣性付き過程の間に、質量を小さくした極限の論証がまだないことを確認した。ITD16では円周上の自由粒子・一定外力・一定温度・一定摩擦に限定し、Ornstein–Uhlenbeck速度の積分表示から位置の過減衰極限を二乗平均で証明する。
- 平衡初期Maxwell速度のGaussian仕事関係、平均散逸と終端相対エントロピーの帳簿を検算する。一方、速度の運動エネルギー境界項は小質量でも消えず、位置と仕事の収束から浴熱の収束は導けないことを反例で示す。
- 一般の位置依存摩擦・温度勾配・経路空間での一様収束を証明したとは扱わない。系列横断監査、一般連続模型、量子分岐の依存整理は残るためPLANは plans_progress/ に維持する。

## ITD17 着手記録（2026-11-08）

- ITD1〜ITD16の完了を確認し、ITD16で残った位置依存摩擦を、温度一定・有界で正の滑らかな摩擦・有界Lipschitz外力に限定して扱う。「慣性付き運動の小質量極限からITD14の雑音誘起ドリフトを導出できるか」を中心問いとした。
- 運動量 $P^m=mV^m$ の一様二乗平均評価、摩擦座標 $G(x)=\int_0^x\gamma(r)dr$、同一Brown運動による比較とGronwall評価を組み合わせ、固定時刻の位置の二乗平均誤差 $O(m)$ を証明した。逆写像へのItô公式で $-\gamma'/(\beta\gamma^2)$ を導き、円周上のKramers平衡と過減衰Gibbs密度の整合を検算した。
- 温度勾配、経路一様収束、浴熱・エントロピー生成の小質量極限、非有界係数は未解決として明示した。ITD系列横断監査と量子分岐の依存整理が残るのでPLANは plans_progress/ を維持する。


<a id="itd-series-closeout-audit"></a>

## ITD1〜ITD17 系列横断監査・依存分岐の完了記録（2026-11-08）

### 対象・判定方法

- 対象は `ITD1`〜`ITD17` の現行 `index.md`、各 `chapter.yaml` / `knowledge.yaml`、`textbook/dream-theater-series/ITD.yaml`、当PLAN、直接必要な TH2 / SM3 / INFO2 / STO7・STO9・STO10 / MECH4 および量子分岐の QINF5・QINF17・QINF18・QINF20 の公開 result anchor。系列の公開ルートは `textbook/dream-theater-toc/080_物理系/105_information-thermodynamics.md` に ITD1〜ITD17 が掲載されている。
- 系列全体を横断する **系境界・熱と仕事の向き・情報の底・サイクルの始終状態・定義の適用仮定**を式単位で点検した。下記は個別章の全証明と全演習解答を再査読したという主張ではなく、系列横断の収支式・分岐条件と代表的な中間計算の再導出の記録である。
- 各 `chapter.yaml` の直接前提からたどり、ITD1→2→3→4→5→6→7→8→9、ITD3/5/6→10、ITD2/7→11→12→13→14→15→16→17 の連続経路を確認した（ITD9はITD4/6/7/8にも依存）。ITD17は MECH4 の運動量を直接使う。後続章から過去章へ定理を逆輸入しない。

### 共通契約と各群の整合

| 範囲（主要 result anchor） | 横断して固定した契約と判定 |
|---|---|
| [ITD1 第一法則](../volumes/dream_thater/物理系/ITD/ITD1/index.md#thm-itd1-first-law)、[平均エントロピー生成](../volumes/dream_thater/物理系/ITD/ITD1/index.md#thm-itd1-mean-entropy) | 系への仕事 `W>0`、系へ入る熱 `Q>0`、浴へ放出する熱 `Q_bath=-Q`。したがって `ΔE=W+Q=W-Q_bath`。単一等温浴では `Σ=ΔH_nat+βQ_bath`（無次元、nat）。情報理論の `D_2`（bit）を用いる場合だけ `D_nat=(ln 2)D_2` を乗じる。 |
| [ITD2 積分ゆらぎ関係](../volumes/dream_thater/物理系/ITD/ITD2/index.md#thm-itd2-ift)、[Jarzynski関係](../volumes/dream_thater/物理系/ITD/ITD2/index.md#thm-itd2-jarzynski) | `Σ=ln(P_F/P_R)` は同じ経路の順逆確率比。完全な絶対連続性のとき `⟨e^{-Σ}⟩=1`。逆方向にのみ存在する経路の絶対非可逆性があれば欠損項を保持する。Jarzynski は適切な初期平衡など追加仮定が必要。 |
| [ITD3 非平衡自由エネルギー](../volumes/dream_thater/物理系/ITD/ITD3/index.md#prop-itd3-kl-identity)、[仕事下限](../volumes/dream_thater/物理系/ITD/ITD3/index.md#thm-itd3-work-bound) | `F(p)-F_eq=k_BT D_nat(p||p_eq)=k_BT ln 2 D_2`、`W-ΔF=k_BTΣ≥0`。初期・終状態が平衡の場合に限り `ΔF=ΔF_eq` となる。 |
| [ITD4 情報付き第二法則](../volumes/dream_thater/物理系/ITD/ITD4/index.md#thm-itd4-feedback-work-bound)、[情報付きIFT](../volumes/dream_thater/物理系/ITD/ITD4/index.md#thm-itd4-information-ift) | 測定結果の相互情報量 `I_nat` を使い、系への仕事の下限を `⟨W⟩≥ΔF_eq-k_BT I_nat` とする。これはフィードバック対象系のみの帳簿で、測定・記憶・消去を含む全装置の総仕事下限ではない。支持集合欠損も `1-λ_abs` として別に数える。 |
| [ITD5 消去](../volumes/dream_thater/物理系/ITD/ITD5/index.md#thm-itd5-reset-work-bound)、[Landauer限界](../volumes/dream_thater/物理系/ITD/ITD5/index.md#cor-itd5-landauer) | `W_reset≥ΔU+k_BT(H_nat(p)-H_nat(r))` は非相互作用の記憶模型と指定した端点で成立。等エネルギー・一様1 bit→確定状態なら `k_BT ln 2`。偏り・消去誤差・相関があるとこの特別値を無条件には使えない。 |
| [ITD6 全装置自由エネルギー](../volumes/dream_thater/物理系/ITD/ITD6/index.md#prop-itd6-joint-free-energy)、[循環収支](../volumes/dream_thater/物理系/ITD/ITD6/index.md#thm-itd6-joint-balance) | `F_XM=F_X+F_M+k_BT I_nat(X;M)`（相互作用なし）。測定と消去を別費用として勘定し、最初と最後の **結合分布と記憶状態**が同じ場合にだけ `ΔF_XM=0`、`W_total=k_BTΣ_total≥0`、`Q_bath=W_total`。系だけ閉じた「悪魔」の見かけの利得を全装置の利得と取り違えない。 |
| [ITD7 多熱浴](../volumes/dream_thater/物理系/ITD/ITD7/index.md#thm-itd7-multibath-path-ratio)、[粗視化](../volumes/dream_thater/物理系/ITD/ITD7/index.md#thm-itd7-coarse-kl-chain)、[連続熱](../volumes/dream_thater/物理系/ITD/ITD7/index.md#prop-itd7-stratonovich-balance) | `Σ=ΔH+Σ_r β_r Q_bath^r`。温度が違う浴を単一 `βQ_bath` にまとめない。粗視化の相対エントロピーは条件付き KL の非負分だけ減る。連続 SDE では熱の経路積分と Itô/Stratonovich 変換に補正がある。 |
| [ITD8 速度限界](../volumes/dream_thater/物理系/ITD/ITD8/index.md#thm-itd8-speed-limit)、[有限時間消去](../volumes/dream_thater/物理系/ITD/ITD8/index.md#cor-itd8-finite-reset) | `Σ≥2 d_TV^2/N` の `N` は指定した活動量（jump数の積分）であり、状態差だけで非零散逸を下から抑えるものではない。有限時間消去の追加仕事項を `k_BT` 倍してエネルギー単位へ戻す。 |
| [ITD9 部分系第二法則](../volumes/dream_thater/物理系/ITD/ITD9/index.md#thm-itd9-partial-second-law)、[情報流分解](../volumes/dream_thater/物理系/ITD/ITD9/index.md#thm-itd9-information-decomposition) | 情報流 `I_dot^X+I_dot^Y=I_dot` の向きを揃え、`σ_X=Hdot_X+β_X Qdot_bath^X-I_dot^X≥0`、`σ_Y` も同様。合計は結合系の `Hdot_XY+Σ_r β_r Qdot_bath^r` に戻る。外からの測定記録 `I(X;M)` と定常 bipartite 系の `I_dot^X` は別量。 |
| [ITD10 情報テープ](../volumes/dream_thater/物理系/ITD/ITD10/index.md#thm-itd10-tape-work)、[相関入力](../volumes/dream_thater/物理系/ITD/ITD10/index.md#prop-itd10-correlated-input) | 入出力 bit列の結合 Shannon エントロピーと出力間相関を区別し、初期記憶・入力の相関 `I_i` があれば引く。ITD6の結合自由エネルギーの相互情報項を二重計上しない。 |
| [ITD11 逆経路](../volumes/dream_thater/物理系/ITD/ITD11/index.md#thm-itd11-path-ratio)、[ITD12 連続散逸](../volumes/dream_thater/物理系/ITD/ITD12/index.md#thm-itd12-entropy-balance)、[ITD13 Girsanov逆過程](../volumes/dream_thater/物理系/ITD/ITD13/index.md#thm-itd13-girsanov-reversal) | ジャンプ模型から円周上の拡散へ移る際も浴熱は **浴へ出る向き**。適切な密度の下、`Σdot=∫J²/(Dρ) dx≥0`。経路測度比は初期終端密度・反転経路・絶対連続性を含めて扱い、SDEの形式だけから主張しない。 |
| [ITD14 非一様拡散](../volumes/dream_thater/物理系/ITD/ITD14/index.md#thm-itd14-fluctuation-dissipation)、[ITD15 慣性付き反転](../volumes/dream_thater/物理系/ITD/ITD15/index.md#thm-itd15-path-ratio) | 位置依存拡散では Itô ドリフトに `D'` を残す。慣性付きでは **速度が時間反転で奇**であり、不可逆速度流から散逸 `∫J_{v,irr}²/(D_vρ)` を得る。位置のみの経路逆転を流用しない。 |
| [ITD16 熱の境界項](../volumes/dream_thater/物理系/ITD/ITD16/index.md#thm-itd16-kinetic-boundary)、[ITD17 変摩擦小質量極限](../volumes/dream_thater/物理系/ITD/ITD17/index.md#thm-itd17-variable-friction-limit) | 等温・限定係数の下、位置の固定時刻 `L²` 収束と `D'=-γ'/(βγ²)` は示される。一方、運動エネルギー境界の揺らぎが残り、**位置の収束 ≠ 浴熱・経路エントロピー生成の収束**。一般の温度場、反射境界、非有界係数、経路一様収束へ拡張しない。 |

### 出発式からの代表的な再導出

1. **1 bit の全循環（ITD4〜6）**。等エネルギーの `X,M` に対し、初期 `H(X,M)=ln2`、二値測定誤り `ε` の直後は `H(X,M)=ln2+h(ε)`、理想フィードバックで独立一様へすると `H=2ln2`、消去後は `H=ln2`。各段階の最小仕事は `-k_BT h(ε)`、`-k_BT(ln2-h(ε))`、`+k_BT ln2`。和は **0**。ここで `I(X;M)=ln2-h(ε)` を測定コストと重複加算しない。有限散逸があれば `W_total>0`。根拠は [ITD6の二値循環](../volumes/dream_thater/物理系/ITD/ITD6/index.md#thm-itd6-binary-cycle)。
2. **2浴・情報流（ITD7・9）**。熱浴へ出る向きの電流 `J_h>0`（高温浴から系へ入るので `Q_bath^h=-J_h dt`、低温浴へは `Q_bath^c=+J_h dt`）なら `Σdot=(β_c-β_h)J_h>0`。ITD9の定常4状態例では `I_dot^X=-ln3/4`、`I_dot^Y=+ln3/4`、`β_X Qdot_bath^X=-ln2/4`、`β_Y Qdot_bath^Y=+ln4/4`。ゆえに `σ_X=(-ln2+ln3)/4=ln(3/2)/4`、`σ_Y=(ln4-ln3)/4=ln(4/3)/4`、合計 `ln2/4`。情報流が打ち消し合うのを再計算した。根拠は [ITD9の4状態例](../volumes/dream_thater/物理系/ITD/ITD9/index.md#prop-itd9-four-state-steady)。
3. **円周拡散（ITD12〜14）**。等温で `D=k_BT μ`、外力を保存力 `-U'` と一様な外部駆動 `f` に分けると、`J=μ(f-U')ρ-Dρ'`。従って `U'+k_BT ρ'/ρ=f-k_BT J/(Dρ)`。円周で `∂_tρ=-∂_xJ` を部分積分し、`𝓕=∫Uρ dx+k_BT∫ρ ln(Lρ)dx` に代入すれば、`d𝓕/dt=∫J[U'+k_BT ρ'/ρ]dx=f∫J dx-k_BT∫J²/(Dρ)dx`。これが外部仕事率から散逸を引く ITD3 と同じ符号の帳簿である。変摩擦の小質量極限では `D=1/(βγ)` なので `D'=-γ'/(βγ²)`、確率流 `J=(F/γ+D')ρ-(Dρ)'=(F/γ)ρ-Dρ'`。外力 `F=-U'` と `ρ∝e^{-βU}` なら `ρ'=-βU'ρ`、`J=0`。この照合は **係数式とその条件付き平衡**の照合であり、ITD14の全仮定をITD17へ移植するものではない。
4. **熱の小質量極限（ITD16）**。Maxwell初期速度で自由粒子の `K_t=mV_t²/2` は定常でも、時間相関 `e^{-γt/m}` が残る。`Q_bath=K_0-K_t` の分散は `β^{-2}(1-e^{-2γt/m})\to β^{-2}`（`t>0`）。したがって `Z_t^m\to Z_t` のみから `Q_bath^m\to Q_bath` は導けない。

### 一般連続模型への前提と未拡張範囲

- **達成済みの入口**：有限状態の局所詳細釣合い（ITD1〜10）→円周拡散の確率流・熱（ITD7・11・12）→経路測度とGirsanov（ITD13、直接既習 [STO10](../volumes/dream_thater/解析系/STO/STO10/index.md#thm-sto10-girsanov)）→位置依存拡散（ITD14）→奇変数を含む慣性過程（ITD15）→定摩擦（ITD16）・変摩擦（ITD17）の限定的な小質量極限。この順序では「Stratonovichの熱」と「ItôのSDE表示」と「経路測度の時間反転」は同一視しない。
- **ITD17とITD14の仮定の差**：ITD17の収束定理は実数上の有界Lipschitz外力・有界正値 `C²` 摩擦を用いる。一方 ITD14 は円周上のより滑らかな周期係数と外力の分解・時間依存等を指定して経路反転・定常散逸を論じる。両者に共通する `D'` の係数照合は可能でも、ITD14の経路測度・熱の定理をITD17の任意の `F,γ` に無条件で適用できない。ITD17本文の同一視を「式の一致」と明記する局所修正を行った。
- **未来の別課題**：温度勾配、一般境界条件、非有界係数、高次元・多様体、非Markov浴、熱・エントロピー生成の小質量経路極限は当PLANで証明していない。これらには追加の確率解析と模型ごとの浴の定義が必要であり、既存の [幾何学的確率解析 II（未着手PLAN）](../plans/DREAM_THEATER_STOCHASTIC_ANALYSIS_II_GEOMETRIC_PLAN.md) などは **候補となる数学的前提**に過ぎず、ITDの定理の自動的な延長ではない。

### 量子測定・量子情報への分岐（移譲先を確定）

- **古典側の出口**：ITD4の `M(y|x)` は古典的条件付き確率、`I_nat(X;Y)=\sum p_{xy}\ln[p_{xy}/(p_xp_y)]`。ITD5の消去は指定された古典的記憶の分布変化、ITD6/10の循環は古典的結合分布を対象とする。この3つを量子系へ文字どおり転写しない。
- **量子側の入口・canonical owner**：測定を [QINF5のPOVM](../volumes/dream_thater/応用系/QINF/QINF5/index.md#def-qinf5-povm)・[instrument](../volumes/dream_thater/応用系/QINF/QINF5/index.md#def-qinf5-instrument)・[状態更新](../volumes/dream_thater/応用系/QINF/QINF5/index.md#prop-qinf5-state-update) として指定する。エントロピーは [QINF17のvon Neumannエントロピー](../volumes/dream_thater/応用系/QINF/QINF17/index.md#def-qinf17-entropy)、相互情報は [QINF18の量子相互情報](../volumes/dream_thater/応用系/QINF/QINF18/index.md#def-qinf18-mutual) を使い、量子データ処理は [QINF20](../volumes/dream_thater/応用系/QINF/QINF20/index.md#thm-qinf20-dpi) に依存する。
- **橋の条件**：量子では系・記憶・測定装置・浴のHilbert空間、初期相関、測定後の状態・instrumentの非選択／選択分岐、全操作のエネルギー保存（あるいは明示した駆動仕事）、チャネルのCPTP性と相対エントロピーのsupport条件を別途明示する必要がある。`H_nat→S(ρ)`、`I(X;M)→I(A;M)` だけでは量子版の仕事下限・IFT・Landauer消去の証明にならない。[横断履修ルート](../plans/DREAM_THEATER_BLACK_HOLE_THERMODYNAMICS_INFORMATION_ROUTE_PLAN.md)は、ITDとQINFを **別の前提枝**として BHT / BHI 等の下流へ接続する。量子熱力学の一般定理はこの系列の completed に含めない。

### 完了ゲートの確認と残余

- ITD1〜ITD17 の17件は manifest 上すべて `completed`。直接前提に後続ITD章の逆参照はなく、公開目次に全章が載る。定義の主たる canonical owner を TH2（熱と仕事）、SM3（Gibbs・自由エネルギー）、INFO2（古典相対エントロピー）、STO10（Girsanov）、QINF5/17/18/20（量子分岐）として区別した。
- 横断監査での指摘は **ITD17→ITD14の「同じ」という文言が仮定まで一致するように読める**一点。局所修正後、上記の等温流・循環・情報流の中間式を用いて波及範囲を再査読する。数学的な符号・`k_BT` 係数・bit/nat変換の横断的不整合はこの照合範囲では検出しなかった。
- 同一担当AIが数式・内容の自己照合と、別観点での依存・記法・読者導線の再読を実施した。**第三者による独立査読は実施していない**。上記の「未来の別課題」は未完了のITD1〜ITD17作業ではなく、明示的に対象外とした一般化である。
