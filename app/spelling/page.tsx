'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Maximum Capacity UK Primary Curriculum Spelling Word Banks (~400 words per group)
const wordBanks: Record<string, { word: string; sentence: string; definition: string }[]> = {
  "Year 3 & 4": [
    { word: "accident", sentence: "The minor car accident caused a brief traffic delay.", definition: "An unexpected event that causes damage or injury." },
    { word: "accidental", sentence: "Dropping the cup was entirely accidental.", definition: "Happening by chance, unintentionally, or unexpectedly." },
    { word: "actual", sentence: "What is the actual cost of this book?", definition: "Existing in fact; real or exact." },
    { word: "actually", sentence: "I actually finished my homework early today.", definition: "As the truth or facts of a matter; really." },
    { word: "address", sentence: "Please write your home address clearly on the envelope.", definition: "The particulars of the place where someone lives or an organization is located." },
    { word: "answer", sentence: "Raise your hand if you know the answer.", definition: "A reply or response to a question or situation." },
    { word: "appear", sentence: "The stars begin to appear in the night sky.", definition: "Come into sight; become visible or noticeable." },
    { word: "arrive", sentence: "We expect to arrive at the station by noon.", definition: "Reach a destination at the end of a journey." },
    { word: "believe", sentence: "Always believe in your ability to solve puzzles.", definition: "Accept something as true or real." },
    { word: "bicycle", sentence: "Riding a bicycle is a great way to stay active.", definition: "A vehicle with two wheels powered by pedals." },
    { word: "breath", sentence: "Take a deep breath and relax.", definition: "The air taken into or expelled from the lungs." },
    { word: "breathe", sentence: "It feels good to breathe fresh morning air.", definition: "Take air into the lungs and send it out." },
    { word: "build", sentence: "We will build a tall tower with wooden blocks.", definition: "Construct something by putting parts or material together." },
    { word: "busy", sentence: "The playground was very busy at lunchtime.", definition: "Having a great deal to do or actively occupied." },
    { word: "business", sentence: "My uncle runs a small local business.", definition: "A commercial enterprise or organization." },
    { word: "calendar", sentence: "Mark the school sports day on your kitchen calendar.", definition: "A chart or page showing the days, weeks, and months of a year." },
    { word: "caught", sentence: "The goalkeeper caught the football easily.", definition: "Past tense of catch; intercepted or seized." },
    { word: "centre", sentence: "The town centre was very busy on Saturday.", definition: "The middle point or part of something." },
    { word: "century", sentence: "A century is equal to one hundred years.", definition: "A period of one hundred years." },
    { word: "certain", sentence: "I am certain that I locked the front door.", definition: "Known for sure; established beyond doubt." },
    { word: "circle", sentence: "Draw a neat circle using a compass.", definition: "A round plane figure whose boundary consists of points equidistant from the center." },
    { word: "complete", sentence: "Please complete all your math questions.", definition: "Finished or having all necessary parts." },
    { word: "consider", sentence: "Take a moment to consider your options.", definition: "Think carefully about something, typically before making a decision." },
    { word: "contain", sentence: "Does this box contain any fragile items?", definition: "Have or hold within." },
    { word: "continue", sentence: "We will continue reading the story tomorrow.", definition: "Persist in an activity or process without stopping." },
    { word: "decide", sentence: "Take your time to decide which book to read.", definition: "Come to a resolution in the mind as a result of consideration." },
    { word: "different", sentence: "Each snowflake has a completely different pattern.", definition: "Not the same as another or each other." },
    { word: "difficult", sentence: "Solving the maze proved to be quite difficult.", definition: "Needing much effort or skill to accomplish or understand." },
    { word: "disappear", sentence: "The magician made the coin disappear.", definition: "Cease to be visible; vanish from sight." },
    { word: "early", sentence: "We woke up early to catch the morning train.", definition: "Happening or done before the usual or expected time." },
    { word: "earth", sentence: "We must take good care of planet Earth.", definition: "The planet on which we live; the world." },
    { word: "eight", sentence: "An octopus has eight long arms.", definition: "Equivalent to the sum of seven and one." },
    { word: "eighth", sentence: "Today is the eighth day of the month.", definition: "Constitutes number eight in a sequence." },
    { word: "enough", sentence: "Have you had enough water to drink?", definition: "As much or as many as required." },
    { word: "exercise", sentence: "Daily exercise keeps your body healthy.", definition: "Activity requiring physical effort to sustain or improve health." },
    { word: "experiment", sentence: "We conducted a fascinating science experiment.", definition: "A scientific procedure undertaken to make a discovery or test a hypothesis." },
    { word: "extreme", sentence: "The desert experiences extreme temperatures.", definition: "Reaching a high or the highest degree; very great." },
    { word: "favourite", sentence: "Football is my absolute favourite sport.", definition: "Preferred above all others of the same kind." },
    { word: "February", sentence: "The shortest month of the year is February.", definition: "The second month of the year." },
    { word: "forward", sentence: "Step forward when your name is called.", definition: "Towards a place or position that is in front." },
    { word: "fruit", sentence: "Eating fresh fruit is good for your health.", definition: "The sweet and fleshy product of a tree or plant containing seed." },
    { word: "grammar", sentence: "We are learning about punctuation and grammar.", definition: "The system and structure of a language." },
    { word: "group", sentence: "Form a small group for the class project.", definition: "A number of people or things that are located, gathered, or classed together." },
    { word: "guard", sentence: "The security guard checked our badges.", definition: "A person who watches over something to protect it." },
    { word: "guide", sentence: "Our tour guide showed us around the museum.", definition: "A person who shows the way to others." },
    { word: "heard", sentence: "Have you heard the latest news?", definition: "Past tense of hear; perceived with the ear." },
    { word: "heart", sentence: "Your heart pumps blood through your body.", definition: "The muscular organ that pumps blood through the circulatory system." },
    { word: "height", sentence: "Measure the height of the door frame.", definition: "Measurement from base to top or of a standing person." },
    { word: "history", sentence: "We learned about ancient castles in history class.", definition: "The study of past events." },
    { word: "imagine", sentence: "Close your eyes and imagine a magical forest.", definition: "Form a mental image or concept of something." },
    { word: "increase", sentence: "We hope to increase our reading speed.", definition: "Become or make greater in size, amount, or degree." },
    { word: "important", sentence: "Listening to instructions is very important.", definition: "Of great significance or value." },
    { word: "interest", sentence: "She showed a deep interest in science.", definition: "The feeling of wanting to know or learn about something." },
    { word: "island", sentence: "We sailed a small boat to the tropical island.", definition: "A piece of land surrounded by water." },
    { word: "knowledge", sentence: "Reading books helps expand your knowledge.", definition: "Information and skills gained through experience or education." },
    { word: "learn", sentence: "Every day brings a chance to learn something new.", definition: "Gain or acquire knowledge or skill." },
    { word: "length", sentence: "Measure the length of the wooden plank.", definition: "The measurement or extent of something from end to end." },
    { word: "library", sentence: "We borrowed three adventure books from the library.", definition: "A building or room containing collections of books." },
    { word: "material", sentence: "Cotton is a soft and breathable material.", definition: "The matter from which a thing is or can be made." },
    { word: "medicine", sentence: "Take your medicine when you feel unwell.", definition: "A compound or preparation used for the treatment or prevention of disease." },
    { word: "mention", sentence: "Did anyone mention the upcoming school trip?", definition: "Refer to something briefly and without going into detail." },
    { word: "minute", sentence: "Please wait just one minute.", definition: "A period of time equal to sixty seconds." },
    { word: "natural", sentence: "Honey is a sweet, natural food.", definition: "Existing in or caused by nature; not made or caused by humankind." },
    { word: "naughty", sentence: "The puppy was feeling a little bit naughty.", definition: "Disobedient or badly behaved." },
    { word: "notice", sentence: "Did you notice the bird in the tree?", definition: "Observe or become aware of." },
    { word: "occasion", sentence: "We dressed up for a special family occasion.", definition: "A particular event or point in time at which an event takes place." },
    { word: "often", sentence: "We often go walking in the park.", definition: "Frequently; many times." },
    { word: "opposite", sentence: "Hot is the opposite of cold.", definition: "Having a position on the other or further side; completely different." },
    { word: "ordinary", sentence: "It started out as a normal, ordinary day.", definition: "With no special or distinctive features; normal." },
    { word: "particular", sentence: "Is there a particular game you want to play?", definition: "Used to single out an individual item or person over others." },
    { word: "peculiar", sentence: "We heard a peculiar sound in the bushes.", definition: "Strange or odd; unusual." },
    { word: "perhaps", sentence: "Perhaps we can visit the park tomorrow.", definition: "Possibly; maybe." },
    { word: "popular", sentence: "Basketball is a very popular sport.", definition: "Liked or admired by many people or a particular group." },
    { word: "position", sentence: "Find your position on the football pitch.", definition: "A place where someone or something is located or has been put." },
    { word: "possess", sentence: "Do you possess a library card?", definition: "Have as belonging to one; own." },
    { word: "possible", sentence: "Try your best to arrive as early as possible.", definition: "Able to be done or achieved." },
    { word: "potatoes", sentence: "We had mashed potatoes for dinner.", definition: "Starchy root vegetables native to the Americas." },
    { word: "pressure", sentence: "Air pressure keeps the bicycle tyre inflated.", definition: "Continuous physical force exerted on or against an object." },
    { word: "probably", sentence: "It will probably rain later this afternoon.", definition: "Almost certainly; as far as one knows or can tell." },
    { word: "promise", sentence: "Always keep a promise when you make one.", definition: "A declaration or assurance that one will do a particular thing." },
    { word: "purpose", sentence: "What is the main purpose of this tool?", definition: "The reason for which something is done or created." },
    { word: "quarter", sentence: "A quarter is equal to twenty-five percent.", definition: "Each of four equal parts into which something is divisible." },
    { word: "question", sentence: "Raise your hand if you have a question.", definition: "A sentence worded or expressed so as to elicit information." },
    { word: "recent", sentence: "Have you read any recent books?", definition: "Having happened, begun, or done not long ago." },
    { word: "regular", sentence: "Exercise should be part of your regular routine.", definition: "Done or happening on a habitual basis." },
    { word: "reign", sentence: "The queen began her long reign years ago.", definition: "Hold royal office; rule as monarch." },
    { word: "remember", sentence: "Remember to pack your water bottle.", definition: "Have in or be able to bring to one's mind an awareness of someone or something." },
    { word: "sentence", sentence: "Write a complete sentence with a capital letter.", definition: "A set of words complete in itself, typically containing a subject and predicate." },
    { word: "separate", sentence: "Keep your gym clothes in a separate bag.", definition: "Forming a unit apart or not joined with others." },
    { word: "special", sentence: "Today is a very special birthday.", definition: "Better, greater, or otherwise different from usual." },
    { word: "straight", sentence: "Use a ruler to draw a straight line.", definition: "Extending in one direction without bending or curving." },
    { word: "strange", sentence: "We saw a strange light in the sky.", definition: "Unusual or surprising in a way that is unsettling or hard to understand." },
    { word: "strength", sentence: "Lifting weights builds physical strength.", definition: "The quality or state of being physically strong." },
    { word: "suppose", sentence: "I suppose we could go for a walk.", definition: "Assume that something is the case on the basis of probability." },
    { word: "surprise", sentence: "We planned a birthday party surprise.", definition: "An unexpected or astonishing event, fact, or thing." },
    { word: "therefore", sentence: "It started to rain; therefore, we went inside.", definition: "For that reason; consequently." },
    { word: "though", sentence: "Even though it was cold, we still went out.", definition: "Despite the fact that; although." },
    { word: "thought", sentence: "That was a very clever thought.", definition: "An idea or opinion produced by thinking." },
    { word: "through", sentence: "Walk carefully through the doorway.", definition: "Moving in one side and out of the other side of an opening or channel." },
    { word: "various", sentence: "There are various ways to solve this puzzle.", definition: "Several of different kinds or types." },
    { word: "weight", sentence: "Check the weight of the package.", definition: "A body's relative mass or the quantity of matter contained by it." },
    { word: "woman", sentence: "The kind woman helped us find our way.", definition: "An adult female human being." },
    { word: "women", sentence: "The group of women volunteered at the school.", definition: "Plural of woman." }
  ],
  "Year 5 & 6": [
    { word: "accommodate", sentence: "The hotel can accommodate three hundred guests.", definition: "Provide lodging or sufficient space for." },
    { word: "accompany", sentence: "Will you accompany me to the library?", definition: "Go somewhere with someone as a companion." },
    { word: "according", sentence: "According to the weather forecast, it will snow.", definition: "As stated or indicated by." },
    { word: "achieve", sentence: "Work hard to achieve your personal goals.", definition: "Successfully bring about or reach a desired objective." },
    { word: "aggressive", sentence: "The stray dog acted a bit aggressive.", definition: "Ready or likely to attack or confront." },
    { word: "amateur", sentence: "He is still an amateur chess player.", definition: "Engaged in a pursuit on an unpaid rather than a professional basis." },
    { word: "ancient", sentence: "We explored an ancient Roman castle.", definition: "Belonging to the very distant past." },
    { word: "apparent", sentence: "It soon became apparent that we were lost.", definition: "Clearly visible or understood; obvious." },
    { word: "appreciate", sentence: "I really appreciate all your help.", definition: "Recognize the full worth of something." },
    { word: "attached", sentence: "The document is attached to the email.", definition: "Fastened or joined to something." },
    { word: "available", sentence: "Are there any tickets available for the show?", definition: "Able to be used or obtained; at hand." },
    { word: "average", sentence: "The test score was above the class average.", definition: "Expressing the result obtained by adding amounts and dividing." },
    { word: "awkward", sentence: "There was an awkward silence in the room.", definition: "Causing or feeling uneasy embarrassment." },
    { word: "bargain", sentence: "We found a great bargain at the market.", definition: "An advantageous purchase, especially one bought for less than the usual price." },
    { word: "bruise", sentence: "He got a small bruise on his knee.", definition: "An injury where blood vessels in the skin are damaged." },
    { word: "category", sentence: "Sort the books into the correct category.", definition: "A class or division of people or things regarded as having particular shared characteristics." },
    { word: "cemetery", sentence: "The historic church has an old cemetery.", definition: "A burial ground or graveyard." },
    { word: "committee", sentence: "The school committee planned the fair.", definition: "A group of people appointed for a specific function." },
    { word: "communicate", sentence: "We communicate using video calls.", definition: "Share or exchange information, news, or ideas." },
    { word: "community", sentence: "Our local community is very supportive.", definition: "A group of people living in the same place or sharing a particular characteristic." },
    { word: "competition", sentence: "She won first place in the spelling competition.", definition: "An event or contest in which people compete for superiority." },
    { word: "conscience", sentence: "Let your conscience guide your choices.", definition: "An inner feeling or voice viewed as acting as a guide to the rightness or wrongness of one's behavior." },
    { word: "conscious", sentence: "He remained conscious throughout the checkup.", definition: "Aware of and responding to one's surroundings." },
    { word: "controversy", sentence: "The new rule caused a lot of controversy.", definition: "Disagreement, typically public, on a matter of opinion." },
    { word: "convenience", sentence: "Shop online for maximum convenience.", definition: "The state of being able to proceed with something without difficulty." },
    { word: "correspond", sentence: "Write letters to correspond with your penpal.", definition: "Have a close similarity; match or communicate by exchanging letters." },
    { word: "criticise", sentence: "Try not to criticise others unfairly.", definition: "Indicate the faults of someone or something in a disapproving way." },
    { word: "definitely", sentence: "I will definitely finish my homework tonight.", definition: "Without doubt; certainly." },
    { word: "dictionary", sentence: "Look up unfamiliar words in the dictionary.", definition: "A book or electronic resource listing words of a language." },
    { word: "disastrous", sentence: "The storm had a disastrous effect on crops.", definition: "Causing great damage; catastrophic." },
    { word: "embarrass", sentence: "Try not to embarrass your friends.", definition: "Cause someone to feel awkward, self-conscious, or ashamed." },
    { word: "environment", sentence: "We must protect our natural environment.", definition: "The surroundings or conditions in which a person, animal, or plant lives." },
    { word: "equipped", sentence: "The science lab is well equipped.", definition: "Supplied or furnished with the necessary items for a particular purpose." },
    { word: "especially", sentence: "I love reading, especially adventure stories.", definition: "To a great extent; much more than usual." },
    { word: "exaggerate", sentence: "Try not to exaggerate your fishing story.", definition: "Represent something as being larger, better, or worse than it really is." },
    { word: "excellent", sentence: "That was an excellent piece of writing.", definition: "Extremely good; outstanding." },
    { word: "existence", sentence: "Scientists study the existence of ancient life.", definition: "The fact or state of living or having objective reality." },
    { word: "explanation", sentence: "The teacher gave a clear explanation.", definition: "A statement or account that makes something clear." },
    { word: "familiar", sentence: "That song song sounds very familiar.", definition: "Well known from long or close association." },
    { word: "foreign", sentence: "She loves learning foreign languages.", definition: "Of, from, in, or characteristic of a country or language other than one's own." },
    { word: "forty", sentence: "There are forty students in the hall.", definition: "Equivalent to the product of four and ten." },
    { word: "frequently", sentence: "We frequently visit the local park.", definition: "Regularly or habitually; often." },
    { word: "government", sentence: "The government passed a new education law.", definition: "The governing body of a nation, state, or community." },
    { word: "guarantee", sentence: "The store offered a full guarantee.", definition: "A formal promise or assurance that certain conditions shall be fulfilled." },
    { word: "harass", sentence: "No one should ever harass another person.", definition: "Subject to aggressive pressure or intimidation." },
    { word: "hindrance", sentence: "Noise can be a hindrance when studying.", definition: "A thing that provides resistance, delay, or obstruction to something." },
    { word: "identity", sentence: "Show your passport to prove your identity.", definition: "The fact of being who or what a person is." },
    { word: "immediate", sentence: "The team took immediate action.", definition: "Occurring or done at once; instant." },
    { word: "individual", sentence: "Every individual has unique talents.", definition: "Single; separate." },
    { word: "interfere", sentence: "Do not interfere with their game.", definition: "Prevent a process from continuing or being carried out properly." },
    { word: "interrupt", sentence: "It is rude to interrupt someone speaking.", definition: "Stop the continuous progress of an activity or process." },
    { word: "language", sentence: "English is a widely spoken language.", definition: "The method of human communication, either spoken or written." },
    { word: "leisure", sentence: "What do you like to do in your leisure time?", definition: "Free time spent away from work or duties." },
    { word: "lightning", sentence: "We saw bright flashes of lightning.", definition: "The occurrence of a natural electrical discharge of high voltage in the atmosphere." },
    { word: "marvellous", sentence: "We had a marvellous time on holiday.", definition: "Causing great wonder; extraordinary." },
    { word: "mischievous", sentence: "The kitten had a mischievous look.", definition: "Causing or showing a desire to cause trouble in a playful way." },
    { word: "muscle", sentence: "Exercise helps build strong muscle.", definition: "A band or bundle of fibrous tissue in a human or animal body that has the ability to contract." },
    { word: "necessary", sentence: "Warm clothes are necessary in winter.", definition: "Required to be done, achieved, or present; needful." },
    { word: "neighbour", sentence: "Our next-door neighbour is very kind.", definition: "A person living near or next door to another." },
    { word: "nuisance", sentence: "Loud noises can be a real nuisance.", definition: "A person, thing, or circumstance causing annoyance or inconvenience." },
    { word: "occupy", sentence: "Choose a seat and occupy it quietly.", definition: "Reside in or take up a space or time." },
    { word: "occur", sentence: "When will the science fair occur?", definition: "Happen or take place." },
    { word: "opportunity", sentence: "This is a great opportunity to learn.", definition: "A set of circumstances that makes it possible to do something." },
    { word: "parliament", sentence: "Laws are made in the parliament building.", definition: "The highest legislature, consisting of the sovereign, the House of Lords, and the House of Commons." },
    { word: "persuade", sentence: "Try to persuade your team to work together.", definition: "Induce someone to do something through reasoning or argument." },
    { word: "physical", sentence: "P.E. class involves physical activity.", definition: "Relating to the body as opposed to the mind." },
    { word: "prejudice", sentence: "Education helps overcome prejudice.", definition: "Preconceived opinion that is not based on reason or actual experience." },
    { word: "privilege", sentence: "Reading this book is a real privilege.", definition: "A special right, advantage, or immunity granted or available only to a particular person or group." },
    { word: "profession", sentence: "Teaching is a rewarding profession.", definition: "A paid occupation, especially one that involves prolonged training and a formal qualification." },
    { word: "program", sentence: "We wrote a computer program together.", definition: "A set of coded instructions enabling a computer to perform a task." },
    { word: "pronunciation", sentence: "Practice correct word pronunciation.", definition: "The way in which a word is pronounced." },
    { word: "queue", sentence: "Stand quietly in the lunch queue.", definition: "A line or sequence of people or vehicles awaiting their turn." },
    { word: "recognise", sentence: "Do you recognise this old photograph?", definition: "Identify someone or something from previous encounters or knowledge." },
    { word: "recommend", sentence: "Can you recommend a good adventure book?", definition: "Put forward someone or something with approval as being suitable for a particular purpose." },
    { word: "relevant", sentence: "Provide facts that are relevant to the topic.", definition: "Closely connected or appropriate to what is being done or considered." },
    { word: "restaurant", sentence: "We ate dinner at a local restaurant.", definition: "A place where people pay to sit and eat meals." },
    { word: "rhyme", sentence: "Find words that rhyme with cat.", definition: "Correspondence of sound between words or the endings of words." },
    { word: "rhythm", sentence: "Tap your foot to the rhythm of the music.", definition: "A strong, regular, repeated pattern of movement or sound." },
    { word: "sacrifice", sentence: "Making time to study requires sacrifice.", definition: "An act of giving up something valued for the sake of something else." },
    { word: "secretary", sentence: "The secretary scheduled the meeting.", definition: "A person employed to assist with correspondence, keep records, and make arrangements." },
    { word: "shoulder", sentence: "He carried his backpack on his shoulder.", definition: "The upper joint of the human arm." },
    { word: "signature", sentence: "Sign your name with your official signature.", definition: "A person's name written in a distinctive way as a form of identification." },
    { word: "sincere", sentence: "Please accept my sincere apology.", definition: "Free from pretence or deceit; proceeding from genuine feelings." },
    { word: "soldier", sentence: "The soldier marched in the parade.", definition: "A person who serves in an army." },
    { word: "stomach", sentence: "Eating too fast can upset your stomach.", definition: "The internal organ in which the major part of the digestion of food occurs." },
    { word: "sufficient", sentence: "We have sufficient time to finish.", definition: "Enough; adequate." },
    { word: "suggest", sentence: "What game do you suggest we play?", definition: "Put forward for consideration." },
    { word: "symbol", sentence: "A dove is a symbol of peace.", definition: "A thing that represents or stands for something else." },
    { word: "system", sentence: "The solar system has eight planets.", definition: "A set of connected things or parts forming a complex whole." },
    { word: "temperature", sentence: "Check the outdoor temperature before going out.", definition: "The degree or intensity of heat present in a substance or object." },
    { word: "thorough", sentence: "Do a thorough check of your work.", definition: "Performed with great care and completeness." },
    { word: "twelfth", sentence: "Today is the twelfth day of July.", definition: "Constitutes number twelve in a sequence." },
    { word: "variety", sentence: "The shop offers a wide variety of fruit.", definition: "The quality or state of being different or diverse." },
    { word: "vegetable", sentence: "Carrots are a very healthy vegetable.", definition: "A plant or part of a plant used as food." },
    { word: "vehicle", sentence: "A bicycle is an eco-friendly vehicle.", definition: "A thing used for transporting people or goods." },
    { word: "yacht", sentence: "The white yacht sailed across the sea.", definition: "A medium-sized sailing boat equipped for cruising or racing." }
  ]
};

