//상품 bo컬러 로드 적용 방법
//bo 컬러 예시.
const boBgColor = "#f2e1cc"; 
const boFontColor = "";
const boBulletColor = "#a58768";
const boGiftFont = "#a58768"

//이벤트 배경색에 따른 검사.
function getContrastTextColor(hex) {
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    // 밝기(YIQ 공식)
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    // 밝으면 검정, 어두우면 흰색
    return yiq >= 128 ? "#000000" : "#FFFFFF";
  }

//텍스트값 있을때는 지정된 텍스트 사용 / 없을때는 배경값에 맞춰 변경.
const finalFontColor = boFontColor || getContrastTextColor(boBgColor);

//메인 배경영역.
document.documentElement.style.setProperty("--bo-main-bg", boBgColor);
//메인 폰트 영역.
document.documentElement.style.setProperty("--bo-main-font", finalFontColor);
//이벤트 불릿 영역.
document.documentElement.style.setProperty("--bo-bullet-bg", boBulletColor);
//이벤트 상품타이틀 영역.
document.documentElement.style.setProperty("--bo-gift-font", boGiftFont);


//sticky 탭 메뉴 변경.
const nav = document.querySelector('.nav_tab');
const tabs = document.querySelectorAll('.nav_tab li');
const sections = document.querySelectorAll('.pmt_section');

//탭클릭 스크롤이벤트.
tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.area;
      const target = document.getElementById(targetId);
      if (target) {
        const y = target.getBoundingClientRect().top + window.pageYOffset - 60; 
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
});
  
// 스크롤 시 active 변경
//sticky -> fixed 변경
const stickyOffset = nav.offsetTop;

window.addEventListener('scroll', () => {
  
    if (window.scrollY >= stickyOffset) {
        nav.classList.add('fixed');
    } else {
        nav.classList.remove('fixed');
    }

    const scrollPos = window.scrollY + 120; 
    sections.forEach((section, index) => {
        if (
        scrollPos >= section.offsetTop &&
        scrollPos < section.offsetTop + section.offsetHeight
        ) {
        tabs.forEach((t, i) => {
            if (i !== index) {
            t.classList.remove('active');
            }
        });
        tabs[index].classList.add('active');
        }
    });
});
  

//pc mo에따라 상품 이미지 변환 작업.
function updateImages() {
    const imgs = document.querySelectorAll("#rcm_swiper .img_box img");
    imgs.forEach(img => {
      const src = img.getAttribute("src");
      // 기본 파일명(확장자 전까지) 추출
      const base = src.replace(/_w\.png|\.png/, "");
      if (window.innerWidth > 768) {
        img.src = base + "_w.png"; // PC 버전
      } else {
        img.src = base + ".png";   // 모바일 버전
      }
    });
}
// 로드 + 리사이즈에 반응
window.addEventListener("load", updateImages);
window.addEventListener("resize", updateImages);  


//전체상품내 그룹상품 영역 온 오프.
// BO 데이터 (가상)
const recommendData = [
    { rcm: "01", show: true },
    { rcm: "02", show: false }
  ];
  
document.addEventListener('DOMContentLoaded', () => {
    const recommendEls = document.querySelectorAll('.inrcm_swiper');

    recommendEls.forEach(el => {
        const rcm = el.dataset.rcm;
        const data = recommendData.find(item => item.rcm === rcm);

        if (data) {
        el.style.display = data.show ? 'block' : 'none';
        }
    });
});
  

//추천상품 상품 슬라이드
var rcmSwiper = new Swiper("#rcm_swiper", {
    breakpoints: {
        // 모바일 (최대 768px)
        0: {
          slidesPerView: 2.5,
          spaceBetween: 16,
        },
        // 윈도우 (768px 이상)
        768: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      },
   
 
  });

//이런상품 어때요? 상품 슬라이드
var inrcmSwiper = new Swiper(".inrcm_swiper", {
    breakpoints: {
        // 모바일 (최대 768px)
        0: {
            slidesPerView: 2.5,
            spaceBetween: 16,
        },
        // 윈도우 (768px 이상)
        768: {
            slidesPerView: 4,
            spaceBetween: 20,
        },
    },
});  

//하단 전체 상품 영역 탭 메뉴 액션.
const allPrdTabs = document.querySelectorAll('.inner_nav .tab');
const allPrdBoxes = document.querySelectorAll('.cate_box');

allPrdTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const cate = tab.dataset.cate;
    // active 토글
    allPrdTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // visible 처리
    allPrdBoxes.forEach(box => {
      box.classList.toggle('visible', box.dataset.cate === cate);
    });
  });
});
