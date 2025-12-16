# Hable Front-End Project Guidelines (CLAUDE.md)

## 0. 🚨 필독: 프로젝트의 헌법 (Core Documents)
이 프로젝트의 모든 코드는 아래 두 문서를 엄격히 준수해야 한다. 코드를 작성하기 전에 반드시 이 파일들의 내용을 먼저 참조하라.

1.  **`requirements.md` (기능 명세서)**:
    - **역할:** "무엇을(What)" 만들지 정의함.
    - **규칙:** 여기에 정의된 '인수 조건(Acceptance Criteria)'을 만족하지 않는 코드는 작성하지 말 것.
2.  **`design.md` (설계 문서)**:
    - **역할:** "어떻게(How)" 만들지 정의함.
    - **규칙:** 컴포넌트 이름, 데이터 모델(Interface), 상태 관리(Context) 방식은 이 문서를 100% 따를 것.

---

## 1. 기술 스택 & 환경 (Tech Stack)
- **Runtime:** Node.js (v20+), npm
- **Framework:** React 19.1.0 + Vite (빠른 빌드)
- **Styling:** Tailwind CSS 3.4 (유틸리티 클래스 우선 사용)
- **State Management:** React Context API (design.md 참조)
- **Routing:** React Router DOM v6
- **Icons:** Heroicons

## 2. 코딩 원칙 (Coding Standards)

### A. 컴포넌트 구조
- **함수형 컴포넌트:** `const ComponentName = () => {}` 형태 사용.
- **분리 원칙:**
    - 페이지 레벨: `src/pages/` (라우팅 단위)
    - 재사용 컴포넌트: `src/components/`
    - 비즈니스 로직: 복잡한 로직은 Custom Hook(`src/hooks/`)으로 분리.
- **파일명:** 컴포넌트는 `PascalCase.jsx`, 일반 유틸/함수는 `camelCase.js`.

### B. 스타일링 (Tailwind CSS)
- 인라인 스타일(`style={{...}}`) 사용 금지. 무조건 Tailwind 클래스 사용.
- **모바일 우선(Mobile First):** 기본 클래스는 모바일용, `md:`, `lg:` 접두사로 데스크톱 대응.
    - 예: `className="w-full md:w-1/2"` (모바일에선 꽉 차게, PC에선 절반)

### C. 상태 관리 & 데이터
- **Context API:** `design.md`의 'Context Management' 섹션에 정의된 구조(CartContext 등)를 준수할 것.
- **Type/Interface:** `design.md`의 'Data Models' 섹션에 정의된 TypeScript 인터페이스 구조를 주석이나 PropTypes(또는 TS)로 지킬 것.

---

## 3. 구현 워크플로우 (Implementation Workflow)
AI는 다음 순서로 작업을 진행해야 한다:

1.  **요구사항 확인:** 사용자가 요청 하면, `requirements.md' 를 읽는다.
2.  **설계 참조:** `design.md`의 컴포넌트 명세와 요구사항을 확인한다.
3.  **코드 작성:** 위 내용을 바탕으로 코드를 구현한다.
4.  **검증:** 작성된 코드가 `requirements.md`의 인수 조건(Acceptance Criteria)을 통과하는지 스스로 체크한다.

## 4. 커뮤니케이션 규칙
- 코드를 수정할 때는 "어떤 파일"을 수정하는지 명시할 것.
- `requirements.md`에 없는 기능을 추가하려 할 때는 사용자에게 먼저 물어볼 것.
- 에러 발생 시 단순 수정보다는 `design.md`의 설계 의도에 맞는지 먼저 판단할 것.