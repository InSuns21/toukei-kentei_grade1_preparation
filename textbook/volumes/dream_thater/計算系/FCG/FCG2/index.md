# FCG2 渦で染料はどう変形する？――物理の移流をWebGL2で描く

水に細長い染料の帯を置き、水を反時計回りに回す。内側と外側で回転速度が同じなら帯はそのまま回る。**外側の方が速く回ると、帯の外側が先行して、染料は渦巻き状に引き伸ばされる。**

この講では実際のWebGL2表示で動きを観察した後、その変形を式で説明する。水の速度から**染料の厳密な移流解**を求め、JavaScriptで128×128の数値格子を作り、GPUテクスチャに送って描画する。

前提は[FCG1の粒子追跡と物理時刻](../FCG1/index.md#def-fcg1-tracer-samples)、[WGL17の物理格子とデータテクスチャ](../../WGL/WGL17/index.md#def-wgl17-grid)、[R8符号化](../../WGL/WGL17/index.md#def-wgl17-unorm)。頂点・フラグメントシェーダの役割は[WGL1](../../WGL/WGL1/index.md#def-wgl1-shader-stages)、UVは[WGL7](../../WGL/WGL7/index.md#def-wgl7-texel)から使う。

## 1. デモで染料を回す

<iframe src="simulation/wgl-lab.html?lesson=FCG2" title="FCG2 差動回転する水の染料をWebGL2で観察・編集する" loading="lazy" style="width:100%;height:1080px;border:1px solid #64748b;border-radius:4px;" allow="fullscreen"></iframe>

**最初の操作**：「描画して観察」から実行し、結果の「再生」を押す。黄色から琥珀色が濃い染料、濃紺が染料の少ない水。染料の帯が反時計回りに動きながら曲がるのを見る。「一時停止」「次の節目へ」「観察時刻」のスライダーでも同じ濃度を確認できる。観察範囲は物理時刻 $0\le t\le2\pi$ sで、終端では停止する。

実験条件で以下の値を変える。**操作UIは実際の density.js の定数を書き換えて再実行**するので、物理の計算とGUIの理想図を別々にしていない。

| 実験パラメータ | 初期値／GUIの範囲 | 変化 |
| --- | --- | --- |
| omega：基本角速度 | $1$ rad/s ／ $0$～$2.5$ rad/s、刻み$0.25$ | $0$ なら水も染料も静止 |
| shear：半径による角速度の増え方 | $3$ m$^{-1}$ ／ $0$～$6$ m$^{-1}$、刻み$0.5$ | $0$ なら**帯は引き伸ばされず一体回転** |
| amplitude：染料の最大濃度 | $0.9$ ／ $0$～$1$、刻み$0.1$、無次元 | 回転速度を変えずに濃度だけ変える |

**比べる実験**：shear=3 の画面と、shear=0 にして再実行した画面を同じ時刻で見る。前者は染料の内外の角度がずれ、後者は同じ角度で回る。次に omega=0 で静止することを確かめる。この3条件が、画面で何の現象を見ているかの最短の手がかりである。

表示の濃度は**実際に128×128セル中心で計算した値**。初期512×512 pixelの画面は、その値を拡大して表示するための画素数であって、物理格子の数ではない。GPUの色の誤差表は必要に応じて展開できる。

## 2. 外側ほど速い回転流

正方形領域 $D=[0,1]^2$ [m$^2$] にある水を考え、回転の中心を $(1/2,1/2)$ [m] とする。相対位置、半径、角度を

$$
X=x-\frac12,\qquad Y=y-\frac12,\qquad
r=\sqrt{X^2+Y^2},\qquad \theta=\operatorname{atan2}(Y,X)
$$

とする（$x,y,r$ の単位はm、$\theta$ はrad）。回転速度は

$$
\boldsymbol u(x,y)=\Omega(r)(-Y,X),\qquad
\Omega(r)=\omega_0(1+\beta r)
\tag{1}
$$

で定める。$\omega_0\ge0$ [s$^{-1}$] は基本角速度、$\beta\ge0$ [m$^{-1}$] は外側ほど回転が速まる度合いである。初期値はそれぞれ $\omega_0=1$、$\beta=3$。JSの omega, shear に対応する。

ベクトル $(-Y,X)$ は半径 $(X,Y)$ と直交するため、半径方向の速度は零である。角方向の速度は $u_\theta=r\Omega(r)$ [m/s]。したがって流れに乗った粒子の半径と角度は

$$
\frac{dr}{dt}=0,\qquad \frac{d\theta}{dt}=\Omega(r).
$$

初期座標 $(r_0,\theta_0)$ にいた粒子は

$$
r(t)=r_0,\qquad \theta(t)=\theta_0+\Omega(r_0)t.
\tag{2}
$$

初期角度が等しい二粒子で $r_1=0.12$ m、$r_2=0.38$ m なら、角速度は $\Omega(r_1)=1.36$ s$^{-1}$、$\Omega(r_2)=2.14$ s$^{-1}$。$t=\pi/2$ s 後の角度差は

$$
[\Omega(r_2)-\Omega(r_1)]t
=(2.14-1.36)\frac\pi2=0.39\pi\approx1.225\ {\rm rad}.
$$

二粒子が離れるのは拡散ではなく、**流れの速度の違いによる輸送と伸長**である。

## 3. 染料が水の流れに運ばれる

水の流れを変えない微量の染料を**受動スカラー**として扱い、その相対濃度を $q(x,y,t)\in[0,1]$（無次元）とする。初期染料を中心から距離約$0.26$ mの短い環状の帯に置くため、半径方向に

$$
B(r)=\left[\max\left(0,1-\left(\frac{r-0.26}{0.18}\right)^2\right)\right]^2
$$

を用意する。角度方向の濃度は、$\theta=0$ が最も高くなる$2\pi$周期の山とし、

$$
q_0(r,\theta)=A B(r)\exp\left(\frac{\cos\theta-1}{0.55^2}\right),
\quad 0\le A\le1
\tag{3}
$$

と定める。初期設定 $A=0.9$ はJSの amplitude。$0.08\le r\le0.44$ mの外では $B(r)=0$ なので染料は存在しない。

拡散や化学反応がなければ、水粒子と一緒に動く濃度は一定になる。これは**移流方程式**

$$
\frac{\partial q}{\partial t}+\boldsymbol u\cdot\nabla q=0
\tag{4}
$$

と表せる。現在の点 $(r,\theta)$ にある染料の出発点は、式(2)を逆向きにたどった $(r,\theta-\Omega(r)t)$ である。したがって初期濃度(3)をその点で評価すれば

$$
\boxed{\displaystyle
q(r,\theta,t)=A B(r)
\exp\left(\frac{\cos[\theta-\omega_0(1+\beta r)t]-1}{0.55^2}\right).
}
\tag{5}
$$

粒子を前に追う式(2)では角度を**足し**、現在の画素での濃度を求める式(5)では元の位置へ角度を**引いて戻す**。

<a id="def-fcg2-scalar-snapshot"></a>

<!-- formal-statement-start -->
### 定義（厳密移流スカラー場の時刻別格子標本）

式(5)の濃度 $q:D\times[0,2\pi]\to[0,1]$、整数 $N=128$、$i,j\in\{0,\ldots,127\}$ に対し、セル中心

$$
x_i=\frac{i+1/2}{128}\ {\rm m},\quad
y_j=\frac{j+1/2}{128}\ {\rm m}
$$

を取る。節目時刻 $t_n=n\pi/2$ [s]（$n=0,\ldots,4$）の**時刻別格子標本**を

$$
Q^n_{ij}=q(x_i,y_j,t_n),\qquad k=i+128j
$$

と定め、$k$ 番目に格納する。配列は左下原点で横方向の添字が先に進む。連続再生中も式(5)を任意の時刻$t$で評価するため、描画フレームと節目番号$n$は別の概念である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fcg2-scalar-snapshot -->
**定義の確認**。セル$(i,j)=(97,64)$では $x=97.5/128$、$y=64.5/128$、したがって $X=0.26171875$、$Y=0.00390625$、$r\approx0.261748$。初期時刻$t_0=0$に式(3)を代入すると

$$
Q^0_{97,64}\approx0.899499,\qquad
k=97+128\cdot64=8289.
$$

このセルは初期染料の山の近くにある。
<!-- definition-example-end -->

### 受動染料は広がっても濃度を増やさない

式(1)の速度を直交座標で書くと $u_x=-\Omega(r)Y$、$u_y=\Omega(r)X$ である。$r>0$ では $r=\sqrt{X^2+Y^2}$ なので、連鎖律から

$$
\partial_xr=\frac{X}{r},\qquad \partial_yr=\frac{Y}{r}
$$

が得られる。したがって、積の微分を適用すると

$$
\partial_xu_x=-Y\,\Omega'(r)\frac{X}{r},
\qquad
\partial_yu_y=X\,\Omega'(r)\frac{Y}{r}.
$$

両者は符号が逆だから

$$
\nabla\cdot\boldsymbol u
=\partial_xu_x+\partial_yu_y
=-Y\,\Omega'(r)\frac{X}{r}
+X\,\Omega'(r)\frac{Y}{r}
=0.
$$

中心では $X=Y=0$ であり、例えば中心からの座標軸方向の変位 $h$ を取ると、$u_x(1/2+h,1/2)=0$、$u_y(1/2,1/2+h)=0$ が許される任意の $h$ について成立するから、$\partial_xu_x=\partial_yu_y=0$ となる。したがって中心を含む全領域で発散は0、**水は局所的に圧縮・膨張しない**。

<a id="prop-fcg2-grid-sum"></a>

<!-- formal-statement-start -->
### 命題（差動回転における染料の値域と面積積分保存）

$\omega_0,\beta\ge0$、$0\le A\le1$ とし、(1)、(3)、(5)に従うとする。任意の$t\in[0,2\pi]$ sで

$$
0\le q(x,y,t)\le A,\qquad
\int_Dq(x,y,t)\,dx\,dy=\int_Dq(x,y,0)\,dx\,dy.
\tag{6}
$$

濃度は無次元なので、この面積積分の単位はm$^2$である。
<!-- formal-statement-end -->

### 証明の見取り図

まず移流方程式を時間微分で確かめる。次に角度の積分を、各半径について一定角度だけずらして面積積分を比較する。

<!-- proof-start -->
### 証明

$0\le B(r)\le1$、$\cos\varphi-1\le0$ より、式(5)は $0\le q\le A$ を満たす。

$F(r,\varphi)=A B(r)\exp[(\cos\varphi-1)/0.55^2]$ と置くと、$q=F(r,\theta-\Omega(r)t)$ である。$r>0$ における第二引数の微分を $F_\varphi$ と表すと

$$
\partial_tq=-\Omega(r)F_\varphi,\qquad
\boldsymbol u\cdot\nabla q
=u_r\partial_rq+\frac{u_\theta}{r}\partial_\theta q
=0+\Omega(r)F_\varphi.
$$

両者の和は0だから式(4)を満たす。中心付近 $r<0.08$ m は$q\equiv0$なので同じ式が成り立つ。

染料は $r\in[0.08,0.44]$ m にしかなく、これは正方形の内側に完全に含まれる。極座標の面積要素は $r\,dr\,d\theta$ であるから

$$
\begin{aligned}
\int_Dq(t)\,dx\,dy
&=\int_{0.08}^{0.44}r\,dr
  \int_{-\pi}^{\pi}F(r,\theta-\Omega(r)t)\,d\theta\\
&=\int_{0.08}^{0.44}r\,dr
  \int_{-\pi}^{\pi}F(r,\varphi)\,d\varphi
=\int_Dq(0)\,dx\,dy.
\end{aligned}
$$

第二の等号では各 $r$ を固定して $\varphi=\theta-\Omega(r)t$ と置換した。$F$ は角度について$2\pi$周期なので積分区間の始点を変えても値は等しい。$\square$
<!-- proof-end -->

128×128の中点積分値は初期条件で約$0.0649331$ m$^2$。これは離散的な近似値であって、**連続領域での積分保存**と128×128の中点和・R8丸め後の総和が厳密に不変であることは区別する。

## 4. 濃度をR8テクスチャと画素色へ

式(5)で求めた $0\le Q\le1$ を、GPUへ送る前に8 bit整数へ変換する。

$$
m=\operatorname{round}(255Q),\qquad \widehat Q=\frac m{255}.
\tag{7}
$$

このR8正規化方式の根拠は[WGL17のR8符号化と復元](../../WGL/WGL17/index.md#def-wgl17-unorm)で学んだ。$\widehat Q$ はGLSLの sampler2D から読み出す濃度であり、整数$m$とは尺度が異なる。

<a id="def-fcg2-r8-snapshot"></a>

<!-- formal-statement-start -->
### 定義（表示用R8テクスチャ時刻スナップショット）

時刻 $t\in[0,2\pi]$で求めた128×128個の濃度を式(7)で丸め、$k=i+128j$ の下原点行順でGPUの R8 / RED / UNSIGNED_BYTE テクスチャへ送ったものを**表示用R8テクスチャ時刻スナップショット**という。復元濃度 $\widehat Q$ を描くRGBA偽色は

$$
C(\widehat Q)=
(0.025+0.975\widehat Q,\quad
0.07+0.69\widehat Q,\quad
0.13+0.09\widehat Q,\quad1)
\tag{8}
$$

で定義する。濃紺から琥珀色への表示は濃度の可視化であり、染料の発光・反射の物理モデルではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fcg2-r8-snapshot -->
**定義の確認**。初期セル$(97,64)$の値 $Q\approx0.899499$ なら $255Q\approx229.37$ なので $m=229$、$\widehat Q=229/255\approx0.898039$。式(8)を各成分8 bitへ丸めると

$$
(R,G,B,A)=(230,176,54,255)
$$

になる。このセルのbyte位置は8289番である。
<!-- definition-example-end -->

[WGL17の量子化誤差](../../WGL/WGL17/index.md#prop-wgl17-unorm-error)により $|Q-\widehat Q|\le1/510$。これは**濃度の符号化誤差**であり、RGBA画素の読み戻しとの階調誤差とは別に調べる。

JavaScriptは同じ解析濃度を毎描画時刻に再評価して二枚のR8テクスチャへ交互に転送する。GPUはそのテクスチャを**描画する役割**を持つ。[WGL18のGPU ping-pong更新](../../WGL/WGL18/index.md#def-wgl18-pingpong)ではGPU自身が次の時刻を計算するが、本講は厳密なCPU基準から画素までを追う。

## 5. 画素と格子の対応を検算する

描画バッファの幅 $W$、高さ $H$ [pixel] とし、下原点画素 $(p,s)$ の中心をUVで $((p+1/2)/W,(s+1/2)/H)$ と表す。テクスチャは128×128セルであり、NEAREST・texelFetchによって画素は一つのセルからだけ値を読む。

<a id="prop-fcg2-screen-cell"></a>

<!-- formal-statement-start -->
### 命題（画素中心と格子セルの一意な対応）

$W,H\ge1$ を整数、$0\le p<W$、$0\le s<H$ を整数とする。下原点128×128格子では、画素中心を含むセルの添字は

$$
i=\left\lfloor\frac{128(p+1/2)}W\right\rfloor,\qquad
j=\left\lfloor\frac{128(s+1/2)}H\right\rfloor,\qquad
k=i+128j
\tag{9}
$$

で一意に定まり、$0\le i,j\le127$ である。
<!-- formal-statement-end -->

### 証明の見取り図

画素中心のUVは開区間$(0,1)$に入る。128倍して長さ1の区間へ割り当てる。

<!-- proof-start -->
### 証明

$0\le p<W$ なら $0<(p+1/2)/W<1$。よって $0<128(p+1/2)/W<128$ であり、床関数は必ず0から127の整数を返す。$i$番のセルは $[i/128,(i+1)/128)$ なので、128倍した範囲は $[i,i+1)$ となり床関数はちょうど$i$。同様に縦の$j$も一意。横128個のセルを一行ずつ並べるので配列位置は$i+128j$である。$\square$
<!-- proof-end -->

例えば$W=H=512$、画素$(130,302)$は $i=\lfloor130.5/4\rfloor=32$、$j=\lfloor302.5/4\rfloor=75$。初期設定・時刻$\pi/2$ sのセル$(32,75)$は $Q\approx0.899499$ で、R8整数229、期待RGBA8は$(230,176,54,255)$。ブラウザのクリック座標は上原点なので、実装では縦座標を下原点に変換してからこの式を使う。

## 6. JS・頂点GLSL・フラグメントGLSLを改造する

- **density.js** は式(5)の concentration 関数で全128×128個の濃度をCPU計算し、R8へ符号化、gl.texSubImage2DでGPUへ転送する。omega、shear、amplitude、物理時刻を所有する。
- **density.vert** は画面全体を覆う三角形とUVを作り、どこを表示するかだけ決める。水の速度場は計算しない。
- **density.frag** はUVから128×128のセル番号を求め、texelFetchで濃度を取得し、式(8)で水の色と染料の色を混合する。

フラグメントシェーダの核心部分は次のとおり。

~~~glsl
ivec2 dims=textureSize(u_density,0);
ivec2 cell=clamp(ivec2(floor(v_uv*vec2(dims))),ivec2(0),dims-1);
float q=texelFetch(u_density,cell,0).r;
vec3 water=vec3(0.025,0.07,0.13);
vec3 dye=vec3(1.0,0.76,0.22);
outColor=vec4(mix(water,dye,q),1.0);
~~~

textureSizeを使っているため物理格子の寸法が画面の512×512 pixelだと誤解することはない。まずJSのshearを変更し**巻かれ方**が変わることを確認する。次にfragment shaderのdyeのRGBを変更し、**染料の表示色だけ**が変わることを確認する。最後にvertex shaderのUVを変更すると**どのセルを読むか**が変わる。編集したGLSLは実行時に毎回コンパイル・リンクされる。

選択セルの数値欄では、解析濃度→R8 byte→GPU実測RGBAを見られる。初期コードとGUIで許容した三つの物理パラメータの変更では、独立CPU基準とGPUの各色成分±2階調を照合する。自由編集コードではこの初期基準から異なることがあり、その差を直ちに不正解とは判定しない。

## 7. 演習と詳細解答

### Level A

<a id="ex-fcg2-a1"></a>
**A1. 回転速度の差。** $\omega_0=1$ s$^{-1}$、$\beta=3$ m$^{-1}$ とする。半径0.12 m、0.38 mの角速度と、$\pi/2$ s 後の角度差を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $\Omega(r)=1+3r$ なので $\Omega(0.12)=1.36$ s$^{-1}$、$\Omega(0.38)=2.14$ s$^{-1}$。式(2)より角度差は $(2.14-1.36)\pi/2=0.39\pi\approx1.225$ rad。外側ほど速いため差が正となる。
<!-- solution-end -->

<a id="ex-fcg2-a2"></a>
**A2. 初期濃度。** $(r,\theta)=(0.26,0)$ の初期濃度を求めよ。$r=0.5$ mでは時刻が進んでも濃度が0である理由を述べよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $r=0.26$ では $B(r)=(\max(0,1))^2=1$、$\cos0=1$ より指数因子も1なので $q_0=A=0.9$。$r=0.5$では $(r-0.26)/0.18>1$ なので $B(r)=0$。式(2)で半径は保存されるため、式(5)の濃度は全時刻で0である。
<!-- solution-end -->

<a id="ex-fcg2-a3"></a>
**A3. R8と色。** 濃度$Q=0.899499$をR8で符号化し、復元値と初期RGBA8を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $255Q=229.372245$ を丸めて $m=229$。復元値は$229/255\approx0.898039$。式(8)から赤は $\operatorname{round}(255\cdot0.025+0.975\cdot229)=230$、緑は $\operatorname{round}(255\cdot0.07+0.69\cdot229)=176$、青は $\operatorname{round}(255\cdot0.13+0.09\cdot229)=54$、不透明度は255。よって$(230,176,54,255)$。
<!-- solution-end -->

<a id="ex-fcg2-a4"></a>
**A4. 画素と格子。** 512×512画面の画素$(130,302)$は128×128のどのセル・配列位置を読むか。

- Level: A

<!-- solution-start -->
**詳細解答。** 式(9)から $i=\lfloor128(130.5)/512\rfloor=\lfloor32.625\rfloor=32$、$j=\lfloor128(302.5)/512\rfloor=\lfloor75.625\rfloor=75$。配列位置は $k=32+128\cdot75=9632$（0始まり）。GPU表示画素の座標と物理格子の添字を混同しない。
<!-- solution-end -->

### Level B

<a id="ex-fcg2-b1"></a>
**B1. 移流方程式。** $q=F(r,\theta-\Omega(r)t)$ が式(4)を満たすことを証明し、shear=0なら染料が変形しない理由を示せ。

- Level: B

<!-- solution-start -->
**詳細解答。** $\varphi=\theta-\Omega(r)t$ とする。$r$を固定した時間微分は $\partial_tq=-\Omega(r)F_\varphi$。式(1)から$u_r=0$、$u_\theta=r\Omega(r)$なので

$$
\boldsymbol u\cdot\nabla q
=u_r\partial_rq+\frac{u_\theta}{r}\partial_\theta q
=\Omega(r)F_\varphi.
$$

和は0で、移流方程式が成立する。shear=0では$\Omega(r)=\omega_0$は半径に依存しない。全ての半径で同じ角度$\omega_0t$だけ進むため、帯の形は保存され一体回転する。
<!-- solution-end -->

<a id="ex-fcg2-b2"></a>
**B2. 面積積分と丸め誤差。** 染料の面積積分が保存されることを示せ。また128×128の濃度中点和と、それをR8で丸めた中点和の差を評価せよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $q$ の台は半径$0.08$～$0.44$ mの環帯。極座標で

$$
\int_Dq(t)\,dx\,dy
=\int_{0.08}^{0.44}r\,dr\int_{-\pi}^{\pi}
F(r,\theta-\Omega(r)t)\,d\theta.
$$

各半径で$\varphi=\theta-\Omega(r)t$へ置換し、$F$の$2\pi$周期性を用いれば内側の角度積分は$t=0$と同じである。よって全積分が保存される。

中点和の差を$S-\widehat S=128^{-2}\sum(Q_{ij}-\widehat Q_{ij})$と書く。各セルの[量子化上界](../../WGL/WGL17/index.md#prop-wgl17-unorm-error)を適用し、三角不等式より

$$
|S-\widehat S|\le128^{-2}\sum_{ij}|Q_{ij}-\widehat Q_{ij}|
\le128^{-2}\cdot128^2\cdot\frac1{510}=\frac1{510}\ {\rm m}^2.
$$

これは同じ時刻の**量子化による差**であり、そもそもの中点和と連続積分の差とは別である。
<!-- solution-end -->

<a id="ex-fcg2-b3"></a>
**B3. 流れと表示色の分離。** omega=0、shear=0、amplitude=0の場合の染料をそれぞれ説明せよ。fragment shaderのdyeの色だけ変えた場合、移流方程式の解は変わるか。

- Level: B

<!-- solution-start -->
**詳細解答。** omega=0なら$\Omega(r)=0$、速度は全点0で、式(5)は時刻に依存せず静止する。shear=0なら$\Omega(r)=\omega_0$で、形を保って回転する。amplitude=0なら初期濃度$q_0=0$、式(5)も全時刻0だが、速度場(1)は依然存在する。GLSLのdyeは式(8)のRGB成分だけなので、これを変えてもJSで計算する$q$や$\boldsymbol u$には影響しない。
<!-- solution-end -->

### Level C

<a id="ex-fcg2-c1"></a>
**C1. 物理からGPU画素まで。** 初期値$\omega_0=1$ s$^{-1}$、$\beta=3$ m$^{-1}$、$A=0.9$で次を求めよ。(a) 初期の山$(r,\theta)=(0.26,0)$が$\pi/2$ s後に移動する位置。(b) 初期セル$(97,64)$と、$\pi/2$ s後のセル$(32,75)$の濃度、R8整数。(c) 512×512画面で時刻$\pi/2$ sの画素$(130,302)$に期待するRGBA8。(d) shear=0に変えたときの(a)の位置と帯の形状変化。

- Level: C

<!-- solution-start -->
**詳細解答。** (a) 半径$r=0.26$での角速度は$\Omega(r)=1+3\cdot0.26=1.78$ s$^{-1}$。したがって$\theta(\pi/2)=1.78\pi/2=0.89\pi$ rad。直交座標では

$$
(x,y)=\left(\frac12+0.26\cos(0.89\pi),\
\frac12+0.26\sin(0.89\pi)\right)
\approx(0.256,\ 0.588)\ {\rm m}.
$$

(b) $(97,64)$のセル中心は$(97.5/128,64.5/128)$で、$r\approx0.261748$、$\theta\approx0.01492$。$t=0$を式(5)に代入すると

$$
Q^0_{97,64}\approx0.899499,\qquad
m^0_{97,64}=\operatorname{round}(255Q^0_{97,64})=229.
$$

一方、$(32,75)$のセル中心は$(32.5/128,75.5/128)$、半径$r\approx0.261981$、角度$\theta\approx2.7916$ rad。出発角は$\theta-(1+3r)\pi/2$で、ほぼ0になるため

$$
Q^1_{32,75}=0.9B(r)\exp\left(
\frac{\cos[\theta-(1+3r)\pi/2]-1}{0.55^2}\right)
\approx0.899499,\qquad m^1_{32,75}=229.
$$

二セルは山の近くにあるが、セル中心は厳密な粒子の出発点と到着点そのものではないので、二つの濃度が数学的に同値だとは主張しない。

(c) 式(9)から画素$(130,302)$はセル$(32,75)$を読む。したがって$m=229$をGLSLで$\widehat Q=229/255$に復元し、式(8)の色$(230,176,54,255)$を予測する。

(d) shear=0では全半径$\Omega(r)=1$ s$^{-1}$。山の角度は$\pi/2$ radとなり、位置は$(0.5,0.76)$ m。全ての半径で角度増分が同一なので、帯は伸びずに回転だけを行う。これは色の描き替えではなく、輸送の仕組みを変えた結果である。
<!-- solution-end -->

## 8. 次の講義・参考デモ

本講では、**既知の非圧縮速度場で染料が引き伸ばされる物理と、厳密濃度を格子・R8・GLSLへ渡す表示**を結び付けた。次の[FCG3](../FCG3/index.md)では、この厳密値を基準として移流方程式を数値近似し、格子による移流の近似で染料の輪郭がぼやける理由を分析する。本講の物理的な伸長と、FCG3の補間に伴うぼやけは異なる現象である。

参考となる外部デモは [Pavel Dobryakov の WebGL Fluid Simulation](https://paveldogreat.github.io/WebGL-Fluid-Simulation/)（染料と流れの直接操作）および [NVIDIA GPU Gems, Chapter 38: Fast Fluid Dynamics Simulation on the GPU](https://developer.nvidia.com/gpugems/gpugems/part-vi-beyond-triangles/chapter-38-fast-fluid-dynamics-simulation-gpu)（受動スカラーの移流とGPU実装）。本講はこれらのUI・説明方法を参考に、独自の解析的差動回転モデルを実装している。
