import image1 from "./assets/image1.jpg";
import image2 from "./assets/image2.jpg";
import image3 from "./assets/image3.jpg";
import image7 from "./assets/image7.jpg";
import image4 from "./assets/image4.jpg";
import image5 from "./assets/image5.jpg";
import image6 from "./assets/image6.jpg";
import image8 from "./assets/image8.jpg";
import image9 from "./assets/image9.jpg";

const products = [
  // NEW 카테고리
  {
    id: 1,
    image: image1,
    imageUrls: [image1, image2, image3, image5, image6],
    name: "브레드 레더 크로스백",
    originalPrice: 32000,
    price: 29000,
    colors: ["Black", "White", "Beige"],
    sizes: ["Small", "Medium", "Large"],
    category: "NEW"
  },
  {
    id: 2,
    image: image1,
    name: "체인 디테일 숄더백",
    originalPrice: 45000,
    price: 39000,
    colors: ["Black", "Brown"],
    sizes: ["One Size"],
    category: "NEW"
  },
  {
    id: 3,
    image: image1,
    name: "미니 토트백",
    originalPrice: 38000,
    price: 34000,
    colors: ["White", "Beige"],
    sizes: ["Medium"],
    category: "NEW"
  },
  {
    id: 4,
    image: image1,
    name: "클래식 버킷백",
    originalPrice: 52000,
    price: 47000,
    colors: ["Black", "Red"],
    sizes: ["Large"],
    category: "NEW"
  },

  // BEST 카테고리
  {
    id: 5,
    image: image4,
    name: "펄 앤 비즈 넥크리스",
    originalPrice: 28000,
    price: 24000,
    colors: ["#000", "#fff"],
    sizes: ["Free Size"],
    category: "BEST"
  },
  {
    id: 6,
    image: image4,
    name: "실버 체인 브레이슬릿",
    originalPrice: 18000,
    price: 15000,
    colors: ["Silver", "Gold"],
    sizes: ["Free Size"],
    category: "BEST"
  },
  {
    id: 7,
    image: image4,
    name: "미팔리얼 링 세트",
    originalPrice: 22000,
    price: 19000,
    colors: ["Gold", "Rose Gold"],
    sizes: ["Free Size"],
    category: "BEST"
  },
  {
    id: 8,
    image: image4,
    name: "스터드 이어링",
    originalPrice: 16000,
    price: 13000,
    colors: ["#000", "#fff", "Silver"],
    sizes: ["Free Size"],
    category: "BEST"
  },

  // SALE 카테고리
  {
    id: 9,
    image: image7,
    name: "레이어 체인 브레이슬릿",
    originalPrice: 12000,
    price: 8400,
    colors: ["#ccc"],
    sizes: ["Free Size"],
    category: "SALE"
  },
  {
    id: 10,
    image: image7,
    name: "빈티지 쉬폰 스카프",
    originalPrice: 15000,
    price: 10500,
    colors: ["#fff", "Beige", "Pink"],
    sizes: ["Free Size"],
    category: "SALE"
  },
  {
    id: 11,
    image: image7,
    name: "벨트 스타일 허리띠",
    originalPrice: 19000,
    price: 13300,
    colors: ["Black", "Brown"],
    sizes: ["S", "M", "L"],
    category: "SALE"
  },
  {
    id: 12,
    image: image7,
    name: " 데코 쿠션",
    originalPrice: 12000,
    price: 8400,
    colors: ["#ccc", "#fff"],
    sizes: ["50x50", "60x60"],
    category: "SALE"
  },

  // 봄/가을 카테고리
  {
    id: 13,
    image: image9,
    name: "소프트 쉬프트 원피스",
    originalPrice: 45000,
    price: 42000,
    colors: ["#222", "Beige", "Mint"],
    sizes: ["Small", "Medium", "Large"],
    category: "봄/가을"
  },
  {
    id: 14,
    image: image9,
    name: "크롭 카디건",
    originalPrice: 35000,
    price: 32000,
    colors: ["White", "Pink", "Yellow"],
    sizes: ["Free Size"],
    category: "봄/가을"
  },
  {
    id: 15,
    image: image9,
    name: "트렌치 코트",
    originalPrice: 78000,
    price: 72000,
    colors: ["Beige", "Black"],
    sizes: ["S", "M", "L"],
    category: "봄/가을"
  },
  {
    id: 16,
    image: image9,
    name: "와이드 슬랙스",
    originalPrice: 28000,
    price: 25000,
    colors: ["Black", "White", "Brown"],
    sizes: ["S", "M", "L"],
    category: "봄/가을"
  },

  // 여름 카테고리
  {
    id: 17,
    image: image8,
    name: "린넨 오버핏 셔츠",
    originalPrice: 38000,
    price: 35000,
    colors: ["#000", "#fff", "Sky Blue"],
    sizes: ["Free Size"],
    category: "여름"
  },
  {
    id: 18,
    image: image8,
    name: "플로럴 원피스",
    originalPrice: 42000,
    price: 38000,
    colors: ["White", "Yellow"],
    sizes: ["S", "M"],
    category: "여름"
  },
  {
    id: 19,
    image: image8,
    name: "쿨링 반팔 티",
    originalPrice: 15000,
    price: 13000,
    colors: ["Black", "White", "Gray", "Navy"],
    sizes: ["Free Size"],
    category: "여름"
  },
  {
    id: 20,
    image: image8,
    name: "린넨 와이드 팬츠",
    originalPrice: 32000,
    price: 29000,
    colors: ["Beige", "White", "Black"],
    sizes: ["S", "M", "L"],
    category: "여름"
  },
  {
    id: 21,
    image: image8,
    name: "스트라이프 셔츠",
    originalPrice: 29000,
    price: 26000,
    colors: ["Blue/White", "Black/White"],
    sizes: ["Free Size"],
    category: "여름"
  },

  // 겨울 카테고리
  {
    id: 22,
    image: image3,
    name: "울 블렌드 코트",
    originalPrice: 120000,
    price: 110000,
    colors: ["#ccc", "Black", "Camel"],
    sizes: ["S", "M", "L"],
    category: "겨울"
  },
  {
    id: 23,
    image: image3,
    name: "롱 패딩",
    originalPrice: 89000,
    price: 79000,
    colors: ["Black", "Navy", "Ivory"],
    sizes: ["S", "M", "L"],
    category: "겨울"
  },
  {
    id: 24,
    image: image3,
    name: "캐시미어 목도리",
    originalPrice: 35000,
    price: 31000,
    colors: ["Gray", "Beige", "Black"],
    sizes: ["Free Size"],
    category: "겨울"
  },
  {
    id: 25,
    image: image3,
    name: "가죽 장갑",
    originalPrice: 18000,
    price: 15000,
    colors: ["Black", "Brown"],
    sizes: ["Free Size"],
    category: "겨울"
  },
  {
    id: 26,
    image: image3,
    name: "니트 크롭 가디건",
    originalPrice: 38000,
    price: 34000,
    colors: ["White", "Pink", "Mint"],
    sizes: ["Free Size"],
    category: "겨울"
  }
];

export default products;