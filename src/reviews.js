const reviews = [
  {
    id: 1,
    nickname: "패셔니스타123",
    rating: 5,
    productOption: "블랙 / M",
    images: [
      "/assets/image1.jpg",
      "/assets/image2.jpg",
      "/assets/image3.jpg",
    ],
    text: "옷이 정말 예뻐요! 핏도 딱 맞고 재질도 좋아서 자주 입을 것 같아요. 특히 디테일이 살아있어서 마음에 듭니다. 배송도 빨랐고 포장도 꼼꼼하게 와서 좋았어요. 다른 색상도 구매하고 싶네요. 완전 만족합니다!",
    adminComment: {
      author: "HAEIN-ADMIN",
      text: "소중한 리뷰 감사합니다! 마음에 드셨다니 저희도 기쁘네요. 앞으로도 좋은 상품으로 보답하겠습니다.",
    },
  },
  {
    id: 2,
    nickname: "쇼핑중독",
    rating: 4,
    productOption: "아이보리 / S",
    images: [
        "/assets/image4.jpg",
        "/assets/image5.jpg",
    ],
    text: "생각했던 것보다 조금 얇긴 한데, 여름에 입기에는 딱 좋을 것 같아요. 색상은 화면이랑 똑같고 디자인도 깔끔해서 어디에나 잘 어울릴 것 같습니다. 다만 마감이 조금 아쉬운 부분이 있었어요. 그래도 전반적으로는 만족합니다. 길게 써볼게요. 이 리뷰는 매우 길어서 더보기가 필요할 것입니다. 이렇게 긴 리뷰를 작성하는 이유는 더보기 기능이 잘 작동하는지 테스트하기 위함입니다. 스크롤 압박을 방지하고 사용자가 원할 때만 전체 내용을 볼 수 있도록 하는 것은 좋은 UX 설계의 기본입니다. 따라서 이 기능은 매우 중요하다고 할 수 있습니다. 마지막 문장입니다.",
    adminComment: null,
  },
  {
    id: 3,
    nickname: "리뷰전문가",
    rating: 3,
    productOption: "네이비 / L",
    images: [
        "/assets/image6.jpg",
    ],
    text: "음... 기대했던 것보다는 별로네요. 사이즈가 좀 애매하게 나온 것 같고, 재질도 생각보다 뻣뻣합니다. 몇 번 세탁하면 괜찮아질지 모르겠네요. 반품할까 하다가 그냥 입으려고요.",
    adminComment: {
      author: "HAEIN-ADMIN",
      text: "고객님, 소중한 의견 감사합니다. 제품에 만족을 드리지 못해 죄송합니다. 남겨주신 의견은 담당 부서에 전달하여 품질 개선에 참고하도록 하겠습니다.",
    },
  },
];

export default reviews;
