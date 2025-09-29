import React, { useState, useRef } from "react";
import { Share2 } from "lucide-react";

// 이미지 import
import RDGH from "./src/images/RDGH.png";
import RDGQ from "./src/images/RDGQ.png";
import RDVH from "./src/images/RDVH.png";
import RDVQ from "./src/images/RDVQ.png";
import RFGH from "./src/images/RFGH.png";
import RFGQ from "./src/images/RFGQ.png";
import RFVH from "./src/images/RFVH.png";
import RFVQ from "./src/images/RFVQ.png";
import SDGH from "./src/images/SDGH.png";
import SDGQ from "./src/images/SDGQ.png";
import SDVH from "./src/images/SDVH.png";
import SDVQ from "./src/images/SDVQ.png";
import SFGH from "./src/images/SFGH.png";
import SFGQ from "./src/images/SFGQ.png";
import SFVH from "./src/images/SFVH.png";
import SFVQ from "./src/images/SFVQ.png";
import typeGraphBg from "./src/images/type-graph-bg.png";

// 질문 데이터
const questions = [
  // S/R 축 (투자 태도)
  {
    id: 1,
    axis: "SR",
    question: "친구가 요즘 핫한 주식 종목을 추천해줬다! 당신의 반응은?",
    optionA: {
      text: "일단 자세히 알아보고 찾아보고 공부한 뒤에 결정해야겠어.",
      value: "S",
    },
    optionB: {
      text: "뭔가 괜찮아 보이는데? 소액이라도 먼저 사볼까?",
      value: "R",
    },
  },
  {
    id: 2,
    axis: "SR",
    question:
      "주위에서 유명한 주식(ex. 테슬라)이 계속 오르고 있다고 들었을 때, 어떻게 생각할 것인가요?",
    optionA: {
      text: "그 주식이 왜 오르고 있는지, 차트나 뉴스 등을 찾아보고 분석할 필요가 있어.",
      value: "S",
    },
    optionB: {
      text: "주식이 오르고 있으니 나도 지금 당장 사는 게 좋은 것 같아.",
      value: "R",
    },
  },
  {
    id: 3,
    axis: "SR",
    question: "갑자기 주식이 큰 폭으로 오르거나 내렸을 때, 당신은?",
    optionA: {
      text: "갑자기 변동성이 크니까 좀 더 안정될 때까지 기다려야겠어.",
      value: "S",
    },
    optionB: {
      text: "이런 변동성이 기회! 내가 지금 들어가면 더 큰 수익을 낼 수 있을 것 같아",
      value: "R",
    },
  },
  {
    id: 4,
    axis: "SR",
    question: "새로운 직장에 취직할 때, 회사 선택 기준은?",
    optionA: {
      text: "안정적인 회사와 명확한 경로가 있는 곳을 선호해. 일자리가 보장되는 곳이 좋지.",
      value: "S",
    },
    optionB: {
      text: "빠르게 성장할 수 있는 가능성이 있는 작은 회사나 스타트업에서 도전해보고 싶어.",
      value: "R",
    },
  },
  // F/D 축 (분석 스타일)
  {
    id: 5,
    axis: "FD",
    question: "뉴스에서 '이제 AI가 대세다!'라는 기사를 봤을 때 나는?",
    optionA: {
      text: "AI 관련 주식들이 요즘 오르니까 분위기를 살펴본다.",
      value: "F",
    },
    optionB: {
      text: "AI 기업들의 수익성과 성장 가능성을 분석해본다.",
      value: "D",
    },
  },
  {
    id: 6,
    axis: "FD",
    question:
      "새로운 기업중 최근 급성장한 회사가 있다고 주위에서 들었을 때 나는?",
    optionA: {
      text: "그 기업이 시장에서 주목받고 있는 이유를 분석하고, 그 트렌드를 따라가고 싶다.",
      value: "F",
    },
    optionB: {
      text: "그 기업의 재무상태와 성장 가능성을 분석하고, 숫자와 실적을 바탕으로 투자 결정을 내린다.",
      value: "D",
    },
  },
  {
    id: 7,
    axis: "FD",
    question: "최신 기술을 개발한 기업의 소식을 들었을 때, 첫 반응은?",
    optionA: {
      text: "새로운 기술이 뜬다고? 그 시장에 투자할 준비가 되어 있어. 흐름을 놓치지 말아야겠다.",
      value: "F",
    },
    optionB: {
      text: "그 기술이 정말 시장에서 경쟁력을 갖출지, 그 기업의 수익성부터 분석해봐야겠어.",
      value: "D",
    },
  },
  {
    id: 8,
    axis: "FD",
    question: '친구가 "이 영화 진짜 재밌다!"고 추천했을 때, 당신은?',
    optionA: {
      text: "영화의 장르와 사람들이 좋아하는 이유가 궁금하니까 일단 분위기를 파악하려고 리뷰나 트레일러를 확인해볼 거야.",
      value: "F",
    },
    optionB: {
      text: "리뷰나 평가를 봤을 때, 어떤 사람들이 좋다고 했는지 확인하고, 그것이 나에게 맞을지 고민해본다.",
      value: "D",
    },
  },
  // V/G 축 (투자 전략)
  {
    id: 9,
    axis: "VG",
    question: "어떤 회사가 더 매력적으로 보이나요?",
    optionA: { text: "안정적인 실적을 내는 대기업", value: "V" },
    optionB: { text: "새로운 혁신 기술을 가진 스타트업", value: "G" },
  },
  {
    id: 10,
    axis: "VG",
    question:
      "만약 한 회사에 오랫동안 투자할 전략을 세운다면, 어떤 회사에 투자할 것인가요?",
    optionA: {
      text: "오랜 시간 동안 안정적인 수익을 제공할 수 있는 기업에 투자한다.",
      value: "V",
    },
    optionB: {
      text: "앞으로 빠르게 성장할 수 있는 혁신적인 기술을 가진 회사를 찾아 장기적으로 투자한다.",
      value: "G",
    },
  },
  {
    id: 11,
    axis: "VG",
    question: "당신이 선물로 주식을 받는다면?",
    optionA: {
      text: "이자 꼬박꼬박 나오는 우량주! 이런 건 평생 가져가야지.",
      value: "V",
    },
    optionB: {
      text: "지금은 작아도 미래에 대박 날 기업! 성장주가 로망이야!",
      value: "G",
    },
  },
  {
    id: 12,
    axis: "VG",
    question: "여행지 고를 때 어떤 스타일을 선호하는가?",
    optionA: {
      text: "휴양지에서 여유롭게 쉬는 게 최고지! 바다와 함께 힐링하는 걸 좋아해.",
      value: "V",
    },
    optionB: {
      text: "모험이 필요해! 새로운 문화와 활동을 경험할 수 있는 곳을 선호해.",
      value: "G",
    },
  },
  // H/Q 축 (투자 기간)
  {
    id: 13,
    axis: "HQ",
    question: "주식 투자에서 가장 중요하다고 생각하는 것은?",
    optionA: { text: "계획을 세우고 꾸준히 지켜나가는 것", value: "H" },
    optionB: { text: "적절한 타이밍을 잡고 유연하게 대응하는 것", value: "Q" },
  },
  {
    id: 14,
    axis: "HQ",
    question: "주식 투자에서 손실이 발생했을 때, 어떻게 반응할 것인가요?",
    optionA: {
      text: "시장의 변동성을 받아들이고, 장기적인 계획을 계속 유지하며 손실을 복구할 시간을 기다린다.",
      value: "H",
    },
    optionB: {
      text: "손실을 빠르게 커버할 수 있는 다른 기회를 찾아서 유연하게 대응한다.",
      value: "Q",
    },
  },
  {
    id: 15,
    axis: "HQ",
    question: "당신이 생각하는 '성공적인 투자'란?",
    optionA: {
      text: "묻어두고 신경 안 써도 안정적인 수익을 내는 투자!",
      value: "H",
    },
    optionB: {
      text: "빠르게 사고팔면서 최대한의 수익을 뽑아내는 투자!",
      value: "Q",
    },
  },
  {
    id: 16,
    axis: "HQ",
    question: "큰 프로젝트를 진행 할 때 목표 설정을 어떻게 해?",
    optionA: {
      text: "큰 그림을 그리고, 그 목표를 향해 꾸준히 나아가는 편이야. 한 단계씩 밟아가며.",
      value: "H",
    },
    optionB: {
      text: "짧은 기간 안에 결과를 보고 싶은 마음이 커. 빠르게 진행해서 성과를 내는 게 좋아.",
      value: "Q",
    },
  },
];

