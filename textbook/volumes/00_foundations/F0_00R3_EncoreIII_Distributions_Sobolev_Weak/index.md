# F0-00R3 Encore III：Distributions, Sobolev Spaces & Weak Solutions

Encore IIでは、Fourier解析と古典的PDE、Sturm--Liouvilleまで進みました。

Encore IIIでは、古典解が十分滑らかでない場合にもPDEを扱えるように数学を拡張します。

通常カリキュラム、確率論系列、RKHS系列には必須ではありません。

ただしEncore IIIへ入った場合は、未定義の主要概念を飛ばさず次の順で進みます。

---

## 1. 標準通読ルート

```text
既存前提
F0-00D2   Lebesgue積分・Lp
F0-02C1   Hilbert空間
F0-02C2   双対空間・Riesz
F0-00PDE3 Sturm--Liouville・弱解への入口
      │
      └── Encore III START
             ↓
F0-00DS1   Schwartz超関数・テスト関数・Dirac delta
             ↓
F0-00DS2   超関数微分・弱微分
             ↓
F0-00SOB1  Sobolev空間 W^{k,p}・H^k
             ↓
F0-00SOB2  H_0^1・Poincare・trace
             ↓
F0-00WK1   弱形式・変分形式・Poisson方程式
             ↓
F0-00WK2   Lax--Milgram・存在一意性
             ↓
F0-00WK3   楕円型PDE・Galerkin・FEM
```

---

## 2. なぜSchwartz超関数から始めるのか

古典微分できない関数やDirac deltaを扱いたいからです。

$$
\langle\delta_0,\varphi\rangle
=\varphi(0)
$$

と、対象をテスト関数へ作用する線形汎関数として扱います。

これにより

$$
\langle T',\varphi\rangle
=-\langle T,\varphi'\rangle
$$

として微分を定義できます。

---

## 3. 弱微分からSobolev空間へ

超関数微分が再びLp関数で表せる場合、その関数を弱微分と呼びます。

そして

$$
W^{k,p}(\Omega)
=
\{u:D^\alpha u\in L^p,\ |\alpha|\le k\}
$$

を作ります。

特に

$$
H^1=W^{1,2}
$$

はHilbert空間です。

---

## 4. 境界条件をH0^1で表す

零Dirichlet境界条件は

$$
H_0^1(\Omega)
=
\overline{C_c^\infty(\Omega)}^{H^1}
$$

で表します。

Poincare不等式

$$
\|u\|_2
\le C_P\|\nabla u\|_2
$$

により、勾配だけでH0^1ノルムを制御できるようになります。

これがLax--Milgramのcoercivityへ直結します。

---

## 5. PDEを弱形式へ変える

Poisson方程式

$$
-\Delta u=f
$$

にテスト関数を掛け、部分積分すると

$$
\boxed{
\int_\Omega\nabla u\cdot\nabla v
=
\int_\Omega fv
}
$$

を得ます。

二階微分を要求するPDEが、一階弱微分だけで意味を持つHilbert空間上の方程式へ変わります。

---

## 6. Lax--Milgramで存在一意性を得る

抽象的に

$$
a(u,v)=F(v)
$$

を考えます。

$a$ が連続かつcoerciveなら

$$
\boxed{
\exists!u\in V:a(u,v)=F(v)
\quad(\forall v\in V)
}
$$

です。

Encore IIIではこれを定理として置くだけでなく、Riesz表現から作用素を構成し、単射・閉range・稠密range・全射まで証明します。

---

## 7. 最後はGalerkin/FEMへ

有限次元部分空間

$$
V_h\subset V
$$

へ制限して

$$
a(u_h,v_h)=F(v_h)
$$

を解けば連立一次方程式になります。

Galerkin直交性とCeaの補題から

$$
\|u-u_h\|
\le
\frac M\alpha
\inf_{w_h\in V_h}\|u-w_h\|
$$

を得ます。

弱解理論がそのまま有限要素法の理論基盤になります。

---

## 8. Encore IIとの関係

Encore IIではFourier基底・固有関数を使って、滑らかで構造のよいPDEを明示的に解きました。

Encore IIIではSobolev空間・変分形式へ移り、より複雑な領域・係数・低正則性を扱います。

$$
\boxed{
\text{Encore II：古典解・スペクトル解法}
\longrightarrow
\text{Encore III：弱解・変分解法}
}
$$

---

## 9. Encore IIIの停止線

Encore IIIはSchwartz超関数、弱微分、Sobolev空間、Poincare・trace、弱形式、Lax--Milgram、線形二階楕円型PDE、Galerkin/FEMの理論橋までです。

一般Sobolev embeddingの完全証明、Rellich--Kondrachov、非線形PDE、Navier--Stokes等は必須にしません。

---

## 10. 所要時間

本編7講とロードマップを合計して約30時間を想定します。

---

## 11. 最終的な景色

```text
Fourier解析・古典PDE
        ↓
Schwartz超関数
        ↓
弱微分
        ↓
Sobolev空間 ───→ Hilbert空間・双対空間
        ↓                    ↓
H0^1・Poincare         Riesz表現
        ↓                    ↓
       弱形式 a(u,v)=F(v)
                ↓
          Lax--Milgram
                ↓
          Galerkin / FEM
```

---

## 12. 次のEncore：FEMを実際に計算する

WK3でGalerkin/FEMの理論橋まで到達した後、mesh・基底関数・element matrix・assembly・疎solver・誤差評価まで実装寄りに進みたい場合は

[Encore V：Numerical Analysis, FEM & Monte Carlo](../F0_00R5_EncoreV_Numerical_FEM_MonteCarlo/index.md)

へ進みます。

Encore VはEncore IIIの必須続編ではありません。**弱解理論で止まる読者はここで終了でき、数値計算まで進む読者だけ乗り換える**設計です。

**Encore III: Distributions, Sobolev Spaces & Weak Solutions** はここまでです。
