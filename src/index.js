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
  brandName: 'opsoult',
  brandNameKo: '옵솔트',
  domain: 'https://opsoult.com',
  phone: '010-0000-0000',
  phoneDisplay: '010-0000-0000',
  businessHours: '평일 09:00 - 19:00 / 토 09:00 - 15:00',
  description: '전국 매장 설비 설치 전문. 카드단말기·포스기·키오스크·테이블오더·CCTV까지 원스톱 설치.',
  naverVerification: '669cd60625b7336f4e33d5cc0a3af618bc9fbfbb',
  stats: {
    totalInstalls: '350+',
    satisfaction: '98%',
    installRate: '94%',
    renewalRate: '87%',
    coverage: '5,000+',
  },
};

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
    longDesc: '카드단말기는 매장 결제의 기본이자 핵심 장비입니다. 옵솔트는 10개 이상의 VAN사와 협력해 매장 매출 규모와 업종에 맞는 최적의 수수료 조건을 제안합니다. 유선·무선·블루투스·토스 단말기 등 전 기종을 취급하며, 당일 출장 설치와 사용법 교육까지 원스톱으로 제공합니다. 기존 단말기 교체 시에는 VAN사 비교를 통해 월 평균 3-7만원, 연 40-80만원의 수수료를 절약할 수 있습니다.',
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
    longDesc: '매장 CCTV는 도난·사고 방지, 직원 관리, 보험료 절감을 위한 필수 장비입니다. 옵솔트는 HD부터 4K까지 다양한 화질 선택과 AI 움직임 감지, 스마트폰 원격 확인, POS 연동 영상 매칭까지 제공합니다. 결제 시점 영상 자동 매칭으로 매출 누락을 사전 방지하며, CCTV 설치 매장은 화재·도난 보험료 10-20% 할인 혜택을 받을 수 있습니다.',
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
    longDesc: '매장 철거는 폐업·이전 시 보증금 반환에 직결되는 중요한 공정입니다. 옵솔트는 정밀 현장 분석부터 철거·원상복구·폐기물 처리까지 원스톱으로 처리하며, 시공 보증서 발급으로 사후 책임까지 확실히 합니다. 추가 비용 없는 정찰제 운영과 실시간 공정 보고로 임대인과의 분쟁을 사전 예방합니다.',
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
  { icon: '🏆', stat: '350+', title: '누적 설치 건수', desc: '전국 직접 출장 설치' },
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
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@300;400;500;600;700&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,800;1,9..144,600&display=swap');
:root{
  --ink:#0c0f14;--ink-2:#1b212c;--paper:#f5f1ea;--paper-2:#ece6db;
  --accent:#e8512c;--accent-2:#ffb347;--line:#d7cfc2;--muted:#6b7280;
  --max:1180px;--radius:18px;
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'IBM Plex Sans KR',system-ui,sans-serif;color:var(--ink);background:var(--paper);line-height:1.6;font-weight:400;overflow-x:hidden;-webkit-font-smoothing:antialiased}
.serif{font-family:'Fraunces',serif;font-weight:600;letter-spacing:-0.02em}
a{color:inherit;text-decoration:none}
img{max-width:100%;display:block}
.container{max-width:var(--max);margin:0 auto;padding:0 24px}
.btn{display:inline-flex;align-items:center;gap:8px;padding:16px 28px;border-radius:100px;font-size:15px;font-weight:500;font-family:inherit;transition:transform .2s,box-shadow .2s,background .2s;cursor:pointer;border:0}
.btn-primary{background:var(--ink);color:var(--paper)}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(12,15,20,0.25)}
.btn-ghost{background:transparent;color:var(--ink);border:1.5px solid var(--ink)}
.btn-ghost:hover{background:var(--ink);color:var(--paper)}
.btn-accent{background:var(--accent);color:var(--paper)}
.btn-accent:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(232,81,44,0.35)}
.section-head{margin-bottom:56px;max-width:720px}
.section-tag{font-size:12px;letter-spacing:0.15em;text-transform:uppercase;color:var(--accent);font-weight:600;margin-bottom:14px}
.section-title{font-family:'Fraunces',serif;font-size:clamp(32px,4vw,48px);line-height:1.1;letter-spacing:-0.03em;font-weight:600}
.section-title em{font-style:italic;color:var(--accent)}
.section-title strong{font-weight:700}
.section-desc{margin-top:18px;font-size:17px;color:var(--muted)}
section.block{padding:100px 0}
header{position:sticky;top:0;z-index:50;background:rgba(245,241,234,0.85);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-bottom:1px solid var(--line)}
.nav{display:flex;align-items:center;justify-content:space-between;height:68px}
.logo{font-family:'Fraunces',serif;font-weight:800;font-size:22px;letter-spacing:-0.03em;display:inline-flex;align-items:center;gap:8px;color:var(--ink)}
.logo-dot{width:10px;height:10px;border-radius:50%;background:var(--accent);display:inline-block}
.nav-menu{list-style:none;display:flex;gap:32px;font-size:15px;font-weight:500}
.nav-menu a{color:var(--ink-2);transition:color .2s}
.nav-menu a:hover{color:var(--accent)}
.nav-cta{background:var(--ink);color:var(--paper);padding:10px 20px;border-radius:100px;font-size:14px;font-weight:500;transition:transform .2s,background .2s}
.nav-cta:hover{transform:translateY(-1px);background:var(--accent)}
.hero{padding:80px 0 60px;position:relative;overflow:hidden}
.hero-grid{display:grid;grid-template-columns:1.2fr 1fr;gap:60px;align-items:center}
.eyebrow{display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border:1px solid var(--line);background:var(--paper-2);border-radius:100px;font-size:13px;font-weight:500;color:var(--ink-2)}
.eyebrow::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--accent);animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.3)}}
.hero-title{font-family:'Fraunces',serif;font-size:clamp(38px,5.5vw,72px);line-height:1.05;letter-spacing:-0.035em;font-weight:600;margin:20px 0 24px}
.hero-title em{font-style:italic;color:var(--accent);font-weight:600}
.hero-title .underline{position:relative;display:inline-block}
.hero-title .underline::after{content:"";position:absolute;left:0;right:0;bottom:4px;height:10px;background:var(--accent-2);opacity:.5;z-index:-1}
.hero-sub{font-size:18px;color:var(--ink-2);max-width:520px;margin-bottom:36px}
.hero-ctas{display:flex;gap:14px;flex-wrap:wrap}
.hero-visual{position:relative;aspect-ratio:4/5;max-width:460px;margin-left:auto;width:100%}
.hero-card{position:absolute;background:var(--ink);color:var(--paper);border-radius:var(--radius);padding:28px;box-shadow:0 20px 60px rgba(12,15,20,0.2)}
.hero-card-1{top:0;left:0;width:70%;transform:rotate(-3deg)}
.hero-card-2{bottom:10%;right:0;width:65%;background:var(--accent);transform:rotate(4deg)}
.hero-card-3{bottom:0;left:15%;width:55%;background:var(--paper-2);color:var(--ink);border:1px solid var(--line);transform:rotate(-1deg)}
.stat-num{font-family:'Fraunces',serif;font-size:54px;font-weight:800;line-height:1;letter-spacing:-0.04em}
.stat-label{font-size:13px;opacity:.8;margin-top:8px}
.stats-bar{border-top:1px solid var(--line);border-bottom:1px solid var(--line);padding:40px 0;background:var(--paper-2)}
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;text-align:center}
.stat-item .n{font-family:'Fraunces',serif;font-size:42px;font-weight:700;letter-spacing:-0.03em;color:var(--ink)}
.stat-item .n span{color:var(--accent)}
.stat-item .l{font-size:13px;color:var(--muted);margin-top:4px;letter-spacing:.02em}
.strengths-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px}
.strength{background:var(--paper-2);border-radius:var(--radius);padding:36px 28px;text-align:center;transition:transform .25s,background .25s}
.strength:hover{transform:translateY(-4px);background:var(--paper)}
.strength-icon{font-size:44px;margin-bottom:16px}
.strength-stat{font-family:'Fraunces',serif;font-size:36px;font-weight:700;color:var(--accent);margin-bottom:8px;letter-spacing:-0.03em}
.strength h4{font-family:'Fraunces',serif;font-size:20px;font-weight:600;margin-bottom:8px;letter-spacing:-0.02em}
.strength p{font-size:14px;color:var(--muted);line-height:1.5}
.region-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:10px;margin-top:40px}
.region-chip{padding:18px 14px;border:1px solid rgba(245,241,234,0.15);border-radius:12px;text-align:center;font-size:14px;font-weight:500;transition:all .2s;cursor:pointer;color:var(--paper);background:transparent}
.region-chip:hover{background:var(--accent);border-color:var(--accent);transform:translateY(-2px)}
.region-chip .emoji{display:block;font-size:22px;margin-bottom:6px}
.regions-section{background:var(--ink);color:var(--paper);padding:100px 0}
.regions-section .section-title{color:var(--paper)}
.regions-section .section-desc{color:rgba(245,241,234,0.7)}
.regions-section .section-tag{color:var(--accent-2)}
.product-grid-link{display:grid;grid-template-columns:repeat(7,1fr);gap:10px;margin-top:24px}
.product-chip{padding:18px 12px;background:var(--paper-2);border-radius:12px;text-align:center;font-size:13px;font-weight:500;transition:all .2s;border:1px solid transparent}
.product-chip:hover{background:var(--ink);color:var(--paper);transform:translateY(-2px);border-color:var(--ink)}
.product-chip .emoji{display:block;font-size:22px;margin-bottom:6px}
.products-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.product-card{background:var(--paper-2);border-radius:var(--radius);padding:32px 28px;border:1px solid transparent;transition:all .3s;cursor:pointer;position:relative;overflow:hidden}
.product-card:hover{background:var(--ink);color:var(--paper);transform:translateY(-4px);border-color:var(--ink)}
.product-icon{width:56px;height:56px;border-radius:14px;background:var(--paper);display:flex;align-items:center;justify-content:center;font-size:28px;margin-bottom:20px;transition:background .3s}
.product-card:hover .product-icon{background:var(--accent)}
.product-card h3{font-family:'Fraunces',serif;font-size:22px;font-weight:600;letter-spacing:-0.02em;margin-bottom:8px}
.product-card p{font-size:14px;color:var(--muted);line-height:1.55}
.product-card:hover p{color:rgba(245,241,234,0.7)}
.product-arrow{position:absolute;top:28px;right:28px;font-size:20px;opacity:0;transition:opacity .3s,transform .3s}
.product-card:hover .product-arrow{opacity:1;transform:translate(4px,-4px)}
.features-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--line);border:1px solid var(--line);border-radius:var(--radius);overflow:hidden}
.feature-cell{background:var(--paper);padding:40px 32px;transition:background .2s}
.feature-cell:hover{background:#fffbf3}
.feature-cell .icon{font-size:36px;margin-bottom:16px}
.feature-cell h4{font-family:'Fraunces',serif;font-size:22px;font-weight:600;letter-spacing:-0.02em;margin-bottom:10px}
.feature-cell p{font-size:14.5px;color:var(--muted);line-height:1.6}
.features-section{background:var(--paper-2)}
.reviews-track{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.review{background:var(--paper);border:1px solid var(--line);border-radius:var(--radius);padding:28px}
.review-stars{color:var(--accent-2);font-size:16px;margin-bottom:14px;letter-spacing:2px}
.review-badge{display:inline-block;padding:4px 12px;background:var(--paper-2);border-radius:100px;font-size:12px;font-weight:600;color:var(--accent);margin-bottom:14px}
.review h5{font-family:'Fraunces',serif;font-size:18px;font-weight:600;margin-bottom:10px;letter-spacing:-0.01em}
.review p{font-size:14px;color:var(--muted);margin-bottom:16px;line-height:1.55}
.review-author{padding-top:14px;border-top:1px dashed var(--line);font-size:13px;color:var(--ink-2);font-weight:500}
.cta-block{background:var(--accent);color:var(--paper);padding:90px 0;text-align:center;position:relative;overflow:hidden}
.cta-block::before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 20% 30%,rgba(255,179,71,0.4) 0%,transparent 50%),radial-gradient(circle at 80% 70%,rgba(12,15,20,0.2) 0%,transparent 50%);pointer-events:none}
.cta-block > *{position:relative;z-index:1}
.cta-block h2{font-family:'Fraunces',serif;font-size:clamp(36px,5vw,60px);font-weight:600;letter-spacing:-0.03em;line-height:1.1;margin-bottom:20px}
.cta-block h2 em{font-style:italic}
.cta-block > .container > p{font-size:18px;opacity:.9;margin-bottom:36px}
.cta-phone{display:inline-flex;align-items:center;gap:12px;background:var(--ink);color:var(--paper);padding:22px 40px;border-radius:100px;font-family:'Fraunces',serif;font-size:24px;font-weight:600;letter-spacing:-0.01em;transition:transform .2s,box-shadow .2s}
.cta-phone:hover{transform:translateY(-3px);box-shadow:0 15px 40px rgba(12,15,20,0.3)}
.cta-sub{margin-top:20px;font-size:14px;opacity:.8}
footer{background:var(--ink);color:var(--paper);padding:60px 0 30px}
footer .logo{color:var(--paper)}
.foot-grid{display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:40px;margin-bottom:40px}
.foot-brand p{font-size:14px;color:rgba(245,241,234,0.6);margin-top:12px;max-width:280px;line-height:1.6}
.foot-col h6{font-size:12px;letter-spacing:0.15em;text-transform:uppercase;color:var(--accent-2);font-weight:600;margin-bottom:16px}
.foot-col ul{list-style:none}
.foot-col li{margin-bottom:10px;font-size:14px;color:rgba(245,241,234,0.7)}
.foot-col a:hover{color:var(--accent-2)}
.foot-bottom{padding-top:24px;border-top:1px solid rgba(245,241,234,0.1);display:flex;justify-content:space-between;font-size:13px;color:rgba(245,241,234,0.5)}
.floating-call{position:fixed;bottom:24px;right:24px;background:var(--accent);color:var(--paper);padding:16px 24px;border-radius:100px;font-weight:600;box-shadow:0 10px 30px rgba(232,81,44,0.4);z-index:40;display:inline-flex;align-items:center;gap:10px;transition:transform .2s}
.floating-call:hover{transform:scale(1.05)}
.detail-hero{padding:60px 0 40px;background:var(--paper-2);border-bottom:1px solid var(--line)}
.breadcrumb{font-size:13px;color:var(--muted);margin-bottom:20px}
.breadcrumb a{color:var(--muted);transition:color .2s}
.breadcrumb a:hover{color:var(--accent)}
.breadcrumb .sep{margin:0 8px;opacity:.5}
.detail-title{font-family:'Fraunces',serif;font-size:clamp(32px,4.5vw,52px);letter-spacing:-0.03em;line-height:1.15;font-weight:600;margin-bottom:16px}
.detail-title em{font-style:italic;color:var(--accent)}
.detail-sub{font-size:18px;color:var(--ink-2);max-width:720px;line-height:1.6}
.detail-body{padding:60px 0;max-width:860px;margin:0 auto}
.detail-body .prose{font-size:17px;line-height:1.8;color:var(--ink-2)}
.detail-body .prose p{margin-bottom:20px}
.detail-body h2{font-family:'Fraunces',serif;font-size:30px;font-weight:600;letter-spacing:-0.02em;margin:48px 0 16px}
.detail-body h3{font-family:'Fraunces',serif;font-size:22px;font-weight:600;margin:32px 0 12px}
.detail-body ul{margin:0 0 20px 1.4em}
.detail-body li{margin-bottom:8px}
.info-card{background:var(--paper-2);border-radius:var(--radius);padding:32px;margin:32px 0}
.info-card h4{font-family:'Fraunces',serif;font-size:20px;margin-bottom:16px;font-weight:600}
.info-card .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:12px 24px;margin-top:12px}
.info-card .grid-2 div{padding:8px 0;border-bottom:1px dashed var(--line);font-size:14px}
.info-card .grid-2 div strong{color:var(--ink);margin-right:8px}
.feat-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:24px 0}
.feat-card{background:var(--paper);border:1px solid var(--line);border-radius:12px;padding:24px}
.feat-card h5{font-family:'Fraunces',serif;font-size:17px;font-weight:600;margin-bottom:8px}
.feat-card p{font-size:14px;color:var(--muted);line-height:1.55}
.related-section{background:var(--paper-2);padding:80px 0}
.related-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:32px}
.related-item{background:var(--paper);border:1px solid var(--line);border-radius:12px;padding:20px;text-align:center;transition:all .2s}
.related-item:hover{background:var(--ink);color:var(--paper);transform:translateY(-2px);border-color:var(--ink)}
.related-item .emoji{font-size:24px;display:block;margin-bottom:8px}
.related-item .name{font-size:14px;font-weight:500}
.index-header{padding:80px 0 40px}
.index-header h1{font-family:'Fraunces',serif;font-size:clamp(36px,5vw,60px);letter-spacing:-0.03em;font-weight:600;margin-bottom:16px}
.index-header h1 em{font-style:italic;color:var(--accent)}
.index-header p{font-size:18px;color:var(--muted);max-width:720px}
.index-grid{display:grid;gap:16px;padding-bottom:100px}
.index-grid.cols-4{grid-template-columns:repeat(4,1fr)}
.index-grid.cols-3{grid-template-columns:repeat(3,1fr)}
.index-card{background:var(--paper-2);border-radius:var(--radius);padding:28px;border:1px solid transparent;transition:all .25s;display:block;color:var(--ink)}
.index-card:hover{background:var(--paper);border-color:var(--accent);transform:translateY(-3px);box-shadow:0 10px 30px rgba(12,15,20,0.08)}
.index-card .big{font-family:'Fraunces',serif;font-size:36px;margin-bottom:8px}
.index-card h3{font-family:'Fraunces',serif;font-size:22px;font-weight:600;margin-bottom:8px;letter-spacing:-0.02em}
.index-card p{font-size:14px;color:var(--muted);line-height:1.55}
@media (max-width: 960px){
  .hero-grid{grid-template-columns:1fr;gap:40px}
  .hero-visual{max-width:360px;margin:0 auto}
  .products-grid{grid-template-columns:repeat(2,1fr)}
  .stats-grid{grid-template-columns:repeat(2,1fr);gap:30px}
  .strengths-grid{grid-template-columns:repeat(2,1fr)}
  .region-grid{grid-template-columns:repeat(4,1fr)}
  .product-grid-link{grid-template-columns:repeat(4,1fr)}
  .features-grid{grid-template-columns:1fr}
  .reviews-track{grid-template-columns:1fr}
  .foot-grid{grid-template-columns:1fr 1fr;gap:30px}
  .nav-menu{display:none}
  .related-grid{grid-template-columns:repeat(2,1fr)}
  .index-grid.cols-4,.index-grid.cols-3{grid-template-columns:repeat(2,1fr)}
  .feat-grid-2{grid-template-columns:1fr}
  .info-card .grid-2{grid-template-columns:1fr}
}
@media (max-width: 560px){
  section.block{padding:70px 0}
  .products-grid{grid-template-columns:1fr}
  .region-grid{grid-template-columns:repeat(3,1fr)}
  .product-grid-link{grid-template-columns:repeat(3,1fr)}
  .foot-grid{grid-template-columns:1fr}
  .foot-bottom{flex-direction:column;gap:8px}
  .floating-call{padding:14px 18px;font-size:14px}
  .strengths-grid{grid-template-columns:1fr}
  .related-grid{grid-template-columns:1fr}
  .index-grid.cols-4,.index-grid.cols-3{grid-template-columns:1fr}
}
`;

// [07] 공통 헤더/푸터/HTML 래퍼 ================================
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
<a href="/" class="logo"><span class="logo-dot"></span>${SITE.brandName}</a>
<ul class="nav-menu">
<li><a href="/product">제품</a></li>
<li><a href="/region">지역별 설치</a></li>
<li><a href="/#features">특장점</a></li>
<li><a href="/#reviews">후기</a></li>
<li><a href="/#contact">문의</a></li>
</ul>
<a href="tel:${SITE.phone}" class="nav-cta">📞 무료 상담</a>
</div>
</header>`;
}

