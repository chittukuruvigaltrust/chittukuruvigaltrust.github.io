/**
 * AI Chatbot Logic for Sparrow Trust India
 */

document.addEventListener('DOMContentLoaded', () => {
    const chatbotWidget = document.createElement('div');
    chatbotWidget.id = 'chatbot-widget';
    chatbotWidget.innerHTML = `
        <div id="chatbot-button">
            <span style="font-size:28px;">🐦</span>
        </div>
        <div id="chatbot-window">
            <div class="chatbot-header">
                <h4>🐦 Chitu.ai</h4>
                <div class="close-btn">&times;</div>
            </div>
            <div id="chatbot-messages">
                <div class="message ai">
                    Hello! 👋 I'm <strong>Chitu.ai</strong> — your smart sparrow assistant. Tap a question below or type your own!
                </div>
                <div class="quick-replies">
                    <button class="quick-btn" data-q="What do sparrows eat?">🌾 What do sparrows eat?</button>
                    <button class="quick-btn" data-q="How to build a sparrow nest?">🏠 How to build a nest?</button>
                    <button class="quick-btn" data-q="Why are sparrows declining?">📉 Why are sparrows declining?</button>
                    <button class="quick-btn" data-q="How can I help sparrows?">🤝 How can I help?</button>
                    <button class="quick-btn" data-q="Tell me about this trust">🏛️ About this trust</button>
                </div>
            </div>
            <div class="chatbot-input-area">
                <input type="text" id="chatbot-input" placeholder="Type a message...">
                <button id="send-btn"><i class="bx bx-send"></i></button>
            </div>
        </div>
    `;
    document.body.appendChild(chatbotWidget);

    // Add quick-reply button styles
    const qStyle = document.createElement('style');
    qStyle.textContent = `
        .quick-replies { display:flex; flex-wrap:wrap; gap:6px; margin-top:8px; }
        .quick-btn {
            background:#e8f5e9; color:#2e7d32; border:1px solid #c8e6c9;
            border-radius:20px; padding:6px 12px; font-size:12px;
            cursor:pointer; transition:all 0.2s; font-family:'Open Sans',sans-serif;
        }
        .quick-btn:hover { background:#2e7d32; color:#fff; }
    `;
    document.head.appendChild(qStyle);

    const chatbotBtn = document.getElementById('chatbot-button');
    const chatbotWindow = document.getElementById('chatbot-window');
    const closeBtn = document.querySelector('.close-btn');
    const chatInput = document.getElementById('chatbot-input');
    const sendBtn = document.getElementById('send-btn');
    const messagesContainer = document.getElementById('chatbot-messages');

    // Toggle Chat Window
    chatbotBtn.addEventListener('click', () => {
        chatbotWindow.classList.toggle('active');
    });

    closeBtn.addEventListener('click', () => {
        chatbotWindow.classList.remove('active');
    });

    // Quick reply buttons
    document.querySelectorAll('.quick-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const q = btn.getAttribute('data-q');
            appendMessage('user', q);
            // Hide quick replies after first use
            const qr = document.querySelector('.quick-replies');
            if (qr) qr.style.display = 'none';
            setTimeout(() => {
                const response = getAIResponse(q);
                appendMessage('ai', response);
            }, 400);
        });
    });

    // Handle Sending Messages
    const sendMessage = () => {
        const text = chatInput.value.trim();
        if (!text) return;
        appendMessage('user', text);
        chatInput.value = '';
        setTimeout(() => {
            const response = getAIResponse(text);
            appendMessage('ai', response);
        }, 500);
    };

    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    function appendMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}`;
        msgDiv.textContent = text;
        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Knowledge Base - 5 Core Questions + All 42 Points
    const knowledgeBase = [
        /* GREETINGS */
        { q: "hello", k: ["hello", "hi", "hey", "vanakkam", "வணக்கம்"], a: "Hello! 👋 I'm Chitu.ai — your smart sparrow assistant by Sparrow Trust India. Ask me anything about sparrows or our conservation work!" },
        { q: "how are you", k: ["how are you", "are you ok"], a: "I'm doing great! Ready to help you learn about sparrows! 🐦" },
        { q: "bye", k: ["bye", "goodbye", "see you"], a: "Goodbye! 👋 Thank you for caring about sparrows!" },

        /* POINT 1 & 2: REGISTRATION & OFFICE */
        { q: "registration", k: ["registration", "reg no", "reg number", "registered"], a: "📋 Trust Registration No: R/Ganapathy/Book-4/96/2018, registered on 12/9/2018." },
        { q: "trust name", k: ["name of trust", "trust name", "chitukuruvigal", "arakkattalai"], a: "The Trust is known as 'CHITUKURUVIGAL ARAKKATTALAI' (Sparrow Trust India)." },
        { q: "office", k: ["office", "address", "where", "location", "situated"], a: "📍 Registered Office: No. 13, Sarada Devi Street - 2, RK Puram, Coimbatore 641006, Tamil Nadu, India." },

        /* POINT 3: FOUNDERS & TRUSTEES */
        { q: "founder", k: ["founder", "dhanasekar", "who started", "who founded"], a: "👤 Founder: Mr. N. Dhanasekar, Son of A. Natarajan. Very fond of birds since his teenage years. He witnessed sparrow decline and took action instead of complaining. 'Bird Watching' is part of his life." },
        { q: "co-founder", k: ["co-founder", "natarajan", "co founder"], a: "👤 Co-Founder: Mr. A. Natarajan, Son of Arunachalam, aged 65 years, residing at RK Puram, Coimbatore 641006." },
        { q: "treasurer", k: ["treasurer", "saravanakumar"], a: "👤 Trustee (Treasurer): Mr. V. Saravanakumar, Son of Velusamy, aged 33, residing at 6A, 5th Street, Bharathi Nagar, Coimbatore 641006." },
        { q: "trustees", k: ["trustee", "vijayan", "karthikeyan", "board"], a: "👥 Trustees: M. Vijayan (Son of Mariappan, 62, Carnival Crown Apartment, Bharathi Nagar) and N. Karthikeyan (Son of Nachimuthu, 67, Sakthi Nilayam, Co-operative Colony, Mettupalayam 641301)." },

        /* POINT 4: OBJECTIVES */
        { q: "objectives", k: ["objective", "mission", "goal", "aim", "purpose"], a: "🎯 Our objectives: Promote welfare, health, education & humanitarian activities. Establish medical centers, old age homes & vocational training. Offer scholarships in Medicine, Art, Science & Engineering. Create environmental conservation consciousness." },

        /* POINT 5 & 6: ACTIVITIES */
        { q: "public activities", k: ["public activit", "infrastructure", "relief", "food donation", "cultural"], a: "📢 Public Activities: Infrastructure improvement, study materials/funds, society development, national festivals, cultural programs, youth promotion, seasonal disease prevention, insurance awareness, felicitation of achievers, food donation & relief funds." },
        { q: "nature activities", k: ["nature activit", "wildlife", "tree plantation", "bird watching", "trekking", "ponds", "lakes"], a: "🌿 Nature Activities: Wildlife & animal conservation, tree plantation/afforestation, bird watching & trekking, saving ponds & lakes, celebrating World Nature Days, school educational programs, nature sports, and cleanliness programs." },

        /* POINT 7: SPONSORS */
        { q: "sponsors", k: ["sponsor", "supporter", "funding"], a: "🤝 Our Sponsors: Ganapathy Furniture Mart, Visalakshi Tractors, Savitha Photo House, Thangam Rice Mundy, Sabari Offset Prints, Dass Priya Catering, Gandhiji Kadhar Store, Dr. Chitravijayan, Geethanjalai Press, Jaison Tours, Noble Agencies, and many more Coimbatore supporters!" },

        /* POINT 8: GUESTS OF HONOUR */
        { q: "guests", k: ["guest", "honour", "dignitar", "chief guest"], a: "🏅 Distinguished Guests: Siravai Aadhinam, Perur Aadhinam, Kaalidhasan (Osai), Dr. Pramod (SACON), Muhammad Ali (Nature History Trust), Anweerdin (IFS), Archan Patnayak (IAS Collector CBE), MLA P. Arunkumar, Dr. Mohanraj, The Hindu Jeshi, Zoo Sundarraj, and more." },

        /* POINT 9: TEAM */
        { q: "team", k: ["team", "who works", "members", "staff", "volunteer"], a: "👥 Our Team: M. Sampath Kumar, S. Jeeva, D. Vignesh, B. Karthikeyan, A. Naveen, Utharraj, Rajesh, Radha, R.M. Manicam, V. Praveen Kumar, Senthil Kumar, Arumugasami Chetty, and members from Tirupati, Tiruvarur & across Tamil Nadu." },

        /* POINT 10: DONATION */

        /* POINT 13: TAMIL NAME & MEANING */
        { q: "tamil name", k: ["tamil", "சிட்டுக்குருவி", "meaning", "name meaning"], a: "🐦 In Tamil: 'சிட்டுக்குருவி' — named because it flies like a 'சிட்டு' (fast & swift). In English 'Sparrow' means a fast, small, active bird. Zoological name: Passer domesticus (lives in residential areas). It was among the first animals to get a scientific name!" },

        /* POINT 14: ORIGIN */
        { q: "origin", k: ["origin", "where from", "mediterranean", "history", "spread"], a: "🌍 House Sparrows originated in the Mediterranean Sea area. They spread worldwide as agriculture spread. The genus Passer has about 25 species found on almost all continents. They avoid extensive woodlands, grasslands & deserts away from humans." },

        /* POINT 15: SOCIAL LIFE */
        { q: "social", k: ["social", "group", "singing", "bathing", "habitat", "live"], a: "🏘️ Sparrows are very social — they live in groups, search food together, do dust/water bathing & 'social singing'. During breeding, pairs live together. They live in urban/rural settings in buildings, bushes & trees. They spend their entire lifetime within 1km!" },

        /* POINT 16: PHYSIQUE */
        { q: "physique", k: ["physique", "size", "weight", "length", "flight speed", "how big", "look"], a: "📏 Sparrow Physique: Length 16cm, Weight 32g, Beak 1.5cm, Flight speed 45.5 km/h. Males are bigger with black/white/brown markings. Females are pale brown & grey. They hop rather than walk and can even swim when chased by predators!" },

        /* POINT 17: FOOD (Q1 - Core Question) */
        { q: "food", k: ["eat", "food", "diet", "feed", "grain", "seed", "what do sparrows eat", "insect"], a: "🌾 Sparrows eat 90% seeds, grains & weeds, and 10% insects. They tolerate high salt. They can survive without water by eating berries. Young sparrows are fed mostly insects until 15 days after hatching. They sometimes eat tiny stones to help digestion!" },

        /* POINT 18: EGGS & BREEDING */
        { q: "eggs", k: ["egg", "lay", "breeding", "hatch", "reproduce", "baby"], a: "🥚 Sparrows lay 4-5 eggs at a time, up to 7 times/year! Eggs are white/bluish/greenish, spotted brown/grey, weighing 2.9g. They hatch in 11-14 days. Eyes open by day 4, feathers grow from day 8, and young leave the nest by day 15." },

        /* POINT 19 & 20: BEHAVIOR & MATING (Tamil points) */
        { q: "behavior", k: ["behavior", "mate", "monogam", "pair", "couple", "marriage"], a: "💕 Sparrows are mostly monogamous for life (85%)! Males build nests to attract females. Since males outnumber females, finding a mate is tough. Unpaired sparrows act as 'helpers' — they fill in if one partner dies. Even young sparrows can breed, but inexperience leads to higher mortality." },

        /* POINT 21: SURVIVAL */
        { q: "survival", k: ["survival", "predator", "lifespan", "life span", "how long", "cat", "threat", "enemy"], a: "⚠️ Only 60% of newborns survive. Lifespan can reach ~20 years. Predators: humans, cats, and diseases. Electromagnetic waves from mobile phones also affect them." },

        /* POINT 22: HUMAN RELATION */
        { q: "human", k: ["human", "benefit", "agriculture", "relation", "friendly"], a: "🤗 Sparrows are closely associated with humans! They eat crop insects & worms (beneficial for farming). A sparrow in your home signifies a peaceful, eco-friendly environment. They even feed on ration spills and poultry/farm waste." },

        /* POINT 23: DATA & FACTS */
        { q: "facts", k: ["facts", "data", "analytics", "bird count", "interesting"], a: "📊 We use Data Analytics, Bird Count App, My Map & Track Nest boxes. Notable supporters: Ayya Nammalvaar (Organic Farming), Mr. Anwardeen (IFS), Mr. Sundaram (Water Pollution), SACON bird count. Electromagnetic waves from mobile phones also impact sparrows." },

        /* POINT 24: REASONS FOR DECLINE (Q3 - Core Question) */
        { q: "decline", k: ["decline", "declining", "disappear", "reduce", "fewer", "less", "why are sparrows", "reason", "monocrop"], a: "📉 Reasons for decline: Monocrop farming (no food variety), pesticide spraying kills insects, toxic vehicle fumes, loss of nesting in modern buildings, and drying of 39,000 ponds, 2 lakh water streams & 35 rivers. If sparrows that lived with humans are destroyed, it hurts humans too!" },

        /* POINT 25 & 26: HOW TO HELP (Q4 - Core Question) */
        { q: "help", k: ["help", "save", "protect", "conservation", "what can i do", "how can i", "preserve", "duty"], a: "🤝 How to help: 1) Provide food grains, 2) Keep water bowls at home, 3) Don't harm birds, 4) Install nest boxes in trees/houses (2-3m high), 5) Plant street trees, 6) Support natural farming, 7) Protect farmland pests naturally. It's our duty to safeguard the bird we enjoyed in childhood!" },

        /* POINT 27: SPARROW DAY */
        { q: "sparrow day", k: ["sparrow day", "march 20", "world sparrow", "state bird", "delhi"], a: "🗓️ Since 2010, March 20th is celebrated as World Sparrow Day! Due to urbanization reducing sparrows in Delhi, CM Sheila Dikshit announced House Sparrow as the 'State Bird' of Delhi on 5th October 2012." },

        /* POINT 28: AIM */
        { q: "aim", k: ["aim", "purpose", "why exist", "stop erosion"], a: "🎯 Our Aims: 1) Stop sparrow erosion and bring back their life, 2) Involve the young generation — school & college students, 3) Create awareness among the public about sparrow conservation." },

        /* POINT 29-40: EFFORTS */
        { q: "efforts", k: ["effort", "work done", "achievement", "what have you done", "accomplishment"], a: "🏆 Our Efforts: School awareness programs, nest box installations across Tamil Nadu, bird counting drives, community workshops, tree plantations, celebrating World Sparrow Day, media coverage in The Hindu & other newspapers, webinars, guest lectures, and collaborations with SACON & other NGOs." },

        /* POINT 41: CONTACT (Core Extra) */
        { q: "contact", k: ["contact", "phone", "email", "reach", "call", "address"], a: "📞 Contact: 13, Saradha Devi St-2, Ramakrishnapuram, Ganapathy Post, Coimbatore 641006, Tamil Nadu. Mobile: 9786698433. Email: chittukuruvigaltrust@gmail.com. Facebook: facebook.com/chittukuruvigal" },

        /* NEST BOX (Q2 - Core Question) */
        { q: "nest", k: ["nest", "box", "house", "build", "shelter", "how to build", "nest box"], a: "🏠 Sparrow nest boxes: Use wood (not plastic), place 2-3 meters high in shaded areas, entry hole ~3.2cm. Males build nests to attract females. Sparrows nest in buildings, bushes & trees. Order our handmade nest boxes — click 'Order Now' in the menu!" },

        /* ABOUT TRUST (Q5 - Core Question) */
        { q: "trust", k: ["trust", "about", "organization", "ngo", "who are you", "tell me about", "chitukuruvigal"], a: "🏛️ Chitukuruvigal Arakkattalai (Sparrow Trust India) was founded by Mr. N. Dhanasekar in Coimbatore. Reg No: R/Ganapathy/Book-4/96/2018 (12/9/2018). We conduct school awareness, install nest boxes, organize bird counts, publish newsletters & collaborate with other NGOs. Contact: 9786698433." },

        /* POINT 42: THANK YOU */
        { q: "thank", k: ["thank", "thanks", "thank you"], a: "🙏 Thank you for your interest in sparrow conservation! Together we can bring them back. — Chitukuruvigal Arakkattalai Team" },

        /* ========== MISSION, VISION & GOALS ========== */
        { q: "mission", k: ["mission", "what is your mission"], a: "🌟 Our Mission: To protect and revive the House Sparrow population across India through community awareness, nest box programs, school education, and scientific bird monitoring. We believe every sparrow saved is a step toward ecological balance." },
        { q: "vision", k: ["vision", "future", "dream", "aspire"], a: "🔭 Our Vision: A future where sparrows thrive in every Indian city and village, where children grow up hearing their chirps, and where communities actively participate in urban biodiversity conservation." },
        { q: "goals", k: ["goals", "target", "plan", "what next"], a: "🏁 Our Goals: 1) Install 10,000 nest boxes across Tamil Nadu, 2) Conduct awareness in 500+ schools, 3) Build India's largest sparrow population database, 4) Establish sparrow-friendly zones in every district, 5) Train 1,000 youth volunteers." },
        { q: "impact", k: ["impact", "difference", "result", "outcome", "change"], a: "📈 Our Impact: Thousands of nest boxes installed, 100+ schools educated, bird count data shared with SACON, media coverage in The Hindu & regional newspapers, community partnerships across Coimbatore, and growing volunteer network." },
        { q: "why sparrows", k: ["why sparrow", "why not other", "why focus"], a: "❓ Why sparrows? They are indicator species — their decline signals environmental problems affecting humans too. Sparrows lived with us for centuries. Saving them means saving our ecosystem, air quality, and pest control naturally." },

        /* ========== WEBSITE & SERVICES ========== */
        { q: "website", k: ["website", "site", "page", "online", "web"], a: "🌐 Our website offers: Trust information, nest box ordering, conservation activity map, volunteering signup, donation portal, newsletters/magazines, financials transparency, and this chatbot assistant!" },
        { q: "nest box order", k: ["order", "buy", "purchase", "nest box order", "get nest box"], a: "🛒 You can order handmade wooden nest boxes from our website! Click the 'Order Now' button in the top menu. Each nest box is crafted to specifications ideal for sparrow nesting." },
        { q: "newsletter", k: ["newsletter", "magazine", "publication", "reading"], a: "📰 We publish regular newsletters/magazines about sparrow conservation, bird facts, field stories, and community updates. Check the 'Magazine' section in our menu!" },
        { q: "financials", k: ["financials", "accounts", "transparency", "money spent", "audit"], a: "💰 We maintain full financial transparency! Visit the 'Financials' section in our menu to view our income, expenditure, and audit reports." },
        { q: "volunteering", k: ["volunteer", "join", "participate", "sign up", "register", "internship"], a: "🙋 Want to volunteer? Click 'LIVE Volunteering' in our menu to see current opportunities! Activities include: nest box installation, bird counting, school workshops, tree planting, and community events." },
        { q: "services", k: ["service", "what do you offer", "what you do", "programs"], a: "🛠️ Our Services: 1) Nest box manufacturing & installation, 2) School/college awareness programs, 3) Bird counting & data analytics, 4) Community conservation workshops, 5) Nature treks & bird watching events, 6) Environmental consulting." },
        { q: "map", k: ["map", "activity map", "where active", "coverage"], a: "🗺️ Check our Activity Map on the homepage! It shows district-wise colored circles across India where we've conducted conservation activities. Larger circles = more activities in that area." },

        /* ========== BIRD BIOLOGY & FACTS ========== */
        { q: "types of sparrows", k: ["type", "species", "kind", "variety", "how many species"], a: "🐦 The genus Passer has about 25 species! Common ones in India: House Sparrow (Passer domesticus), Spanish Sparrow, Tree Sparrow, and Sind Sparrow. The House Sparrow is the most common and lives closest to humans." },
        { q: "male vs female", k: ["male", "female", "difference", "gender", "identify", "tell apart"], a: "👀 Males have brighter black, white & brown markings with a grey crown. Females and young birds are colored pale brown & grey with no black bib. Males are slightly bigger than females." },
        { q: "baby sparrow", k: ["baby", "chick", "young", "newborn", "fledgling"], a: "🐥 Baby sparrows: Eyes open on day 4, feathers start growing from day 8, and they leave the nest by day 15. They're fed mostly insects by parents. Only 60% of newborns survive — you can help by providing safe nesting spots!" },
        { q: "sparrow sound", k: ["sound", "chirp", "sing", "call", "voice", "noise"], a: "🎵 Sparrows make a variety of chirps and calls! Males sing to attract mates and defend territory. They also do 'social singing' in groups. Listen to their beautiful chirps — we have the sparrow sound playing on our website!" },
        { q: "sparrow lifespan", k: ["lifespan", "how long live", "age", "old", "years"], a: "⏰ Sparrows can live up to ~20 years in ideal conditions! But in the wild, average lifespan is 2-5 years due to predators, diseases, and environmental threats. Only 60% of newborns survive their first year." },
        { q: "migration", k: ["migrat", "travel", "fly away", "seasonal", "move"], a: "📍 House Sparrows do NOT migrate! They are sedentary birds and spend their entire life within about 1km of where they were born. This makes them very dependent on local conditions — that's why urban changes hit them hard." },
        { q: "nesting season", k: ["nesting season", "when nest", "breeding season", "when breed", "when lay"], a: "🗓️ Sparrows can breed year-round in tropical India, with peaks during monsoon (July-September). They can lay eggs up to 7 times a year! Males build nests to attract females — so install your nest box anytime." },
        { q: "sparrow water", k: ["water", "drink", "thirst", "bath"], a: "💧 Sparrows need water for drinking and bathing. They do 'dust bathing' and 'water bathing' — both are social activities! You can help by keeping a shallow water bowl (2-3cm deep) on your balcony or terrace." },
        { q: "sparrow colors", k: ["color", "colour", "brown", "grey", "black", "markings"], a: "🎨 House Sparrow colors: Males have a grey crown, chestnut nape, black bib, white cheeks, and brown-streaked wings. Females are plain with buff-brown upperparts and pale underparts. Young birds look like females." },
        { q: "sparrow intelligence", k: ["intelligent", "smart", "clever", "brain", "learn"], a: "🧠 Sparrows are surprisingly smart! They can recognize individual humans, learn to open automatic doors, adapt to new food sources, and even use traffic to crack nuts. They also remember locations of food sources." },
        { q: "diseases", k: ["disease", "sick", "illness", "health", "infection", "avian"], a: "🏥 Common sparrow diseases: Avian pox, salmonella, and parasitic infections. Signs: fluffed feathers, lethargy, discharge. If you find a sick sparrow, contact your local animal rescue or veterinarian. Keep feeders clean to prevent disease spread." },
        { q: "predators", k: ["predator", "hunt", "kill", "danger", "cat", "hawk", "crow"], a: "🦅 Sparrow predators: Cats (biggest urban threat!), hawks, crows, snakes, and rats. Sparrows are alert birds with an alarm call system. You can help by keeping cats indoors and providing dense bushes for sparrows to hide in." },
        { q: "sparrow vs pigeon", k: ["pigeon", "dove", "kabootar", "compare", "vs"], a: "🆚 Sparrow vs Pigeon: Sparrows are much smaller (16cm vs 30cm), lighter (32g vs 300g), and primarily seed-eaters. Pigeons are more adaptable to concrete cities, while sparrows need insects for their chicks. Both are urban birds but sparrows are declining faster." },
        { q: "sparrow population", k: ["population", "count", "number", "how many", "census"], a: "📊 India's sparrow population has declined 60-80% in urban areas over 20 years. Coimbatore and other Tier-2 cities still have healthy populations. Our trust conducts annual bird counts using the Bird Count App and shares data with SACON." },
        { q: "urban sparrows", k: ["urban", "city", "town", "modern", "building", "apartment"], a: "🏙️ Urban challenges for sparrows: Modern sealed buildings have no nesting gaps, glass windows cause collisions, gardens replaced by concrete, pesticides kill insects, and electromagnetic radiation affects them. Installing nest boxes on apartments is a simple solution!" },
        { q: "garden tips", k: ["garden", "plant", "attract", "balcony", "terrace", "backyard"], a: "🌿 Attract sparrows to your garden: 1) Plant native shrubs (hibiscus, tulsi), 2) Keep grain feeders with millets/bajra, 3) Place a shallow water dish, 4) Install 1-2 wooden nest boxes, 5) Avoid pesticides, 6) Let some weeds grow (sparrows love weed seeds!)." },
        { q: "photography", k: ["photo", "camera", "picture", "shoot", "capture"], a: "📸 Sparrow Photography Tips: Use a 200-400mm lens, keep still near feeders, morning light is best, scatter some grains as bait, be patient! Share your sparrow photos with us on Facebook: facebook.com/chittukuruvigal" },
        { q: "children", k: ["children", "kids", "school", "student", "teach", "educate"], a: "👧 For children: Sparrows are wonderful classroom topics! We offer free school programs covering bird biology, nest-box making workshops, bird counting activities, and nature walks. Contact us to arrange a session: 9786698433." },
        { q: "other birds", k: ["other bird", "crow", "parrot", "eagle", "peacock", "myna", "kingfisher"], a: "🦜 While we focus on sparrows, we support all bird conservation! India has 1,300+ bird species. Sparrows are 'indicator species' — saving them helps protect the entire ecosystem including crows, mynas, parrots, and more." },
        { q: "rain and sparrows", k: ["rain", "monsoon", "winter", "summer", "season", "weather", "cold", "hot"], a: "🌧️ Sparrows face challenges in extreme weather: heavy rain floods nests, summer heat dries water sources, and winter cold increases energy needs. You can help year-round by providing shelter, food, and water consistently." },
        { q: "fun facts", k: ["fun fact", "amazing", "surprise", "wow", "did you know", "cool"], a: "🤩 Fun Facts: 1) Sparrows can fly at 45.5 km/h, 2) They can swim!, 3) They eat tiny stones for digestion, 4) Males fight over females by singing, 5) They remember human faces, 6) A group is called a 'quarrel', 7) They've lived alongside humans for 10,000 years!" },
        { q: "organic farming", k: ["organic", "farming", "pesticide free", "natural farm", "nammalvar"], a: "🌱 Organic farming directly helps sparrows! Pesticide-free fields have more insects for baby sparrows to eat. Our trust supports the legacy of Ayya Nammalvaar's organic farming movement. Healthy farms = healthy sparrows!" },
        { q: "coimbatore", k: ["coimbatore", "kovai", "cbe", "tamil nadu"], a: "🏙️ Coimbatore (Kovai) is our home base! The city still has decent sparrow populations compared to metros. Our office is at RK Puram, Ganapathy. We work with local schools, shops, apartments, and parks across the Coimbatore district." }
    ];

    function getAIResponse(userInput) {
        const input = userInput.toLowerCase();

        if (input.includes('clear') || input.includes('reset')) {
            setTimeout(() => {
                messagesContainer.innerHTML = `
                    <div class="message ai">
                        Conversation cleared. How else can I help you?
                    </div>
                `;
            }, 500);
            return "Sure! I'm resetting our chat.";
        }

        for (const item of knowledgeBase) {
            if (item.k.some(keyword => input.includes(keyword))) {
                return item.a;
            }
        }

        return "I'm not sure about that, but I can help with: sparrow diet 🌾, nest boxes 🏠, why sparrows are declining 📉, how to help 🤝, or about our trust 🏛️. Try asking one of those!";
    }
});
