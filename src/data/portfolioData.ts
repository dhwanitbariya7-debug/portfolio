export type SkillCategory = 'engineering' | 'ai' | 'communication';

export interface SkillDomain {
  id: string;
  name: string;
  category: SkillCategory;
  categoryLabel: string;
  stage: string;
  evidenceTitle: string;
  evidenceDetail: string;
  keyTopics: string[];
  focusWeight: number; // relative visual bar width (0-100) representing study focus share, not a fake score
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  programNote?: string;
  category: 'ai' | 'communication';
  categoryLabel: string;
  completedDate: string;
  completedTimeUtc: string;
  durationOrCredits: string;
  skillsCovered: string[];
  certificateId: string;
  providerId?: string;
  activityNumber?: string;
  signatory: string;
  pdfPath: string;
  fileName: string;
}

export interface TimelineMilestone {
  id: string;
  dateLabel: string;
  phase: 'Completed' | 'In Progress' | 'Planned';
  title: string;
  domain: string;
  summary: string;
  artifact: string;
}

export const PROFILE = {
  name: 'Dhwanit Bariya',
  role: 'First-Year Undergraduate · CSE with AI & ML',
  university: 'Karnavati University',
  academicYear: 'First Year (Year 1)',
  degree: 'B.Tech in Computer Science & Engineering (AI & ML)',
  linkedinUrl: 'https://www.linkedin.com/in/dhwanit-bariya-961a87326',
  linkedinDisplay: 'linkedin.com/in/dhwanit-bariya-961a87326',
  photoPath: './assets/aistudio/WhatsApp_Image_2026-11-22_at_12.47.25_PM_db4fda04.jpeg',
  headline: 'Building from C logic and microcontrollers toward intelligent systems.',
  subheadline:
    'First-year Computer Science & Engineering (AI & ML) student at Karnavati University, grounding early machine learning curiosity in structured C programming, hands-on Arduino prototyping, and clear technical communication.',
  aboutParagraphs: [
    'I am Dhwanit Bariya, a first-year Computer Science & Engineering student specializing in Artificial Intelligence and Machine Learning at Karnavati University. I believe strong AI engineers start by understanding how machines execute instructions from the ground up — which is why I focus on writing clear, structured C code and translating logic into physical electronics with Arduino.',
    'Alongside my first-year coursework and my hardware prototype Morse Buddy, I actively invest in both conceptual AI foundations and human-centered team skills. Through certified coursework in Thinking Machines and constructive leadership feedback, I aim to grow into an engineer who can design dependable systems and collaborate thoughtfully across technical teams.',
  ],
};

export const KPI_METRICS = [
  {
    id: 'standing',
    value: 'Year 1',
    label: 'Academic Standing',
    context: 'CSE with AI & ML · Karnavati University',
  },
  {
    id: 'credentials',
    value: '3',
    label: 'Verified Certificates',
    context: 'LinkedIn Learning & PMI® REP (Nov 2026)',
  },
  {
    id: 'runtime',
    value: '2h 57m',
    label: 'Certified Coursework',
    context: 'Plus 1.25 PMI® Contact Hours / PDUs',
  },
  {
    id: 'hardware',
    value: '1',
    label: 'Hardware Build',
    context: 'Morse Buddy · Arduino, OLED & C',
  },
];

