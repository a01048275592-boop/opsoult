# 옵솔트 (opsoult.com) 웹사이트

> 매장 설비 설치 플랫폼 랜딩 페이지 + 지역별 블로그 시스템
> Astro + GitHub + Cloudflare Workers 자동 배포 구조

---

## 📋 전체 흐름 (한 번만 세팅하면 끝)

```
[GitHub에 파일 업로드]
        ↓ 자동 감지 (Workers Builds)
[Cloudflare Workers가 빌드 & 배포]
        ↓
[opsoult.com 에 반영]
```

처음 한 번만 세팅하면, 이후로는 **GitHub에서 마크다운 파일 추가하면 1~2분 뒤 자동으로 사이트에 글이 올라갑니다.** 터미널/Git 명령어 전혀 필요 없습니다.

> 💡 **참고:** 2026년 기준 Cloudflare는 새 프로젝트에 **Workers** 사용을 권장합니다 (Pages는 기존 프로젝트만 지원). 이 프로젝트는 Workers Builds + Static Assets 방식으로 세팅되어 있어요.

---

## 🚀 STEP 1 - GitHub 계정 만들고 저장소(Repository) 생성

### 1-1. GitHub 가입
1. [github.com](https://github.com) 접속
2. **Sign up** 클릭 → 이메일·비밀번호·아이디 입력
3. 이메일 인증 완료

### 1-2. 새 저장소 만들기
1. 우측 상단 **+** 아이콘 → **New repository** 클릭
2. **Repository name**: `opsoult` (원하는 이름)
3. **Public** 또는 **Private** 선택 (Cloudflare Workers는 둘 다 지원)
4. **Add a README file 체크 안 함** (이미 README가 있으니까)
5. **Create repository** 클릭

---

## 📤 STEP 2 - 이 프로젝트 파일을 GitHub에 업로드

### 2-1. 파일 업로드 (드래그 한 번이면 끝)
1. 방금 만든 저장소 페이지에서 **"uploading an existing file"** 링크 클릭
   (또는 **Add file → Upload files**)
2. **이 `opsoult` 폴더 안의 모든 파일과 폴더를 통째로 드래그**해서 업로드 영역에 놓으세요
   - ⚠️ `node_modules`, `dist`, `.astro` 폴더가 있으면 업로드하지 마세요 (자동 생성됨)
3. 업로드 완료까지 기다립니다 (1~2분)
4. 하단 **"Commit changes"** 버튼 클릭

---

## ☁️ STEP 3 - Cloudflare Workers에 연결 (Workers Builds)

### 3-1. Workers 프로젝트 만들고 GitHub 저장소 연결
1. [dash.cloudflare.com](https://dash.cloudflare.com) 접속
2. 좌측 메뉴 **Workers & Pages** 클릭 (또는 **Compute → Workers & Pages**)
3. **Create application** 클릭
4. **Import a repository** 섹션의 **Get started** 클릭
5. **Connect GitHub** → 권한 승인 → 방금 만든 `opsoult` 저장소 선택

### 3-2. 빌드 설정 (이 부분이 가장 중요!)
다음과 같이 입력하세요:

| 항목 | 입력값 |
|---|---|
| **Project name** | `opsoult` |
| **Production branch** | `main` |
| **Framework** | `Astro` (자동 감지됨) |
| **Build command** | `npm run build` |
| **Deploy command** | `npx wrangler deploy` |

> ⚠️ Pages와 다른 점: "Build output directory" 대신 **"Deploy command"** 가 있습니다. `npx wrangler deploy` 가 빌드된 `dist/` 폴더를 자동으로 Workers에 올립니다 (이 프로젝트의 `wrangler.jsonc` 파일에 이미 설정되어 있어요).

→ **Save and Deploy** 클릭

### 3-3. 첫 배포 기다리기
- 2~5분 후 빌드 완료
- `https://opsoult.<your-account>.workers.dev` 같은 임시 주소가 생성됩니다
- 클릭해서 사이트가 잘 뜨는지 확인하세요

### 3-4. (Workers 처음 쓰는 경우) 무료 서브도메인 활성화
- Workers를 처음 사용하면 한 번만 본인 계정의 `workers.dev` 서브도메인을 정해야 합니다
- 안내가 뜨면 원하는 서브도메인 입력 → 활성화

---

## 🌐 STEP 4 - opsoult.com 도메인 연결

### 4-1. Worker에 커스텀 도메인 추가
1. Cloudflare 대시보드 → **Workers & Pages** → 방금 만든 `opsoult` Worker 클릭
2. **Settings** 탭 → **Domains & Routes** 섹션
3. **Add → Custom Domain** 클릭
4. `opsoult.com` 입력 → **Add Domain**
5. (이미 Cloudflare에서 산 도메인이라) DNS가 자동으로 연결됩니다
6. **`www.opsoult.com`도 추가하고 싶으면** 같은 방식으로 한 번 더

### 4-2. 1~10분 대기
- SSL 인증서 자동 발급
- 완료되면 `https://opsoult.com` 으로 접속 가능 ✅

**여기까지가 처음 1회 세팅. 끝!** 이제부터는 글쓰는 일만 남았습니다.

---

## ✏️ 새 글(페이지) 추가하는 방법

새 지역 페이지나 블로그 글을 추가하고 싶을 때:

### 방법 1: GitHub 웹에서 직접 (가장 쉬움)

1. GitHub 저장소 → `src/content/blog/` 폴더로 이동
2. 우측 상단 **Add file** → **Create new file** 클릭
3. 파일 이름: `daegu.md` 같은 식 (영문 + `.md` 확장자)
4. 내용 입력 (아래 양식 그대로 복사해서 수정):

```markdown
---
title: 대구 중구 카드단말기 설치 가이드
description: 대구 중구 매장 카드단말기 설치 정보와 사례
region: 대구
category: 카드단말기
pubDate: "2026-04-15"
heroEmoji: "🏭"
---

## 본문 제목

여기에 본문을 작성하세요.

### 작은 제목

- 리스트 항목 1
- 리스트 항목 2

**굵은 글씨**, *기울임*, [링크](https://example.com) 도 가능합니다.
```

5. 하단 **Commit new file** 클릭
6. **1~2분 후 opsoult.com/blog/daegu 페이지가 자동 생성됩니다 🎉**

### 방법 2: 글 수정하기

1. GitHub에서 수정할 `.md` 파일 클릭
2. 우측 상단 **연필 아이콘 (Edit this file)** 클릭
3. 내용 수정 → 하단 **Commit changes**
4. 1~2분 후 자동 반영

---

## 📁 폴더 구조 설명

```
opsoult/
├── README.md                  ← 이 가이드
├── package.json               ← 프로젝트 설정 (건드리지 마세요)
├── astro.config.mjs           ← Astro 설정
├── wrangler.jsonc             ← Cloudflare Workers 배포 설정 (건드리지 마세요)
├── tsconfig.json
├── public/
│   └── favicon.svg            ← 사이트 아이콘
└── src/
    ├── content.config.ts      ← 글 양식 정의 (건드리지 마세요)
    ├── styles/
    │   └── global.css         ← 전역 스타일/색상 변수
    ├── components/
    │   ├── Header.astro       ← 상단 헤더
    │   ├── Footer.astro       ← 하단 푸터
    │   └── FloatingCTA.astro  ← 우측 하단 전화 버튼
    ├── layouts/
    │   └── BaseLayout.astro   ← 공통 레이아웃
    ├── pages/
    │   ├── index.astro        ← 메인 페이지 (홈)
    │   └── blog/
    │       ├── index.astro    ← 블로그 목록 페이지
    │       └── [...slug].astro ← 개별 글 페이지 템플릿
    └── content/
        └── blog/              ⭐ 여기에 .md 파일 추가하세요!
            ├── seoul.md
            ├── seoul-gangnam.md
            ├── busan.md
            └── gyeonggi.md
```

### 자주 수정하게 될 파일

| 무엇을 바꾸려면? | 어떤 파일? |
|---|---|
| 새 글 추가 | `src/content/blog/` 에 `.md` 파일 추가 |
| 메인 페이지 텍스트 (소개, 제품 설명, 후기 등) | `src/pages/index.astro` |
| 헤더 메뉴 / 로고 | `src/components/Header.astro` |
| 푸터 / 회사 정보 | `src/components/Footer.astro` |
| 전화번호 | `src/components/Header.astro`, `Footer.astro`, `FloatingCTA.astro` |
| 색상/폰트 변경 | `src/styles/global.css` 의 `:root{}` 부분 |

---

## 🎨 색상/디자인 변경하는 법

`src/styles/global.css` 파일을 GitHub에서 열고, 위쪽의 이 부분을 찾으세요:

```css
:root {
  --ink: #0c0f14;       /* 진한 검정 (메인 텍스트, 헤더 배경) */
  --paper: #f5f1ea;     /* 크림색 배경 */
  --paper-2: #ece6db;   /* 살짝 진한 크림 (카드 배경) */
  --accent: #e8512c;    /* 주황색 강조 */
  --accent-2: #ffb347;  /* 밝은 주황 */
  ...
}
```

위 색상값(`#0c0f14` 같은 것)만 바꾸면 사이트 전체 색상이 변경됩니다.

색상 코드 고를 때 [coolors.co](https://coolors.co) 같은 사이트가 도움됩니다.

---

## 📞 전화번호 / 연락처 바꾸기

전화번호는 다음 파일들에 있습니다 (찾아서 바꾸기):

1. `src/components/Header.astro` — 헤더 우측 상담 버튼
2. `src/components/Footer.astro` — 푸터 회사 정보
3. `src/components/FloatingCTA.astro` — 우측 하단 플로팅 버튼
4. `src/pages/index.astro` — 메인 페이지 CTA 섹션
5. `src/pages/blog/[...slug].astro` — 블로그 글 하단 CTA

GitHub에서 파일 열고 `010-0000-0000` 을 검색해서 실제 번호로 바꾸시면 됩니다.

---

## 🐛 문제 발생 시

### 빌드가 실패할 때
- Cloudflare 대시보드 → **Workers & Pages** → 해당 Worker → **Deployments** 탭
- 실패한 배포 클릭 → **View build log** 에서 오류 메시지 확인
- 보통 마크다운 파일의 `---` 위쪽 (frontmatter) 양식이 잘못된 경우가 많음
  - `title:`, `description:`, `pubDate:` 는 **반드시** 있어야 함
  - 날짜 형식: `"2026-04-15"` (반드시 큰따옴표로 감싸기)

### 사이트가 업데이트 안 될 때
1. Cloudflare → **Workers & Pages** → **Deployments** 탭에서 빌드가 끝났는지 확인
2. 브라우저 새로고침 (강력 새로고침: `Ctrl+Shift+R` 또는 `Cmd+Shift+R`)
3. 그래도 안 보이면 1~5분 더 기다리기 (CDN 캐시)

---

## 💡 추천: 로컬에서 미리보기 (선택사항)

만약 나중에 컴퓨터에서 직접 미리보고 싶어지면:

1. [Node.js](https://nodejs.org) 설치 (LTS 버전)
2. 이 폴더에서 터미널 열기
3. `npm install` 실행 (한 번만)
4. `npm run dev` 실행
5. 브라우저에서 `http://localhost:4321` 접속

→ 파일 저장하면 실시간으로 화면에 반영됩니다.

지금은 필요 없고, 나중에 익숙해지면 시도해보세요.

---

## 🎯 요약 - 가장 중요한 3가지

1. **글 추가** = GitHub의 `src/content/blog/` 폴더에 `.md` 파일 만들기
2. **수정** = GitHub에서 파일 열고 연필 아이콘 → Commit
3. **확인** = 1~2분 후 opsoult.com 에서 새로고침

화이팅! 🚀
