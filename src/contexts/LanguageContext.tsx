import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'en' | 'th';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Default translations
const translations: Record<string, { en: string; th: string }> = {
  'applyNow': {
    en: 'Apply Now Thailand porn Audition',
    th: 'สมัครเลย Thailand porn Audition'
  },
  'successStories': {
    en: 'Success Stories from Our Talent',
    th: 'เรื่องราวความสำเร็จของนักแสดงของเรา'
  },
  'faq': {
    en: 'Frequently Asked Questions',
    th: 'คำถามที่พบบ่อย'
  },
  'contactUs': {
    en: 'Contact Us Now',
    th: 'ติดต่อเราเดี๋ยวนี้'
  },
  'startYourJourney': {
    en: 'Start Your Career Today',
    th: 'เริ่มต้นอาชีพของคุณวันนี้'
  },
  'namePlaceholder': {
    en: 'Your Name',
    th: 'ชื่อของคุณ'
  },
  'agePlaceholder': {
    en: 'Your Age',
    th: 'อายุของคุณ'
  },
  'cityPlaceholder': {
    en: 'Your City',
    th: 'เมืองที่คุณอยู่'
  },
  'emailPlaceholder': {
    en: 'Your Email',
    th: 'อีเมลของคุณ'
  },
  'socialMediaPlaceholder': {
    en: 'Social Media and telephone number (Optional)',
    th: 'โซเชียลมีเดียและหมายเลขโทรศัพท์ (ไม่จำเป็น)'
  },
  'messagePlaceholder': {
    en: 'Your Message',
    th: 'ข้อความของคุณ'
  },
  'submitButton': {
    en: 'Submit Application',
    th: 'ส่งใบสมัคร'
  },
  'submitting': {
    en: 'Submitting...',
    th: 'กำลังส่ง...'
  },
  'submitted': {
    en: 'Thank you! We\'ll be in touch soon.',
    th: 'ขอบคุณ! เราจะติดต่อคุณเร็วๆ นี้'
  },
  'errorSubmitting': {
    en: 'Error submitting form. Please try again.',
    th: 'เกิดข้อผิดพลาดในการส่งแบบฟอร์ม โปรดลองอีกครั้ง'
  },
  'couldBeNext': {
    en: 'Could you be our next success story?',
    th: 'คุณจะเป็นเรื่องราวความสำเร็จถัดไปของเราหรือไม่?'
  },
  'mainTitle': {
    en: 'THAILAND CASTING PORN AUDITION',
    th: 'การคัดเลือกนักแสดงภาพยนตร์ผู้ใหญ่ ประเทศไทย'
  },
  'mainSubtitle': {
    en: 'Start your career in Thailand\'s adult entertainment industry today',
    th: 'เริ่มต้นอาชีพของคุณในวงการบันเทิงสำหรับผู้ใหญ่ของประเทศไทยวันนี้'
  },
  'faqQuestion1': {
    en: 'I have no experience. Can I still apply?',
    th: 'ฉันไม่มีประสบการณ์ ยังสมัครได้ไหม?'
  },
  'faqAnswer1': {
    en: 'Absolutely! Many successful performers in the adult industry started with no prior experience. We work with production companies that provide training and support for newcomers. Your willingness to learn and positive attitude are what matter most. We believe in your potential!',
    th: 'แน่นอน! นักแสดงหลายคนในวงการผู้ใหญ่เริ่มต้นจากไม่มีประสบการณ์มาก่อน เราทำงานกับบริษัทผลิตที่ให้การฝึกอบรมและสนับสนุนผู้เริ่มต้น ความตั้งใจที่จะเรียนรู้และทัศนคติที่ดีของคุณคือสิ่งที่สำคัญที่สุด เราเชื่อในศักยภาพของคุณ!'
  },
  'faqQuestion2': {
    en: 'What body types and looks are you looking for?',
    th: 'คุณมองหาลักษณะรูปร่างแบบไหนบ้าง?'
  },
  'faqAnswer2': {
    en: 'The adult entertainment industry values diversity! There is demand for all body types, ages, and looks. What matters most is your confidence, professionalism, and enthusiasm. Whether you\'re curvy, slim, tall, or petite, there are opportunities for you. Your unique qualities are what make you stand out.',
    th: 'วงการบันเทิงสำหรับผู้ใหญ่ให้คุณค่ากับความหลากหลาย! มีความต้องการทุกรูปร่าง ทุกวัย และทุกรูปลักษณ์ สิ่งสำคัญที่สุดคือความมั่นใจ ความเป็นมืออาชีพ และความกระตือรือร้นของคุณ ไม่ว่าคุณจะรูปร่างแบบไหน มีโอกาสสำหรับคุณทั้งนั้น คุณสมบัติเฉพาะตัวของคุณคือสิ่งที่ทำให้คุณโดดเด่น'
  },
  'faqQuestion3': {
    en: 'What kind of income can I expect?',
    th: 'ฉันสามารถคาดหวังรายได้เท่าไหร่?'
  },
  'faqAnswer3': {
    en: 'Earnings in the adult entertainment industry can be very lucrative, often far exceeding traditional job opportunities. Your income will depend on various factors including the type of work, your experience level, and your dedication. Many of our talents earn significantly more than they could in conventional jobs, with the potential for six-figure annual incomes for top performers.',
    th: 'รายได้ในวงการบันเทิงสำหรับผู้ใหญ่อาจทำเงินได้มาก มักจะสูงกว่างานทั่วไปหลายเท่า รายได้ของคุณจะขึ้นอยู่กับหลายปัจจัยรวมถึงประเภทของงาน ระดับประสบการณ์ และความทุ่มเท ของเราหลายคนมีรายได้มากกว่าการทำงานทั่วไปอย่างมาก โดยมีศักยภาพในการสร้างรายได้หลักล้านต่อปีสำหรับนักแสดงที่ประสบความสำเร็จสูงสุด'
  },
  'faqQuestion4': {
    en: 'What kind of schedule will I have?',
    th: 'ฉันจะมีตารางงานแบบไหน?'
  },
  'faqAnswer4': {
    en: 'We offer flexible scheduling to accommodate your needs. Many of our talents work part-time or choose their own hours. Whether you\'re looking for full-time work or just want to supplement your income, we can help find opportunities that fit your schedule. Some projects may require specific time commitments, but we\'ll always be upfront about expectations.',
    th: 'เรามีตารางเวลาที่ยืดหยุ่นเพื่อตอบสนองความต้องการของคุณ นักแสดงหลายคนของเราทำงานพาร์ทไทม์หรือเลือกชั่วโมงทำงานของตัวเอง ไม่ว่าคุณกำลังมองหางานเต็มเวลาหรือเพียงแค่อยากหารายได้เสริม เราสามารถช่วยหาส่วนที่เหมาะกับตารางเวลาของคุณได้ โครงการบางโครงการอาจต้องใช้เวลาเฉพาะ แต่เราจะบอกความคาดหวังล่วงหน้าเสมอ'
  },
  'faqQuestion5': {
    en: 'Is it safe to work in the adult industry in Thailand?',
    th: 'การทำงานในวงการผู้ใหญ่ที่ประเทศไทยปลอดภัยไหม?'
  },
  'faqAnswer5': {
    en: 'Your safety is our top priority. We work exclusively with licensed, professional production companies that maintain the highest standards of safety and discretion. All our partners are vetted to ensure they provide safe working conditions and respect performers\' boundaries. We also provide guidance on best practices for maintaining privacy and security.',
    th: 'ความปลอดภัยของคุณคือสิ่งสำคัญอันดับแรกของเรา เราทำงานกับบริษัทผลิตที่มีใบอนุญาตและเป็นมืออาชีพเท่านั้น ซึ่งรักษามาตรฐานความปลอดภัยและการรักษาความลับในระดับสูงสุด พันธมิตรทั้งหมดของเราผ่านการตรวจสอบเพื่อให้แน่ใจว่ามีสภาพการทำงานที่ปลอดภัยและเคารพขอบเขตของนักแสดง นอกจากนี้เรายังให้คำแนะนำเกี่ยวกับแนวทางปฏิบัติที่ดีที่สุดในการรักษาความเป็นส่วนตัวและความปลอดภัย'
  },
  'faqQuestion6': {
    en: 'What is the lifestyle like as an adult performer in Thailand?',
    th: 'การใช้ชีวิตของนักแสดงภาพยนตร์ผู้ใหญ่ในประเทศไทยเป็นอย่างไร?'
  },
  'faqAnswer6': {
    en: 'Working in Thailand\'s adult entertainment industry offers an exciting and unique lifestyle. Many of our talents enjoy flexible schedules that allow them to explore Thailand\'s beautiful beaches, vibrant cities, and rich culture during their free time. You\'ll be part of an international community of like-minded professionals. The work can be demanding but also incredibly rewarding both personally and financially.',
    th: 'การทำงานในวงการบันเทิงสำหรับผู้ใหญ่ของประเทศไทยนำเสนอลักษณะการทำงานที่น่าตื่นเต้นและไม่เหมือนใคร นักแสดงหลายคนของเราสนุกกับตารางเวลาที่ยืดหยุ่นที่ช่วยให้พวกเขาสามารถสำรวจชายหาดที่สวยงาม เมืองที่มีชีวิตชีวา และวัฒนธรรมที่หลากหลายของประเทศไทยในช่วงเวลาว่าง คุณจะเป็นส่วนหนึ่งของชุมชนนานาชาติของมืออาชีพที่มีความคิดเหมือนกัน งานนี้อาจมีความท้าทายแต่ก็ให้ผลตอบแทนที่คุ้มค่าทั้งในแง่ส่วนตัวและการเงิน'
  },
  'faqQuestion7': {
    en: 'How quickly can I start working?',
    th: 'ฉันจะเริ่มงานได้เร็วแค่ไหน?'
  },
  'faqAnswer7': {
    en: 'The process is quick and straightforward. Once you contact us, we will guide you through every step, from preparing for your audition to connecting you with bars looking for talent like yours. Our goal is to get you ready for your first shift as soon as possible, so you can start enjoying the benefits of your new career without delay.',
    th: 'กระบวนการนี้รวดเร็วและตรงไปตรงมา เมื่อคุณติดต่อเรา เราจะแนะนำคุณในทุกขั้นตอน ตั้งแต่การเตรียมตัวสำหรับการออดิชัน ไปจนถึงการเชื่อมต่อคุณกับบาร์ที่กำลังมองหาคนที่มีความสามารถแบบคุณ เป้าหมายของเราคือเตรียมความพร้อมให้คุณสำหรับกะแรกให้เร็วที่สุด เพื่อที่คุณจะได้เริ่มต้นใช้ประโยชน์จากอาชีพใหม่ของคุณโดยไม่ชักช้า'
  },
  'faqQuestion8': {
    en: 'How do I get started?',
    th: 'ฉันจะเริ่มต้นได้อย่างไร?'
  },
  'faqAnswer8': {
    en: 'It\'s simple! All you need to do is reach out to us. We will guide you through the process, answer all your questions, and connect you with the best opportunities in Pattaya. Your dream career is just a message away. Contact us now to take the first step!',
    th: 'ง่ายมาก! สิ่งที่คุณต้องทำคือติดต่อเรา เราจะแนะนำคุณตลอดกระบวนการ ตอบทุกคำถามของคุณ และเชื่อมต่อคุณกับโอกาสที่ดีที่สุดในพัทยา อาชีพในฝันของคุณอยู่ใกล้แค่การส่งข้อความ ติดต่อเราตอนนี้เพื่อเริ่มต้นขั้นตอนแรก!'
  },
  'welcomeText': {
    en: 'Welcome to Thailand\'s premier adult entertainment casting platform! Are you looking for an exciting new opportunity in Thailand\'s adult industry? We connect talented individuals with top production companies and agencies across Thailand. Whether you\'re experienced or new to the industry, our platform provides everything you need to start your career. Begin your journey with us today!',
    th: 'ยินดีต้อนรับสู่แพลตฟอร์มการคัดเลือกนักแสดงสำหรับผู้ใหญ่ชั้นนำของประเทศไทย! คุณกำลังมองหาโอกาสใหม่ที่น่าตื่นเต้นในวงการผู้ใหญ่ของประเทศไทยอยู่หรือไม่? เราเชื่อมต่อผู้มีความสามารถกับบริษัทผลิตและเอเจนซี่ชั้นนำทั่วประเทศไทย ไม่ว่าคุณจะมีประสบการณ์หรือเพิ่งเริ่มต้นในวงการนี้ แพลตฟอร์มของเรามีทุกสิ่งที่คุณต้องการเพื่อเริ่มต้นอาชีพของคุณ เริ่มต้นการเดินทางของคุณกับเราวันนี้!'
  },
  'findYourPerfectJob': {
    en: 'Explore Exciting Opportunities',
    th: 'ค้นหาโอกาสที่น่าตื่นเต้น'
  },
  'job1': {
    en: 'Adult Film Talent: Various roles available',
    th: 'นักแสดงภาพยนตร์ผู้ใหญ่: รับสมัครหลายบทบาท'
  },
  'job2': {
    en: 'Webcam Model Positions: Work from anywhere',
    th: 'ตำแหน่งนางแบบเว็บแคม: ทำงานที่ไหนก็ได้'
  },
  'job3': {
    en: 'Content Creator Opportunities: Build your brand',
    th: 'โอกาสสำหรับผู้สร้างคอนเทนต์: สร้างแบรนด์ของคุณเอง'
  },
  'job4': {
    en: 'Exclusive Performers Wanted: Premium projects',
    th: 'ต้องการนักแสดงพิเศษ: โครงการพรีเมียม'
  },
  'whyChooseUs': {
    en: 'Why Work With Us?',
    th: 'ทำไมต้องทำงานกับเรา?'
  },
  'benefit1': {
    en: 'Direct connections with top production companies',
    th: 'การเชื่อมต่อโดยตรงกับบริษัทผลิตชั้นนำ'
  },
  'benefit2': {
    en: 'Professional portfolio development',
    th: 'การพัฒนาพอร์ตโฟลิโอแบบมืออาชีพ'
  },
  'benefit3': {
    en: 'Guidance on building your career in the industry',
    th: 'คำแนะนำในการสร้างอาชีพในวงการนี้'
  },
  'benefit4': {
    en: 'Support throughout your professional journey',
    th: 'การสนับสนุนตลอดเส้นทางอาชีพของคุณ'
  },
  'dontWait': {
    en: "Don't Wait, Your Opportunity in Thailand's Adult Industry is Here! Thailand Casting Porn Audition",
    th: 'อย่ารอช้า โอกาสของคุณในวงการผู้ใหญ่ของประเทศไทยอยู่ที่นี่แล้ว! Thailand Casting Porn Audition'
  },
  'browseListings': {
    en: 'Browse our latest opportunities and take the first step toward a new, exciting career in Thailand\'s adult entertainment industry.',
    th: 'ค้นหาโอกาสล่าสุดของเราและก้าวแรกสู่เส้นทางอาชีพใหม่ที่น่าตื่นเต้นในวงการบันเทิงสำหรับผู้ใหญ่ของประเทศไทย'
  },
  'nowHiring': {
    en: 'Now Casting: Top Production Companies Are Looking for New Talent! • Ready to Begin? Start Your Career in Thailand\'s Adult Industry',
    th: 'ตอนนี้เปิดรับสมัคร: บริษัทผลิตชั้นนำกำลังมองหาคนรุ่นใหม่! • พร้อมเริ่มต้นหรือยัง? เริ่มต้นอาชีพของคุณในวงการผู้ใหญ่ของประเทศไทย'
  },
  'nokReview': {
    en: 'Working in the adult industry has completely transformed my life. The financial freedom is incredible - I can support my family back in the village and still have plenty left for myself. The team has been incredibly supportive, making sure I feel safe and respected in every project. This opportunity has given me more than I ever dreamed possible!',
    th: 'การทำงานในวงการผู้ใหญ่ได้เปลี่ยนชีวิตของฉันอย่างสิ้นเชิง อิสรภาพทางการเงินนั้นเหลือเชื่อ - ฉันสามารถสนับสนุนครอบครัวที่บ้านนอกและยังมีเงินเหลือสำหรับตัวเอง ทีมงานให้การสนับสนุนอย่างมาก ทำให้ฉันรู้สึกปลอดภัยและได้รับการเคารพในทุกโครงการ โอกาสนี้ให้ฉันมากกว่าที่เคยฝันไว้!'
  },
  'daoName': {
    en: 'Maria',
    th: 'มาเรีย'
  },
  'daoReview': {
    en: 'I was nervous about entering the adult industry, but this platform made everything so easy and professional. The production companies they work with are top-notch and really care about their performers. The income has been life-changing - I\'ve been able to pay off my family\'s debts and start building real savings. The support network here is incredible!',
    th: 'ฉันกังวลกับการเข้าสู่วงการผู้ใหญ่ แต่แพลตฟอร์มนี้ทำให้ทุกอย่างง่ายและเป็นมืออาชีพ บริษัทผลิตที่พวกเขาทำงานด้วยนั้นยอดเยี่ยมมากและใส่ใจนักแสดงจริงๆ รายได้ได้เปลี่ยนชีวิต - ฉันสามารถชำระหนี้ของครอบครัวและเริ่มเก็บออมอย่างจริงจัง เครือข่ายการสนับสนุนที่นี่ยอดเยี่ยมมาก!'
  },
  'daoLocation': {
    en: 'Cebu City, Cebu',
    th: 'เซบูซิตี้, เซบู'
  },
  'mariaName': {
    en: 'Maria',
    th: 'มาเรีย'
  },
  'mariaReview': {
    en: 'I was nervous about entering the adult industry, but the support and professionalism I found here exceeded all my expectations. The financial rewards have been life-changing, allowing me to support my family and plan for a secure future. The team ensures we work in a safe, respectful environment with fair compensation for our work.',
    th: 'ฉันกังวลเกี่ยวกับการเข้าสู่วงการผู้ใหญ่ แต่การสนับสนุนและความเป็นมืออาชีพที่ฉันพบที่นี่เกินความคาดหมายทั้งหมด รางวัลทางการเงินได้เปลี่ยนชีวิตของฉัน ช่วยให้ฉันสามารถสนับสนุนครอบครัวและวางแผนสำหรับอนาคตที่มั่นคง ทีมงานทำให้แน่ใจว่าเราทำงานในสภาพแวดล้อมที่ปลอดภัย มีความเคารพ และได้รับค่าตอบแทนที่เป็นธรรม'
  },
  'mariaLocation': {
    en: 'Bangkok, Thailand',
    th: 'กรุงเทพฯ ประเทศไทย'
  },
  'anaName': {
    en: 'Ana',
    th: 'อันนา'
  },
  'anaReview': {
    en: 'Working in the adult entertainment industry has been an incredibly empowering experience. The financial rewards have allowed me to achieve goals I never thought possible, and the professional environment is both supportive and respectful. The team ensures we have everything we need to succeed while maintaining our privacy and well-being.',
    th: 'การทำงานในวงการบันเทิงสำหรับผู้ใหญ่เป็นประสบการณ์ที่เติมเต็มความมั่นใจอย่างไม่น่าเชื่อ รางวัลทางการเงินช่วยให้ฉันบรรลุเป้าหมายที่ฉันไม่เคยคิดว่าจะเป็นไปได้ และสภาพแวดล้อมที่เป็นมืออาชีพทั้งให้การสนับสนุนและเคารพ ทีมงานทำให้แน่ใจว่าเรามีทุกอย่างที่จำเป็นสำหรับความสำเร็จในขณะที่ยังคงความเป็นส่วนตัวและความเป็นอยู่ที่ดีของเรา'
  },
  'anaLocation': {
    en: 'Baguio City, Luzon',
    th: 'บากีโอ, ลูซอน'
  },
  'meiName': {
    en: 'Mei',
    th: 'เหมย'
  },
  'meiReview': {
    en: 'Working in the adult entertainment industry has given me the freedom to pursue my passions and live life on my own terms. The financial rewards have been life-changing, and the support from the team has been invaluable. I feel empowered and confident in my abilities, and I\'m grateful for the opportunity to work in this industry.',
    th: 'การทำงานในวงการบันเทิงสำหรับผู้ใหญ่ได้ให้ฉันความเป็นอิสระในการทำตามความฝันและใช้ชีวิตตามที่ฉันต้องการ รางวัลทางการเงินได้เปลี่ยนชีวิตของฉัน และการสนับสนุนจากทีมงานมีค่ามาก ฉันรู้สึกมั่นใจและเชื่อมั่นในความสามารถของตัวเอง และฉันขอขอบคุณสำหรับโอกาสในการทำงานในวงการนี้'
  },
  'meiLocation': {
    en: 'Cagayan de Oro, Mindanao',
    th: 'คากายัน เด โอโร, มินดาเนา'
  },
  'yingName': {
    en: 'Ying',
    th: 'หญิง'
  },
  'yingReview': {
    en: 'I was hesitant to join the adult industry, but the experience has been overwhelmingly positive. The team has been supportive and respectful, and the financial rewards have been more than I expected. I feel grateful for the opportunity to work in this industry and to be part of a community that values and respects its performers.',
    th: 'ฉันลังเลที่จะเข้าสู่วงการผู้ใหญ่ แต่ประสบการณ์นั้นเป็นไปในเชิงบวกอย่างมาก ทีมงานให้การสนับสนุนและเคารพ และรางวัลทางการเงินนั้นมากกว่าที่ฉันคาดหวัง ฉันรู้สึกขอบคุณสำหรับโอกาสในการทำงานในวงการนี้ และเป็นส่วนหนึ่งของชุมชนที่ให้คุณค่าและเคารพนักแสดง'
  },
  'yingLocation': {
    en: 'Iloilo City, Visayas',
    th: 'อิลอยโล ซิตี้, วิซายาส'
  },
  'googleReview': {
    en: 'Google Review',
    th: 'รีวิวจาก Google'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Load saved language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    } else if (navigator.language.startsWith('th')) {
      setLanguage('th');
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'th' : 'en';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
