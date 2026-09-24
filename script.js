/*
  =====================================
  ニュース記事データ
  =====================================
*/

const newsData = [
  {
    id: 1,
    date: "2026-08-13",
    title: "テストしますよ_2",
    content: `
<p>test</p>
    `
  },
  {
    id: 2,
    date: "2026-08-20",
    title: "ホームページをリニューアルしました",
    content: `
<p>ホームページをリニューアルしました。</p>
      <p>スマートフォンからも見やすいデザインになっています。</p>
    `
  },
  {
    id: 3,
    date: "2026-08-15",
    title: "夏季休業のお知らせ",
    content: `
<p>夏季休業期間についてお知らせします。</p>
      <p>休業期間中のお問い合わせは、営業開始後に順次対応いたします。</p>
    `
  },
  {
    id: 4,
    date: "2026-08-10",
    title: "イベント開催のお知らせ",
    content: `
<p>来月、社内イベントを開催します。</p>
      <p>詳細が決まり次第、改めてお知らせします。</p>
    `
  },
  {
    id: 5,
    date: "2026-08-01",
    title: "採用情報を更新しました",
    content: `
<p>採用情報を更新しました。</p>
      <p>募集職種と応募条件をご確認ください。</p>
    `
  },
  {
    id: 6,
    date: "2026-08-23",
    title: "春",
    content: `
<p>春が</p>
    `
  }
];


/*
  =====================================
  進捗状況データ
  =====================================

  completedStageには、現在完了しているステージ番号を指定します。

  例：
  completedStage: 2

  stagesの個数は項目ごとに自由に設定できます。
*/


const progressData = [
  {
    name: "テスト",
    completedStage: 1,
    content: "基本的なテストを開始しました。発見された問題を確認し、順次修正しています。",

    stages: [
      "テスト準備",
      "動作確認",
      "完了"
    ]
  },

  {
    name: "デザイン",
    completedStage: 3,
    content: "画面デザインの作成が完了に近づいています。現在は細かいレイアウトを調整しています。",

    stages: [
      "構成作成",
      "ワイヤーフレーム",
      "デザイン作成",
      "色・フォント調整",
      "最終確認",
      "完成"
    ]
  },

  {
    name: "開発",
    completedStage: 2,
    content: "主要な機能の開発を進めています。一部の機能はすでに動作確認が完了しています。",

    stages: [
      "準備",
      "基本機能",
      "追加機能",
      "完成"
    ]
  },

  {
    name: "ハンバーグ",
    completedStage: 3,
    content: "ハンバーグ食べる",

    stages: [
      "君",
      "彼",
      "俺"
    ]
  },

  {
    name: "パンケーキ",
    completedStage: 6,
    content: "キメラの企画と基本設計を進めています。現在は必要な機能の整理を行っています。",

    stages: [
      "企画",
      "基本設計",
      "詳細設計",
      "実装",
      "完成",
      "ゴミ"
    ]
  }

];


/*
  =====================================
  共通関数
  =====================================
*/


/**
 * 完了ステージを正しい範囲に調整する
 *
 * completedStageがマイナスの場合は0にする
 * completedStageがステージ数を超える場合は最大値にする
 */
function getCompletedStage(progress) {
  return Math.max(
    0,
    Math.min(
      progress.stages.length,
      progress.completedStage
    )
  );
}


/**
 * ステージ進捗バーを作成する
 *
 * ステージ数はprogress.stages.lengthから
 * 項目ごとに自動取得する
 */
function createProgressBar(progress) {
  const totalStages = progress.stages.length;
  const completedStage = getCompletedStage(progress);

  // 完了したステージの割合を計算
  const progressWidth =
    totalStages > 0
      ? (completedStage / totalStages) * 100
      : 0;

  const stageHtml = progress.stages
    .map((stageName, index) => {
      const stageNumber = index + 1;

      const completedClass =
        stageNumber <= completedStage
          ? "stage-completed"
          : "";

      return `
        <div class="stage ${completedClass}">
          <span class="stage-number">
            ${stageNumber}
          </span>

          <span class="stage-name">
            ${stageName}
          </span>
        </div>
      `;
    })
    .join("");

  return `
    <div class="stage-progress">

      <div class="stage-progress-background">
        <div
          class="stage-progress-bar"
          style="width: ${progressWidth}%"
        ></div>
      </div>

      <div
        class="stage-list"
        style="--stage-count: ${totalStages}"
      >
        ${stageHtml}
      </div>

    </div>
  `;
}


/*
  =====================================
  ニュース一覧の表示
  =====================================
*/

const newsList = document.querySelector("#news-list");

if (newsList) {
  const latestNews = [...newsData]
    .sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    })
    .slice(0, 5);

  latestNews.forEach((news) => {
    const listItem = document.createElement("li");

    listItem.className = "news-item";

    listItem.innerHTML = `
      <a
        class="news-link"
        href="article.html?id=${news.id}"
      >
        <span class="news-date">
          ${news.date}
        </span>

        <span class="news-title">
          ${news.title}
        </span>
      </a>
    `;

    newsList.appendChild(listItem);
  });
}


/*
  =====================================
  ホームページの進捗状況
  =====================================
*/

const progressList = document.querySelector("#progress-list");

if (progressList) {
  progressData.forEach((progress) => {
    const completedStage = getCompletedStage(progress);
    const totalStages = progress.stages.length;

    const progressItem = document.createElement("div");

    progressItem.className = "progress-item";

    progressItem.innerHTML = `
      <div class="progress-info">
        <span class="progress-name">
          ${progress.name}
        </span>

        <span class="progress-count">
          ステージ${completedStage} / ${totalStages}
        </span>
      </div>

      ${createProgressBar(progress)}
    `;

    progressList.appendChild(progressItem);
  });
}


/*
  =====================================
  記事詳細ページ
  =====================================
*/

const articleTitle = document.querySelector("#article-title");

if (articleTitle) {
  const params = new URLSearchParams(
    window.location.search
  );

  const articleId = Number(
    params.get("id")
  );

  const article = newsData.find((news) => {
    return news.id === articleId;
  });

  const articleDate =
    document.querySelector("#article-date");

  const articleContent =
    document.querySelector("#article-content");

  if (article) {
    document.title = article.title;

    articleTitle.textContent =
      article.title;

    articleDate.textContent =
      article.date;

    articleContent.innerHTML =
      article.content;
  } else {
    document.title = "記事が見つかりません";

    articleTitle.textContent =
      "記事が見つかりません";

    articleDate.textContent =
      "";

    articleContent.innerHTML =
      "<p>指定された記事は存在しません。</p>";
  }
}


/*
  =====================================
  進捗状況の詳細ページ
  =====================================
*/

const progressDetailList = document.querySelector(
  "#progress-detail-list"
);

if (progressDetailList) {
  progressData.forEach((progress) => {
    const completedStage =
      getCompletedStage(progress);

    const totalStages =
      progress.stages.length;

    const detailItem =
      document.createElement("article");

    detailItem.className =
      "progress-detail-item";

    detailItem.innerHTML = `
      <div class="progress-detail-header">
        <h3>
          ${progress.name}
        </h3>

        <span>
          ステージ${completedStage} / ${totalStages}
        </span>
      </div>

      ${createProgressBar(progress)}

      <p>
        ${progress.content}
      </p>
    `;

    progressDetailList.appendChild(detailItem);
  });
}
