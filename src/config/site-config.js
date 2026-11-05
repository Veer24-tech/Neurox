function safeUrl(value, fallback) {
  try {
    const url = new URL(value || fallback);
    return ['https:', 'http:'].includes(url.protocol) ? url.href : '';
  } catch {
    return '';
  }
}

function safePhone(value, fallback) {
  return String(value || fallback || '').replace(/[^\d+(). -]/g, '').trim();
}

export const CONTACT = {
  nationalEmergencyNumber: safePhone(import.meta.env.VITE_NATIONAL_EMERGENCY_NUMBER, '112'),
  emergencyNumber: safePhone(import.meta.env.VITE_EMERGENCY_NUMBER, '+91 9369240677'),
  campusPhone: safePhone(import.meta.env.VITE_CAMPUS_SUPPORT_PHONE, '+91 6307660867'),
  campusLabel: import.meta.env.VITE_CAMPUS_SUPPORT_LABEL || 'Rama University campus support',
};

export const campusResources = [
  {
    title: 'Student counselling',
    detail: 'University counselling service · working days, 10 am–5 pm',
    href: safeUrl(import.meta.env.VITE_CAMPUS_WELLBEING_URL, 'https://www.ramauniversity.ac.in/dean-student-counseling-44-220'),
  },
  {
    title: 'Academic support',
    detail: 'Remedial classes, tutorials, problem-solving and language support',
    href: safeUrl(import.meta.env.VITE_ACADEMIC_SUPPORT_URL, 'https://www.ramauniversity.ac.in/quick-remedial-classes-29-234'),
  },
  {
    title: 'Student welfare and peer connection',
    detail: 'Dean of Student Welfare, student cohort and campus clubs',
    href: safeUrl(import.meta.env.VITE_PEER_SUPPORT_URL, 'https://www.ramauniversity.ac.in/campus-dsw-office-26-275'),
  },
];
