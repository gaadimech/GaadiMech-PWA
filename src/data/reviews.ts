interface Review {
  initial: string;
  name: string;
  text: string;
  service: string;
}

export const reviews: Review[] = [
  // Periodic Service Reviews
    {
      "initial": "L",
      "name": "Leela",
      "text": "GaadiMech's express service is legit! My Maruti was back on the road in no time. *Koi dikkat nahi hui*. Fast and efficient, just what I needed!",
      "service": "express"
    },
    {
      "initial": "R",
      "name": "Ridhi",
      "text": "Super quick express service by GaadiMech! I dropped my car off during lunch, and it was ready before I got off work. *Paisa vasool!* Highly recommended for busy people.",
      "service": "express"
    },
    {
      "initial": "J",
      "name": "Jai",
      "text": "Was in a rush and GaadiMech's express service saved my day. They changed my oil and filters *phatafat*. Great service and no time wasted!",
      "service": "express"
    },
    {
      "initial": "G",
      "name": "Gauri",
      "text": "GaadiMech's periodic service is so thorough. They checked everything and explained it all to me in detail. Now my car feels brand new! *Shandar!*",
      "service": "periodic"
    },
    {
      "initial": "K",
      "name": "Kishan",
      "text": "*Maine apni gaadi ki* periodic service GaadiMech *se karwai*. They did a fantastic job, and the prices are reasonable too. *Full marks!*",
      "service": "periodic"
    },
    {
      "initial": "B",
      "name": "Bhavya",
      "text": "GaadiMech's periodic maintenance package is excellent. They really go the extra mile. My car is running smoother than ever. *Bahut Acha!*",
      "service": "periodic"
    },
    {
      "initial": "D",
      "name": "Dhara",
      "text": "Got a nasty dent fixed at GaadiMech. The paint job is flawless, *bilkul* original जैसा! You can't even tell there was a dent there before. *Mast kaam!*",
      "service": "dent_paint"
    },
    {
      "initial": "R",
      "name": "Rajmata",
      "text": "GaadiMech did an amazing job with my car's dent and paint. The color match is perfect, and the finish is smooth. *Ekdum* professional!",
      "service": "dent_paint"
    },
    {
      "initial": "M",
      "name": "Meera",
      "text": "I was worried about getting my car's paint damaged, but GaadiMech's dent paint service was top-notch. They restored my car to its former glory. *Zabardast!*",
      "service": "dent_paint"
    },
    {
      "initial": "A",
      "name": "Aarav",
      "text": "GaadiMech's car spa and wash is heavenly! My car looks like it just came out of the showroom. *Itni chamak!* Highly recommend it for a pampering session.",
      "service": "car_spa"
    },
    {
      "initial": "A",
      "name": "Aditya",
      "text": "My car was in desperate need of a good wash, and GaadiMech delivered. They cleaned every nook and cranny. *Dhulaai mast thi!*",
      "service": "car_spa"
    },
    {
      "initial": "A",
      "name": "Anaya",
      "text": "GaadiMech's car spa is the best in town! They use quality products and take their time to make sure your car is spotless. *Kya service hai!*",
      "service": "car_spa"
    },
    {
      "initial": "A",
      "name": "Arjun",
      "text": "GaadiMech made tyre replacement easy. They helped me choose the right tyres for my car and the installation was quick. *Koi tension nahi!*",
      "service": "tyre_replacement"
    },
    {
      "initial": "C",
      "name": "Chirag",
      "text": "Got my tyres replaced at GaadiMech. Great selection of brands and the staff was very helpful. *Badhiya service!*",
      "service": "tyre_replacement"
    },
    {
      "initial": "D",
      "name": "Dhanraj",
      "text": "GaadiMech offered the best price for my new tyres. The fitting was done professionally, and they even checked the alignment. *Ek number!*",
      "service": "tyre_replacement"
    },
    {
      "initial": "D",
      "name": "Devendra",
      "text": "GaadiMech replaced my cracked windshield quickly and efficiently. The new windshield looks great. *Gazab!*",
      "service": "windshield_replacement"
    },
    {
      "initial": "G",
      "name": "Gaurav",
      "text": "Excellent windshield replacement service at GaadiMech. They used high-quality glass, and the installation was perfect. *Full paisa vasool!*",
      "service": "windshield_replacement"
    },
    {
      "initial": "H",
      "name": "Harendra",
      "text": "GaadiMech provided a hassle-free windshield replacement. The staff was courteous, and the price was reasonable. *Aaram se ho gaya!*",
      "service": "windshield_replacement"
    },
    {
      "initial": "H",
      "name": "Hemant",
      "text": "GaadiMech's AC service made my car's AC blow ice cold again! *Garmi se rahat mili*. They were thorough and professional.",
      "service": "ac_service"
    },
    {
      "initial": "H",
      "name": "Hitesh",
      "text": "My car's AC wasn't working at all, but GaadiMech fixed it in no time. Now it's perfect for the summer heat. *Kya thandi hawa hai!*",
      "service": "ac_service"
    },
    {
      "initial": "I",
      "name": "Ishaan",
      "text": "GaadiMech's AC service is top-notch. They cleaned the vents, recharged the gas, and now my AC is working like new. *Shaandar service!*",
      "service": "ac_service"
    },
    {
      "initial": "J",
      "name": "Jaidev",
      "text": "GaadiMech's battery service was quick and efficient. They diagnosed the problem and replaced the battery without any hassle. *Jaldi kaam ho gaya!*",
      "service": "battery_service"
    },
    {
      "initial": "J",
      "name": "Jitendra",
      "text": "My car wouldn't start, but GaadiMech came to the rescue. They replaced the battery on the spot. *Hero log!*",
      "service": "battery_service"
    },
    {
      "initial": "K",
      "name": "Karanveer",
      "text": "GaadiMech has a good range of batteries and they helped me choose the right one for my car. The installation was smooth and professional. *Koi dikkat nahi hui!*",
      "service": "battery_service"
    },
    {
      "initial": "L",
      "name": "Lakshya",
      "text": "GaadiMech's car detailing service is unbelievable! My car looks better than when I bought it. *Kya chamak hai!* Highly recommended!",
      "service": "car_detailing"
    },
    {
      "initial": "M",
      "name": "Mahendra",
      "text": "GaadiMech's detailing service is worth every penny. They cleaned the interior and exterior perfectly. *Ekdum naya jaisa!*",
      "service": "car_detailing"
    },
    {
      "initial": "M",
      "name": "Manveer",
      "text": "I was amazed by the results of GaadiMech's car detailing. They removed all the scratches and swirl marks. *Gadi ekdum mast ho gayi!*",
      "service": "car_detailing"
    }
  
  // Add more reviews for other services...
];

export const getReviewsByService = (serviceName: string): Review[] => {
  return reviews.filter(review => review.service === serviceName);
}; 