export const SKILL_DOMAINS: SkillDomain[] = [
  {
    id: 'c-lang',
    name: 'C Programming Language',
    category: 'engineering',
    categoryLabel: 'Core Systems',
    stage: 'Foundational Proficiency',
    evidenceTitle: 'First-Year CSE Coursework & Embedded Firmware',
    evidenceDetail:
      'Procedural problem solving, control flow, arrays, functions, and structured logic applied both in academic labs and Arduino sketches.',
    keyTopics: ['Control Flow & Loops', 'Functions & Arrays', 'String & Character Mapping', 'Structured Logic'],
    focusWeight: 88,
  },
  {
    id: 'arduino-hw',
    name: 'Arduino & Embedded Prototyping',
    category: 'engineering',
    categoryLabel: 'Hardware Build',
    stage: 'Project-Applied',
    evidenceTitle: 'Morse Buddy — OLED Hardware Console (Learn + Sound, Practice & Quiz)',
    evidenceDetail:
      'Built a standalone matte-black Arduino Morse Code console with a 0.96" I2C OLED display (SSD1306), four tactile buttons (MORSE, SEL, MNU, BCK), and dual Red/Green feedback LEDs.',
    keyTopics: ['I2C OLED (SSD1306)', 'Learn + Sound · Practice · Quiz', 'Red & Green Feedback LEDs', 'MORSE / SEL / MNU / BCK Deck'],
    focusWeight: 84,
  },
  {
    id: 'ai-foundations',
    name: 'AI & Thinking Machines Foundations',
    category: 'ai',
    categoryLabel: 'AI & ML Track',
    stage: 'Certified Foundation',
    evidenceTitle: 'LinkedIn Learning — Artificial Intelligence Foundations: Thinking Machines',
    evidenceDetail:
      'Completed formal conceptual grounding in how modern artificial intelligence and machine learning models reason, learn from data, and frame real-world tasks.',
    keyTopics: ['Artificial Intelligence (AI)', 'Machine Learning Concepts', 'AI Foundations', 'Problem Framing'],
    focusWeight: 78,
  },
  {
    id: 'communication',
    name: 'Communication & Constructive Feedback',
    category: 'communication',
    categoryLabel: 'Leadership & Teamwork',
    stage: 'PMI®-Credited',
    evidenceTitle: 'Leadership through Feedback (LinkedIn Learning & PMI® REP)',
    evidenceDetail:
      'Earned 1.25 PMI® PDUs and LinkedIn Learning completion focused on giving and receiving actionable, respectful feedback during team collaborations.',
    keyTopics: ['Constructive Feedback', 'Active Listening', 'Clear Team Communication', 'Peer Collaboration'],
    focusWeight: 85,
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'ai-thinking-machines',
    title: 'Artificial Intelligence Foundations: Thinking Machines',
    issuer: 'LinkedIn Learning',
    category: 'ai',
    categoryLabel: 'AI & Machine Learning',
    completedDate: 'Nov 22, 2026',
    completedTimeUtc: '06:46 AM UTC',
    durationOrCredits: '1 hr 36 min',
    skillsCovered: [
      'Machine Learning',
      'Artificial Intelligence (AI)',
      'Artificial Intelligence Foundations',
    ],
    certificateId: '7d6f4b87dbde1ab26e4c8cbce2af3df88fec8cb087522fc56384929fdeff5e33',
    signatory: 'Shea Hanson, Head of Learning Content Strategy',
    pdfPath: './assets/aistudio/LinkedIn_Learning_Certificate_e69f85a9.pdf',
    fileName: 'Dhwanit_Bariya_AI_Foundations_Thinking_Machines.pdf',
  },
  {
    id: 'pmi-leadership-feedback',
    title: 'Leadership through Feedback — PMI® Registered Education Provider',
    issuer: 'Project Management Institute (PMI® ATP 2025) via LinkedIn Learning',
    programNote: 'PMI® Registered Education Provider Credential',
    category: 'communication',
    categoryLabel: 'Communication & Leadership',
    completedDate: 'Nov 16, 2026',
    completedTimeUtc: '09:57 AM UTC',
    durationOrCredits: '1.25 PDUs / Contact Hours',
    skillsCovered: ['Constructive Feedback'],
    certificateId: '40c85c081e1acdc9b1b7976ad580b0984002ed9d80e88505d7166f0fe619f000',
    providerId: '#4101',
    activityNumber: '4101143NNS',
    signatory: 'Shea Hanson, Head of Learning Content Strategy',
    pdfPath: './assets/aistudio/Project_Management_Institute__PMI___69c39873.pdf',
    fileName: 'Dhwanit_Bariya_PMI_Leadership_through_Feedback.pdf',
  },
  {
    id: 'linkedin-leadership-feedback',
    title: 'Leadership through Feedback — Course Completion',
    issuer: 'LinkedIn Learning',
    category: 'communication',
    categoryLabel: 'Communication & Leadership',
    completedDate: 'Nov 16, 2026',
    completedTimeUtc: '09:57 AM UTC',
    durationOrCredits: '1 hr 21 min',
    skillsCovered: ['Constructive Feedback'],
    certificateId: 'dc02c2e64842c830cdd6fec481f7121ea7aad71e43d14c08fba2a32dc87396cb',
    signatory: 'Shea Hanson, Head of Learning Content Strategy',
    pdfPath: './assets/aistudio/LinkedIn_Learning_Certificate_pdc_fe9bb0f3.pdf',
    fileName: 'Dhwanit_Bariya_LinkedIn_Leadership_through_Feedback.pdf',
  },
];

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    id: 'm1',
    dateLabel: 'Year 1 · Semester 1',
    phase: 'In Progress',
    title: 'Enrolled in CSE (AI & ML) at Karnavati University',
    domain: 'Academic Foundation',
    summary:
      'Started undergraduate studies in Computer Science & Engineering with Artificial Intelligence and Machine Learning, focusing on C programming fundamentals and engineering problem solving.',
    artifact: 'C Language Core Labs & University Coursework',
  },
  {
    id: 'm2',
    dateLabel: 'Year 1 · Hardware Lab',
    phase: 'Completed',
    title: 'Built Morse Buddy on Arduino with I2C OLED',
    domain: 'Embedded Hardware',
    summary:
      'Designed and enclosed a standalone Arduino Morse Code trainer featuring a 0.96" I2C OLED menu (Learn, Practice, Quiz), breadboard push buttons, and Red/Green feedback LEDs.',
    artifact: 'Morse Buddy Enclosure · OLED SSD1306 · Dual-LED Trainer',
  },
  {
    id: 'm3',
    dateLabel: 'Nov 16, 2026',
    phase: 'Completed',
    title: 'Certified in Leadership through Feedback (LinkedIn Learning & PMI®)',
    domain: 'Communication Skills',
    summary:
      'Completed structured communication training covering constructive feedback frameworks, earning both the LinkedIn Learning certificate and 1.25 PMI® PDUs.',
    artifact: '2 Verified PDF Credentials (PMI® Provider #4101)',
  },
  {
    id: 'm4',
    dateLabel: 'Nov 22, 2026',
    phase: 'Completed',
    title: 'Completed AI Foundations: Thinking Machines',
    domain: 'Artificial Intelligence',
    summary:
      'Built a formal conceptual map of machine learning paradigms, intelligent systems, and foundational AI thinking to support upcoming specialization modules.',
    artifact: 'LinkedIn Learning Certificate (1 hr 36 min)',
  },
  {
    id: 'm5',
    dateLabel: 'Next · Year 1–2',
    phase: 'Planned',
    title: 'Data Structures in C, Python for ML & Edge Prototypes',
    domain: 'Upcoming Track',
    summary:
      'Advancing from foundational C syntax into data structures, algorithmic complexity, Python scientific stacks, and connecting sensor hardware with lightweight ML models.',
    artifact: 'Planned Academic & Project Milestones',
  },
];

