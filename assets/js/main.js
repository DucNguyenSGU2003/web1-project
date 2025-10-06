


function giay(productId,brand,img,name,price,quantity) {
    this.productId = productId;
    this.brand = brand;
    this.img = img;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
}

var nike = [
    new giay("N01","Nike","/assets/img/nike/1.webp","Court Vision Low Next Nature",1380000,10),
    new giay("N02","Nike","/assets/img/nike/2.webp","Downshifter 12 - Đen/Trắng",1380000,10),
    new giay("N03","Nike","/assets/img/nike/3.webp","Downshifter 12 Nam - Đen",1380000,10),
    new giay("N04","Nike","/assets/img/nike/4.webp","Court Vision Low Next Nature - Hồng/Trắng",1380000,10),
    new giay("N05","Nike","/assets/img/nike/5.webp","React Pegasus Trail 4 - Đen",2580000,10),
    new giay("N06","Nike","/assets/img/nike/6.webp","Winflo 8 Nam Nữ - Trắng/Hồng",1780000,10),
    new giay("N07","Nike","/assets/img/nike/7.webp","Air Winflo 9 Nữ - Trắng/Đỏ",1780000,10),
    new giay("N08","Nike","/assets/img/nike/8.webp","Air Winflo 9 Nam - Trắng",1830000,10),
    new giay("N09","Nike","/assets/img/nike/9.webp","Air Winflo 9 Nam - Trắng",1780000,10),
    new giay("N10","Nike","/assets/img/nike/10.webp","Air Jordan 1 Mid GS 'BRED TEXT'",2450000,10),
    new giay("N11","Nike","/assets/img/nike/11.webp","Air Force 1 - Đen",2650000,10),
    new giay("N12","Nike","/assets/img/nike/12.webp","Air Force 1 '07 - Nam - Trắng",2650000,10),
    new giay("N13","Nike","/assets/img/nike/13.webp","Air Force 1 '07 - Nam - Trắng",2650000,10),
    new giay("N14","Nike","/assets/img/nike/14.webp","Flex Experience Run 11 Next Nature - Đen",1380000,10),
    new giay("N15","Nike","/assets/img/nike/15.webp","Revolution 6 Next Nature - Đen",1280000,10),
    new giay("N16","Nike","/assets/img/nike/16.webp","Air Jordan 1 Mid Nam Nữ 'Hologram'",2850000,10),
    new giay("N17","Nike","/assets/img/nike/17.jpg","Nike Air Zoom Pegasus 37 Valerian Blue",2850000,10),
    new giay("N18","Nike","/assets/img/nike/18.jpg","Nike Air Jordan 1 Mid White Shadow",8100000,10),
];


var adidas = [
    new giay("A01","Adidas","/assets/img/adidas/1.webp","Pureboost 22 Nam - Đen",1980000,10),
    new giay("A02","Adidas","/assets/img/adidas/2.webp","Ultraboost 5.0 DNA - Đen",2950000,10),
    new giay("A03","Adidas","/assets/img/adidas/3.webp","X_PLR Nam Nữ - Đen",1450000,10),
    new giay("A04","Adidas","/assets/img/adidas/4.webp","GALAXY 4 Nữ - Trắng",950000,10),
    new giay("A05","Adidas","/assets/img/adidas/5.webp","Parley x Ultraboost 22 - Đen",2480000,10),
    new giay("A06","Adidas","/assets/img/adidas/6.webp","4D Fwd Pulse - Đen",1980000,10),
    new giay("A07","Adidas","/assets/img/adidas/7.webp"," ULTRABOOST 4.0 DNA - Trắng",2750000,10),
    new giay("A08","Adidas","/assets/img/adidas/8.webp","Ultraboost 22 Nam - Xám",2880000,10),
    new giay("A09","Adidas","/assets/img/adidas/9.webp","Alphabounce Flow Nam - Trắng",1650000,10),
    new giay("A10","Adidas","/assets/img/adidas/10.webp","Ultraboost 22 Nam - Đen",2980000,10),
    new giay("A11","Adidas","/assets/img/adidas/11.webp","Falconrun 2.0 - Xám",950000,10),
    new giay("A12","Adidas","/assets/img/adidas/12.webp","Grand Court Nam - Trắng/Đen",1100000,10),
    new giay("A13","Adidas","/assets/img/adidas/13.webp","Superstar - Trắng/Đen",1480000,10),
    new giay("A14","Adidas","/assets/img/adidas/14.webp","Lite Racer Adapt 4.0 - Đen",950000,10),
    new giay("A15","Adidas","/assets/img/adidas/15.webp","Grand Court Nam - Trắng",1050000,10),
    new giay("A16","Adidas","/assets/img/adidas/16.webp","Grand Court - Trắng",1050000,10),
];



