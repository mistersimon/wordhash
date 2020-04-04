module.exports = (opts = {}) => {
  const options = Object.assign(
    {
      length: "4",
      salt: "",
      separator: "-",
      wordlist: DEFAULT_WORDLIST,
    },
    opts
  );

  const digestLength = 32; // Property of md5 hash
  const numWords = options.wordlist.length;
  const segmentSize = Math.ceil(Math.log(numWords) / Math.log(16));

  if (options.length > digestLength / segmentSize) {
    throw new Error(
      `Maximum length for the wordlist is ${32 / segmentSize}`
    );
  }

  const hash = (str) => {
    const words = [];
    const digest = md5(options.salt + str);

    for (let i = 0; i < options.length; i++) {
      // This won't use the whole digest, but okay as we are hash
      const segment = digest.substr(i * segmentSize, segmentSize);

      // Convert out hex char segments into an int
      const byte = parseInt(segment, 16);

      // Might not fit exactly into our wordlist, so get the index
      const index = Math.round((byte / Math.pow(16, segmentSize)) * numWords);

      // Get the word at the index
      const word = options.wordlist[index];
      words.push(word);
      // console.log(segment, byte, index, word);
    }

    return options.separator === null ? words : words.join(options.separator);
  };

  return {
    hash,
    length: options.length,
    permutations: Math.pow(numWords, options.length),
    wordlist: options.wordlist,
  };
};

// Wordlist from https://raw.githubusercontent.com/SEBv15/humanhash/master/index.js
var DEFAULT_WORDLIST = [
  "ack",
  "alabama",
  "alanine",
  "alaska",
  "alpha",
  "angel",
  "apart",
  "april",
  "arizona",
  "arkansas",
  "artist",
  "asparagus",
  "aspen",
  "august",
  "autumn",
  "avocado",
  "bacon",
  "bakerloo",
  "batman",
  "beer",
  "berlin",
  "beryllium",
  "black",
  "blossom",
  "blue",
  "bluebird",
  "bravo",
  "bulldog",
  "burger",
  "butter",
  "california",
  "carbon",
  "cardinal",
  "carolina",
  "carpet",
  "cat",
  "ceiling",
  "charlie",
  "chicken",
  "coffee",
  "cola",
  "cold",
  "colorado",
  "comet",
  "connecticut",
  "crazy",
  "cup",
  "dakota",
  "december",
  "delaware",
  "delta",
  "diet",
  "don",
  "double",
  "early",
  "earth",
  "east",
  "echo",
  "edward",
  "eight",
  "eighteen",
  "eleven",
  "emma",
  "enemy",
  "equal",
  "failed",
  "fanta",
  "fifteen",
  "fillet",
  "finch",
  "fish",
  "five",
  "fix",
  "floor",
  "florida",
  "football",
  "four",
  "fourteen",
  "foxtrot",
  "freddie",
  "friend",
  "fruit",
  "gee",
  "georgia",
  "glucose",
  "golf",
  "green",
  "grey",
  "hamper",
  "happy",
  "harry",
  "hawaii",
  "helium",
  "high",
  "hot",
  "hotel",
  "hydrogen",
  "idaho",
  "illinois",
  "india",
  "indigo",
  "ink",
  "iowa",
  "island",
  "item",
  "jersey",
  "jig",
  "johnny",
  "juliet",
  "july",
  "jupiter",
  "kansas",
  "kentucky",
  "kilo",
  "king",
  "kitten",
  "lactose",
  "lake",
  "lamp",
  "lemon",
  "leopard",
  "lima",
  "lion",
  "lithium",
  "london",
  "louisiana",
  "low",
  "magazine",
  "magnesium",
  "maine",
  "mango",
  "march",
  "mars",
  "maryland",
  "massachusetts",
  "may",
  "mexico",
  "michigan",
  "mike",
  "minnesota",
  "mirror",
  "mississippi",
  "missouri",
  "mobile",
  "mockingbird",
  "monkey",
  "montana",
  "moon",
  "mountain",
  "muppet",
  "music",
  "nebraska",
  "neptune",
  "network",
  "nevada",
  "nine",
  "nineteen",
  "nitrogen",
  "north",
  "november",
  "nuts",
  "october",
  "ohio",
  "oklahoma",
  "one",
  "orange",
  "oranges",
  "oregon",
  "oscar",
  "oven",
  "oxygen",
  "papa",
  "paris",
  "pasta",
  "pennsylvania",
  "pip",
  "pizza",
  "pluto",
  "potato",
  "princess",
  "purple",
  "quebec",
  "queen",
  "quiet",
  "red",
  "river",
  "robert",
  "robin",
  "romeo",
  "rugby",
  "sad",
  "salami",
  "saturn",
  "september",
  "seven",
  "seventeen",
  "shade",
  "sierra",
  "single",
  "sink",
  "six",
  "sixteen",
  "skylark",
  "snake",
  "social",
  "sodium",
  "solar",
  "south",
  "spaghetti",
  "speaker",
  "spring",
  "stairway",
  "steak",
  "stream",
  "summer",
  "sweet",
  "table",
  "tango",
  "ten",
  "tennessee",
  "tennis",
  "texas",
  "thirteen",
  "three",
  "timing",
  "triple",
  "twelve",
  "twenty",
  "two",
  "uncle",
  "undress",
  "uniform",
  "uranus",
  "utah",
  "vegan",
  "venus",
  "vermont",
  "victor",
  "video",
  "violet",
  "virginia",
  "washington",
  "west",
  "whiskey",
  "white",
  "william",
  "winner",
  "winter",
  "wisconsin",
  "wolfram",
  "wyoming",
  "xray",
  "yankee",
  "yellow",
  "zebra",
  "zulu",
];

