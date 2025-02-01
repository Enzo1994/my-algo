/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  
    let l = 0;
    let r = 0;
    
    const set = new Set();

    const ret = 0;

    for (; r < s.length ; r++) {

        while(set.has(s[r])) {
            set.delete(s[l])
            l++
        }

        set.add(s[r])

        ret = Math.max(ret, r - l + 1)
    }

    return ret
};