function renderFooter() {
  const topProducts = PRODUCTS.slice(0, 4).map(p => `<li><a href="/product/${p.slug}">${p.name}</a></li>`).join('');
  const topRegions = REGIONS.slice(0, 4).map(r => `<li><a href="/region/${r.slug}">${r.name}</a></li>`).join('');
  return `<footer>
<div class="container">
<div class="foot-grid">
<div class="foot-brand">
<a href="/" class="logo"><span class="logo-dot"></span>${SITE.brandName}</a>
<p>1인 매장부터 프랜차이즈까지. 매장 운영에 필요한 설비를 한곳에서.</p>
</div>
<div class="foot-col">
<h6>제품</h6>
<ul>${topProducts}<li><a href="/product">전체 보기</a></li></ul>
</div>
<div class="foot-col">
<h6>지역</h6>
<ul>${topRegions}<li><a href="/region">전체 보기</a></li></ul>
</div>
<div class="foot-col">
<h6>고객센터</h6>
<ul>
<li>📞 ${SITE.phoneDisplay}</li>
<li>${SITE.businessHours}</li>
<li>일/공휴일 휴무</li>
</ul>
</div>
</div>
<div class="foot-bottom">
<span>© 2026 ${SITE.brandName}. All rights reserved.</span>
<span>${SITE.domain.replace('https://','')}</span>
</div>
</div>
</footer>`;
}

