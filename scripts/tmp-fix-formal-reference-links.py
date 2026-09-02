from pathlib import Path

ROOT = Path('textbook/volumes')


def p(rel): return ROOT / rel / 'index.md'

def read(rel): return p(rel).read_text()

def write(rel, s):
    p(rel).write_text(s)
    print('updated', rel)

def anchor_before(rel, needle, anchor):
    s = read(rel)
    tag = f'<a id="{anchor}"></a>'
    if tag in s:
        return
    if needle not in s:
        raise SystemExit(f'{rel}: anchor needle missing: {needle}')
    s = s.replace(needle, tag + '\n\n' + needle, 1)
    write(rel, s)

def repl(rel, old, new):
    s = read(rel)
    if old not in s:
        if new in s:
            return
        raise SystemExit(f'{rel}: replace needle missing: {old[:100]}')
    s = s.replace(old, new)
    write(rel, s)

# Stable canonical theorem / derivation anchors.
anchor_before('00_foundations/F0_00E_ベクトル空間_基底_Gram_Schmidt_直交射影', '## 5. 基底と座標', 'ref-basis-dimension')
anchor_before('00_foundations/F0_00E_ベクトル空間_基底_Gram_Schmidt_直交射影', '## 9. 基底延長定理', 'thm-basis-extension')
anchor_before('00_foundations/F0_00D2A_単関数_Lebesgue積分_構成', '### 定理（単関数近似）', 'thm-simple-function-approximation')
anchor_before('00_foundations/F0_00D2B_単調収束_Fatou_優収束', '## 1. 単調収束定理', 'ref-limit-integral-exchange')
anchor_before('00_foundations/F0_00D2C_積測度_Tonelli_Fubini', '### 定理（Tonelli）', 'thm-tonelli')
anchor_before('00_foundations/F0_00D4_Lebesgue測度_Borel集合_拡張定理', '## 14. Carathéodory拡張定理', 'thm-caratheodory-extension')
anchor_before('00_foundations/F0_00D_Cauchy列_完備性_無限次元', '## 2. 収束列は必ずコーシー列', 'thm-convergent-implies-cauchy')
anchor_before('00_foundations/F0_00P4_収束_Borel_Cantelli_一様可積分性', '## 4. Borel--Cantelli第1補題', 'thm-borel-cantelli-1')
anchor_before('00_foundations/F0_00P5_大数の強法則', '## 3. Kolmogorov最大不等式', 'thm-kolmogorov-maximal')
anchor_before('00_foundations/F0_00P5A_truncation_Kronecker_一般SLLN', '## 1. まず大きすぎる観測を切る', 'ref-general-slln-proof')
anchor_before('00_foundations/F0_00P5A_truncation_Kronecker_一般SLLN', '## 3. Kolmogorov収束定理', 'thm-kolmogorov-convergence')
anchor_before('00_foundations/F0_00P5A_truncation_Kronecker_一般SLLN', '## 4. Kronecker補題', 'thm-kronecker')
anchor_before('00_foundations/F0_00P6_特性関数_中心極限定理', '## 8. Levy連続性定理', 'thm-levy-continuity')
anchor_before('00_foundations/F0_00P6A_iid_中心極限定理', '## 1. 中心極限定理の設定', 'thm-iid-clt')
anchor_before('00_foundations/F0_00A3_半順序_Zorn_極大延長', '## 5. Zornの補題', 'thm-zorn')
anchor_before('00_foundations/F0_02C1A_Hilbert射影定理_直交分解', '## 1. Hilbert空間の射影定理', 'thm-hilbert-projection')
anchor_before('00_foundations/F0_02B_分離超平面定理_Farkas_SVM', '## 6. 分離超平面定理を射影から導く', 'ref-farkas-from-separation')
anchor_before('00_foundations/F0_02B_分離超平面定理_Farkas_SVM', '## 9. Farkasの補題', 'thm-farkas')
anchor_before('00_foundations/F0_02B_分離超平面定理_Farkas_SVM', '## 13. polar coneの公式', 'ref-polar-cone-formula')
anchor_before('00_foundations/F0_02A_KKT条件の導出_接錐_polar_Farkas', '## 4. 局所最小性から最初の一次必要条件を導く', 'ref-kkt-derivation')
anchor_before('00_foundations/F0_02_制約付き最適化_双対_KKT', '## 2. 不等式制約のLagrangian', 'ref-duality-construction')
anchor_before('00_foundations/F0_02_制約付き最適化_双対_KKT', '## 5. KKT条件は何をまとめたものか', 'ref-kkt-overview')

# Direct theorem dependencies: chapter-top links or bare prose become precise links.
repl('00_foundations/F0_00D1_ノルム_Banach_有限次元_無限次元',
     '主に F0-00E の基底・次元ですが',
     '主に [F0-00E の基底・次元](../F0_00E_ベクトル空間_基底_Gram_Schmidt_直交射影/index.md#ref-basis-dimension) ですが')