// 유형별 정보
const mbtiTypes = {
  SDGH: {
    alias: "꼼꼼한 연구자",
    description:
      "안정적이고 철저하게 데이터를 분석하며 장기적인 성장을 추구하는 투자자",
    guide:
      "투자에는 인내가 중요하지만, 너무 오랫동안 기다리기만 하지 마세요. 시장의 상황과 투자한 회사의 상태를 꾸준히 점검하는 것이 필요합니다.",
    books: ["워렌 버핏의 8가지 투자전략과 대한민국 스노우볼 30 (류종현)"],
    websites: ["전자공시시스템", "Investing.com 한국어 국내 증시", "ValueWalk"],
    image: SDGH,
  },
  SDGQ: {
    alias: "현실적인 기회포착가",
    description:
      "데이터를 분석하고, 빠르게 성장하는 주식을 단기적으로 매매하는 투자자",
    guide:
      "빠르게 변하는 상황에서 기회를 잡고자 할 때, 자신감을 가지되 조급함을 피해야 합니다. 확신이 서지 않는다면 서두르지 마세요.",
    books: ["벤처캐피탈 및 사모펀드 투자유치 바이블 (이명준)"],
    websites: ["한국거래소", "Investing.com 한국어 국내 증시", "Seeking Alpha"],
    image: SDGQ,
  },
  SDVH: {
    alias: "거북이 연구원",
    description:
      "안정적인 주식에 대해 깊은 분석을 하고 장기적인 성장을 추구하는 투자자",
    guide:
      "단기적인 변화에 너무 신경 쓰지 마세요. 꾸준히 장기적인 관점에서 바라보며, 급하게 결정을 내리지 않도록 마음을 다잡으세요.",
    books: ["주식 투자의 정석 (스타키안)"],
    websites: [
      "전자공시시스템",
      "Investing.com 한국어 국내 증시",
      "Seeking Alpha",
    ],
    image: SDVH,
  },
  SDVQ: {
    alias: "숫자 요술사",
    description:
      "숫자와 재무 데이터를 바탕으로 단기적으로 가치주를 매매하는 투자자",
    guide:
      "모든 정보가 중요하지만, 때로는 너무 많은 정보가 혼란을 줄 수 있습니다. 중요한 사실을 중심으로 차분하게 판단하세요.",
    books: ["주식시장의 마법사들 (잭 슈웨거)"],
    websites: ["한국거래소", "Investing.com 한국어 국내 증시", "ValueWalk"],
    image: SDVQ,
  },
  SFGH: {
    alias: "우직한 성장 농부",
    description:
      "시장의 흐름을 따라 안정적이고 지속 가능한 성장에 투자하는 투자자",
    guide:
      "길게 보고 투자를 계획하는 것은 좋은 전략입니다. 하지만 그 과정에서 너무 고집스럽지 않도록 유연성을 가지고 변화에 대응하는 것이 필요합니다.",
    books: ["월급쟁이 부자로 은퇴하기 (너나위)"],
    websites: ["TradingView Korea", "네이버페이 증권", "Finimize"],
    image: SFGH,
  },
  SFGQ: {
    alias: "순간을 노리는 헌터",
    description:
      "시장의 흐름을 읽고 빠르게 성장하는 주식을 단기적으로 매매하는 투자자",
    guide:
      "급하게 결정을 내리거나 자주 바꾸는 것보다는 자신에게 확신이 들 때까지 신중하게 선택하세요.",
    books: ["주식투자 무작정 따라하기 (윤재수)"],
    websites: ["TradingView Korea", "네이버페이 증권", "Forbes MarketSnacks"],
    image: SFGQ,
  },
  SFVH: {
    alias: "안정적인 항해자",
    description:
      "시장 흐름에 따라 안정적이고 저평가된 주식을 장기적으로 보유하는 투자자",
    guide:
      "투자에 있어서 안정성을 중시하는 것은 좋지만, 변화에 둔감해지지 않도록 주의하세요. 꾸준히 상황을 살피며 올바른 방향을 잡는 것이 중요합니다.",
    books: ["돈 좀 굴려봅시다 (홍춘욱)"],
    websites: ["FnGuide", "씽크풀 AI정보분석", "Finimize"],
    image: SFVH,
  },
  SFVQ: {
    alias: "과감한 플레이어",
    description:
      "시장 흐름을 빠르게 파악하고 가치주를 단기적으로 매매하는 투자자",
    guide:
      "빠르게 결정을 내리는 것이 때로는 필요하지만, 지나치게 큰 위험을 감수하지 않도록 마음을 다잡고 항상 계획을 세워야 합니다.",
    books: ["존리의 부자되기 습관 (존리)"],
    websites: ["FnGuide", "씽크풀 AI정보분석", "The Daily Upside"],
    image: SFVQ,
  },
  RDGH: {
    alias: "미래의 유니콘 찾는 자",
    description:
      "높은 성장 가능성이 있는 주식을 철저히 분석하고 장기적으로 보유하는 투자자",
    guide:
      "장기 투자라고 해서 무작정 기다리기만 하면 안 됩니다. 지속적으로 기업의 실적과 시장 환경을 점검하세요.",
    books: ["워렌 버핏의 완벽 투자기법 (로버트 해그스트롬)"],
    websites: ["전자공시시스템", "Investing.com 한국어 국내 증시", "ValueWalk"],
    image: RDGH,
  },
  RDGQ: {
    alias: "숨은 보석 감별사",
    description:
      "데이터를 분석하고 빠르게 성장할 주식을 단기적으로 매매하는 투자자",
    guide:
      "단기 매매에 집중하다 보면 조급함이 생길 수 있습니다. 확신이 서지 않는다면 과도한 거래를 피하세요.",
    books: ["100배 주식 (크리스토퍼 마이어)"],
    websites: ["한국거래소", "Investing.com 한국어 국내 증시", "Seeking Alpha"],
    image: RDGQ,
  },
  RDVH: {
    alias: "인내심 강한 포식자",
    description:
      "높은 리스크를 감수하고 저평가된 주식을 장기적으로 보유하는 투자자",
    guide:
      "저평가된 주식이 언제나 좋은 투자 대상은 아닙니다. 시장의 변화를 무시하지 말고, 잘못된 판단은 과감히 수정하세요.",
    books: ["현명한 투자자 (벤저민 그레이엄)"],
    websites: [
      "전자공시시스템",
      "Investing.com 한국어 국내 증시",
      "Seeking Alpha",
    ],
    image: RDVH,
  },
  RDVQ: {
    alias: "변화의 춤꾼",
    description: "변동성이 큰 주식을 분석하여 단기적으로 투자하는 투자자",
    guide:
      "높은 변동성을 활용하는 전략은 강한 멘탈이 필요합니다. 손실을 빠르게 인정할 수 있는 냉철한 판단력을 유지하세요.",
    books: ["도박꾼이 아니라 트레이더가 되어라 (앤드루 아지즈)"],
    websites: ["한국거래소", "Investing.com 한국어 국내 증시", "ValueWalk"],
    image: RDVQ,
  },
  RFGH: {
    alias: "미래를 향한 개척자",
    description: "시장 흐름을 분석하고 혁신적인 기업에 장기 투자하는 투자자",
    guide:
      "너무 이상적인 미래를 좇다가 현실을 놓칠 수 있습니다. 혁신적인 기업이라도 현재 실적과 재무 건전성을 고려하세요.",
    books: ["제로 투 원 (피터 틸, 블레이크 매스터스)"],
    websites: ["FnGuide", "네이버페이 증권", "Finimize"],
    image: RFGH,
  },
  RFGQ: {
    alias: "변화의 선두주자",
    description:
      "빠르게 성장할 주식을 시장 흐름을 따라 단기적으로 매매하는 투자자",
    guide:
      "빠른 매매를 반복하다 보면 감정적인 선택을 하게 될 수 있습니다. 확실한 매매 기준을 세우고 충동적 결정을 피하세요.",
    books: ["슈퍼 트레이더 (반K. 타프)"],
    websites: ["FnGuide", "네이버페이 증권", "Forbes MarketSnacks"],
    image: RFGQ,
  },
  RFVH: {
    alias: "혁신 사냥꾼",
    description:
      "시장 흐름을 분석하여 혁신적인 기업을 장기적으로 보유하는 투자자",
    guide:
      "혁신적인 기업이라고 해서 모두 성공하는 것은 아닙니다. 시장의 흐름을 객관적으로 분석하고 맹목적인 확신을 경계하세요.",
    books: ["변화하는 세계 질서 (레이 달리오)"],
    websites: ["어피티", "씽크풀 AI정보분석", "Forbes"],
    image: RFVH,
  },
  RFVQ: {
    alias: "변동 추적자",
    description: "변동성이 큰 가치주를 빠르게 매매하는 투자자",
    guide:
      "변동성을 이용한 투자 전략은 위험이 큽니다. 타이밍을 놓쳤을 때 과한 리스크를 감수하지 않도록 손절 기준을 확실히 정하세요.",
    books: ["투자의 모험 (스티븐 슈워츠먼)"],
    websites: ["TradingView Korea", "씽크풀 AI정보분석", "The Daily Upside"],
    image: RFVQ,
  },
};

