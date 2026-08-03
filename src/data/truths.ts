import type { Question } from './questionTypes';

export const truths: Question[] = [
  // ----- KIDS -----
  // Funny
  { text: 'What is the funniest thing that has ever happened to you?', ageGroup: 'kids', type: 'Funny', category: 'mild' },
  { text: 'What is the silliest name you can make up for a pet?', ageGroup: 'kids', type: 'Funny', category: 'mild' },
  { text: 'If animals could talk, which one would be the funniest and why?', ageGroup: 'kids', type: 'Funny', category: 'medium' },
  { text: 'What is the funniest joke you have ever heard?', ageGroup: 'kids', type: 'Funny', category: 'medium' },
  { text: 'What is the funniest mistake you have ever made in front of a crowd?', ageGroup: 'kids', type: 'Funny', category: 'wild' },
  { text: 'What is the most ridiculous thing you have ever done to make someone laugh?', ageGroup: 'kids', type: 'Funny', category: 'wild' },
  // Family
  { text: 'What is your favorite thing to do with your family?', ageGroup: 'kids', type: 'Family', category: 'mild' },
  { text: 'Who in your family is the best cook and why?', ageGroup: 'kids', type: 'Family', category: 'mild' },
  { text: 'What is a family tradition you love the most?', ageGroup: 'kids', type: 'Family', category: 'medium' },
  { text: 'What is the funniest thing a family member has ever said?', ageGroup: 'kids', type: 'Family', category: 'medium' },
  { text: 'If you could swap families for a day, whose family would you pick?', ageGroup: 'kids', type: 'Family', category: 'wild' },
  { text: 'What is the most surprising thing you have learned about a family member?', ageGroup: 'kids', type: 'Family', category: 'wild' },
  // School
  { text: 'What is your favorite subject in school and why?', ageGroup: 'kids', type: 'School', category: 'mild' },
  { text: 'Who is your best friend at school?', ageGroup: 'kids', type: 'School', category: 'mild' },
  { text: 'What is the funniest thing that ever happened during class?', ageGroup: 'kids', type: 'School', category: 'medium' },
  { text: 'If you could be the teacher for a day, what would you teach?', ageGroup: 'kids', type: 'School', category: 'medium' },
  { text: 'What is the most mischievous thing you have ever done at school?', ageGroup: 'kids', type: 'School', category: 'wild' },
  { text: 'If you could add a new subject to school, what would it be?', ageGroup: 'kids', type: 'School', category: 'wild' },
  // Adventure
  { text: 'If you could go on an adventure anywhere, where would you go?', ageGroup: 'kids', type: 'Adventure', category: 'mild' },
  { text: 'What is the most exciting place you have ever visited?', ageGroup: 'kids', type: 'Adventure', category: 'mild' },
  { text: 'If you found a treasure map, what would you do first?', ageGroup: 'kids', type: 'Adventure', category: 'medium' },
  { text: 'What is the bravest thing you have ever done?', ageGroup: 'kids', type: 'Adventure', category: 'medium' },
  { text: 'If you could ride any animal into a jungle, which animal would you choose?', ageGroup: 'kids', type: 'Adventure', category: 'wild' },
  { text: 'What adventure would you plan if you had a magic backpack?', ageGroup: 'kids', type: 'Adventure', category: 'wild' },
  // Silly
  { text: 'What is the silliest face you can make right now?', ageGroup: 'kids', type: 'Silly', category: 'mild' },
  { text: 'If you had to wear a funny costume every day, what would it be?', ageGroup: 'kids', type: 'Silly', category: 'mild' },
  { text: 'What is the weirdest food combination you actually like?', ageGroup: 'kids', type: 'Silly', category: 'medium' },
  { text: 'What is a silly song you sing when nobody is listening?', ageGroup: 'kids', type: 'Silly', category: 'medium' },
  { text: 'If you could talk in animal sounds for a day, what animal would you sound like?', ageGroup: 'kids', type: 'Silly', category: 'wild' },
  { text: 'What is the goofiest dance move you know?', ageGroup: 'kids', type: 'Silly', category: 'wild' },

  // ----- TEENS -----
  // Funny
  { text: 'What is the funniest meme you have ever seen?', ageGroup: 'teens', type: 'Funny', category: 'mild' },
  { text: 'What is the most awkward thing you have ever said to a crush?', ageGroup: 'teens', type: 'Funny', category: 'mild' },
  { text: 'What is the funniest text you have ever sent to the wrong person?', ageGroup: 'teens', type: 'Funny', category: 'medium' },
  { text: 'What is the cringiest thing you have done in front of your friends?', ageGroup: 'teens', type: 'Funny', category: 'medium' },
  { text: 'What is the funniest rumor someone has started about you?', ageGroup: 'teens', type: 'Funny', category: 'wild' },
  { text: 'What is the weirdest thing you have done at a sleepover?', ageGroup: 'teens', type: 'Funny', category: 'wild' },
  // Friends
  { text: 'Who is your closest friend and why?', ageGroup: 'teens', type: 'Friends', category: 'mild' },
  { text: 'What is the best thing a friend has ever done for you?', ageGroup: 'teens', type: 'Friends', category: 'mild' },
  { text: 'What is a secret you have kept from your best friend?', ageGroup: 'teens', type: 'Friends', category: 'medium' },
  { text: 'If your best friend could read your mind for a day, what would they find?', ageGroup: 'teens', type: 'Friends', category: 'medium' },
  { text: 'What is the most trouble you and your friends have ever gotten into?', ageGroup: 'teens', type: 'Friends', category: 'wild' },
  { text: 'What is something you would never do even if your friends dared you?', ageGroup: 'teens', type: 'Friends', category: 'wild' },
  // School
  { text: 'What is the easiest subject for you at school?', ageGroup: 'teens', type: 'School', category: 'mild' },
  { text: 'What is your favorite memory from school so far?', ageGroup: 'teens', type: 'School', category: 'mild' },
  { text: 'What is the most awkward moment you have had in class?', ageGroup: 'teens', type: 'School', category: 'medium' },
  { text: 'If you could skip one class forever, which would it be?', ageGroup: 'teens', type: 'School', category: 'medium' },
  { text: 'What is the biggest lie you have told a teacher?', ageGroup: 'teens', type: 'School', category: 'wild' },
  { text: 'What is the most embarrassing thing that happened to you during an exam?', ageGroup: 'teens', type: 'School', category: 'wild' },
  // Party
  { text: 'What is the best party you have ever been to?', ageGroup: 'teens', type: 'Party', category: 'mild' },
  { text: 'What is the first thing you do when you arrive at a party?', ageGroup: 'teens', type: 'Party', category: 'mild' },
  { text: 'What is the most awkward thing you have done at a party?', ageGroup: 'teens', type: 'Party', category: 'medium' },
  { text: 'If you could plan the perfect party, what would it include?', ageGroup: 'teens', type: 'Party', category: 'medium' },
  { text: 'What is the craziest thing you have seen at a party?', ageGroup: 'teens', type: 'Party', category: 'wild' },
  { text: 'What is a party game you secretly love?', ageGroup: 'teens', type: 'Party', category: 'wild' },
  // Embarrassing
  { text: 'What is the most embarrassing photo of you that exists?', ageGroup: 'teens', type: 'Embarrassing', category: 'mild' },
  { text: 'What is the most embarrassing thing in your search history?', ageGroup: 'teens', type: 'Embarrassing', category: 'mild' },
  { text: 'What is the most embarrassing moment you have ever had?', ageGroup: 'teens', type: 'Embarrassing', category: 'medium' },
  { text: 'What is the most embarrassing thing your parents have said in front of your friends?', ageGroup: 'teens', type: 'Embarrassing', category: 'medium' },
  { text: 'What is the most embarrassing thing you have ever done for a dare?', ageGroup: 'teens', type: 'Embarrassing', category: 'wild' },
  { text: 'What is a habit you have that you would be embarrassed for anyone to know?', ageGroup: 'teens', type: 'Embarrassing', category: 'wild' },
  // Challenge
  { text: 'What is the hardest thing you have ever tried to learn?', ageGroup: 'teens', type: 'Challenge', category: 'mild' },
  { text: 'What is a challenge you want to conquer this year?', ageGroup: 'teens', type: 'Challenge', category: 'mild' },
  { text: 'What is the biggest risk you have ever taken?', ageGroup: 'teens', type: 'Challenge', category: 'medium' },
  { text: 'What is something you quit and now regret?', ageGroup: 'teens', type: 'Challenge', category: 'medium' },
  { text: 'What is the most extreme challenge you have ever completed?', ageGroup: 'teens', type: 'Challenge', category: 'wild' },
  { text: 'What is something you are scared to try but would love to do?', ageGroup: 'teens', type: 'Challenge', category: 'wild' },

  // ----- ADULTS -----
  // Funny
  { text: 'What is the funniest thing a coworker has ever said?', ageGroup: 'adults', type: 'Funny', category: 'mild' },
  { text: 'What is the most awkward thing you have done on a video call?', ageGroup: 'adults', type: 'Funny', category: 'mild' },
  { text: 'What is the funniest thing you have ever overheard?', ageGroup: 'adults', type: 'Funny', category: 'medium' },
  { text: 'What is the weirdest thing you have done when you thought nobody was watching?', ageGroup: 'adults', type: 'Funny', category: 'medium' },
  { text: 'What is the most embarrassing thing you have done in public as an adult?', ageGroup: 'adults', type: 'Funny', category: 'wild' },
  { text: 'What is the funniest argument you have ever had?', ageGroup: 'adults', type: 'Funny', category: 'wild' },
  // Friends
  { text: 'What is the best trip you have ever taken with friends?', ageGroup: 'adults', type: 'Friends', category: 'mild' },
  { text: 'What is something you only talk about with your closest friends?', ageGroup: 'adults', type: 'Friends', category: 'mild' },
  { text: 'What is a secret your best friend still does not know?', ageGroup: 'adults', type: 'Friends', category: 'medium' },
  { text: 'If your friends ranked you, what would they say you are best at?', ageGroup: 'adults', type: 'Friends', category: 'medium' },
  { text: 'What is the wildest night out you have had with friends?', ageGroup: 'adults', type: 'Friends', category: 'wild' },
  { text: 'What is a lie you have told a friend that they still believe?', ageGroup: 'adults', type: 'Friends', category: 'wild' },
  // Party
  { text: 'What is the best party you have ever hosted?', ageGroup: 'adults', type: 'Party', category: 'mild' },
  { text: 'What is your signature party drink or snack?', ageGroup: 'adults', type: 'Party', category: 'mild' },
  { text: 'What is the most awkward thing that has happened at a party you attended?', ageGroup: 'adults', type: 'Party', category: 'medium' },
  { text: 'What is a party game you are suspiciously good at?', ageGroup: 'adults', type: 'Party', category: 'medium' },
  { text: 'What is the craziest party you have ever been to?', ageGroup: 'adults', type: 'Party', category: 'wild' },
  { text: 'What is the most you have ever spent on a night out?', ageGroup: 'adults', type: 'Party', category: 'wild' },
  // Romantic
  { text: 'What is the most romantic thing anyone has done for you?', ageGroup: 'adults', type: 'Romantic', category: 'mild' },
  { text: 'What is your idea of a perfect date?', ageGroup: 'adults', type: 'Romantic', category: 'mild' },
  { text: 'What is the best love advice you have ever received?', ageGroup: 'adults', type: 'Romantic', category: 'medium' },
  { text: 'What is the most romantic movie scene that gets you every time?', ageGroup: 'adults', type: 'Romantic', category: 'medium' },
  { text: 'What is the most spontaneous romantic thing you have ever done?', ageGroup: 'adults', type: 'Romantic', category: 'wild' },
  { text: 'What is the most embarrassing thing you have done for love?', ageGroup: 'adults', type: 'Romantic', category: 'wild' },
  // Spicy
  { text: 'What is a flirty text you would actually send?', ageGroup: 'adults', type: 'Spicy', category: 'mild' },
  { text: 'What is the most confident you have ever felt on a date?', ageGroup: 'adults', type: 'Spicy', category: 'mild' },
  { text: 'What is the boldest thing you have ever done on a first date?', ageGroup: 'adults', type: 'Spicy', category: 'medium' },
  { text: 'What is something you find secretly attractive that would surprise people?', ageGroup: 'adults', type: 'Spicy', category: 'medium' },
  { text: 'What is the spiciest confession you are willing to share?', ageGroup: 'adults', type: 'Spicy', category: 'wild' },
  { text: 'What is the wildest thing you have done when you had a crush?', ageGroup: 'adults', type: 'Spicy', category: 'wild' },
  // Extreme
  { text: 'What is the most extreme thing on your bucket list?', ageGroup: 'adults', type: 'Extreme', category: 'mild' },
  { text: 'What is the most adventurous trip you have ever taken?', ageGroup: 'adults', type: 'Extreme', category: 'mild' },
  { text: 'What is the riskiest decision you have ever made?', ageGroup: 'adults', type: 'Extreme', category: 'medium' },
  { text: 'What is the most extreme thing you have done for a thrill?', ageGroup: 'adults', type: 'Extreme', category: 'medium' },
  { text: 'What is the most dangerous thing you have ever done?', ageGroup: 'adults', type: 'Extreme', category: 'wild' },
  { text: 'What is a wild secret you have never told anyone at this party?', ageGroup: 'adults', type: 'Extreme', category: 'wild' },
];
