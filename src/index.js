// ============================================================
// opsoult.com — 매장 설비 설치 플랫폼
// Cloudflare Workers 단일 파일
// 수정: Ctrl+F 로 원하는 섹션 찾기
// 섹션 목록:
//   [01] SITE 기본 설정 (전화번호/브랜드명)
//   [02] REGIONS 지역 데이터 (17개 광역시도)
//   [03] PRODUCTS 제품 데이터 (7개)
//   [04] COMPANY 회사 강점·특장점·통계
//   [05] REVIEWS 후기 (12개)
//   [06] 공통 스타일 (CSS)
//   [07] 공통 헤더/푸터
//   [08] 메인 페이지 렌더
//   [09] 지역별 페이지 렌더
//   [10] 제품별 페이지 렌더
//   [11] 지역x제품 설치 페이지 렌더
//   [12] 인덱스 페이지 (/region, /product)
//   [13] sitemap.xml
//   [14] robots.txt
//   [15] 404
//   [16] fetch 라우터 (핵심 라우팅)
// ============================================================

// [01] SITE 기본 설정 =========================================
const SITE = {
  brandName: '오페리오솔루션',
  brandNameKo: '오페리오솔루션',
  domain: 'https://opsoult.com',
  phone: '010-4827-5592',
  phoneDisplay: '010-4827-5592',
  businessHours: '평일 09:00 - 19:00 / 토 09:00 - 15:00',
  description: '전국 매장 설비 설치 전문. 카드단말기·포스기·키오스크·테이블오더·CCTV까지 원스톱 설치.',
  naverVerification: '669cd60625b7336f4e33d5cc0a3af618bc9fbfbb',
  stats: {
    totalInstalls: '254,692',
    satisfaction: '98%',
    installRate: '94%',
    renewalRate: '87%',
    coverage: '5,000+',
  },
};

// [01-A] HERO BANNER — 메인 히어로 배너 (Base64 인라인 WebP, 18KB)
// 배너 교체 시: WebP 로 변환하고 base64 문자열만 교체하면 됨
// 사이즈: 1200×216 (가로 5.5:1 비율)
const HERO_BANNER = 'data:image/webp;base64,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';

// [02] REGIONS 지역 데이터 (17개 광역시도) ===================
// 새 지역은 여기에 추가. slug는 영문 소문자, URL에 사용됨.
const REGIONS = [
  {
    slug: 'seoul', name: '서울', fullName: '서울특별시', emoji: '🏙',
    majorDistricts: ['강남구', '서초구', '송파구', '마포구', '종로구', '용산구', '성동구', '광진구', '영등포구', '동작구'],
    landmarks: '강남역, 명동, 홍대, 이태원, 여의도, 광화문, 잠실, 성수동',
    commercialAreas: ['강남역 상권', '홍대 상권', '명동 상권', '가로수길', '성수동 카페거리'],
    description: '대한민국 수도 서울은 전국에서 매장 설비 수요가 가장 많은 지역입니다. 카페·음식점·미용실·편의점 등 업종을 불문하고 결제·주문 시스템이 매출에 직결되는 치열한 상권 환경입니다.',
    installTime: '당일 설치 가능',
    coverage: '서울 25개 자치구 전 지역',
  },
  {
    slug: 'gyeonggi', name: '경기', fullName: '경기도', emoji: '🌿',
    majorDistricts: ['수원시', '성남시', '고양시', '용인시', '부천시', '안산시', '화성시', '안양시', '남양주시', '평택시'],
    landmarks: '판교테크노밸리, 광교신도시, 동탄신도시, 일산호수공원, 분당, 수원화성',
    commercialAreas: ['판교 상권', '분당 서현역', '일산 라페스타', '수원 인계동', '안양 1번가'],
    description: '인구 1위 경기도는 신도시와 구도심이 공존하는 다양한 상권이 특징입니다. 프랜차이즈 본사가 집중된 판교·분당부터 동탄·광교 같은 신흥 상권까지 매장 설비 수요가 꾸준합니다.',
    installTime: '1-2일 이내',
    coverage: '경기도 31개 시군 전역',
  },
  {
    slug: 'incheon', name: '인천', fullName: '인천광역시', emoji: '✈️',
    majorDistricts: ['연수구', '남동구', '부평구', '서구', '계양구', '미추홀구', '중구', '동구'],
    landmarks: '인천국제공항, 송도국제도시, 월미도, 차이나타운, 인천대공원',
    commercialAreas: ['송도 센트럴파크', '구월동 로데오', '부평역 상권', '청라국제도시'],
    description: '국제공항과 항만을 끼고 있는 인천은 송도·청라 같은 신도시 상권이 급성장 중입니다. 외국인 고객이 많은 지역 특성상 다국어 결제 시스템 수요도 높습니다.',
    installTime: '1일 이내',
    coverage: '인천 10개 구·군 전 지역',
  },
  {
    slug: 'busan', name: '부산', fullName: '부산광역시', emoji: '⚓',
    majorDistricts: ['해운대구', '수영구', '부산진구', '동래구', '남구', '연제구', '금정구', '사하구'],
    landmarks: '해운대 해수욕장, 광안리, 서면, 센텀시티, 남포동, 감천문화마을',
    commercialAreas: ['서면 상권', '해운대 관광 상권', '센텀시티', '남포동', '광안리'],
    description: '대한민국 제2의 도시 부산은 관광지와 상업지구가 공존하는 독특한 상권입니다. 특히 해운대·광안리는 국내외 관광객으로 매장 회전율이 높아 빠른 결제 시스템이 필수입니다.',
    installTime: '1-2일 이내',
    coverage: '부산 16개 구·군 전 지역',
  },
  {
    slug: 'daegu', name: '대구', fullName: '대구광역시', emoji: '🏭',
    majorDistricts: ['중구', '수성구', '달서구', '북구', '동구', '남구', '서구'],
    landmarks: '동성로, 두류공원, 수성못, 팔공산, 서문시장, 김광석거리',
    commercialAreas: ['동성로 상권', '들안길 먹거리타운', '수성구 범어동', '월배 상권'],
    description: '영남 최대 상권을 보유한 대구는 동성로를 중심으로 한 전통 상권과 수성구의 고급 주택가 상권이 발달해 있습니다. 섬유·패션 산업 기반 매장이 많아 POS·재고관리 시스템 수요가 큽니다.',
    installTime: '1-2일 이내',
    coverage: '대구 8개 구·군 전역',
  },
  {
    slug: 'daejeon', name: '대전', fullName: '대전광역시', emoji: '🔬',
    majorDistricts: ['유성구', '서구', '중구', '동구', '대덕구'],
    landmarks: '대덕연구단지, 엑스포과학공원, 유성온천, 한밭수목원, 으능정이',
    commercialAreas: ['둔산동 상권', '유성온천역', '은행동 으능정이', '노은동'],
    description: '과학·연구도시 대전은 공공기관과 대학이 밀집한 상권이 강점입니다. 유성구·서구 중심으로 프랜차이즈 매장 수요가 꾸준하고, 청년층 타겟 키오스크 설치가 활발합니다.',
    installTime: '1-2일 이내',
    coverage: '대전 5개 구 전역',
  },
  {
    slug: 'gwangju', name: '광주', fullName: '광주광역시', emoji: '🌸',
    majorDistricts: ['북구', '광산구', '서구', '남구', '동구'],
    landmarks: '무등산, 상무지구, 금남로, 양림동 근대역사마을, 충장로',
    commercialAreas: ['충장로 상권', '상무지구', '첨단지구', '금남로'],
    description: '호남 최대 도시 광주는 충장로·상무지구를 중심으로 한 청년층 상권이 활발합니다. 카페·음식점 신규 오픈이 많아 매장 풀패키지 설치 수요가 높은 편입니다.',
    installTime: '1-2일 이내',
    coverage: '광주 5개 구 전역',
  },
  {
    slug: 'ulsan', name: '울산', fullName: '울산광역시', emoji: '🔧',
    majorDistricts: ['남구', '중구', '북구', '동구', '울주군'],
    landmarks: '태화강 국가정원, 대왕암공원, 간절곶, 현대자동차 울산공장',
    commercialAreas: ['삼산동 상권', '성남동 구시가지', '울산대 앞', '방어진'],
    description: '산업도시 울산은 대기업 근로자 상권이 활성화된 곳이 많습니다. 삼산동 중심가와 동구 현대중공업 인근 식당·주점 상권에서 빠른 결제 시스템과 POS 설치 문의가 꾸준합니다.',
    installTime: '1-2일 이내',
    coverage: '울산 5개 구·군 전역',
  },
  {
    slug: 'sejong', name: '세종', fullName: '세종특별자치시', emoji: '🏛',
    majorDistricts: ['조치원읍', '한솔동', '도담동', '새롬동', '다정동', '소담동', '대평동', '보람동'],
    landmarks: '정부세종청사, 호수공원, 국립세종수목원, 베어트리파크',
    commercialAreas: ['어진동 상권', '나성동', '도담동', '조치원'],
    description: '신행정수도 세종은 공무원·공공기관 수요 중심의 깨끗한 신도시 상권입니다. 아파트 단지 상가에 카페·음식점·학원 등이 밀집해 키오스크·테이블오더 수요가 급성장 중입니다.',
    installTime: '1-2일 이내',
    coverage: '세종시 전 지역',
  },
  {
    slug: 'gangwon', name: '강원', fullName: '강원특별자치도', emoji: '🏔',
    majorDistricts: ['춘천시', '원주시', '강릉시', '속초시', '동해시', '삼척시', '태백시'],
    landmarks: '설악산, 경포해변, 남이섬, 오색케이블카, 평창올림픽파크',
    commercialAreas: ['춘천 명동', '강릉 교동택지', '원주 단구동', '속초 중앙시장 인근'],
    description: '관광 중심 지역 강원도는 시즌 편차가 큰 상권이 특징입니다. 속초·강릉·평창 관광지는 성수기 결제가 집중되어 안정적인 무선 단말기·키오스크 수요가 큽니다.',
    installTime: '2-3일 이내',
    coverage: '강원 18개 시군 전역',
  },
  {
    slug: 'chungbuk', name: '충북', fullName: '충청북도', emoji: '🌻',
    majorDistricts: ['청주시', '충주시', '제천시', '보은군', '옥천군', '영동군', '증평군', '진천군', '음성군', '단양군', '괴산군'],
    landmarks: '청남대, 속리산, 수안보온천, 단양팔경, 충주호',
    commercialAreas: ['청주 성안길', '청주 강서지구', '충주 연수동', '제천 중앙시장'],
    description: '교통의 요지 충청북도는 청주를 중심으로 대학가·신도시 상권이 활발합니다. 오창·오송 산업단지 배후 상권과 청주공항 주변 상업지구에서 매장 설비 문의가 이어집니다.',
    installTime: '2-3일 이내',
    coverage: '충북 11개 시군 전역',
  },
  {
    slug: 'chungnam', name: '충남', fullName: '충청남도', emoji: '🌊',
    majorDistricts: ['천안시', '아산시', '서산시', '당진시', '논산시', '공주시', '보령시', '계룡시'],
    landmarks: '독립기념관, 공주 무령왕릉, 부여 백제유적, 태안해안국립공원, 현충사',
    commercialAreas: ['천안 신부동', '천안 불당동', '아산 온양', '당진 시내'],
    description: '수도권과 인접한 충남은 천안·아산을 중심으로 한 산업단지 배후 상권이 활발합니다. 자동차·디스플레이 산업 근로자 대상 식당·카페 상권에서 매장 설비 수요가 꾸준합니다.',
    installTime: '2-3일 이내',
    coverage: '충남 15개 시군 전역',
  },
  {
    slug: 'jeonbuk', name: '전북', fullName: '전북특별자치도', emoji: '🌾',
    majorDistricts: ['전주시', '군산시', '익산시', '정읍시', '남원시', '김제시'],
    landmarks: '전주한옥마을, 덕진공원, 군산 근대역사박물관, 변산반도, 지리산',
    commercialAreas: ['전주 객사길', '전주 혁신도시', '군산 수송동', '익산역 일대'],
    description: '관광 도시 전주를 중심으로 음식·숙박 업종이 발달한 전북은 한옥마을 등 관광지 결제 시스템 수요가 큽니다. 군산·익산 산업지역 상권도 꾸준히 성장 중입니다.',
    installTime: '2-3일 이내',
    coverage: '전북 14개 시군 전역',
  },
  {
    slug: 'jeonnam', name: '전남', fullName: '전라남도', emoji: '🍵',
    majorDistricts: ['목포시', '여수시', '순천시', '나주시', '광양시', '담양군'],
    landmarks: '순천만 국가정원, 여수엑스포, 보성녹차밭, 담양 죽녹원, 해남 땅끝마을',
    commercialAreas: ['여수 돌산', '순천 조례동', '목포 하당', '광양 중동'],
    description: '남해안 관광벨트를 끼고 있는 전남은 여수·순천 관광지 중심 상권이 활발합니다. 해산물 식당, 카페, 펜션 등 관광 연계 업종의 결제·예약 시스템 수요가 지속 증가하고 있습니다.',
    installTime: '2-3일 이내',
    coverage: '전남 22개 시군 전역',
  },
  {
    slug: 'gyeongbuk', name: '경북', fullName: '경상북도', emoji: '🍎',
    majorDistricts: ['포항시', '경주시', '구미시', '안동시', '영천시', '상주시', '문경시'],
    landmarks: '경주 불국사, 안동 하회마을, 포항 영일대, 구미 금오산, 울릉도',
    commercialAreas: ['포항 죽도시장', '경주 보문단지', '구미 인동', '안동 중앙신시장'],
    description: '역사 관광의 메카 경북은 경주를 중심으로 한 관광 상권과 포항·구미의 산업 상권이 양대 축입니다. 대규모 관광객 처리를 위한 키오스크 수요와 산업도시 식당가 POS 수요가 공존합니다.',
    installTime: '2-3일 이내',
    coverage: '경북 23개 시군 전역',
  },
  {
    slug: 'gyeongnam', name: '경남', fullName: '경상남도', emoji: '🌊',
    majorDistricts: ['창원시', '김해시', '양산시', '진주시', '거제시', '통영시', '사천시'],
    landmarks: '창원 용지호수, 진주성, 통영 미륵산, 거제 외도, 합천 해인사',
    commercialAreas: ['창원 상남동', '김해 내외동', '진주 신안동', '양산 물금'],
    description: '제조업 중심지 경남은 창원·김해·양산 라인에 대규모 상권이 형성되어 있습니다. 조선·자동차 산업 근로자 대상 식당가와 신도시 카페 거리가 주요 설비 설치 타깃입니다.',
    installTime: '2-3일 이내',
    coverage: '경남 18개 시군 전역',
  },
  {
    slug: 'jeju', name: '제주', fullName: '제주특별자치도', emoji: '🌺',
    majorDistricts: ['제주시', '서귀포시'],
    landmarks: '한라산, 성산일출봉, 협재해변, 우도, 중문관광단지',
    commercialAreas: ['제주시 노형동', '제주 연동', '서귀포 중문', '애월 카페거리'],
    description: '연간 관광객 1,500만 명의 제주는 전국에서 카페·식당 업종 밀도가 가장 높은 지역 중 하나입니다. 관광객 중심 업소는 빠른 결제와 다국어 키오스크가 필수입니다.',
    installTime: '3-4일 이내 (항공 배송 포함)',
    coverage: '제주시·서귀포시 전 지역',
  },
];