const InvestmentMBTITest = () => {
  const [stage, setStage] = useState("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);

  const calculateMBTI = (answerList) => {
    const counts = {
      S: 0,
      R: 0,
      D: 0,
      F: 0,
      V: 0,
      G: 0,
      H: 0,
      Q: 0,
    };

    answerList.forEach((answer) => {
      counts[answer]++;
    });

    const sr = counts.R >= 3 ? "R" : "S";
    const df = counts.F >= 3 ? "F" : "D";
    const vg = counts.G >= 3 ? "G" : "V";
    const hq = counts.Q >= 3 ? "Q" : "H";

    return sr + df + vg + hq;
  };

  const handleShare = async () => {
    const typeInfo = mbtiTypes[result];
    const shareText = `나의 투자 유형은 "${typeInfo.alias}" (${result})입니다!\n\n${typeInfo.guide}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "투자 성향 테스트 결과",
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          copyToClipboard(shareText);
        }
      }
    } else {
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("결과가 클립보드에 복사되었습니다!");
      })
      .catch(() => {
        alert("복사에 실패했습니다.");
      });
  };

  const handleSaveImage = () => {
    alert(
      "결과 화면을 스크린샷으로 저장해주세요!\n\n• PC: Print Screen 또는 화면 캡처 도구\n• Mac: Cmd + Shift + 4\n• 모바일: 기기별 스크린샷 기능 사용"
    );
  };

  const handleAnswer = (value) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const mbtiResult = calculateMBTI(newAnswers);
      setResult(mbtiResult);
      setStage("result");
    }
  };

  const restartTest = () => {
    setStage("intro");
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  const startTest = () => {
    setStage("test");
  };

  if (stage === "intro") {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#003340",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          color: "#FFFFFF",
        }}
      >
        <div
          style={{
            maxWidth: "600px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "36px",
              fontWeight: "700",
              marginBottom: "20px",
              color: "#6EE69E",
            }}
          >
            투자 성향 테스트
          </h1>
          <p
            style={{
              fontSize: "18px",
              marginBottom: "40px",
              lineHeight: "1.6",
              color: "#D4DDEF",
            }}
          >
            당신의 투자 유형을 알아보세요.
            <br />
            16가지 투자자 유형 중 나는 어떤 유형일까요?
          </p>
          <button
            onClick={startTest}
            style={{
              backgroundColor: "#6EE69E",
              color: "#003340",
              border: "none",
              borderRadius: "15px",
              padding: "15px 40px",
              fontSize: "18px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            테스트 시작하기
          </button>
        </div>
      </div>
    );
  }

  if (stage === "test") {
    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#003340",
          padding: "20px",
          color: "#FFFFFF",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            paddingTop: "60px",
          }}
        >
          <div style={{ marginBottom: "30px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "8px",
              }}
            >
              <span style={{ fontSize: "16px", color: "#FFFFFF" }}>
                {currentQuestion + 1} / {questions.length}
              </span>
            </div>
            <div
              style={{
                height: "8px",
                backgroundColor: "rgba(212, 221, 239, 0.2)",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  backgroundColor: "#6EE69E",
                  borderRadius: "4px",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>

          <div
            style={{
              marginTop: "60px",
              marginBottom: "60px",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "600",
                lineHeight: "1.5",
                color: "#FFFFFF",
                margin: "0",
              }}
            >
              {question.question}
            </h2>
          </div>

          <div style={{ marginTop: "30px" }}>
            <button
              onClick={() => handleAnswer(question.optionA.value)}
              style={{
                width: "100%",
                backgroundColor: "rgba(212, 221, 239, 0.4)",
                border: "none",
                borderRadius: "15px",
                padding: "20px",
                marginBottom: "15px",
                cursor: "pointer",
                transition: "all 0.3s",
                textAlign: "left",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "rgba(212, 221, 239, 0.6)";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "rgba(212, 221, 239, 0.4)";
                e.target.style.transform = "translateY(0)";
              }}
            >
              <span
                style={{
                  color: "#FFFFFF",
                  fontSize: "16px",
                  lineHeight: "1.5",
                }}
              >
                A. {question.optionA.text}
              </span>
            </button>

            <button
              onClick={() => handleAnswer(question.optionB.value)}
              style={{
                width: "100%",
                backgroundColor: "rgba(212, 221, 239, 0.4)",
                border: "none",
                borderRadius: "15px",
                padding: "20px",
                cursor: "pointer",
                transition: "all 0.3s",
                textAlign: "left",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "rgba(212, 221, 239, 0.6)";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "rgba(212, 221, 239, 0.4)";
                e.target.style.transform = "translateY(0)";
              }}
            >
              <span
                style={{
                  color: "#FFFFFF",
                  fontSize: "16px",
                  lineHeight: "1.5",
                }}
              >
                B. {question.optionB.text}
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (stage === "result" && result) {
    const typeInfo = mbtiTypes[result];

    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#003340",
          color: "#FFFFFF",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "60px 20px 20px 20px",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <button
            onClick={restartTest}
            style={{
              background: "none",
              border: "none",
              color: "#FFFFFF",
              fontSize: "24px",
              cursor: "pointer",
              padding: "8px",
            }}
          >
            ←
          </button>
          <h1
            style={{
              fontSize: "18px",
              fontWeight: "600",
              margin: 0,
            }}
          >
            나의 투자 유형
          </h1>
          <button
            onClick={handleShare}
            style={{
              background: "none",
              border: "none",
              color: "#FFFFFF",
              cursor: "pointer",
              padding: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Share2 size={24} />
          </button>
        </div>

        <div
          ref={resultRef}
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(212, 221, 239, 0.2)",
              borderRadius: "20px",
              padding: "30px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "inline-block",
                backgroundColor: "#6EE69E",
                padding: "10px 20px",
                borderRadius: "20px",
                marginBottom: "20px",
              }}
            >
              <span
                style={{
                  color: "#003340",
                  fontSize: "18px",
                  fontWeight: "700",
                }}
              >
                {result}
              </span>
            </div>

            <p
              style={{
                fontSize: "16px",
                color: "#FFFFFF",
                marginBottom: "10px",
              }}
            >
              당신의 투자 유형은
            </p>
            <h2
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: "#FFFFFF",
                marginBottom: "30px",
              }}
            >
              {typeInfo.alias}
            </h2>

            <div
              style={{
                width: "100%",
                maxWidth: "300px",
                margin: "0 auto 30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={typeInfo.image}
                alt={typeInfo.alias}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>

            <div
              style={{
                width: "100%",
                marginBottom: "30px",
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
              <img
                src={typeGraphBg}
                alt="투자 유형 척도"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            </div>

            <div
              style={{
                textAlign: "left",
                marginTop: "30px",
                paddingTop: "20px",
                borderTop: "1px solid rgba(212, 221, 239, 0.3)",
              }}
            >
              <h3
                style={{
                  color: "#6EE69E",
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginBottom: "15px",
                }}
              >
                당신을 위한 조언
              </h3>
              <p
                style={{
                  color: "#FFFFFF",
                  fontSize: "16px",
                  lineHeight: "1.6",
                  marginBottom: "20px",
                }}
              >
                {typeInfo.guide}
              </p>
            </div>

            {typeInfo.books && typeInfo.books.length > 0 && (
              <div
                style={{
                  textAlign: "left",
                  marginTop: "20px",
                  paddingTop: "20px",
                  borderTop: "1px solid rgba(212, 221, 239, 0.3)",
                }}
              >
                <h3
                  style={{
                    color: "#6EE69E",
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "15px",
                  }}
                >
                  추천 도서
                </h3>
                {typeInfo.books.map((book, index) => (
                  <p
                    key={index}
                    style={{
                      color: "#FFFFFF",
                      fontSize: "15px",
                      lineHeight: "1.5",
                      marginBottom: "8px",
                    }}
                  >
                    • {book}
                  </p>
                ))}
              </div>
            )}

            {typeInfo.websites && typeInfo.websites.length > 0 && (
              <div
                style={{
                  textAlign: "left",
                  marginTop: "20px",
                  paddingTop: "20px",
                  borderTop: "1px solid rgba(212, 221, 239, 0.3)",
                }}
              >
                <h3
                  style={{
                    color: "#6EE69E",
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "15px",
                  }}
                >
                  추천 웹사이트
                </h3>
                {typeInfo.websites.map((website, index) => (
                  <p
                    key={index}
                    style={{
                      color: "#FFFFFF",
                      fontSize: "15px",
                      lineHeight: "1.5",
                      marginBottom: "8px",
                    }}
                  >
                    • {website}
                  </p>
                ))}
              </div>
            )}
          </div>

          <div style={{ marginTop: "30px", marginBottom: "50px" }}>
            <button
              onClick={handleSaveImage}
              style={{
                width: "100%",
                backgroundColor: "#6EE69E",
                color: "#003340",
                border: "none",
                borderRadius: "15px",
                padding: "15px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s",
                marginBottom: "10px",
              }}
              onMouseEnter={(e) =>
                (e.target.style.transform = "translateY(-2px)")
              }
              onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
            >
              📸 결과 저장하기
            </button>
            <button
              onClick={restartTest}
              style={{
                width: "100%",
                backgroundColor: "#F074BA",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "15px",
                padding: "15px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.target.style.transform = "translateY(-2px)")
              }
              onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
            >
              다시 검사하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default InvestmentMBTITest;