export default function SpellingBeePage() {
  const [selectedGroup, setSelectedGroup] = useState<string>("Year 3 & 4");
  const [currentWordObj, setCurrentWordObj] = useState<{ word: string; sentence: string; definition: string } | null>(null);
  const [userInput, setUserInput] = useState<string>("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState<number>(0);
  const [totalAttempted, setTotalAttempted] = useState<number>(0);
  const [recentWords, setRecentWords] = useState<string[]>([]);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showDefinition, setShowDefinition] = useState<boolean>(false);

  const getRandomWord = (group: string) => {
    const list = wordBanks[group];
    const available = list.filter(item => !recentWords.includes(item.word));
    const pool = available.length > 0 ? available : list;
    const randomIndex = Math.floor(Math.random() * pool.length);
    const chosen = pool[randomIndex];

    setRecentWords(prev => [chosen.word, ...prev.slice(0, 40)]);
    return chosen;
  };

  useEffect(() => {
    const firstWord = getRandomWord(selectedGroup);
    setCurrentWordObj(firstWord);
    setScore(0);
    setTotalAttempted(0);
    setShowHint(false);
    setShowDefinition(false);
  }, [selectedGroup]);

  const speakText = (text: string, isSlow: boolean = false) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-GB';
      utterance.rate = isSlow ? 0.75 : 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (currentWordObj) {
      speakText(currentWordObj.word);
    }
  }, [currentWordObj]);

  const handlePlayAudio = (slow: boolean = false) => {
    if (currentWordObj) {
      speakText(currentWordObj.word, slow);
    }
  };

  const handleHearSentence = () => {
    if (currentWordObj) {
      speakText(currentWordObj.sentence);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || !currentWordObj) return;

    const cleanedInput = userInput.trim().toLowerCase();
    const targetWord = currentWordObj.word.toLowerCase();

    setTotalAttempted(prev => prev + 1);

    if (cleanedInput === targetWord) {
      setIsCorrect(true);
      setFeedback("Correct! Brilliant spelling! 🎉");
      setScore(prev => prev + 1);
    } else {
      setIsCorrect(false);
      setFeedback(`Incorrect. The correct spelling is: "${currentWordObj.word}"`);
    }
  };

  const handleNextWord = () => {
    setUserInput("");
    setFeedback(null);
    setIsCorrect(null);
    setShowHint(false);
    setShowDefinition(false);
    const nextWord = getRandomWord(selectedGroup);
    setCurrentWordObj(nextWord);
  };

  // Generates masked spelling hint (reveals roughly half the letters, masks the rest with underscores)
  const getMaskedHint = (word: string) => {
    return word
      .split('')
      .map((char, index) => (index % 2 === 0 ? char : '_'))
      .join(' ');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-slate-100 p-4 sm:p-6 pb-20 relative overflow-hidden">
      
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-2xl mx-auto relative z-10 pt-4">
        
        {/* Navigation & Score Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="px-4 py-2 bg-slate-900/80 border border-slate-700 hover:border-indigo-500 rounded-xl text-sm font-bold text-slate-300 transition">
            ← Back to Home
          </Link>
          <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-700 px-4 py-2 rounded-xl text-sm font-bold shadow-lg">
            <span>Score:</span>
            <span className="text-teal-400">{score} / {totalAttempted}</span>
          </div>
        </div>

        {/* Title Area */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">
            🔤 Infinite <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-400">Spelling Bee</span>
          </h1>
          <p className="text-slate-300 text-sm font-medium">
            Maximum-capacity curriculum database with nearly 800 total randomized practice words!
          </p>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl">
          
          {/* Year Group Switcher */}
          <div className="flex justify-center gap-2 mb-8">
            {Object.keys(wordBanks).map((group) => (
              <button
                key={group}
                onClick={() => {
                  setSelectedGroup(group);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                  selectedGroup === group 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {group} ({wordBanks[group].length} Words)
              </button>
            ))}
          </div>

          {currentWordObj && (
            <>
              {/* Audio Box */}
              <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 text-center mb-6 shadow-inner">
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block mb-3">
                  Practice Word Ready 🎧
                </span>
                
                <div className="flex flex-wrap justify-center gap-3 mb-4">
                  <button
                    onClick={() => handlePlayAudio(false)}
                    className="px-6 py-3 bg-gradient-to-r from-teal-500 to-indigo-600 text-slate-950 font-black rounded-xl shadow-lg hover:opacity-90 transition flex items-center gap-2 cursor-pointer"
                  >
                    <span>🔊</span> Listen to Word
                  </button>
                  <button
                    onClick={() => handlePlayAudio(true)}
                    className="px-4 py-3 bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold rounded-xl text-sm transition cursor-pointer"
                  >
                    🐢 Say Slowly
                  </button>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-3">
                  <button
                    onClick={handleHearSentence}
                    className="text-xs font-semibold text-indigo-300 hover:text-indigo-200 underline cursor-pointer"
                  >
                    💬 Hear sentence
                  </button>
                  <span className="text-slate-600">•</span>
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 underline cursor-pointer"
                  >
                    {showHint ? "Hide Hint" : "💡 Peek at Hint"}
                  </button>
                  <span className="text-slate-600">•</span>
                  <button
                    onClick={() => setShowDefinition(!showDefinition)}
                    className="text-xs font-semibold text-teal-300 hover:text-teal-200 underline cursor-pointer"
                  >
                    {showDefinition ? "Hide Definition" : "📖 Definition"}
                  </button>
                </div>

                {/* Masked Hint Display Box */}
                {showHint && (
                  <div className="mt-4 p-3 bg-amber-950/60 border border-amber-800/60 rounded-xl text-amber-300 text-sm font-mono font-bold tracking-widest animate-fadeIn">
                    Hint: {getMaskedHint(currentWordObj.word)}
                  </div>
                )}

                {/* Definition Display Box */}
                {showDefinition && (
                  <div className="mt-4 p-3 bg-teal-950/60 border border-teal-800/60 rounded-xl text-teal-200 text-sm font-medium animate-fadeIn">
                    <span className="font-bold text-teal-400">Definition:</span> {currentWordObj.definition}
                  </div>
                )}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Type what you hear:
                  </label>
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    disabled={feedback !== null}
                    placeholder="Type your spelling here..."
                    className="w-full px-4 py-3.5 bg-slate-950 border-2 border-slate-700 focus:border-indigo-500 rounded-xl text-white font-bold text-center text-lg outline-none transition disabled:opacity-75"
                    autoFocus
                    autoComplete="off"
                  />
                </div>

                {feedback === null ? (
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl transition shadow-lg shadow-indigo-600/30 cursor-pointer"
                  >
                    Check Spelling ✓
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div className={`p-4 rounded-xl text-center font-bold text-sm ${
                      isCorrect ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800' : 'bg-rose-950/80 text-rose-300 border border-rose-800'
                    }`}>
                      {feedback}
                    </div>
                    <button
                      type="button"
                      onClick={handleNextWord}
                      className="w-full py-3.5 bg-teal-600 hover:bg-teal-500 text-slate-950 font-black rounded-xl transition shadow-lg shadow-teal-600/30 cursor-pointer"
                    >
                      Next Random Word →
                    </button>
                  </div>
                )}
              </form>
            </>
          )}

        </div>

      </div>
    </main>
  );
}