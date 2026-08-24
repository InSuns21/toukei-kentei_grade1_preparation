import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('statistical-mathematics');
const tiers = {
  core: {
    label: 'Core',
    expected: 48,
    sources: [
      'core48/core_01_12.md',
      'core48/core_13_24.md',
      'core48/core_25_36.md',
      'core48/core_37_48.md',
    ],
  },
  standard: {
    label: 'Standard',
    expected: 32,
    sources: [
      'standard-advanced52/standard_01_16.md',
      'standard-advanced52/standard_17_32.md',
    ],
  },
  advanced: {
    label: 'Advanced',
    expected: 20,
    sources: [
      'standard-advanced52/advanced_01_10.md',
      'standard-advanced52/advanced_11_20.md',
    ],
  },
};

const slugs = {
  '01': 'order_statistics_rao_blackwell',
  '02': 'gamma_beta_jacobian',
  '03': 'poisson_gamma_mixture',
  '04': 'chisq_mgf_beta',
  '05': 'chisq_f_t_cauchy',
  '06': 'probability_integral_transform',
  '07': 'pairwise_mutual_independence',
  '08': 'conditional_probability_bayes',
  '09': 'exponential_uniform_convolution',
  '10': 'order_statistics_density_range',
  '11': 'bivariate_uniform_conditional_geometry',
  '12': 'chisq_cauchy_inverse_transform',
  '13': 'exponential_mgf_tilting',
  '14': 'sample_central_moments',
  '15': 'sample_mean_skewness_kurtosis',
  '16': 'dependent_uniform_uncorrelated',
  '17': 'binomial_pgf_chernoff',
  '18': 'binomial_poisson_normal_limit',
  '19': 'empirical_distribution_tail_mixture',
  '20': 'max_order_extreme_limit',
  '21': 'multinomial_covariance_mvn_clt',
  '22': 'hierarchical_bernoulli_icc',
  '23': 'truncated_normal_moments',
  '24': 'characteristic_function_clt',
  '25': 'mvn_linear_transform_residual',
  '26': 'conditional_normal_partial_correlation',
  '27': 'bivariate_normal_markov',
  '28': 'gaussian_bridge',
  '29': 'dichotomized_normal_correlation',
  '30': 'normal_linear_bayes',
  '31': 'equicorrelation_precision_partial',
  '32': 'heteroscedastic_gaussian_bridge',
  '33': 'projection_quadratic_cochran',
  '34': 'precision_gaussian_conditional_independence',
  '35': 'bivariate_normal_selection_moments',
  '36': 'noisy_linear_conditional_normal',
  '37': 'cholesky_residualization',
  '38': 'noncentral_mahalanobis',
  '39': 'conditional_normal_square_completion',
  '40': 'fisher_information_delta_mle_efficiency',
  '41': 'uniform_complete_sufficient_umvu',
  '42': 'cramer_rao_efficiency',
  '43': 'binomial_sufficiency_shrinkage',
  '44': 'uniform_nonregular_mle',
  '45': 'chisq_variance_confidence_interval',
  '46': 'moment_estimation_delta',
  '47': 'binomial_wald_coverage',
  '48': 'student_t_confidence_interval',
  '49': 'poisson_mle_fisher_ci',
  '50': 'two_parameter_binomial_moments',
  '51': 'shifted_exponential_nonregular_mle',
  '52': 'pareto_mle_bias_efficiency',
  '53': 'poisson_unbiased_consistent_mse',
  '54': 'uniform_max_unbiased_variance',
  '55': 'exponential_complete_sufficient_umvu',
  '56': 'hypergeometric_fpc',
  '57': 'inverse_variance_blue_mle',
  '58': 'stratified_ht_neyman_allocation',
  '59': 'beta_binomial_bayes',
  '60': 'right_censored_exponential',
  '61': 'poisson_mixture_em',
  '62': 'multinomial_lrt_pearson',
  '63': 'neyman_pearson_ump',
  '64': 'two_sided_umpu_mean',
  '65': 'noncentral_f_power',
  '66': 'constrained_mle_lrt',
  '67': 'order_statistic_rejection_region',
  '68': 'gof_lrt_pearson',
  '69': 'cauchy_np_test',
  '70': 'bernoulli_lrt_wald_score',
  '71': 'poisson_conditional_binomial_test',
  '72': 'two_sample_f_pooled_t',
  '73': 'correlation_fisher_z',
  '74': 'wilcoxon_permutation',
  '75': 'regression_mle_fisher_power',
  '76': 'projection_cochran_prediction',
  '77': 'multiple_regression_vif_omitted_bias',
  '78': 'gauss_markov_blue',
  '79': 'unbalanced_anova_missing',
  '80': 'general_linear_hypothesis_partial_f',
  '81': 'twoway_anova_interaction',
  '82': 'ancova_adjusted_effect',
  '83': 'bonferroni_scheffe',
  '84': 'partial_r2_extra_ss',
  '85': 'log_regression_residuals',
  '86': 'bivariate_normal_regression_to_mean',
  '87': 'monte_carlo_variance_comparison',
  '88': 'hit_or_miss_monte_carlo',
  '89': 'rare_event_relative_mc_error',
  '90': 'rejection_sampling',
  '91': 'box_muller',
  '92': 'monte_carlo_standard_error',
  '93': 'importance_sampling',
  '94': 'control_variates',
  '95': 'stratified_monte_carlo',
  '96': 'weibull_survival_hazard',
  '97': 'geometric_negative_binomial_pgf',
  '98': 'bayes_decision_loss',
  '99': 'composite_null_valid_pvalue',
  '100': 'equivalence_local_power',
};

