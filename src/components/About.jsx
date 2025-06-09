import './CircularLogo.css';

const About = () => {
  // No historical milestones yet as we're a new home-based business founded in 2025

  const values = [
    {
      icon: "🏠",
      title: "Home-Made",
      description: "Every cookie is baked with care in our home kitchen, ensuring that personal touch"
    },
    {
      icon: "⭐",
      title: "Quality Ingredients",
      description: "We carefully select the best ingredients to create delicious, memorable cookies"
    },
    {
      icon: "❤️",
      title: "Made with Love",
      description: "Our passion for baking shines through in every batch of cookies we create"
    },
    {
      icon: "👨‍👩‍👧‍👦",
      title: "Family First",
      description: "As moms, we built this business to share our love of baking while being present for our families"
    }
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <div className="flex justify-center mb-4">
          <img 
            src="/assets/images/minibiscos-logo-circular.png" 
            alt="MiniBiscos Logo" 
            className="w-16 h-16 rounded-full border-2 border-amber-400" 
          />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">About Us</h2>
        <p className="text-lg text-amber-800 max-w-2xl mx-auto">
          Learn about our history, values, and what makes us special in the world of artisanal cookies
        </p>
      </div>

      {/* Our Story */}
      <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
        <div className="lg:w-1/2">
          <div className="relative">
            {/* Image would be here - using placeholder */}
            <div className="aspect-[4/3] bg-amber-200 rounded-lg overflow-hidden">
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: 'url("/assets/images/bakery-placeholder.jpg")' }}
              ></div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-amber-300 rounded-lg -z-10"></div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-500 rounded-lg -z-10"></div>
          </div>
        </div>
        
        <div className="lg:w-1/2">
          <h3 className="text-2xl font-bold text-amber-800 mb-4">Our Story</h3>
          <p className="text-amber-700 mb-4 text-justify">
            ✨ Welcome to MiniBiscos! ✨
          </p>
          <p className="text-amber-700 mb-4 text-justify">
            We are two moms who decided to turn sweet moments into something even more special — a business built with love, purpose, and flavor!
          </p>
          <p className="text-amber-700 mb-4 text-justify">
            MiniBiscos was born in February 2025, but the recipe goes way back — the kind that warms your heart and takes you straight to childhood. When I was around 10 years old, I used to spend hours in the kitchen experimenting with recipes from little cookbooks my mom gave me. Over time, I lost the recipe… until years later, during a visit to my friend (now my business partner), her mother-in-law, sweet Grandma Beth, served us cookies that instantly brought back those memories.
          </p>
          <p className="text-amber-700 mb-4 text-justify">
            It was the taste of my childhood! I asked for the recipe right away and invited my friend to start baking them with me. And that's how MiniBiscos came to life — homemade cookies that carry love in every bite, all while allowing us to remain present and active in our children's lives 💕👩‍👧‍👦
          </p>
          <p className="text-amber-700 text-justify">
            MiniBiscos is made at home, with simple ingredients and lots of love.
          </p>
        </div>
      </div>

      {/* Our New Beginning */}
      <div className="mb-20 bg-amber-50 p-8 rounded-lg border border-amber-200">
        <h3 className="text-2xl font-bold text-amber-800 text-center mb-6">Our New Beginning</h3>
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-block bg-amber-200 rounded-full px-4 py-1 text-amber-800 font-bold mb-6">
            February 2025
          </div>
          <p className="text-amber-700 mb-4">
            MiniBiscos is a new home-based business founded with passion and love for baking. 
            We're at the beginning of our journey, creating delicious artisanal cookies 
            from our home kitchen in Sacramento.
          </p>
          <p className="text-amber-700">
            As we grow, we look forward to sharing our cookies with more people and 
            becoming a cherished part of our local community.
          </p>
        </div>
      </div>

      {/* Our Values */}
      <div>
        <h3 className="text-2xl font-bold text-amber-800 text-center mb-10">Our Values</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center transition-transform hover:scale-105">
              <div className="text-4xl mb-4">{value.icon}</div>
              <h4 className="text-xl font-bold text-amber-900 mb-2">{value.title}</h4>
              <p className="text-amber-700">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;