function renderFloatingCTA() {
  return `<a href="tel:${SITE.phone}" class="floating-call">📞 전화 상담</a>`;
}

// [08] 메인 페이지 렌더 =======================================
function renderHome() {
  const regionChips = REGIONS.map(r => `<a href="/region/${r.slug}" class="region-chip"><span class="emoji">${r.emoji}</span>${r.name}</a>`).join('');
  const productChips = PRODUCTS.map(p => `<a href="/product/${p.slug}" class="product-chip"><span class="emoji">${p.emoji}</span>${p.name}</a>`).join('');
  const productCards = PRODUCTS.map(p => `<a href="/product/${p.slug}" class="product-card"><span class="product-arrow">↗</span><div class="product-icon">${p.emoji}</div><h3>${p.name}</h3><p>${p.shortDesc}</p></a>`).join('');
  const strengths = STRENGTHS.map(s => `<div class="strength"><div class="strength-icon">${s.icon}</div><div class="strength-stat">${s.stat}</div><h4>${s.title}</h4><p>${s.desc}</p></div>`).join('');
  const smartFeatures = SMART_FEATURES.map(f => `<div class="feature-cell"><div class="icon">${f.icon}</div><h4>${f.title}</h4><p>${f.desc}</p></div>`).join('');
  const reviews = REVIEWS.map(r => `<div class="review"><div class="review-stars">★★★★★</div><span class="review-badge">${r.badge}</span><h5>${r.title}</h5><p>${r.body}</p><div class="review-author">— ${r.author}</div></div>`).join('');
  const whyUs = WHY_US.map(w => `<div class="feature-cell"><div class="icon">${w.icon}</div><h4>${w.title}</h4><p>${w.desc}</p></div>`).join('');

  const body = `
<section class="hero">
<div class="container hero-grid">
<div>
<span class="eyebrow">전국 매장 설비 설치 플랫폼</span>
<h1 class="hero-title">우리 매장에<br><span class="underline">딱 맞는 장비를</span><br><em>빠르게, 정확하게.</em></h1>
<p class="hero-sub">카드단말기부터 포스기, 키오스크, 테이블오더, CCTV까지. 업종과 동선에 맞춘 1:1 컨설팅으로 매장 운영을 한 단계 끌어올립니다.</p>
<div class="hero-ctas">
<a href="#contact" class="btn btn-primary">무료 견적 받기 →</a>
<a href="#products" class="btn btn-ghost">제품 둘러보기</a>
</div>
</div>
<div class="hero-visual">
<div class="hero-card hero-card-1"><div class="stat-num">${SITE.stats.totalInstalls}</div><div class="stat-label">누적 설치 매장</div></div>
<div class="hero-card hero-card-2"><div class="stat-num">${SITE.stats.satisfaction}</div><div class="stat-label">설치 만족도</div></div>
<div class="hero-card hero-card-3"><div class="stat-num" style="font-size:32px">⚡ 당일</div><div class="stat-label" style="color:var(--muted)">상담·출장 가능</div></div>
</div>
</div>
</section>

<div class="stats-bar">
<div class="container stats-grid">
<div class="stat-item"><div class="n">${SITE.stats.coverage}<span>+</span></div><div class="l">전국 읍면동 출장 가능</div></div>
<div class="stat-item"><div class="n">${SITE.stats.installRate}</div><div class="l">당일·익일 설치 완료율</div></div>
<div class="stat-item"><div class="n">${SITE.stats.renewalRate}</div><div class="l">재계약·추천률</div></div>
<div class="stat-item"><div class="n">24<span>H</span></div><div class="l">A/S 대응 체계</div></div>
</div>
</div>

<section class="block">
<div class="container">
<div class="section-head">
<div class="section-tag">Our Strength</div>
<h2 class="section-title">전국 사장님이 선택한<br><em>${SITE.brandNameKo}가 다릅니다</em></h2>
</div>
<div class="strengths-grid">${strengths}</div>
</div>
</section>

<section class="regions-section" id="regions">
<div class="container">
<div class="section-head">
<div class="section-tag">Find Your Solution</div>
<h2 class="section-title">우리 매장에 필요한<br><em>설비를 찾아보세요</em></h2>
<p class="section-desc">전국 17개 광역시도, 7개 제품 카테고리. 원하는 곳을 클릭하세요.</p>
</div>
<h3 style="font-family:'Fraunces',serif;font-size:18px;font-weight:500;color:var(--accent-2);margin-bottom:12px">📍 지역별 설치</h3>
<div class="region-grid">${regionChips}</div>
<h3 style="font-family:'Fraunces',serif;font-size:18px;font-weight:500;color:var(--accent-2);margin:40px 0 12px">📦 제품별 안내</h3>
<div class="product-grid-link">${productChips}</div>
</div>
</section>

<section class="block" id="products">
<div class="container">
<div class="section-head">
<div class="section-tag">All-In-One Solution</div>
<h2 class="section-title">매장에 필요한 모든 장비,<br><em>한 곳에서</em> 설치합니다</h2>
<p class="section-desc">1인 매장부터 프랜차이즈까지. 업종과 매장 규모에 맞춰 최적의 조합을 제안합니다.</p>
</div>
<div class="products-grid">${productCards}</div>
</div>
</section>

<section class="block features-section" id="features">
<div class="container">
<div class="section-head">
<div class="section-tag">Smart Features</div>
<h2 class="section-title">설치만 하는 게 아닙니다<br><em>매장 운영이 달라집니다</em></h2>
</div>
<div class="features-grid">${smartFeatures}</div>
</div>
</section>

<section class="block" id="reviews">
<div class="container">
<div class="section-head">
<div class="section-tag">Real Reviews</div>
<h2 class="section-title">전국 사장님들의<br><em>생생한 설치 후기</em></h2>
<p class="section-desc">매장 매출 상승부터 인건비 절감까지. 실제 사용 경험을 들려드립니다.</p>
</div>
<div class="reviews-track">${reviews}</div>
</div>
</section>

<section class="block features-section">
<div class="container">
<div class="section-head">
<div class="section-tag">Why ${SITE.brandName}</div>
<h2 class="section-title">단순 장비 판매가 아닙니다<br><em>왜 ${SITE.brandNameKo}인가요?</em></h2>
</div>
<div class="features-grid" style="grid-template-columns:repeat(2,1fr)">${whyUs}</div>
</div>
</section>

<section class="cta-block" id="contact">
<div class="container">
<h2>지금 전화하면<br><em>오늘 견적</em> 받습니다</h2>
<p>카드단말기·포스기·키오스크·CCTV·테이블오더<br>매장에 필요한 모든 장비, 한 통화로 해결하세요</p>
<a href="tel:${SITE.phone}" class="cta-phone">📞 ${SITE.phoneDisplay}</a>
<div class="cta-sub">${SITE.businessHours} · 카카오톡 상담도 가능합니다</div>
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
<strong style="color:var(--paper);font-family:'Fraunces',serif;font-size:28px">${SITE.phoneDisplay}</strong>
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
<strong style="color:var(--paper);font-family:'Fraunces',serif;font-size:28px">${SITE.phoneDisplay}</strong>
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
<strong style="color:var(--paper);font-family:'Fraunces',serif;font-size:28px">${SITE.phoneDisplay}</strong>
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

// [13] sitemap.xml ============================================
function renderSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [];
  urls.push({ loc: SITE.domain + '/', priority: '1.0' });
  urls.push({ loc: SITE.domain + '/region', priority: '0.9' });
  urls.push({ loc: SITE.domain + '/product', priority: '0.9' });
  for (const r of REGIONS) {
    urls.push({ loc: `${SITE.domain}/region/${r.slug}`, priority: '0.8' });
  }
  for (const p of PRODUCTS) {
    urls.push({ loc: `${SITE.domain}/product/${p.slug}`, priority: '0.8' });
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

// [15] 404 ====================================================
function render404() {
  const body = `
<section class="block" style="text-align:center;padding:120px 0">
<div class="container">
<div style="font-family:'Fraunces',serif;font-size:120px;font-weight:800;color:var(--accent);letter-spacing:-0.05em;line-height:1">404</div>
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
  async fetch(request) {
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

    // 지역 인덱스
    if (pathname === '/region') {
      return new Response(renderRegionIndex(), { headers: htmlHeaders });
    }

    // 제품 인덱스
    if (pathname === '/product') {
      return new Response(renderProductIndex(), { headers: htmlHeaders });
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