// [03] PRODUCTS 제품 데이터 (7개) ===========================
const PRODUCTS = [
  {
    slug: 'card-terminal',
    name: '카드단말기', emoji: '💳',
    shortDesc: '유선·무선·블루투스·토스단말기까지. VAN사 수수료 비교로 최저가 제공.',
    longDesc: '카드단말기는 매장 결제의 기본이자 핵심 장비입니다. 오페리오솔루션는 10개 이상의 VAN사와 협력해 매장 매출 규모와 업종에 맞는 최적의 수수료 조건을 제안합니다. 유선·무선·블루투스·토스 단말기 등 전 기종을 취급하며, 당일 출장 설치와 사용법 교육까지 원스톱으로 제공합니다. 기존 단말기 교체 시에는 VAN사 비교를 통해 월 평균 3-7만원, 연 40-80만원의 수수료를 절약할 수 있습니다.',
    keywords: '카드단말기 설치, VAN사 비교, 카드결제기, 신용카드 단말기',
    features: [
      { title: 'VAN사 수수료 비교', desc: '10개 이상 VAN사 중 매장에 유리한 조건 선별' },
      { title: '전 기종 취급', desc: '유선·무선·블루투스·토스·IC 단말기까지' },
      { title: '당일 설치', desc: '오전 문의 시 당일 출장 설치 가능' },
      { title: '무상 A/S', desc: '장애 발생 시 원격 우선, 필요 시 현장 출동' },
    ],
    useCases: '카페, 음식점, 미용실, 소매점, 편의점, 학원',
  },
  {
    slug: 'pos',
    name: '포스기', emoji: '🖥️',
    shortDesc: '주문·결제·매출·재고를 한 번에. 배달앱·오프라인 통합 대시보드.',
    longDesc: 'POS 시스템은 주문 접수부터 결제, 재고 관리, 매출 분석까지 매장 운영의 모든 데이터를 한 곳에서 관리하는 핵심 장비입니다. 배달의민족, 쿠팡이츠, 요기요 등 주요 배달앱과 오프라인 매출을 통합해 실시간 대시보드로 확인할 수 있습니다. 직원 근태 관리, 세무 보고서 자동 생성 기능까지 포함해 매장 운영 효율을 극대화합니다.',
    keywords: '포스기 설치, POS 시스템, 매장 포스기, 음식점 포스',
    features: [
      { title: '통합 매출 관리', desc: '배달앱·오프라인 매출을 한 화면에' },
      { title: '재고 자동 관리', desc: '판매 시 재고 차감, 소진 시 알림' },
      { title: '직원 근태 관리', desc: '출퇴근·매출 권한을 직원별로 분리' },
      { title: '세무 연동', desc: '매출 데이터 자동 세무 보고서 생성' },
    ],
    useCases: '음식점, 카페, 베이커리, 주점, 편의점, 소매점',
  },
  {
    slug: 'kiosk',
    name: '키오스크', emoji: '🤖',
    shortDesc: '무인 주문·결제 시스템으로 인건비 절감. 소형·대형 모두 지원.',
    longDesc: '키오스크는 고객이 직접 주문·결제를 완료하는 무인 시스템으로, 인건비 절감과 주문 정확도 향상을 동시에 달성합니다. 21~32인치 대형 키오스크부터 10인치 미니 키오스크까지 매장 규모에 맞는 기종을 제안하며, POS·테이블오더와 완벽 연동됩니다. 다국어 지원으로 외국인 고객도 쉽게 주문할 수 있으며, 평균 객단가 15-25% 상승 효과가 검증되었습니다.',
    keywords: '키오스크 설치, 무인 주문기, 셀프오더, 키오스크 대여',
    features: [
      { title: '인건비 절감', desc: '홀 인력 50% 감축, 월 200만원대 절약' },
      { title: '주문 정확도', desc: '고객 직접 입력으로 주문 실수 0건' },
      { title: '객단가 상승', desc: '추천 메뉴 노출로 평균 15~25% 상승' },
      { title: '다국어 지원', desc: '한국어·영어·중국어·일본어 기본' },
    ],
    useCases: '패스트푸드, 분식집, 카페, 음식점, 무인 매장',
  },
  {
    slug: 'table-order',
    name: '테이블오더', emoji: '📋',
    shortDesc: 'QR·태블릿 기반 주문 시스템. 객단가 상승과 홀 인력 절감 동시에.',
    longDesc: '테이블오더는 고객이 자리에서 직접 주문·결제하는 시스템으로, 홀 직원의 주문 받기·결제 업무를 없애 객단가 상승과 인력 절감 효과를 동시에 제공합니다. 태블릿 설치형과 QR 스캔 방식을 매장 특성에 맞게 선택할 수 있으며, POS 연동으로 주문 즉시 주방 프린터 출력까지 자동 처리됩니다. 메뉴 사진 노출로 추가 주문이 평균 22% 증가합니다.',
    keywords: '테이블오더 설치, QR 주문, 태블릿 주문, 스마트오더',
    features: [
      { title: '홀 인력 절감', desc: '주문·결제 자동화로 홀 직원 50% 감축' },
      { title: '객단가 상승', desc: '메뉴 사진 노출로 추가 주문 22% 증가' },
      { title: 'QR + 태블릿', desc: '매장 분위기에 맞춰 고객 접점 선택' },
      { title: 'POS 완벽 연동', desc: '주문 즉시 주방 프린터 출력' },
    ],
    useCases: '음식점, 카페, 주점, 고깃집, 횟집, 이자카야',
  },
  {
    slug: 'cctv',
    name: 'CCTV', emoji: '📷',
    shortDesc: 'HD~4K 고화질, AI 움직임 감지, 스마트폰 원격 모니터링까지.',
    longDesc: '매장 CCTV는 도난·사고 방지, 직원 관리, 보험료 절감을 위한 필수 장비입니다. 오페리오솔루션는 HD부터 4K까지 다양한 화질 선택과 AI 움직임 감지, 스마트폰 원격 확인, POS 연동 영상 매칭까지 제공합니다. 결제 시점 영상 자동 매칭으로 매출 누락을 사전 방지하며, CCTV 설치 매장은 화재·도난 보험료 10-20% 할인 혜택을 받을 수 있습니다.',
    keywords: 'CCTV 설치, 매장 CCTV, 원격 감시, 4K CCTV, AI CCTV',
    features: [
      { title: '스마트폰 원격 확인', desc: '언제 어디서나 매장 실시간 확인' },
      { title: 'AI 움직임 감지', desc: '영업 외 시간 침입 시 즉시 알림' },
      { title: 'POS 연동', desc: '결제 시점 영상 자동 매칭으로 매출 누락 방지' },
      { title: '보험료 할인', desc: 'CCTV 설치 매장은 화재·도난 보험료 10% 절감' },
    ],
    useCases: '모든 매장, 특히 야간 영업 / 고가품 취급 매장',
  },
  {
    slug: 'vending',
    name: '밴딩머신', emoji: '🏭',
    shortDesc: '판매 + 광고 이중 수익. 23인치 터치스크린 자동판매기.',
    longDesc: '최신 LK 밴딩머신은 판매 수익과 광고 수익을 동시에 창출하는 차세대 자판기입니다. 23.4인치 터치스크린으로 광고 송출, 매장 공지, 메뉴판 표시까지 가능하며, 원격 재고 관리와 매출 분석 기능을 제공합니다. 카드·삼성페이·카카오페이·제로페이 등 모든 간편결제를 지원해 무인 운영 환경에서도 안정적인 결제가 가능합니다.',
    keywords: '밴딩머신, 자동판매기, 자판기 설치, 터치스크린 자판기',
    features: [
      { title: '이중 수익', desc: '판매 수익 + 광고 노출 수익' },
      { title: '원격 재고 관리', desc: '앱에서 재고·매출 실시간 확인' },
      { title: '간편결제 전체 지원', desc: '카드·삼성페이·카카오페이' },
      { title: '스마트 공지', desc: '매장 이벤트·공지를 화면으로 송출' },
    ],
    useCases: '매장 앞 외부, 스터디카페, PC방, 헬스장, 오피스',
  },
  {
    slug: 'removal',
    name: '매장철거', emoji: '🔨',
    shortDesc: '매장·사무실 철거 + 원상복구 원스톱. 보증금 반환까지 책임.',
    longDesc: '매장 철거는 폐업·이전 시 보증금 반환에 직결되는 중요한 공정입니다. 오페리오솔루션는 정밀 현장 분석부터 철거·원상복구·폐기물 처리까지 원스톱으로 처리하며, 시공 보증서 발급으로 사후 책임까지 확실히 합니다. 추가 비용 없는 정찰제 운영과 실시간 공정 보고로 임대인과의 분쟁을 사전 예방합니다.',
    keywords: '매장 철거, 원상복구, 사무실 철거, 상가 철거',
    features: [
      { title: '정확한 정찰 견적', desc: '현장 실측 후 확정, 추가비 없음' },
      { title: '원상복구 포함', desc: '바닥·벽·천장까지 깔끔 마감' },
      { title: '폐기물 적법 처리', desc: '관련 법규에 맞는 분류·수거' },
      { title: '시공 보증서', desc: '하자 발생 시 무상 보수' },
    ],
    useCases: '음식점 폐업, 카페 이전, 사무실 이사, 상가 리모델링',
  },
];

// [04] COMPANY 강점·특장점 =====================================
const STRENGTHS = [
  { icon: '🏆', stat: '254,692', title: '누적 설치 건수', desc: '전국 직접 출장 설치' },
  { icon: '⚡', stat: '빠른', title: '신속 설치 완료', desc: '상담 후 빠른 설치' },
  { icon: '💰', stat: '무료', title: '무료 견적·상담', desc: '부담 없이 비교하세요' },
  { icon: '🔧', stat: 'A/S', title: '빠른 사후 지원', desc: '장애 시 빠른 출동' },
];

const SMART_FEATURES = [
  { icon: '✏️', title: '맞춤형 UI 설정', desc: '우리 매장에 딱 맞는 메뉴 배치와 결제 동선을 직접 설계하여 계산 시간을 단축하세요.' },
  { icon: '📊', title: '통합 매출 관리', desc: '배달 앱, 오프라인 결제 데이터를 하나로 모아 실시간 매출 추이를 한눈에 파악합니다.' },
  { icon: '🔌', title: '원격 지원', desc: '기기 장애 발생 시, 기다릴 필요 없이 즉시 원격 지원을 통해 문제를 해결해 드립니다.' },
  { icon: '💡', title: 'AI 매출 분석', desc: '요일별·시간대별 방문 패턴을 분석하여 최적의 운영 시간을 제안합니다.' },
  { icon: '🍽️', title: '테이블 오더 연동', desc: '자리에 앉아 주문부터 결제까지 한 번에 끝내는 테이블 오더 시스템과 완벽하게 연동됩니다.' },
  { icon: '⭐', title: '스마트 리뷰 연동', desc: '매장 리뷰와 SNS 피드백을 실시간으로 확인하며 고객 소통을 강화할 수 있습니다.' },
];

const WHY_US = [
  { icon: '🎯', title: '업종별 1:1 맞춤 설치', desc: '음식점·카페·편의점·미용실 등 업종 특성에 맞는 최적 장비를 분석해 추천합니다.' },
  { icon: '📦', title: '전 제품 원스톱 통합 설치', desc: '카드단말기부터 CCTV까지 매장에 필요한 모든 장비를 한번에 설치합니다.' },
  { icon: '💰', title: 'VAN사 수수료 비교·절감', desc: 'VAN사별 수수료를 비교 분석해 가장 유리한 조건을 찾아드립니다. 연 수십만원 절약.' },
  { icon: '🔧', title: '설치 후 A/S·유지보수 보장', desc: '장애 발생 시 원격 지원으로 빠르게 해결하며, 필요 시 현장 출동합니다.' },
];

