/**
 * ============================================================
 *  SHOHEL OS — PORTFOLIO CONTENT (DEFAULTS)
 * ============================================================
 *  এই ফাইল হলো তোমার ওয়েবসাইটের "ফ্যাক্টরি ডিফল্ট"।
 *
 *  IMPORTANT — এখন তুমি দুইভাবে এডিট করতে পারবে:
 *
 *  ১) সরাসরি ওয়েবসাইটে গিয়ে Edit Mode চালু করে (taskbar-এর ডান
 *     পাশের পেন্সিল আইকনে ক্লিক করে) — তখন প্রতিটা লেখা এবং ছবিতে
 *     ক্লিক করে সরাসরি বদলাতে পারবে, ব্রাউজারেই সেভ হয়ে থাকবে।
 *     (এটাকে বলে browser localStorage — শুধু ঐ ব্রাউজার/ডিভাইসে থাকে)
 *
 *  ২) এই ফাইল সরাসরি এডিট করে — এটা "ডিফল্ট" মান, Edit Mode থেকে
 *     Reset করলে এখানে যা লেখা আছে সেটাই আবার ফিরে আসবে। তাই
 *     স্থায়ীভাবে কিছু বদলাতে চাইলে এখানেও changes রাখা ভালো।
 *
 *  Edit Mode থেকে "Export Backup" চাপলে একটা .json ফাইল ডাউনলোড
 *  হবে — সেটা সংরক্ষণ করে রাখো, অন্য ব্রাউজার/ডিভাইসে "Import
 *  Backup" দিয়ে আবার লোড করতে পারবে।
 * ============================================================
 */

