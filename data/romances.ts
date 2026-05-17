// Romance Experience Mode - Romance Partner Data Definitions
// Each partner represents a different style of love story, with distinct personalities, meeting stories, and narrative styles

export interface RomancePartner {
  id: string
  name: string
  icon: string
  description: string
  color: string
  maxAge: number
  // The partner's personality traits
  personality: string
  // How you meet
  meetStory: string
  // Narrative style guide for this romance
  romanceStyle: string
  // Challenges this relationship may face
  challenges: string[]
  // Reference stages of the romance
  romanceStages: {
    stage: string
    ageRange: string
    description: string
  }[]
}

export const romancePartners: RomancePartner[] = [
  {
    id: 'childhood-sweetheart',
    name: 'Childhood Sweetheart',
    icon: '🌸',
    description: 'You grew up together, and this person knows you better than anyone in the world. The innocence of childhood friendship slowly ferments over the years into the deepest love.',
    color: '#ec407a',
    maxAge: 75,
    personality: 'Gentle, considerate, understanding, and responsible. Appears delicate but is actually strong-willed, always silently standing by your side when you need it most. Familiar with all your strengths and weaknesses, knowing when to give you space and when to pull you up.',
    meetStory: 'You have known each other since childhood — maybe neighbors, maybe kindergarten classmates, maybe children of family friends. Playmates since you were in diapers, going to school together, doing homework together, getting scolded together, growing up together. This person has been part of your entire childhood and youth, one of the most important presences in your life.',
    romanceStyle: `Core Theme: The gentle transformation from friendship to love, two people who know each other best slowly realizing how important the other truly is.
Writing Guidelines:
- Childhood (0-18 years): Innocent daily life — going to school together, playing together, protecting each other. This person is positioned as your "best friend," but there are always moments that make your heart skip a beat.
- Adolescence (18-22 years): Beginning to face the crossroads of feelings — perhaps the epiphany of moving from friendship to love, or the test of studying in different cities. That sudden realization of "the person I like has been right here all along."
- Young Adult (22-30 years): The sweetness after confirming the relationship — finding new romance in familiar companionship. Building a life together, supporting each other. May experience major life events like meeting the parents, engagement, or moving in together.
- Middle Age (30-45 years): The bittersweetness of married life — balancing career and family, children's education, the test of the seven-year itch. But because you know each other well enough, you can get through the toughest times together.
- Maturity (45+ years): The warmth of growing old together — watching sunsets, spending time with grandchildren, reminiscing about the journey together. That grounded feeling of "only you truly understand me in this life."
- Narrative Tone: Warm and delicate, with a texture of time passing. Daily descriptions should feel lived-in (cooking together, watching TV, bickering and making up). Use second-person "you."`,
    challenges: [
      'Being too familiar may lack the novelty and passion in romance',
      'The test of separation due to studying/working in different cities',
      'Pressure from family expectations ("When are you getting married?")',
      'The seven-year itch and midlife crisis',
    ],
    romanceStages: [
      { stage: 'Innocent Companions', ageRange: '0-12', description: 'Playmates who grew up together. Sharing all the joys and secrets of childhood, the most trusted person to each other.' },
      { stage: 'Budding Feelings', ageRange: '12-18', description: 'The sprouting of adolescent feelings. The subtle shift from "best friend" to "more than a friend."' },
      { stage: 'Confessing Feelings', ageRange: '18-25', description: 'Breaking through that barrier. From friendship to love, two people who know each other best begin relating as lovers.' },
      { stage: 'Building Together', ageRange: '25-35', description: 'Struggling for the future together. Career beginnings, houses and cars, starting a family — overcoming all difficulties with mutual understanding.' },
      { stage: 'Growing Old Together', ageRange: '35-55', description: 'The calm and undercurrents of married life. Protecting each other through ordinary days.' },
      { stage: 'White-Haired Companions', ageRange: '55+', description: 'Surrounded by children and grandchildren, reminiscing about the past. The luckiest thing in life was knowing you since childhood.' },
    ],
  },
  {
    id: 'campus-crush',
    name: 'Campus Crush',
    icon: '📖',
    description: 'The purest flutter of youth. The person you secretly stole glances at on the sports field, the eternal light of your memories.',
    color: '#42a5f5',
    maxAge: 70,
    personality: 'Sunny, cheerful, excellent in character and learning, sincere with others. Someone admired at school — maybe top of the class, maybe outstanding on the sports field, maybe shining on the stage at school performances. But privately, there is a softer side, little secrets only you know.',
    meetStory: 'It was an ordinary school day — maybe the first day of freshman orientation, and you took one extra glance in the crowd; maybe an accidental look in the library; maybe that dazzling figure on the sports field. However it happened, without any warning, that person walked into your world.',
    romanceStyle: `Core Theme: The most beautiful first love of innocent times, full of youthful heart-fluttering excitement.
Writing Guidelines:
- Childhood (0-16 years): Ordinary growing up, but there are always some "omens" about this person — maybe you met once as children, maybe you heard their name long ago.
- First Meeting (16-18 years): Meeting at school. Maybe deskmates, adjacent seats, same club, preparing for a competition together. Those deliberately engineered encounters, passing notes, walking home together, secretly gazing at their profile lost in thought.
- Passionate Love (18-22 years): Sweetness after confirming the relationship. Dating together, studying together, dreaming of the future together. Even holding hands purely makes your heart race, the first date so nervous you can't speak.
- Test Period (22-28 years): Facing the test of reality after graduation. Long-distance relationship, work pressure, differences in lifestyle. Can you still hold on to your original intentions?
- Maturity (28-40 years): If you make it through the trials, you are the ones who cherish each other most. From campus to wedding dress, from innocence to maturity. Those youthful promises, all fulfilled one by one.
- Reflection (40+ years): Youth has passed but love remains. Looking at the fine lines around their eyes, finding them even more beautiful than before. Going back to visit the school together — the paths you walked together are still there.
- Narrative Tone: Fresh and innocent, with the unique throbbing and shyness of youth. Campus scenes should be vividly depicted (sunlight filtering through leaves onto desks, the evening breeze on the sports field, the quiet corners of the library). Use second-person "you."`,
    challenges: [
      'The agony of unrequited love and the courage to confess',
      'Life crossroads like college entrance exams and graduation',
      'The longing and trials of long-distance relationships',
      'The identity transition from campus to society',
    ],
    romanceStages: [
      { stage: 'Ordinary Childhood', ageRange: '0-16', description: 'Ordinary growing up, but the red thread of fate was already quietly tied.' },
      { stage: 'Heart Flutter', ageRange: '16-18', description: 'First meeting at school. That sunny afternoon when you first noticed that person in the classroom.' },
      { stage: 'Innocent Romance', ageRange: '18-22', description: 'The most beautiful university days. Attending class together, studying in the library together, watching the seasons change on campus together.' },
      { stage: 'Reality Test', ageRange: '22-28', description: 'Stepping out of the ivory tower. Long-distance, work, pressure — can you protect this original heart?' },
      { stage: 'From School to Wedding', ageRange: '28-40', description: 'The promises of youth are being fulfilled one by one. That person who made your heart flutter on the sports field back then has become your lifelong partner.' },
      { stage: 'Youth Never Ends', ageRange: '40+', description: 'Looking back on youth, grateful that person has always been there. The boy/girl from that classroom back then is still the most beautiful sight in your heart.' },
    ],
  },
  {
    id: 'power-couple',
    name: 'Power Couple',
    icon: '💼',
    description: 'An elite love between equals. You are the only one who can stand shoulder to shoulder with them, and the most worthy opponent they will ever face.',
    color: '#66bb6a',
    maxAge: 75,
    personality: 'Confident and composed, ambitious but not without tenderness. A decisive force in the workplace, but with an unseen side before their loved one. High in both IQ and EQ, enjoys intellectually stimulating conversation. Has an almost obsessive pursuit of professional excellence, which makes them incredibly charming.',
    meetStory: 'Meeting at some important business event or industry conference — maybe you\'re the client and they are the vendor, maybe competitors on the same project, maybe a new coworker who happens to sit across from you. The first meeting might not have been pleasant (clashing head-on), but their professional competence and composed demeanor left a lasting impression.',
    romanceStyle: `Core Theme: An elite love between equals, high-end romance from rivalry to love.
Writing Guidelines:
- Childhood (0-22 years): Separate brilliant growth trajectories. Two people striving fiercely to become excellent, laying the groundwork for meeting at the peak later.
- First Meeting (22-28 years): Intersecting in the workplace. Initially maybe competitors/partners/superior-subordinate. Attracted by each other's talent but unwilling to admit it.
- Ambiguity Phase (28-32 years): A game between masters. Every meeting feels like an intellectual contest, every conversation loaded with subtext. That "do you like me or not" suspicion and testing is more thrilling than any romance.
- Passionate Love (32-38 years): Sweetness after finally getting together. Two equally brilliant people together is not about dependency but 1+1>2. Dating while on business trips, discussing work and life together, each shining in their own field.
- Stability Phase (38-50 years): Managing both career and family. Maybe starting a business together, each at the pinnacle of their industry. Facing outside doubts about being "too strong" by proving with facts that the love of the strong is even more precious.
- Peak Phase (50+ years): Legendary power couple. After achieving success, doing philanthropy together, traveling the world together, writing memoirs together. Each other is the most brilliant "masterpiece" of their life.
- Narrative Tone: Mature and sophisticated, with the tension of equals like in a TV drama. Workplace scenes should be professional, the romance line restrained but not cold. Use second-person "you."`,
    challenges: [
      'Too busy with work to have time for romance',
      'Workplace competition may affect the relationship',
      'Outside prejudice about "strong woman/weak man" or "strong man/weak woman" dynamics',
      'Friction and compromise between strong personalities',
    ],
    romanceStages: [
      { stage: 'Separate Growth', ageRange: '0-22', description: 'Shining on your own tracks. Two outstanding people are both preparing to "meet at the peak."' },
      { stage: 'Meeting at the Peak', ageRange: '22-28', description: 'First professional encounter. Their expertise and charm make it impossible to look away.' },
      { stage: 'Masters Crossing Paths', ageRange: '28-32', description: 'The push-and-pull of the ambiguous stage. Whoever confesses first loses? Or two smart people finally let down their guard.' },
      { stage: 'Power Duo', ageRange: '32-40', description: 'Total upgrade after getting together. Achieving greatness in career, relying on each other in life.' },
      { stage: 'Standing Shoulder to Shoulder', ageRange: '40-55', description: 'Each becoming top in their industry. Being each other\'s strongest support and proudest presence.' },
      { stage: 'Legendary Life', ageRange: '55+', description: 'From business partners to life partners, interpreting the highest level of "being well-matched" throughout a lifetime.' },
    ],
  },
  {
    id: 'romantic-artist',
    name: 'Romantic Artist',
    icon: '🎭',
    description: 'A free-spirited soul who loves you in the most unique way. Every day with this person is an adventure.',
    color: '#ab47bc',
    maxAge: 70,
    personality: 'Passionate, emotional, romantic, and freedom-seeking. Rich in emotion (occasionally dramatic), with a keen sensitivity to beauty and art. Dislikes being bound by rules, does everything by feeling. Might forget anniversaries or show up late, but will suddenly appear with a bouquet of flowers just because "the weather is nice today and I wanted to see you."',
    meetStory: 'The meeting itself feels like performance art — maybe drawn to a painting at an exhibition, only to turn and lock eyes with the artist; maybe hearing a moving piece of street music and walking over to find the performer smiling at you; maybe in a late-night bookstore, both of you reaching for the same book at the same time.',
    romanceStyle: `Core Theme: A passionate and free romance, an adventure full of artistic flair and unexpected surprises.
Writing Guidelines:
- First Meeting: A fateful encounter. The meeting scene is full of drama and destined beauty. First conversation makes the heart race.
- Passionate Love: Ultimate romance. They express love through all kinds of artistic means — writing poems for you, painting your portrait, improvising under the stars, spontaneous trips. Every day brings new surprises.
- Adjustment Phase: The price of freedom. Friction between the artist's free-spiritedness and real life — financial pressure, time management, emotional volatility. You start to wonder: can romance put food on the table?
- Maturity: Understanding that the true essence of love is not possession. Giving each other space while holding your own boundaries. Finding balance between freedom and commitment.
- Companionship: Romance never disappeared, just transformed into a different form. The person you could go wild with is now someone you can quietly watch the sunset with. That passion has settled into the deepest companionship.
- Narrative Tone: Poetic and romantic, with strong visual imagery and emotional tension. Can be somewhat literary but not pretentious. Use second-person "you."`,
    challenges: [
      'The artist\'s instability (financial/emotional)',
      'Conflict between freedom and commitment',
      'Clash between real life and romantic ideals',
      'Insecurity from the partner being too popular',
    ],
    romanceStages: [
      { stage: 'Artistic Prelude', ageRange: '0-20', description: 'Each exploring their path in art. The other person is experiencing the world in their own way.' },
      { stage: 'Fated Encounter', ageRange: '20-26', description: 'A dramatic meeting. That person enters your life in a way you never imagined.' },
      { stage: 'Fervent Love', ageRange: '26-32', description: 'The most romantic time. Going crazy together, wandering together, making the most impractical promises under the stars.' },
      { stage: 'Reality Adjustment', ageRange: '32-40', description: 'When romance meets reality. The collision of an artist\'s freedom with worldly life. Love needs more than just butterflies.' },
      { stage: 'Freedom and Commitment', ageRange: '40-50', description: 'Finding each other\'s rhythm through the long years. That person is still romantic, just in a deeper way.' },
      { stage: 'Eternal Artwork', ageRange: '50+', description: 'The greatest masterpiece completed over a lifetime — your love.' },
    ],
  },
  {
    id: 'sunshine-nextdoor',
    name: 'Sunshine Next Door',
    icon: '☀️',
    description: 'Warm like the winter sun. This person always shows up when you need them most, healing all your exhaustion with the most ordinary daily life.',
    color: '#ffa726',
    maxAge: 75,
    personality: 'Warm and healing, optimistic and cheerful, attentive and considerate. Seemingly ordinary yet possesses a calming magic. Always remembers what you love to eat, what you fear, when you\'re unhappy. Won\'t say earth-shattering sweet nothings, but will bring you hot midnight snacks when you\'re working late, silently leave medicine at your door when you have a cold.',
    meetStory: 'No dramatic meeting, but they just naturally entered your life — maybe the neighbor who proactively greeted you when you moved in, maybe the store clerk who always smiles at you at the convenience store you frequent, maybe the quiet person at a gathering who always takes care of everyone. Nothing felt special at first, but somehow you were healed without realizing it.',
    romanceStyle: `Core Theme: The deepest love hides in the most ordinary daily life — a healing, warm romance.
Writing Guidelines:
- Getting Acquainted: Simple but warm meeting. This person is like someone who always carries sunshine, unknowingly brightening your life. Those seemingly casual acts of care were all thoughtfully planned.
- Ambiguity Phase: Little sweetness in everyday life. Grocery shopping together, walking the dog together, watching shows together, sharing meals. Nothing earth-shattering, but every ordinary day brings hearts closer.
- Confession Phase: The most down-to-earth confession. They might not do anything romantic, but a simple "I want to eat every meal with you from now on" is more touching than any sweet talk.
- Passionate Love: Happiness in simplicity. Life with two people is warmer than life alone. Those moments of cooking together, cleaning up together, curling up on the couch together — that is the best kind of love.
- Test Period: Life always has its rough patches — work pressure, family upheavals, health issues. But as long as they are by your side, even the hardest times can be endured.
- Companionship: Peaceful years. That person who once lived next door has become the warmest home for life. That feeling of "it\'s so good to have you" passes through your heart every single day.
- Narrative Tone: Warm and healing, full of the texture of everyday life. Mundane details should be written with warmth (grocery shopping together, cooking noodles together, watching the weather forecast together). No need for fancy words — sincerity is the most touching. Use second-person "you."`,
    challenges: [
      'Too ordinary, easily overlooked — need to consciously feel their kindness',
      'They are so caring they might be treated as a "nice person" — no romantic spark',
      'Relationship progresses too slowly, lacking passion',
      'Daily trivialities wear down feelings — need to actively create surprises',
    ],
    romanceStages: [
      { stage: 'Ordinary Meeting', ageRange: '0-22', description: 'Ordinary growth, ordinary meeting. But some people are destined to appear at the right time in the right place.' },
      { stage: 'Quietly Drawing Close', ageRange: '22-26', description: 'Unknowingly stepping into each other\'s lives. Those seemingly chance encounters are all carefully orchestrated everyday moments.' },
      { stage: 'Warm Approach', ageRange: '26-30', description: 'No words needed — one glance and you understand. That feeling of being held in someone\'s heart is more reassuring than any grand gesture.' },
      { stage: 'Simple Happiness', ageRange: '30-40', description: 'Getting married, having children, daily chores. Ordinary to others, but exactly the life you both want.' },
      { stage: 'Protecting Each Other', ageRange: '40-55', description: 'When storms come, knowing this person beside you is your strongest anchor. Sunshine is not only in clear skies, but right here.' },
      { stage: 'Growing Toward the Sun', ageRange: '55+', description: 'A lifetime is so long — thank goodness you are here to grow old with me. You\'re still that warm sunshine, and I am your home.' },
    ],
  },
  {
    id: 'bickering-lovers',
    name: 'Bickering Lovers',
    icon: '⚡',
    description: 'Couldn\'t stand each other from the very first glance. But somehow, the more you argue, the more you care — the more you bicker, the harder it is to let go.',
    color: '#ef5350',
    maxAge: 70,
    personality: 'Tsundere and sharp-tongued, competitive, tough with words but soft at heart. Always seems to be against you on the surface, but actually cares more than anyone. Very contradictory — clearly wants to be good to you, but insists "I didn\'t buy this for you on purpose." Smart and funny, always able to volley back your jokes, even arguing with style.',
    meetStory: 'The first meeting was unpleasant! Maybe a misunderstanding at some event, maybe mutual dislike when introduced by friends, maybe a forced collaboration at work. In any case, the first impression was the worst possible. You thought: How can there be such an annoying person in this world?! — and then fate made you meet again and again.',
    romanceStyle: `Core Theme: From mutual dislike to inseparable bickering lovers — an unconventional romance full of tension and sparks.
Writing Guidelines:
- Getting Acquainted: A meeting full of gunpowder. Every encounter is a head-on clash, no mercy with words. But amidst the fierce exchanges, you have to admit they\'ve got something.
- Rival Phase: Forced frequent contact — coworkers, same social circle, neighbors. Arguments every time you meet, but always amused by their wit. The classic "mouth says dislike, body says otherwise" phase.
- Ambiguity Phase: The atmosphere starts to shift subtly. You start noticing their every move, feel inexplicably annoyed when they get close to others. But still stubborn, refusing to admit it.
- Confession Phase: The most unconventional confession. Maybe in the middle of your fiercest argument, suddenly freezing — "I think... I like you." Or unconsciously revealing true feelings through protective instincts in a moment of crisis.
- Passionate Love: The most unique couple dynamic. Others flaunt romance, you flaunt "fighting." But every time you make up, it\'s sweeter than before.
- Maturity: Understanding no longer needs to be expressed through arguments. One glance and you know what they\'re thinking. Though you still bicker occasionally, it\'s your unique way of being together.
- Narrative Tone: Light and humorous, dialogue should be back-and-forth. Arguments should be clever (smart people\'s banter, not vulgar shouting matches). Use second-person "you."`,
    challenges: [
      'Arguments hurt feelings — need to learn when to stop',
      'Both too proud to back down',
      'Friends don\'t understand: are you dating or fighting?',
      'Used to the arguing dynamic, don\'t know how to express love gently',
    ],
    romanceStages: [
      { stage: 'Narrow Rivals', ageRange: '0-20', description: 'Growing up separately, but fate has already arranged one "encounter" after another.' },
      { stage: 'First Clash', ageRange: '20-24', description: 'An impressively bad first meeting. You\'ve never met anyone so annoying — they probably think the same.' },
      { stage: 'Mutual Annoyance', ageRange: '24-28', description: 'Why do I keep running into you everywhere?! Starting to notice those annoying but endearing little details about them.' },
      { stage: 'Actions Speak Louder', ageRange: '28-32', description: 'Everyone can see you like each other, but you two are still being stubborn. "How could I possibly like that kind of person?!" — Hand on your heart, do you really believe that?' },
      { stage: 'Sweet Bickering', ageRange: '32-45', description: 'Everyday life after getting together. Noisy and playful, but never truly hurting each other. This is your unique love language.' },
      { stage: 'Old Age Squabbling', ageRange: '45+', description: 'Arguing for a lifetime, but neither can live without the other. I want to find you again in the next life to keep arguing — but please go easy on me.' },
    ],
  },
  {
    id: 'gentle-guardian',
    name: 'Gentle Guardian',
    icon: '🌙',
    description: 'Quiet and reserved but speaks volumes through actions. This person is not good with words, but every detail says "I\'m here."',
    color: '#5c6bc0',
    maxAge: 80,
    personality: 'Calm and introverted, not talkative but extremely reliable. May seem a bit cold and reserved, but knows everything clearly inside. Every detail about you is kept in their heart. Will never say anything sweet, but will always be there when you need them. The kind of person who makes you inexplicably feel safe just by being there.',
    meetStory: 'The way you met was very ordinary, and they weren\'t the type to impress at first glance. But gradually you noticed that they always showed up when you needed them — picking up fallen documents for you, silently handing you an umbrella on rainy days, asking "want a ride?" when you worked late. Small things, but all heartwarming.',
    romanceStyle: `Core Theme: The deepest love is silent — a gentle love song written through actions.
Writing Guidelines:
- Getting Acquainted: Interactions as plain as water. They seem a bit distant, but occasionally show a gentle side. You start noticing they are actually especially attentive.
- Connection Phase: Unspoken understanding. A wordless rapport between you — they always appear when you need them, though they never say "I\'m worried about you."
- Heartflutter Phase: Those moments that make your heart skip. Maybe when they carry you to the hospital without a word when you have a fever, maybe something you said once that they remembered for a long time — you know you\'re done for.
- Confession Phase: The most awkward yet sincere confession. They might struggle for ages and only manage to blurt out "I like you," then blush deeply. But you know the weight of those three words.
- Loving Phase: Their love is in the details. Your cup is always full, they always bring an extra jacket because you get cold easily, every little wish you mention is quietly noted and fulfilled. Love is not about grand gestures, but the accumulation of small moments.
- A Lifetime: Maybe they won\'t say many sweet words even in old age, but the hand they\'ve held for a lifetime has never let go. That feeling of "I feel safe because you\'re here" is the most precious gift of a lifetime.
- Narrative Tone: Subtle and restrained, with more action descriptions than psychological descriptions. Heartwarming details should be emphasized. Fancy dialogue is not needed because this person\'s love is in their actions. Use second-person "you."`,
    challenges: [
      'They are too silent, communication can be difficult',
      'Hard to feel "loved" because they are not good at expressing it',
      'Requires an active person to move the relationship forward',
      'Misunderstandings pile up and they won\'t explain — may bottle things up inside',
    ],
    romanceStages: [
      { stage: 'Separate Silence', ageRange: '0-22', description: 'You and your future partner are each growing up. Maybe you\'ve passed by each other without even knowing.' },
      { stage: 'Quiet Arrival', ageRange: '22-26', description: 'This person just appears in your life. Not loud, not conspicuous, but somehow always there.' },
      { stage: 'Wordless Protection', ageRange: '26-30', description: 'Their silent kindness has finally been noticed by you. Though they never say "I like you," the whole world knows they do.' },
      { stage: 'Love Spoken Aloud', ageRange: '30-35', description: 'The one who never expresses themselves finally finds the courage. An awkward confession is the most sincere promise in the world.' },
      { stage: 'Steady and Deep', ageRange: '35-50', description: 'A simple but profound life. Love is not in words, but in every warm glass of water in the morning, the light left on late at night, the umbrella handle extended through wind and rain.' },
      { stage: 'This Life With You', ageRange: '50+', description: 'A lifetime is too short — not enough time to properly say I love you. A lifetime is too long — every detail says I love you.' },
    ],
  },
  {
    id: 'fate-encounter',
    name: 'Fate\'s Encounter',
    icon: '✨',
    description: 'Not every meeting is destiny, but meeting this person feels like a carefully scripted play by the universe.',
    color: '#26c6da',
    maxAge: 75,
    personality: 'Mysterious and charming, with a unique aura, always full of fascinating stories and profound insights. Seems casual but has strong principles. Loves travel, reading, and everything unknown. Has the calm of someone who has "seen the world" and the freedom of "not caring about worldly opinions." Makes you feel like there are endless surprises to discover in them.',
    meetStory: 'Your meeting is full of a sense of fate — maybe a chance encounter while traveling alone in a foreign country, maybe an unexpected meeting in an unlikely place (a music festival, a late-night diner, watching sunrise on a mountain top). Completely unplanned, and the way they appeared made you feel "everything was arranged."',
    romanceStyle: `Core Theme: A romantic encounter full of a sense of destiny — the gears of fate begin to turn with a single meeting.
Writing Guidelines:
- Before Fate (0-22 years): Separate fascinating growth trajectories. Those seemingly unrelated experiences (a language learned, a hobby cultivated) were all preparation for meeting each other.
- Fateful Meeting: A cinematic first encounter. The setting should be unique, the atmosphere just right — that feeling of "the world goes silent for a second."
- Separation and Pursuit: Maybe you part ways after meeting for various reasons, but fate makes you seek each other out again. This might be a quest across cities or even borders.
- Confirmation: Confirming when you meet again — "I wasn\'t wrong, there really is something between us." That feeling of your souls recognizing each other.
- Loving Phase: Every date is a new adventure. They always have strange and interesting ideas, every day feels like unwrapping a gift. But real life also challenges this "romantic drama" kind of love.
- Companionship: When the passion fades, true love begins. Fate gave you the most romantic beginning, but how the story continues is in your own hands.
- Reflection: Looking back in old age, still feeling that day you met was the luckiest day of your life. "Thank goodness I decided to go out that day."
- Narrative Tone: A romantic movie-like narrative, with a poetic sense of destiny. Meeting scenes should be written with vivid imagery. Use second-person "you."`,
    challenges: [
      'A too-perfect beginning makes you worry it\'s an illusion',
      'The gap between reality and the "sense of fate"',
      'The other person may be too elusive (loves travel/adventure)',
      'How to sustain a relationship built on "destiny" without letting fate take the blame',
    ],
    romanceStages: [
      { stage: 'Foreshadowing of Fate', ageRange: '0-22', description: 'Everything in the past was to meet you. Those seemingly unrelated experiences are all foreshadowing laid by fate.' },
      { stage: 'Fateful Meeting', ageRange: '22-26', description: 'In an unexpected place, meeting an unexpected person. The whole world stops for a second.' },
      { stage: 'Search and Reunion', ageRange: '26-28', description: 'If meeting is fate, then reunion is a choice. You start to believe that some people are destined to meet.' },
      { stage: 'Destined Love', ageRange: '28-35', description: 'After getting together, you realize it\'s more than just destiny\'s arrangement. This person deserves my love — not because fate decided it, but because I decided it.' },
      { stage: 'Writing the Story', ageRange: '35-50', description: 'Fate gave us the meeting, but the story is ours to write. Those ordinary days shine because of the person beside us.' },
      { stage: 'Thanking Fate', ageRange: '50+', description: 'The luckiest thing in this life was meeting an extraordinary you on an ordinary day.' },
    ],
  },
]