// [04-1] INDUSTRIES 업종 데이터 ==============================
// 새 업종 추가 시 slug는 영문 소문자. 키워드는 SEO 에 노출됨.
const INDUSTRIES = [
  {
    slug: 'restaurant', name: '음식점', emoji: '🍽️',
    shortDesc: '일반식당·한식·중식·분식·주점 — 주문부터 결제까지 회전율을 끌어올리는 조합',
    recommended: ['pos', 'card-terminal', 'table-order', 'kiosk', 'cctv'],
    description: '좌석 회전율과 주문 정확도가 매출에 직결되는 음식점에는 POS · 카드단말기 · 테이블오더 · 키오스크 조합이 가장 효과적입니다. 주방 프린터 자동 연동으로 주문 누락을 방지하고, 배달앱 통합 매출 관리로 정산까지 한 번에 처리합니다.',
  },
  {
    slug: 'cafe', name: '카페·디저트', emoji: '☕',
    shortDesc: '스페셜티 카페·디저트샵·베이커리 — 감성 매장에 맞는 깔끔한 결제 동선',
    recommended: ['pos', 'kiosk', 'card-terminal', 'table-order'],
    description: '피크타임 대기열 관리가 핵심인 카페에는 미니 키오스크 · POS · 무선 단말기 조합을 추천합니다. 포장·매장·배달 주문 분리, 스탬프·포인트 적립 연동까지 완벽 지원합니다.',
  },
  {
    slug: 'convenience-store', name: '편의점·소매점', emoji: '🏪',
    shortDesc: '편의점·슈퍼·잡화점·무인매장 — 재고·매출 관리 자동화 솔루션',
    recommended: ['pos', 'card-terminal', 'cctv', 'vending'],
    description: '다품목 재고 관리가 중요한 소매 매장에는 POS 재고 자동 차감 · 바코드 스캐너 · CCTV 연동 패키지가 효과적입니다. 24시간 무인 운영도 가능합니다.',
  },
  {
    slug: 'salon', name: '미용실·네일', emoji: '💇',
    shortDesc: '헤어살롱·네일샵·에스테틱·피부관리 — 예약과 결제가 매끄럽게',
    recommended: ['pos', 'card-terminal', 'table-order'],
    description: '예약 관리와 회원 포인트가 중요한 미용 업종은 POS 회원 관리 · 카드단말기 · 결제 연동 예약 시스템 조합이 유리합니다. 시술별 매출 분석으로 수익성 높은 메뉴를 파악할 수 있습니다.',
  },
  {
    slug: 'franchise', name: '프랜차이즈', emoji: '🏢',
    shortDesc: '다점포 운영·본사 관리 — 통합 매출·재고 대시보드',
    recommended: ['pos', 'kiosk', 'table-order', 'cctv', 'card-terminal'],
    description: '프랜차이즈 본사 또는 다점포 운영자는 매장별 매출·재고 통합 관리가 핵심입니다. 본사 대시보드에서 전 매장 실시간 확인, 신규 매장 오픈 시 풀패키지 원스톱 설치를 제공합니다.',
  },
  {
    slug: 'academy', name: '학원·스터디카페', emoji: '📚',
    shortDesc: '학원·독서실·스터디카페·무인 스터디룸 — 출입·결제 자동화',
    recommended: ['kiosk', 'card-terminal', 'cctv', 'vending'],
    description: '무인 운영이 확산되는 스터디카페·독서실에는 키오스크 · 자동판매기 · CCTV 조합이 필수입니다. 좌석 예약, 시간제 결제, 보안 모니터링까지 한 번에 구축할 수 있습니다.',
  },
  {
    slug: 'fitness', name: '헬스장·필라테스', emoji: '💪',
    shortDesc: '헬스장·필라테스·요가·PT — 회원권 결제와 출입 관리',
    recommended: ['pos', 'card-terminal', 'kiosk', 'cctv'],
    description: '회원권 관리가 매출의 핵심인 피트니스 업종은 POS 회원 관리 · 자동 결제 · 출입 연동 시스템을 권장합니다. 락커·라커룸 CCTV 설치로 회원 신뢰도도 높일 수 있습니다.',
  },
  {
    slug: 'medical', name: '병원·약국', emoji: '🏥',
    shortDesc: '병원·의원·약국·한의원 — 접수부터 수납까지 효율화',
    recommended: ['pos', 'kiosk', 'card-terminal', 'cctv'],
    description: '접수·수납 대기가 긴 의료 업종에는 키오스크 · 카드단말기 · CCTV 패키지가 효과적입니다. 환자 개인정보 보호와 영상 기록으로 의료 분쟁 대응까지 가능합니다.',
  },
];

// [05] REVIEWS 후기 (12개) ====================================
const REVIEWS = [
  { badge: '매출 40%↑', title: '카드단말기 교체 후 카드매출 급증', body: '수수료 비교까지 해주셔서 연간 60만원 절약하고 매출도 올랐어요.', author: '서울 강남구 카페 사장님' },
  { badge: '인건비 50%↓', title: '키오스크 설치 후 홀 인건비 반으로', body: '테이블오더+키오스크로 홀 직원 2명→1명. 서비스 품질도 유지됩니다.', author: '부산 해운대구 음식점 사장님' },
  { badge: '수수료 절감', title: 'VAN사 변경으로 연 40만원 절약', body: '기존보다 수수료 저렴한 VAN사로 바꿔주셔서 매년 절약 중입니다.', author: '경기 수원시 소매점 사장님' },
  { badge: '빠른 설치', title: '전화 한 통으로 빠른 설치 완료', body: '급하게 필요했는데 빠르게 설치해주셨어요. 바로 영업 시작할 수 있었습니다.', author: '대전 유성구 음식점 사장님' },
  { badge: '무인화 성공', title: '24시간 무인매장 전환 완료', body: 'CCTV 설치로 월 매출 30% 증가했습니다.', author: '인천 연수구 스터디카페 사장님' },
  { badge: 'A/S 최고', title: '포스기 장애 빠르게 해결', body: '전화하니 빠르게 해결해주셨어요. 이런 A/S는 처음입니다.', author: '광주 서구 미용실 사장님' },
  { badge: 'CCTV 만족', title: '스마트폰으로 매장 실시간 확인', body: '매장에 없어도 스마트폰으로 확인 가능. CCTV 화질도 선명합니다.', author: '서울 마포구 음식점 사장님' },
  { badge: '매출 증가', title: '테이블오더 도입 후 객단가 25% 상승', body: '메뉴 사진 보고 추가 주문이 늘었어요. 직원 호출도 줄어서 편해요.', author: '경기 분당구 치킨집 사장님' },
  { badge: '포스기 추천', title: '매출 관리가 이렇게 쉬울 줄이야', body: '일별·월별 매출 자동 리포트. 세무사한테 보내기도 편해요.', author: '서울 송파구 베이커리 사장님' },
  { badge: '깔끔 철거', title: '보증금 100% 돌려받았습니다', body: '원상복구 깔끔하게 해주셔서 임대인과 분쟁 없이 보증금 전액 반환.', author: '서울 종로구 옷가게 사장님' },
  { badge: '패키지 할인', title: '카드단말기+포스기+테이블오더 한번에', body: '신규 매장 오픈할 때 패키지로 한번에 설치. 시간과 비용 모두 절약.', author: '대구 수성구 카페 사장님' },
  { badge: '친절 상담', title: '어떤 장비가 맞는지 꼼꼼히 안내', body: '우리 매장 업종에 맞는 장비를 추천해주셔서 불필요한 비용 없었어요.', author: '울산 남구 분식집 사장님' },
];