function splitQuestions(source, label) {
  const lines = source.replaceAll('\r\n', '\n').split('\n');
  const heading = new RegExp(`^# ${label} (\\d{2}) (.+)$`);
  const starts = [];
  for (let i = 0; i < lines.length; i += 1) {
    if (heading.test(lines[i])) starts.push(i);
  }
  return starts.map((start, index) => {
    const end = index + 1 < starts.length ? starts[index + 1] : lines.length;
    const chunkLines = lines.slice(start, end);
    while (chunkLines.length && chunkLines.at(-1).trim() === '') chunkLines.pop();
    if (chunkLines.at(-1)?.trim() === '---') chunkLines.pop();
    while (chunkLines.length && chunkLines.at(-1).trim() === '') chunkLines.pop();
    return `${chunkLines.join('\n')}\n`;
  });
}

function meta(chunk, key) {
  const match = chunk.match(new RegExp(`^- ${key}: (.+)$`, 'm'));
  return match?.[1]?.trim() ?? '';
}

function questionInfo(chunk, label) {
  const heading = chunk.match(new RegExp(`^# ${label} (\\d{2}) (.+)$`, 'm'));
  if (!heading) throw new Error(`見出しを解釈できません: ${chunk.slice(0, 80)}`);
  const oldRaw = meta(chunk, '旧No\\.');
  const oldNo = oldRaw.padStart(2, '0');
  if (!slugs[oldNo]) throw new Error(`旧No.${oldNo} のslugがありません`);
  return {
    rank: heading[1],
    title: heading[2],
    oldNo,
    value: meta(chunk, '演習価値'),
    difficulty: meta(chunk, '難度'),
    audit: meta(chunk, '手計算監査'),
    file: `${oldNo}_${slugs[oldNo]}.md`,
    chunk,
  };
}

const all = {};
for (const [dir, config] of Object.entries(tiers)) {
  const questions = [];
  for (const sourceRel of config.sources) {
    const sourcePath = path.join(root, sourceRel);
    const source = fs.readFileSync(sourcePath, 'utf8');
    questions.push(...splitQuestions(source, config.label).map((chunk) => questionInfo(chunk, config.label)));
  }
  if (questions.length !== config.expected) {
    throw new Error(`${config.label}: ${config.expected}題を期待しましたが ${questions.length}題でした`);
  }
  const oldNos = new Set(questions.map((q) => q.oldNo));
  if (oldNos.size !== questions.length) throw new Error(`${config.label}: 旧No.が重複しています`);

  const outDir = path.join(root, dir);
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });
  for (const q of questions) fs.writeFileSync(path.join(outDir, q.file), q.chunk, 'utf8');
  all[dir] = questions;
}

const allQuestions = Object.values(all).flat();
if (allQuestions.length !== 100) throw new Error(`合計100題を期待しましたが ${allQuestions.length}題でした`);
if (new Set(allQuestions.map((q) => q.oldNo)).size !== 100) throw new Error('100大問No.に重複があります');

function tierReadme(dir, label, questions) {
  const lines = [
    `# ${label} ${questions.length} 実装順`,
    '',
    `${label}層の大問を1題1ファイルで管理する。各題は「問題・詳細解答・本番答案・20点採点基準」を含む。ファイル先頭の番号は正式100大問の旧No.で、見出し中の ${label} No. は層内の実装順である。`,
    '',
    '| 実装順 | 100 No. | 演習価値 | 難度 | 主題 |',
    '| ---: | ---: | :---: | :---: | --- |',
  ];
  for (const q of questions) {
    lines.push(`| ${q.rank} | ${Number(q.oldNo)} | ${q.value} | ${q.difficulty} | [${q.title}](${q.file}) |`);
  }
  lines.push('', `**${label} ${questions.length}: ${questions.length} / ${questions.length} 実装済み。**`, '');
  return lines.join('\n');
}

for (const [dir, config] of Object.entries(tiers)) {
  fs.writeFileSync(path.join(root, dir, 'README.md'), tierReadme(dir, config.label, all[dir]), 'utf8');
}

