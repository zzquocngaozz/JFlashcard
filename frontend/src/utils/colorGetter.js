export const colorGetter = ()=>`#${Math.floor(Math.random()*16777215).toString(16)}`;


const EnglishColorEnum = {
    'a': '#40E905',
    'b': '#C905E9',
    'c': '#7B8E02',
    'd': '#ff00ff',
    'e': '#18E4F1',
    'f': '#088585',
    'g': '#9900ff',
    'h': '#ff9900',
    'i': '#33cc33',
    'j': '#993333',
    'k': '#7C0F0F',
    'l': '#660066',
    'm': '#ff6600',
    'n': '#0066cc',
    'o': '#ffcc00',
    'p': '#009933',
    'q': '#00CCA7',
    'r': '#336600',
    's': '#993366',
    't': '#663300',
    'u': '#006666',
    'v': '#ff3399',
    'w': '#33ffcc',
    'x': '#ff99cc',
    'y': '#99ccff',
    'z': '#cc99ff',
};

// Hàm để lấy mã màu từ enum
export const getColorFromEnum = (character) =>{
    return EnglishColorEnum[character.toLowerCase()] || "#012C7E"; // Chuyển đổi ký tự thành chữ thường và trả về màu tương ứng hoặc null nếu không tìm thấy
}