// [06] 공통 스타일 =============================================
const STYLES = `
@import url('https://hangeul.pstatic.net/hangeul_static/css/gmarket-sans.css');
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.css');
:root{
  --ink:#0f172a;--ink-2:#1e293b;--ink-3:#334155;
  --paper:#fafaf9;--paper-2:#f4f4f2;--paper-3:#ebebe8;
  --accent:#0f172a;--accent-light:#334155;
  --line:#e5e7eb;--line-2:#d4d4d4;--muted:#64748b;--muted-2:#94a3b8;
  --success:#16a34a;--warn:#f59e0b;
  --max:1200px;--radius:16px;--radius-sm:10px;
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Pretendard Variable',Pretendard,-apple-system,BlinkMacSystemFont,system-ui,'Noto Sans KR',sans-serif;color:var(--ink);background:var(--paper);line-height:1.6;font-weight:400;overflow-x:hidden;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
a{color:inherit;text-decoration:none}
img,svg{max-width:100%;display:block}
.container{max-width:var(--max);margin:0 auto;padding:0 28px}

/* Typography */
.eyebrow{display:inline-flex;align-items:center;gap:8px;padding:6px 14px;background:#fff;border:1px solid var(--line);border-radius:100px;font-size:12.5px;font-weight:500;color:var(--ink-2);letter-spacing:.02em}
.eyebrow::before{content:"";width:5px;height:5px;border-radius:50%;background:var(--ink);display:inline-block}
.section-tag{font-size:11.5px;letter-spacing:0.18em;text-transform:uppercase;color:var(--muted);font-weight:600;margin-bottom:18px}
.section-title{font-family:'GmarketSansTTF','Gmarket Sans','Pretendard Variable',Pretendard,system-ui,sans-serif;font-size:clamp(30px,3.6vw,44px);line-height:1.12;letter-spacing:-0.025em;font-weight:600;color:var(--ink)}
.section-title em{font-style:italic;color:var(--ink)}
.section-desc{margin-top:16px;font-size:16px;color:var(--muted);line-height:1.7;max-width:640px}
section.block{padding:120px 0}

/* Buttons */
.btn{display:inline-flex;align-items:center;gap:8px;padding:14px 24px;border-radius:100px;font-size:14.5px;font-weight:500;font-family:inherit;transition:all .2s;cursor:pointer;border:0;letter-spacing:-0.01em}
.btn-primary{background:var(--ink);color:#fff}
.btn-primary:hover{background:var(--ink-2);transform:translateY(-1px);box-shadow:0 10px 25px rgba(15,23,42,0.2)}
.btn-ghost{background:transparent;color:var(--ink);border:1.5px solid var(--ink)}
.btn-ghost:hover{background:var(--ink);color:#fff}
.btn-light{background:#fff;color:var(--ink);border:1px solid var(--line)}
.btn-light:hover{border-color:var(--ink);transform:translateY(-1px)}

/* Header */
header{position:sticky;top:0;z-index:50;background:rgba(250,250,249,0.88);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid var(--line)}
.nav{display:flex;align-items:center;justify-content:space-between;height:72px;gap:24px}
.logo{font-family:'GmarketSansTTF','Gmarket Sans','Pretendard Variable',Pretendard,system-ui,sans-serif;font-weight:700;font-size:22px;letter-spacing:-0.03em;display:inline-flex;align-items:center;gap:10px;color:var(--ink)}
.logo-dot{width:28px;height:28px;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0}
.logo-dot svg{width:100%;height:100%;display:block}
.nav-menu{list-style:none;display:flex;gap:36px;font-size:14.5px;font-weight:500;margin:0 auto 0 40px}
.nav-menu a{color:var(--ink-2);transition:color .2s;position:relative}
.nav-menu a:hover{color:var(--ink)}
.nav-menu a:hover::after{content:"";position:absolute;bottom:-26px;left:0;right:0;height:2px;background:var(--ink)}
.nav-cta{background:var(--ink);color:#fff;padding:10px 20px;border-radius:100px;font-size:13.5px;font-weight:500;display:inline-flex;align-items:center;gap:6px;transition:background .2s}
.nav-cta:hover{background:var(--ink-2)}

/* Hero — 풀폭 배너 */
.hero{padding:48px 0 60px;position:relative;overflow:hidden}
.hero-banner{width:100%;border-radius:20px;overflow:hidden;background:#0c0f14;line-height:0;box-shadow:0 24px 60px rgba(15,23,42,0.18)}
.hero-banner img{width:100%;height:auto;display:block}
.hero-ctas-center{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;margin-top:36px}
.hero-ctas-center .btn{font-size:15.5px;padding:16px 28px}

/* Trust bar (stats) */
.stats-section{background:var(--ink);color:#fff;padding:56px 0}
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px}
.stat-card{text-align:center;padding:0 20px;border-right:1px solid rgba(255,255,255,0.08)}
.stat-card:last-child{border-right:0}
.stat-card .n{font-family:'GmarketSansTTF','Gmarket Sans','Pretendard Variable',Pretendard,system-ui,sans-serif;font-size:44px;font-weight:700;letter-spacing:-0.03em;line-height:1}
.stat-card .n span{color:var(--muted-2)}
.stat-card .l{font-size:13px;color:var(--muted-2);margin-top:8px;letter-spacing:.02em}

/* Strengths */
.strengths-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-top:48px}
.strength-card{background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:36px 28px;transition:all .25s}
.strength-card:hover{transform:translateY(-3px);border-color:var(--ink);box-shadow:0 16px 40px rgba(15,23,42,0.06)}
.strength-card .sicon{width:48px;height:48px;border-radius:12px;background:var(--ink);display:flex;align-items:center;justify-content:center;margin-bottom:20px;color:#fff}
.strength-card .sicon svg{width:24px;height:24px}
.strength-card .sval{font-family:'GmarketSansTTF','Gmarket Sans','Pretendard Variable',Pretendard,system-ui,sans-serif;font-size:28px;font-weight:700;color:var(--ink);letter-spacing:-0.02em;line-height:1;margin-bottom:8px}
.strength-card h4{font-size:15px;font-weight:600;color:var(--ink);margin-bottom:6px}
.strength-card p{font-size:13.5px;color:var(--muted);line-height:1.55}

/* Products section */
.products-section{padding:120px 0;background:var(--paper-2)}
.products-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:56px}
.product-card{background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:36px 30px;transition:all .3s;cursor:pointer;position:relative;overflow:hidden;display:block;color:var(--ink)}
.product-card:hover{border-color:var(--ink);transform:translateY(-4px);box-shadow:0 20px 50px rgba(15,23,42,0.1)}
.product-illust{width:100%;height:120px;margin-bottom:24px;display:flex;align-items:center;justify-content:center;background:var(--paper-2);border-radius:12px;transition:background .3s}
.product-card:hover .product-illust{background:var(--ink)}
.product-illust svg{width:80px;height:80px;transition:transform .3s}
.product-card:hover .product-illust svg{transform:scale(1.08)}
.product-tag{display:inline-block;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);font-weight:600;margin-bottom:8px}
.product-card h3{font-family:'GmarketSansTTF','Gmarket Sans','Pretendard Variable',Pretendard,system-ui,sans-serif;font-size:22px;font-weight:600;letter-spacing:-0.02em;margin-bottom:10px;color:var(--ink)}
.product-card p{font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:16px}
.product-more{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:500;color:var(--ink);padding-top:16px;border-top:1px solid var(--line)}
.product-more::after{content:"→";transition:transform .2s}
.product-card:hover .product-more::after{transform:translateX(4px)}

/* Region selector */
.regions-section{padding:120px 0;background:var(--ink);color:#fff}
.regions-section .section-tag{color:var(--muted-2)}
.regions-section .section-title{color:#fff}
.regions-section .section-title em{color:#fff}
.regions-section .section-desc{color:var(--muted-2)}
.region-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:10px;margin-top:48px}
.region-chip{padding:18px 14px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.1);border-radius:12px;text-align:center;transition:all .2s;color:#fff;display:flex;flex-direction:column;align-items:center;gap:6px}
.region-chip:hover{background:#fff;color:var(--ink);transform:translateY(-2px);border-color:#fff}
.region-chip .re{font-size:22px}
.region-chip .rn{font-size:13.5px;font-weight:500}

/* Smart features */
.features-section{padding:120px 0}
.features-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0;margin-top:56px;border:1px solid var(--line);border-radius:var(--radius);overflow:hidden;background:#fff}
.feature-cell{padding:40px 32px;border-right:1px solid var(--line);border-bottom:1px solid var(--line);transition:background .2s}
.feature-cell:nth-child(3n){border-right:0}
.feature-cell:nth-last-child(-n+3){border-bottom:0}
.feature-cell:hover{background:var(--paper-2)}
.feature-cell .ficon{width:44px;height:44px;background:var(--ink);color:#fff;border-radius:10px;display:flex;align-items:center;justify-content:center;margin-bottom:18px}
.feature-cell .ficon svg{width:22px;height:22px}
.feature-cell h4{font-family:'GmarketSansTTF','Gmarket Sans','Pretendard Variable',Pretendard,system-ui,sans-serif;font-size:20px;font-weight:600;letter-spacing:-0.02em;margin-bottom:10px;color:var(--ink)}
.feature-cell p{font-size:14px;color:var(--muted);line-height:1.65}

/* Why us */
.why-section{padding:120px 0;background:var(--paper-2)}
.why-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;margin-top:48px}
.why-item{background:#fff;border-radius:var(--radius);padding:36px;display:flex;gap:22px;border:1px solid var(--line);transition:all .25s}
.why-item:hover{border-color:var(--ink);transform:translateY(-2px)}
.why-item .wicon{width:52px;height:52px;background:var(--ink);color:#fff;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.why-item .wicon svg{width:26px;height:26px}
.why-item h4{font-family:'GmarketSansTTF','Gmarket Sans','Pretendard Variable',Pretendard,system-ui,sans-serif;font-size:20px;font-weight:600;letter-spacing:-0.02em;margin-bottom:10px;color:var(--ink)}
.why-item p{font-size:14.5px;color:var(--muted);line-height:1.65}

/* Reviews */
.reviews-section{padding:120px 0;overflow:hidden}
.reviews-slider{position:relative;max-width:1200px;margin:56px auto 0;padding:0 60px}
.reviews-viewport{overflow:hidden;margin:0 -10px}
.reviews-track{display:flex;gap:20px;transition:transform .6s cubic-bezier(.22,.61,.36,1);will-change:transform;padding:8px 10px}
.review-card{flex:0 0 calc((100% - 40px) / 3);background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:30px;transition:border-color .2s,transform .2s,box-shadow .2s;min-width:0}
.review-card:hover{border-color:var(--ink);transform:translateY(-2px);box-shadow:0 12px 30px rgba(15,23,42,0.06)}
.review-stars{color:var(--ink);font-size:14px;margin-bottom:16px;letter-spacing:3px}
.review-badge{display:inline-block;padding:4px 12px;background:var(--paper-2);color:var(--ink);border-radius:100px;font-size:11.5px;font-weight:600;margin-bottom:14px;letter-spacing:.02em}
.review-card h5{font-family:'GmarketSansTTF','Gmarket Sans','Pretendard Variable',Pretendard,system-ui,sans-serif;font-size:17px;font-weight:600;margin-bottom:10px;color:var(--ink);line-height:1.3;letter-spacing:-0.01em}
.review-card p{font-size:14px;color:var(--muted);line-height:1.65;margin-bottom:18px}
.review-author{padding-top:16px;border-top:1px solid var(--line);font-size:12.5px;color:var(--ink-3);font-weight:500}
.slider-arrow{position:absolute;top:50%;transform:translateY(-50%);width:46px;height:46px;border-radius:50%;background:#fff;border:1px solid var(--line);color:var(--ink);font-size:22px;font-family:inherit;cursor:pointer;z-index:2;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 18px rgba(15,23,42,0.08);transition:all .2s;line-height:1;padding:0 0 3px}
.slider-arrow:hover{background:var(--ink);color:#fff;border-color:var(--ink);transform:translateY(-50%) scale(1.05)}
.slider-prev{left:0}
.slider-next{right:0}
.slider-dots{display:flex;gap:8px;justify-content:center;margin-top:36px}
.slider-dot{width:8px;height:8px;border-radius:50%;background:var(--line-2);border:0;cursor:pointer;transition:all .25s;padding:0}
.slider-dot.active{background:var(--ink);width:24px;border-radius:4px}
.slider-dot:hover{background:var(--ink-3)}

/* CTA block */
.cta-section{background:var(--ink);color:#fff;padding:110px 0;text-align:center;position:relative;overflow:hidden}
.cta-section::before{content:"";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:800px;height:800px;background:radial-gradient(circle,rgba(255,255,255,0.04) 0%,transparent 70%);pointer-events:none}
.cta-section > *{position:relative;z-index:1}
.cta-section .eyebrow{background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.15);color:#fff}
.cta-section .eyebrow::before{background:#fff}
.cta-section h2{font-family:'GmarketSansTTF','Gmarket Sans','Pretendard Variable',Pretendard,system-ui,sans-serif;font-size:clamp(26px,3.6vw,38px);font-weight:500;letter-spacing:-0.02em;line-height:1.45;margin:20px 0 36px;color:#fff}
.cta-section h2 .cta-lead-accent{display:inline-block;margin-top:16px;font-weight:700;color:#fff}
.cta-section h2 em{font-style:normal}
.cta-section p.sub{font-size:17px;color:var(--muted-2);max-width:560px;margin:0 auto 40px}
.cta-phone{display:inline-flex;align-items:center;gap:14px;background:#fff;color:var(--ink);padding:22px 44px;border-radius:100px;font-family:'GmarketSansTTF','Gmarket Sans','Pretendard Variable',Pretendard,system-ui,sans-serif;font-size:26px;font-weight:700;letter-spacing:-0.01em;transition:transform .2s,box-shadow .2s}
.cta-phone:hover{transform:translateY(-3px);box-shadow:0 20px 40px rgba(0,0,0,0.3)}
.cta-phone svg{width:28px;height:28px}
.cta-hours{margin-top:24px;font-size:13.5px;color:var(--muted-2)}

/* Footer */
footer{background:#000;color:#cbd5e1;padding:80px 0 40px}
footer .logo{color:#fff}
.foot-brand{margin-bottom:40px}
.foot-brand p{font-size:14px;color:#94a3b8;margin-top:16px;max-width:480px;line-height:1.7}
.foot-bottom{padding-top:32px;border-top:1px solid rgba(255,255,255,0.08);display:flex;justify-content:space-between;font-size:13px;color:#64748b;flex-wrap:wrap;gap:12px}

/* Floating CTA */
.floating-stack{position:fixed;bottom:28px;right:28px;z-index:40;display:flex;flex-direction:column;gap:10px;align-items:flex-end}
.floating-call{background:var(--ink);color:#fff;padding:16px 22px;border-radius:100px;font-weight:500;font-size:14px;box-shadow:0 12px 30px rgba(15,23,42,0.3);display:inline-flex;align-items:center;gap:10px;transition:all .2s}
.floating-call:hover{transform:scale(1.05);background:var(--ink-2)}
.floating-call svg{width:18px;height:18px}
.floating-inquiry{background:var(--accent,#e8512c);box-shadow:0 12px 30px rgba(232,81,44,0.4)}
.floating-inquiry:hover{background:#d63e1d}

/* Detail pages */
.detail-hero{padding:80px 0 50px;background:var(--paper-2);border-bottom:1px solid var(--line)}
.breadcrumb{font-size:13px;color:var(--muted);margin-bottom:24px}
.breadcrumb a{color:var(--muted);transition:color .2s}
.breadcrumb a:hover{color:var(--ink)}
.breadcrumb .sep{margin:0 10px;opacity:.5}
.detail-title{font-family:'GmarketSansTTF','Gmarket Sans','Pretendard Variable',Pretendard,system-ui,sans-serif;font-size:clamp(32px,4.5vw,52px);letter-spacing:-0.03em;line-height:1.12;font-weight:600;margin-bottom:18px;color:var(--ink)}
.detail-title em{font-style:italic}
.detail-sub{font-size:17.5px;color:var(--ink-3);max-width:720px;line-height:1.6}
.detail-body{padding:80px 0}
.detail-body .prose{max-width:760px;margin:0 auto;font-size:16.5px;line-height:1.85;color:var(--ink-3)}
.detail-body .prose p{margin-bottom:22px}
.detail-body h2{font-family:'GmarketSansTTF','Gmarket Sans','Pretendard Variable',Pretendard,system-ui,sans-serif;font-size:30px;font-weight:600;letter-spacing:-0.02em;margin:52px 0 18px;color:var(--ink)}
.detail-body h3{font-family:'GmarketSansTTF','Gmarket Sans','Pretendard Variable',Pretendard,system-ui,sans-serif;font-size:21px;font-weight:600;margin:36px 0 14px;color:var(--ink)}
.detail-body ul,.detail-body ol{margin:0 0 24px 1.4em}
.detail-body li{margin-bottom:10px}
.detail-body strong{color:var(--ink);font-weight:600}

.info-card{background:var(--paper-2);border:1px solid var(--line);border-radius:var(--radius);padding:32px;margin:32px 0}
.info-card h4{font-family:'GmarketSansTTF','Gmarket Sans','Pretendard Variable',Pretendard,system-ui,sans-serif;font-size:20px;margin-bottom:18px;font-weight:600;color:var(--ink)}
.info-card .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:14px 28px;margin-top:14px}
.info-card .grid-2 div{padding:10px 0;border-bottom:1px solid var(--line);font-size:14px;color:var(--muted)}
.info-card .grid-2 div strong{color:var(--ink);margin-right:10px}

.feat-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:28px 0}
.feat-card{background:#fff;border:1px solid var(--line);border-radius:12px;padding:24px}
.feat-card h5{font-family:'GmarketSansTTF','Gmarket Sans','Pretendard Variable',Pretendard,system-ui,sans-serif;font-size:17px;font-weight:600;margin-bottom:8px;color:var(--ink)}
.feat-card p{font-size:13.5px;color:var(--muted);line-height:1.6}

.related-section{background:var(--paper-2);padding:90px 0}
.related-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:36px}
.related-item{background:#fff;border:1px solid var(--line);border-radius:12px;padding:22px 16px;text-align:center;transition:all .2s;color:var(--ink)}
.related-item:hover{background:var(--ink);color:#fff;transform:translateY(-2px);border-color:var(--ink)}
.related-item .emoji{font-size:26px;display:block;margin-bottom:10px}
.related-item .name{font-size:13.5px;font-weight:500}

.cta-inline{background:var(--ink);color:#fff;border-radius:var(--radius);padding:36px 32px;margin-top:56px;text-align:center}
.cta-inline h4{font-family:'GmarketSansTTF','Gmarket Sans','Pretendard Variable',Pretendard,system-ui,sans-serif;font-size:20px;margin-bottom:14px;font-weight:600}
.cta-inline .phone{font-family:'GmarketSansTTF','Gmarket Sans','Pretendard Variable',Pretendard,system-ui,sans-serif;font-size:32px;font-weight:700;display:inline-block;margin:8px 0;color:#fff;letter-spacing:-0.02em}
.cta-inline p{font-size:14px;color:var(--muted-2);margin-top:10px}

/* Index pages */
.index-header{padding:90px 0 50px;background:var(--paper-2);border-bottom:1px solid var(--line)}
.index-header h1{font-family:'GmarketSansTTF','Gmarket Sans','Pretendard Variable',Pretendard,system-ui,sans-serif;font-size:clamp(36px,5vw,56px);letter-spacing:-0.03em;font-weight:600;margin-bottom:18px;color:var(--ink)}
.index-header h1 em{font-style:italic}
.index-header p{font-size:17px;color:var(--muted);max-width:720px;line-height:1.6}
.index-grid{display:grid;gap:16px;padding:60px 0 120px}
.index-grid.cols-4{grid-template-columns:repeat(4,1fr)}
.index-grid.cols-3{grid-template-columns:repeat(3,1fr)}
.index-card{background:#fff;border-radius:var(--radius);padding:30px 26px;border:1px solid var(--line);transition:all .25s;display:block;color:var(--ink)}
.index-card:hover{border-color:var(--ink);transform:translateY(-3px);box-shadow:0 16px 40px rgba(15,23,42,0.06)}
.index-card .big{font-size:32px;margin-bottom:14px}
.index-card h3{font-family:'GmarketSansTTF','Gmarket Sans','Pretendard Variable',Pretendard,system-ui,sans-serif;font-size:20px;font-weight:600;margin-bottom:8px;letter-spacing:-0.02em;color:var(--ink)}
.index-card p{font-size:13.5px;color:var(--muted);line-height:1.6}

/* Contact page */
.contact-wrap{background:var(--paper-2);padding:80px 0 100px;min-height:70vh}
.contact-container{max-width:720px;margin:0 auto;padding:0 20px}
.contact-header{text-align:center;margin-bottom:40px}
.contact-header h1{font-family:'GmarketSansTTF','Gmarket Sans','Pretendard Variable',Pretendard,system-ui,sans-serif;font-size:clamp(28px,3.6vw,38px);font-weight:600;letter-spacing:-0.03em;color:var(--ink);margin-bottom:14px;display:inline-flex;align-items:center;gap:12px}
.contact-header h1 svg{width:32px;height:32px;color:var(--accent,#e8512c)}
.contact-header p{color:var(--muted);font-size:15px;line-height:1.7}
.contact-phone-card{background:#e6f9ef;border:1px solid #b8eacf;border-radius:var(--radius);padding:22px 26px;margin-bottom:24px;display:flex;align-items:center;gap:18px}
.contact-phone-card .pi{width:52px;height:52px;border-radius:14px;background:#18b368;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.contact-phone-card .pi svg{width:24px;height:24px;color:#fff}
.contact-phone-card .pt{flex:1}
.contact-phone-card .pt a{font-family:'GmarketSansTTF','Gmarket Sans','Pretendard Variable',Pretendard,system-ui,sans-serif;font-size:24px;font-weight:700;color:var(--ink);letter-spacing:-0.02em;display:inline-block;margin-bottom:2px}
.contact-phone-card .pt .ps{font-size:13px;color:var(--muted)}
.contact-form-card{background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:32px 28px}
.contact-form-card svg{max-width:100%;max-height:28px}
.contact-form-card h2{font-family:'GmarketSansTTF','Gmarket Sans','Pretendard Variable',Pretendard,system-ui,sans-serif;font-size:19px;font-weight:600;letter-spacing:-0.02em;color:var(--ink);margin-bottom:22px;padding-bottom:16px;border-bottom:1px solid var(--line);display:flex;align-items:center;gap:10px}
.contact-form-card h2::before{content:"";display:inline-block;width:4px;height:20px;background:var(--accent,#e8512c);border-radius:2px}
.field{margin-bottom:18px}
.field label{display:block;font-size:13.5px;font-weight:500;color:var(--ink);margin-bottom:8px}
.field label .req{color:#dc2626;margin-left:2px}
.field input[type=text],.field input[type=tel],.field select,.field textarea{width:100%;padding:12px 14px;font-size:14.5px;font-family:inherit;border:1px solid var(--line);border-radius:10px;background:#fff;color:var(--ink);transition:border-color .15s,box-shadow .15s}
.field input:focus,.field select:focus,.field textarea:focus{outline:none;border-color:var(--ink);box-shadow:0 0 0 3px rgba(15,23,42,0.05)}
.field textarea{min-height:110px;resize:vertical;line-height:1.55}
.field select{cursor:pointer;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23555' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center;padding-right:36px}
.field-row{display:flex;gap:8px}
.field-row input{flex:1}
.field-row button{padding:0 18px;background:var(--ink);color:#fff;border:0;border-radius:10px;font-size:13.5px;font-weight:600;font-family:inherit;cursor:pointer;white-space:nowrap;transition:background .2s}
.field-row button:hover{background:var(--ink-2)}
.submit-btn{width:100%;padding:16px;background:var(--ink);color:#fff;border:0;border-radius:12px;font-size:16px;font-weight:600;font-family:'GmarketSansTTF','Gmarket Sans','Pretendard Variable',Pretendard,sans-serif;letter-spacing:-0.01em;cursor:pointer;transition:all .2s;margin-top:8px}
.submit-btn:hover{background:var(--ink-2);transform:translateY(-1px);box-shadow:0 8px 24px rgba(15,23,42,0.15)}
.submit-btn:disabled{opacity:.6;cursor:not-allowed;transform:none}
.privacy-box{background:var(--paper-2);border-radius:10px;padding:16px 18px;margin-top:18px;font-size:12.5px;color:var(--muted);line-height:1.65}
.privacy-box .title{color:var(--ink-2);font-weight:600;margin-bottom:6px;display:flex;align-items:center;gap:6px}
.privacy-box p{margin:0;line-height:1.7}
.privacy-box ul{margin:4px 0 0 18px;padding:0}
.privacy-box li{margin-bottom:2px}
.privacy-check{display:flex;align-items:center;gap:8px;margin-top:14px;font-size:13.5px;color:var(--ink-2)}
.privacy-check input{width:16px;height:16px;cursor:pointer;accent-color:var(--ink)}
.success-view{display:none;text-align:center;padding:60px 20px}
.success-view .sch{width:72px;height:72px;border-radius:50%;background:#e6f9ef;display:inline-flex;align-items:center;justify-content:center;margin-bottom:24px}
.success-view .sch svg{width:36px;height:36px;color:#18b368}
.success-view h3{font-family:'GmarketSansTTF','Gmarket Sans','Pretendard Variable',Pretendard,sans-serif;font-size:24px;font-weight:600;color:var(--ink);margin-bottom:12px}
.success-view p{color:var(--muted);font-size:15px;line-height:1.7;margin-bottom:24px}
.error-msg{background:#fef2f2;border:1px solid #fecaca;color:#b91c1c;padding:12px 16px;border-radius:10px;font-size:13.5px;margin-bottom:16px;display:none}

  .hero{padding:32px 0 48px}
  .hero-banner{border-radius:14px}
  .hero-ctas-center{margin-top:28px;flex-direction:column;width:100%}
  .hero-ctas-center .btn{width:100%;justify-content:center}
}
@media (max-width: 860px){
  section.block{padding:80px 0}
  .products-section,.regions-section,.features-section,.why-section,.reviews-section{padding:80px 0}
  .cta-section{padding:80px 0}
  .products-grid{grid-template-columns:repeat(2,1fr)}
  .stats-grid{grid-template-columns:repeat(2,1fr);gap:20px}
  .stat-card{border-right:0}
  .strengths-grid{grid-template-columns:repeat(2,1fr)}
  .region-grid{grid-template-columns:repeat(4,1fr)}
  .features-grid{grid-template-columns:1fr}
  .feature-cell{border-right:0}
  .feature-cell:nth-last-child(-n+1){border-bottom:0}
  .reviews-slider{padding:0 48px}
  .review-card{flex:0 0 calc((100% - 20px) / 2)}
  .slider-arrow{width:40px;height:40px;font-size:20px}
  .why-grid{grid-template-columns:1fr}
  .nav-menu{display:none}
  .nav{gap:12px}
  .related-grid{grid-template-columns:repeat(2,1fr)}
  .index-grid.cols-4,.index-grid.cols-3{grid-template-columns:repeat(2,1fr)}
  .feat-grid-2{grid-template-columns:1fr}
  .info-card .grid-2{grid-template-columns:1fr}
}
@media (max-width: 560px){
  .container{padding:0 20px}
  .products-grid{grid-template-columns:1fr}
  .region-grid{grid-template-columns:repeat(3,1fr)}
  .foot-bottom{flex-direction:column;align-items:flex-start}
  .floating-stack{bottom:20px;right:20px;gap:8px}
  .floating-call{padding:14px 18px;font-size:13px}
  .strengths-grid{grid-template-columns:1fr}
  .related-grid{grid-template-columns:1fr}
  .index-grid.cols-4,.index-grid.cols-3{grid-template-columns:1fr}
  .cta-phone{font-size:22px;padding:18px 32px;gap:10px}
  .cta-phone svg{width:22px;height:22px}
  .reviews-slider{padding:0 8px}
  .review-card{flex:0 0 100%;padding:24px}
  .slider-arrow{display:none}
  .slider-dots{margin-top:24px}
}
`;

