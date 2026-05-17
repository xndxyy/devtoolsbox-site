// Political Life Mode - Political Path Data Definitions
// Each path references the career trajectories of real political figures, used by AI to generate more authentic stories

export interface PoliticalPath {
  id: string
  name: string
  icon: string
  description: string
  color: string
  maxAge: number
  // Core philosophy of the path
  corePhilosophy: string
  // Reference figure and biographical knowledge
  biographySummary: string
  // Key life stages of the path
  lifeStages: {
    stage: string
    ageRange: string
    description: string
  }[]
}

export const politicalPaths: PoliticalPath[] = [
  {
    id: 'business-to-politics',
    name: 'Business to Politics',
    icon: '🏦',
    description: 'After amassing vast wealth and influence in the business world, pivots into politics. Governs with a business mindset, drives change through capital power.',
    color: '#c62828',
    maxAge: 85,
    corePhilosophy: 'Businessman governance: business success proves capability; politics is business at a higher level. Negotiation, deal-making, and branding are core skills.',
    biographySummary: `Reference figure: Donald Trump.
Career trajectory: Born into real estate, inherited his father's business and expanded into Manhattan's top-tier properties, building the Trump brand (hotels, casinos, golf courses, TV show "The Apprentice"). In 2016, ran for US President as a political outsider with the slogan "Make America Great Again," defeating Hillary Clinton. Governing style: Twitter governance, anti-establishment, America First, tax cuts, trade wars. Lost re-election in 2020 but maintained enormous political influence.
Key abilities: The Art of the Deal, media manipulation (creating buzz, controlling public opinion), brand marketing, crisis management.
Typical traits: Adept at leveraging media exposure, directly engaging grassroots supporters, disregarding traditional political rules, personal brand equals political brand.`,
    lifeStages: [
      { stage: 'Accumulation', ageRange: '20-35', description: 'Building wealth and experience in the business world. Establishing one\'s own corporate empire and personal brand.' },
      { stage: 'Transition', ageRange: '35-45', description: 'Beginning to engage in public affairs. Accumulating political capital through media exposure, philanthropy, and political donations.' },
      { stage: 'Launch', ageRange: '45-55', description: 'Formally entering politics. Running for public office, proposing disruptive political platforms, attracting voters dissatisfied with the status quo.' },
      { stage: 'Governance', ageRange: '55-65', description: 'Holding power and governing. Implementing one\'s own policy agenda, navigating the existing political system, facing impeachment and scandals.' },
      { stage: 'Influence', ageRange: '65-75', description: 'Continuing to wield political influence after re-election or stepping down. Writing books, cultivating successors, shaping the party\'s direction.' },
      { stage: 'Legacy', ageRange: '75+', description: 'Consolidating political legacy. Foundations, libraries, continuation of a family political dynasty.' },
    ],
  },
  {
    id: 'rags-to-power',
    name: 'Rags to Power',
    icon: '🌱',
    description: 'Born into poverty, relying on personal struggle and indomitable willpower, climbing step by step to the pinnacle of power. Every step is forged with blood and tears.',
    color: '#6d4c41',
    maxAge: 85,
    corePhilosophy: 'Struggle changes fate: birth is not the end. Education, diligence, seizing opportunities, and integrity are the ladders of advancement.',
    biographySummary: `Reference figure: Lee Myung-bak (former President of South Korea).
Career trajectory: Born in Osaka, Japan in 1941, returned to Korea after liberation. After his father's death, the family lived in extreme poverty. As a child, he sold rice cakes and did manual labor to survive. He attended school during the day and worked as a laborer at night. He was accepted into Korea University's Business School. During college, he was arrested for participating in student protests. After graduation, he joined Hyundai Engineering & Construction as a rank-and-file employee — earning the nickname "Bulldozer" for his relentless work ethic. Became a director at 29, CEO at 36, and developed Hyundai into Korea's largest construction company. Entered politics in 1992, winning a seat in the National Assembly. Elected Mayor of Seoul in 2002, spearheaded the Cheonggyecheon restoration project (removing an elevated highway and restoring the stream, now a Seoul landmark). Elected President of South Korea in 2007, promoting the "Green Growth" strategy during his tenure.
Key traits: Extreme diligence (16-hour workdays), strong execution (bulldozer style), understanding of ordinary people's hardships from the ground up, outstanding crisis management skills.`,
    lifeStages: [
      { stage: 'Harsh Childhood', ageRange: '0-18', description: 'Extreme family poverty. Working part-time while studying to make ends meet, maintaining excellent academic performance. Forging willpower through adversity.' },
      { stage: 'Academic Struggle', ageRange: '18-22', description: 'Entering university. Completing studies through work-study and scholarships. Participating in student activities, building a network.' },
      { stage: 'Career Rise', ageRange: '22-35', description: 'Joining a major company/institution at the entry level. Rapidly rising through extraordinary diligence and execution. Building track record and reputation.' },
      { stage: 'Corporate Peak', ageRange: '35-50', description: 'Becoming a corporate executive/industry leader. Participating in major national projects, accumulating public affairs experience and government-business relationships.' },
      { stage: 'Entering Politics', ageRange: '50-60', description: 'Transitioning into politics. Starting as mayor/minister/legislator, applying management experience to govern cities/departments. Creating landmark achievements.' },
      { stage: 'Pinnacle of Power', ageRange: '60+', description: 'Campaigning for the highest leadership position. Implementing one\'s own governing agenda during tenure. Facing various political crises and challenges.' },
    ],
  },
  {
    id: 'technocrat',
    name: 'Technocrat',
    icon: '📋',
    description: 'Rising through professional expertise and administrative competence, advancing step by step within the system. Every promotion comes from outstanding governance performance.',
    color: '#1565c0',
    maxAge: 80,
    corePhilosophy: 'Professional governance: governing a nation requires professional knowledge and management skills. Start from the grassroots, let results speak, and follow the rules of promotion.',
    biographySummary: `Reference figure: Lee Hsien Loong (former Prime Minister of Singapore).
Career trajectory: Eldest son of Lee Kuan Yew. First-class honors degree in Mathematics from the University of Cambridge (math prodigy, graduating top of his class). Later earned a Master's in Public Administration from Harvard University. Joined the Singapore Armed Forces in 1971, promoted to Brigadier General in 1984 — one of the youngest in Singapore. Left the military and entered politics in 1984, winning a seat in Parliament. Served as Minister for Trade and Industry, Minister for Finance, and Deputy Prime Minister. Became Prime Minister in 2004 and served until 2024, steering Singapore for 20 years. Governing style: calm and rational, data-driven, long-term planning, pragmatism. Promoted economic transformation, housing policy, bilingual education, population policy, and the Smart Nation initiative.
Key traits: Genius-level academic intellect, systems thinking, crisis management (1997 Asian Financial Crisis, 2008 Global Financial Crisis, COVID-19), long-term strategic vision, clean and upright public servant image.`,
    lifeStages: [
      { stage: 'Elite Education', ageRange: '10-22', description: 'Receiving elite education at top institutions. Graduating with outstanding results, cultivating systems thinking and analytical ability.' },
      { stage: 'Professional Start', ageRange: '22-30', description: 'Entering a professional field (academia/military/civil service/technology). Demonstrating exceptional professional capability, gaining early recognition.' },
      { stage: 'Fast Promotion', ageRange: '30-40', description: 'Rising quickly through professional skill and leadership talent. Transitioning from executor to manager, beginning to participate in policy-making.' },
      { stage: 'Standing Alone', ageRange: '40-50', description: 'Serving in ministerial/senior management roles. Overseeing one or more domains, driving major reforms, establishing track record.' },
      { stage: 'Steering the Ship', ageRange: '50-65', description: 'Becoming a core member of top leadership. Participating in major national/regional decisions, facing challenges such as economic crises and geopolitics.' },
      { stage: 'Transition and Handover', ageRange: '65+', description: 'Peaceful transfer of power. Continuing to contribute as advisor/elder statesman, ensuring the governance system keeps running.' },
    ],
  },
  {
    id: 'diplomat',
    name: 'Diplomatic Career',
    icon: '🌐',
    description: 'Starting as a diplomat, maneuvering on the international stage with skill. Using negotiation tactics and strategic vision to advance national interests.',
    color: '#00838f',
    maxAge: 80,
    corePhilosophy: 'Diplomacy is national destiny: safeguarding national interests amid international competition. Negotiation, alliances, strategic restraint, and soft power are the core tools.',
    biographySummary: `Reference figures: Henry Kissinger, Kofi Annan.
Kissinger's trajectory: German Jewish refugee who immigrated to the US. Earned a Ph.D. in Political Science at Harvard University, studying Metternich and Castlereagh. After an academic career, was invited in 1969 to serve as National Security Advisor, later also as Secretary of State. Led the thaw in US-China relations (secret visit to China in 1971), US-Soviet détente, and Vietnam War negotiations (awarded the Nobel Peace Prize). Authored important works including "On China" and "World Order."
Annan's trajectory: Ghanaian, studied at Macalester College in Minnesota and later at the Graduate Institute of International Studies in Geneva. Joined the United Nations in 1962, working from entry level through nearly every UN department. Elected UN Secretary-General in 1997, serving two terms until 2006. During his tenure, promoted UN reform, peacekeeping operations, and the Millennium Development Goals. Awarded the Nobel Peace Prize in 2001.
Key traits: Deep strategic thinking, cross-cultural communication skills, patience and resilience, finding win-win outcomes in complex negotiations, outstanding writing and oratory.`,
    lifeStages: [
      { stage: 'Language Foundation', ageRange: '10-18', description: 'Developing multilingual ability and cross-cultural interest. Reading extensively on history and international relations, participating in Model UN.' },
      { stage: 'Academic Accumulation', ageRange: '18-25', description: 'Pursuing advanced study in international relations, law, economics, etc. Qualifying as a diplomat or interning at an international organization.' },
      { stage: 'Entry into Diplomacy', ageRange: '25-35', description: 'Starting from entry-level posts at embassies/consulates abroad. Handling visas, consular protection, and day-to-day bilateral relations. Accumulating negotiation experience.' },
      { stage: 'Negotiation Refinement', ageRange: '35-45', description: 'Participating in major international negotiations and crisis management. Speaking for the nation at multilateral venues (UN/summits), building personal reputation.' },
      { stage: 'Diplomatic Core', ageRange: '45-60', description: 'Serving as ambassador/senior foreign ministry official. Steering major foreign policy, handling international crises, shaping national diplomatic strategy.' },
      { stage: 'Global Stage', ageRange: '60+', description: 'Serving in senior UN/international organization roles. Or becoming an international affairs advisor or scholar. Writing books, influencing the next generation.' },
    ],
  },
  {
    id: 'grassroots-cadre',
    name: 'Grassroots Cadre',
    icon: '🏘️',
    description: 'Starting from the lowest levels of township government, step by step. Understanding the suffering of the people, forging true governing capability through grassroots administration.',
    color: '#2e7d32',
    maxAge: 75,
    corePhilosophy: 'Grassroots bring true knowledge: only by understanding the people can you truly serve them. Hone mass work skills and practical problem-solving abilities in grassroots work.',
    biographySummary: `Reference figure: Jiao Yulu (model Party secretary in China).
Career trajectory: Born in 1922 into a poor farming family in Shandong. Worked as a farmhand in his youth. Joined the Chinese Communist Party in 1946. Worked in multiple locations in Henan Province, serving as Party secretary of Weishi County. In 1962, was sent to Lankao County as Party secretary — at a time when Lankao was suffering from severe flooding, sandstorms, and salinization. During his 475 days in Lankao, despite suffering from liver cancer, he traveled by bicycle and on foot across all 120+ production brigades. Led the people in planting paulownia trees to control sand, digging canals for drainage, and improving saline-alkali land. Died in 1964 at age 42. After his death, a copy of "Selected Works of Mao Zedong" was found under his pillow.
Key traits: Deep connection with the people (staying in farmers' homes to understand the real situation), pragmatic spirit (personally working in the fields), incorruptible self-discipline (no special privileges), willingness to take responsibility (working in the most difficult places), self-sacrifice for the people (working through illness until his last moment).
Modern reference: Outstanding grassroots cadres such as first Party secretaries stationed in villages and township Party secretaries across the country, who have emerged with numerous touching stories in poverty alleviation and rural revitalization.`,
    lifeStages: [
      { stage: 'Impoverished Childhood', ageRange: '0-18', description: 'Born at the grassroots, deeply aware of the people\'s hardships. Having firsthand experience of ordinary people\'s lives.' },
      { stage: 'Starting Work', ageRange: '18-25', description: 'Entering a grassroots work unit. Starting as a clerk, handling daily administrative affairs, learning mass work methods.' },
      { stage: 'Deep in the Grassroots', ageRange: '25-35', description: 'Serving in a township/subdistrict leadership role. Governing a local area, solving practical difficulties for the people. Digging wells, building roads, helping the poor, mediating disputes.' },
      { stage: 'Tackling Difficulties', ageRange: '35-45', description: 'Being assigned to the most difficult/underdeveloped areas. Leading the people to change the landscape, advancing poverty alleviation and development.' },
      { stage: 'Standing Alone', ageRange: '45-55', description: 'Serving as county/prefectural-level leadership. Coordinating regional development, driving systemic reforms. Cultivating younger cadres.' },
      { stage: 'Passing on Experience', ageRange: '55+', description: 'Guiding the next generation with rich grassroots experience. Writing books summarizing grassroots work methods. Still caring about people\'s welfare after stepping back.' },
    ],
  },
  {
    id: 'reform-pioneer',
    name: 'Reform Pioneer',
    icon: '⚡',
    description: 'Identifying flaws in the old system and driving change with extraordinary courage. Breaking through entrenched interests, carving a new path for the nation and its people.',
    color: '#e65100',
    maxAge: 85,
    corePhilosophy: 'Reform is the engine of development: dare to break established interests, dare to experiment with new systems and models. Reformers must possess firm conviction and political wisdom.',
    biographySummary: `Reference figures: Deng Xiaoping, Mikhail Gorbachev.
Deng Xiaoping's trajectory: Went to France at age 16 on a work-study program. Served as a military commander during the revolutionary war years. After the founding of the PRC, held posts including Vice Premier and General Secretary. Was sent to Jiangxi for manual labor during the Cultural Revolution. After his comeback in 1977, led the Reform and Opening Up — "It doesn't matter whether the cat is black or white, as long as it catches mice." Abolished the People's Commune system, established Special Economic Zones, restored the college entrance exam (Gaokao), demobilized a million troops, proposed "One Country, Two Systems." The 1992 Southern Tour speech further deepened reforms. Transformed China and the world.
Gorbachev's trajectory: The last leader of the Soviet Union. Born to a peasant family, studied law at Moscow State University. Rose through grassroots Komsomol work all the way to General Secretary of the CPSU. Introduced Perestroika (restructuring) and Glasnost (openness) policies. Ended the Cold War, withdrew troops from Eastern Europe, reconciled with the West. But the reforms ultimately led to the dissolution of the Soviet Union.
Key traits: Strategic vision (seeing the big direction), political courage (daring to touch core interests), pragmatism (not dogmatic), sense of reform timing (grasping the right moment), unwavering in the face of controversy.`,
    lifeStages: [
      { stage: 'Early Experience', ageRange: '0-25', description: 'Living through a period of social change. Having firsthand experience of the old system\'s shortcomings, conceiving reform ideas.' },
      { stage: 'Within-System Accumulation', ageRange: '25-40', description: 'Gradually rising within the existing system. Deeply understanding all aspects of institutional operation, accumulating the experience and connections needed for reform.' },
      { stage: 'Reform Incubation', ageRange: '40-50', description: 'Conducting small-scale pilot reforms within one\'s responsible domain. Testing reform ideas, accumulating experience, forming a reform team.' },
      { stage: 'Full-Scale Push', ageRange: '50-65', description: 'Entering top decision-making circles, driving systemic reforms. Breaking entrenched interests, facing resistance from conservatives, requiring superb political skill.' },
      { stage: 'Consolidation and Deepening', ageRange: '65-75', description: 'Period of consolidating reform gains. Preventing reform backsliding, cultivating reform successors, institutionalizing reforms.' },
      { stage: 'Historical Assessment', ageRange: '75+', description: 'The settling of reform legacy. Over time, the successes and failures of reform become gradually clear.' },
    ],
  },
  {
    id: 'revolutionary',
    name: 'Revolutionary Fighter',
    icon: '✊',
    description: 'Faced with injustice and oppression, choosing to take up arms or take to the streets. Paving the way with blood and sacrifice, moving from underground to center stage.',
    color: '#b71c1c',
    maxAge: 80,
    corePhilosophy: 'Give me liberty or give me death: when the system cannot be changed through peaceful means, revolution is the last resort. Faith, sacrifice, and organization are the weapons of revolutionaries.',
    biographySummary: `Reference figures: Nelson Mandela, Fidel Castro.
Mandela's trajectory: Son of a Thembu tribal chief in South Africa. Joined the African National Congress (ANC) in 1944, leading protests against apartheid. Arrested in 1962, sentenced to life imprisonment in the 1964 Rivonia Trial. Served 18 years on Robben Island, continuing to study, exercise, and discuss with fellow prisoners even behind bars. Released in 1990, awarded the Nobel Peace Prize in 1993, elected South Africa's first Black president in 1994. Advocated national reconciliation rather than revenge, established the Truth and Reconciliation Commission.
Castro's trajectory: Born to a wealthy Cuban family, studied law at the University of Havana. Led the failed attack on the Moncada Barracks in 1953, defended himself in court ("History will absolve me"). Met Che Guevara while in exile in Mexico. Returned to Cuba in 1956 with 82 men aboard the Granma yacht, waging guerrilla warfare in the mountains. Overthrew the Batista regime in 1959. Ruled for nearly 50 years, facing US sanctions, the Bay of Pigs invasion, and the Cuban Missile Crisis.
Key traits: Unwavering conviction, extraordinary personal charisma, indomitable spirit in adversity, powerful organizational and mobilization capabilities, the courage to sacrifice everything for one's ideals.`,
    lifeStages: [
      { stage: 'Awakening', ageRange: '10-20', description: 'Directly experiencing or witnessing social injustice, beginning to awaken ideologically. Reading progressive books, encountering revolutionary ideas.' },
      { stage: 'Underground Activities', ageRange: '20-30', description: 'Joining underground organizations or political parties. Engaging in secret propaganda, mass organization, fundraising, and other activities. Multiple arrests or forced exile.' },
      { stage: 'Armed Struggle', ageRange: '30-40', description: 'Leading armed struggle or large-scale mass movements. Guerrilla warfare, organizing strikes, establishing bases. Persisting in extremely harsh conditions.' },
      { stage: 'Prison Years', ageRange: '40-60', description: 'Imprisoned or in prolonged exile. Continuing the struggle from prison, becoming an internationally recognized political prisoner and spiritual leader.' },
      { stage: 'Victory in Power', ageRange: '60-75', description: 'Taking power after revolutionary victory or release. Transitioning from fighter to statesman, driving national reconstruction and reconciliation.' },
      { stage: 'Historical Monument', ageRange: '75+', description: 'Becoming the nation\'s spiritual symbol. Cultivating successors to ensure the revolutionary legacy endures. Writing books and memoirs.' },
    ],
  },
  {
    id: 'strong-leader',
    name: 'Strong Leader',
    icon: '🛡️',
    description: 'Coming from intelligence/military backgrounds, upholding national security and order as the highest creed. Taking power in times of crisis, reshaping the nation with an iron fist.',
    color: '#37474f',
    maxAge: 80,
    corePhilosophy: 'Order above all: national security and stability are prerequisites for development. A strong central authority is the safeguard against internal and external threats.',
    biographySummary: `Reference figures: Vladimir Putin, Park Chung-hee (former President of South Korea).
Putin's trajectory: Born in Leningrad in 1952. Graduated from the law faculty of Leningrad State University, then joined the KGB, serving for 16 years in East Germany doing intelligence work. Returned to Russia in 1990 and entered the St. Petersburg city government. Transferred to Moscow after outstanding performance. Appointed director of the Federal Security Service (FSB) in 1998. Became Prime Minister in 1999, and later that year Yeltsin suddenly resigned, making Putin acting president. Elected president in 2000. Governing style: tough and decisive, restoring national authority, cracking down on oligarchs, Chechen war, responding to Western sanctions, reasserting Russia's great power status. Long tenure has been controversial.
Park Chung-hee's trajectory: President of South Korea, born in 1917 to a poor farming family. Worked as an elementary school teacher after normal school. During the Japanese colonial period, entered a puppet military academy in Manchuria. After Korea's founding, he joined the military and led a military coup in 1961. Ruled for 18 years (1961–1979), overseeing South Korea's economic takeoff (the Miracle on the Han River), promoting export-oriented industrialization. Iron-fisted rule: restricted political freedoms, suppressed opposition, established the powerful Korean Central Intelligence Agency (KCIA). Assassinated in 1979. To this day, South Koreans remain sharply divided in their assessment — economic development hero vs. dictator.
Key traits: Ruthless and decisive, national security above all, economic pragmatism, long-term strategic planning, unwavering in the face of domestic and external pressure.`,
    lifeStages: [
      { stage: 'Youth Forging', ageRange: '15-25', description: 'Growing up in harsh conditions. Studying law/military/intelligence professions, cultivating discipline and resilience.' },
      { stage: 'Intelligence/Military Career', ageRange: '25-35', description: 'Serving in intelligence or military systems. Carrying out covert missions, honing judgment and execution. Building a reliable network of comrades.' },
      { stage: 'Entering Politics', ageRange: '35-45', description: 'Moving from the covert world into the public domain. Joining core government departments, demonstrating crisis management and organizational leadership.' },
      { stage: 'Reaching the Summit', ageRange: '45-55', description: 'Being thrust to the pinnacle of power during a national crisis. Quickly consolidating power, building a strong leadership image.' },
      { stage: 'Iron-Fisted Governance', ageRange: '55-70', description: 'Long-term rule. Implementing national security policies and economic development plans. Dealing with international sanctions, geopolitical conflicts, and internal opposition.' },
      { stage: 'Power Transition', ageRange: '70+', description: 'Arranging a successor to ensure policy continuity. Maintaining long-term influence through institutional design. Controversy over historical legacy remains constant.' },
    ],
  },
]