repl('00_foundations/F0_00D2A_単関数_Lebesgue積分_構成',
     '次講D2Bでは、この構成が単調極限と非常に相性がよいことを使って、極限と積分の交換定理を証明します。',
     '次講 [D2Bの極限と積分の交換定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#ref-limit-integral-exchange) では、この構成が単調極限と非常に相性がよいことを使って証明を進めます。')
repl('00_foundations/F0_00D2C_積測度_Tonelli_Fubini',
     'D2Aの単関数近似定理から、非負単関数列 $\\phi_n\\uparrow f$ を取れます。',
     '[D2Aの単関数近似定理](../F0_00D2A_単関数_Lebesgue積分_構成/index.md#thm-simple-function-approximation)から、非負単関数列 $\\phi_n\\uparrow f$ を取れます。')
repl('00_foundations/F0_00D_Cauchy列_完備性_無限次元',
     '前節の命題より $(q_n)$ はコーシー列です。',
     '[前節の「収束列はコーシー列」](#thm-convergent-implies-cauchy)より $(q_n)$ はコーシー列です。')
repl('00_foundations/F0_00F_線形写像_固有空間_スペクトル定理_SVD',
     'F0-00Eの基底延長定理により、',
     '[F0-00Eの基底延長定理](../F0_00E_ベクトル空間_基底_Gram_Schmidt_直交射影/index.md#thm-basis-extension)により、')
repl('00_foundations/F0_00P5A_truncation_Kronecker_一般SLLN',
     '証明の核はP5の最大不等式です。',
     '証明の核は[P5のKolmogorov最大不等式](../F0_00P5_大数の強法則/index.md#thm-kolmogorov-maximal)です。')
repl('00_foundations/F0_00P5_大数の強法則',
     '前章のBorel--Cantelli第1補題から',
     '[前章のBorel--Cantelli第1補題](../F0_00P4_収束_Borel_Cantelli_一様可積分性/index.md#thm-borel-cantelli-1)から')
repl('00_foundations/F0_00P5_大数の強法則',
     '[F0-00P5A](../F0_00P5A_truncation_Kronecker_一般SLLN/index.md)',
     '[F0-00P5Aの一般独立同分布強大数則の証明](../F0_00P5A_truncation_Kronecker_一般SLLN/index.md#ref-general-slln-proof)')
repl('00_foundations/F0_00P6A_iid_中心極限定理',
     'P6で準備した特性関数とLévy連続性定理を使い、',
     'P6で準備した特性関数と[Lévy連続性定理](../F0_00P6_特性関数_中心極限定理/index.md#thm-levy-continuity)を使い、')
repl('00_foundations/F0_00P6_特性関数_中心極限定理',
     '中心極限定理の証明はP6Aへ分離します。',
     '中心極限定理の証明は[P6Aの独立同分布中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt)へ分離します。')
repl('00_foundations/F0_00P7A_MLE_一致性_漸近正規性',
     '[P6Aの中心極限定理](../F0_00P6A_iid_中心極限定理/index.md)',
     '[P6Aの中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt)')
repl('00_foundations/F0_00P7B_QMD_LAN',
     'P6Aの中心極限定理から',
     '[P6Aの中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt)から')
repl('00_foundations/F0_00FA3_Plancherel_L2_特性関数',
     '[F0-00P6 特性関数・Levy連続性定理・中心極限定理](../F0_00P6_特性関数_中心極限定理/index.md) では、特性関数を使ってCLTを導きました。',
     '[F0-00P6Aの独立同分布中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt) では、特性関数を使ってCLTを導きました。')
repl('00_foundations/F0_00P_確率論_測度論から統計理論へ',
     'P6Aの独立同分布 中心極限定理',
     '[P6Aの独立同分布 中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt)')
repl('00_foundations/F0_00P_確率論_測度論から統計理論へ',
     '**Kolmogorov収束定理とKronecker補題はP5Aで証明を閉じました**',
     '**[Kolmogorov収束定理](../F0_00P5A_truncation_Kronecker_一般SLLN/index.md#thm-kolmogorov-convergence)と[Kronecker補題](../F0_00P5A_truncation_Kronecker_一般SLLN/index.md#thm-kronecker)はP5Aで証明を閉じました**')
repl('00_foundations/F0_02C2_線形汎関数_双対空間_Riesz',
     'F0-02C1Aの射影定理から',
     '[F0-02C1AのHilbert射影定理](../F0_02C1A_Hilbert射影定理_直交分解/index.md#thm-hilbert-projection)から')
repl('00_foundations/F0_02C6A_分離定理_Minkowski_Farkas',
     'F0-02C1の射影定理から最近点',
     '[F0-02C1AのHilbert射影定理](../F0_02C1A_Hilbert射影定理_直交分解/index.md#thm-hilbert-projection)から最近点')
