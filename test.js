const assert = new require("assert");
const WordHash = new require("./index.js");

const wordHash = WordHash();

// Basic Variations
assert.equal(
  wordHash.hash("0073baeb-c5dc-48a5-bcf7-b35f9d7a36fd"),
  "video-sad-carolina-twenty"
);

assert.equal(
  wordHash.hash("d13175d4-bee9-4e80-b24c-89c15c126cbf"),
  "massachusetts-social-apart-robert"
);
assert.equal(
  wordHash.hash("eeb33437-e61a-4cce-9c12-adf6ce4bf2d8"),
  "fish-single-carolina-shade"
);

assert.equal(
  wordHash.hash("6da4e640-e5de-4d0f-8423-df7ce323ef1c"),
  "blossom-india-william-enemy"
);

// Varying the length
assert.equal(
  WordHash({ length: 2 }).hash("0073baeb-c5dc-48a5-bcf7-b35f9d7a36fd"),
  "video-sad"
);
assert.equal(
  WordHash({ length: 3 }).hash("0073baeb-c5dc-48a5-bcf7-b35f9d7a36fd"),
  "video-sad-carolina"
);
assert.equal(
  WordHash({ length: 5 }).hash("0073baeb-c5dc-48a5-bcf7-b35f9d7a36fd"),
  "video-sad-carolina-twenty-shade"
);

// Adding Salt
assert.equal(
  WordHash({ salt: "saltySalt" }).hash("0073baeb-c5dc-48a5-bcf7-b35f9d7a36fd"),
  "skylark-bakerloo-low-early"
);
assert.equal(
  WordHash({ salt: "secret" }).hash("0073baeb-c5dc-48a5-bcf7-b35f9d7a36fd"),
  "stream-burger-one-alanine"
);

// Changing Seperator
assert.equal(
  WordHash({ separator: "~" }).hash("0073baeb-c5dc-48a5-bcf7-b35f9d7a36fd"),
  "video~sad~carolina~twenty"
);
assert.deepEqual(
  WordHash({ separator: null }).hash("0073baeb-c5dc-48a5-bcf7-b35f9d7a36fd"),
  ["video", "sad", "carolina", "twenty"]
);

// Can get number of permutations
assert.equal(WordHash().permutations, Math.pow(256, WordHash().length));
