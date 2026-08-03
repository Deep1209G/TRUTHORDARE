import type { Question } from './questionTypes';

export const dares: Question[] = [
  // ----- KIDS -----
  // Funny
  { text: 'Do your best animal impression until your next turn.', ageGroup: 'kids', type: 'Funny', category: 'mild' },
  { text: 'Tell the funniest joke you know without laughing.', ageGroup: 'kids', type: 'Funny', category: 'mild' },
  { text: 'Talk like a robot for the next 2 turns.', ageGroup: 'kids', type: 'Funny', category: 'medium' },
  { text: 'Sing your favorite song in a funny voice.', ageGroup: 'kids', type: 'Funny', category: 'medium' },
  { text: 'Do a silly walk across the room twice.', ageGroup: 'kids', type: 'Funny', category: 'wild' },
  { text: 'Make up a new dance move and teach it to the group.', ageGroup: 'kids', type: 'Funny', category: 'wild' },
  // Family
  { text: 'Say one nice thing about every family member in the room.', ageGroup: 'kids', type: 'Family', category: 'mild' },
  { text: 'Give everyone in the room a compliment.', ageGroup: 'kids', type: 'Family', category: 'mild' },
  { text: 'Tell a funny story about your family.', ageGroup: 'kids', type: 'Family', category: 'medium' },
  { text: 'Imitate the funniest thing a family member does.', ageGroup: 'kids', type: 'Family', category: 'medium' },
  { text: 'Call a family member and tell them you love them.', ageGroup: 'kids', type: 'Family', category: 'wild' },
  { text: 'Let the group ask your family one question about you.', ageGroup: 'kids', type: 'Family', category: 'wild' },
  // School
  { text: 'Recite the alphabet backwards as fast as you can.', ageGroup: 'kids', type: 'School', category: 'mild' },
  { text: 'Name 5 things you learned in school this week.', ageGroup: 'kids', type: 'School', category: 'mild' },
  { text: 'Act out your favorite school subject without speaking.', ageGroup: 'kids', type: 'School', category: 'medium' },
  { text: 'Give your teacher the best compliment you can think of.', ageGroup: 'kids', type: 'School', category: 'medium' },
  { text: 'Pretend you are the teacher and give a mini lesson for 30 seconds.', ageGroup: 'kids', type: 'School', category: 'wild' },
  { text: 'Do 10 jumping jacks while counting by 2s.', ageGroup: 'kids', type: 'School', category: 'wild' },
  // Adventure
  { text: 'Name 5 countries you want to visit.', ageGroup: 'kids', type: 'Adventure', category: 'mild' },
  { text: 'Walk like you are on a tightrope for 10 seconds.', ageGroup: 'kids', type: 'Adventure', category: 'mild' },
  { text: 'Invent a secret handshake with a friend.', ageGroup: 'kids', type: 'Adventure', category: 'medium' },
  { text: 'Pretend you are an explorer searching for treasure.', ageGroup: 'kids', type: 'Adventure', category: 'medium' },
  { text: 'Do an animal walk (bear crawl or crab walk) across the room.', ageGroup: 'kids', type: 'Adventure', category: 'wild' },
  { text: 'Make up a mini adventure story in 30 seconds.', ageGroup: 'kids', type: 'Adventure', category: 'wild' },
  // Silly
  { text: 'Make the silliest face and hold it for 10 seconds.', ageGroup: 'kids', type: 'Silly', category: 'mild' },
  { text: 'Speak in a silly accent for the next 2 turns.', ageGroup: 'kids', type: 'Silly', category: 'mild' },
  { text: 'Do a funny dance for 15 seconds.', ageGroup: 'kids', type: 'Silly', category: 'medium' },
  { text: 'Say everything backwards for the next turn.', ageGroup: 'kids', type: 'Silly', category: 'medium' },
  { text: 'Let the group pick a silly nickname for you for the rest of the game.', ageGroup: 'kids', type: 'Silly', category: 'wild' },
  { text: 'Imitate your favorite cartoon character.', ageGroup: 'kids', type: 'Silly', category: 'wild' },

  // ----- TEENS -----
  // Funny
  { text: 'Send a funny meme to your group chat.', ageGroup: 'teens', type: 'Funny', category: 'mild' },
  { text: 'Tell a joke that makes the whole group laugh.', ageGroup: 'teens', type: 'Funny', category: 'mild' },
  { text: 'Recreate a funny meme pose right now.', ageGroup: 'teens', type: 'Funny', category: 'medium' },
  { text: 'Talk in a movie trailer voice for the next turn.', ageGroup: 'teens', type: 'Funny', category: 'medium' },
  { text: 'Let the group scroll your phone for 30 seconds.', ageGroup: 'teens', type: 'Funny', category: 'wild' },
  { text: 'Do the most dramatic slow-motion walk you can.', ageGroup: 'teens', type: 'Funny', category: 'wild' },
  // Friends
  { text: 'Say one thing you appreciate about each friend in the room.', ageGroup: 'teens', type: 'Friends', category: 'mild' },
  { text: 'Let a friend pick your profile picture for the next hour.', ageGroup: 'teens', type: 'Friends', category: 'mild' },
  { text: 'Text your best friend a weird compliment.', ageGroup: 'teens', type: 'Friends', category: 'medium' },
  { text: 'Let the group ask your best friend a question about you.', ageGroup: 'teens', type: 'Friends', category: 'medium' },
  { text: 'Let a friend post something on your social media.', ageGroup: 'teens', type: 'Friends', category: 'wild' },
  { text: 'Do a trust fall with the group.', ageGroup: 'teens', type: 'Friends', category: 'wild' },
  // School
  { text: 'Name 5 things you learned this week at school.', ageGroup: 'teens', type: 'School', category: 'mild' },
  { text: 'Recite a line from your favorite show in a class voice.', ageGroup: 'teens', type: 'School', category: 'mild' },
  { text: 'Tell the group about the most awkward moment you had at school.', ageGroup: 'teens', type: 'School', category: 'medium' },
  { text: 'Give a 30-second mini lesson on your favorite subject.', ageGroup: 'teens', type: 'School', category: 'medium' },
  { text: 'Impersonate your favorite teacher.', ageGroup: 'teens', type: 'School', category: 'wild' },
  { text: 'Let the group check your school bag or pencil case.', ageGroup: 'teens', type: 'School', category: 'wild' },
  // Party
  { text: 'Name a party song everyone has to dance to.', ageGroup: 'teens', type: 'Party', category: 'mild' },
  { text: 'Start a group chant.', ageGroup: 'teens', type: 'Party', category: 'mild' },
  { text: 'Do a TikTok-style dance for 20 seconds.', ageGroup: 'teens', type: 'Party', category: 'medium' },
  { text: 'Let the group vote on your next dance move.', ageGroup: 'teens', type: 'Party', category: 'medium' },
  { text: 'Take a group selfie and post it with a funny caption.', ageGroup: 'teens', type: 'Party', category: 'wild' },
  { text: 'Spin a water bottle and do whatever it lands on.', ageGroup: 'teens', type: 'Party', category: 'wild' },
  // Embarrassing
  { text: 'Show the group the most recent photo in your camera roll.', ageGroup: 'teens', type: 'Embarrassing', category: 'mild' },
  { text: 'Tell the group your most embarrassing username.', ageGroup: 'teens', type: 'Embarrassing', category: 'mild' },
  { text: 'Reveal the most embarrassing thing in your search history.', ageGroup: 'teens', type: 'Embarrassing', category: 'medium' },
  { text: 'Do a dramatic reenactment of your most embarrassing moment.', ageGroup: 'teens', type: 'Embarrassing', category: 'medium' },
  { text: 'Let the group read your last text out loud.', ageGroup: 'teens', type: 'Embarrassing', category: 'wild' },
  { text: 'Show your most embarrassing saved video if you have one.', ageGroup: 'teens', type: 'Embarrassing', category: 'wild' },
  // Challenge
  { text: 'Hold a plank for 30 seconds.', ageGroup: 'teens', type: 'Challenge', category: 'mild' },
  { text: 'Balance a book on your head for 30 seconds.', ageGroup: 'teens', type: 'Challenge', category: 'mild' },
  { text: 'Do 15 pushups.', ageGroup: 'teens', type: 'Challenge', category: 'medium' },
  { text: 'Recite the alphabet backwards in under 15 seconds.', ageGroup: 'teens', type: 'Challenge', category: 'medium' },
  { text: 'Do 20 jumping jacks while singing the alphabet.', ageGroup: 'teens', type: 'Challenge', category: 'wild' },
  { text: 'Complete a 60-second silence challenge while the group tries to make you laugh.', ageGroup: 'teens', type: 'Challenge', category: 'wild' },

  // ----- ADULTS -----
  // Funny
  { text: 'Tell a funny story about yourself from work.', ageGroup: 'adults', type: 'Funny', category: 'mild' },
  { text: 'Impersonate a coworker or boss without naming them.', ageGroup: 'adults', type: 'Funny', category: 'mild' },
  { text: 'Do your best impression of a famous person.', ageGroup: 'adults', type: 'Funny', category: 'medium' },
  { text: 'Talk like a news anchor for the next 2 turns.', ageGroup: 'adults', type: 'Funny', category: 'medium' },
  { text: 'Let the group go through your most recent photos for 1 minute.', ageGroup: 'adults', type: 'Funny', category: 'wild' },
  { text: 'Do the most dramatic reaction to a fake surprise.', ageGroup: 'adults', type: 'Funny', category: 'wild' },
  // Friends
  { text: 'Text a friend something nice right now.', ageGroup: 'adults', type: 'Friends', category: 'mild' },
  { text: 'Give everyone in the room a genuine compliment.', ageGroup: 'adults', type: 'Friends', category: 'mild' },
  { text: 'Let the group ask your closest friend a question about you.', ageGroup: 'adults', type: 'Friends', category: 'medium' },
  { text: 'Share the most interesting conversation you have had this month.', ageGroup: 'adults', type: 'Friends', category: 'medium' },
  { text: 'Let a friend post a story on your social media.', ageGroup: 'adults', type: 'Friends', category: 'wild' },
  { text: 'Let the group read your last 3 text messages out loud.', ageGroup: 'adults', type: 'Friends', category: 'wild' },
  // Party
  { text: 'Do a cheers with the group and say one thing you are grateful for.', ageGroup: 'adults', type: 'Party', category: 'mild' },
  { text: 'Start a conga line.', ageGroup: 'adults', type: 'Party', category: 'mild' },
  { text: 'Take a group shot with a ridiculous pose.', ageGroup: 'adults', type: 'Party', category: 'medium' },
  { text: 'Host a 30-second dance-off.', ageGroup: 'adults', type: 'Party', category: 'medium' },
  { text: 'Do a body shot off your own hand.', ageGroup: 'adults', type: 'Party', category: 'wild' },
  { text: 'Let the group pick a drink for you.', ageGroup: 'adults', type: 'Party', category: 'wild' },
  // Romantic
  { text: 'Name your dream date destination.', ageGroup: 'adults', type: 'Romantic', category: 'mild' },
  { text: 'Tell the group your favorite romantic movie line.', ageGroup: 'adults', type: 'Romantic', category: 'mild' },
  { text: 'Write a cheesy pickup line and deliver it to the group.', ageGroup: 'adults', type: 'Romantic', category: 'medium' },
  { text: 'Describe your perfect first date in 30 seconds.', ageGroup: 'adults', type: 'Romantic', category: 'medium' },
  { text: "Text someone 'thinking of you' and show the group the reply.", ageGroup: 'adults', type: 'Romantic', category: 'wild' },
  { text: 'Tell the group the most romantic thing you have ever done.', ageGroup: 'adults', type: 'Romantic', category: 'wild' },
  // Spicy
  { text: 'Rate your last date out of 10 and explain.', ageGroup: 'adults', type: 'Spicy', category: 'mild' },
  { text: 'Tell the group the best compliment you have ever received.', ageGroup: 'adults', type: 'Spicy', category: 'mild' },
  { text: 'Reveal a flirty line that actually works.', ageGroup: 'adults', type: 'Spicy', category: 'medium' },
  { text: 'Describe your celebrity crush in detail.', ageGroup: 'adults', type: 'Spicy', category: 'medium' },
  { text: 'Let the group pick someone for you to wink at.', ageGroup: 'adults', type: 'Spicy', category: 'wild' },
  { text: 'Tell the group your most daring dating story.', ageGroup: 'adults', type: 'Spicy', category: 'wild' },
  // Extreme
  { text: 'Take a shot of your drink with zero reaction.', ageGroup: 'adults', type: 'Extreme', category: 'mild' },
  { text: 'Do 20 pushups right now.', ageGroup: 'adults', type: 'Extreme', category: 'mild' },
  { text: 'Let the group do a 10-second phone check.', ageGroup: 'adults', type: 'Extreme', category: 'medium' },
  { text: 'Eat a spoonful of something spicy.', ageGroup: 'adults', type: 'Extreme', category: 'medium' },
  { text: 'Let the group choose a dare for you from your own bucket list.', ageGroup: 'adults', type: 'Extreme', category: 'wild' },
  { text: 'Call a random contact and sing happy birthday.', ageGroup: 'adults', type: 'Extreme', category: 'wild' },
];