// MD5 Calculation from http://www.myersdaily.org/joseph/javascript/md5.js
function md5cycle(x, k) {
  var a = x[0],
    b = x[1],
    c = x[2],
    d = x[3];

  a = ff(a, b, c, d, k[0], 7, -680876936);
  d = ff(d, a, b, c, k[1], 12, -389564586);
  c = ff(c, d, a, b, k[2], 17, 606105819);
  b = ff(b, c, d, a, k[3], 22, -1044525330);
  a = ff(a, b, c, d, k[4], 7, -176418897);
  d = ff(d, a, b, c, k[5], 12, 1200080426);
  c = ff(c, d, a, b, k[6], 17, -1473231341);
  b = ff(b, c, d, a, k[7], 22, -45705983);
  a = ff(a, b, c, d, k[8], 7, 1770035416);
  d = ff(d, a, b, c, k[9], 12, -1958414417);
  c = ff(c, d, a, b, k[10], 17, -42063);
  b = ff(b, c, d, a, k[11], 22, -1990404162);
  a = ff(a, b, c, d, k[12], 7, 1804603682);
  d = ff(d, a, b, c, k[13], 12, -40341101);
  c = ff(c, d, a, b, k[14], 17, -1502002290);
  b = ff(b, c, d, a, k[15], 22, 1236535329);

  a = gg(a, b, c, d, k[1], 5, -165796510);
  d = gg(d, a, b, c, k[6], 9, -1069501632);
  c = gg(c, d, a, b, k[11], 14, 643717713);
  b = gg(b, c, d, a, k[0], 20, -373897302);
  a = gg(a, b, c, d, k[5], 5, -701558691);
  d = gg(d, a, b, c, k[10], 9, 38016083);
  c = gg(c, d, a, b, k[15], 14, -660478335);
  b = gg(b, c, d, a, k[4], 20, -405537848);
  a = gg(a, b, c, d, k[9], 5, 568446438);
  d = gg(d, a, b, c, k[14], 9, -1019803690);
  c = gg(c, d, a, b, k[3], 14, -187363961);
  b = gg(b, c, d, a, k[8], 20, 1163531501);
  a = gg(a, b, c, d, k[13], 5, -1444681467);
  d = gg(d, a, b, c, k[2], 9, -51403784);
  c = gg(c, d, a, b, k[7], 14, 1735328473);
  b = gg(b, c, d, a, k[12], 20, -1926607734);

  a = hh(a, b, c, d, k[5], 4, -378558);
  d = hh(d, a, b, c, k[8], 11, -2022574463);
  c = hh(c, d, a, b, k[11], 16, 1839030562);
  b = hh(b, c, d, a, k[14], 23, -35309556);
  a = hh(a, b, c, d, k[1], 4, -1530992060);
  d = hh(d, a, b, c, k[4], 11, 1272893353);
  c = hh(c, d, a, b, k[7], 16, -155497632);
  b = hh(b, c, d, a, k[10], 23, -1094730640);
  a = hh(a, b, c, d, k[13], 4, 681279174);
  d = hh(d, a, b, c, k[0], 11, -358537222);
  c = hh(c, d, a, b, k[3], 16, -722521979);
  b = hh(b, c, d, a, k[6], 23, 76029189);
  a = hh(a, b, c, d, k[9], 4, -640364487);
  d = hh(d, a, b, c, k[12], 11, -421815835);
  c = hh(c, d, a, b, k[15], 16, 530742520);
  b = hh(b, c, d, a, k[2], 23, -995338651);

  a = ii(a, b, c, d, k[0], 6, -198630844);
  d = ii(d, a, b, c, k[7], 10, 1126891415);
  c = ii(c, d, a, b, k[14], 15, -1416354905);
  b = ii(b, c, d, a, k[5], 21, -57434055);
  a = ii(a, b, c, d, k[12], 6, 1700485571);
  d = ii(d, a, b, c, k[3], 10, -1894986606);
  c = ii(c, d, a, b, k[10], 15, -1051523);
  b = ii(b, c, d, a, k[1], 21, -2054922799);
  a = ii(a, b, c, d, k[8], 6, 1873313359);
  d = ii(d, a, b, c, k[15], 10, -30611744);
  c = ii(c, d, a, b, k[6], 15, -1560198380);
  b = ii(b, c, d, a, k[13], 21, 1309151649);
  a = ii(a, b, c, d, k[4], 6, -145523070);
  d = ii(d, a, b, c, k[11], 10, -1120210379);
  c = ii(c, d, a, b, k[2], 15, 718787259);
  b = ii(b, c, d, a, k[9], 21, -343485551);

  x[0] = add32(a, x[0]);
  x[1] = add32(b, x[1]);
  x[2] = add32(c, x[2]);
  x[3] = add32(d, x[3]);
}