// [07] 공통 헤더/푸터/HTML 래퍼 + SVG 아이콘 ===================

// SVG 아이콘 라이브러리 (재사용)
const ICONS = {
  brandLogo: `<svg viewBox="0 0 64 64" fill="none"><rect width="64" height="64" rx="14" fill="#0c0f14"/><rect x="14" y="14" width="16" height="16" rx="3" fill="#e8512c"/><rect x="34" y="14" width="16" height="16" rx="3" fill="#f5f1ea"/><rect x="14" y="34" width="16" height="16" rx="3" fill="#f5f1ea"/><rect x="34" y="34" width="16" height="16" rx="3" fill="#e8512c"/></svg>`,
  cardTerminal: `<svg viewBox="0 0 80 80" fill="none"><rect x="12" y="16" width="56" height="50" rx="4" fill="#0f172a"/><rect x="18" y="22" width="44" height="14" rx="2" fill="#334155"/><circle cx="24" cy="46" r="2.5" fill="#94a3b8"/><circle cx="32" cy="46" r="2.5" fill="#94a3b8"/><circle cx="40" cy="46" r="2.5" fill="#94a3b8"/><circle cx="48" cy="46" r="2.5" fill="#94a3b8"/><circle cx="56" cy="46" r="2.5" fill="#94a3b8"/><circle cx="24" cy="54" r="2.5" fill="#94a3b8"/><circle cx="32" cy="54" r="2.5" fill="#94a3b8"/><circle cx="40" cy="54" r="2.5" fill="#94a3b8"/><circle cx="48" cy="54" r="2.5" fill="#94a3b8"/><circle cx="56" cy="54" r="2.5" fill="#94a3b8"/></svg>`,
  pos: `<svg viewBox="0 0 80 80" fill="none"><rect x="10" y="14" width="60" height="42" rx="3" fill="#0f172a"/><rect x="14" y="18" width="52" height="34" fill="#3b82f6"/><rect x="30" y="58" width="20" height="8" fill="#0f172a"/><rect x="24" y="66" width="32" height="4" rx="1" fill="#0f172a"/><circle cx="20" cy="24" r="1" fill="#fff"/><circle cx="24" cy="24" r="1" fill="#fff"/></svg>`,
  kiosk: `<svg viewBox="0 0 80 80" fill="none"><rect x="24" y="6" width="32" height="60" rx="3" fill="#0f172a"/><rect x="28" y="10" width="24" height="40" fill="#3b82f6"/><circle cx="40" cy="58" r="2.5" fill="#94a3b8"/><rect x="32" y="66" width="16" height="6" rx="1" fill="#334155"/><rect x="28" y="72" width="24" height="4" rx="1" fill="#334155"/></svg>`,
  tableOrder: `<svg viewBox="0 0 80 80" fill="none"><rect x="8" y="18" width="64" height="40" rx="3" fill="#0f172a"/><rect x="12" y="22" width="56" height="28" fill="#3b82f6"/><rect x="30" y="58" width="20" height="4" fill="#0f172a"/><rect x="20" y="62" width="40" height="3" rx="1" fill="#334155"/><circle cx="60" cy="28" r="1.5" fill="#ef4444"/><rect x="18" y="28" width="18" height="3" rx="1" fill="#fff" opacity=".7"/><rect x="18" y="34" width="12" height="3" rx="1" fill="#fff" opacity=".5"/></svg>`,
  cctv: `<svg viewBox="0 0 80 80" fill="none"><circle cx="40" cy="40" r="26" fill="#0f172a"/><circle cx="40" cy="40" r="18" fill="#1e293b"/><circle cx="40" cy="40" r="10" fill="#3b82f6"/><circle cx="40" cy="40" r="4" fill="#0f172a"/><circle cx="40" cy="40" r="1.5" fill="#fff"/><circle cx="58" cy="22" r="2" fill="#ef4444"/></svg>`,
  vending: `<svg viewBox="0 0 80 80" fill="none"><rect x="18" y="6" width="44" height="68" rx="3" fill="#0f172a"/><rect x="22" y="10" width="36" height="22" fill="#3b82f6"/><rect x="22" y="36" width="36" height="6" rx="1" fill="#334155"/><rect x="22" y="44" width="36" height="6" rx="1" fill="#334155"/><rect x="22" y="52" width="36" height="6" rx="1" fill="#334155"/><rect x="26" y="62" width="28" height="8" rx="1" fill="#1e293b"/><circle cx="36" cy="66" r="1" fill="#94a3b8"/><circle cx="40" cy="66" r="1" fill="#94a3b8"/><circle cx="44" cy="66" r="1" fill="#94a3b8"/></svg>`,
  removal: `<svg viewBox="0 0 80 80" fill="none"><path d="M14 20 L38 20 L38 14 L50 20 L50 26 L66 26 L66 56 L14 56 Z" fill="#0f172a"/><rect x="20" y="60" width="40" height="10" rx="1" fill="#334155"/><circle cx="28" cy="38" r="3" fill="#94a3b8"/><rect x="44" y="34" width="14" height="8" rx="1" fill="#94a3b8"/></svg>`,
  bolt: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor"/></svg>`,
  target: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>`,
  box: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
  coin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><line x1="12" y1="6" x2="12" y2="8"/><line x1="12" y1="16" x2="12" y2="18"/></svg>`,
  wrench: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  pen: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
  chart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>`,
  plug: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M9 2v6"/><path d="M15 2v6"/><path d="M8 8h8a2 2 0 0 1 2 2v3a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4v-3a2 2 0 0 1 2-2Z"/><path d="M12 17v5"/></svg>`,
  bulb: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-7 7c0 3 2 5 3 6h8c1-1 3-3 3-6a7 7 0 0 0-7-7Z"/></svg>`,
  fork: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M18 2v20"/><path d="M6 2v7a3 3 0 0 0 6 0V2"/><path d="M9 2v7"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9 12 2" fill="currentColor"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  layout: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`,
  wifi: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>`,
  brain: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2z"/></svg>`,
  clipboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></svg>`,
  chat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="8" y1="10" x2="8.01" y2="10"/><line x1="12" y1="10" x2="12.01" y2="10"/><line x1="16" y1="10" x2="16.01" y2="10"/></svg>`,
};

function getProductIcon(slug) {
  const map = { 'card-terminal': ICONS.cardTerminal, 'pos': ICONS.pos, 'kiosk': ICONS.kiosk, 'table-order': ICONS.tableOrder, 'cctv': ICONS.cctv, 'vending': ICONS.vending, 'removal': ICONS.removal };
  return map[slug] || ICONS.box;
}

