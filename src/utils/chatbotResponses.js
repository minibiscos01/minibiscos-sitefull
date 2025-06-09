/**
 * MiniBiscos Chatbot - Assistant Script
 * Updated with real company information
 * Created to provide a welcoming and efficient experience
 */

// Main knowledge base
const knowledgeBase = {
  products: [
    {
      query: ["products", "cookies", "flavors", "cookies", "varieties"],
      response: "MiniBiscos offers artisanal buttery cookies in seven fixed flavors, plus special editions depending on the season. Each cookie is made with selected ingredients and a touch of love. Would you like to know our current flavors?"
    },
    {
      query: ["seasonal", "limited edition", "special dates", "christmas", "easter", "mother's day"],
      response: "Our seasonal flavors celebrate each time of year with special recipes. At the moment we have a limited edition for Mother's Day. Would you like to see?"
    }
  ],
  prices: [
    {
      query: ["price", "prices", "how much", "cost", "price list"],
      response: "Prices vary according to type and quantity. We work with kits and special packaging. Can I show you the prices or would you prefer to talk to the team via WhatsApp?"
    }
  ],
  ordering: [
    {
      query: ["order", "buy", "order", "place order", "how to order"],
      response: "Currently, we're accepting orders via WhatsApp, phone or email. Our online store will be available soon! Can I direct you to WhatsApp now?"
    },
    {
      query: ["events", "parties", "wholesale", "corporate", "wedding"],
      response: "We make special kits for events and custom party favors. Talk to our team to receive a custom proposal."
    }
  ],
  location: [
    {
      query: ["address", "where are you", "location", "visit", "physical store"],
      response: "We are an artisanal brand based in Rancho Cordova, California. We don't have a physical store yet, but we participate in farmers markets in the region. Follow our Instagram to know where we'll be!"
    }
  ],
  company: [
    {
      query: ["who are you", "about", "story", "company", "foundation"],
      response: "MiniBiscos was born from the union of two mothers with a common passion: transforming buttery cookies into unforgettable moments. Each recipe carries tradition, love and faith."
    },
    {
      query: ["ingredients", "quality", "raw materials", "what do you use"],
      response: "Our cookies are made with real butter, high-quality flour and selected ingredients including authentic Leite Ninho (Brazilian sweet powdered milk brand) in some of our specialty cookies. Nothing industrialized — everything handmade with care."
    }
  ],
  contact: [
    {
      query: ["phone", "contact", "email", "whatsapp", "talk to you"],
      response: "You can talk to us via WhatsApp by clicking the button here on the website, or through our social media. We're also available by email or phone. We're here to help!"
    },
    {
      query: ["problem", "complaint", "bad", "spoiled", "didn't like"],
      response: "We're sorry if something didn't go as expected. We want to fix it! Please talk to our team via WhatsApp so we can resolve it as quickly as possible."
    }
  ]
};

// Greeting messages
const greetings = [
  "Hello! Welcome to MiniBiscos 🍪 How can I sweeten your day today?",
  "Hi! Great to see you here. Need help with our cookies?",
  "Welcome to MiniBiscos — tradition, flavor, and faith. How can I help you?"
];

// Thank you responses
const thanksResponses = [
  "You're welcome! I'm always here if you need anything else.",
  "With love! Need more info?",
  "Happy to help 🍪"
];

// Goodbye responses
const goodbyeResponses = [
  "See you soon! May your day be as sweet as our cookies.",
  "It was a pleasure chatting with you. Come back to MiniBiscos anytime!",
  "Bye! See you at the next farmers market 🍪"
];

// Fallback responses
const fallbacks = [
  "Hmm, I couldn't find that information. Would you like to chat with our team on WhatsApp?",
  "Could you rephrase your question? Or I can connect you with our support team.",
  "I'm still learning. Maybe it's best to talk to one of our team members. Want me to help with that?"
];

// Main function to generate response
export const getChatbotResponse = (userInput) => {
  const input = userInput.toLowerCase().trim();
  if (!input) return "Looks like you didn't type anything. How can I help?";

  if (containsAny(input, ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"])) {
    return getRandomItem(greetings);
  }

  if (containsAny(input, ["thank", "thanks", "appreciate", "grateful"])) {
    return getRandomItem(thanksResponses);
  }

  if (containsAny(input, ["bye", "goodbye", "see you", "farewell", "take care", "later", "cya"])) {
    return getRandomItem(goodbyeResponses);
  }

  for (const category in knowledgeBase) {
    for (const item of knowledgeBase[category]) {
      if (containsAny(input, item.query)) {
        return item.response;
      }
    }
  }

  return getRandomItem(fallbacks);
};

function containsAny(input, wordList) {
  return wordList.some(word => input.includes(word));
}

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}