repl('00_foundations/F0_02C6_Hahn_Banach_分離定理',
     'F0-00A2のZornの補題により、',
     '[F0-00A3のZornの補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn)により、')
repl('00_foundations/F0_02B_分離超平面定理_Farkas_SVM',
     '前節の公式から',
     '[前節のpolar coneの公式](#ref-polar-cone-formula)から')

# Farkas proof-chain links all point to the actual derivation, not page top.
for rel in ['00_foundations/F0_02A_KKT条件の導出_接錐_polar_Farkas', '00_foundations/F0_02_制約付き最適化_双対_KKT']:
    s = read(rel)
    s = s.replace('../F0_02B_分離超平面定理_Farkas_SVM/index.md)', '../F0_02B_分離超平面定理_Farkas_SVM/index.md#ref-farkas-from-separation)')
    write(rel, s)

# KKT derivation links all point to the derivation start.
rel = '00_foundations/F0_02_制約付き最適化_双対_KKT'
s = read(rel)
s = s.replace('../F0_02A_KKT条件の導出_接錐_polar_Farkas/index.md)', '../F0_02A_KKT条件の導出_接錐_polar_Farkas/index.md#ref-kkt-derivation)')
s = s.replace('F0-02Aの接錐・polar cone・Farkasの補講へ辿れる。', '[F0-02Aの接錐・polar cone・Farkasの補講](../F0_02A_KKT条件の導出_接錐_polar_Farkas/index.md#ref-kkt-derivation)へ辿れる。')
s = s.replace('F0-02Bへ辿れる。', '[F0-02B](../F0_02B_分離超平面定理_Farkas_SVM/index.md#ref-farkas-from-separation)へ辿れる。')
write(rel, s)

# Engineering SVM references split between dual construction and KKT overview.
repl('05_engineering/E1_04_プロビット_非線形回帰_SVM',
     '[F0-02 制約付き最適化・双対問題・KKT条件](../../00_foundations/F0_02_制約付き最適化_双対_KKT/index.md) を参照してください。',
     '[F0-02の双対性の構成](../../00_foundations/F0_02_制約付き最適化_双対_KKT/index.md#ref-duality-construction) を参照してください。')
# The second occurrence now may have been replaced too; restore its more suitable target by context.
rel = '05_engineering/E1_04_プロビット_非線形回帰_SVM'
s = read(rel)
s = s.replace('一般のKKT条件、activeな制約、弱双対性・強双対性まで含めた説明は [F0-02の双対性の構成](../../00_foundations/F0_02_制約付き最適化_双対_KKT/index.md#ref-duality-construction) を参照してください。',
              '一般のKKT条件、activeな制約、弱双対性・強双対性まで含めた説明は [F0-02のKKT条件の整理](../../00_foundations/F0_02_制約付き最適化_双対_KKT/index.md#ref-kkt-overview) を参照してください。')
write(rel, s)

# A plain named theorem used outside foundations should also jump to its canonical statement.
repl('01_probability/P2_01_確率変数_pmf_pdf_cdf',
     'トネリの定理により積分順序を扱えます。',
     '[Tonelliの定理](../../00_foundations/F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-tonelli)により積分順序を扱えます。')

# D2C previously promised proofs in D4 that D4 does not actually contain. Make the dependency truthful.
rel = '00_foundations/F0_00D2C_積測度_Tonelli_Fubini'
s = read(rel)
s = s.replace('標準ルートではこの定理をここで明示的に受け入れ、完全証明はD4「Lebesgue測度・Borel集合・拡張定理」で行います。これは未表示の黒箱ではなく、監査ID `TODO-P1-D2-07` の証明位置をD4へ固定したものです。',
              '標準ルートではこの定理をここで明示的に受け入れます。一般の拡張原理は[D4のCarathéodory拡張定理](../F0_00D4_Lebesgue測度_Borel集合_拡張定理/index.md#thm-caratheodory-extension)で確認できますが、積測度の存在一意性までの完全証明は監査ID `TODO-P1-D2-07` の未完タスクとして扱います。')
s = s.replace('これはD4で積測度の構成と合わせて証明する「section測度補題」により、',
              'ここでは「section測度補題」を積測度構成と一緒に黒箱として受け入れます。この完全証明も `TODO-P1-D2-07` の未完タスクです。補題により、')
s = s.replace('この補題の完全証明も、積測度存在定理と同じD4に置きます。',
              'したがって、この段階ではsection測度補題だけが未証明の依存として残ります。')
s = s.replace('**積測度構成とsection測度補題だけがD4へ明示的に繰り延べ**',
              '**積測度構成とsection測度補題だけが `TODO-P1-D2-07` として明示的に繰り延べ**')
write(rel, s)

print('formal reference fixes complete')