function htmlWrap({ title, description, canonical, body }) {
  const fullTitle = title ? `${title} | ${SITE.brandNameKo}` : `${SITE.brandNameKo} | 매장 설비 설치 플랫폼`;
  const desc = description || SITE.description;
  const canon = canonical || SITE.domain;
  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${escapeHtml(fullTitle)}</title>
<meta name="description" content="${escapeHtml(desc)}">
<meta name="naver-site-verification" content="${SITE.naverVerification}">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="alternate icon" type="image/png" href="/favicon.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="canonical" href="${canon}">
<meta property="og:type" content="website">
<meta property="og:url" content="${canon}">
<meta property="og:title" content="${escapeHtml(fullTitle)}">
<meta property="og:description" content="${escapeHtml(desc)}">
<meta property="og:locale" content="ko_KR">
<meta property="twitter:card" content="summary">
<style>${STYLES}</style>
</head>
<body>
${renderHeader()}
<main>${body}</main>
${renderFooter()}
${renderFloatingCTA()}
</body>
</html>`;
}

function escapeHtml(s) {
  if (!s) return '';
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function renderHeader() {
  return `<header>
<div class="container nav">
<a href="/" class="logo"><span class="logo-dot">${ICONS.brandLogo}</span>${SITE.brandName}</a>
<ul class="nav-menu">
<li><a href="/region">지역별 설치</a></li>
<li><a href="/product">제품 안내</a></li>
<li><a href="/industry">업종별</a></li>
<li><a href="/contact">문의하기</a></li>
</ul>
<a href="tel:${SITE.phone}" class="nav-cta">${ICONS.phone.replace('<svg ', '<svg style="width:14px;height:14px" ')} 무료 상담 ${SITE.phoneDisplay}</a>
</div>
</header>`;
}

function renderFooter() {
  return `<footer>
<div class="container">
<div class="foot-brand">
<a href="/" class="logo"><span class="logo-dot">${ICONS.brandLogo}</span>${SITE.brandName}</a>
<p>1인 매장부터 프랜차이즈까지. 매장 운영에 필요한 설비를 한 곳에서, 정확하게.</p>
</div>
<div class="foot-bottom">
<span>© 2026 ${SITE.brandName}. All rights reserved.</span>
<span>${SITE.domain.replace('https://','')}</span>
</div>
</div>
</footer>`;
}

function renderFloatingCTA() {
  return `<div class="floating-stack">
<a href="/contact" class="floating-call floating-inquiry">${ICONS.chat} 무료 상담 받기</a>
<a href="tel:${SITE.phone}" class="floating-call">${ICONS.phone} 전화 상담</a>
</div>`;
}

// [08] 메인 페이지 렌더 =======================================
function renderHome() {
  const regionChips = REGIONS.map(r => `<a href="/region/${r.slug}" class="region-chip"><span class="re">🔎</span><span class="rn">${r.name}</span></a>`).join('');
  const productCards = PRODUCTS.map(p => `<a href="/product/${p.slug}" class="product-card"><div class="product-illust">${getProductIcon(p.slug)}</div><span class="product-tag">${p.emoji} ${p.name}</span><h3>${p.name}</h3><p>${p.shortDesc}</p><span class="product-more">자세히 보기</span></a>`).join('');

  const strengthIcons = [ICONS.target, ICONS.bolt, ICONS.coin, ICONS.wrench];
  const strengths = STRENGTHS.map((s, i) => `<div class="strength-card"><div class="sicon">${strengthIcons[i] || ICONS.star}</div><div class="sval">${s.stat}</div><h4>${s.title}</h4><p>${s.desc}</p></div>`).join('');

  const featureIcons = [ICONS.layout, ICONS.chart, ICONS.wifi, ICONS.brain, ICONS.clipboard, ICONS.chat];
  const smartFeatures = SMART_FEATURES.map((f, i) => `<div class="feature-cell"><div class="ficon">${featureIcons[i] || ICONS.star}</div><h4>${f.title}</h4><p>${f.desc}</p></div>`).join('');

  const whyIcons = [ICONS.target, ICONS.box, ICONS.coin, ICONS.wrench];
  const whyUs = WHY_US.map((w, i) => `<div class="why-item"><div class="wicon">${whyIcons[i] || ICONS.star}</div><div><h4>${w.title}</h4><p>${w.desc}</p></div></div>`).join('');

  const reviews = REVIEWS.map(r => `<div class="review-card"><div class="review-stars">★★★★★</div><span class="review-badge">${r.badge}</span><h5>${r.title}</h5><p>${r.body}</p><div class="review-author">— ${r.author}</div></div>`).join('');

  const body = `
<section class="hero">
<div class="container">
<div class="hero-banner">
<img src="${HERO_BANNER}" alt="${SITE.brandNameKo} - 매장 운영에 필요한 설비를 한곳에서. 전국 매장 설비 설치 플랫폼" />
</div>
<div class="hero-ctas-center">
<a href="tel:${SITE.phone}" class="btn btn-primary">${ICONS.phone.replace('<svg ', '<svg style="width:16px;height:16px" ')} 무료 견적 받기</a>
<a href="/contact" class="btn btn-ghost">상담 문의하기</a>
</div>
</div>
</section>

<section class="stats-section">
<div class="container stats-grid">
<div class="stat-card"><div class="n">${SITE.stats.coverage}<span>+</span></div><div class="l">전국 읍면동 출장</div></div>
<div class="stat-card"><div class="n">${SITE.stats.installRate}</div><div class="l">당일·익일 설치</div></div>
<div class="stat-card"><div class="n">${SITE.stats.renewalRate}</div><div class="l">재계약·추천률</div></div>
<div class="stat-card"><div class="n">24<span>H</span></div><div class="l">A/S 대응 체계</div></div>
</div>
</section>

<section class="block">
<div class="container">
<div class="section-head" style="margin-bottom:20px">
<div class="section-tag">Why ${SITE.brandName}</div>
<h2 class="section-title">전국 사장님이 선택한<br><em>${SITE.brandNameKo}의 강점</em></h2>
</div>
<div class="strengths-grid">${strengths}</div>
</div>
</section>

<section class="products-section" id="products">
<div class="container">
<div class="section-head">
<div class="section-tag">All-In-One Solution</div>
<h2 class="section-title">매장에 필요한 모든 장비,<br><em>한 곳에서</em></h2>
<p class="section-desc">1인 매장부터 프랜차이즈까지. 업종과 매장 규모에 맞춰 최적의 조합을 제안합니다.</p>
</div>
<div class="products-grid">${productCards}</div>
</div>
</section>

<section class="regions-section" id="regions">
<div class="container">
<div class="section-head">
<div class="section-tag">Nationwide Service</div>
<h2 class="section-title">전국 17개 광역시도<br><em>어디든</em> 설치합니다</h2>
<p class="section-desc">서울·경기부터 제주까지. 우리 지역을 선택하면 상권 정보와 제품별 설치 가이드를 확인할 수 있습니다.</p>
</div>
<div class="region-grid">${regionChips}</div>
</div>
</section>

<section class="features-section" id="features">
<div class="container">
<div class="section-head">
<div class="section-tag">Smart Features</div>
<h2 class="section-title">매장이 쉬워집니다<br><em>운영은 더 똑똑해집니다</em></h2>
</div>
<div class="features-grid">${smartFeatures}</div>
</div>
</section>

<section class="why-section">
<div class="container">
<div class="section-head">
<div class="section-tag">Our Commitment</div>
<h2 class="section-title">견적이 끝이 아닙니다<br><em>설치 후가 진짜 시작입니다</em></h2>
</div>
<div class="why-grid">${whyUs}</div>
</div>
</section>

<section class="reviews-section" id="reviews">
<div class="container">
<div class="section-head">
<div class="section-tag">Real Reviews</div>
<h2 class="section-title">사장님들이<br><em>먼저 말해주십니다</em></h2>
<p class="section-desc">서비스 후 달라진 매장 이야기 · 254,692건 중 직접 전해주신 몇 줄</p>
</div>
</div>
<div class="reviews-slider" id="reviewsSlider">
<button class="slider-arrow slider-prev" aria-label="이전 후기" onclick="slideReviews(-1)">‹</button>
<div class="reviews-viewport">
<div class="reviews-track" id="reviewsTrack">${reviews}</div>
</div>
<button class="slider-arrow slider-next" aria-label="다음 후기" onclick="slideReviews(1)">›</button>
<div class="slider-dots" id="sliderDots"></div>
</div>
</section>

<script>
(function(){
  var track = document.getElementById('reviewsTrack');
  var viewport = document.querySelector('.reviews-viewport');
  var slider = document.getElementById('reviewsSlider');
  var dotsWrap = document.getElementById('sliderDots');
  if(!track || !viewport) return;
  var cards = track.children;
  if(cards.length === 0) return;

  var current = 0;
  var autoTimer = null;
  var paused = false;

  function cardsPerView(){
    var w = viewport.offsetWidth;
    if(w < 640) return 1;
    if(w < 960) return 2;
    return 3;
  }

  function totalPages(){
    return Math.max(1, cards.length - cardsPerView() + 1);
  }

  function go(idx){
    var max = totalPages() - 1;
    if(idx < 0) idx = max;
    if(idx > max) idx = 0;
    current = idx;
    var cardW = cards[0].offsetWidth + 20;
    track.style.transform = 'translateX(-' + (cardW * current) + 'px)';
    renderDots();
  }

  function renderDots(){
    var pages = totalPages();
    dotsWrap.innerHTML = '';
    for(var i=0; i<pages; i++){
      var d = document.createElement('button');
      d.className = 'slider-dot' + (i === current ? ' active' : '');
      d.setAttribute('aria-label', (i+1) + '번째 후기');
      (function(ix){ d.onclick = function(){ go(ix); restartAuto(); }; })(i);
      dotsWrap.appendChild(d);
    }
  }

  window.slideReviews = function(dir){
    go(current + dir);
    restartAuto();
  };

  function startAuto(){
    autoTimer = setInterval(function(){
      if(!paused) go(current + 1);
    }, 4500);
  }

  function restartAuto(){
    if(autoTimer) clearInterval(autoTimer);
    startAuto();
  }

  slider.addEventListener('mouseenter', function(){ paused = true; });
  slider.addEventListener('mouseleave', function(){ paused = false; });

  // Touch swipe for mobile
  var startX = 0;
  viewport.addEventListener('touchstart', function(e){ startX = e.touches[0].clientX; paused = true; }, {passive:true});
  viewport.addEventListener('touchend', function(e){
    var dx = e.changedTouches[0].clientX - startX;
    if(Math.abs(dx) > 50) go(current + (dx < 0 ? 1 : -1));
    paused = false;
    restartAuto();
  }, {passive:true});

  window.addEventListener('resize', function(){ go(current); });
  renderDots();
  startAuto();
})();
</script>

<section class="cta-section" id="contact">
<div class="container">
<span class="eyebrow">무료 상담 · 빠른 설치</span>
<h2 class="cta-lead">카드단말기·포스기·키오스크·<br>CCTV·테이블오더<br><span class="cta-lead-accent">매장에 필요한 모든 장비,<br>한 통화로 해결하세요</span></h2>
<a href="tel:${SITE.phone}" class="cta-phone">${ICONS.phone} ${SITE.phoneDisplay}</a>
</div>
</section>
`;

  return htmlWrap({
    title: null,
    description: SITE.description,
    canonical: SITE.domain + '/',
    body,
  });
}
// [09] 지역별 페이지 렌더 (/region/{slug}) ====================
function renderRegionPage(region) {
  const productsHtml = PRODUCTS.map(p => `<a href="/${region.slug}/${p.slug}" class="index-card"><div class="big">${p.emoji}</div><h3>${p.name}</h3><p>${region.name} ${p.name} 설치 ${region.installTime}</p></a>`).join('');
  const districtsList = region.majorDistricts.map(d => `<li>${d}</li>`).join('');
  const areasList = region.commercialAreas.map(a => `<li>${a}</li>`).join('');

  const body = `
<section class="detail-hero">
<div class="container">
<div class="breadcrumb"><a href="/">홈</a><span class="sep">›</span><a href="/region">지역별 설치</a><span class="sep">›</span>${region.name}</div>
<h1 class="detail-title">${region.emoji} ${region.fullName} <em>매장 설비 설치</em></h1>
<p class="detail-sub">${region.description}</p>
</div>
</section>

<section class="detail-body">
<div class="container">
<div class="prose">
<h2>${region.name} 지역 개요</h2>
<p>${region.description} ${SITE.brandNameKo}는 ${region.coverage}에서 카드단말기·포스기·키오스크·테이블오더·CCTV·밴딩머신·철거까지 모든 매장 설비를 ${region.installTime} 원스톱으로 설치합니다. 업종과 매장 동선에 맞춘 1:1 컨설팅으로 신규 오픈부터 기존 매장 업그레이드까지 최적의 솔루션을 제안합니다.</p>

<div class="info-card">
<h4>📍 ${region.name} 빠른 설치 가능 지역</h4>
<div class="grid-2">${districtsList.replace(/<li>/g, '<div><strong>•</strong>').replace(/<\/li>/g, '</div>')}</div>
<p style="font-size:13px;color:var(--muted);margin-top:16px">그 외 ${region.coverage} 출장 설치 가능</p>
</div>

<h2>${region.name} 주요 상권과 랜드마크</h2>
<p>${region.name}에는 <strong>${region.landmarks}</strong> 등 핵심 랜드마크가 있으며, 주변으로 다양한 상권이 형성되어 있습니다. 특히 다음 지역들은 카페·음식점·소매점 집중도가 높아 매장 설비 설치 문의가 가장 많이 들어오는 곳입니다.</p>

<ul>${areasList}</ul>

<h2>${region.name}에서 추천하는 매장 설비</h2>
<p>${region.name} 지역 상권 특성을 고려할 때, 다음 7개 제품 카테고리를 모두 조합해 매장에 최적화된 패키지를 구성하는 것을 추천합니다. 각 제품 페이지에서 ${region.name} 기준 설치 정보를 확인하실 수 있습니다.</p>

<div class="related-grid" style="margin-top:32px">
${PRODUCTS.slice(0, 4).map(p => `<a href="/${region.slug}/${p.slug}" class="related-item"><span class="emoji">${p.emoji}</span><span class="name">${p.name}</span></a>`).join('')}
</div>

<h2>설치 절차</h2>
<ol>
<li><strong>무료 상담</strong> — 전화 또는 카카오톡으로 매장 정보를 알려주세요.</li>
<li><strong>현장 방문 견적</strong> — ${region.name} 지역 담당 엔지니어가 현장을 방문해 동선·전원·네트워크를 점검합니다.</li>
<li><strong>장비 추천</strong> — 업종·매장 규모에 맞는 최적 조합을 제안합니다.</li>
<li><strong>설치 및 교육</strong> — 평균 2~3시간 내 설치 완료, 사용법 교육 진행.</li>
<li><strong>사후 관리</strong> — A/S 발생 시 원격 우선, 필요 시 ${region.name} 내 당일 출장 대응.</li>
</ol>

<div class="info-card" style="background:var(--accent);color:var(--paper);margin-top:48px">
<h4 style="color:var(--paper)">📞 ${region.name} 설치 문의</h4>
<p style="font-size:17px;margin:12px 0">
<strong style="color:var(--paper);font-family:'GmarketSansTTF','Gmarket Sans','Pretendard Variable',Pretendard,system-ui,sans-serif;font-size:28px">${SITE.phoneDisplay}</strong>
</p>
<p style="opacity:.9;font-size:14px">${region.name} 전 지역 ${region.installTime}. 무료 견적 상담을 받아보세요.</p>
</div>
</div>
</div>
</section>

<section class="related-section">
<div class="container">
<div class="section-head" style="margin-bottom:24px"><div class="section-tag">Products</div><h2 class="section-title" style="font-size:32px">${region.name} 제품별 <em>설치 페이지</em></h2></div>
<div class="index-grid cols-4">${productsHtml}</div>
</div>
</section>
`;

  const title = `${region.name} 매장 설비 설치 · 카드단말기·포스기·키오스크 ${region.installTime}`;
  const description = `${region.name} 매장 설비 설치 전문. ${region.coverage}, ${region.installTime}. 카드단말기·포스기·키오스크·CCTV까지 원스톱.`;

  return htmlWrap({
    title,
    description,
    canonical: `${SITE.domain}/region/${region.slug}`,
    body,
  });
}

// [10] 제품별 페이지 렌더 (/product/{slug}) ====================
function renderProductPage(product) {
  const topRegions = REGIONS.slice(0, 8).map(r => `<a href="/${r.slug}/${product.slug}" class="related-item"><span class="emoji">${r.emoji}</span><span class="name">${r.name}</span></a>`).join('');
  const featureCards = product.features.map(f => `<div class="feat-card"><h5>${f.title}</h5><p>${f.desc}</p></div>`).join('');

  const body = `
<section class="detail-hero">
<div class="container">
<div class="breadcrumb"><a href="/">홈</a><span class="sep">›</span><a href="/product">제품 안내</a><span class="sep">›</span>${product.name}</div>
<h1 class="detail-title">${product.emoji} ${product.name} <em>설치 가이드</em></h1>
<p class="detail-sub">${product.shortDesc}</p>
</div>
</section>

<section class="detail-body">
<div class="container">
<div class="prose">
<h2>${product.name} 소개</h2>
<p>${product.longDesc}</p>

<h2>${product.name}의 핵심 기능</h2>
<div class="feat-grid-2">${featureCards}</div>

<h2>어떤 매장에 어울리나요?</h2>
<p>${product.name}은 특히 <strong>${product.useCases}</strong> 업종에 추천합니다. 각 업종별 특성과 매장 규모에 맞춰 ${SITE.brandNameKo}가 최적 기종과 설정을 제안합니다. 기존 장비와의 호환성, 네트워크 환경, 매장 동선까지 종합 분석해 가장 적합한 솔루션을 드립니다.</p>

<h2>설치 절차</h2>
<ol>
<li><strong>무료 상담</strong> — 매장 업종·규모·현재 장비 상황을 전화 또는 카카오톡으로 공유해주세요.</li>
<li><strong>견적 제안</strong> — 매장 조건에 맞는 ${product.name} 기종과 설치 비용을 24시간 내 회신드립니다.</li>
<li><strong>현장 방문 설치</strong> — 전문 엔지니어가 매장 방문해 설치·설정·테스트까지 완료합니다.</li>
<li><strong>사용법 교육</strong> — 사장님·직원 대상 기본 사용법 교육을 진행합니다.</li>
<li><strong>사후 관리</strong> — 설치 후 장애 발생 시 원격 우선 대응, 필요 시 현장 출동합니다.</li>
</ol>

<h2>자주 묻는 질문 (FAQ)</h2>
<h3>Q. ${product.name} 설치까지 얼마나 걸리나요?</h3>
<p>상담 접수 후 당일~3일 이내 설치가 일반적입니다. 지역과 매장 상황에 따라 달라지며, 서울·경기·인천 주요 상권은 당일 설치도 가능합니다.</p>

<h3>Q. 설치 후 A/S는 어떻게 되나요?</h3>
<p>장애 발생 시 전화·원격으로 1차 대응하며, 원격으로 해결되지 않는 경우 현장 방문 A/S를 진행합니다. 24시간 대응 체계를 갖추고 있어 영업에 지장이 없도록 신속하게 처리합니다.</p>

<h3>Q. 기존 장비가 있는데 교체 가능한가요?</h3>
<p>네, 기존 장비 수거부터 신규 설치까지 원스톱으로 진행합니다. 기존 장비의 계약 상황, 위약금 여부도 함께 검토해드리며, 데이터 이전이 필요한 경우(POS 등) 메뉴·거래처 정보까지 안전하게 옮겨드립니다.</p>

<div class="info-card" style="background:var(--accent);color:var(--paper);margin-top:48px">
<h4 style="color:var(--paper)">📞 ${product.name} 설치 문의</h4>
<p style="font-size:17px;margin:12px 0">
<strong style="color:var(--paper);font-family:'GmarketSansTTF','Gmarket Sans','Pretendard Variable',Pretendard,system-ui,sans-serif;font-size:28px">${SITE.phoneDisplay}</strong>
</p>
<p style="opacity:.9;font-size:14px">무료 견적·상담. 전국 당일~3일 이내 설치.</p>
</div>
</div>
</div>
</section>

<section class="related-section">
<div class="container">
<div class="section-head" style="margin-bottom:24px"><div class="section-tag">By Region</div><h2 class="section-title" style="font-size:32px">지역별 <em>${product.name} 설치</em></h2></div>
<div class="related-grid">${topRegions}</div>
</div>
</section>
`;

  const title = `${product.name} 설치 · ${product.shortDesc.slice(0, 40)}`;
  const description = `${product.name} 설치 전문. ${product.shortDesc} 전국 당일 설치 가능.`;

  return htmlWrap({
    title,
    description,
    canonical: `${SITE.domain}/product/${product.slug}`,
    body,
  });
}

// [11] 지역x제품 설치 페이지 렌더 (/{region}/{product}) ========
function renderInstallPage(region, product) {
  const districtsList = region.majorDistricts.slice(0, 6).map(d => `<li>${d} ${product.name} 설치</li>`).join('');
  const featCards = product.features.map(f => `<div class="feat-card"><h5>${f.title}</h5><p>${f.desc}</p></div>`).join('');

  const body = `
<section class="detail-hero">
<div class="container">
<div class="breadcrumb"><a href="/">홈</a><span class="sep">›</span><a href="/region/${region.slug}">${region.name}</a><span class="sep">›</span>${product.name}</div>
<h1 class="detail-title">${region.emoji} ${region.name} ${product.name} <em>설치</em></h1>
<p class="detail-sub">${region.name} 전 지역 ${region.installTime}. ${product.shortDesc}</p>
</div>
</section>

<section class="detail-body">
<div class="container">
<div class="prose">
<h2>${region.name} ${product.name} 설치 서비스</h2>
<p>${SITE.brandNameKo}는 ${region.fullName} 전 지역에서 ${product.name} 설치를 전문으로 합니다. ${region.description.split('.')[0]}. 특히 ${region.landmarks} 인근 상권에서 카페·음식점·미용실·소매점 등 다양한 업종의 ${product.name} 설치 문의가 꾸준히 들어오고 있으며, ${region.installTime} 빠르게 대응합니다.</p>

<p>${product.longDesc}</p>

<div class="info-card">
<h4>📍 ${region.name} 설치 정보</h4>
<div class="grid-2">
<div><strong>설치 소요:</strong> ${region.installTime}</div>
<div><strong>출장 범위:</strong> ${region.coverage}</div>
<div><strong>제품:</strong> ${product.name}</div>
<div><strong>지원 업종:</strong> ${product.useCases}</div>
</div>
</div>

<h2>${region.name} ${product.name}의 핵심 기능</h2>
<div class="feat-grid-2">${featCards}</div>

<h2>${region.name} ${product.name} 설치가 많은 업종</h2>
<p>${region.name} 지역 상권 특성상 ${product.useCases} 업종에서 ${product.name} 설치 문의가 집중됩니다. 특히 ${region.commercialAreas.slice(0, 3).join(', ')} 등 주요 상권에서 매장 오픈 시 ${product.name}을 기본 장비로 도입하는 사례가 늘고 있습니다.</p>

<h3>${region.name} 내 주요 설치 가능 지역</h3>
<ul>${districtsList}</ul>
<p style="font-size:14px;color:var(--muted)">그 외 ${region.coverage} 당일 출장 설치 가능합니다.</p>

<h2>설치 절차</h2>
<ol>
<li><strong>무료 상담</strong> — ${SITE.phoneDisplay} 또는 카카오톡으로 매장 정보를 알려주세요.</li>
<li><strong>현장 방문 견적</strong> — ${region.name} 담당 엔지니어가 현장 점검 후 견적을 제시합니다.</li>
<li><strong>장비 주문·준비</strong> — 매장 조건에 맞는 ${product.name} 기종을 준비합니다.</li>
<li><strong>설치 및 교육</strong> — ${region.installTime} 내 설치 완료, 사용법 교육 진행.</li>
<li><strong>사후 관리</strong> — ${region.name} 지역 당일 출장 A/S 대응.</li>
</ol>

<h2>자주 묻는 질문</h2>
<h3>Q. ${region.name} ${product.name} 설치 비용은 얼마인가요?</h3>
<p>매장 규모와 선택 기종에 따라 달라집니다. ${SITE.brandNameKo}는 무료 견적을 제공하며, 복수 기종 비교를 통해 매장에 가장 합리적인 선택지를 제안합니다. 정확한 견적은 현장 방문 후 확정됩니다.</p>

<h3>Q. ${region.name}의 다른 지역도 설치 가능한가요?</h3>
<p>네, ${region.coverage} 모두 설치 가능합니다. ${region.majorDistricts.slice(0, 3).join('·')} 외 모든 지역에 ${region.installTime} 출장 설치합니다.</p>

<h3>Q. 다른 제품과 함께 설치하면 할인되나요?</h3>
<p>네, ${product.name} + 카드단말기 + 포스기 같은 풀패키지 설치 시 별도 할인이 적용됩니다. 신규 매장 오픈 시에는 전 제품 통합 패키지가 가장 경제적입니다.</p>

<div class="info-card" style="background:var(--accent);color:var(--paper);margin-top:48px">
<h4 style="color:var(--paper)">📞 ${region.name} ${product.name} 설치 문의</h4>
<p style="font-size:17px;margin:12px 0">
<strong style="color:var(--paper);font-family:'GmarketSansTTF','Gmarket Sans','Pretendard Variable',Pretendard,system-ui,sans-serif;font-size:28px">${SITE.phoneDisplay}</strong>
</p>
<p style="opacity:.9;font-size:14px">${region.name} ${region.installTime}. 지금 전화하시면 오늘 견적을 받으실 수 있습니다.</p>
</div>
</div>
</div>
</section>

<section class="related-section">
<div class="container">
<div class="section-head" style="margin-bottom:24px"><div class="section-tag">${region.name} Other Products</div><h2 class="section-title" style="font-size:32px">${region.name} <em>다른 제품 설치</em></h2></div>
<div class="related-grid">
${PRODUCTS.filter(p => p.slug !== product.slug).slice(0, 4).map(p => `<a href="/${region.slug}/${p.slug}" class="related-item"><span class="emoji">${p.emoji}</span><span class="name">${p.name}</span></a>`).join('')}
</div>
</div>
</section>
`;

  const title = `${region.name} ${product.name} 설치 · ${region.installTime}`;
  const description = `${region.name} ${product.name} 설치 전문. ${region.installTime}, ${region.coverage}. ${product.shortDesc}`;

  return htmlWrap({
    title,
    description,
    canonical: `${SITE.domain}/${region.slug}/${product.slug}`,
    body,
  });
}

// [12] 인덱스 페이지 ==========================================
function renderRegionIndex() {
  const cards = REGIONS.map(r => `<a href="/region/${r.slug}" class="index-card"><div class="big">${r.emoji}</div><h3>${r.name}</h3><p>${r.coverage} · ${r.installTime}</p></a>`).join('');
  const body = `
<section class="index-header">
<div class="container">
<div class="breadcrumb"><a href="/">홈</a><span class="sep">›</span>지역별 설치</div>
<h1><em>전국 17개</em> 광역시도 설치</h1>
<p>서울부터 제주까지 전국 어디서든 ${SITE.brandNameKo}가 찾아갑니다. 지역을 선택하면 해당 지역의 상권 정보와 제품별 설치 가이드를 확인할 수 있습니다.</p>
</div>
</section>
<section class="container">
<div class="index-grid cols-4">${cards}</div>
</section>
`;
  return htmlWrap({
    title: '지역별 설치 · 전국 17개 광역시도',
    description: '전국 17개 광역시도 매장 설비 설치. 서울·경기·부산·대구 등 원하는 지역을 선택하세요.',
    canonical: `${SITE.domain}/region`,
    body,
  });
}

function renderProductIndex() {
  const cards = PRODUCTS.map(p => `<a href="/product/${p.slug}" class="index-card"><div class="big">${p.emoji}</div><h3>${p.name}</h3><p>${p.shortDesc}</p></a>`).join('');
  const body = `
<section class="index-header">
<div class="container">
<div class="breadcrumb"><a href="/">홈</a><span class="sep">›</span>제품 안내</div>
<h1>매장 설비 <em>전 제품 안내</em></h1>
<p>카드단말기부터 철거까지 매장 운영에 필요한 7개 카테고리. 각 제품의 상세 기능과 설치 가이드를 확인하세요.</p>
</div>
</section>
<section class="container">
<div class="index-grid cols-3">${cards}</div>
</section>
`;
  return htmlWrap({
    title: '제품 안내 · 카드단말기·포스기·키오스크·CCTV',
    description: '매장 설비 전 제품 안내. 카드단말기, 포스기, 키오스크, 테이블오더, CCTV, 밴딩머신, 철거까지.',
    canonical: `${SITE.domain}/product`,
    body,
  });
}

// 업종별 인덱스 (/industry)
function renderIndustryIndex() {
  const cards = INDUSTRIES.map(i => `<a href="/industry/${i.slug}" class="index-card"><div class="big">${i.emoji}</div><h3>${i.name}</h3><p>${i.shortDesc}</p></a>`).join('');
  const body = `
<section class="index-header">
<div class="container">
<div class="breadcrumb"><a href="/">홈</a><span class="sep">›</span>업종별</div>
<h1>업종별 <em>맞춤 설치 가이드</em></h1>
<p>음식점·카페·편의점·미용실 등 업종마다 필요한 장비가 다릅니다. 업종별 추천 조합과 설치 사례를 확인하세요.</p>
</div>
</section>
<section class="container">
<div class="index-grid cols-4">${cards}</div>
</section>
`;
  return htmlWrap({
    title: '업종별 맞춤 설치 · 음식점·카페·편의점·프랜차이즈',
    description: '업종별 매장 설비 추천. 음식점·카페·편의점·미용실·프랜차이즈·학원·병원 맞춤 솔루션.',
    canonical: `${SITE.domain}/industry`,
    body,
  });
}

// 업종별 상세 (/industry/{slug})
function renderIndustryPage(industry) {
  const recommendedProducts = industry.recommended
    .map(slug => PRODUCTS.find(p => p.slug === slug))
    .filter(Boolean);
  const productCards = recommendedProducts.map(p => `<a href="/product/${p.slug}" class="index-card"><div class="big">${p.emoji}</div><h3>${p.name}</h3><p>${p.shortDesc}</p></a>`).join('');

  const body = `
<section class="detail-hero">
<div class="container">
<div class="breadcrumb"><a href="/">홈</a><span class="sep">›</span><a href="/industry">업종별</a><span class="sep">›</span>${industry.name}</div>
<h1 class="detail-title">${industry.emoji} ${industry.name} <em>맞춤 설치</em></h1>
<p class="detail-sub">${industry.shortDesc}</p>
</div>
</section>

<section class="detail-body">
<div class="container">
<div class="prose">
<h2>${industry.name}에 맞는 설치 가이드</h2>
<p>${industry.description}</p>

<p>${SITE.brandNameKo}는 ${industry.name} 업종 수백 곳의 설치 경험을 바탕으로, 매장 규모·동선·주요 시간대를 분석해 가장 효과적인 장비 조합을 제안합니다. 초기 투자비용과 월 운영비용을 모두 고려한 합리적 견적을 받아보세요.</p>

<h2>${industry.name} 추천 장비 조합</h2>
<p>아래는 ${industry.name} 매장에서 가장 많이 설치되는 장비입니다. 매장 상황에 따라 필요한 것만 골라 구성할 수도 있습니다.</p>

<div class="index-grid cols-3" style="margin:32px 0">${productCards}</div>

<h2>설치 절차</h2>
<ol>
<li><strong>무료 상담</strong> — ${SITE.phoneDisplay} 또는 카카오톡으로 매장 정보(업종·평수·예상 좌석 수)를 알려주세요.</li>
<li><strong>현장 방문 견적</strong> — 담당 엔지니어가 매장 동선과 네트워크·전기 조건을 점검합니다.</li>
<li><strong>맞춤 패키지 제안</strong> — ${industry.name} 특성에 맞춘 최적 조합을 여러 옵션으로 제시합니다.</li>
<li><strong>설치·교육</strong> — 짧게는 당일, 풀패키지도 1-2일 내 설치 완료 후 사용 교육까지 진행합니다.</li>
<li><strong>사후 관리</strong> — A/S 발생 시 원격 우선 대응, 필요 시 현장 출동합니다.</li>
</ol>

<div class="info-card" style="background:var(--accent);color:#fff;margin-top:48px">
<h4 style="color:#fff">📞 ${industry.name} 설치 문의</h4>
<p style="font-size:17px;margin:12px 0">
<strong style="color:#fff;font-size:28px">${SITE.phoneDisplay}</strong>
</p>
<p style="opacity:.9;font-size:14px">${industry.name} 전문 상담원이 무료로 맞춤 견적을 드립니다.</p>
</div>
</div>
</div>
</section>
`;

  return htmlWrap({
    title: `${industry.name} 매장 설비 설치 · 추천 장비 조합`,
    description: `${industry.name} 맞춤 설치. ${industry.shortDesc}`,
    canonical: `${SITE.domain}/industry/${industry.slug}`,
    body,
  });
}

function findIndustry(slug) { return INDUSTRIES.find(i => i.slug === slug); }

// [12-1] 문의(상담) 페이지 — /contact ==========================
function renderContactPage() {
  const productOptions = PRODUCTS.map(p => `<option value="${p.name}">${p.emoji} ${p.name}</option>`).join('');
  const industryOptions = INDUSTRIES.map(i => `<option value="${i.name}">${i.emoji} ${i.name}</option>`).join('');

  const body = `
<section class="contact-wrap">
<div class="contact-container">

<div class="contact-header">
<h1>${ICONS.phone} 상담 문의</h1>
<p>카드단말기·포스기·키오스크·CCTV·테이블오더·매장 철거까지<br>무엇이든 편하게 문의하세요.</p>
</div>

<div class="contact-phone-card">
<div class="pi">${ICONS.phone}</div>
<div class="pt">
<a href="tel:${SITE.phone}">${SITE.phoneDisplay}</a>
<div class="ps">전화 상담 (가장 빠른 방법)</div>
</div>
</div>

<div class="contact-form-card">
<div id="formView">
<h2>온라인 문의</h2>

<div class="error-msg" id="errorMsg"></div>

<form id="inquiryForm" novalidate>

<div class="field">
<label for="fname">상호(이름) <span class="req">*</span></label>
<input type="text" id="fname" name="name" placeholder="상호 또는 이름을 입력하세요" required>
</div>

<div class="field">
<label for="fphone">연락처 <span class="req">*</span></label>
<input type="tel" id="fphone" name="phone" placeholder="010-0000-0000" required>
</div>

<div class="field">
<label for="faddr">주소 <span class="req">*</span></label>
<div class="field-row">
<input type="text" id="faddr" name="address" placeholder="주소 검색을 클릭하세요" readonly required>
<button type="button" onclick="openAddressSearch()">주소 검색</button>
</div>
<input type="text" id="faddr_detail" name="address_detail" placeholder="상세주소 입력 (건물명, 층, 호수 등)" style="margin-top:8px">
</div>

<div class="field">
<label for="fproduct">문의 제품 <span class="req">*</span></label>
<select id="fproduct" name="product" required>
<option value="">선택해주세요</option>
${productOptions}
<option value="여러 제품">여러 제품 / 전체 문의</option>
</select>
</div>

<div class="field">
<label for="findustry">업종</label>
<select id="findustry" name="industry">
<option value="">선택해주세요</option>
${industryOptions}
<option value="기타">기타</option>
</select>
</div>

<div class="field">
<label for="fmessage">문의 내용</label>
<textarea id="fmessage" name="message" placeholder="매장 위치, 현재 사용 장비, 궁금한 점 등을 자유롭게 적어주세요."></textarea>
</div>

<label class="privacy-check">
<input type="checkbox" id="fagree" name="agree" required>
<span>개인정보 수집·이용에 동의합니다 <span class="req">*</span></span>
</label>

<button type="submit" class="submit-btn" id="submitBtn">문의 접수하기</button>

</form>

<div class="privacy-box">
<div class="title">📋 개인정보 수집·이용 동의</div>
<p><strong>· 수집 항목:</strong> 상호(이름), 연락처, 주소, 문의 내용</p>
<p><strong>· 수집 목적:</strong> 상담 문의 접수 및 답변, 견적 안내</p>
<p><strong>· 보유 기간:</strong> 문의 처리 완료 후 1년 보관 후 파기</p>
<p style="margin-top:6px">※ 동의를 거부할 수 있으며, 거부 시 문의 접수가 제한됩니다.<br>※ 문의 접수 시 위 내용에 동의한 것으로 간주합니다.</p>
</div>

</div>

<div class="success-view" id="successView">
<div class="sch"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
<h3>문의가 접수되었습니다</h3>
<p>빠르게 확인 후 연락드리겠습니다.<br>급하시면 <strong>${SITE.phoneDisplay}</strong>로 전화 주세요.</p>
<a href="/" class="btn btn-ghost">홈으로 돌아가기</a>
</div>

</div>

</div>
</section>

<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script>
function openAddressSearch() {
  new daum.Postcode({
    oncomplete: function(data) {
      document.getElementById('faddr').value = data.roadAddress || data.jibunAddress;
      document.getElementById('faddr_detail').focus();
    }
  }).open();
}

document.getElementById('inquiryForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  var form = e.target;
  var btn = document.getElementById('submitBtn');
  var errorEl = document.getElementById('errorMsg');
  errorEl.style.display = 'none';

  // Basic validation
  if (!form.name.value.trim()) return showError(errorEl, '상호(이름)을 입력해주세요.');
  if (!form.phone.value.trim()) return showError(errorEl, '연락처를 입력해주세요.');
  if (!form.address.value.trim()) return showError(errorEl, '주소를 검색해주세요.');
  if (!form.product.value) return showError(errorEl, '문의 제품을 선택해주세요.');
  if (!form.agree.checked) return showError(errorEl, '개인정보 수집에 동의해주세요.');

  btn.disabled = true;
  btn.textContent = '전송 중...';

  try {
    var res = await fetch('/contact/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name.value.trim(),
        phone: form.phone.value.trim(),
        address: form.address.value.trim(),
        address_detail: form.address_detail.value.trim(),
        product: form.product.value,
        industry: form.industry.value,
        message: form.message.value.trim(),
      })
    });
    if (!res.ok) throw new Error('전송 실패');

    document.getElementById('formView').style.display = 'none';
    document.getElementById('successView').style.display = 'block';
    window.scrollTo({ top: document.querySelector('.contact-wrap').offsetTop, behavior: 'smooth' });
  } catch (err) {
    showError(errorEl, '문의 전송 중 오류가 발생했습니다. 잠시 후 다시 시도하거나 전화로 문의해주세요.');
    btn.disabled = false;
    btn.textContent = '문의 접수하기';
  }
});