const sourceDirs = [
  '01_probability_distributions',
  '02_multivariate_normal',
  '03_estimation',
  '04_hypothesis_testing',
  '05_regression_linear_models',
  '06_monte_carlo',
  '07_crosscutting_gaps',
];
const sourcesRoot = path.join(root, 'sources');
fs.mkdirSync(sourcesRoot, { recursive: true });
for (const name of sourceDirs) {
  const from = path.join(root, name);
  const to = path.join(sourcesRoot, name);
  if (fs.existsSync(from)) {
    fs.rmSync(to, { recursive: true, force: true });
    fs.renameSync(from, to);
  }
}
fs.writeFileSync(path.join(sourcesRoot, 'README.md'), `# Source / provenance materials\n\n過去問再構成・シラバス補完を作った段階の分野別ソースを保存する。日常演習の正本は一段上の \`core/\`, \`standard/\`, \`advanced/\` とする。\n\nこのディレクトリは出典・再構成経緯の追跡用であり、1題1ファイルの正規化済み教材は置かない。\n`, 'utf8');

const oldAudit = path.join(root, 'standard-advanced52', 'AUDIT_2026-08-25.md');
if (fs.existsSync(oldAudit)) {
  fs.writeFileSync(path.join(root, 'AUDIT_REMAINING_52_2026-08-25.md'), fs.readFileSync(oldAudit, 'utf8'), 'utf8');
}
fs.rmSync(path.join(root, 'core48'), { recursive: true, force: true });
fs.rmSync(path.join(root, 'standard-advanced52'), { recursive: true, force: true });

const readme = `# 統計数理 100大問\n\n統計検定1級「統計数理」向けの100大問構成を管理するディレクトリです。\n\n- [正式演習目次](index.md): Core 48 / Standard 32 / Advanced 20 の100題一覧\n- [Core 48](core/README.md): 最優先48題。1題1ファイル\n- [Standard 32](standard/README.md): Coreの次に解く32題。1題1ファイル\n- [Advanced 20](advanced/README.md): 発展20題。1題1ファイル\n- [残り52題 横断監査](AUDIT_REMAINING_52_2026-08-25.md)\n- [Source / provenance](sources/README.md): 過去問再構成・シラバス補完時の分野別ソース\n- [validate-katex.mjs](validate-katex.mjs): このディレクトリ全体のKaTeX strict検証\n\n## ディレクトリ規約\n\n\`applied-rikou-80/\` と同じく、演習の正本は \`core/\`, \`standard/\`, \`advanced/\` の3階層です。各大問は1題1 Markdownファイルとし、ファイル名は \`<100大問No.>_<snake_case_slug>.md\` に統一します。\n\n各大問は原則として次の4区分を持ちます。\n\n1. 問題\n2. 詳細解答\n3. 本番答案\n4. 採点基準（20点満点）\n\n旧分野別ファイルは内容・来歴追跡のため \`sources/\` に退避し、日常演習では正規化済み3階層を使用します。\n\n## KaTeX検証\n\nリポジトリルートで次を実行します。\n\n\`\`\`bash\nnpm ci\nnpm run validate:mathstat\n\`\`\`\n\nリポジトリ全体の数式検証は次です。\n\n\`\`\`bash\nnpm run validate:math\n\`\`\`\n\n数式は \`$...$\` / \`$$...$$\` を使い、KaTeX strictで通る記法を正本とします。\n`;
fs.writeFileSync(path.join(root, 'README.md'), readme, 'utf8');

const indexLines = [
  '# 統計検定1級 統計数理 100大問 — 正式演習目次',
  '',
  '演習の正本を `core/` / `standard/` / `advanced/` の3階層、1題1ファイルに統一した正式目次。100 No. は従来の100大問No.、実装順は各層内の学習順を表す。',
  '',
];
for (const [dir, config] of Object.entries(tiers)) {
  indexLines.push(`## ${config.label} ${all[dir].length}`, '', '| 実装順 | 100 No. | 演習価値 | 難度 | 主題 | 手計算監査 |', '| ---: | ---: | :---: | :---: | --- | --- |');
  for (const q of all[dir]) {
    indexLines.push(`| ${q.rank} | ${Number(q.oldNo)} | ${q.value} | ${q.difficulty} | [${q.title}](${dir}/${q.file}) | ${q.audit} |`);
  }
  indexLines.push('');
}
indexLines.push('## 運用', '', '- まず Core 48 を実装順に解く。', '- 次に Standard 32、最後に Advanced 20 へ進む。', '- 分野別の再構成元や補完原稿を確認するときだけ `sources/` を参照する。', '- 数式変更後は `npm run validate:mathstat` を実行する。', '');
fs.writeFileSync(path.join(root, 'index.md'), indexLines.join('\n'), 'utf8');

// 一回限りの移行用ファイルは成果物に残さない。
fs.rmSync(path.resolve('scripts/restructure_statistical_mathematics.mjs'), { force: true });
fs.rmSync(path.resolve('.github/workflows/statmath-restructure-once.yml'), { force: true });

console.log(`statistical-mathematics: Core ${all.core.length} / Standard ${all.standard.length} / Advanced ${all.advanced.length} を1題1ファイルへ正規化しました。`);