export const MORSE_CODE_MAP: Record<string, string> = {
  A: '.-',
  B: '-...',
  C: '-.-.',
  D: '-..',
  E: '.',
  F: '..-.',
  G: '--.',
  H: '....',
  I: '..',
  J: '.---',
  K: '-.-',
  L: '.-..',
  M: '--',
  N: '-.',
  O: '---',
  P: '.--.',
  Q: '--.-',
  R: '.-.',
  S: '...',
  T: '-',
  U: '..-',
  V: '...-',
  W: '.--',
  X: '-..-',
  Y: '-.--',
  Z: '--..',
  '0': '-----',
  '1': '.----',
  '2': '..---',
  '3': '...--',
  '4': '....-',
  '5': '.....',
  '6': '-....',
  '7': '--...',
  '8': '---..',
  '9': '----.',
};

export const MORSE_BUDDY_SKETCH = `// Morse Buddy — Arduino OLED Interactive Trainer (Learn / Practice / Quiz)
// Author: Dhwanit Bariya (Karnavati University, CSE AI & ML)

#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
Adafruit_SSD1306 oled(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

const int BTN_NAV   = 2;
const int BTN_SEL   = 3;
const int BTN_BACK  = 4;
const int BTN_KEY   = 5;
const int LED_RED   = 9;   // Status / Retry Indicator
const int LED_GREEN = 10;  // Quiz Correct Indicator

const char* MORSE_TABLE[26] = {
  ".-",   "-...", "-.-.", "-..",  ".",    "..-.", "--.",  "....", "..",
  ".---", "-.-",  ".-..", "--",   "-.",   "---",  ".--.", "--.-", ".-.",
  "...",  "-",    "..-",  "...-", ".--",  "-..-", "-.--", "--.."
};

enum Mode { MENU, LEARN, PRACTICE, QUIZ };
Mode currentMode = MENU;

void renderQuizScreen(char target, const char* userCode, bool matched) {
  oled.clearDisplay();
  oled.setTextSize(1);
  oled.setTextColor(SSD1306_WHITE);
  oled.setCursor(0, 0);  oled.println("QUIZ MODE");
  oled.setCursor(0, 14); oled.print("Find: "); oled.println(target);
  oled.setCursor(0, 28); oled.print("Your code: "); oled.println(userCode);
  if (matched) {
    oled.setCursor(0, 40); oled.println("Correct!");
    digitalWrite(LED_GREEN, HIGH);
    digitalWrite(LED_RED, LOW);
  }
  oled.setCursor(0, 54); oled.println("SELECT: Next");
  oled.display();
}

void setup() {
  pinMode(BTN_NAV,  INPUT_PULLUP);
  pinMode(BTN_SEL,  INPUT_PULLUP);
  pinMode(BTN_BACK, INPUT_PULLUP);
  pinMode(BTN_KEY,  INPUT_PULLUP);
  pinMode(LED_RED,   OUTPUT);
  pinMode(LED_GREEN, OUTPUT);

  oled.begin(SSD1306_SWITCHCAPVCC, 0x3C); // I2C GND/VDD/SCK/SDA
  oled.clearDisplay();
  oled.display();
}`;
