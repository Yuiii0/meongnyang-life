# 🐾 멍냥생활

 ![image](https://github.com/user-attachments/assets/78bad134-cec6-4938-b7ac-6f31d3d90125)

#### 프로젝트 소개
멍냥생활은 강아지와 고양이를 위한 반려동물 커뮤니티입니다. <br>
반려견과의 함께하는 일상을 기록하고, 사진과 다양한 정보를 공유하는 공간을 제공합니다.<br>
멍냥 생활과 함께 반려동물과의 소중한 추억을 간직해보세요

<p style="font-size: 12px; color: gray;">(© 비마이펫 :
본 프로젝트는 개인 포트폴리오 용도로 제작되었으며, 비상업적 용도로 사용되었습니다.)</p>

<br/>

#### 진행기간

24.06 ~ 24.07 (4주)

#### 📎 배포 링크

[🐾 멍냥생활 배포 URL ](https://dev-meongnyang-life.vercel.app/)

#### 🔒 테스트 계정

ID : meong@test.com <br>
PW: abcd1234!!

<br/>

## 🚀 실행방법

```
git clone https://github.com/Yuiii0/meongnyang-life.git
cd meongnyang-life

npm install

npm run dev
```

<br/>

## 🔍 유저 플로우

![Screen Flow Template - Frame 1](https://github.com/user-attachments/assets/d8ecd4f9-a1a5-4379-a595-842d7db44f5e)

<br/>

## 🛠 기술 스택

<img  src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> <img  src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img  src="https://img.shields.io/badge/Tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"><br/>
<img  src="https://img.shields.io/badge/Zustand-764ABC?style=for-the-badge&logo=React&logoColor=white"> <img  src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"> <img  src="https://img.shields.io/badge/React Hook Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white"><br/>
<img  src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white"> <img  src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"> <img  src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">

<br/>

## 📌 주요기능

#### 로그인 / 회원가입 <br/>

- 폼 유효성 검증 (email 형식, 대소문자, 특수문자 포함 8글자 이상 비밀번호)
- 구글 소셜 로그인
- 전역상태로 인증상태 유지 및 유저정보 관리</details>
- 인증된 유저에 따른 서비스 접근 제한 및 보호 (타인의 프로필, 게시글 수정 페이지 접근 불가)
- <details><summary> 🔍 View</summary> <br/>  </details>

#### 전체 게시글 조회

- 무한스크롤을 활용한 페이지네이션
- 스와이퍼를 통한 게시물 이미지 확인 기능

#### 게시글 상세 조회

- 게시물 상세 정보 조회 기능
- 게시글 좋아요 기능

#### 게시글 작성 / 수정 / 삭제

- 텍스트와 이미지를 활용한 게시글 작성 기능
- 최대 5장 이미지 업로드 가능 (webp 변환, resizing 적용)
- 이미지 크롭 기능 제공

#### 댓글, 대댓글

- 댓글, 대댓글 생성, 수정, 삭제 기능
- 본인 게시글의 모든 댓글 삭제 권한
- 무한스크롤을 활용한 댓글 조회
- 댓글, 대댓글 좋아요 기능

#### 유저 조회

- 유저 팔로우/언팔로우 기능
- 유저의 반려동물 종류, 성별, 소개 및 게시글 조회
- 유저의 팔로우 관계 조회, 관리 기능

#### 검색 기능

- 유저 검색 기능
- 게시물 검색 기능
- 최근 검색어 기록 제공

#### 좋아요, 북마크 기능

- 좋아요한 게시글, 댓글 조회 가능
- 북마크 게시글 조회 가능

<br/>

## 🔥 성능 최적화

- [이미지 최적화로 사이즈 85% 감소, 다양한 사이즈로 반응형 이미지 적용](https://s-organization-335.gitbook.io/meongnang/undefined)
- [code Splitting, prefetch 적용으로 로딩속도 개선](https://s-organization-335.gitbook.io/meongnang/prefetch-code-splitting)
- [웹 접근성 37%, SEO 83→100 점수 개선](https://s-organization-335.gitbook.io/db/seo)

<br/>

## ☄️ 트러블 슈팅

- [이미지 placeholder와 crop 이용한 CLS 개선](https://s-organization-335.gitbook.io/trouble)
- [fireStore 부분 문자열 검색 기능 구현](https://s-organization-335.gitbook.io/trouble/firebase)

<br/>

## 💭 기술적 의사결정

- [Firebase DB 설계](https://s-organization-335.gitbook.io/meongnang)
- [좋아요 기능 최적화](https://s-organization-335.gitbook.io/meongnang/undefined-1)
- [인증 상태 유지와 권한 제어, 보호](https://s-organization-335.gitbook.io/meongnang/undefined-2)

<br/>

## ⚙️ 아키텍쳐
<img width="812" alt="image" src="https://github.com/user-attachments/assets/4500508b-18f1-4216-9faa-b9eda8da035d">


## 🗂 프로젝트 구조

```
📜 README.md
📜 .gitignore
📜 package.json
📜 package-lock.json
📦 public
 ┣ 📜robots.txt
 ┣ 📜sitemap.xml
📦 src
 ┣ 📂assets
 ┣ 📂components
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📂likes
 ┃ ┃ ┣ 📂logIn
 ┃ ┃ ┣ 📂posts
 ┃ ┃ ┣ 📂search
 ┃ ┃ ┣ 📂signUp
 ┃ ┃ ┗ 📂user
 ┃ ┗ 📂ui
 ┣ 📂lib
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📜api.ts
 ┃ ┃ ┣ 📜key.ts
 ┃ ┃ ┗ 📜type.ts
 ┃ ┣ 📂comments
 ┃ ┣ 📂follow
 ┃ ┣ 📂likes
 ┃ ┣ 📂posts
 ┃ ┣ 📂search
 ┃ ┗ 📂users
 ┣ 📂pages
 ┃ ┣ 📂Bookmark
 ┃ ┣ 📂ErrorPage
 ┃ ┣ 📂FindPassword
 ┃ ┣ 📂Like
 ┃ ┣ 📂LogIn
 ┃ ┣ 📂Main
 ┃ ┣ 📂PostCreate
 ┃ ┣ 📂PostDetail
 ┃ ┣ 📂PostUpdate
 ┃ ┣ 📂Search
 ┃ ┣ 📂SignUp
 ┃ ┣ 📂UserProfile
 ┃ ┣ 📂UserProfileCreate
 ┃ ┣ 📂UserProfileEdit
 ┃ ┗ 📜route.ts
 ┣ 📂shared
 ┃ ┣ 📂components
 ┃ ┣ 📂const
 ┃ ┣ 📂firebase
 ┃ ┣ 📂styles
 ┃ ┗ 📂utils
 ┗ 📂stores
```