function cmn(q, a, b, x, s, t) {
  a = add32(add32(a, q), add32(x, t));
  return add32((a << s) | (a >>> (32 - s)), b);
}

function ff(a, b, c, d, x, s, t) {
  return cmn((b & c) | (~b & d), a, b, x, s, t);
}

function gg(a, b, c, d, x, s, t) {
  return cmn((b & d) | (c & ~d), a, b, x, s, t);
}

function hh(a, b, c, d, x, s, t) {
  return cmn(b ^ c ^ d, a, b, x, s, t);
}

function ii(a, b, c, d, x, s, t) {
  return cmn(c ^ (b | ~d), a, b, x, s, t);
}

function md51(s) {
  txt = "";
  var n = s.length,
    state = [1732584193, -271733879, -1732584194, 271733878],
    i;
  for (i = 64; i <= s.length; i += 64) {
    md5cycle(state, md5blk(s.substring(i - 64, i)));
  }
  s = s.substring(i - 64);
  var tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (i = 0; i < s.length; i++)
    tail[i >> 2] |= s.charCodeAt(i) << (i % 4 << 3);
  tail[i >> 2] |= 0x80 << (i % 4 << 3);
  if (i > 55) {
    md5cycle(state, tail);
    for (i = 0; i < 16; i++) tail[i] = 0;
  }
  tail[14] = n * 8;
  md5cycle(state, tail);
  return state;
}

/* there needs to be support for Unicode here,
 * unless we pretend that we can redefine the MD-5
 * algorithm for multi-byte characters (perhaps
 * by adding every four 16-bit characters and
 * shortening the sum to 32 bits). Otherwise
 * I suggest performing MD-5 as if every character
 * was two bytes--e.g., 0040 0025 = @%--but then
 * how will an ordinary MD-5 sum be matched?
 * There is no way to standardize text to something
 * like UTF-8 before transformation; speed cost is
 * utterly prohibitive. The JavaScript standard
 * itself needs to look at this: it should start
 * providing access to strings as preformed UTF-8
 * 8-bit unsigned value arrays.
 */
function md5blk(s) {
  /* I figured global was faster.   */
  var md5blks = [],
    i; /* Andy King said do it this way. */
  for (i = 0; i < 64; i += 4) {
    md5blks[i >> 2] =
      s.charCodeAt(i) +
      (s.charCodeAt(i + 1) << 8) +
      (s.charCodeAt(i + 2) << 16) +
      (s.charCodeAt(i + 3) << 24);
  }
  return md5blks;
}

var hex_chr = "0123456789abcdef".split("");

function rhex(n) {
  var s = "",
    j = 0;
  for (; j < 4; j++)
    s += hex_chr[(n >> (j * 8 + 4)) & 0x0f] + hex_chr[(n >> (j * 8)) & 0x0f];
  return s;
}

function hex(x) {
  for (var i = 0; i < x.length; i++) x[i] = rhex(x[i]);
  return x.join("");
}

function md5(s) {
  return hex(md51(s));
}

/* this function is much faster,
so if possible we use it. Some IEs
are the only ones I know of that
need the idiotic second function,
generated by an if clause.  */

function add32(a, b) {
  return (a + b) & 0xffffffff;
}

if (md5("hello") != "5d41402abc4b2a76b9719d911017c592") {
  function add32(x, y) {
    var lsw = (x & 0xffff) + (y & 0xffff),
      msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
  }
}
