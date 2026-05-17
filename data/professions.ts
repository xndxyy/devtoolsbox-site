// Career Experience Mode - Profession Data Definitions
// Each profession contains a biography summary for AI to generate more realistic life stories

export interface Profession {
  id: string
  name: string
  icon: string
  description: string
  color: string
  maxAge: number
  // Life trajectory knowledge for this profession (for AI distillation)
  biographySummary: string
  // Key events at each life stage for this profession
  lifeStages: {
    stage: string
    ageRange: string
    description: string
  }[]
}

export const professions: Profession[] = [
  {
    id: 'programmer',
    name: 'Programmer',
    icon: '💻',
    description: 'Changing the world with code, from binary to AI — a builder of the digital age.',
    color: '#4fc3f7',
    maxAge: 80,
    biographySummary: `Programmers are the builders of the digital world. Typical growth path: getting exposed to computers in youth (playing games or learning to code) → studying computer science at university → joining an internet/tech company after graduation → growing from junior programmer to senior roles. Career characteristics: need for continuous learning (programming languages and frameworks evolve rapidly), long hours in front of screens, team collaboration (code reviews, agile development), common 996/high-intensity work. Mid-life challenges: transitioning to tech management (architect/tech lead) or entrepreneurship, technical bottlenecks, career burnout. Typical achievements: shipping major projects, open-source contributions, technology patents, IPO. Representatives: Linus Torvalds (Linux creator), Ma Huateng (Tencent founder), Lei Jun (Xiaomi founder), Zhang Yiming (ByteDance founder).`,
    lifeStages: [
      { stage: 'Discovery', ageRange: '10-18', description: 'Getting exposed to computers and building interest in programming — playing games, building websites, or participating in informatics competitions.' },
      { stage: 'Education', ageRange: '18-22', description: 'Studying computer science at university. Systematic learning of algorithms, data structures, operating systems, and programming languages. Participating in ACM competitions, course projects, and internships.' },
      { stage: 'Growth', ageRange: '22-30', description: 'Joining a tech company, growing from junior programmer to senior engineer. Shipping projects, designing technical solutions, collaborating in teams.' },
      { stage: 'Maturity', ageRange: '30-40', description: 'Becoming a technical expert or engineering manager. Architecture design, technical decision-making, leading teams, sharing knowledge, building industry influence.' },
      { stage: 'Transition', ageRange: '40-50', description: 'Deepening in tech management, starting a business, becoming a tech consultant, or transitioning to product management. Facing the balance between new tech and family.' },
      { stage: 'Legacy', ageRange: '50+', description: 'Industry mentor, tech evangelist, angel investor, authoring books and sharing wisdom.' },
    ],
  },
  {
    id: 'doctor',
    name: 'Doctor',
    icon: '🩺',
    description: 'An angel in white who saves lives, racing against death to protect every heartbeat.',
    color: '#ef5350',
    maxAge: 80,
    biographySummary: `Doctors are professionals dedicated to saving lives. Typical growth path: aspiring to medicine → medical school (typically 5 years undergrad + 3 years master's + 3 years PhD) → standardized residency training (3 years) → specialist training → attending physician → associate chief physician → chief physician. Career characteristics: long training period (8-12 years), high workload (night shifts, back-to-back surgeries), immense responsibility (lives at stake), complex doctor-patient relationships. Departments vary greatly: surgery (operating room), internal medicine (diagnosis and medication), emergency (high-intensity resuscitation), pediatrics (difficult communication with children), obstetrics/gynecology (welcoming new life). Mid-life challenges: promotion pressure, research paper requirements, medical disputes, occupational diseases (cervical/spinal issues). Typical achievements: completing high-difficulty surgeries, publishing top-tier papers, discovering new diseases/treatments, medical inventions, becoming a discipline leader. Representatives: Zhong Nanshan (respiratory expert), Wu Mengchao (father of hepatobiliary surgery).`,
    lifeStages: [
      { stage: 'Aspiration', ageRange: '15-18', description: 'Developing an interest in medicine, fascinated by life sciences, participating in biology/chemistry competitions.' },
      { stage: 'Medical School', ageRange: '18-26', description: 'Studying in medical school. Anatomy classes, clinical rotations through internal medicine, surgery, pediatrics, OB/GYN; preparing for graduate entrance exams.' },
      { stage: 'Residency', ageRange: '26-30', description: 'Standardized residency training. Night shifts, managing beds, writing medical records, emergency resuscitation. The toughest and most exhausting stage.' },
      { stage: 'Specialization', ageRange: '30-35', description: 'Specialist training. Choosing a specialty (cardiology, neurosurgery, pediatrics, etc.), accumulating clinical experience.' },
      { stage: 'Attending', ageRange: '35-45', description: 'Independent practice, teaching residents, conducting research, publishing papers. The golden age of career development.' },
      { stage: 'Expertise', ageRange: '45+', description: 'Chief physician / discipline leader. Consulting on complex cases, academic conferences, mentoring graduate students, authoring medical works.' },
    ],
  },
  {
    id: 'lawyer',
    name: 'Lawyer',
    icon: '⚖️',
    description: 'With law as the sword and reason as the shield — a guardian of justice.',
    color: '#9c27b0',
    maxAge: 80,
    biographySummary: `Lawyers are legal professionals. Typical growth path: studying law at university → passing the bar exam (one of China's toughest, ~10% pass rate) → law firm internship (1 year) → applying for a practicing license → practicing lawyer → partner/independent lawyer. Career characteristics: strong logical thinking and communication skills required, extensive case file reading, courtroom defense, negotiation skills. Specialties: criminal defense, civil litigation, corporate law, intellectual property, family law, finance/securities, etc. High work intensity: court appearances, legal opinions, client entertainment. Mid-life challenges: case source pressure, industry competition, career burnout, ethical dilemmas. Typical achievements: winning major cases, becoming a law firm partner, publishing legal works, serving as arbitrator, contributing to legislative consultation. Representatives: renowned criminal defense lawyers, corporate general counsels who became entrepreneurs.`,
    lifeStages: [
      { stage: 'Inspiration', ageRange: '16-18', description: 'Developing interest in law, debate, and justice. Participating in debate competitions and mock trials.' },
      { stage: 'Legal Studies', ageRange: '18-22', description: 'Studying law at university. Courses in civil law, criminal law, procedural law, international law, etc.' },
      { stage: 'Bar Exam', ageRange: '22-25', description: 'Preparing for the bar exam and interning at a law firm. Countless sleepless nights of studying.' },
      { stage: 'Practice', ageRange: '25-35', description: 'Becoming a practicing lawyer. Handling various cases, arguing in court, building experience and networks.' },
      { stage: 'Specialization', ageRange: '35-45', description: 'Specializing in a specific field (criminal/IP/maritime law), becoming a partner or independent practitioner.' },
      { stage: 'Prestige', ageRange: '45+', description: 'Industry authority. Authoring books, contributing to legislation, serving as visiting professor or arbitrator.' },
    ],
  },
  {
    id: 'athlete',
    name: 'Athlete',
    icon: '🏃',
    description: 'Forging glory with sweat, pushing the limits of human potential on the field.',
    color: '#ff9800',
    maxAge: 70,
    biographySummary: `Athletes push the boundaries of human physical performance. Typical growth path: discovered at a youth sports school → provincial team → national team/professional club → domestic and international competitions → post-retirement transition. Career characteristics: extremely intense training (6-10 hours daily), short career span (most retire before 30), high injury risk, fierce competition (very few make it to international arenas). Sports vary greatly: track & field (speed/endurance/strength), ball games (teamwork), gymnastics (technical difficulty), swimming (aquatic endurance), combat sports, winter sports (skill + courage). Mid-life challenges: difficult post-retirement transition, injury after-effects, social adaptation. Typical achievements: Olympic medals, world records, national championships, professional league titles, sportsmanship awards. Representatives: Liu Xiang (hurdles), Yao Ming (basketball), Li Na (tennis), Su Bingtian (100m sprint).`,
    lifeStages: [
      { stage: 'Discovery', ageRange: '6-12', description: 'Showing athletic talent, being discovered by a coach, joining a sports school or junior team.' },
      { stage: 'Development', ageRange: '12-18', description: 'Professional training. Day after day of foundational training, participating in provincial/national youth competitions.' },
      { stage: 'Breakthrough', ageRange: '18-25', description: 'The golden period for professional athletes. Making national/professional teams, competing internationally, chasing medals.' },
      { stage: 'Peak', ageRange: '25-30', description: 'Peak of athletic career. Most technically skilled and experienced, but physical decline begins.' },
      { stage: 'Transition Planning', ageRange: '30-35', description: 'Considering retirement and career transition. May become a coach, sports manager, entrepreneur, or enter entertainment/media.' },
      { stage: 'New Chapter', ageRange: '35+', description: 'Starting a second life. Coach, commentator, sports industry, philanthropy, or business.' },
    ],
  },
  {
    id: 'artist',
    name: 'Artist',
    icon: '🎨',
    description: 'Creating beauty that moves the soul through brushstrokes, notes, and words.',
    color: '#e91e63',
    maxAge: 80,
    biographySummary: `Artists express themselves through creative work. Diverse types: painters (oil/Chinese ink/illustration), musicians (performance/composition/conduction), writers (novels/poetry/screenwriting), dancers, sculptors, photographers, designers, etc. Typical growth path: showing talent → studying at professional institutions (art academy, music conservatory, drama school) → creative practice → releasing works → building recognition. Career characteristics: high creative freedom with unstable income, need for sustained inspiration and self-motivation, long and uncertain path to fame. Most have no steady salary, surviving through art sales, performance fees, royalties, and commercial collaborations. Mid-life challenges: creative blocks, market shifts, financial pressure, anxiety about being overtaken by younger generations. Typical achievements: holding solo exhibitions/concerts/book signings, winning major awards (Nobel/Oscar/Grammy/Mao Dun/Golden Rooster, etc.), works in museums. Representatives: Jay Chou (music), Mo Yan (literature), Hayao Miyazaki (animation), Han Han (writer/director), Lang Lang (piano).`,
    lifeStages: [
      { stage: 'Discovery', ageRange: '5-14', description: 'Showing artistic talent. Learning an instrument, painting, or writing. Participating in competitions and gaining recognition.' },
      { stage: 'Education', ageRange: '14-22', description: 'Studying at a professional institution. Systematic training, master guidance, peer collaboration, first creative works.' },
      { stage: 'Struggle', ageRange: '22-30', description: 'Artistic exploration. Working odd jobs while creating, participating in exhibitions/performances, finding a personal style. The hardest but most passionate stage.' },
      { stage: 'Breakthrough', ageRange: '30-40', description: 'Emerging recognition. Works gaining acclaim, winning major awards, forming a unique style, increasing commercial value.' },
      { stage: 'Maturity', ageRange: '40-55', description: 'Creative peak. Artistic maturity, growing influence, mentoring students, taking on larger projects.' },
      { stage: 'Legacy', ageRange: '55+', description: 'Master status. Retrospectives, complete works publications, philanthropic education, industry patriarch/matriarch status.' },
    ],
  },
  {
    id: 'entrepreneur',
    name: 'Entrepreneur',
    icon: '🏢',
    description: 'Creating business miracles from scratch, changing lifestyles through innovation.',
    color: '#4caf50',
    maxAge: 80,
    biographySummary: `Entrepreneurs are adventurers and creators in the business world. Typical growth path: identifying market opportunities → building a team → developing products/services → fundraising → market expansion → scaling. Career characteristics: high pressure (company survival, fundraising, competition), great decision-making power but also great responsibility, working hours far beyond 9-to-5, requiring immense resilience and learning ability. Startup types: tech (AI/SaaS/e-commerce), traditional industry innovation (restaurants/retail/manufacturing), social enterprises. Common paths: college startups, executives leaving big companies to start their own, serial entrepreneurs. Mid-life challenges: business transformation, succession planning, industry cycles, intensifying competition. Typical achievements: IPO, industry leadership, wealth accumulation, job creation, business innovation, philanthropy. Representatives: Jack Ma (Alibaba), Ren Zhengfei (Huawei), Ma Huateng (Tencent), Wang Xing (Meituan), Lei Jun (Xiaomi), Cao Dewang (Fuyao Glass).`,
    lifeStages: [
      { stage: 'Discovery', ageRange: '12-18', description: 'Developing business sense. Selling things to make money, participating in business competitions, observing markets.' },
      { stage: 'Accumulation', ageRange: '18-25', description: 'Attending university or working to gain experience and build networks. Spotting opportunities, finding co-founders, saving seed capital.' },
      { stage: 'Launch', ageRange: '25-35', description: 'Starting a company. The hardest 0-to-1 phase: finding direction, building products, raising funding, expanding market.' },
      { stage: 'Expansion', ageRange: '35-45', description: 'Rapid business growth. Team scaling, market coverage, management system building, brand creation.' },
      { stage: 'Peak', ageRange: '45-55', description: 'Industry leader. IPO/industry dominance, diversification, international expansion, social influence.' },
      { stage: 'Legacy', ageRange: '55+', description: 'Succession planning. Cultivating successors, philanthropy, industry advisory, authoring memoirs.' },
    ],
  },
  {
    id: 'scientist',
    name: 'Scientist',
    icon: '🔬',
    description: 'Exploring the frontiers of the unknown, advancing civilization through experiments and theory.',
    color: '#00bcd4',
    maxAge: 85,
    biographySummary: `Scientists are researchers dedicated to discovering natural laws and creating new knowledge. Typical growth path: developing interest in science → studying STEM at university (physics/chemistry/biology/mathematics, etc.) → master's/PhD → postdoc → university professor/research institute scientist. Career characteristics: long academic path (PhD typically 5-7 years), fierce competition for research funding, high publication pressure (publish or perish), frequent experimental failures, requiring immense patience and focus. Specialties: basic sciences (theoretical physics, pure math, fundamental biology), applied sciences (materials, engineering, medicine), frontier interdisciplinary (AI, quantum, gene editing). Mid-life challenges: grant applications, academic competition, teaching/admin squeezing research time, balancing research and commercialization. Typical achievements: publishing in Nature/Science, winning Nobel/Turing/Fields prizes, discovering new particles/species/laws, inventing world-changing technologies. Representatives: Albert Einstein, Qian Xuesen, Yuan Longping, Tu Youyou, Shi Yigong.`,
    lifeStages: [
      { stage: 'Curiosity', ageRange: '8-16', description: 'Full of curiosity about nature. Doing small experiments, reading popular science books, participating in science fairs, visiting science museums.' },
      { stage: 'Education', ageRange: '16-22', description: 'Studying STEM at university. Building a solid foundation in math, physics, and chemistry; entering labs to understand scientific research.' },
      { stage: 'Doctorate', ageRange: '22-28', description: 'Pursuing a PhD. Choosing a research direction, running experiments/deriving theories, publishing papers, attending academic conferences.' },
      { stage: 'Postdoc / Early Faculty', ageRange: '28-35', description: 'Postdoctoral research or early faculty position. Establishing own research direction, applying for grants, mentoring students.' },
      { stage: 'Independence', ageRange: '35-50', description: 'Becoming an independent PI (Principal Investigator). Leading a team, securing major projects, producing significant results.' },
      { stage: 'Mastery', ageRange: '50+', description: 'Academic authority. Shaping the direction of a field, training the next generation of scientists, contributing to national science planning.' },
    ],
  },
  {
    id: 'soldier',
    name: 'Soldier',
    icon: '🎖️',
    description: 'The great wall of steel protecting the nation, defending peace with loyalty and sacrifice.',
    color: '#795548',
    maxAge: 70,
    biographySummary: `Soldiers are members of a nation's armed forces. Typical growth path: enlistment → basic training → assignment to a unit → NCO/officer promotion → demobilization/retirement. Officer path: military academy graduate or college graduate enlistment → platoon leader → company commander → battalion/regimental officer. Career characteristics: strict discipline (orders above all), high-intensity training (physical fitness, marksmanship, tactics), always ready for missions (disaster relief, peacekeeping, combat), communal living, long separations from family. Branch differences: Army (ground combat), Navy (sea/submarine), Air Force (flight/ground crew), Rocket Force (missiles), Strategic Support Force. Mid-life challenges: demobilization re-employment, social adaptation, prolonged family separation, sense of purpose in peacetime. Typical achievements: awards/medals (First/Second/Third Class Merit), major mission completion (parades, peacekeeping, exercises), rank promotion, commanding large-scale exercises, outstanding performance in disaster relief. Representatives: exemplary figures from various branches of the People's Liberation Army.`,
    lifeStages: [
      { stage: 'Enlistment', ageRange: '18-22', description: 'Joining the military. Basic training: drill, physical fitness, marksmanship, tactical fundamentals. The transformation from civilian to soldier.' },
      { stage: 'Tempering', ageRange: '22-28', description: 'Grassroots unit experience. Squad/platoon leader, technical specialist. Participating in exercises and missions, building combat experience.' },
      { stage: 'Backbone', ageRange: '28-35', description: 'Becoming a unit backbone. Company commander or staff officer. Leading missions and training troops.' },
      { stage: 'Core Leadership', ageRange: '35-45', description: 'Battalion/regimental officer. Commanding large-scale exercises, participating in major missions, managing military units.' },
      { stage: 'Senior Leadership', ageRange: '45-50', description: 'Division/brigade level and above. Strategic planning, force building, talent development.' },
      { stage: 'Retirement', ageRange: '50+', description: 'Demobilization/retirement. Starting civilian life, applying military management experience to society.' },
    ],
  },
  {
    id: 'teacher',
    name: 'Teacher',
    icon: '📚',
    description: 'Imparting wisdom and lighting the lamp of knowledge for the next generation.',
    color: '#2196f3',
    maxAge: 80,
    biographySummary: `Teachers are educators. Typical growth path: graduating from a normal university → obtaining a teaching certificate → joining a school (primary/secondary/university) → professional rank promotion (Level 2 → Level 1 → Senior → Full Senior). University path: PhD → lecturer → associate professor → full professor. Career characteristics: plenty of holidays (summer/winter breaks) but heavy workload during term (lesson planning, grading, class management, parent communication), need for continuous innovation in repetitive teaching work, irreplaceable sense of accomplishment from student growth. Beyond teaching: class advisor duties (most demanding but most rewarding), teaching research, public demonstration lessons, research projects. Mid-life challenges: career burnout, professional title pressure, education reform, increasing difficulty in student management, gap between societal expectations and reality. Typical achievements: nurturing outstanding students, winning teaching awards, publishing textbooks/works, becoming a distinguished teacher/discipline leader, founding a school. Representatives: Confucius (teacher of all ages), Tao Xingzhi (educator), Zhang Guimei (mountain school for girls), Yu Yi (Chinese language teaching authority).`,
    lifeStages: [
      { stage: 'Aspiration', ageRange: '12-18', description: 'Developing interest in teaching. Enjoying helping classmates, good communication skills, influenced by a particular teacher.' },
      { stage: 'Education', ageRange: '18-22', description: 'Studying at a normal university. Pedagogy, psychology, subject teaching methods, teaching practice.' },
      { stage: 'Novice', ageRange: '22-28', description: 'Joining a school. From novice teacher to mastering the classroom: lesson planning, class management, parent communication.' },
      { stage: 'Growth', ageRange: '28-35', description: 'Teaching backbone. Taking on public demonstration lessons, participating in teaching competitions, serving as class advisor, publishing educational research papers.' },
      { stage: 'Maturity', ageRange: '35-50', description: 'Senior teacher / discipline leader. Mentoring younger teachers, leading teaching research projects, teaching graduating classes.' },
      { stage: 'Legacy', ageRange: '50+', description: 'Educational master. Distinguished teacher, authoring educational works, education supervision, cultivating future educators.' },
    ],
  },
  {
    id: 'chef',
    name: 'Chef',
    icon: '👨‍🍳',
    description: 'Spreading happiness through cuisine — an artist of the palate.',
    color: '#ff5722',
    maxAge: 70,
    biographySummary: `Chefs are creators of gastronomy. Typical growth path: developing interest in cooking → culinary school/apprenticeship → kitchen apprentice → rotating through stations (prep, cutting, wok) → sous chef/executive sous chef → executive chef → opening own restaurant. Career characteristics: standing work (8-12 hours daily), hot environment (kitchen temperatures often above 35°C/95°F), busiest on holidays (hardest when others rest), high technical standards (knife skills, heat control, seasoning), balancing creativity with standardization. Specialties: Chinese cuisine (Sichuan, Shandong, Cantonese, Huaiyang, etc.), Western (French, Italian, American), Japanese, baking, pastry. Mid-life challenges: declining physical strength (standing-related leg/back issues), industry competition, innovation pressure, cultivating successors. Typical achievements: Michelin stars, Black Pearl ratings, national cooking competition wins, founding own brand restaurants, publishing culinary works, television appearances. Representatives: André Chiang, Chen Xiaoqing (A Bite of China), intangible cultural heritage inheritors of various cuisines.`,
    lifeStages: [
      { stage: 'Discovery', ageRange: '8-16', description: 'Developing interest in cooking. Helping with family meals, watching cooking shows, trying to cook.' },
      { stage: 'Apprenticeship', ageRange: '16-22', description: 'Learning at culinary school or apprenticing with a master. Starting with fundamentals: knife skills, wok techniques, heat control, seasoning basics.' },
      { stage: 'Grind', ageRange: '22-28', description: 'Kitchen apprentice / prep cook / cutting station. Starting from the bottom — hard work and perseverance are essential.' },
      { stage: 'Wok Master', ageRange: '28-35', description: 'Becoming a wok chef (station chef). Independent plating, developing new dishes, competing.' },
      { stage: 'Head Chef', ageRange: '35-45', description: 'Executive chef / head chef. Managing kitchen team, designing menus, cost control, culinary innovation.' },
      { stage: 'Legacy', ageRange: '45+', description: 'Opening a restaurant, teaching, culinary consulting. Mentoring apprentices, passing down techniques, authoring books.' },
    ],
  },
  {
    id: 'pilot',
    name: 'Pilot',
    icon: '✈️',
    description: 'Soaring through the skies, where every takeoff and landing is a pursuit of precision.',
    color: '#3f51b5',
    maxAge: 70,
    biographySummary: `Pilots are professionals who operate aircraft. Typical growth path: passing aviation medical exams (very strict) → flight school/aviation academy → private/commercial license → first officer → captain → instructor/examiner. Civil aviation recruitment begins in high school with rigorous medical screening (vision, height, psychological, etc.). Career characteristics: unique work environment (cockpit), immense responsibility (hundreds of passengers safe), strong discipline and psychological resilience required, shift work (time zones, early mornings/late nights), flight hour limits for safety. Daily routine: pre-flight preparation (weather, route, aircraft check) → takeoff → cruise → landing → overnight stay/return home. Mid-life challenges: career progression (first officer to captain requires accumulated hours and exams), health changes (especially vision), limited family time. Typical achievements: being promoted to captain, receiving safe flight awards (e.g., 10,000 safe flight hours), special missions (disaster relief supplies, citizen evacuation), aircraft type upgrades (flying larger aircraft like A380/B777). Representatives: Liu Chuanjian (hero captain of Sichuan Airlines' miraculous emergency landing).`,
    lifeStages: [
      { stage: 'Dreaming', ageRange: '10-18', description: 'Dreaming of the sky. Watching planes take off and land, building model airplanes, protecting eyesight in preparation for recruitment.' },
      { stage: 'Flight Training', ageRange: '18-23', description: 'Learning at flight school. Theory (aerodynamics, meteorology, navigation), simulator training, first solo flight, earning pilot license.' },
      { stage: 'First Officer', ageRange: '23-30', description: 'Joining an airline, from observer to first officer. Accumulating flight hours, gaining experience in all weather conditions.' },
      { stage: 'Captain', ageRange: '30-40', description: 'Becoming captain. Independently responsible for the entire aircraft and passenger safety, leading the crew, handling all kinds of emergencies.' },
      { stage: 'Instructor', ageRange: '40-50', description: 'Instructor/examiner. Training new first officers, simulator instruction, route checks, safety management.' },
      { stage: 'Executive', ageRange: '50+', description: 'Transitioning from flying. Moving into airline management, safety supervision, training administration, industry consulting.' },
    ],
  },
  {
    id: 'civil-servant',
    name: 'Civil Servant',
    icon: '🏛️',
    description: 'Serving the nation and its people — writing a chapter of public service within the system.',
    color: '#607d8b',
    maxAge: 75,
    biographySummary: `Civil servants work in government agencies managing public administration and serving the public. Typical growth path: passing the civil service exam after graduation → onboarding (1-year probation) → entry-level officer → deputy section chief → section chief → division director and above. Career characteristics: stable employment ("iron rice bowl"), moderate income with comprehensive benefits (full social insurance and housing fund, generous pension), relatively high social status, regular working pace. Daily work: document processing, meeting organization, policy implementation, public reception, research reports, project approvals. Department differences: Party system (organization, propaganda, discipline inspection), government system (development & reform, finance, education, public security), grassroots townships (direct public service). Mid-life challenges: career ceiling, job burnout, formalism pressure, integrity requirements (anti-corruption climate). Typical achievements: rank promotion, awards, contributions to major policy formulation/implementation, completing urgent/difficult tasks (flood relief, poverty alleviation, pandemic response). Representatives: Jiao Yulu, Kong Fansen, exemplary grassroots civil servants.`,
    lifeStages: [
      { stage: 'Aspiration', ageRange: '16-22', description: 'Developing the ideal of serving the people. Following current affairs, learning government document writing, preparing for civil service exams.' },
      { stage: 'Exam Preparation', ageRange: '22-25', description: 'Preparing for and taking the civil service exam. Administrative aptitude test, essay writing, interviews — highly competitive (popular posts can be 1000:1).' },
      { stage: 'Onboarding', ageRange: '25-30', description: 'Newly hired entry-level officer. Learning government workflow, writing materials, organizing meetings, coordination and communication. Grassroots training.' },
      { stage: 'Backbone', ageRange: '30-40', description: 'Becoming a departmental backbone. Independently handling business, participating in important policy-making, temporary assignments at different levels.' },
      { stage: 'Leadership', ageRange: '40-50', description: 'Deputy director/division director level. Managing teams, making decisions, coordinating resources, driving implementation.' },
      { stage: 'Service', ageRange: '50+', description: 'Senior leader or stepping to second line. Passing on experience, providing advice, mentoring younger cadres.' },
    ],
  },
]
