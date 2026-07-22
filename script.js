const toast = document.querySelector("[data-toast]");
const modalLayer = document.querySelector("[data-modal-layer]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalTag = document.querySelector("[data-modal-tag]");
const modalDesc = document.querySelector("[data-modal-desc]");
const modalList = document.querySelector("[data-modal-list]");
const modalChips = document.querySelector("[data-modal-chips]");
const floatingMenu = document.querySelector("[data-floating-menu]");
const floatingToggle = document.querySelector("[data-floating-toggle]");
const ideaNoteNode = document.querySelector("[data-idea-note]");

const modalData = {
  profile: {
    tag: "Profile snapshot",
    title: "Nông Đức Mạnh",
    desc: "Một hồ sơ phù hợp với các team cần người đa nhiệm giữa marketing, thiết kế, website và quảng cáo số.",
    bullets: [
      "Khoảng 5 năm kinh nghiệm thực chiến trong thiết kế và marketing.",
      "Có thể tham gia từ khâu lên ý tưởng, sản xuất hình ảnh, quản trị nội dung đến đo lường hiệu quả.",
      "Ưu tiên sản phẩm truyền thông rõ mục tiêu, đẹp, dễ hiểu và có khả năng chuyển đổi."
    ],
    chips: ["Marketing", "Graphic Design", "Website", "Ads", "E-commerce"]
  },
  design: {
    tag: "Design system",
    title: "Graphic Design",
    desc: "Tập trung vào hình ảnh thương hiệu có tính ứng dụng: đẹp, rõ thông điệp, triển khai được trên nhiều kênh.",
    bullets: [
      "Thiết kế banner, poster, standee, catalogue, brochure và social post.",
      "Dựng key visual theo chiến dịch, giữ tính đồng bộ giữa online và offline.",
      "Chỉnh sửa ảnh, dựng thumbnail, xử lý visual cho landing page và quảng cáo."
    ],
    chips: ["Photoshop", "Illustrator", "Social Design", "KV", "Ấn phẩm"]
  },
  social: {
    tag: "Content engine",
    title: "Social Media",
    desc: "Xây dựng nhịp nội dung đều, có chủ đề rõ, bám insight và giữ được giọng thương hiệu.",
    bullets: [
      "Lên kế hoạch nội dung cho Facebook, Instagram, TikTok và YouTube.",
      "Viết caption, đề xuất format, nghiên cứu xu hướng và hành vi khách hàng.",
      "Theo dõi tương tác để điều chỉnh nội dung qua từng giai đoạn."
    ],
    chips: ["Content Plan", "Insight", "Fanpage", "TikTok", "YouTube"]
  },
  web: {
    tag: "Web commerce",
    title: "Website & E-commerce",
    desc: "Kết nối tư duy thiết kế với vận hành bán hàng: sản phẩm rõ, hành trình dễ hiểu, thao tác gọn.",
    bullets: [
      "Quản trị website bán hàng, cập nhật sản phẩm và nội dung.",
      "Thiết kế landing page, tối ưu bố cục, CTA, UI/UX và SEO cơ bản.",
      "Theo dõi hiệu suất website, hỗ trợ khách hàng và xử lý nội dung vận hành."
    ],
    chips: ["Landing Page", "UI/UX", "SEO Basic", "HTML/CSS", "E-commerce"]
  },
  ads: {
    tag: "Performance",
    title: "Digital Advertising",
    desc: "Thiết lập và tối ưu quảng cáo với góc nhìn kết hợp giữa creative, ngân sách và dữ liệu.",
    bullets: [
      "Thiết lập Facebook Ads, Google Ads, remarketing và nhóm chiến dịch cơ bản.",
      "Theo dõi KPI, đọc performance và đề xuất vòng tối ưu tiếp theo.",
      "Kết hợp hình ảnh, thông điệp và landing page để tăng hiệu quả chuyển đổi."
    ],
    chips: ["Meta Ads", "Google Ads", "KPI", "Remarketing", "Conversion"]
  },
  "brand-assets": {
    tag: "Selected output",
    title: "Bộ hình ảnh chiến dịch",
    desc: "Một bộ visual tốt giúp chiến dịch nhìn chuyên nghiệp ngay từ lần chạm đầu tiên.",
    bullets: [
      "Định hướng hình ảnh chính, màu nhấn, style chữ và bố cục lặp lại.",
      "Triển khai banner, poster, standee, social post và hình ảnh website.",
      "Giữ tính nhận diện nhất quán khi chuyển qua nhiều kích thước."
    ],
    chips: ["Key Visual", "Banner", "Poster", "Standee"]
  },
  "content-system": {
    tag: "Selected output",
    title: "Lịch nội dung mạng xã hội",
    desc: "Nội dung tốt cần nhịp đăng rõ, chủ đề có lớp lang và đo được phản ứng của người xem.",
    bullets: [
      "Lập calendar theo tuần/tháng, chia nhóm nội dung theo mục tiêu.",
      "Viết nội dung, đề xuất format visual, theo dõi tương tác.",
      "Điều chỉnh tuyến bài theo xu hướng và dữ liệu thực tế."
    ],
    chips: ["Calendar", "Caption", "Insight", "Trend"]
  },
  "landing-page": {
    tag: "Selected output",
    title: "Landing page bán hàng",
    desc: "Landing page cần làm rõ giá trị, giảm ma sát và đưa người xem tới hành động nhanh hơn.",
    bullets: [
      "Sắp xếp thông tin theo luồng: vấn đề, lợi ích, sản phẩm, bằng chứng, CTA.",
      "Thiết kế hình ảnh, section sản phẩm và nội dung bán hàng.",
      "Tối ưu bố cục để đọc tốt trên cả desktop và mobile."
    ],
    chips: ["UX Flow", "CTA", "Product", "Mobile"]
  },
  "ad-creative": {
    tag: "Selected output",
    title: "Creative cho quảng cáo",
    desc: "Creative quảng cáo cần thu hút nhanh, rõ thông điệp và đủ biến thể để test.",
    bullets: [
      "Thiết kế nhiều hướng visual cho cùng một thông điệp.",
      "Tối ưu thumbnail, headline, layout và điểm nhấn sản phẩm.",
      "Đọc performance để giữ lại hướng hiệu quả và cải thiện vòng sau."
    ],
    chips: ["A/B Test", "Creative", "Headline", "Performance"]
  }
};

const insightData = {
  campaign: {
    title: "Triển khai chiến dịch gọn và rõ",
    text: "Nhận brief, tách mục tiêu, đề xuất hướng nội dung, dựng visual và theo dõi chỉ số để tối ưu qua từng vòng."
  },
  design: {
    title: "Biến ý tưởng thành hình ảnh dùng được",
    text: "Từ social post đến landing page, ưu tiên bố cục rõ, nhận diện ổn định và đủ linh hoạt cho nhiều kích thước."
  },
  growth: {
    title: "Kết nối creative với hiệu quả kinh doanh",
    text: "Không chỉ làm đẹp, mỗi asset đều được nhìn theo mục tiêu tương tác, traffic, chuyển đổi hoặc hỗ trợ bán hàng."
  }
};

const spotlightData = {
  design: "Thiết kế visual rõ thông điệp, đồng bộ từ social post đến landing page và ấn phẩm chiến dịch.",
  content: "Lên mạch nội dung có chủ đề, viết caption gọn, bắt insight và giữ nhịp đăng ổn định cho thương hiệu.",
  web: "Tổ chức landing page, hình ảnh sản phẩm và CTA theo hướng dễ đọc, dễ mua, dễ tối ưu trên nhiều thiết bị.",
  ads: "Kết nối creative với KPI, thử nhiều góc thông điệp và tối ưu theo hiệu quả quảng cáo thực tế."
};

const ideaPrompts = [
  "Làm một mini-series 5 bài: vấn đề, giải pháp, bằng chứng, hậu trường, lời mời hành động.",
  "Tạo 3 biến thể banner cùng thông điệp nhưng khác điểm nhấn: giá trị, cảm xúc, kết quả.",
  "Biến phần FAQ thành nội dung ngắn cho social để kéo traffic về landing page.",
  "Dùng một case nhỏ trước-sau để chứng minh tư duy thiết kế và tối ưu chuyển đổi.",
  "Làm checklist 7 điểm cho landing page bán hàng rồi dùng nó làm bài chia sẻ chuyên môn.",
  "Tạo một bộ thumbnail thống nhất style để fanpage nhìn chuyên nghiệp hơn trong 7 ngày."
];

function getEventTarget(event) {
  return event.target instanceof Element ? event.target : event.target?.parentElement || null;
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

function setIdeaPrompt() {
  if (!ideaNoteNode) return;
  const current = ideaNoteNode.textContent.trim();
  const pool = ideaPrompts.filter((item) => item !== current);
  const prompt = pool[Math.floor(Math.random() * pool.length)] || ideaPrompts[0];
  ideaNoteNode.textContent = prompt;
  showToast("Đã tạo một gợi ý ý tưởng mới");
}

function setSpotlightMode(key) {
  const copy = spotlightData[key];
  if (!copy) return;

  const spotlightCopy = document.querySelector("[data-spotlight-copy]");
  if (spotlightCopy) spotlightCopy.textContent = copy;

  document.querySelectorAll("[data-spotlight-mode]").forEach((button) => {
    const isActive = button.dataset.spotlightMode === key;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
}

function openModal(key) {
  const data = modalData[key];
  if (!data || !modalLayer) return;
  modalTag.textContent = data.tag;
  modalTitle.textContent = data.title;
  modalDesc.textContent = data.desc;
  modalList.textContent = "";
  modalChips.textContent = "";

  data.bullets.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    modalList.appendChild(li);
  });

  data.chips.forEach((item) => {
    const chip = document.createElement("span");
    chip.className = "tag";
    chip.textContent = item;
    modalChips.appendChild(chip);
  });

  modalLayer.classList.add("is-open");
  modalLayer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  const closeButton = modalLayer.querySelector(".modal-close");
  if (closeButton) closeButton.focus({ preventScroll: true });
}

function closeModal() {
  if (!modalLayer) return;
  modalLayer.classList.remove("is-open");
  modalLayer.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

async function copyText(text) {
  let copied = false;
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      copied = true;
    }
  } catch (error) {
    copied = false;
  }

  if (!copied) {
    try {
      const input = document.createElement("textarea");
      input.value = text;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.left = "-9999px";
      document.body.appendChild(input);
      input.select();
      copied = document.execCommand("copy");
      input.remove();
    } catch (error) {
      copied = false;
    }
  }

  showToast(copied ? `Đã copy: ${text}` : `Clipboard bị chặn, nội dung: ${text}`);
}

document.addEventListener("click", (event) => {
  const target = getEventTarget(event);
  if (!target) return;

  const floatToggle = target.closest("[data-floating-toggle]");
  if (floatToggle && floatingMenu) {
    event.preventDefault();
    const isOpen = floatingMenu.classList.toggle("is-open");
    floatToggle.setAttribute("aria-expanded", String(isOpen));
    return;
  }

  const floatingLink = target.closest(".float-menu-panel a");
  if (floatingLink && floatingMenu && floatingToggle) {
    floatingMenu.classList.remove("is-open");
    floatingToggle.setAttribute("aria-expanded", "false");
  } else if (floatingMenu && floatingToggle && !target.closest("[data-floating-menu]")) {
    floatingMenu.classList.remove("is-open");
    floatingToggle.setAttribute("aria-expanded", "false");
  }

  const spotlightMode = target.closest("[data-spotlight-mode]");
  if (spotlightMode) {
    event.preventDefault();
    setSpotlightMode(spotlightMode.dataset.spotlightMode);
    return;
  }

  const modalTrigger = target.closest("[data-modal]");
  if (modalTrigger) {
    event.preventDefault();
    openModal(modalTrigger.dataset.modal);
    return;
  }

  const copyTrigger = target.closest("[data-copy]");
  if (copyTrigger) {
    event.preventDefault();
    copyText(copyTrigger.dataset.copy);
    return;
  }

  if (target.closest("[data-modal-close]")) {
    event.preventDefault();
    closeModal();
    return;
  }

  if (target.closest("[data-idea]")) {
    event.preventDefault();
    setIdeaPrompt();
  }
});

document.addEventListener("keydown", (event) => {
  const target = getEventTarget(event);
  if (event.key === "Escape") {
    closeModal();
    if (floatingMenu && floatingToggle) {
      floatingMenu.classList.remove("is-open");
      floatingToggle.setAttribute("aria-expanded", "false");
    }
  }

  const trigger = target?.closest('[data-modal][role="button"]');
  if (trigger && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    openModal(trigger.dataset.modal);
  }
});

document.querySelectorAll(".insight-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const data = insightData[tab.dataset.insightKey];
    if (!data) return;
    document.querySelectorAll(".insight-tab").forEach((item) => item.classList.toggle("is-active", item === tab));
    const title = document.querySelector("[data-insight-title]");
    const text = document.querySelector("[data-insight-text]");
    if (title) title.textContent = data.title;
    if (text) text.textContent = data.text;
  });
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach((node) => revealObserver.observe(node));

  const sections = [...document.querySelectorAll("main section[id]")];
  const navLinks = [...document.querySelectorAll(".nav-links a, .float-menu-panel a")];
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-42% 0px -48% 0px", threshold: 0 });

  sections.forEach((section) => navObserver.observe(section));
} else {
  document.querySelectorAll(".reveal").forEach((node) => node.classList.add("visible"));
}

setSpotlightMode("design");
