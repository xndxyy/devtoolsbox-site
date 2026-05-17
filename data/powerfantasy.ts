// Power Fantasy Experience Mode - Power Fantasy Template Data Definitions
// Each template represents a classic power fantasy genre, including golden fingers, core tropes, and AI style instructions

export interface PowerFantasyTemplate {
  id: string
  name: string        // Genre name
  icon: string
  description: string
  color: string
  maxAge: number
  // Golden finger - the protagonist's unique ability
  goldenFinger: string
  // Core satisfying tropes
  coreTropes: string[]
  // Narrative style instructions (injected into AI prompt)
  styleGuide: string
  // Age at which to start summary narrative mode (skip details for uneventful years)
  summaryStartAge: number
  // Number of years to skip per summary jump
  summaryYearSpan: number
}

export const powerFantasyTemplates: PowerFantasyTemplate[] = [
  {
    id: 'reborn-revenge',
    name: 'Reborn Revenge',
    icon: '🔄',
    description: 'Schemed against and died with resentment in a past life, only to wake up back in your teenage years. With twenty years of future memories in hand, this time you will not repeat the same mistakes.',
    color: '#ff6f00',
    maxAge: 80,
    goldenFinger: 'Rebirth Memory: Full retention of past life memories and experiences, knowledge of all major events over the next twenty years — stock market trends, property prices, technological shifts. Recognition of everyone who is outwardly friendly but secretly malicious, and the true benefactors.',
    coreTropes: [
      'Betrayed by the most trusted person in the past life → Take precautions early in this life',
      'Copy successful works/startups from the future → Become an industry giant ahead of time',
      'Make opposite choices at critical junctures compared to the past life → Life completely reversed',
      'Make everyone who harmed you in the past life pay one by one → Perfect face-slapping',
      'Missed opportunities from the past life (first love/benefactors) → Cherish them this time',
    ],
    styleGuide: `Power fantasy style: Reborn Revenge. Core logic is "the information advantage of the reborn" — the protagonist possesses future memories and always makes the optimal choice at key decision points.
Writing Points:
- Early (teenage years): Low-key development, quiet accumulation. Use memories to test the waters in academics/stock market/starting small businesses.
- Mid (ages 20-30): Rapid rise. Career takes off, revenge plot gradually unfolds, past life enemies emerge one by one and get slapped.
- Climax (ages 30-40): Peak confrontation. Face-to-face showdown with the greatest enemy from the past life, total domination.
- Late (ages 40+): Achievement and fame. Business empire established, family happiness, all past life regrets resolved.
- Key driver: Every time the protagonist encounters someone from their past life, they must display an "already seen through everything" demeanor.
- Narrative tone: Satisfying, cathartic, with a composed "already figured it all out" attitude. Use second person "you".`,
    summaryStartAge: 35,
    summaryYearSpan: 4,
  },
  {
    id: 'urban-cultivator',
    name: 'Urban Cultivator',
    icon: '🐉',
    description: 'A hidden cultivator in the city. On the surface an ordinary student or office worker, but in reality possessing ancient inherited techniques that defy heaven, navigating between the mortal and cultivation worlds.',
    color: '#7c4dff',
    maxAge: 120,
    goldenFinger: 'Ancient Inheritance: Accidentally obtained the complete inheritance of an ancient great cultivator (techniques + alchemy + formations + artifact crafting). Cultivation speed is a hundred times that of ordinary cultivators. Also possesses a storage ring containing spiritual herbs, artifacts, and cultivation resources.',
    coreTropes: [
      'Stumble upon a fortuitous encounter and obtain inheritance → Soar to greatness',
      'Playing pig to eat the tiger → Seemingly ordinary but actually a peerless master',
      'Low-key on campus or in the workplace → Reveal transcendent strength when danger strikes',
      'Surrounded by beauties → Various goddesses drawn to the protagonist\'s aura',
      'Martial arts families or hidden sects look down on the protagonist → Get face-slapped',
    ],
    styleGuide: `Power fantasy style: Urban Cultivator. Integrates cultivation elements into modern city life.
Writing Points:
- Early (teenage years): Accidentally obtain the inheritance, cultivate quietly. Use minor spells to solve problems on campus, first display of brilliance.
- Mid (ages 20-30): Small achievements in cultivation. Live a city life (work/startup/school) while cultivating. Encounter conflicts with martial arts families and hidden sects, overpower them with strength.
- Late (ages 30+): Great accomplishments. Establish your own faction, dominate both the mortal and cultivation worlds, become a legend.
- Core driver: Every conflict scene must feature "realm crushing" — the stronger the opponent, the more astonishing the protagonist\'s displayed power.
- Narrative tone: Mysterious and calmly confident. Breakthrough scenes must be written with grandeur. Use second person "you".
- After age 40, non-core plot points can be summarized across multiple years, but cultivation breakthroughs, major battles, and important social occasions must be described in detail.`,
    summaryStartAge: 40,
    summaryYearSpan: 5,
  },
  {
    id: 'system-lottery',
    name: 'System Lottery',
    icon: '🎰',
    description: 'Ding! The Ultimate Check-in System has been bound. Complete daily tasks to earn rewards, check in and draw for god-tier equipment. Others train for ten years — you just need one day of check-ins.',
    color: '#00c853',
    maxAge: 80,
    goldenFinger: 'Omnipotent System: Includes a check-in system (daily rewards for checking in), a quest system (complete tasks for experience/skills/items), a lottery system (spend points for rare items), and a shop system (exchange points for various abilities). The system proactively publishes missions to guide the protagonist toward greater strength.',
    coreTropes: [
      'Check-in at the start to receive a god-level newbie gift pack → Take off immediately',
      'Skills others need to practice tirelessly → You master with one click',
      'System quests seem simple → Rewards are ridiculously generous',
      'Encounter danger and happen to draw a life-saving item → Precision face-slapping',
      'Every upgrade triggers new features/modules → Getting stronger and stronger',
    ],
    styleGuide: `Power fantasy style: System Lottery / Check-in. Core is "system golden finger crushes everything."
Writing Points:
- Everything that breaks logic is justified — "this is how the system is designed."
- Every major event must highlight the system\'s presence: "Ding! The system informs you that..."
- Lottery/check-in scenes where good items are obtained must be described in detail, letting readers feel the joy of "incredible luck."
- The interaction between the system and the protagonist (banter/routines) is a major selling point.
- Fast pacing: immediately after obtaining an ability, there should be an opportunity to use it (show off and face-slap).
- Narrative tone: Humorous and lighthearted, with the characteristic "system novel" tone. Use second person "you".
- After age 40, uneventful years can be summarized across multiple years, but major milestones like "first SSS-rank reward" and "showdown with the strongest enemy" must be detailed.`,
    summaryStartAge: 40,
    summaryYearSpan: 3,
  },
  {
    id: 'miracle-doctor',
    name: 'Miracle Doctor Descends the Mountain',
    icon: '💊',
    description: 'The sole heir of a reclusive miracle doctor hidden deep in the mountains. At age twenty, you are sent down the mountain to cultivate through worldly experience. A silver needle in your hand can raise the dead and restore flesh to bones — but master said: keep a low profile. As low as possible.',
    color: '#d50000',
    maxAge: 80,
    goldenFinger: 'Peerless Medical Skills: A complete medical system inherited from a hidden medical sect — acupuncture to unblock meridians, pills to cure all ailments, qi observation to diagnose at a glance. Also possesses an ancient martial arts internal technique for self-defense. Master is a reclusive miracle doctor, and you hold the "Medical Sect Secret Canon" recording lost ancient formulas.',
    coreTropes: [
      'Encounter a wealthy or powerful person struck by a terminal illness → Major hospitals helpless → A single needle from the protagonist cures them',
      'Looked down upon as a country doctor → Reveal medical skills and shock the entire room',
      'During treatment, cross paths with beautiful women from the patient\'s family → Soulmate +1',
      'Questioned by peers (Western medical experts or traditional Chinese medicine families) → Overwhelm them with skill',
      'Treatment leads to larger underworld conflicts → Dual advancement on martial arts and medicine fronts',
    ],
    styleGuide: `Power fantasy style: Miracle Doctor Descends the Mountain. Core is "medical skills that reach the heavens, wanting a low profile but strength won\'t allow it."
Writing Points:
- Early (initial descent): Unintentionally display medical skills in various settings, save one key figure after another, accumulate connections and reputation.
- Mid: Establish your own clinic/hospital/pharmaceutical factory, clash with medical conglomerates and Western medicine authorities, use ancient medicine to crush incurable diseases modern medicine cannot solve.
- Late: Get involved in deeper underworld conflicts, gradually uncover secrets behind the medical sect inheritance, crush all opponents with both medicine and ancient martial arts.
- Every treatment scene must follow the classic three-part formula: "Western medicine helpless → protagonist easily solves it → entire room in shock."
- Narrative tone: Steady and confident, with a touch of calm detachment. Medical descriptions should feel professional (acupoints, herb names, pulse conditions) but not overly obscure. Use second person "you".
- After age 45, non-critical years can be summarized across multiple years, but every stunning medical case must be detailed.`,
    summaryStartAge: 45,
    summaryYearSpan: 3,
  },
  {
    id: 'war-god-return',
    name: 'War God Returns',
    icon: '⚡',
    description: 'The world\'s number one military king, the "Lord of the Night" of the underworld. Tired of living on the edge, you return to the city to live as an ordinary person. But trouble always finds you.',
    color: '#ff1744',
    maxAge: 70,
    goldenFinger: 'Military King Combat Power: Elite special forces combat capabilities honed by the world\'s top soldier — proficient in hand-to-hand combat, firearms, tactics, and driving. Mastery of various assassination and counter-surveillance techniques. Vast connections accumulated overseas: politicians, business tycoons, and underworld leaders all owe you favors. Possession of a covert intelligence network.',
    coreTropes: [
      'Provoked by various small-time thugs right after returning home → One glance/one move subdues them',
      'Former comrades/subordinates in trouble call for help → Rally old squad to handle everything',
      'Looked down upon by mother-in-law or relatives as "just a soldier" → Reveal true identity and shock everyone',
      'A major force foolishly provokes the protagonist\'s family or lover → Drop the disguise, crush an entire organization single-handedly',
      'Various old enemies and grudges come knocking → Crush them one by one',
    ],
    styleGuide: `Power fantasy style: War God Returns. Core is "trying to return to a low-key life but strength won\'t allow it, and idiots keep bringing trouble to your doorstep."
Writing Points:
- Early: Seek a peaceful life but trouble keeps coming. Various minor conflicts showcase the protagonist\'s unfathomable strength — but only the tip of the iceberg.
- Mid: Forced to gradually reveal strength to protect those around you, attracting greater enemies and more complex situations.
- Late: Old enemies arrive en masse or international forces get involved. The protagonist unleashes full power and crushes all enemies completely.
- Formula for every conflict scene: Provocation → Restraint → Opponent pushes too far → One move solution → Opponent shocked and regretful.
- "Not a single one of you can fight" is the core vibe.
- Narrative tone: Cold and crisp, fight descriptions clean and decisive. A detached "above it all" air in daily life, fierce and ruthless when fighting. Use second person "you".
- After age 40, peaceful years can be summarized across multiple years, but every battle or conflict must be described in detail.`,
    summaryStartAge: 40,
    summaryYearSpan: 3,
  },
  {
    id: 'mega-rich',
    name: 'Mega Rich Life',
    icon: '💰',
    description: 'Abandoned by your biological father for twenty years, you suddenly receive a lawyer\'s letter — the family\'s trillion-dollar inheritance awaits you, on the condition that you prove your ability.',
    color: '#ffd600',
    maxAge: 80,
    goldenFinger: 'Trillion-Dollar Inheritance + Business Talent: Heir of a hidden wealthy family, possessing enormous startup capital and business resources. A naturally acute sense for the market and a sharp investment eye. Plus a loyal old butler (actually a top-tier business consultant trained by the family) to assist you.',
    coreTropes: [
      'Looked down upon as a poor nobody → Spend lavishly and shock everyone present',
      'Competitors or villains use underhanded tactics → Crush them with the power of capital',
      'Beautiful women see the protagonist\'s wealth and talent → Take the initiative to get close',
      'Seemingly impossible business challenges → Solve them with genius business acumen',
      'Power struggles within the family → Silence all doubters with strength',
    ],
    styleGuide: `Power fantasy style: Mega Rich / Business Mogul. Core is "money is not the problem — the problem is having too much money and not knowing how to spend it."
Writing Points:
- Early: Inherit the estate, learn business operations. Looked down upon by various people → slap them with money and business acumen. Small investments yield massive returns.
- Mid: Build your own business empire. Acquisitions, controlling stakes, IPOs — defeat one opponent after another in corporate warfare. Encounter true business geniuses and heirs of prestigious families for heavyweight clashes.
- Late: Become a business godfather. Ultimate confirmation of charitable work, social influence, and status within the family.
- Spending scenes should be vivid (buying luxury cars, mansions, private jets, art) — let readers feel "it\'s great to be rich."
- Don\'t just write about spending money — business IQ and strategic vision are the core competitive advantages.
- Narrative tone: Composed and magnanimous, orchestrating from behind the scenes. Business decisions must have logic, not rely on pure luck. Use second person "you".
- After age 50, during career stability, multi-year summaries are fine, but major acquisitions, corporate battles, and charity events must be detailed.`,
    summaryStartAge: 50,
    summaryYearSpan: 4,
  },
]
