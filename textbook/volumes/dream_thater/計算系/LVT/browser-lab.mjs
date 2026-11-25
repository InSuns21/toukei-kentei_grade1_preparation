// The canonical lab files remain the only source of definitions and proofs.
export const lessons = {
  'LVT1-01': { module:'LvtIntro', modes:[
    ['Oracle.lean','計算・テスト・証明','true, false, false の順に表示。すべての #guard と定理が通る。','\n#eval main\n'],
    ['Failure.lean','意図したテスト失敗','入力2がtrueという誤った #guard が拒否される。']
  ], commands:'lake build\nlake test\npython3 compare.py\nlake env lean Failure.lean' },
  'LVT1-02': { module:'LvtEnvironment', modes:[
    ['Inspect.lean','型・値・証明','bump の型 Nat → Nat、入力2の型 Nat、評価値3、bump_zeroの命題を確認。'],
    ['Main.lean','具体例の検査','2つの #guard が通り、3を表示。','\n#eval main\n'],
    ['Failure.lean','意図した型エラー','bump true で Bool と Nat の型不一致。'],
    ['ExerciseSolutions.lean','演習解答の検査','具体値8、6、6と定理を確認。']
  ], commands:'elan show\nlean --version\nlake --version\nlake build\nlake test\nlake env lean Inspect.lean\nlake env lean ExerciseSolutions.lean\nlake env lean Failure.lean' },
  'LVT1-03': { module:'LvtTypes', modes:[
    ['Inspect.lean','型と着手の結果','none、some x、占有されたマスの error を確認。'],
    ['Main.lean','具体例の検査','すべての #guard が通り、LVT1-03 OK を表示。','\n#eval main\n'],
    ['Failure.lean','意図した型エラー','Cell.occupied true が拒否される。'],
    ['ExerciseSolutions.lean','演習解答の検査','すべての #guard と定理が通る。']
  ] },
  'LVT1-04': { module:'LvtRecursion', modes:[
    ['Inspect.lean','再帰計算','7、1、0、0 の順に表示。'],
    ['Main.lean','具体例の検査','すべての #guard が通り、LVT1-04 OK を表示。','\n#eval main\n'],
    ['Failure.lean','意図した停止性エラー','入力が減らない loop の定義が拒否される。'],
    ['ExerciseSolutions.lean','演習解答の検査','すべての #guard と定理が通る。']
  ] },
  'LVT1-05': { module:'LvtIndexing', modes:[
    ['Inspect.lean','安全な添字','some 7、none、some 0、5 の順に表示。'],
    ['Main.lean','具体例の検査','すべての #guard が通り、LVT1-05 OK を表示。','\n#eval main\n'],
    ['Failure.lean','意図した範囲エラー','Fin 3 に3を入れる証明が失敗する。'],
    ['ExerciseSolutions.lean','演習解答の検査','すべての #guard と定理が通る。']
  ] },
  'LVT1-06': { module:'LvtBoundary', modes:[
    ['Inspect.lean','盤面と入力境界','ok 001000000、error outOfRange、error malformed、error occupied、ok 010000000。'],
    ['Main.lean','具体例の検査','すべての #guard が通り、LVT1-06 OK を表示。','\n#eval main\n'],
    ['Boundary.lean','実行入口を試す','文字列2、9、abcの出力を確認。引数を書き換えて試す。','\n#eval main ["2"]\n#eval main ["9"]\n#eval main ["abc"]\n'],
    ['ExerciseSolutions.lean','演習解答の検査','すべての #guard が通る。']
  ], commands:'lake build\nlake test\nlake env lean Inspect.lean\nlake env lean ExerciseSolutions.lean\nlake env lean --run Boundary.lean 2\nlake env lean --run Boundary.lean 9\nlake env lean --run Boundary.lean abc\npython3 check_boundary.py' },
  'LVT2-01': { module:'LvtDecision', modes:[
    ['Inspect.lean','命題と判定','true、false、true、false の順に表示。型と証明を確認。'],
    ['Main.lean','具体例の検査','すべての #guard が通り、LVT2-01 OK を表示。','\n#eval main\n'],
    ['Inspect.lean','誤った判定器の反例','sameNumber 2 3 は false、wrongMatches 2 3 は true。','\n#eval sameNumber 2 3\n#eval wrongMatches 2 3\n'],
    ['ExerciseSolutions.lean','演習解答の検査','すべての #guard と証明が通る。'],
    ['Export.lean','81組の判定結果','n,k,正しい判定,誤った判定の4列を81行出力。','\n#eval main\n']
  ], commands:'lake build\nlake test\nlake env lean Inspect.lean\nlake env lean ExerciseSolutions.lean\npython3 check_matches.py' },
  'LVT2-02': { module:'LvtLogic', modes:[
    ['Inspect.lean','論理操作と証明の型','連言・選言・存在の構成子、分配と射影の型を確認。'],
    ['Main.lean','複合仕様の証明','二つの証明が通り、LVT2-02 OK を表示。','\n#eval main\n'],
    ['ExerciseSolutions.lean','演習解答の検査','全9題の証明項を検査。'],
    ['Failure.lean','意図した型エラー','選言を連言として返すと型不一致になる。']
  ] },
  'LVT2-03': { module:'LvtEquality', modes:[
    ['Inspect.lean','等式と書換えの型','Eq.refl、Eq.subst、congrArg と加算の等式の型、normalize 7 の値 7 を確認。'],
    ['Main.lean','正規化と仕様保存','等式と仕様保存の証明が通り、LVT2-03 OK を表示。','\n#eval main\n'],
    ['ExerciseSolutions.lean','演習解答の検査','全9題の証明を検査。'],
    ['Failure.lean','意図した等式エラー','根拠のない rfl と逆向きの証明が拒否される。']
  ] },
  'LVT2-04': { module:'LvtTactics', modes:[
    ['Inspect.lean','証明状態を読む','intro、apply、exact、constructor、cases の各段階を確認。'],
    ['Main.lean','局所補題による証明','LVT2-04 OK を表示。','\n#eval main\n'],
    ['ExerciseSolutions.lean','演習解答の検査','全9題の証明を検査。'],
    ['Failure.lean','意図した型エラー','連言をその片側として渡すと型不一致になる。']
  ] },
  'LVT2-05': { module:'LvtInduction', modes:[
    ['Inspect.lean','構造帰納法と反転','3、[1, 2, 3]、[3, 2, 1]、[1, 2, 3] の計算値と定理の型を確認。'],
    ['Main.lean','連結・反転の検査','LVT2-05 OK を表示。','\n#eval main\n'],
    ['ExerciseSolutions.lean','演習解答の検査','全8題の証明を検査。'],
    ['Failure.lean','帰納仮定の型不一致','帰納仮定をステップの目標にそのまま渡すと型不一致になる。']
  ] },
  'LVT2-06': { module:'LvtPredicates', modes:[
    ['Inspect.lean','到達証明と整列証明','構成子の型と具体的な到達・整列証明を確認。'],
    ['Main.lean','到達不能性と整列性','LVT2-06 OK を表示。','\n#eval main\n'],
    ['ExerciseSolutions.lean','演習解答の検査','全8題の証明を検査。'],
    ['Failure.lean','終点の型不一致','base を異なる終点への証明として渡すと拒否される。']
  ] },
  'LVT2-07': { module:'LvtDependent', modes:[
    ['Inspect.lean','依存型と容量制約','8、5、[7, 8, 9]、some 3、none と型を確認。'],
    ['Main.lean','長さと予約の検査','LVT2-07 OK を表示。','\n#eval main\n'],
    ['ExerciseSolutions.lean','演習解答の検査','全8題の証明を検査。'],
    ['Failure.lean','長さの型不一致','SizedL 2 を SizedL 3 として返すと拒否される。']
  ] },
  'LVT2-08': { module:'LvtAutomation', modes:[
    ['Inspect.lean','定理探索・公理依存','補題の型、exact? の候補、true と false、正常系の公理依存を確認。'],
    ['Main.lean','線形算術と外部判定','LVT2-08 OK を表示。','\n#eval main\n'],
    ['ExerciseSolutions.lean','演習解答の検査','通常系の証明とその公理依存を確認。'],
    ['TrustDemo.lean','意図的に不正な証明を受理させる','sorry の警告と claimedFits、sorryAx の依存を確認。正常系には取り込まない。'],
    ['Failure.lean','意図した型エラー','True.intro を偽の比較の証明として渡すと拒否される。']
  ], commands:'lake build\nlake test\nlake env lean Inspect.lean\nlake env lean ExerciseSolutions.lean\nlake env lean TrustDemo.lean\nlake env lean Failure.lean' },
  'LVT3-01': { module:'LvtContracts', modes:[
    ['Inspect.lean','在庫引当の結果と証明の型','some 3、some 0、none、none、none と公理依存を確認。'],
    ['Main.lean','成功・不足・数量ゼロ','LVT3-01 OK を表示。','\n#eval main\n'],
    ['ExerciseSolutions.lean','演習解答の検査','全9題の証明を検査。'],
    ['Failure.lean','弱い仕様の証明は流用できない','型不一致で拒否される。']
  ] },
  'LVT3-02': { module:'LvtTermination', modes:[
    ['Inspect.lean','予算と結果','none、some 10、some 7、10 と公理依存を確認。'],
    ['Main.lean','境界のテスト','LVT3-02 OK を表示。','\n#eval main\n'],
    ['ExerciseSolutions.lean','演習解答の検査','全8題の命題を検査。'],
    ['Failure.lean','部分正当性は停止性ではない','型不一致で拒否される。']
  ] },
  'LVT3-03': { module:'LvtListCorrectness', modes:[
    ['Inspect.lean','写像・反転・累積引数','[]、[3,3,1]、[3,2]、[3,2,9] と公理依存を確認。'],
    ['Main.lean','境界のテスト','LVT3-03 OK を表示。','\n#eval main\n'],
    ['ExerciseSolutions.lean','演習解答の検査','全8題の命題を検査。'],
    ['Failure.lean','長さの等式では足りない','型不一致で拒否される。']
  ] },
  'LVT3-04': { module:'LvtSorting', modes:[
    ['Inspect.lean','整列・重複要素の保存','[]、[0,1,3,3]、2、0 と公理依存を確認。'],
    ['Main.lean','境界と誤実装のテスト','LVT3-04 OK を表示。','\n#eval main\n'],
    ['ExerciseSolutions.lean','演習解答の検査','全8題の証明を検査。'],
    ['Failure.lean','整列性だけでは足りない','型不一致で拒否される。']
  ] },
  'LVT3-05': { module:'LvtTransitions', modes:[
    ['Inspect.lean','成功・拒否・到達不能な入力','some 2、none、none、some 1 と定理の型・公理依存を確認。'],
    ['Main.lean','境界と成功した遷移','LVT3-05 OK を表示。','\n#eval main\n'],
    ['ExerciseSolutions.lean','演習解答の検査','全8題の証明を検査。'],
    ['Failure.lean','拒否された遷移の証明','容量4で up を選ぶと none なので Step 4 6 の証明が拒否される。']
  ] },
  'LVT3-06': { module:'LvtGame', modes:[
    ['Inspect.lean','反対角線と終局後の拒否','盤面、勝利 true、拒否 true、引き分け盤面と公理依存を確認。'],
    ['Main.lean','範囲外・重複・勝利・満盤','LVT3-06 OK を表示。','\n#eval main\n'],
    ['ExerciseSolutions.lean','演習解答の検査','全8題の命題を検査。'],
    ['Failure.lean','範囲外の着手は成功しない','none の等式を some の等式として使おうとすると型不一致。']
  ] },
  'LVT3-07': { module:'LvtRefinement', modes:[
    ['Inspect.lean','抽象状態・応答列・変異の違い','左 false・右 true、one、双方の応答列と変異の true / false を確認。'],
    ['Main.lean','成功・拒否・誤実装のテスト','LVT3-07 OK を表示。','\n#eval main\n'],
    ['ExerciseSolutions.lean','演習解答の検査','全8題の命題を検査。'],
    ['Failure.lean','満杯で成功を返す誤実装','some の等式を none の等式として使おうとすると型不一致。']
  ] },
  'LVT3-08': { module:'LvtHoare', modes:[
    ['Inspect.lean','加算ループ・初期値・変異','0、7、11、3 と公理依存を確認。'],
    ['Main.lean','境界と誤実装のテスト','LVT3-08 OK を表示。','\n#eval main\n'],
    ['ExerciseSolutions.lean','演習解答の検査','全8題の命題を検査。'],
    ['Failure.lean','変異は正しい和を返さない','誤った等式を rfl で証明できない。']
  ] },
  'LVT4-01': { module:'LvtGame', sourcePath:'../../LVT3-06/lab/LvtGame.lean', modes:[
    ['Inspect.lean','勝利と拒否の観測値','true が4回、全称命題の型と公理依存を確認。'],
    ['Main.lean','実行時の単体テスト','LVT4-01 OK を表示。','\n#eval main []\n'],
    ['ExerciseSolutions.lean','演習解答の検査','全8題の命題を検査。'],
    ['Failure.lean','誤った期待値のguard','番号9は拒否され、guardが失敗する。']
  ], commands:'lake build\nlake test\nlake env lean Inspect.lean\nlake env lean ExerciseSolutions.lean\nlake env lean Failure.lean\nlake exe lvtUnitDemo --fail' },
  'LVT4-02': { module:'LvtPbt', modes:[
    ['Inspect.lean','生成列と反例の比較','開始値0では [9]、開始値1では []。全件成功の意味と命題の型を確認。'],
    ['Main.lean','固定列による性質検査','LVT4-02 OK を表示。','\n#eval main []\n'],
    ['Main.lean','乱数で入力を生成','20件の入力と反例一覧を表示。反例が空でも正常。','\n#eval main ["--random"]\n'],
    ['ExerciseSolutions.lean','演習解答の検査','全8題の命題を検査。'],
    ['Failure.lean','意図した反例検出','開始値0の6件に9が含まれるためguardが失敗する。']
  ], commands:'lake build\nlake test\nlake env lean Inspect.lean\nlake env lean ExerciseSolutions.lean\nlake exe lvtPbtDemo --random\nlake env lean Failure.lean\nlake exe lvtPbtDemo --fail' },
  'LVT4-03': { module:'LvtCounterexample', modes:[
    ['Inspect.lean','反例を再現して証明を検査','true, true, true, false と命題の型・公理依存を確認。'],
    ['Main.lean','境界の再現テスト','LVT4-03 OK を表示。','\n#eval main\n'],
    ['ExerciseSolutions.lean','演習解答の検査','全8題の命題を検査。'],
    ['Failure.lean','意図したguardの失敗','8は反例ではないためguardが失敗する。']
  ], commands:'lake build\nlake build Plausible\nlake test\nlake env lean Inspect.lean\nlake env lean ExerciseSolutions.lean\nlake env lean SearchPass.lean\n# 以下は意図した失敗を個別に実行\nlake env lean Failure.lean\nlake env lean SearchFail.lean\nlake env lean SearchShrink.lean' },
  'LVT4-04': { module:'LvtGame', sourcePath:'../../LVT3-06/lab/LvtGame.lean', modes:[
    ['LvtInputs.lean','分類・除外・誤実装の比較','[17,1,2,10]、[30,17,0,10]、生成失敗0件と三命題の公理依存を確認。'],
    ['Failure.lean','範囲外の着手は成功しない','拒否を受理とする等式は型不一致。']
  ], commands:'lake build\nlake test\nlake env lean LvtInputs.lean\n# 以下は意図的な失敗\nlake env lean Failure.lean' },
  'LVT4-05': { module:'LvtGame', sourcePath:'../../LVT3-06/lab/LvtGame.lean', modes:[
    ['LvtShrink.lean','反例の縮小と再実行','[2,0,4,1,2] から [2,2] までの縮小列、候補の真偽と局所停止を確認。'],
    ['Failure.lean','一手では重複着手にならない','誤った等式は型不一致。']
  ], commands:'lake build\nlake test\nlake env lean LvtShrink.lean\n# 以下は意図的な失敗\nlake env lean Failure.lean' },
  'LVT4-06': { module:'LvtGame', sourcePath:'../../LVT3-06/lab/LvtGame.lean', modes:[
    ['LvtStrength.lean','回転・変異の検出・経路','4件の受理値の行列、検出数3、訪問経路数4と入力回転の公理依存を確認。'],
    ['Failure.lean','範囲外の回転は範囲外','範囲外の9を0へ写す誤った等式は型不一致。']
  ], commands:'lake build\nlake test\nlake env lean LvtStrength.lean\n# 以下は意図的な失敗\nlake env lean Failure.lean' },
  'LVT5-01': { module:'LvtContracts', sourcePath:'../../LVT3-01/lab/LvtContracts.lean', modes:[
    ['LvtDifferential.lean','独立実装・観測・不一致','[0,3,6,0] と二命題の公理依存を確認。'],
    ['Failure.lean','在庫と数量が等しいときは成功','誤った拒否の証明は型不一致。']
  ], commands:'lake build\nlake test\nlake env lean LvtDifferential.lean\npython3 compare.py\n# 以下は意図的な失敗\nlake env lean Failure.lean' },
  'LVT5-02': { module:'LvtContracts', sourcePath:'../../LVT3-01/lab/LvtContracts.lean', modes:[
    ['LvtOracle.lean','JSON応答と列モデルの証明','成功・解析エラー・境界成功の3応答と2命題の公理依存を確認。'],
    ['Failure.lean','境界の誤拒否','在庫と数量が等しい場合を拒否する証明は型不一致。']
  ], commands:'lake build\nlake test\nlake env lean LvtOracle.lean\npython3 compare.py\n# 以下は意図的な失敗\nlake env lean Failure.lean' },
  'LVT5-03': { module:'LvtContracts', sourcePath:'../../LVT3-01/lab/LvtContracts.lean', modes:[
    ['LvtSerialization.lean','意味保存往復と一致判定','(false,0) と (true,0) の区別、残数だけの符号の衝突、2命題の公理依存を確認。'],
    ['Failure.lean','符号の衝突では元の値は一致しない','none と some 0 の誤った等式は証明できない。']
  ], commands:'lake build\nlake test\nlake env lean LvtSerialization.lean\npython3 audit.py\n# 以下は意図的な失敗\nlake env lean Failure.lean' },
  'LVT5-04': { module:'LvtContracts', sourcePath:'../../LVT3-01/lab/LvtContracts.lean', modes:[
    ['LvtPythonDrt.lean','等号境界の検出条件','some 0、false、境界命題の公理依存を確認。'],
    ['Failure.lean','等号境界は拒否ではない','誤った拒否の証明は型不一致。']
  ], commands:'lake build\nlake test\nlake env lean LvtPythonDrt.lean\n(cd ../../LVT5-02/lab && lake build)\npython3 -m venv .venv\nsource .venv/bin/activate\npython -m pip install -r requirements.txt\npython -m pytest -q\npython differential.py discover /tmp/lvt-counterexample.json\npython differential.py replay /tmp/lvt-counterexample.json\n# 以下は意図的な失敗\nlake env lean Failure.lean' },
  'LVT5-05': { module:'LvtContracts', sourcePath:'../../LVT3-01/lab/LvtContracts.lean', modes:[
    ['LvtTypeScriptDrt.lean','応答交換の検出条件','異なる応答の交換と同一応答の交換を比較。'],
    ['Failure.lean','異なる応答は交換できない','誤った等式の証明は型不一致。']
  ], commands:"lake build\nlake test\nlake env lean LvtTypeScriptDrt.lean\n(cd ../../LVT5-02/lab && lake build)\nnpm install --ignore-scripts\nnpm test\nnpm run discover -- /tmp/lvt-ts-counterexample.json\nnpm run replay -- /tmp/lvt-ts-counterexample.json\n# 以下は意図的な失敗\nlake env lean Failure.lean" },
  'LVT5-06': { module:'LvtContracts', sourcePath:'../../LVT3-01/lab/LvtContracts.lean', modes:[
    ['LvtStateful.lean','操作列と中間観測','連結則・長さと拒否・停止の観測を確認。'],
    ['Failure.lean','空と一個は同じではない','誤った等式の証明は型不一致。']
  ], commands:"lake build\nlake test\nlake env lean LvtStateful.lean\nnpm install --ignore-scripts\nnpm test\nnpm run discover -- /tmp/lvt-stateful.json\nnpm run replay -- /tmp/lvt-stateful.json\n# 以下は意図的な失敗\nlake env lean Failure.lean" },
  'LVT5-07': { module:'LvtContracts', sourcePath:'../../LVT3-01/lab/LvtContracts.lean', modes:[
    ['LvtReplay.lean','固定入力の不一致再現','同じ入力なら不一致が再現されることを確認。'],
    ['Failure.lean','誤った等式の拒否','型不一致で証明が拒否される。']
  ], commands:"(cd ../../LVT5-06/lab && lake build && lake test)\n(cd ../../LVT5-06/lab && lake env lean ../../LVT5-07/lab/LvtReplay.lean)\nnpm ci --ignore-scripts\nnode replay.mjs test /tmp/lvt35-test.json\nnode replay.mjs discover /tmp/lvt35-counterexample.json\nnode replay.mjs replay /tmp/lvt35-counterexample.json" },
  'LVT5-08': { module:'LvtContracts', sourcePath:'../../LVT3-01/lab/LvtContracts.lean', modes:[
    ['LvtLimits.lean','検出集合と観測の情報保存','単射な観測と正しい基準の条件、成功ビットの衝突を確認。'],
    ['Failure.lean','観測の一致と生の値の違い','型不一致で誤った証明が拒否される。']
  ], commands:"(cd ../../LVT5-06/lab && lake build)\n(cd ../../LVT5-06/lab && lake env lean ../../LVT5-08/lab/LvtLimits.lean)\npython3 limits.py" },
  'LVT6-01': { module:'LvtAudit', modes:[
    ['Inspect.lean','到達可能性と長さ保存','長さ0の更新と初期長9の保存を区別し、帰納法の定理を確認。'],
    ['Failure.lean','任意の盤面が9という誤った主張','型不一致で拒否される。']
  ], commands:"lean -o LvtAudit.olean LvtAudit.lean\nLEAN_PATH=. lean Inspect.lean\n# 意図的失敗\nLEAN_PATH=. lean Failure.lean\n# 外部教材の再現は本文の固定コミットと手順を参照" }
};
export function combine(module, definitions, experiment, suffix='') {
  // Only the exact local module import is replaced by its source.
  const lines = experiment.split(/\r?\n/);
  const index = lines.findIndex(line => line.trim() === 'import ' + module);
  if (index !== 0) throw new Error('先頭の教材モジュール import が見つかりません');
  return definitions.trimEnd() + '\n\n' + lines.slice(1).join('\n') + suffix;
}
export function leanWebURL(code) {
  return 'https://live.lean-lang.org/#code=' + encodeURIComponent(code);
}
export function commandsFor(id) {
  if (!Object.hasOwn(lessons,id)) throw new Error('未知の講義');
  return 'cd "$(git rev-parse --show-toplevel)/textbook/volumes/dream_thater/計算系/LVT/' + id + '/lab"\n' +
    (lessons[id].commands ?? 'lake build\nlake test\nlake env lean Inspect.lean\nlake env lean ExerciseSolutions.lean\nlake env lean Failure.lean');
}
if (typeof document !== 'undefined') {
  const $ = id => document.getElementById(id);
  const chapter = $('chapter'), mode = $('mode'), source = $('source'), run = $('run');
  let generation=0, original='';
  const option=(value,label)=>new Option(label,value);
  for (const id of Object.keys(lessons)) chapter.add(option(id,id));
  const requested=new URLSearchParams(location.search).get('chapter');
  chapter.value=Object.hasOwn(lessons,requested)?requested:'LVT1-01';
  function enable(on) {
    source.disabled=!on; $('reset').disabled=!on;
    run.setAttribute('aria-disabled',String(!on));
    if(on){run.tabIndex=0;run.href=leanWebURL(source.value)}
    else {run.tabIndex=-1;run.removeAttribute('href')}
  }
  async function load() {
    const current=++generation, id=chapter.value, lesson=lessons[id];
    const entry=lesson.modes[Number(mode.value)];
    enable(false); source.value=''; $('status').textContent='教材ソースを取得中…';
    $('expected').textContent=entry[2]; $('commands').textContent=commandsFor(id);
    $('back').href=new URL('../../../../../index.html',location.href).href+'#/textbook/volumes/dream_thater/計算系/LVT/'+id+'/index';
    try {
      const read=async name=>{
        const response=await fetch(new URL(id+'/lab/'+name,location.href));
        if(!response.ok) throw new Error(name+' (HTTP '+response.status+')');
        return response.text();
      };
      const [definitions,experiment]=await Promise.all([read(lesson.sourcePath ?? lesson.module+'.lean'),read(entry[0])]);
      if(current!==generation)return;
      original=combine(lesson.module,definitions,experiment,entry[3]);
      source.value=original;enable(true);$('status').textContent='読み込み完了。編集して実行できます。';
    } catch(error) {
      if(current!==generation)return;
      $('status').textContent='読み込みに失敗しました: '+error.message+'。教材ソースに戻すには実験を選び直すかページを再読み込みしてください。';
    }
  }
  function chooseChapter(){
    mode.replaceChildren(...lessons[chapter.value].modes.map((entry,i)=>option(String(i),entry[1])));
    load();
  }
  chapter.addEventListener('change',chooseChapter);
  mode.addEventListener('change',load);
  source.addEventListener('input',()=>{run.href=leanWebURL(source.value)});
  $('reset').addEventListener('click',()=>{source.value=original;run.href=leanWebURL(original)});
  chooseChapter();
}