function showError(el, msg) {
  el.textContent = msg;
  el.style.display = 'block';
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
</script>
`;

  return htmlWrap({
    title: '상담 문의 · 무료 견적 · 빠른 설치',
    description: '카드단말기·포스기·키오스크·CCTV·테이블오더 등 매장 설비 무료 상담. 전국 출장 설치 전문.',
    canonical: `${SITE.domain}/contact`,
    body,
  });
}

// POST /contact/submit - 폼 제출 처리
async function handleContactSubmit(request, env) {
  try {
    const data = await request.json();

    // Basic validation
    if (!data.name || !data.phone || !data.address || !data.product) {
      return new Response(JSON.stringify({ ok: false, error: '필수 항목 누락' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 이메일 발송 준비 (Resend API — 환경변수에 RESEND_API_KEY 설정되면 자동 작동)
    const now = new Date();
    const kstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000).toISOString().replace('T', ' ').slice(0, 19);
    const emailBody = `
[opsoult.com 상담 문의 접수]

접수일시: ${kstNow} (KST)

● 상호/이름: ${data.name}
● 연락처: ${data.phone}
● 주소: ${data.address} ${data.address_detail || ''}
● 문의 제품: ${data.product}
● 업종: ${data.industry || '(미입력)'}

● 문의 내용:
${data.message || '(문의 내용 없음)'}

---
이 메일은 opsoult.com 문의 폼에서 자동 발송됐습니다.
`.trim();

    // Resend API 키가 있으면 이메일 전송
    if (env && env.RESEND_API_KEY) {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: env.RESEND_FROM || 'onboarding@resend.dev',
          to: [env.CONTACT_EMAIL || 'a01048275592@gmail.com'],
          reply_to: `${data.name} <noreply@opsoult.com>`,
          subject: `[opsoult 문의] ${data.name} - ${data.product}`,
          text: emailBody,
        }),
      });

      if (!resendRes.ok) {
        const errText = await resendRes.text();
        console.error('Resend error:', errText);
        // 이메일 전송 실패해도 접수는 성공으로 처리 (로그만 남김)
      }
    } else {
      // API 키 없을 때는 로그만 (Cloudflare Workers 로그에서 확인 가능)
      console.log('Contact form submission (no email sent):', emailBody);
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('Contact submit error:', err);
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// [13] sitemap.xml ============================================
function renderSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [];
  urls.push({ loc: SITE.domain + '/', priority: '1.0' });
  urls.push({ loc: SITE.domain + '/region', priority: '0.9' });
  urls.push({ loc: SITE.domain + '/product', priority: '0.9' });
  urls.push({ loc: SITE.domain + '/industry', priority: '0.9' });
  urls.push({ loc: SITE.domain + '/contact', priority: '0.9' });
  for (const r of REGIONS) {
    urls.push({ loc: `${SITE.domain}/region/${r.slug}`, priority: '0.8' });
  }
  for (const p of PRODUCTS) {
    urls.push({ loc: `${SITE.domain}/product/${p.slug}`, priority: '0.8' });
  }
  for (const i of INDUSTRIES) {
    urls.push({ loc: `${SITE.domain}/industry/${i.slug}`, priority: '0.8' });
  }
  for (const r of REGIONS) {
    for (const p of PRODUCTS) {
      urls.push({ loc: `${SITE.domain}/${r.slug}/${p.slug}`, priority: '0.7' });
    }
  }
  const items = urls.map(u => `<url><loc>${u.loc}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>${u.priority}</priority></url>`).join('');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</urlset>`;
}

