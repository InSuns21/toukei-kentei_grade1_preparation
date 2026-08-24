# Standard 22 適合度LRT・Pearson・自由度

- 旧No.: 68
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎・修正済（対数の数値評価不要）

## 問題

4カテゴリ多項分布で

$$
p(\theta)=\left(\frac\theta2,\frac\theta2,\frac{1-\theta}{2},\frac{1-\theta}{2}\right),
\qquad0<\theta<1
$$

とする。観測度数は $(20,10,30,40)$。

1. $\theta$ のMLEを求めよ。
2. 期待度数を求め、Pearson統計量を計算せよ。
3. LRT統計量を書け。対数は数値化しなくてよい。
4. 漸近自由度を求めよ。

## 詳細解答

最初の2カテゴリの合計確率が $\theta$ なので

$$
\widehat\theta=\frac{20+10}{100}=0.3.
$$

期待度数は

$$
(15,15,35,35).
$$

Pearson統計量は

$$
X^2
=\frac{25}{15}+\frac{25}{15}+\frac{25}{35}+\frac{25}{35}
=\frac{100}{21}.
$$

LRTは

$$
G^2=2\sum_{i=1}^4O_i\log\frac{O_i}{E_i}.
$$

カテゴリ数4から総和制約で1自由度失い、さらに $\theta$ を1個推定するので

$$
\boxed{df=4-1-1=2}.
$$

## 本番答案

$\hat\theta=0.3$、期待度数 $(15,15,35,35)$。Pearsonは $100/21$。LRTは $2\sum O_i\log(O_i/E_i)$。推定母数1個を使うので自由度は $4-1-1=2$。

## 採点基準

- MLE: 4点
- 期待度数: 4点
- Pearson統計量: 5点
- LRT: 3点
- 自由度: 4点
