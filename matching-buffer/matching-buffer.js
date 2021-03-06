// Map 97 (ASCII of A) to 1, 98 to 2 and so forth
const charCode = (i) => {
    return i - 96;
}

// An O(N + M) algorithm counting the `pattern` occurrence in `str` buffer
const countOccurrence = (str, pattern) => {
    const n = str.length;
    const m = pattern.length;

    if (n < m) {
        return 0;
    }

    const aAscii = 'a'.charCodeAt(0);
    const base = 37;
    const mod = 10000000000037;
    let hashPattern = 0;
    for (let i = 0; i < m; i++) {
        hashPattern = (hashPattern*base + charCode(pattern[i])) % mod;
    }

    let hashStr = 0;
    let baseLast = 1;
    for (let i = 0; i < m; i++) {
        hashStr = (hashStr*base + charCode(str[i])) % mod;
        if (i < m-1) {
            baseLast = (baseLast*base) % mod;
        }
    }

    let ret = 0;
    if (hashStr === hashPattern) {
        ret++;
    }
    for (let i = m; i < n; i++) {
        // removing the last character
        hashStr = (hashStr - charCode(str[i-m])*baseLast) % mod;
        if (hashStr < 0) {
            hashStr += mod;
        }
        hashStr = (hashStr*base + charCode(str[i])) % mod;
        if (hashStr === hashPattern) {
            ret++;
        }
    }
    return ret;
}

const n = 75000000;
const m = n/10;

const aAscii = 'a'.charCodeAt(0);
let az = "";
for (let i = 0; i < 26; i++) {
    az += String.fromCharCode(i + aAscii);
}

const str = Buffer.alloc(n, az);
const pattern = Buffer.alloc(m, az);

console.time("Matching Buffer");
const result = countOccurrence(str, pattern);
console.timeEnd("Matching Buffer");

console.log(result);