// [14] robots.txt =============================================
function renderRobots() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE.domain}/sitemap.xml
`;
}

// [14-1] 파비콘 (브라우저 탭 아이콘) ===========================
// 디자인: 네이비 배경 + 4칸 그리드 (좌상/우하 주황, 우상/좌하 베이지)
// 색상 변경하려면 fill 값을 바꾸세요:
//   #0c0f14 = 네이비 배경
//   #e8512c = 주황 (강조색)
//   #f5f1ea = 베이지
function renderFavicon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<rect width="64" height="64" rx="14" fill="#0c0f14"/>
<rect x="14" y="14" width="16" height="16" rx="3" fill="#e8512c"/>
<rect x="34" y="14" width="16" height="16" rx="3" fill="#f5f1ea"/>
<rect x="14" y="34" width="16" height="16" rx="3" fill="#f5f1ea"/>
<rect x="34" y="34" width="16" height="16" rx="3" fill="#e8512c"/>
</svg>`;
}

// [15] 404 ====================================================
function render404() {
  const body = `
<section class="block" style="text-align:center;padding:120px 0">
<div class="container">
<div style="font-family:'GmarketSansTTF','Gmarket Sans','Pretendard Variable',Pretendard,system-ui,sans-serif;font-size:120px;font-weight:800;color:var(--accent);letter-spacing:-0.05em;line-height:1">404</div>
<h1 class="section-title" style="margin:20px 0">페이지를 찾을 수 없습니다</h1>
<p class="section-desc" style="margin:0 auto 32px">요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
<a href="/" class="btn btn-primary">홈으로 가기</a>
<a href="/region" class="btn btn-ghost">지역별 설치</a>
<a href="/product" class="btn btn-ghost">제품 안내</a>
</div>
</div>
</section>
`;
  return htmlWrap({
    title: '404 · 페이지를 찾을 수 없습니다',
    description: '요청하신 페이지를 찾을 수 없습니다.',
    canonical: SITE.domain,
    body,
  });
}

// 데이터 조회 헬퍼
function findRegion(slug) { return REGIONS.find(r => r.slug === slug); }
function findProduct(slug) { return PRODUCTS.find(p => p.slug === slug); }

// [16] fetch 라우터 (핵심) ====================================
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let pathname = url.pathname;
    // Normalize: trailing slash 제거 (/ 자체는 유지)
    if (pathname.length > 1 && pathname.endsWith('/')) {
      pathname = pathname.slice(0, -1);
    }
    const htmlHeaders = { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public,max-age=3600' };

    // 메인 페이지
    if (pathname === '/' || pathname === '') {
      return new Response(renderHome(), { headers: htmlHeaders });
    }

    // sitemap.xml
    if (pathname === '/sitemap.xml' || pathname === '/sitemap-index.xml') {
      return new Response(renderSitemap(), {
        headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public,max-age=3600' }
      });
    }

    // robots.txt
    if (pathname === '/robots.txt') {
      return new Response(renderRobots(), {
        headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public,max-age=86400' }
      });
    }

    // favicon.svg — 브라우저 탭 아이콘 (네이비 + 주황 그리드)
    if (pathname === '/favicon.svg' || pathname === '/favicon.ico' || pathname === '/favicon.png' || pathname === '/apple-touch-icon.png') {
      return new Response(renderFavicon(), {
        headers: { 'Content-Type': 'image/svg+xml; charset=utf-8', 'Cache-Control': 'public,max-age=604800' }
      });
    }

    // 지역 인덱스
    if (pathname === '/region') {
      return new Response(renderRegionIndex(), { headers: htmlHeaders });
    }

    // 제품 인덱스
    if (pathname === '/product') {
      return new Response(renderProductIndex(), { headers: htmlHeaders });
    }

    // 업종별 인덱스
    if (pathname === '/industry') {
      return new Response(renderIndustryIndex(), { headers: htmlHeaders });
    }

    // 업종별 상세 /industry/{slug}
    const industryMatch = pathname.match(/^\/industry\/([a-z-]+)$/);
    if (industryMatch) {
      const industry = findIndustry(industryMatch[1]);
      if (industry) return new Response(renderIndustryPage(industry), { headers: htmlHeaders });
    }

    // 상담 문의 페이지
    if (pathname === '/contact') {
      return new Response(renderContactPage(), { headers: htmlHeaders });
    }

    // 상담 문의 폼 제출 (POST)
    if (pathname === '/contact/submit' && request.method === 'POST') {
      return handleContactSubmit(request, env);
    }

    // 지역 상세 /region/{slug}
    const regionMatch = pathname.match(/^\/region\/([a-z-]+)$/);
    if (regionMatch) {
      const region = findRegion(regionMatch[1]);
      if (region) return new Response(renderRegionPage(region), { headers: htmlHeaders });
    }

    // 제품 상세 /product/{slug}
    const productMatch = pathname.match(/^\/product\/([a-z-]+)$/);
    if (productMatch) {
      const product = findProduct(productMatch[1]);
      if (product) return new Response(renderProductPage(product), { headers: htmlHeaders });
    }

    // 지역x제품 /{region}/{product}
    const installMatch = pathname.match(/^\/([a-z-]+)\/([a-z-]+)$/);
    if (installMatch) {
      const region = findRegion(installMatch[1]);
      const product = findProduct(installMatch[2]);
      if (region && product) {
        return new Response(renderInstallPage(region, product), { headers: htmlHeaders });
      }
    }

    // 404
    return new Response(render404(), { status: 404, headers: htmlHeaders });
  }
};
