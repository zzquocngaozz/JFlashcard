/**
 * Tim kiem mo. Tim kiem string cho chua cac ky tu cua chuoi nhap vao
 * @param {string} needle string input search
 * @param {string} haystack string target
 * 
 * @returns {boolean} true neu trong target string include tat ca ky tu trong input string
*/
export function fuzzySearch(needle, haystack) {
    needle = needle.toLowerCase();
    haystack = haystack.toLowerCase();
    
    if (haystack.includes(needle)) {
        return true;
    }
    
    const needleChars = needle.split('');
    const haystackChars = haystack.split('');
    let j = 0;
    
    for (let i = 0; i < needleChars.length; i++) {
        if (j >= haystackChars.length) {
            return false;
        }
        
        while (haystackChars[j] !== needleChars[i]) {
            j++;
            if (j >= haystackChars.length) {
                return false;
            }
        }
        j++;
    }
    
    return true;
}