const PORTFOLIO_DATA = {

  wallpaper: "",

  identity: {
    name: "Shohel Rana",
    fullName: "Shohel Rana",
    role: "Project Manager & Customer Experience Professional",
    osName: "ShohelOS",
    tagline: "Dedicated Operations & Customer Experience professional — 4+ years leading teams, tracking systems, and solving problems with data.",
    location: "Monirampur, Jashore, Bangladesh",
    avatarInitial: "SR",
    photo: "assets/gallery/shohel-profile.jpg",
  },

  about: {
    heading: "About Me",
    paragraphs: [
      "আমি Shohel Rana — একজন Project Manager ও Customer Experience Professional, ৪+ বছরের অভিজ্ঞতা নিয়ে অপারেশনস, লজিস্টিকস ট্র্যাকিং, টিম ম্যানেজমেন্ট আর ডেটা অ্যানালাইসিসে কাজ করছি।",
      "বর্তমানে Sheba.xyz-এ Junior Voice of Customer (VOC) Executive হিসেবে কর্মরত। এর আগে Chaldal.com-এ WFP প্রজেক্টে Distribution Center Manager এবং Tracking Associate & Deputy Team Leader (Operations) হিসেবে দায়িত্ব পালন করেছি।",
      "পেশাগত কাজের পাশাপাশি independent Android developer হিসেবে Firebase আর Java/XML দিয়ে বাংলাদেশের ছোট ব্যবসার জন্য বাস্তব সমস্যার সমাধান তৈরি করি — সেগুলো Projects সেকশনে দেখতে পাবে।",
    ],
    highlights: [
      { label: "Current Role", value: "Junior VOC Executive, Sheba.xyz" },
      { label: "Experience", value: "4+ years in Operations & CX" },
      { label: "Core Strength", value: "Logistics Tracking · Team Leadership · Data Analysis" },
    ],
  },

  skills: {
    heading: "Skills",
    groups: [
      {
        title: "Customer Experience & Operations",
        items: ["Customer Experience (VOC)", "Stakeholder Management", "Operations Management", "Process Improvement", "Complaint Resolution", "Reporting & KPI Tracking", "Team Leadership"],
      },
      {
        title: "Data & Reporting",
        items: ["SQL", "Data Analysis & Reporting", "Google Sheets", "Excel (Expert)", "Power BI"],
      },
      {
        title: "Android Development",
        items: ["Java", "Android XML/UI", "Firebase Firestore & Auth", "Google Sign-In", "ValueAnimator / Custom Animations", "Repository & ViewModel Patterns"],
      },
      {
        title: "Automation & Hardware",
        items: ["Google Apps Script", "Webhook Integration", "Telegram Bot API", "Apache POI (Excel parsing)", "ESP32", "Arduino"],
      },
      {
        title: "Languages",
        items: ["Bengali — Native", "English — Proficient"],
      },
    ],
  },

  experience: {
    heading: "Experience",
    items: [
      {
        role: "Junior Voice of Customer (VOC) Executive",
        org: "Sheba.xyz",
        period: "September 2025 – Present",
        description: "গ্রাহকদের ফিডব্যাক (VOC) সংগ্রহ, বিশ্লেষণ ও রিপোর্ট তৈরি। সার্ভিস কোয়ালিটি ও গ্রাহক সন্তুষ্টি বাড়াতে ইন্টারনাল টিমের সাথে কাজ করা, অভিযোগ তদন্ত ও সমাধান, এবং সার্ভিস প্রসেসের ব্যত্যয় চিহ্নিত করে উন্নয়নের সুপারিশ প্রদান।",
      },
      {
        role: "Distribution Center Manager – WFP Project",
        org: "Chaldal.com",
        period: "December 2023 – June 2025",
        description: "সম্পূর্ণ ডিস্ট্রিবিউশন সেন্টার অপারেশন পরিকল্পনা ও পরিচালনা। টিম নেতৃত্ব, শিফট প্ল্যানিং ও পারফরম্যান্স মনিটরিং। ইনভেন্টরি কন্ট্রোল ও স্টক অ্যাকুরেসি নিশ্চিতকরণ। প্রজেক্ট KPI ও SOP মেনে অপারেশনাল দক্ষতা বৃদ্ধিতে উদ্যোগ গ্রহণ।",
      },
      {
        role: "Tracking Associate & Deputy Team Leader (Operations)",
        org: "Chaldal.com",
        period: "January 2022 – December 2023",
        description: "ট্র্যাকিং টিম পরিচালনা ও রিয়েল-টাইম লজিস্টিক সাপোর্ট প্রদান। ডেলিভারি অপারেশন মনিটরিং ও দ্রুত সমস্যা সমাধান। ট্র্যাকিং কন্ট্রোল রুম রিপোর্ট প্রস্তুত ও ফলো-আপ। ডেটা অ্যানালাইসিসের মাধ্যমে অপারেশনাল পারফরম্যান্স উন্নয়নে সহায়তা।",
      },
      {
        role: "Telesales Associate",
        org: "Chaldal.com",
        period: "March 2021 – January 2022",
        description: "প্রোডাক্ট ও সার্ভিস প্রমোশনে গ্রাহকদের সাথে পেশাদার যোগাযোগ। বরাদ্দকৃত সেলস টার্গেট অর্জন ও শক্তিশালী গ্রাহক সম্পর্ক বজায় রাখা। গ্রাহকের চাহিদা বুঝে যথাযথ সমাধান ও ফলো-আপ প্রদান।",
      },
    ],
    achievements: [
      "Operational Excellence: Chaldal.com-এ অপারেশনাল ত্রুটি কমিয়ে রিয়েল-টাইম ডেলিভারি ট্র্যাকিং উন্নত করেছি।",
      "Successful Project Management: WFP প্রজেক্টে DC Manager হিসেবে ইনভেন্টরি ও স্টক অ্যাকুরেসি পরিচালনা করেছি।",
      "Team Leadership: ট্র্যাকিং টিম নেতৃত্ব দিয়ে ডেটা অ্যানালাইসিসের মাধ্যমে পারফরম্যান্স উন্নত করেছি।",
      "Customer Insights: Sheba.xyz-এ VOC ফিডব্যাক বিশ্লেষণ করে সার্ভিস উন্নয়নের সুপারিশ দিয়েছি।",
    ],
  },

  education: {
    heading: "Education",
    items: [
      {
        degree: "MSS in Political Science",
        institute: "National University · Jashore Govt. M.M. College",
        period: "2020",
        note: "",
      },
      {
        degree: "BSS in Political Science",
        institute: "National University · Dr Abdur Razzak Municipal College",
        period: "2019",
        note: "",
      },
      {
        degree: "HSC (Humanities)",
        institute: "",
        period: "2015",
        note: "",
      },
      {
        degree: "SSC (Science)",
        institute: "",
        period: "2013",
        note: "",
      },
    ],
  },

  projects: {
    heading: "Projects",
    items: [
      {
        title: "Attendo",
        subtitle: "Android Attendance Management SaaS",
        description: "বাংলাদেশের ছোট ও মাঝারি ব্যবসার জন্য তৈরি attendance management অ্যাপ। Role-based routing (admin/employee), Firebase Firestore security rules, আর একটি সম্পূর্ণ Duty Roster সিস্টেম — যেখানে Excel টেমপ্লেট ডাউনলোড, বাল্ক আপলোড (Apache POI) ও ম্যানুয়াল এডিট সাপোর্ট করে।",
        tags: ["Android", "Java", "Firebase", "Apache POI"],
        link: "",
      },
      {
        title: "Geofenced Team Attendance",
        subtitle: "Google Apps Script Web App",
        description: "অফিসের ২০০ মিটার radius geofence অনুযায়ী চেক-ইন/চেক-আউট, Gmail ভিত্তিক authentication, এবং ডুপ্লিকেট প্রতিরোধ সহ একটি সম্পূর্ণ ওয়েব-ভিত্তিক attendance সিস্টেম।",
        tags: ["Google Apps Script", "Geofencing", "Google Sheets"],
        link: "",
      },
      {
        title: "লেনদেন খাতা (Transaction Ledger)",
        subtitle: "Offline-first PWA",
        description: "ছোট ব্যবসার ধার-দেনা হিসাব রাখার জন্য একটি Progressive Web App। IndexedDB দিয়ে অফলাইন স্টোরেজ, Google Sheets sync, আর SMS টেমপ্লেট সাপোর্ট করে।",
        tags: ["PWA", "IndexedDB", "Google Apps Script"],
        link: "",
      },
      {
        title: "Duty Tracker + Telegram Bot",
        subtitle: "Google Apps Script + Telegram Integration",
        description: "লগইন/লগআউট ট্রিগারড অটো-রিমাইন্ডার সহ workplace duty tracking সিস্টেম, ওয়েবহুক ইন্টিগ্রেশন ও টাইমজোন হ্যান্ডলিং (Asia/Dhaka) সহ।",
        tags: ["Telegram Bot API", "Apps Script", "Webhooks"],
        link: "",
      },
    ],
  },

  pictures: {
    heading: "Pictures",
    items: [
      { src: "assets/gallery/shohel-profile.jpg", caption: "Profile photo" },
      { src: "", caption: "আরও ছবি যোগ করতে Edit Mode ব্যবহার করো" },
      { src: "", caption: "আরেকটি ছবি" },
    ],
  },

  files: {
    heading: "Files",
    items: [
      { name: "Shohel_Rana_Resume.pdf", description: "সম্পূর্ণ Resume / CV", href: "assets/files/Shohel_Rana_Resume.pdf" },
    ],
  },

  contact: {
    heading: "Contact",
    email: "shohelrana2410@gmail.com",
    phone: "+8801851738103",
    location: "Monirampur, Jashore, Bangladesh",
    socials: [
      { label: "LinkedIn", href: "https://linkedin.com/in/shohel-rana-303b89211" },
    ],
  },
};