var jordan = [
    new giay("J01","Jordan","/assets/img/jordan/1.jpg","Air Jordan 1 Mid SE 'Track Red'",3000000,10),
    new giay("J02","Jordan","/assets/img/jordan/2.jpeg","Air Jordan 1 Mid 'Lightbulb'",8000000,10),
    new giay("J03","Jordan","/assets/img/jordan/3.jpg","Air Jordan 1 High OG 'Tokyo'",4250000,10),
    new giay("J04","Jordan","/assets/img/jordan/4.jpg","Air Jordan 1 High OG 'Tie-Dye'",5000000,10),
    new giay("J05","Jordan","/assets/img/jordan/5.jpg","Air Jordan 1 'Dark Mocha'",6000000,10),
    new giay("J06","Jordan","/assets/img/jordan/6.jpg","Air Jordan 1 High 'Royal Toe'",4990000,10),
    new giay("J07","Jordan","/assets/img/jordan/7.jpg","Dior X Air Jordan 1",46000000,10),
    new giay("J08","Jordan","/assets/img/jordan/8.jpg","Air Jordan 1 Mid Bred 2020",7000000,10),
    new giay("J09","Jordan","/assets/img/jordan/9.webp","Air Jordan 1 Retro High OG 'University Blue'",10000000,10),
    new giay("J10","Jordan","/assets/img/jordan/10.webp","Air Jordan 1 Low GS 'White Pinksicle'",3000000,10),
];


var men = [
    new giay("M01","Men","/assets/img/men/1.png","Giày lười công sở Sdrolun đen",1280000,10),
    new giay("M02","Men","/assets/img/men/2.jpg","Giày Lười Da Xuất Khẩu Anh Quốc",584000,10),
    new giay("M03","Men","/assets/img/men/3.jpg","Giày lười nam trẻ trung tiện lợi",1080000,10),
    new giay("M04","Men","/assets/img/men/4.jpg","Giày buộc dây da bò HongKong",1080000,10),
    new giay("M05","Men","/assets/img/men/5.jpg","Giày cao nam GOG nhập khẩu",1050000,10),
    new giay("M06","Men","/assets/img/men/6.jpg","Giày cao nam da bò đẹp 2022",1580000,10),
    new giay("M07","Men","/assets/img/men/7.jpg","Giày Thể Thao Buộc Dây Anh Quốc ASISA",1180000,10),
    new giay("M08","Men","/assets/img/men/8.jpg","Giày lười thời trang nam da dê mềm",1550000,10),
    new giay("M09","Men","/assets/img/men/9.jpg","Giày da nam xuất khẩu Anh quốc",650000,10),
    new giay("M10","Men","/assets/img/men/10.jpg","Giày lười thời trang mùa hè đục lỗ",1550000,10),
    new giay("M11","Men","/assets/img/men/11.jpg","Giày Da Thể Thao Anh Quốc",1080000,10),
    new giay("M12","Men","/assets/img/men/12.png","Thương hiệu S.drolun màu nâu vàng bò",1200000,10),
]

var bitis = [
    new giay("B01","Bitis","/assets/img/bitis/1.webp","Hunter X DSMH10600TRG Trắng",1050000,10),
    new giay("B02","Bitis","/assets/img/bitis/2.webp","Hunter X DSMH10600TRG Đen",1050000,10),
    new giay("B03","Bitis","/assets/img/bitis/3.webp","Hunter Street Cream DSMH10400KEM Kem",780000,10),
    new giay("B04","Bitis","/assets/img/bitis/4.webp","Hunter Street White DSMH10400TRG Trắng",750000,10),
    new giay("B05","Bitis","/assets/img/bitis/5.webp","Hunter Street Black DSMH10400DEN Đen",750000,10),
    new giay("B06","Bitis","/assets/img/bitis/6.webp","Hunter Street Bloomin' Central DSMH08500DEN Đen",1350000,10),
    new giay("B07","Bitis","/assets/img/bitis/7.webp","Hunter X DSMH09700TRG Trắng",1250000,10),
    new giay("B08","Bitis","/assets/img/bitis/8.webp","Hunter X DSMH09700DEN Đen",1250000,10),
    new giay("B09","Bitis","/assets/img/bitis/9.webp","Hunter X DSMH09700DOO Đỏ",1350000,10),
    new giay("B10","Bitis","/assets/img/bitis/10.webp","Hunter Tennis DSMH10200XAM Xám",850000,10),
    new giay("B11","Bitis","/assets/img/bitis/11.webp","Hunter Tennis DSMH10200TRG Trắng",850000,10),
    new giay("B12","Bitis","/assets/img/bitis/12.webp","Hunter Tennis DSMH10200DEN Đen",850000,10),
    new giay("B13","Bitis","/assets/img/bitis/13.webp","Giày Thể Thao Nam DSM075033XAM Xám",750000,10),
    new giay("B14","Bitis","/assets/img/bitis/14.webp","Giày Thể Thao Nam DSM075033TRG Trắng",750000,10),
]


var sanPham = [nike,adidas,jordan,men,bitis];


//  tránh tạo đè ==> tạo 1 lần rồi thôi
localStorage.getItem("nike") ? 1 : localStorage.setItem("nike", JSON.stringify(nike));
localStorage.getItem("adidas") ? 1 : localStorage.setItem("adidas", JSON.stringify(adidas));
localStorage.getItem("jordan") ? 1 : localStorage.setItem("jordan", JSON.stringify(jordan));
localStorage.getItem("men") ? 1 : localStorage.setItem("men", JSON.stringify(men));
localStorage.getItem("bitis") ? 1 : localStorage.setItem("bitis", JSON.stringify(bitis));
localStorage.getItem("sanPham") ? 1 : localStorage.setItem("sanPham", JSON.stringify(sanPham));





















































