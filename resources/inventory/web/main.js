var Inventory = {},
    mainInventoryID = ""
    allItems = {}
    canDrag = true;

const defaultSettings = {
    "sound": "true",
    "inventory_design": "default",
}
    
const getSettingsData = (type) => {
    return localStorage.getItem(type+'-settings') || defaultSettings[type]; 
}
    
    
const inventorySettingsData = getSettingsData("inventory_design")

const weightSVG = inventorySettingsData != "type_3" ? `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.48638 2.59691H2.46776V2.92153V3.24614H3.80553V2.90077L3.8054 2.92153L2.46776 2.92153C2.46776 2.81254 2.47403 2.70419 2.48638 2.59691ZM7.14998 3.24614V2.90077L7.15012 2.92153L8.48776 2.92152V3.24614H7.14998ZM8.48776 2.92152C8.48776 2.81254 8.48148 2.70419 8.46913 2.59691H8.48776V2.92152Z" fill="#AEAEAE"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.25141 7.70959H8.43408L8.25165 7.69114C8.25165 7.69733 8.25157 7.70348 8.25141 7.70959Z" fill="#AEAEAE"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.80553 3.24614H2.46776C1.35951 3.24614 0.46109 4.11815 0.46109 5.19383V9.73843C0.46109 10.8141 1.35951 11.6861 2.46776 11.6861H8.48776C9.59601 11.6861 10.4944 10.8141 10.4944 9.73843V5.19383C10.4944 4.11815 9.59601 3.24614 8.48776 3.24614H7.14998H3.80553ZM2.0497 5.31187V9.0892H3.10624V8.11535L3.45589 7.6727L4.33 9.0892H5.59177L4.24639 6.99396L5.56137 5.31187H4.33L3.15945 6.83903H3.10624V5.31187H2.0497ZM8.15664 6.55868C8.14017 6.49351 8.1142 6.43634 8.07873 6.38715C8.04326 6.33674 7.99892 6.29432 7.94571 6.25989C7.89377 6.22423 7.83296 6.19779 7.76329 6.18058C7.69488 6.16214 7.6195 6.15291 7.53716 6.15291C7.3598 6.15291 7.20841 6.19411 7.083 6.27649C6.95885 6.35887 6.86383 6.47753 6.79796 6.63246C6.73335 6.78739 6.70105 6.97429 6.70105 7.19316C6.70105 7.41448 6.73208 7.60384 6.79416 7.76123C6.85623 7.91862 6.94871 8.03912 7.07159 8.12273C7.19448 8.20634 7.34713 8.24815 7.52955 8.24815C7.69044 8.24815 7.82409 8.2254 7.93051 8.17991C8.03819 8.13441 8.11863 8.06986 8.17184 7.98625C8.22213 7.90721 8.24866 7.81499 8.25141 7.70959H7.54476V6.97921H9.27019V7.50301C9.27019 7.8473 9.19481 8.14179 9.04406 8.38648C8.89457 8.62994 8.68808 8.81684 8.42457 8.94718C8.16234 9.07629 7.86147 9.14084 7.52195 9.14084C7.14317 9.14084 6.81063 9.06276 6.52432 8.9066C6.23802 8.75044 6.01442 8.52788 5.85353 8.23893C5.69391 7.94997 5.6141 7.6063 5.6141 7.20791C5.6141 6.89559 5.66287 6.61893 5.76042 6.37793C5.85923 6.13693 5.99605 5.93343 6.17087 5.76743C6.3457 5.60021 6.54776 5.47418 6.77705 5.38933C7.00635 5.30326 7.25212 5.26023 7.51435 5.26023C7.74492 5.26023 7.95901 5.29219 8.15664 5.35613C8.35553 5.41884 8.53099 5.5086 8.68301 5.62542C8.8363 5.741 8.95981 5.8781 9.05356 6.03672C9.1473 6.19534 9.20431 6.36932 9.22458 6.55868H8.15664Z" fill="#AEAEAE"/>
<path d="M7.15012 2.92153L8.48776 2.92152C8.48776 2.81254 8.48148 2.70419 8.46913 2.59691H7.14998V2.90077L7.15012 2.92153Z" fill="#AEAEAE"/>
<path d="M5.47776 0C4.67945 4.52599e-07 3.91385 0.307804 3.34937 0.855696C2.86428 1.32653 2.56186 1.94151 2.48638 2.59691H3.80553V2.90077C3.8111 2.47778 3.98664 2.07326 4.29522 1.77375C4.60885 1.46934 5.03422 1.29832 5.47776 1.29832C5.92129 1.29832 6.34666 1.46934 6.66029 1.77375C6.96888 2.07326 7.14441 2.47778 7.14998 2.90077V2.59691H8.46913C8.39365 1.94151 8.09123 1.32652 7.60615 0.855694C7.04166 0.307802 6.27606 -4.52598e-07 5.47776 0Z" fill="#AEAEAE"/>
<path d="M2.46776 2.92153L3.8054 2.92153L3.80553 2.90077V2.59691H2.48638C2.47403 2.70419 2.46776 2.81254 2.46776 2.92153Z" fill="#AEAEAE"/>
</svg>` : `<svg xmlns="http://www.w3.org/2000/svg" width="7" height="10" viewBox="0 0 7 10" fill="none">
<path d="M7 6.66667C7 8.50762 5.433 10 3.5 10C1.567 10 0 8.50762 0 6.66667C0 4.82572 1.567 3.33333 3.5 3.33333C5.433 3.33333 7 4.82572 7 6.66667Z" fill="white"/>
<path d="M1 2.22222H2V4.44444H1V2.22222Z" fill="white"/>
<path d="M5 2.22222H6V4.44444H5V2.22222Z" fill="white"/>
<path d="M6 2.22222C6 1.9304 5.93534 1.64143 5.8097 1.37181C5.68406 1.1022 5.49991 0.857226 5.26777 0.650874C5.03562 0.444521 4.76002 0.280834 4.45671 0.169157C4.15339 0.0574795 3.8283 -1.27561e-08 3.5 0C3.1717 1.27561e-08 2.84661 0.0574795 2.54329 0.169157C2.23998 0.280834 1.96438 0.444521 1.73223 0.650874C1.50009 0.857226 1.31594 1.1022 1.1903 1.37181C1.06466 1.64143 1 1.9304 1 2.22222H2.00229C2.00229 2.04739 2.04103 1.87428 2.11629 1.71276C2.19156 1.55123 2.30188 1.40447 2.44096 1.28085C2.58003 1.15723 2.74514 1.05916 2.92685 0.99226C3.10856 0.925356 3.30332 0.890921 3.5 0.890921C3.69668 0.890921 3.89144 0.925356 4.07315 0.99226C4.25486 1.05916 4.41997 1.15723 4.55904 1.28085C4.69812 1.40447 4.80844 1.55123 4.88371 1.71276C4.95897 1.87428 4.99771 2.04739 4.99771 2.22222H6Z" fill="white"/>
</svg>`
const weightSVG2 = inventorySettingsData != "type_3" ? `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="16" viewBox="0 0 13 16" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.52741 4.06251H2.50417V4.47987V4.89723H4.17361V4.45319L4.17344 4.47987L2.50417 4.47987C2.50417 4.33975 2.512 4.20043 2.52741 4.06251ZM8.34722 4.89723V4.45319L8.34739 4.47987L10.0167 4.47986V4.89723H8.34722ZM10.0167 4.47986C10.0167 4.33974 10.0088 4.20043 9.99342 4.06251H10.0167V4.47986Z" fill="#FFC24A"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.72173 10.6359H9.94968L9.72202 10.6122C9.72202 10.6202 9.72192 10.6281 9.72173 10.6359Z" fill="#FFC24A"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.17361 4.89723H2.50417C1.12115 4.89723 0 6.01838 0 7.4014V13.2445C0 14.6275 1.12115 15.7486 2.50417 15.7486H10.0167C11.3997 15.7486 12.5208 14.6275 12.5208 13.2445V7.4014C12.5208 6.01838 11.3997 4.89723 10.0167 4.89723H8.34722H4.17361ZM1.98247 7.55316V12.4097H3.30095V11.1576L3.73728 10.5885L4.82811 12.4097H6.4027L4.72377 9.71585L6.36476 7.55316H4.82811L3.36735 9.51666H3.30095V7.55316H1.98247ZM9.60346 9.15621C9.5829 9.07242 9.5505 8.99891 9.50623 8.93567C9.46196 8.87085 9.40663 8.81631 9.34023 8.77205C9.27542 8.7262 9.19953 8.69221 9.11258 8.67008C9.02721 8.64636 8.93315 8.63451 8.83039 8.63451C8.60906 8.63451 8.42014 8.68747 8.26363 8.79339C8.1087 8.89931 7.99013 9.05187 7.90793 9.25106C7.8273 9.45026 7.78699 9.69056 7.78699 9.97196C7.78699 10.2565 7.82572 10.5 7.90318 10.7023C7.98065 10.9047 8.09606 11.0596 8.2494 11.1671C8.40275 11.2746 8.59325 11.3284 8.8209 11.3284C9.02168 11.3284 9.18847 11.2991 9.32126 11.2406C9.45564 11.1821 9.55603 11.0992 9.62243 10.9916C9.68519 10.89 9.71829 10.7715 9.72173 10.6359H8.83987V9.69688H10.9931V10.3704C10.9931 10.813 10.899 11.1916 10.7109 11.5062C10.5243 11.8193 10.2667 12.0596 9.93782 12.2271C9.61057 12.3931 9.2351 12.4761 8.81142 12.4761C8.33873 12.4761 7.92374 12.3757 7.56645 12.175C7.20916 11.9742 6.93013 11.688 6.72936 11.3165C6.53016 10.945 6.43056 10.5031 6.43056 9.99093C6.43056 9.58938 6.49143 9.23367 6.61316 8.92381C6.73647 8.61396 6.90721 8.35231 7.12537 8.13889C7.34354 7.92389 7.5957 7.76184 7.88184 7.65276C8.16799 7.5421 8.47468 7.48676 8.80193 7.48676C9.08966 7.48676 9.35683 7.52787 9.60346 7.61008C9.85166 7.6907 10.0706 7.80611 10.2603 7.9563C10.4516 8.1049 10.6058 8.28117 10.7227 8.48511C10.8397 8.68905 10.9109 8.91275 10.9362 9.15621H9.60346Z" fill="#FFC24A"/>
<path d="M8.34739 4.47987L10.0167 4.47986C10.0167 4.33974 10.0088 4.20043 9.99342 4.06251H8.34722V4.45319L8.34739 4.47987Z" fill="#FFC24A"/>
<path d="M6.26041 0.723618C5.2642 0.723618 4.30878 1.11936 3.60435 1.8238C2.999 2.42915 2.6216 3.21985 2.52741 4.06251H4.17361V4.45319C4.18056 3.90933 4.39961 3.38924 4.7847 3.00415C5.17609 2.61277 5.70692 2.39289 6.26042 2.39289C6.81392 2.39289 7.34475 2.61277 7.73613 3.00415C8.12122 3.38924 8.34028 3.90933 8.34722 4.45319V4.06251H9.99342C9.89923 3.21985 9.52184 2.42915 8.91648 1.8238C8.21205 1.11936 7.25663 0.723617 6.26041 0.723618Z" fill="#FFC24A"/>
<path d="M2.50417 4.47987L4.17344 4.47987L4.17361 4.45319V4.06251H2.52741C2.512 4.20043 2.50417 4.33975 2.50417 4.47987Z" fill="#FFC24A"/>
</svg>` : `<svg xmlns="http://www.w3.org/2000/svg" width="7" height="9" viewBox="0 0 7 9" fill="none">
<path d="M7 6C7 7.65685 5.433 9 3.5 9C1.567 9 0 7.65685 0 6C0 4.34315 1.567 3 3.5 3C5.433 3 7 4.34315 7 6Z" fill="#77FFAD"/>
<path d="M1 2H2V4H1V2Z" fill="#77FFAD"/>
<path d="M5 2H6V4H5V2Z" fill="#77FFAD"/>
<path d="M6 2C6 1.73736 5.93534 1.47728 5.8097 1.23463C5.68406 0.991982 5.49991 0.771504 5.26777 0.585786C5.03562 0.400069 4.76002 0.25275 4.45671 0.152241C4.15339 0.0517315 3.8283 -1.14805e-08 3.5 0C3.1717 1.14805e-08 2.84661 0.0517315 2.54329 0.152241C2.23998 0.25275 1.96438 0.400069 1.73223 0.585787C1.50009 0.771504 1.31594 0.991982 1.1903 1.23463C1.06466 1.47728 1 1.73736 1 2H2.00229C2.00229 1.84265 2.04103 1.68685 2.11629 1.54148C2.19156 1.39611 2.30188 1.26403 2.44096 1.15276C2.58003 1.0415 2.74514 0.953248 2.92685 0.893034C3.10856 0.83282 3.30332 0.801829 3.5 0.801829C3.69668 0.801829 3.89144 0.83282 4.07315 0.893034C4.25486 0.953248 4.41997 1.0415 4.55904 1.15276C4.69812 1.26403 4.80844 1.39611 4.88371 1.54148C4.95897 1.68685 4.99771 1.84265 4.99771 2H6Z" fill="#77FFAD"/>
</svg>`
const starSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="29" viewBox="0 0 30 29" fill="none">
<rect y="8.96246" width="12.5607" height="12.5607" rx="1" transform="rotate(-45.5232 0 8.96246)" fill="white" fill-opacity="0.08"/>
<rect x="14.6541" y="22.7874" width="8.46491" height="8.46491" rx="1" transform="rotate(-45.5232 14.6541 22.7874)" fill="white" fill-opacity="0.08"/>
<rect x="23.0278" y="11.6827" width="4.63767" height="4.63767" rx="1" transform="rotate(-45.5232 23.0278 11.6827)" fill="white" fill-opacity="0.08"/>
</svg>`
const clothingSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="55" viewBox="0 0 44 55" fill="none">
<path d="M21.6638 13.6226C21.9511 11.7717 23.5027 10.4414 25.3415 10.4414C25.5713 10.4414 25.8587 10.4414 26.0885 10.4992L35.0529 12.4658L37.2365 8.47485C37.5238 7.89646 37.4089 7.20239 36.8917 6.79751L30.5132 1.59197C29.0766 0.43518 27.2378 -0.143214 25.399 0.030304L22.6982 0.319501C22.5832 0.319501 22.4683 0.43518 22.4108 0.608698C22.1235 2.28604 20.3996 3.67418 18.216 3.90554C16.0324 4.1369 14.0786 3.03795 13.4465 1.47629C13.389 1.36061 13.2741 1.24493 13.1017 1.24493L10.4584 1.47629C8.61956 1.64981 6.89565 2.5174 5.68891 3.96338L0.344782 10.2679C-0.114927 10.7306 -0.114927 11.4825 0.344782 12.0031L4.13739 16.5145C4.5971 17.0929 5.51652 17.1508 6.03369 16.6302L8.56209 14.3166L11.2054 31.6684C11.3203 32.3625 11.9525 32.8252 12.642 32.8252L18.6757 32.2468L21.6638 13.6226Z" fill="white"/>
<path d="M43.1552 16.9772L25.5139 13.2755C24.9392 13.1598 24.3646 13.5647 24.3071 14.1431L18.4458 50.7554C18.3309 51.276 18.7332 51.7965 19.2503 51.9122L23.3303 52.7798C23.8474 52.8955 24.3646 52.5485 24.537 52.0279L32.0647 25.2483C32.1222 25.0747 32.3521 25.1326 32.3521 25.3061L28.5595 52.9533C28.502 53.4739 28.8468 53.9944 29.364 54.1101L33.4439 54.9777C33.961 55.0934 34.4782 54.7463 34.6506 54.2258L43.9597 18.2497C44.1321 17.6713 43.7299 17.0929 43.1552 16.9772Z" fill="white"/>
</svg>`

var MAP = null;
var MAP_IMAGE = "https://media.discordapp.net/attachments/1008062098238099456/1073999413736898700/map3mb.jpg"

const CreateMAP = (id) => {
    if (MAP != undefined)
        MAP.remove();

    CUSTOM_CRS = L.extend({}, L.CRS.Simple, {
        projection: L.Projection.LonLat,
        scale: function(zoom) {
            return Math.pow(2, zoom);
        },
        distance: function(pos1, pos2) {
            var x_difference = pos2.lng - pos1.lng;
            var y_difference = pos2.lat - pos1.lat;
            return Math.sqrt(x_difference * x_difference + y_difference * y_difference);
        },
        transformation: new L.Transformation(0.02072, 117.3, -0.0205, 172.8),
        infinite: false
    });
    
    
    MAP= L.map(id, {
        crs: CUSTOM_CRS,
        minZoom: 2,
        maxZoom: 12,
    
        noWrap: true,
        continuousWorld: false,
        preferCanvas: true,
    
        center: [0, 0],
        zoom: 3,

        zoomDelta: .1,
        zoomSnap: .1,
        tileSize: 1024,
    });

    var SW = MAP.unproject([0, 1024], 3 - 1);
    var NE = MAP.unproject([1024, 0], 3 - 1);
    var MAP_BOUNDS = new L.LatLngBounds(SW, NE);
    MAP.setMaxBounds(MAP_BOUNDS);

    MAP.attributionControl.setPrefix(false)

    MAP.on('drag', function() {
        MAP.panInsideBounds(MAP_BOUNDS, { animate: false });
    });

    MAP.invalidateSize();
    var OVER = L.imageOverlay(MAP_IMAGE, MAP_BOUNDS);
    MAP.addLayer(OVER);
}

const findItemInIcons = (item) => {
    let icon = false
    Object.keys(Config.ItemsByIcons).forEach((key) => {
        const value = Config.ItemsByIcons[key]
        if (value.items.find( x => x == item.name) != undefined) {
            icon = value.icon;
            return ;
        }
        else if (!icon) {
            icon = false;
            return false;
        }
    })

    return icon
}

const createItem = (item, inventory) => {
    const createdIcon = findItemInIcons(item)

    // inventorySettingsData == "default" ? `linear-gradient(0deg, ${allItems[item.name].color} 0%, rgba(255,255,255,0.03) 100%);` : item.color
    return `
    <div class="item item-main item-inventory-${inventorySettingsData}" id="item-${inventory}-${item.slot}" slotid=${item.slot} style="background: ${item.color}">
        
        ${inventorySettingsData == "default" ? 
        `<span class="item-weight-count"><i class="fa-solid fa-weight-hanging icon-weight-count"></i>${( (item.amount >= item.count ? item.amount : item.count )*(item.weight/1000) ).toFixed(1)}kg</span>
        <span class="item-count">x${( (item.amount >= item.count ? item.amount : item.count ))}</span>
        ` :
        `
        <span class="item-count">x${( (item.amount >= item.count ? item.amount : item.count ))} - ${( (item.amount >= item.count ? item.amount : item.count )*(item.weight/1000) ).toFixed(1)}${weightSVG}</span>
        `
        }

        
        ${item.price != undefined ? Inventory[inventory].inventoryType == "shop" && inventorySettingsData == "default" ? `<span class="item-price">${item.price}$</span>` : "" : ""}
        <img class="item-image" src="images/${getItemImage(item)}">
        ${allItems[item.name] != undefined && allItems[item.name].rarity != undefined && Config.Rarity[allItems[item.name].rarity] != undefined && Config.Rarity[allItems[item.name].rarity].visibleOnRarity && inventorySettingsData == "default" ? `<span class="item-rarity" style="background: ${Config.Rarity[allItems[item.name].rarity].background}; box-shadow: 
		0 0 .6vh ${Config.Rarity[allItems[item.name].rarity].background},
		0 0 1.2vh ${Config.Rarity[allItems[item.name].rarity].background},
		0 0 1.8vh ${Config.Rarity[allItems[item.name].rarity].background}; ">${Config.Rarity[allItems[item.name].rarity].label}</span>` : ""}
        ${ createdIcon ? `<div class="item-icon-bottom">${createdIcon}</div>`:"" }
        ${createInfo(item)}
    </div>
    `
}

const createSlots = ( size, inventory, items, addToLoop = 0 ) => {
    let slots = ""
    for (i=1 + addToLoop; i<size+1; i++) {
        const item = Object.values(items).find(item => parseInt(item.slot) == parseInt(i))
        if (item)
            item.count = item.amount
        const createdItem = item ? createItem(item, inventory) : ""
        slots += `
            ${ inventorySettingsData == "default" ? 
            `
            <div class="inventory-slot" slotid=${i} inventoryid=${inventory} is-occupied=${item ? true : false}>
                ${ i < 6 && inventory == mainInventoryID ? `<span class="slot-name">${i}</span>`:''}
                ${createdItem}
            </div>
            `
            :

            `
            <div class="inventory-slot ${createdItem ? "has-item" : ""}" slotid=${i} inventoryid=${inventory} is-occupied=${item ? true : false}>
                ${ i < 6 && inventory == mainInventoryID ? `<div class="filter-main"><div class="first-5-main"></div></div>`:''}
                ${ i < 6 && inventory == mainInventoryID ? `<span class="slot-name"><span>${i}</span></span>`:''}
                ${createdItem}
            </div>
            `}   

        \n`
    }
    return slots
}

const calculateWeigth = (inventoryItems, maxWeight) => {
    const totalWeight = Object.values(inventoryItems).reduce((total, item) => {
        return total + ( (item.amount >= item.count ? item.amount : item.count ) * (item.weight/1000) );
    }, 0);

    return { weight: totalWeight, maxweight: maxWeight}
}

const calculateInventoryWeight = (inventoryItems, maxWeight) => {
    const calculatedWeight = calculateWeigth(inventoryItems, maxWeight)
    return `
    <div class="inventory-weight weight-${inventorySettingsData}">
        ${inventorySettingsData != "default" ? weightSVG2 : `<i class="fa-solid fa-weight-hanging icon-weight"></i>`}
        <div class="inventory-weight-bar">
            <div class="inventory-weight-bar-current" style="width: ${(calculatedWeight.weight/calculatedWeight.maxweight)*100}%; ${inventorySettingsData == "type_3" ? `background: ${calculateColor(calculatedWeight.weight, calculatedWeight.maxweight)}` : ""}"></div>
        </div>
        <div class="inventory-weight-text">
            <b>${calculatedWeight.weight.toFixed(1) + "</b>/" +calculatedWeight.maxweight}${inventorySettingsData == "default" ? " kg" : ""}
        </div>
    </div>
    `
}

const calculateColor = (current, max) => {
    let percentage = (current / max) * 100;
    if (percentage >= 100)
        percentage = 100
    let color;
    if (percentage <= 50) {
        color = '#77FFAD';
    } else if (percentage <= 75) {
        color = `linear-gradient(90deg, #77FFAD ${50}%, #FFFA77 ${percentage}%)`;
    } else {
        color = `linear-gradient(90deg, #77FFAD ${25}%, #FFFA77 50%, #FF3D00 100%)`;
    }

    return color
}

const createCraftingInner = ( inventoryData ) => {
    return inventorySettingsData == "type_2" ? 
    `
    <div class="inventory-slot-inner"> <div class="crafting-slot-inner">${createSlots(inventoryData.inventorySize, inventoryData.inventoryId, inventoryData.inventoryItems)}</div> 
    
    <div class="inventory-crafting-custom crafting-${inventorySettingsData}"> 
        <div class="inventory-crafting-custom-left crafting-left-side">
            <div class="crafting-item crafting-item-${inventorySettingsData}">
                ${starSVG}
            </div>

            <div class="inventory-crafting-layout layout-craft-${inventorySettingsData}">
                <div class="crafting-cancel">
                    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                        <path d="M5 5L1 1M1 5L5 1" stroke="#7C7C7C" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </div>

                <div class="crafting-item-name">
                    ${Config.Language["waiting_craft_item"]}
                </div>
            
                <div class="input-craft-main craft-arrow-${inventorySettingsData}"> 
                    <div class="input-craft-arrow" onclick="changeCraftableCount(-1)">

                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="5" viewBox="0 0 8 5" fill="none">
                        <path d="M1 1L4 3L7 1" stroke="#7C7C7C" stroke-width="2" stroke-linecap="round"/>
                    </svg>

                    </div>

                    <div class="input-craft-current">1</div>

                    <div class="input-craft-arrow" onclick="changeCraftableCount(+1)">

                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="5" viewBox="0 0 8 5" fill="none">
                        <path d="M1 4L4 2L7 4" stroke="#7C7C7C" stroke-width="2" stroke-linecap="round"/>
                    </svg>

                    </div>
                </div>

                <div class="crafting-item-desc">
                    ${Config.Language["select_to_craft"]}
                </div>

                <div class="crafting-process-loader">
                    <div class="radial-loader">
                        <div class="center"></div>
                    </div>
                </div>

                <div class="crafting-info">
                    ${Config.Language["craft_info_time"]}
                </div>


            </div>

            <div class="crafting-requirements">
                <div class="crafting-item crafting-item-${inventorySettingsData}">
                    ${starSVG}
                </div>
                <div class="crafting-item crafting-item-${inventorySettingsData}">
                ${starSVG}
                </div>
                <div class="crafting-item crafting-item-${inventorySettingsData}">
                    ${starSVG}
                </div>
                <div class="crafting-item crafting-item-${inventorySettingsData}">
                    ${starSVG}
                </div>
            </div>

        </div>

        <div class="inventory-crafting-custom-right">

            <div class="crafting-history">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
                        <path d="M13 6C13 9.30457 10.3711 12 7.14818 12C5.5276 12 4.05119 11.3169 3.0069 10.2278L3.90715 9.30457C4.73538 10.1352 5.8877 10.6707 7.14818 10.6707C9.66901 10.6707 11.7035 8.58466 11.7035 6C11.7035 3.41534 9.66901 1.32919 7.14818 1.32919C4.93337 1.32919 3.07892 2.89843 2.66474 5.0399L4.12321 4.81837L2.05257 7.79064L0 4.81837L1.36838 5.02137C1.8005 2.16 4.2133 0 7.14818 0C10.3711 0 13 2.6769 13 6Z" fill="#848484"/>
                        <path d="M9.29084 4.04301C10.047 3.71071 10.5512 4.91074 9.81305 5.26156L7.4724 6.22153L6.9862 7.56911C6.69812 8.41831 5.50979 7.86462 5.7798 7.10766L6.33789 5.51988C6.40991 5.35367 6.5 5.22451 6.64404 5.16906L9.29084 4.04301Z" fill="#848484"/>
                    </svg>
                    ${Config.Language["crafting_history"]}
                </span>
                <div class="crafting-history-list">

                    <div class="crafting-item crafting-item-${inventorySettingsData}">
                        ${starSVG}
                    </div>
                    <div class="crafting-item crafting-item-${inventorySettingsData}">
                        ${starSVG}
                    </div>
                    <div class="crafting-item crafting-item-${inventorySettingsData}">
                        ${starSVG}
                    </div>
                    <div class="crafting-item crafting-item-${inventorySettingsData}">
                        ${starSVG}
                    </div>

                    <div class="crafting-item crafting-item-${inventorySettingsData}">
                        ${starSVG}
                    </div>
                    <div class="crafting-item crafting-item-${inventorySettingsData}">
                        ${starSVG}
                    </div>
                    <div class="crafting-item crafting-item-${inventorySettingsData}">
                        ${starSVG}
                    </div>
                    <div class="crafting-item crafting-item-${inventorySettingsData}">
                        ${starSVG}
                    </div>
                </div>
            </div>

            <div class="craft-buttons">
                <button class="auto-button">${Config.Language["auto"]}</button>
                <button class="craft-button">${Config.Language["craft_item"]}</button>
            </div>

        </div>
    </div>

    </div>
    ` :

    `
    <div class="inventory-slot-inner"> <div class="crafting-slot-inner">${createSlots(inventoryData.inventorySize, inventoryData.inventoryId, inventoryData.inventoryItems)}</div> 
    
    <div class="inventory-crafting-custom crafting-${inventorySettingsData}"> 
        <div class="inventory-crafting-custom-left crafting-left-side">
            <div class="crafting-item crafting-item-${inventorySettingsData}">
                ${starSVG}
            </div>

            <div class="input-craft-main craft-arrow-${inventorySettingsData}"> 
                <div class="input-craft-arrow" onclick="changeCraftableCount(-1)">

                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="5" viewBox="0 0 8 5" fill="none">
                    <path d="M1 1L4 3L7 1" stroke="#7C7C7C" stroke-width="2" stroke-linecap="round"/>
                </svg>

                </div>

                <div class="input-craft-current">1</div>

                <div class="input-craft-arrow" onclick="changeCraftableCount(+1)">

                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="5" viewBox="0 0 8 5" fill="none">
                    <path d="M1 4L4 2L7 4" stroke="#7C7C7C" stroke-width="2" stroke-linecap="round"/>
                </svg>

                </div>
            </div>

            <div class="inventory-crafting-layout layout-craft-${inventorySettingsData}">
                <div class="crafting-item-name">
                    ${Config.Language["waiting_craft_item"]}
                </div>
            


                <div class="crafting-item-desc">
                    ${Config.Language["select_to_craft"]}
                </div>

                <div class="crafting-info">
                    ${Config.Language["craft_info_time"]}
                </div>
            </div>

            <div class="crafting-requirements">
                <div class="crafting-item crafting-item-${inventorySettingsData}">
                    ${starSVG}
                </div>
                <div class="crafting-item crafting-item-${inventorySettingsData}">
                ${starSVG}
                </div>
                <div class="crafting-item crafting-item-${inventorySettingsData}">
                    ${starSVG}
                </div>
                <div class="crafting-item crafting-item-${inventorySettingsData}">
                    ${starSVG}
                </div>
            </div>

        </div>

        <div class="inventory-crafting-custom-right">

            <div class="craft-buttons">
                <button class="auto-button">${Config.Language["auto"]}</button>
                <button class="craft-button">${Config.Language["craft_item"]}</button>
            </div>

        </div>
    </div>

    </div>
    `
}

const createInventoryInner = (inventoryData) => {
    return inventorySettingsData == "default" ? 
                    
        `${createSlots(inventoryData.inventorySize, inventoryData.inventoryId, inventoryData.inventoryItems)}` 
    :

    inventoryData.inventoryId == mainInventoryID ? `
    <div class="inventory-slot-inner player-inner">
        ${createSlots(5, inventoryData.inventoryId, inventoryData.inventoryItems)}
    </div>
    
    <div class="inventory-slot-inner">
        ${createSlots(inventoryData.inventorySize-5, inventoryData.inventoryId, inventoryData.inventoryItems, 5)}
    </div>
    ` : 
    
    inventoryData.inventoryType == "crafting" ? createCraftingInner(inventoryData)
    :
    inventorySettingsData == "type_2" ?
    `<div class="inventory-slot-inner">
        ${createSlots(inventoryData.inventorySize, inventoryData.inventoryId, inventoryData.inventoryItems)}
    </div>`
    :
    `
    <div class="inventory-slot-inner">
        <div class="inventory-main-inner-gps-health">
            ${createSlots(inventoryData.inventorySize, inventoryData.inventoryId, inventoryData.inventoryItems)}
        </div>
        <div id="map-item"></div>
    </div>
    `
}

$(document).on("click", ".filter-icon", (e) => {
    const filterTo = $(e.currentTarget).attr("filter")
    if ($(".selected-filter").attr("filter") === filterTo)
        return console.error("[ERROR] Clicked to same filter action");


    $(".selected-filter").removeClass("selected-filter")
    $(e.currentTarget).addClass("selected-filter")

    const otherInventory = Object.values(Inventory).filter( x => x.inventoryId != mainInventoryID)[0]
    const $otherInventoryElement = $("#inventories").find(`[invid="${otherInventory.inventoryId}"]`)

    if (filterTo == "all") {
        return $otherInventoryElement.find(".inventory-slot").show();
    }

    $otherInventoryElement.find(".inventory-slot").each((key, value) => {

        if ($(value).attr("is-occupied") == "true") {
            const item = $(value).children().data("dataItem")

            if ( Config.Filters[filterTo] && (Config.Filters[filterTo].find( x => item.name == x ) != undefined || (filterTo == "weapons" && item.type == "weapon"))) { $(value).show() }
            else { $(value).hide() }
                
        } else {
            $(value).hide()
        }

    })
})

// setTimeout(() => {
//     const canvas = document.getElementById("inventory-game")
//     MainRender.renderToTarget(canvas);
// }, 1000)

const createInventory = ( inventoryData ) => {
    inventoryData.inventoryItems = Object.entries(inventoryData.inventoryItems).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})

    Inventory[inventoryData.inventoryId] = inventoryData;
    $("#inventories").append(`
        <div class="inventory ${inventoryData.inventoryType == "crafting" ? "inventory-class-crafting" : ""} ${inventoryData.inventoryId != mainInventoryID ? "non-player-inv" : ""}" tabindex="-1" invid=${inventoryData.inventoryId}>
            <div class="inventory-top">
            ${ inventorySettingsData == "default" ?
                 `<div class="icon-main-user"><i class="${Config.InventoryIcons[inventoryData.inventoryType] ? Config.InventoryIcons[inventoryData.inventoryType] : 'fa-solid fa-question'}"></i></div> <div class="inventory-label">${inventoryData.inventoryLabel}</div>` : ""}
                ${calculateInventoryWeight(inventoryData.inventoryItems, inventoryData.inventoryWeight)}
            </div>
            <div class="inventory-slots ${ inventorySettingsData != "default" ? "slots-modified" : ""} ${ mainInventoryID == inventoryData.inventoryId && inventorySettingsData != "default" ? "player-inventory" : ""}" tabindex="-1">
                ${ createInventoryInner(inventoryData) }

            </div>
            ${
                inventoryData.inventoryId == mainInventoryID && inventorySettingsData == "default" ? `<div class="inventory-buttons  inventory-button-${inventorySettingsData}">
                    ${Config.Clothing ? `<button class="button-inventory" todo="cloth">${Config.Language["clothing"]}</button>` : ""}
                    <button class="button-inventory" todo="setting">${Config.Language["settings"]}</button>
                </div>` : ""
            }
        </div>
    `)

    Object.values(inventoryData.inventoryItems).forEach((item) => {
        $(`#item-${inventoryData.inventoryId}-${item.slot}`).data("dataItem", item)
    })

    setupItemsDraggable()

    //init_iconsax()
}

const createCostsItem = (costs, multipy) => {
    let cotsInnerHTML = ""
    let created = 0
    $.each(costs, (k, v) => {
        created += 1
        cotsInnerHTML += `<div class="crafting-item item-main" style="background: ${allItems[k].color};">
            <img class="item-image" src="images/${getItemImage(allItems[k])}">
            ${ `<span class="item-count">x${v} ${multipy > 1 ? `(x${v*multipy})`: ""}</span>` }
            ${allItems[k] != undefined && allItems[k].rarity != undefined && Config.Rarity[allItems[k].rarity] != undefined && Config.Rarity[allItems[k].rarity].visibleOnRarity ? `<span class="item-rarity" style="background: ${Config.Rarity[allItems[item.name].rarity].background}; box-shadow: 
            0 0 .6vh ${Config.Rarity[allItems[k].rarity].background},
            0 0 1.2vh ${Config.Rarity[allItems[k].rarity].background},
            0 0 1.8vh ${Config.Rarity[allItems[k].rarity].background}; ">${Config.Rarity[allItems[k].rarity].label}</span>` : ""}
        </div>` 

        if (inventorySettingsData == "type_3" && created < Object.values(costs).length)
            cotsInnerHTML += `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="18" viewBox="0 0 30 18" fill="none">
            <path d="M29.1629 8.47302L22.3583 1.75951C22.2712 1.67302 22.1675 1.60444 22.0534 1.55778C21.9392 1.51111 21.8168 1.48728 21.6932 1.48765C21.5697 1.48734 21.4465 1.51121 21.3325 1.55788C21.2185 1.60455 21.115 1.67308 21.0281 1.75951L19.0441 3.71681C18.9567 3.803 18.8874 3.90533 18.8401 4.01796C18.7928 4.13058 18.7685 4.25129 18.7685 4.37319C18.7685 4.49509 18.7928 4.6158 18.8401 4.72843C18.8874 4.84105 18.9567 4.94338 19.0441 5.02957L20.5213 6.48751H18.1235C18.0886 6.4875 18.0551 6.47379 18.0303 6.44941C18.0056 6.42502 17.9917 6.39195 17.9917 6.35746V5.43301C17.9901 4.09157 17.4493 2.80552 16.4879 1.85697C15.5266 0.908426 14.2231 0.374839 12.8636 0.37326H12.1323C10.7727 0.374839 9.46931 0.908426 8.50795 1.85697C7.54658 2.80552 7.00579 4.09157 7.00419 5.43301V12.1624C7.00406 12.2789 6.95711 12.3906 6.87362 12.4729C6.79014 12.5553 6.67694 12.6016 6.55887 12.6018H5.82762C5.7102 12.601 5.59788 12.5543 5.51529 12.4719C5.4327 12.3896 5.38656 12.2782 5.387 12.1624V7.41589C5.38674 7.16974 5.28752 6.93374 5.11111 6.75969C4.9347 6.58564 4.69551 6.48776 4.44603 6.48751H1.63991C1.39048 6.48783 1.15136 6.58575 0.975013 6.75979C0.798663 6.93383 0.699479 7.16978 0.699219 7.41589V12.1624C0.700185 13.5044 1.24063 14.7913 2.202 15.7408C3.16336 16.6902 4.46715 17.2246 5.82734 17.2268H6.55859C7.91943 17.2252 9.22408 16.6912 10.1863 15.7418C11.1486 14.7923 11.6899 13.5051 11.6914 12.1624V5.43301C11.6916 5.31776 11.7381 5.20729 11.8207 5.1258C11.9033 5.04431 12.0152 4.99844 12.132 4.99826H12.8633C12.9801 4.99844 13.0921 5.04431 13.1746 5.1258C13.2572 5.20729 13.3037 5.31776 13.3039 5.43301V7.19564C13.305 8.23416 13.7237 9.22982 14.468 9.96414C15.2122 10.6985 16.2214 11.1115 17.2739 11.1125H20.5213L19.0441 12.5703C18.9567 12.6565 18.8874 12.7588 18.8401 12.8714C18.7928 12.984 18.7685 13.1047 18.7685 13.2266C18.7685 13.3485 18.7928 13.4692 18.8401 13.5818C18.8874 13.6945 18.9567 13.7968 19.0441 13.883L21.0276 15.8405C21.2068 16.0094 21.4451 16.1037 21.6929 16.1037C21.9408 16.1037 22.1791 16.0094 22.3583 15.8405L29.1629 9.127C29.2065 9.08407 29.241 9.03309 29.2646 8.97699C29.2881 8.92088 29.3003 8.86074 29.3003 8.80001C29.3003 8.73928 29.2881 8.67914 29.2646 8.62303C29.241 8.56693 29.2065 8.51595 29.1629 8.47302ZM21.6911 15.1867L19.7069 13.2245L21.9841 10.977C22.0497 10.9123 22.0943 10.8299 22.1124 10.7403C22.1304 10.6506 22.1212 10.5576 22.0857 10.4731C22.0503 10.3886 21.9902 10.3164 21.9132 10.2656C21.8362 10.2147 21.7456 10.1876 21.6529 10.1875H17.2739C16.47 10.1866 15.6993 9.87108 15.1309 9.31021C14.5624 8.74935 14.2426 7.98892 14.2417 7.19574V5.43301C14.2412 5.07252 14.0959 4.72693 13.8375 4.47202C13.5792 4.21712 13.2289 4.07371 12.8636 4.07326H12.1323C11.767 4.07371 11.4167 4.21712 11.1583 4.47202C10.9 4.72693 10.7546 5.07252 10.7542 5.43301V12.1624C10.7529 13.2598 10.3105 14.312 9.52404 15.088C8.73753 15.864 7.67116 16.3005 6.55887 16.3018H5.82762C4.71598 16.2999 3.65049 15.863 2.86487 15.087C2.07926 14.311 1.63768 13.2592 1.637 12.1624L1.63991 7.41251H4.44603L4.44922 12.1624C4.44904 12.5235 4.59403 12.8699 4.85238 13.1257C5.11074 13.3815 5.46136 13.5257 5.82734 13.5268H6.55859C6.92521 13.5264 7.2767 13.3825 7.53594 13.1267C7.79518 12.8709 7.941 12.5241 7.94141 12.1624V5.43301C7.94272 4.3368 8.38465 3.28587 9.17026 2.51073C9.95587 1.7356 11.021 1.29956 12.132 1.29826H12.8633C13.9743 1.29956 15.0394 1.7356 15.825 2.51073C16.6107 3.28587 17.0526 4.3368 17.0539 5.43301V6.35736C17.0542 6.63715 17.167 6.90539 17.3676 7.10321C17.5681 7.30103 17.84 7.41227 18.1235 7.41251H21.6529C21.7456 7.41249 21.8362 7.38535 21.9133 7.33453C21.9903 7.28371 22.0504 7.21149 22.0859 7.12699C22.1213 7.04249 22.1306 6.94951 22.1126 6.85981C22.0945 6.7701 22.0498 6.6877 21.9843 6.62302L19.7069 4.37102L21.6955 2.41353L28.1687 8.80001L21.6911 15.1867Z" fill="#999999"/>
            <path d="M21.6911 15.1867L19.7069 13.2245L21.9841 10.977C22.0497 10.9123 22.0943 10.8299 22.1124 10.7403C22.1304 10.6506 22.1212 10.5576 22.0857 10.4731C22.0503 10.3886 21.9902 10.3164 21.9132 10.2656C21.8362 10.2147 21.7456 10.1876 21.6529 10.1875H17.2739C16.47 10.1866 15.6993 9.87108 15.1309 9.31021C14.5624 8.74935 14.2426 7.98892 14.2417 7.19574V5.43301C14.2412 5.07252 14.0959 4.72693 13.8375 4.47202C13.5792 4.21712 13.2289 4.07371 12.8636 4.07326H12.1323C11.767 4.07371 11.4167 4.21712 11.1583 4.47202C10.9 4.72693 10.7546 5.07252 10.7542 5.43301V12.1624C10.7529 13.2598 10.3105 14.312 9.52404 15.088C8.73753 15.864 7.67116 16.3005 6.55887 16.3018H5.82762C4.71598 16.2999 3.65049 15.863 2.86487 15.087C2.07926 14.311 1.63768 13.2592 1.637 12.1624L1.63991 7.41251H4.44603L4.44922 12.1624C4.44904 12.5235 4.59403 12.8699 4.85238 13.1257C5.11074 13.3815 5.46136 13.5257 5.82734 13.5268H6.55859C6.92521 13.5264 7.2767 13.3825 7.53594 13.1267C7.79518 12.8709 7.941 12.5241 7.94141 12.1624V5.43301C7.94272 4.3368 8.38465 3.28587 9.17026 2.51073C9.95587 1.7356 11.021 1.29956 12.132 1.29826H12.8633C13.9743 1.29956 15.0394 1.7356 15.825 2.51073C16.6107 3.28587 17.0526 4.3368 17.0539 5.43301V6.35736C17.0542 6.63715 17.167 6.90539 17.3676 7.10321C17.5681 7.30103 17.84 7.41227 18.1235 7.41251H21.6529C21.7456 7.41249 21.8362 7.38535 21.9133 7.33453C21.9903 7.28371 22.0504 7.21149 22.0859 7.12699C22.1213 7.04249 22.1306 6.94951 22.1126 6.85981C22.0945 6.7701 22.0498 6.6877 21.9843 6.62302L19.7069 4.37102L21.6955 2.41353L28.1687 8.80001L21.6911 15.1867Z" fill="#999999"/>
            </svg>`
    }) 
    return cotsInnerHTML; 
}

let isHidden = false
let hiddenType = "";
$(document).on("click", ".button-inventory", (event) => {
    const $e = $(event.currentTarget)
    const action = $e.attr("todo")

    if (action == undefined)
        return false;

    if (isHidden && hiddenType != action)
         return AudioPlay("sounds/Click_Sound_02.mp3", .2, true);

    AudioPlay("sounds/Click_Sound_01.mp3", .2, true)
    hiddenType =  action
    if (action == "setting") {
        changeSettingsStatus()

        isHidden = !isHidden
    } else if ("cloth") {
        changeClothingStatus()

        isHidden = !isHidden 
    }
}).on("mouseenter", ".button-inventory", () => {
    AudioPlay("sounds/Click_Sound_03.mp3", .2)
})

const changeClothingStatus = () => {
    const inventory = Object.values(Inventory).filter(x => x.inventoryId != mainInventoryID)[0]

    const $inv = $("#inventories").find(`[invid="${inventory.inventoryId}"]`)
    if (!isHidden) {
        $(".inventory-clothing-section").show()
        $.post("https://inventory/ChangeClothingPedStatus", JSON.stringify({ isDisplay: true }))
        $inv.hide()
    } else {
        $(".inventory-clothing-section").hide()
        $.post("https://inventory/ChangeClothingPedStatus", JSON.stringify({ isDisplay: false }))
        $inv.show()
    }
} 

const changeSettingsStatus = () => {
    const inventory = Object.values(Inventory).filter(x => x.inventoryId != mainInventoryID)[0]
    
    const $inv = $("#inventories").find(`[invid="${inventory.inventoryId}"]`)
    if (!isHidden) {
        $(".inventory-settings-section").show()
        $inv.hide()
    } else {
        $(".inventory-settings-section").hide()
        $inv.show()
    }
} 


// $(body).mousedown(function() {
    
// })

const changeValue = (val) => {
    $("#range-value").html(val)
}

const addItem = ( inventoryid, item ) => {
    const $slot = $('.inventory-slots').find(`[slotid=${item.slot}][inventoryid=${inventoryid}]`)

    $slot.attr("is-occupied", true)
    $slot.html(createItem(item, inventoryid))
    $slot.children().data("dataItem", item)

    Inventory[inventoryid].inventoryItems[item.slot] = item;

    const fromInventoryMain = $("#inventories").find(`[invid=${inventoryid}]`)

    fromInventoryMain.find(".inventory-weight").remove()
    fromInventoryMain.find(".inventory-top").append(calculateInventoryWeight(Inventory[inventoryid].inventoryItems, Inventory[inventoryid].inventoryWeight))

    setupItemsDraggable()
    init_iconsax()
}


const setupContextMenu = (item, inv) => {
    let context = ""

    context += `<div class="context-item" item-slot="${item.slot}" inventory="${inv}" item-action="use"><span>${Config.Language["use"]}</span> <div class="icon-context"><i class="fa-solid fa-hand-point-up"></i></div></div>
    <div class="context-item" item-slot="${item.slot}" inventory="${inv}" item-action="give"><span>${Config.Language["give"]}</span> <div class="icon-context"><i class="fa-solid fa-handshake"></i></div></div>`
    return context
}

const rgb2hex = (rgb) => {
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? "#" +
        ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

const hexToRgb = (hex, a=1) => {
    // Remove the '#' character if present
    hex = hex.replace('#', '');
  
    // Parse the hexadecimal components
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
  
    // Return the RGB values as an object
    return { r, g, b, a };
  }

$('body').mousedown((event) => {
    if ($(event.target).parent() && $("#context-menu").length) {
        if ( $(event.target).parent().parent().get(0).classList[0] != "context-item" && $(event.target).parent().get(0).classList[0] != "context-item" && $(event.target).get(0).classList[0] != "context-item") {
            $("#context-menu").remove()
            $('#item-tooltip').hide()
        }
    }
})

$(document).on("mousedown", ".context-item", (event) => {
    const $e = $(event.currentTarget)
    if($e.attr("item-action") == "use") {
        var item = $e.parent().data("itemData")
        $.post("https://inventory/UseItem",JSON.stringify({item: item}))
    }
    else if ($e.attr("item-action") == "give") {
        var item = $e.parent().data("itemData")
        $.post("https://inventory/GiveItem",JSON.stringify({item: item}))
    }

    $("#context-menu").remove()
    $("#item-tooltip").hide()
})


const changeCraftableCount = (amount) => {
    if ($(".crafting-left-side").data("craftingItem") == null)
        return false;

    amount = parseInt(amount)
    max = parseInt($(".crafting-left-side").data("craftingItem").amount)

    let calculate = parseInt($(".input-craft-current").html()) + amount

    if (calculate > max)
        calculate = max
    else if (calculate < 1)
        calculate = 1

    $(".input-craft-current").html( calculate )

    $(".crafting-right-side").html(`
        <span class="crafting-ingredients">${Config.Language["ingredients"]}</span>
        ${createCostsItem($(".crafting-left-side").data("craftingItem").costs, calculate)}
    `)
    $(".crafting-requirements").html(`
        ${createCostsItem($(".crafting-left-side").data("craftingItem").costs, calculate)}
    `)
}

const setupItemsDraggable = () => {
    $('.item').each(() => {
        var droppable = $(this).data('ui-draggable');
        if (droppable)
            $(this).draggable('destroy');
    });

    $('.inventory-slot').each(() => {
        var droppable = $(this).data('ui-droppable');
        if (droppable)
            $(this).droppable('destroy');
    });

    if ( inventorySettingsData != "default") {
        if ( $(".drop-use").data("ui-droppable") )
            $(".drop-use").droppable("destroy");
        if ( $(".drop-give").data("ui-droppable") )
            $(".drop-give").droppable("destroy");

        $(".drop-use").droppable({
            drop: (event, ui) => {
                const item = ui.draggable.data("dataItem")
                if ( item && $(ui.draggable.parent()).attr("inventoryid") == mainInventoryID )
                    $.post("https://inventory/UseItem",JSON.stringify({item: item}))
            }
        })

        $(".drop-give").droppable({
            drop: (event, ui) => {
                const item = ui.draggable.data("dataItem")
                if ( item && $(ui.draggable.parent()).attr("inventoryid") == mainInventoryID)
                    $.post("https://inventory/GiveItem",JSON.stringify({item: item}))
            }
        })
    }
        
    $('.item').draggable({
        revert: 'invalid',
        revertDuration: 0,
        scroll: true,
        helper: "clone",
        appendTo: 'body',
        start: (e, ui) => {
            const $el = $(e.currentTarget).parent().attr("inventoryid") != undefined ? $(e.currentTarget) : $(e.target)
            
            const inventory = Object.values(Inventory).filter(x => x.inventoryId == $el.parent().attr("inventoryid"))[0]
            if (!canDrag)
                return false;
            else
                if (inventory.inventoryType != "crafting")
                    AudioPlay("sounds/Click_Sound_01.mp3", .2, true)
                else
                    return false;
        },
        drag: (e, ui) => {
            const $el = $(e.target).data("dataItem") != undefined ? $(e.target) : $(e.currentTarget)
            
            if ($el.data("dataItem") == undefined)
                return false;

            const $slotel = $(".inventory-slots").find(`[inventoryid=${$el.parent().attr("inventoryid")}][slotid=${$el.data("dataItem").slot}]`)
            if ( $slotel.attr("is-occupied") == "false")
                return false;
        }
    })
    .unbind("click").click((event) => {
        const inventory = Object.values(Inventory).filter(x => x.inventoryId == $(event.currentTarget).parent().attr("inventoryid"))[0]
        if (inventory.inventoryType == "crafting") {
            const item = $(event.currentTarget).data("dataItem")
            $(".input-craft-current").html(1)

            if (inventorySettingsData == "default") {
                $(".craft-popup").css("display", "flex")

                $(".inventory-crafting").addClass("transform-scale")
                $(".inventory-crafting").removeClass("transform-scale-reverse")

                $(".crafting-left-side").html(`
                    <span class="crafting-item-label">${Config.Language["crafting_item_label"]}<br>${item.label}</span>
                    <div class="crafting-item item-main" style="background: ${allItems[item.name].color}">
                        <span class="item-weight-count"><i class="fa-solid fa-weight-hanging icon-weight-count"></i>${( (item.amount >= item.count ? item.amount : item.count )*(item.weight/1000) ).toFixed(1)}kg</span>
                        <img class="item-image" src="images/${getItemImage(item)}">
                        ${allItems[item.name] != undefined && allItems[item.name].rarity != undefined && Config.Rarity[allItems[item.name].rarity] != undefined && Config.Rarity[allItems[item.name].rarity].visibleOnRarity ? `<span class="item-rarity" style="background: ${Config.Rarity[allItems[item.name].rarity].background}; box-shadow: 
                        0 0 .6vh ${Config.Rarity[allItems[item.name].rarity].background},
                        0 0 1.2vh ${Config.Rarity[allItems[item.name].rarity].background},
                        0 0 1.8vh ${Config.Rarity[allItems[item.name].rarity].background}; ">${Config.Rarity[allItems[item.name].rarity].label}</span>` : ""}
                    </div>
                `).data("craftingItem", item)
                $(".crafting-right-side").html(`
                    <span class="crafting-ingredients">${Config.Language["ingredients"]}</span>
                    ${createCostsItem(item.costs, 1)}
                `)
            } else if (inventorySettingsData == "type_2") {
                $(".crafting-left-side").data("craftingItem", item)
                $(".crafting-left-side > .crafting-item").html(`
                <img class="item-image" src="images/${getItemImage(item)}">
                ${allItems[item.name] != undefined && allItems[item.name].rarity != undefined && Config.Rarity[allItems[item.name].rarity] != undefined && Config.Rarity[allItems[item.name].rarity].visibleOnRarity ? `<span class="item-rarity" style="background: ${Config.Rarity[allItems[item.name].rarity].background}; box-shadow: 
                0 0 .6vh ${Config.Rarity[allItems[item.name].rarity].background},
                0 0 1.2vh ${Config.Rarity[allItems[item.name].rarity].background},
                0 0 1.8vh ${Config.Rarity[allItems[item.name].rarity].background}; ">${Config.Rarity[allItems[item.name].rarity].label}</span>` : ""}
                ${createInfo(item)}
                `).css("background", item.color)
                $($(".crafting-item-type_2")[0]).attr("style", "background: " + item.color + ";")
                $(".crafting-item-name").html(item.label)
                $(".crafting-item-desc").html(item.description)
                $(".crafting-requirements").html(createCostsItem(item.costs, 1))
            } else if (inventorySettingsData == "type_3") {
                $(".crafting-left-side").data("craftingItem", item)
                $(".crafting-left-side > .crafting-item").html(`
                <img class="item-image" src="images/${getItemImage(item)}">
                ${createInfo(item)}
                `).css("background", item.color)
                $(".crafting-item-type_3").attr("style", "background: " + item.color + ";")
                $(".crafting-item-name").html(item.label)
                $(".crafting-item-desc").html(item.description)
                $(".crafting-requirements").html(createCostsItem(item.costs, 1))
            }
        } else {
            return false;
        }

        if (!$("#context-menu").length) {
            $('#item-tooltip').hide()
            $(".item").removeClass("non-hover").removeClass("hover-item")
        }
    })
    .unbind("mouseenter").mouseenter((event) => {
        const hoverItem = $(event.currentTarget).data("dataItem")
        const parentInventoryId = $(event.currentTarget).parent().attr("inventoryid")
        $('#item-tooltip').show().css({"left": event.screenX+25+"px", "top": event.screenY-100+"px"}).html(createTooltipInfo(hoverItem, Inventory[parentInventoryId])).addClass("tooltip-type-"+inventorySettingsData)
        
        if (inventorySettingsData != "default") {
            $(".tooltip-durability-bar").appendTo($(".tooltip-label"))
            $(".tooltip-attachments").appendTo($(".tooltip-label"))
            $(".tooltip-durability-count").remove()
        }

        $(".item").addClass("non-hover")
        $(event.currentTarget).removeClass("non-hover").addClass("hover-item")
        AudioPlay("sounds/Click_Sound_04.mp3", .2)
    })
    .unbind("mousemove").mousemove((event) => {
        if (!$("#context-menu").length)
            $('#item-tooltip').css({"left": event.screenX+25+"px", "top": event.screenY-100+"px"})
    })
    .unbind("mouseleave").mouseleave(() => {
        if (!$("#context-menu").length) {
            $('#item-tooltip').hide()
            $(".item").removeClass("non-hover").removeClass("hover-item")
        }
    })
    .unbind("contextmenu").contextmenu((event) => {
        $(".item").removeClass("non-hover").removeClass("hover-item")
        if ($(event.currentTarget).parent().attr("inventoryid") == mainInventoryID && inventorySettingsData == "default") {
            $('#context-menu').remove()
            $("#item-tooltip").append(`
            <div id="context-menu">
                ${setupContextMenu($(event.currentTarget).data("dataItem"), $(event.currentTarget).parent().attr("inventoryid"))}
            </div>
            `)
            $("#context-menu").data("itemData", $(event.currentTarget).data("dataItem"))

            init_iconsax()
        }
    })
    .unbind("mouseup").mouseup((event) => {
        if (event.ctrlKey) {
            let itemData = $(event.currentTarget).data("dataItem")
            const inventory = Object.values(Inventory).filter(x => x.inventoryId != $(event.currentTarget).parent().attr("inventoryid"))[0]

            if (Inventory[inventory.inventoryId].inventoryType == "shop" || Inventory[inventory.inventoryId].inventoryType == "crafting")
                return false;

            if (Inventory[$(event.currentTarget).parent().attr("inventoryid")].inventoryType == "crafting")
                return false;

            for ( var i = 1; i<inventory.inventorySize+1; i++) {

                const $slotel =  $(".inventory-slots").find(`[inventoryid=${inventory.inventoryId}][slotid=${i}]`)
                const slot = $slotel.attr("is-occupied") == "true" ? true : false;

                if ( !slot ) {
                    let cash = 0;
                    if ($(event.currentTarget).parent().attr("inventoryid") != undefined && Inventory[$(event.currentTarget).parent().attr("inventoryid")].inventoryType == "shop")
                        $.post("https://inventory/GetCash", JSON.stringify(), function(result) { cash = result; })

                    if (Inventory[$(event.currentTarget).parent().attr("inventoryid")].inventoryType == "shop") {
                        if (itemData.price * itemData.amount > cash) {
                            return false;
                        } else {
                            $.post("https://inventory/BuyItem", JSON.stringify({ price: itemData.price * itemData.amount }))
                        }
                    }

                    let weight = calculateWeigth(Inventory[$(event.currentTarget).parent().attr("inventoryid")].inventoryItems, Inventory[$(event.currentTarget).parent().attr("inventoryid")].inventoryWeight)
                    if ( (weight.weight + ((itemData.amount*itemData.weight)/1000) > weight.maxweight) && $(event.currentTarget).parent().attr("inventoryid") != inventory.inventoryId)
                        return false;
                    
                    delete Inventory[$(event.currentTarget).parent().attr("inventoryid")].inventoryItems[itemData.slot];
                    Inventory[inventory.inventoryId].inventoryItems[i] = itemData;

                    const $slotmain = $(".inventory-slots").find(`[inventoryid=${$(event.currentTarget).parent().attr("inventoryid")}][slotid=${itemData.slot}]`)

                    const fromInventoryMain = $('#inventories').find(`[invid=${$(event.currentTarget).parent().attr("inventoryid")}]`),
                            toInventoryMain = $('#inventories').find(`[invid=${inventory.inventoryId}]`);

                    fromInventoryMain.find(".inventory-weight").remove()
                    fromInventoryMain.find(".inventory-top").append(calculateInventoryWeight(Inventory[$(event.currentTarget).parent().attr("inventoryid")].inventoryItems, Inventory[$(event.currentTarget).parent().attr("inventoryid")].inventoryWeight))

                    toInventoryMain.find(".inventory-weight").remove()
                    toInventoryMain.find(".inventory-top").append(calculateInventoryWeight(Inventory[inventory.inventoryId].inventoryItems, Inventory[inventory.inventoryId].inventoryWeight))

                    $slotmain.html("")
                    $slotmain.attr("is-occupied", false)

                    let fromItem = JSON.parse(JSON.stringify(itemData))

                    itemData.slot = i
                    $slotel.html(createItem(itemData, inventory.inventoryId))
                    $slotel.children().data("dataItem", itemData)
                    $slotel.attr("is-occupied", true) 
   

                    MoveItem(inventory.inventoryId, $slotmain.attr("inventoryid"), itemData.slot, fromItem.slot, null, itemData)
                    
                    setupItemsDraggable()
                    init_iconsax()

                    $("#context-menu").remove()
                    $('#item-tooltip').hide()


                    break;
                }
            }
        }
    })

    $(".inventory-slot").droppable({
        hoverClass: "inventory-slot-hover",
        over: () => {
            AudioPlay("sounds/Click_Sound_03.mp3", .2)
        },
        drop: ( event, ui ) => {

            let fromSlot = JSON.parse( JSON.stringify( parseInt(ui.draggable.attr("slotid")) )),
                    toSlot = JSON.parse( JSON.stringify( parseInt($(event.target).attr("slotid")) ));

            const fromInventoryID = JSON.parse( JSON.stringify( ui.draggable.parent().attr("inventoryid") )),
                    toInventoryID = JSON.parse( JSON.stringify( $(event.target).attr("inventoryid") )),
                    toOccupied = $(event.target).attr("is-occupied") == "true" ? true : false; 
                    
            const fromInventory = ui.draggable.parent(),
                    toInventory = $(event.target).parent(); 



            if (toInventoryID != undefined && Inventory[toInventoryID].inventoryType == "shop")
                return false;

            if (toInventoryID != undefined && Inventory[toInventoryID].inventoryType == "crafting")
                return false;
        
            if ( ui.draggable.data("dataItem") == undefined )
                return false;

            let cash = 0;
            if (fromInventoryID != undefined && Inventory[fromInventoryID].inventoryType == "shop")
                $.post("https://inventory/GetCash", JSON.stringify(), function(result) { cash = result; })

            setTimeout(function() {
                if ($(event.target).attr("slotclothing") != undefined || fromInventory.attr("slotclothing")) {
                    const clothing = $(event.target).attr("slotclothing") || fromInventory.attr("slotclothing"),
                            draggedItem = ui.draggable.data("dataItem");

                    if ( ((allItems[draggedItem.name].clothingSlot != undefined && allItems[draggedItem.name].clothingSlot == clothing) || (clothing == draggedItem.name)) && !toOccupied && $(event.target).attr("slotclothing") != undefined) {

                        toSlot = $(event.target).attr("slotid")

                        let weight = calculateWeigth(Inventory[toInventoryID].inventoryItems, Inventory[toInventoryID].inventoryWeight)
                        if ( (weight.weight + ((ui.draggable.data("dataItem").amount*ui.draggable.data("dataItem").weight)/1000) > weight.maxweight) && fromInventoryID != toInventoryID)
                            return false;

                        // Default move \\
                        fromInventory.attr("is-occupied", false)
                        $(event.target).attr("is-occupied", true)
        
                        const fromItem = JSON.parse(JSON.stringify( ui.draggable.data("dataItem") ));
                        fromItem.slot = toSlot
        
                        fromInventory.html("")
        
                        $(event.target).html(createItem(fromItem, toInventoryID))
                        $(event.target).children().data("dataItem", fromItem)

                        delete Inventory[fromInventoryID].inventoryItems[fromSlot];
                        Inventory[toInventoryID].inventoryItems[fromItem.slot] = fromItem;
                        
                        MoveItem(toInventoryID, fromInventoryID, toSlot, fromSlot, undefined, fromItem)
                        setupItemsDraggable()
                        init_iconsax()

                        // Equip \\

                        $.post("https://inventory/ChangeClothing", JSON.stringify({
                            slot: clothing,
                            isDress: true,
                            clothingInfo: fromItem.info
                        }))

                    } else if ( ((allItems[draggedItem.name].clothingSlot != undefined && allItems[draggedItem.name].clothingSlot == clothing) || (clothing == draggedItem.name)) && !toOccupied && fromInventory.attr("slotclothing") != undefined) {
                        fromSlot = fromInventory.attr("slotid")

                        let weight = calculateWeigth(Inventory[toInventoryID].inventoryItems, Inventory[toInventoryID].inventoryWeight)
                        if ( (weight.weight + ((ui.draggable.data("dataItem").amount*ui.draggable.data("dataItem").weight)/1000) > weight.maxweight) && fromInventoryID != toInventoryID)
                            return false;

                        // Default move \\
                        fromInventory.attr("is-occupied", false)
                        $(event.target).attr("is-occupied", true)
        
                        const fromItem = JSON.parse(JSON.stringify( ui.draggable.data("dataItem") ));
                        fromItem.slot = toSlot
        
                        fromInventory.html(createClothingSlot(fromInventory.attr("slotclothing"), false))
        
                        $(event.target).html(createItem(fromItem, toInventoryID))
                        $(event.target).children().data("dataItem", fromItem)

                        delete Inventory[fromInventoryID].inventoryItems[fromSlot];
                        Inventory[toInventoryID].inventoryItems[fromItem.slot] = fromItem;
                        
                        MoveItem(toInventoryID, fromInventoryID, toSlot, fromSlot, undefined, fromItem)
                        setupItemsDraggable()
                        init_iconsax()

                        $.post("https://inventory/ChangeClothing", JSON.stringify({
                            slot: clothing,
                            isDress: false,
                            clothingInfo: "not required",
                        }))
                        // Unequip \\
                    }
                } else {

                    if (!toOccupied) {
                        // Checking is dividing or not dividing \\
                        if ( ( ( inventorySettingsData == "default" ?  !event.ctrlKey : true)  && checkInventoryNumberControl(ui.draggable.data("dataItem").amount)) || ui.draggable.data("dataItem").amount < 2) { 

                            // Default buy action \\
                            if (Inventory[fromInventoryID].inventoryType == "shop") {
                                if (ui.draggable.data("dataItem").price * ui.draggable.data("dataItem").amount > cash) {
                                    return false;
                                } else {
                                    $.post("https://inventory/BuyItem", JSON.stringify({ price: ui.draggable.data("dataItem").price * ui.draggable.data("dataItem").amount }))
                                }
                            }

                            if ( ui.draggable.data("dataItem").costs != undefined && Inventory[fromInventoryID].inventoryType == "crafting") {
                                let isHave = FindItemsByNameAmount(ui.draggable.data("dataItem").costs, ui.draggable.data("dataItem").amount, toInventoryID)
                                if (Inventory[fromInventoryID].inventoryType == "crafting" && !isHave)
                                    return false;
                                else
                                    $.post("https://inventory/CraftItem", JSON.stringify({item: ui.draggable.data("dataItem"), amount: ui.draggable.data("dataItem").amount}))
                            }

                            let weight = calculateWeigth(Inventory[toInventoryID].inventoryItems, Inventory[toInventoryID].inventoryWeight)
                            if ( (weight.weight + ((ui.draggable.data("dataItem").amount*ui.draggable.data("dataItem").weight)/1000) > weight.maxweight) && fromInventoryID != toInventoryID)
                                return false;

                            // Default move \\
                            fromInventory.attr("is-occupied", false)
                            $(event.target).attr("is-occupied", true)
            
                            const fromItem = JSON.parse(JSON.stringify( ui.draggable.data("dataItem") ));
                            fromItem.slot = toSlot
            
                            fromInventory.html("")
            
                            $(event.target).html(createItem(fromItem, toInventoryID))
                            $(event.target).children().data("dataItem", fromItem)

                            delete Inventory[fromInventoryID].inventoryItems[fromSlot];
                            Inventory[toInventoryID].inventoryItems[fromItem.slot] = fromItem;

                            if (toInventoryID != fromInventoryID) {
                                const fromInventoryMain = $('#inventories').find(`[invid=${fromInventoryID}]`),
                                        toInventoryMain = $('#inventories').find(`[invid=${toInventoryID}]`);
            
                                fromInventoryMain.find(".inventory-weight").remove()
                                fromInventoryMain.find(".inventory-top").append(calculateInventoryWeight(Inventory[fromInventoryID].inventoryItems, Inventory[fromInventoryID].inventoryWeight))
            
                                toInventoryMain.find(".inventory-weight").remove()
                                toInventoryMain.find(".inventory-top").append(calculateInventoryWeight(Inventory[toInventoryID].inventoryItems, Inventory[toInventoryID].inventoryWeight))
                            }
                            
                            MoveItem(toInventoryID, fromInventoryID, toSlot, fromSlot, undefined, fromItem)
                            setupItemsDraggable()
                            init_iconsax()
                        } else {
                            // Divide move to empty slot \\
                            const fromItem = ui.draggable.data("dataItem");
                            let MoveSplit = (amount) => {
                                const value = amount

                                if (Inventory[fromInventoryID].inventoryType == "shop") {
                                    if (ui.draggable.data("dataItem").price * value > cash) {
                                        return false;
                                    } else {
                                        $.post("https://inventory/BuyItem", JSON.stringify({ price: ui.draggable.data("dataItem").price * value }))
                                    }
                                }

                                if ( ui.draggable.data("dataItem").costs != undefined && Inventory[fromInventoryID].inventoryType == "crafting") {
                                    let isHave = FindItemsByNameAmount(ui.draggable.data("dataItem").costs, value, toInventoryID)
                                    if (Inventory[fromInventoryID].inventoryType == "crafting" && !isHave)
                                        return false;
                                    else
                                        $.post("https://inventory/CraftItem", JSON.stringify({item: ui.draggable.data("dataItem"), amount: value}))
                                }

                                let weight = calculateWeigth(Inventory[toInventoryID].inventoryItems, Inventory[toInventoryID].inventoryWeight)
                                if ( (weight.weight + ((value*ui.draggable.data("dataItem").weight)/1000) > weight.maxweight) && fromInventoryID != toInventoryID)
                                    return false;
            

                                const newItem = JSON.parse(JSON.stringify(fromItem))
                                newItem.count = value
                                fromItem.count -= value

                                newItem.amount = newItem.count
                                fromItem.amount = fromItem.count
                                
                                newItem.slot = toSlot
                                Inventory[fromInventoryID].inventoryItems[fromSlot] = fromItem;
                                Inventory[toInventoryID].inventoryItems[toSlot] = newItem;

                                fromInventory.html(createItem(fromItem, fromInventoryID))
                                fromInventory.children().data("dataItem", fromItem)

                                $(event.target).html(createItem(newItem, toInventoryID))
                                $(event.target).children().data("dataItem", newItem)
                                $(event.target).attr("is-occupied", true)

                                if (toInventoryID != fromInventoryID) {
                                    const fromInventoryMain = $('#inventories').find(`[invid=${fromInventoryID}]`),
                                            toInventoryMain = $('#inventories').find(`[invid=${toInventoryID}]`);
                
                                    fromInventoryMain.find(".inventory-weight").remove()
                                    fromInventoryMain.find(".inventory-top").append(calculateInventoryWeight(Inventory[fromInventoryID].inventoryItems, Inventory[fromInventoryID].inventoryWeight))
                        
                                    toInventoryMain.find(".inventory-weight").remove()
                                    toInventoryMain.find(".inventory-top").append(calculateInventoryWeight(Inventory[toInventoryID].inventoryItems, Inventory[toInventoryID].inventoryWeight))
                                }
                                
                                MoveItem(toInventoryID, fromInventoryID, toSlot, fromSlot, fromItem, newItem)
                            }

                            if (inventorySettingsData == "default") {
                                $("#split-item").show().css({"left": event.screenX+"px", "top": event.screenY+"px"}).find("#split-range").prop({"max": fromItem.count-1, "value": 1})
                                $("#range-value").html("1")
                                $("body").unbind("keypress").keypress((e) => {
                                    MoveSplit(parseInt($("#split-item").hide().find("#split-range").val()))
                                })
                            } else {
                                if ($("#inventory-number").val() <= fromItem.amount )
                                    MoveSplit(parseInt($("#inventory-number").val()) > 0 ? parseInt($("#inventory-number").val()) : fromItem.amount )
                            }
                        }

                    }

                    else if ( (fromSlot != toSlot) || (fromInventoryID != toInventoryID)) {
                        const fromItem = ui.draggable.data("dataItem"),
                                toItem = $($(event.target).find(".item-main")).data("dataItem");

                        if ( ( ( inventorySettingsData == "default" ?  !event.ctrlKey : true) && checkInventoryNumberControl(fromItem.amount)) || fromItem.amount < 2) { 
                            // Default Merge \\
                            if (fromItem.name == toItem.name && !toItem.unique) {

                                if (Inventory[fromInventoryID].inventoryType == "shop") {
                                    if (fromItem.price * fromItem.amount > cash) {
                                        return false;
                                    } else {
                                        $.post("https://inventory/BuyItem", JSON.stringify({ price: fromItem.price * fromItem.amount }))
                                    }
                                }

                                if ( ui.draggable.data("dataItem").costs != undefined && Inventory[fromInventoryID].inventoryType == "crafting") {
                                    let isHave = FindItemsByNameAmount(ui.draggable.data("dataItem").costs, ui.draggable.data("dataItem").amount, toInventoryID)
                                    if (Inventory[fromInventoryID].inventoryType == "crafting" && !isHave)
                                        return false;
                                    else
                                        $.post("https://inventory/CraftItem", JSON.stringify({item: ui.draggable.data("dataItem"), amount: ui.draggable.data("dataItem").amount}))
                                }

                                let weight = calculateWeigth(Inventory[toInventoryID].inventoryItems, Inventory[toInventoryID].inventoryWeight)
                                if ( (weight.weight + ((ui.draggable.data("dataItem").amount*ui.draggable.data("dataItem").weight)/1000) > weight.maxweight) && fromInventoryID != toInventoryID)
                                    return false;

                                fromInventory.attr("is-occupied", false)
                                fromInventory.html("")
            
                                delete Inventory[fromInventoryID].inventoryItems[fromSlot];
            
                                toItem.count = parseInt(toItem.count) + parseInt(fromItem.count);
                                toItem.amount = toItem.count
            
                                Inventory[toInventoryID].inventoryItems[toSlot] = toItem;
            
                                $(event.target).html(createItem(toItem, toInventoryID))
                                $(event.target).children().data("dataItem", toItem)
            
                                if (toInventoryID != fromInventoryID) {
                                    const fromInventoryMain = $('#inventories').find(`[invid=${fromInventoryID}]`),
                                            toInventoryMain = $('#inventories').find(`[invid=${toInventoryID}]`);
                
                                    fromInventoryMain.find(".inventory-weight").remove()
                                    fromInventoryMain.find(".inventory-top").append(calculateInventoryWeight(Inventory[fromInventoryID].inventoryItems, Inventory[fromInventoryID].inventoryWeight))
                        
                                    toInventoryMain.find(".inventory-weight").remove()
                                    toInventoryMain.find(".inventory-top").append(calculateInventoryWeight(Inventory[toInventoryID].inventoryItems, Inventory[toInventoryID].inventoryWeight))
                                }
                                
                                MoveItem(toInventoryID, fromInventoryID, toSlot, fromSlot, null, toItem)
                            }
                        } else {
                            // Merge with split \\
                            if (fromItem.name == toItem.name && !toItem.unique) {
                                let MoveSplit = (amount) => {
                                    const value = amount

                                    if (Inventory[fromInventoryID].inventoryType == "shop") {
                                        if (ui.draggable.data("dataItem").price * value > cash) {
                                            return false;
                                        } else {
                                            $.post("https://inventory/BuyItem", JSON.stringify({ price: ui.draggable.data("dataItem").price * value }))
                                        }
                                    }

                                    if ( ui.draggable.data("dataItem").costs != undefined && Inventory[fromInventoryID].inventoryType == "crafting") {
                                        let isHave = FindItemsByNameAmount(ui.draggable.data("dataItem").costs, value, toInventoryID)
                                        if (Inventory[fromInventoryID].inventoryType == "crafting" && !isHave)
                                            return false;
                                        else
                                            $.post("https://inventory/CraftItem", JSON.stringify({item: ui.draggable.data("dataItem"), amount: value}))
                                    }

                                    let weight = calculateWeigth(Inventory[toInventoryID].inventoryItems, Inventory[toInventoryID].inventoryWeight)
                                    if ( (weight.weight + ((value*ui.draggable.data("dataItem").weight)/1000) > weight.maxweight) && fromInventoryID != toInventoryID)
                                        return false;


                                    toItem.count += value
                                    fromItem.count -= value

                                    toItem.amount = toItem.count
                                    fromItem.amount = fromItem.count
                                    
                                    toItem.slot = toSlot
                                    Inventory[fromInventoryID].inventoryItems[fromSlot] = fromItem;
                                    Inventory[toInventoryID].inventoryItems[toSlot] = toItem;

                                    fromInventory.html(createItem(fromItem, fromInventoryID))
                                    fromInventory.children().data("dataItem", fromItem)

                                    $(event.target).html(createItem(toItem, toInventoryID))
                                    $(event.target).children().data("dataItem", toItem)

                                    if (toInventoryID != fromInventoryID) {
                                        const fromInventoryMain = $('#inventories').find(`[invid=${fromInventoryID}]`),
                                                toInventoryMain = $('#inventories').find(`[invid=${toInventoryID}]`);
                    
                                        fromInventoryMain.find(".inventory-weight").remove()
                                        fromInventoryMain.find(".inventory-top").append(calculateInventoryWeight(Inventory[fromInventoryID].inventoryItems, Inventory[fromInventoryID].inventoryWeight))
                            
                                        toInventoryMain.find(".inventory-weight").remove()
                                        toInventoryMain.find(".inventory-top").append(calculateInventoryWeight(Inventory[toInventoryID].inventoryItems, Inventory[toInventoryID].inventoryWeight))
                                    } 

                                    MoveItem(toInventoryID, fromInventoryID, toSlot, fromSlot, fromItem, toItem)

                                }
                                
                                if ( inventorySettingsData == "default" )  {
                                    $("#split-item").show().css({"left": event.screenX+"px", "top": event.screenY+"px"}).find("#split-range").prop({"max": fromItem.count-1, "value": 1})
                                    $("#range-value").html("1")
                                    $("body").unbind("keypress").keypress((e) => {
                                        MoveSplit(parseInt($("#split-item").hide().find("#split-range").val()))
                                    })
                                } else {
                                    if ($("#inventory-number").val() <= fromItem.amount )
                                        MoveSplit( parseInt($("#inventory-number").val()) > 0 ? parseInt($("#inventory-number").val()) :  fromItem.amount ) 
                                }
                            }
                        }
                    }
                }

            }, 75)
        }
    })
}

FindItemsByNameAmount = (items, amount, inventoryid) => {
    let haveEnough = true
    let inventoryItem = Object.values(Inventory[inventoryid].inventoryItems)
    $.each(items, (key, value) => {
        let item = inventoryItem.find(x => x.name == key)
        if (item == undefined) {
            haveEnough = false;
        }
        else {
            if (item.name == key) {
                if (item.amount < ( amount * value )) {
                    haveEnough = false;
                }
            }
        }
    })
    return haveEnough
}

MoveItem = (toInventoryID, fromInventoryID, toSlot, fromSlot, fromItem, toItem) => {
    $(".has-item").removeClass("has-item")
    $(".item-main").parent().addClass("has-item")
    $('#split-range').css("background","white")
    AudioPlay("sounds/Click_Sound_02.mp3", .2, true)
    $.post("https://inventory/ItemMove", JSON.stringify({
        toInventoryID: toInventoryID,
        fromInventoryID: fromInventoryID,

        toSlot: toSlot,
        fromSlot: fromSlot,

        fromInventory: Inventory[fromInventoryID].inventoryItems,
        toInventory: Inventory[toInventoryID].inventoryItems,

        fromInventoryType: Inventory[fromInventoryID].inventoryType,
        toInventoryType: Inventory[toInventoryID].inventoryType,

        fromItem: fromItem,
        toItem: toItem,
    }))

    canDrag = false;
    setTimeout(function() { canDrag = true; }, 100)

    setupItemsDraggable()
    init_iconsax()
}

const drawGameToUI = () => {
    let interval;
    $("#inventory-game").hide()

    if (isDebug || inventorySettingsData == "default") 
        return false;

    $("#inventory-game").show()
    if (MainRender == undefined) {
        interval = setInterval(()=> {
            if (MainRender != undefined) {
                const canvas = document.getElementById("inventory-game")
                MainRender.renderToTarget(canvas);
                clearInterval(interval)
            }
        }, 250)
    } else {
        const canvas = document.getElementById("inventory-game")
        MainRender.renderToTarget(canvas);
    }
}

const inventorySetup = (data) => {
    allItems = data.items
    Inventory = {}

    drawGameToUI()

    $("#inventories").html("");
    $(".inventory-visible").show();
    if (data.inventory != undefined) {
        mainInventoryID = data.inventory.inventoryId

        createInventory(data.inventory)
    }

    if ( inventorySettingsData !== "default" ) {
        $(".inventory-visible").addClass("inventory-visible-"+inventorySettingsData)
        $("#inventories").addClass("inventories-"+inventorySettingsData).append(`
            <div class="inventory-center-buttons">
               <div class="inventory-buttons inventory-button-${inventorySettingsData}">
                    ${Config.Clothing ? `<button class="button-inventory clothing-button" todo="cloth">${Config.Language["clothing"]}</button>` : ""}
                    <button class="button-inventory settings-button" todo="setting">${Config.Language["settings"]}</button>
                </div>

                <div class="inventory-buttons-center inventory-button-${inventorySettingsData}">
                    <div class="button-inventory">
                        <input type="number" min="0" max="9999" id="inventory-number" value="0" placeholder="${Config.Language["amount"]}" pattern="[0-9]" onfocus="this.value='0'" placeholder="" oninput="validity.valid||(value='');" onblur="if (!this.value) { this.value = 0; }">
                    </div>

                    <div class="button-inventory drop-use">
                        <svg width="56" height="26" viewBox="0 0 56 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.97748 23.81L8.08801 25.1353C6.36462 26.3426 5.1821 26.8497 2.63535 22.3948L1.5735 20.5484C-0.973253 16.0887 -0.0483882 15.123 1.67074 13.9199L3.56305 12.5946L9.97748 23.81Z" fill="#AEAEAE"/>
                            <path d="M55.6068 13.6158C55.9105 14.1755 56.0504 14.8378 55.9837 15.4481C55.9063 16.1765 55.5592 16.7102 55.2597 16.8093L35.4556 25.7169C32.5831 26.6411 28.0581 25.1199 24.0655 23.777C20.672 22.6358 17.7413 21.6483 15.9583 22.2368L11.6881 23.0157L5.19987 11.6767L10.9265 9.09772C15.3116 7.11856 17.9506 8.11025 22.3237 9.75229C25.0003 10.7594 28.335 12.006 32.9593 12.8664C36.7673 13.5743 37.8874 16.1133 38.1429 16.8746C38.4496 17.8002 38.402 18.7006 38.0251 19.1684C37.6177 19.6663 37.3735 19.6551 35.4102 19.0806C35.0816 18.9858 34.7224 18.8804 34.3235 18.7709C34.2653 18.7561 34.2057 18.7491 34.1432 18.7449L25.3815 18.2947C24.8712 18.2687 24.4524 18.7161 24.4495 19.2934C24.4495 19.8679 24.8626 20.3581 25.373 20.3841L34.046 20.8301C34.398 20.9291 34.7224 21.0204 35.0149 21.1075C36.9597 21.6757 38.2423 22.0528 39.4135 20.6222C40.0317 19.8538 40.2865 18.7385 40.1609 17.5348L53.6321 12.4317C54.1502 12.275 54.7713 12.5279 55.2554 13.0982C55.3888 13.259 55.5067 13.4346 55.606 13.6207V13.6158H55.6068Z" fill="#AEAEAE"/>
                            <rect x="32" y="4.28122" width="6" height="6" rx="1" transform="rotate(-45.5232 32 4.28122)" fill="#C6FFA3"/>
                            <rect x="39" y="10.8852" width="4.04353" height="4.04353" rx="1" transform="rotate(-45.5232 39 10.8852)" fill="#A3FFF9"/>
                            <rect x="43" y="5.58066" width="2.21533" height="2.21533" rx="1" transform="rotate(-45.5232 43 5.58066)" fill="#CBA3FF"/>
                        </svg>
                    </div>

                    <div class="button-inventory drop-give">
                        <svg width="56" height="27" viewBox="0 0 56 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.97748 2.18994L8.08801 0.864653C6.36462 -0.342646 5.1821 -0.849726 2.63535 3.60513L1.5735 5.45155C-0.973253 9.91132 -0.0483882 10.877 1.67074 12.0801L3.56305 13.4054L9.97748 2.18994Z" fill="#AEAEAE"/>
                            <path d="M55.6068 12.3842C55.9105 11.8244 56.0504 11.1621 55.9837 10.5518C55.9063 9.82351 55.5592 9.28974 55.2597 9.19071L35.4556 0.283112C32.5831 -0.64115 28.0581 0.880089 24.0655 2.22294C20.672 3.36422 17.7413 4.35169 15.9583 3.76314L11.6881 2.98426L5.19987 14.3233L10.9265 16.9023C15.3116 18.8814 17.9506 17.8897 22.3237 16.2477C25.0003 15.2405 28.335 13.9939 32.9593 13.1336C36.7673 12.4256 37.8874 9.88672 38.1429 9.1254C38.4496 8.19973 38.402 7.29935 38.0251 6.8316C37.6177 6.33365 37.3735 6.34489 35.4102 6.91939C35.0816 7.0142 34.7224 7.11955 34.3235 7.22912C34.2653 7.24387 34.2057 7.25089 34.1432 7.2551L25.3815 7.70529C24.8712 7.73128 24.4524 7.2839 24.4495 6.70658C24.4495 6.13208 24.8626 5.64186 25.373 5.61587L34.046 5.1699C34.398 5.07087 34.7224 4.97956 35.0149 4.89248C36.9597 4.3243 38.2423 3.94715 39.4135 5.37779C40.0317 6.14613 40.2865 7.26142 40.1609 8.46521L53.6321 13.5683C54.1502 13.7249 54.7713 13.4721 55.2554 12.9018C55.3888 12.741 55.5067 12.5654 55.606 12.3793V12.3842H55.6068Z" fill="#AEAEAE"/>
                            <path d="M39.5 14V24M39.5 24L44 19.5556M39.5 24L35 19.5556" stroke="#FF747C" stroke-width="3" stroke-linecap="round"/>
                        </svg>
                    </div>
                </div>
            </div>
        
        `)

        $("body").css("--font-family", '"Inter", sans-serif')
        if (inventorySettingsData == "type_3")
            $(".ah-bars").appendTo($("#inventories").find(`[invid=${mainInventoryID}]`).find(`.inventory-slots`)).addClass("health-armor-bar-"+inventorySettingsData)
        else
            $(".ah-bars").appendTo($("#inventories").find(`[invid=${mainInventoryID}]`).find(`.inventory-top`)).addClass("health-armor-bar-"+inventorySettingsData)
        // if (inventorySettingsData == "type_3")
        //     $(".inventory-weight").prependTo($(".player-inner"))

        if (Config.Clothing != false) {
            $($(".button-inventory")[0]).html(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="29" viewBox="0 0 24 29" fill="none">
            <path d="M11.8166 7.1828C11.9733 6.20689 12.8196 5.50546 13.8226 5.50546C13.948 5.50546 14.1047 5.50546 14.2301 5.53596L19.1197 6.57286L20.3108 4.46856C20.4675 4.16359 20.4048 3.79762 20.1227 3.58414L16.6436 0.839401C15.86 0.229458 14.857 -0.0755129 13.854 0.0159785L12.3808 0.168464C12.3181 0.168464 12.2554 0.229458 12.2241 0.32095C12.0674 1.20537 11.1271 1.9373 9.936 2.05929C8.74493 2.18127 7.67924 1.60183 7.33446 0.778407C7.30311 0.717412 7.24043 0.656418 7.1464 0.656418L5.70458 0.778407C4.70158 0.869898 3.76126 1.32735 3.10304 2.08978L0.188063 5.41397C-0.0626877 5.65795 -0.0626877 6.05441 0.188063 6.32888L2.25676 8.70766C2.50751 9.01263 3.00901 9.04313 3.2911 8.76865L4.67023 7.54877L6.11205 16.6979C6.17474 17.0639 6.51952 17.3078 6.89565 17.3078L10.1867 17.0029L11.8166 7.1828Z" fill="#5B5C5D"/>
            <path d="M23.5392 8.95164L13.9167 6.99982C13.6032 6.93883 13.2898 7.15231 13.2584 7.45728L10.0614 26.762C9.99868 27.0364 10.2181 27.3109 10.5002 27.3719L12.7256 27.8294C13.0077 27.8903 13.2898 27.7074 13.3838 27.4329L17.4899 13.3127C17.5212 13.2212 17.6466 13.2517 17.6466 13.3432L15.5779 27.9208C15.5465 28.1953 15.7346 28.4698 16.0167 28.5308L18.2421 28.9882C18.5242 29.0492 18.8063 28.8663 18.9003 28.5918L23.978 9.62257C24.0721 9.3176 23.8527 9.01263 23.5392 8.95164Z" fill="#5B5C5D"/>
            </svg> `)
            $($(".button-inventory")[1]).html(`<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M20.9376 17.6117C20.8641 17.6722 17.9801 20.0448 18.1625 19.8948L18.1611 19.896C18.1584 19.8979 18.1572 19.9012 18.1545 19.9032C17.7055 20.2722 16.9964 20.2584 16.5685 19.8421C16.1459 19.4333 16.1746 18.7935 16.6323 18.4165C16.7391 18.3286 19.487 16.0653 19.4127 16.1265C19.8534 15.7626 20.5671 15.7636 21.0013 16.1862C21.4239 16.5949 21.3953 17.2347 20.9376 17.6117ZM19.4296 13.8066L19.4306 13.8079C19.4378 13.8162 19.4453 13.8244 19.4532 13.8327C19.8758 14.2414 19.8471 14.8812 19.3894 15.2582C19.1681 15.4406 16.4397 17.688 16.6092 17.5483C16.1657 17.915 15.4535 17.9093 15.0204 17.4886C14.5978 17.0798 14.6268 16.44 15.0845 16.063L17.8646 13.773C18.3327 13.3865 19.0479 13.4417 19.4296 13.8066ZM17.7847 11.3611C18.2739 11.8352 18.2406 12.5759 17.7109 13.012C15.5282 14.8047 16.4683 14.0397 15.1919 15.0868C14.6713 15.5152 13.8517 15.5015 13.3501 15.017C12.8609 14.5429 12.8942 13.8022 13.4239 13.3661C13.6005 13.2207 15.3227 11.8034 15.9557 11.2826C16.4867 10.8567 17.2947 10.8872 17.7847 11.3611ZM15.863 8.64455C16.4249 9.19167 16.3848 10.0441 15.7713 10.5468C15.6494 10.6472 13.4629 12.4467 13.6025 12.3318C13.3455 12.5013 13.3974 12.5239 13.0462 12.6375C13.0269 12.5302 13.0033 12.4224 12.9594 12.3163L11.9921 9.99966C12.0678 9.93739 13.8487 8.47194 13.7361 8.56458C13.745 8.55736 13.7511 8.55347 13.7594 8.54689C14.3503 8.07423 15.2791 8.07817 15.863 8.64455ZM4.32256 6.3761C3.39718 5.20887 3.24212 3.70778 3.87992 2.42694L5.35861 4.28917C6.03821 5.14738 7.42631 5.52118 8.65726 4.79821C9.72449 4.13224 9.97859 2.82177 9.22345 1.8722L7.7437 0.00933754C9.39098 -0.0870758 10.8752 0.568731 11.7837 1.71734C12.819 3.01976 12.8928 4.75125 11.9717 6.1292C11.8983 6.23901 11.9043 6.37737 11.9871 6.48146L13.2523 8.07585L13.251 8.07696C13.2462 8.08085 13.2405 8.08335 13.2358 8.08727C13.1624 8.14776 11.5589 9.46793 11.6601 9.38462C11.1995 8.80249 10.4154 8.49866 9.64137 8.56521L9.31549 8.15202C9.2324 8.04666 9.087 7.99525 8.94519 8.01873C7.22613 8.32887 5.40458 7.73983 4.32256 6.3761ZM8.98638 26.4431L7.25271 27.8693C7.14456 27.9587 7.0074 27.9968 6.86487 28C6.72412 27.9949 6.59306 27.9397 6.49528 27.8445L0.137917 21.6821C0.0440879 21.5945 -0.00497274 21.479 0.000398718 21.3559C0.00577018 21.2315 0.0652185 21.1179 0.172299 21.0315L1.90059 19.6015C2.0048 19.5177 2.13767 19.4765 2.26981 19.4765C2.4145 19.4765 2.5581 19.526 2.66231 19.6225C10.2926 27.019 4.42076 21.3271 9.01359 25.7792C9.20626 25.9689 9.19409 26.2723 8.98638 26.4431ZM14.7156 22.737C12.8888 24.2347 11.1169 23.1754 9.06768 24.8537L9.05926 24.8608L3.58874 19.5578C4.35181 18.6079 4.7315 17.4506 4.65276 16.2623C4.58508 15.2728 4.57434 14.3982 4.61945 13.587C4.71041 11.8885 5.9112 10.3735 7.67745 9.72862C8.31168 9.50013 8.95845 9.33066 9.60092 9.2253C10.2803 9.11168 10.9654 9.44872 11.2218 10.0282C11.2515 10.0954 12.3022 12.6078 12.2714 12.541C12.5563 13.231 12.0081 14.0516 11.105 14.0516C11.1018 14.0516 11.0986 14.0516 11.095 14.0516C10.5933 14.0464 10.1097 13.7773 9.92717 13.3217C9.66467 12.7035 9.55151 11.933 9.58123 10.965C9.5866 10.7854 9.42688 10.6363 9.22454 10.6312C9.02113 10.6147 8.85353 10.7676 8.84779 10.9473C8.81557 12.0009 8.94413 12.8527 9.2385 13.5445C9.60561 14.463 11.6274 15.3415 10.9797 17.255C10.9217 17.427 11.0316 17.6079 11.2257 17.6593C11.4165 17.7111 11.6236 17.6154 11.6823 17.4416C11.9995 16.5049 11.8203 15.5997 11.1411 14.6984C11.5714 14.6912 11.9648 14.5588 12.2854 14.3452C12.3153 14.7451 12.4834 15.1396 12.8115 15.4575C13.1752 15.8102 13.6698 16.0155 14.2052 16.0404C13.8541 16.6424 13.9352 17.4004 14.4803 17.9291C14.8035 18.2419 15.2401 18.425 15.7133 18.4555C15.4041 19.0467 15.5023 19.7723 16.0281 20.2826C16.3104 20.5558 16.6805 20.7263 17.0845 20.7871L14.7156 22.737ZM27.6166 25.0714L26.1415 23.2149C25.4257 22.29 23.9319 22.0111 22.8485 22.7021C21.775 23.3665 21.5179 24.6778 22.2738 25.6281L23.751 27.4922C22.1817 27.5925 20.64 26.9559 19.7135 25.783C18.6703 24.4767 18.5991 22.7484 19.5316 21.3806C19.6065 21.2702 19.6011 21.1312 19.5177 21.0258L18.8666 20.2052L18.9883 20.1068C18.9904 20.1051 18.991 20.1028 18.993 20.101L21.2868 18.2134L22.1892 19.3559C22.2727 19.4613 22.4188 19.5133 22.562 19.4879C24.3236 19.1712 26.1336 19.8161 27.175 21.1248C28.1052 22.299 28.2436 23.7971 27.6166 25.0714Z" fill="#5B5C5D"/>
            </svg>`)
        } else {
            $($(".button-inventory")[0]).html(`<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M20.9376 17.6117C20.8641 17.6722 17.9801 20.0448 18.1625 19.8948L18.1611 19.896C18.1584 19.8979 18.1572 19.9012 18.1545 19.9032C17.7055 20.2722 16.9964 20.2584 16.5685 19.8421C16.1459 19.4333 16.1746 18.7935 16.6323 18.4165C16.7391 18.3286 19.487 16.0653 19.4127 16.1265C19.8534 15.7626 20.5671 15.7636 21.0013 16.1862C21.4239 16.5949 21.3953 17.2347 20.9376 17.6117ZM19.4296 13.8066L19.4306 13.8079C19.4378 13.8162 19.4453 13.8244 19.4532 13.8327C19.8758 14.2414 19.8471 14.8812 19.3894 15.2582C19.1681 15.4406 16.4397 17.688 16.6092 17.5483C16.1657 17.915 15.4535 17.9093 15.0204 17.4886C14.5978 17.0798 14.6268 16.44 15.0845 16.063L17.8646 13.773C18.3327 13.3865 19.0479 13.4417 19.4296 13.8066ZM17.7847 11.3611C18.2739 11.8352 18.2406 12.5759 17.7109 13.012C15.5282 14.8047 16.4683 14.0397 15.1919 15.0868C14.6713 15.5152 13.8517 15.5015 13.3501 15.017C12.8609 14.5429 12.8942 13.8022 13.4239 13.3661C13.6005 13.2207 15.3227 11.8034 15.9557 11.2826C16.4867 10.8567 17.2947 10.8872 17.7847 11.3611ZM15.863 8.64455C16.4249 9.19167 16.3848 10.0441 15.7713 10.5468C15.6494 10.6472 13.4629 12.4467 13.6025 12.3318C13.3455 12.5013 13.3974 12.5239 13.0462 12.6375C13.0269 12.5302 13.0033 12.4224 12.9594 12.3163L11.9921 9.99966C12.0678 9.93739 13.8487 8.47194 13.7361 8.56458C13.745 8.55736 13.7511 8.55347 13.7594 8.54689C14.3503 8.07423 15.2791 8.07817 15.863 8.64455ZM4.32256 6.3761C3.39718 5.20887 3.24212 3.70778 3.87992 2.42694L5.35861 4.28917C6.03821 5.14738 7.42631 5.52118 8.65726 4.79821C9.72449 4.13224 9.97859 2.82177 9.22345 1.8722L7.7437 0.00933754C9.39098 -0.0870758 10.8752 0.568731 11.7837 1.71734C12.819 3.01976 12.8928 4.75125 11.9717 6.1292C11.8983 6.23901 11.9043 6.37737 11.9871 6.48146L13.2523 8.07585L13.251 8.07696C13.2462 8.08085 13.2405 8.08335 13.2358 8.08727C13.1624 8.14776 11.5589 9.46793 11.6601 9.38462C11.1995 8.80249 10.4154 8.49866 9.64137 8.56521L9.31549 8.15202C9.2324 8.04666 9.087 7.99525 8.94519 8.01873C7.22613 8.32887 5.40458 7.73983 4.32256 6.3761ZM8.98638 26.4431L7.25271 27.8693C7.14456 27.9587 7.0074 27.9968 6.86487 28C6.72412 27.9949 6.59306 27.9397 6.49528 27.8445L0.137917 21.6821C0.0440879 21.5945 -0.00497274 21.479 0.000398718 21.3559C0.00577018 21.2315 0.0652185 21.1179 0.172299 21.0315L1.90059 19.6015C2.0048 19.5177 2.13767 19.4765 2.26981 19.4765C2.4145 19.4765 2.5581 19.526 2.66231 19.6225C10.2926 27.019 4.42076 21.3271 9.01359 25.7792C9.20626 25.9689 9.19409 26.2723 8.98638 26.4431ZM14.7156 22.737C12.8888 24.2347 11.1169 23.1754 9.06768 24.8537L9.05926 24.8608L3.58874 19.5578C4.35181 18.6079 4.7315 17.4506 4.65276 16.2623C4.58508 15.2728 4.57434 14.3982 4.61945 13.587C4.71041 11.8885 5.9112 10.3735 7.67745 9.72862C8.31168 9.50013 8.95845 9.33066 9.60092 9.2253C10.2803 9.11168 10.9654 9.44872 11.2218 10.0282C11.2515 10.0954 12.3022 12.6078 12.2714 12.541C12.5563 13.231 12.0081 14.0516 11.105 14.0516C11.1018 14.0516 11.0986 14.0516 11.095 14.0516C10.5933 14.0464 10.1097 13.7773 9.92717 13.3217C9.66467 12.7035 9.55151 11.933 9.58123 10.965C9.5866 10.7854 9.42688 10.6363 9.22454 10.6312C9.02113 10.6147 8.85353 10.7676 8.84779 10.9473C8.81557 12.0009 8.94413 12.8527 9.2385 13.5445C9.60561 14.463 11.6274 15.3415 10.9797 17.255C10.9217 17.427 11.0316 17.6079 11.2257 17.6593C11.4165 17.7111 11.6236 17.6154 11.6823 17.4416C11.9995 16.5049 11.8203 15.5997 11.1411 14.6984C11.5714 14.6912 11.9648 14.5588 12.2854 14.3452C12.3153 14.7451 12.4834 15.1396 12.8115 15.4575C13.1752 15.8102 13.6698 16.0155 14.2052 16.0404C13.8541 16.6424 13.9352 17.4004 14.4803 17.9291C14.8035 18.2419 15.2401 18.425 15.7133 18.4555C15.4041 19.0467 15.5023 19.7723 16.0281 20.2826C16.3104 20.5558 16.6805 20.7263 17.0845 20.7871L14.7156 22.737ZM27.6166 25.0714L26.1415 23.2149C25.4257 22.29 23.9319 22.0111 22.8485 22.7021C21.775 23.3665 21.5179 24.6778 22.2738 25.6281L23.751 27.4922C22.1817 27.5925 20.64 26.9559 19.7135 25.783C18.6703 24.4767 18.5991 22.7484 19.5316 21.3806C19.6065 21.2702 19.6011 21.1312 19.5177 21.0258L18.8666 20.2052L18.9883 20.1068C18.9904 20.1051 18.991 20.1028 18.993 20.101L21.2868 18.2134L22.1892 19.3559C22.2727 19.4613 22.4188 19.5133 22.562 19.4879C24.3236 19.1712 26.1336 19.8161 27.175 21.1248C28.1052 22.299 28.2436 23.7971 27.6166 25.0714Z" fill="#5B5C5D"/>
            </svg>`)
        }
    }

    if (data.other != undefined) {
        createInventory(data.other)
    }

    // if (inventorySettingsData == "type_3") {
    //     $($(".inventory-weight").get(1)).prependTo($($(".inventory-slot-inner").get(2)))
    // } 

    $("#inventories").append(`
    <div class="inventory-settings-section" style="display: none;">
        <div class="inventory-background-color">
            <span class="inventory-title">${Config.Language["change_background_color"]}</span>
            <input type="color" class="color-picker" id="color-picker-inventory" colortype="inventory" value="${rgb2hex(getItemColor("inventory"))}">
            <span class="color-text inventory-color">${rgb2hex(getItemColor("inventory"))}</span>
            <button class="reset-color" colortype="inventory" onclick="resetColor(this)"><i class="fa-solid fa-xmark"></i></button>
        </div>

        <div class="inventory-background-color">
            <span class="inventory-title">${Config.Language["change_health_color"]}</span>
            <input type="color" class="color-picker" id="color-picker-health" colortype="health" value="${rgb2hex(getItemColor("health"))}">
            <span class="color-text health-color">${rgb2hex(getItemColor("health"))}</span>
            <button class="reset-color" colortype="health" onclick="resetColor(this)"><i class="fa-solid fa-xmark"></i></button>
        </div>
        
        <div class="inventory-background-color">
            <span class="inventory-title">${Config.Language["change_armor_color"]}</span>
            <input type="color" class="color-picker" id="color-picker-armor" colortype="armor" value="${rgb2hex(getItemColor("armor"))}">
            <span class="color-text armor-color">${rgb2hex(getItemColor("armor"))}</span>
            <button class="reset-color" colortype="armor" onclick="resetColor(this)"><i class="fa-solid fa-xmark"></i></button>
        </div>

        <div class="inventory-background-color">
            <span class="inventory-title">${Config.Language["change_sounds"]}</span>
            <input type="checkbox" id="sound-checkbox" settingstype="sound" ${getSettingsData("sound") === "true" ? "checked" : ""} value="${getSettingsData("sound")}">
            <span class="color-text sound-settings">${Config.Language[getSettingsData("sound")]}</span>
            <button class="reset-color" settingstype="sound" onclick="resetSettings(this)"><i class="fa-solid fa-xmark"></i></button>
        </div>

        <div class="inventory-background-color">
            <span class="inventory-title">${Config.Language["inventory_design"]}</span>
            <select class="inventory-design" settingstype="inventory_design">
                <option class="option-select" value="default" ${inventorySettingsData === "default" ? "selected" : ""} >${Config.Language["default"]}</option>
                <option class="option-select" value="type_2" ${inventorySettingsData === "type_2" ? "selected" : ""} >${Config.Language["type_2"]}</option>
                <option class="option-select" value="type_3" ${inventorySettingsData === "type_3" ? "selected" : ""} >${Config.Language["type_3"]}</option>
            </select>
            <span class="color-text inventory_design-settings">${Config.Language[inventorySettingsData]}</span>
            <button class="reset-color" settingstype="inventory_design" onclick="resetSettings(this)"><i class="fa-solid fa-xmark"></i></button>
        </div>
        
    </div>
    ${
        Config.Clothing ? createClothingScreen() :  ""
    }
    `)

    $(".craft-popup").html(`<div class="inventory-crafting">
        <button id="close-crafting">x</button>
        <div class="crafting-status">
            <span class="crafting-status-1">${Config.Language["crafting_status"]}</span>
            <span class="crafting-status-2">0%/100%</span>
            <div class="crafting-status-bar">
                <div class="crafting-status-bar-current">
                </div>
            </div>
        </div>
        <div class="crafting-left-side">

        </div>
        <div class="crafting-right-side">

        </div>
        <button class="craft-button">${Config.Language["craft_item"]}</button>

        <div class="input-craft-main"> 
            <div class="input-craft-arrow" onclick="changeCraftableCount(-1)"><</div>
            <div class="input-craft-current">1</div>
            <div class="input-craft-arrow" onclick="changeCraftableCount(+1)">></div>
        </div>
    </div>`)

    $(".inventory-main-color").css("--inventory-color", getItemColor("inventory"))
    $(".health-bar-current").css("--health-color", getItemColor("health"))
    $(".armor-bar-current").css("--armor-color", getItemColor("armor"))

    setupItemsDraggable()

    createClothingSlotsMain()

    if (inventorySettingsData == "type_3") {
        CreateMAP("map-item")
    }

    if (inventorySettingsData == "type_2" && data.other && data.other.inventoryType == "crafting") {
        const $history = $(".crafting-history-list")
        $history.empty()
        const craftingHistoryItems = Object.values(data.chistory).sort((a, b) => b.craftedAt - a.craftedAt)
        for (i=0; i<8; i++) {
            if (craftingHistoryItems[i]) {
                const item = allItems[craftingHistoryItems[i].crafted]
                $history.append(`
                    <div class="crafting-item crafting-item-${inventorySettingsData}">
                        <img class="item-image" src="images/${getItemImage(item)}">
                        ${allItems[item.name] != undefined && allItems[item.name].rarity != undefined && Config.Rarity[allItems[item.name].rarity] != undefined && Config.Rarity[allItems[item.name].rarity].visibleOnRarity ? `<span class="item-rarity" style="background: ${Config.Rarity[allItems[item.name].rarity].background}; box-shadow: 
                        0 0 .6vh ${Config.Rarity[allItems[item.name].rarity].background},
                        0 0 1.2vh ${Config.Rarity[allItems[item.name].rarity].background},
                        0 0 1.8vh ${Config.Rarity[allItems[item.name].rarity].background}; ">${Config.Rarity[allItems[item.name].rarity].label}</span>` : ""}  
                    </div>`)
            } else {
                $history.append(`
                    <div class="crafting-item crafting-item-${inventorySettingsData}">
                        ${starSVG}
                    </div>`)
            }
        }
    }
}

const createClothingScreen = () => {
    return inventorySettingsData == "default" ? `<div class="inventory-clothing-section" style="display: none;">
        <div class="inventory-top">
            <div class="icon-main-user"><i class="${Config.InventoryIcons["clothing"]}"></i></div>
            <div class="inventory-label">${Config.Language["clothing_inventory"]}</div>
        </div>
        <div class="inventory-clothing-slots">
            ${createInventoryClothingSlots()}

        </div>`
        :
        inventorySettingsData == "type_2" ? 
        `
        <div class="inventory-clothing-section clothing-section-${inventorySettingsData}" style="display: none;">
            <div class="clothing-main-inner">
                <div class="clothing-section-top">
                    <div class="top-svg-parent">
                        <div class="top-svg"></div>
                    </div>

                    <span class="clothing-label">${Config.Language["clothing_inventory"]}</span>

                    <div class="top-section-parent-cloth">
                        <div class="top-section-inner-cloth left-top-cut selected-cut" style="--selected-cut: #9E7BFF">
                            ${clothingSVG}
                        </div>
                        <div class="top-section-inner-cloth right-top-cut" style="--selected-cut: #5A5A5A">
                            ${clothingSVG}
                        </div>
                    </div>
                </div>
                <div class="clothing-section-bottom">
                    <div class="bottom-svg-parent">
                        <div class="bottom-svg"></div>
                    </div>

                    <div class="bottom-section-parent-cloth">
                        <div class="bottom-section-inner-cloth left-bottom-cut" style="--selected-cut: #5A5A5A">
                            ${clothingSVG}
                        </div>
                        <div class="bottom-section-inner-cloth right-bottom-cut" style="--selected-cut: #5A5A5A">
                            ${clothingSVG}
                        </div>
                    </div>
                </div>
                
                <div class="clothing-slots-main clothing-slot-left-top-cut clothing-is-active">
                    <div class="inventory-clothing-slots">
                        ${createInventoryClothingSlots("-left-top-cut")}
                    </div>
                </div>

                <div class="clothing-slots-main clothing-slot-right-top-cut">
                    <div class="inventory-clothing-slots">
                        ${createInventoryClothingSlots("-right-top-cut")}
                    </div>
                </div>

                <div class="clothing-slots-main clothing-slot-left-bottom-cut">
                    <div class="inventory-clothing-slots">
                        ${createInventoryClothingSlots("-left-bottom-cut")}
                    </div>
                </div>

                <div class="clothing-slots-main clothing-slot-right-bottom-cut">
                    <div class="inventory-clothing-slots">
                        ${createInventoryClothingSlots("-right-bottom-cut")}
                    </div>
                </div>

        </div>`
        :
        `
        <div class="inventory-clothing-section clothing-section-${inventorySettingsData}" style="display: none;">
            <div class="clothing-main-inner">
                <div class="draw-parent">
                    <div class="section-top-draw"></div>
                </div>
                                    
                <div class="inventory-clothing-slots">
                    ${createInventoryClothingSlots()}
                </div>

        </div>`
}

const createInventoryClothingSlots = (customSlotID = "") => {
    return `
        <div class="inventory-slot" slotid="clothing-1${customSlotID}" slotclothing="hat" inventoryid="${mainInventoryID}" is-occupied="false">
            ${createClothingSlot("hat")}
        </div>
        <div class="inventory-slot" slotid="clothing-2${customSlotID}" slotclothing="mask" inventoryid="${mainInventoryID}" is-occupied="false">
            ${createClothingSlot("mask")}
        </div>
        <div class="inventory-slot" slotid="clothing-3${customSlotID}" slotclothing="ear" inventoryid="${mainInventoryID}" is-occupied="false">
            ${createClothingSlot("ear")}
        </div>

        <div class="inventory-slot" slotid="clothing-4${customSlotID}" slotclothing="top" inventoryid="${mainInventoryID}" is-occupied="false">
            ${createClothingSlot("top")}
        </div>
        <div class="inventory-slot" slotid="clothing-5${customSlotID}" slotclothing="glasses" inventoryid="${mainInventoryID}" is-occupied="false">
            ${createClothingSlot("glasses")}
        </div>

        <div class="inventory-slot" slotid="clothing-6${customSlotID}" slotclothing="bag" inventoryid="${mainInventoryID}" is-occupied="false">
            ${createClothingSlot("bag")}
        </div>
        <div class="inventory-slot" slotid="clothing-7${customSlotID}" slotclothing="watch" inventoryid="${mainInventoryID}" is-occupied="false">
            ${createClothingSlot("watch")}
        </div>
        <div class="inventory-slot" slotid="clothing-8${customSlotID}" slotclothing="gloves" inventoryid="${mainInventoryID}" is-occupied="false">
            ${createClothingSlot("gloves")}
        </div>


        <div class="inventory-slot" slotid="clothing-9${customSlotID}" slotclothing="pants" inventoryid="${mainInventoryID}" is-occupied="false">
            ${createClothingSlot("pants")}
        </div>
        <div class="inventory-slot" slotid="clothing-10${customSlotID}" slotclothing="bracelet" inventoryid="${mainInventoryID}" is-occupied="false">
            ${createClothingSlot("bracelet")}
        </div>
        <div class="inventory-slot" slotid="clothing-11${customSlotID}" slotclothing="armor" inventoryid="${mainInventoryID}" is-occupied="false">
            ${createClothingSlot("armor")}
        </div>

        <div class="inventory-slot" slotid="clothing-12${customSlotID}" slotclothing="shoes" inventoryid="${mainInventoryID}" is-occupied="false">
            ${createClothingSlot("shoes")}
        </div>
    `
}

$(document).on("click", ".bottom-section-parent-cloth > div, .top-section-parent-cloth > div", (e) => {
    const $e = $(e.currentTarget)
    const clothingSlot = $e.get(0).classList[1]
    if ( !$e.hasClass("selected-cut") ) {
        const selectedSlot = $(".selected-cut").get(0).classList[1]

        $(".selected-cut").css("--selected-cut", "#5A5A5A").removeClass("selected-cut")
        $(`.clothing-slot-${selectedSlot}`).removeClass("clothing-is-active")
        $(`.clothing-slot-${clothingSlot}`).addClass("clothing-is-active")
        $e.css("--selected-cut", "#9E7BFF").addClass("selected-cut")
    }

    getSetClothingSlots(Inventory[mainInventoryID].inventoryItems)
})

const createClothingSlotsMain = () => {
    if (inventorySettingsData == "default" || inventorySettingsData == "type_3") {
        $.each(Config.InventoryClothings, function(key, value) {
            const $e = $(".inventory-clothing-slots").find(`[slotclothing="${value}"]`)
            let item = Object.values(Inventory[mainInventoryID].inventoryItems).find(x => x.slot == $e.attr("slotid"))
    
            if (item != undefined) {
                $e.html(createItem(item, mainInventoryID))
                $e.children().data("dataItem", item)
            }
        })
    
    } else {
        $.each(Inventory[mainInventoryID].inventoryItems, function(key, value) {
            if ( value.slot && (value.slot).toString().includes("clothing-")) {
                const $e = $(".inventory-clothing-slots").find(`[slotid="${value.slot}"]`)

                if (value != undefined && $e != undefined) {
                    $e.html(createItem(value, mainInventoryID))
                    $e.children().data("dataItem", value)
                }
            }
        })
    
    }

    setupItemsDraggable()
    init_iconsax()
}

const setArmorAndHealth = (armor, healt) => {
    if ( inventorySettingsData == "default" ) {
        $(".armor-bar-current").css("height", armor+"%")
        $(".health-bar-current").css("height", healt+"%")
    } else {
        $(".armor-bar-current").css("width", armor+"%")
        $(".health-bar-current").css("width", healt+"%")
    }
}

const findCorrectClothingSlot = (item) => {
    if (inventorySettingsData == "default" || inventorySettingsData == "type_3") {
        if (item.slot.includes("left-top-cut") || item.slot.includes("right-top-cut") || item.slot.includes("left-bottom-cut") || item.slot.includes("right-bottom-cut"))
            return false;
        else
            return true;
    }

    const $e = $(".inventory-clothing-slots").find(`[slotid="${item.slot}"]`)
    const isActive = $($e.parent().parent()[0]).hasClass("clothing-is-active") || false
    
    return isActive
}

const getSetClothingSlots = (items) => {
    let clothings = {}
    $.each(Config.InventoryClothings, function(key, value) {
        let item = Object.values(Object.entries(items).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})).find(x => (x.slot).toString().includes("clothing-") && getClothingName(x.name, value) && findCorrectClothingSlot(x) );

        if (item != undefined && item.info != undefined) {
            clothings[value] = {
                item: value,
                data: item.info
            }
        } else {
            clothings[value] = {
                item: value,
                data: false
            } 
        }
    })

    $.post("https://inventory/SetClothings", JSON.stringify({ data: clothings }))
}

let warningElement
const warningAcceptedSettings = () => {
    saveSettingsData($(warningElement.target).val(), $(warningElement.currentTarget).attr("settingstype"))
    $("."+$(warningElement.currentTarget).attr("settingstype")+"-settings").html(Config.Language[$(warningElement.target).val()])

    $("#warning-to-change").hide()

    closeInventory()
    setTimeout(() => {
        location.reload()
    }, 250)
    
}

const warningCancelled = () => {
    $("#warning-to-change").hide()

    $(".inventory-design").find(`[value="${inventorySettingsData}"]`).prop("selected", true)
}

$(document).on("change", ".inventory-design", (event2) => {
    warningElement = event2
    $("#warning-to-change").show().html(`
        <div class="warning-popup">
            <h1>${Config.Language["warning"]}</h1>
            <p>${Config.Language["inventory_design_warning"]}</p>
            <div class="warning-popup-buttons">
                <button class="warning-popup-button" onclick="warningAcceptedSettings()">${Config.Language["accept"]}</button>
                <button class="warning-popup-button" onclick="warningCancelled()">${Config.Language["cancel"]}</button>
            </div>
        </div>
    `)
    return false;
})

$(document).on("change","#sound-checkbox", (event) => {
    saveSettingsData($(event.target).prop("checked"), $(event.currentTarget).attr("settingstype"))
    $("."+$(event.currentTarget).attr("settingstype")+"-settings").html(Config.Language[$(event.target).prop("checked").toString()])
})

const resetSettings = (e) => {
    const type = $(e).attr("settingstype")

    if (type == "sound") {
        $("."+type+"-settings").html(Config.Language[defaultSettings[type]])
        $("#sound-checkbox").prop("checked", defaultSettings[type])
    }
    else if (type == "inventory_design") {
        $("."+type+"-settings").html(Config.Language[defaultSettings[type]])
        $(".inventory-design").val(defaultSettings[type])
    }
    
    localStorage.setItem(type+"-settings", defaultSettings[type])
}

const saveSettingsData = (changeTo, type) => { 
    localStorage.setItem(type+"-settings", changeTo)
}

const getClothingName = (name, value) => {
    if (name == value && allItems[name].clothingSlot == undefined)
        return true;
    else if (allItems[name] && allItems[name].clothingSlot == value)
        return true;

    return false;
}

const createClothingSlot = (type, isEmpty = true) => {
    if (type == undefined)
        return false;

    if (isEmpty) {
        return `<div class="clothing-item">
            <img class="clothing-image" src="images/${type}.png">
        </div>`
    }
    else
        return `<div class="clothing-item">
            <img class="clothing-image" src="images/${type}.png">
        </div>`
}

const defaultColor = {
    "inventory": "rgb(25, 38, 49, .57)",
    "health": "rgb(175, 22, 55)",
    "armor": "rgb(9, 133, 228)",
}

const resetColor = (e) => {
    const type = $(e).attr("colortype")

    if (type == "inventory") {
        $(".inventory-main-color").css("--inventory-color", defaultColor[type])
    } else if (type == "armor") {
        $(".armor-bar-current").css("--armor-color", defaultColor[type])
    } else if (type == "health") {
        $(".health-bar-current").css("--health-color", defaultColor[type])
    }
    

    $(`.${type}-color`).html(rgb2hex(defaultColor[type]))
    localStorage.setItem(type+"-color", defaultColor[type])
    $("#color-picker-"+type).val(rgb2hex(defaultColor[type]))
}

$(document).on("change",".color-picker", (event) => {
    changeColor(event.target.value, $(event.currentTarget).attr("colortype"))
    saveColor(event.target.value, $(event.currentTarget).attr("colortype"))
})

$(document).on("input",".color-picker", (event) => {
    changeColor(event.target.value,$(event.currentTarget).attr("colortype") )
})

const getItemColor = (type) => { 
    return localStorage.getItem(type+'-color') || defaultColor[type]; 
}
const saveColor = (color,type) => { 
    color = hexToRgb(color, 0.57); 
    localStorage.setItem(type+"-color", `rgb(${color["r"]}, ${color["g"]}, ${color["b"]}, ${color["a"]})`)
}

const changeColor = (color, type) => {
    color = hexToRgb(color, 0.57)

    if (type == "inventory") {
        $(".inventory-main-color").css("--inventory-color", `rgb(${color["r"]}, ${color["g"]}, ${color["b"]}, ${color["a"]})`)
    } else if (type == "armor") {
        $(".armor-bar-current").css("--armor-color", `rgb(${color["r"]}, ${color["g"]}, ${color["b"]}, ${color["a"]})`)
    } else if (type == "health") {
        $(".health-bar-current").css("--health-color", `rgb(${color["r"]}, ${color["g"]}, ${color["b"]}, ${color["a"]})`)
    }

    $(`.${type}-color`).html(rgb2hex(`rgb(${color["r"]}, ${color["g"]}, ${color["b"]}, ${color["a"]})`))   
}


const closeInventory = () => {
    $(".inventory-visible").hide()
    $("#split-item").hide()
    $("#context-menu").remove()
    $('#item-tooltip').hide()
    $(".item").removeClass("non-hover").removeClass("hover-item")
    $.post("https://inventory/closeInventory")
    isHidden = false

    MainRender.stop()

    if (inventorySettingsData == "type_3")
        MAP.removeLayer(playerMarker);

    posIsSet = false
    $(".ah-bars").appendTo($(".inventory-visible"))

    closeCrafting()

    AudioPlay("sounds/Other_Sound_02.mp3", .2, true)
}

const updateInventory = (data) => {
    const $fromInventoryMain = $('#inventories').find(`[invid=${data.fromId}]`),
            $toInventoryMain = $('#inventories').find(`[invid=${data.toId}]`);

    let anyChanges = false;

    
    // $.each(data.fromInventory, function(key, value) {
    //     if (value != null)
    //         data.fromInventory[value.slot] = value
    // })
    if ($fromInventoryMain.length && data.fromId != data.toId && (Inventory[data.fromId].inventoryType != "shop" && Inventory[data.fromId].inventoryType != "crafting") ) {
        Inventory[data.fromId].inventoryItems = Object.entries(data.fromInventory).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})
        const fromMainInventory = Inventory[data.fromId] 
        
        $fromInventoryMain.find(".inventory-slots").html( createInventoryInner(fromMainInventory) )
        $fromInventoryMain.find(".inventory-weight").remove()
        $fromInventoryMain.find(".inventory-top").append(calculateInventoryWeight(fromMainInventory.inventoryItems, fromMainInventory.inventoryWeight))

        Object.values(fromMainInventory.inventoryItems).forEach((item) => {
            $(`#item-${fromMainInventory.inventoryId}-${item.slot}`).data("dataItem", item)
        })

        anyChanges = true
    }

    if ($toInventoryMain.length) {
        Inventory[data.toId].inventoryItems = Object.entries(data.toInventory).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {}) 
        const toMainInventory = Inventory[data.toId] 

        $toInventoryMain.find(".inventory-slots").html( createInventoryInner(toMainInventory) )
        $toInventoryMain.find(".inventory-weight").remove()
        $toInventoryMain.find(".inventory-top").append(calculateInventoryWeight(toMainInventory.inventoryItems, toMainInventory.inventoryWeight))

        Object.values(toMainInventory.inventoryItems).forEach((item) => {
            $(`#item-${toMainInventory.inventoryId}-${item.slot}`).data("dataItem", item)
        })

        anyChanges = true;
    }

    if (anyChanges) {
        setupItemsDraggable()
        init_iconsax()
    }
    
}

const itemBox = (data) => {
    var type = "Used";
    if (data.type == "add") {
        type = Config.Language["add"];
    } else if (data.type == "remove") {
        type = Config.Language["remove"];
        AudioPlay("sounds/Other_Sound_01.mp3", .3, true)
    } else if (data.type == "use") {
        type = Config.Language["used"];
        AudioPlay("sounds/Other_Sound_00.mp3", .3, true)
    }

    const $itembox = $(".itembox-container.template").clone();
    $itembox.removeClass("template").html(`
        <div class="itembox-action">
        ${type}
        </div>

        <div class="itembox-label">
            ${data.item.label}
        </div>

        <div class="itembox-img">
            <img src="images/${getItemImage(data.item)}" alt="${data.item.name}"/>
        </div>
    `).css(`background`, `linear-gradient(0deg, ${data.item.color} 0%, rgba(255,255,255,0.03) 60%)`)
    $(".itemboxes-container").append($itembox);
    $itembox.css({'display':'block', 'top': '100%'}).animate({
        top: 0+"%",
    }, 350);
    setTimeout(function() {
        $itembox.css({'display':'block'}).animate({
            top: -100+"%",
        }, 150, function(){
            $itembox.remove();
        });
    }, 3000);
}

let posIsSet = false
let playerMarker;

$(document).ready(() => {
    window.addEventListener("message", (event) => {
        switch (event.data.action) {
            case "open":
                AudioPlay("sounds/Other_Sound_02.mp3", .2, true)
                inventorySetup(event.data)
                break;
            case "close":
                closeInventory()
                break;
            case "update":
                updateInventory(event.data);
                break;
            case "itemBox":
                itemBox(event.data);
                break;
            case "updatestatus":
                setArmorAndHealth(event.data.armor, event.data.health)

                if (inventorySettingsData == "type_3") {
                    if (!posIsSet) {
                        posIsSet = true
                        MAP.setView([event.data.coords.y, event.data.coords.x])
                    }

                    if(playerMarker)
                        MAP.removeLayer(playerMarker);
            
                    playerMarker = L.marker([event.data.coords.y, event.data.coords.x], { icon: L.divIcon({
                            html: `<div class="dot-circle"></div> <div class="make-center"><div class="map-icon-heading" style="transform: scaleY(-1) rotate(${event.data.heading}deg)"></div></div>`,
                            iconSize: [20, 20],
                            className: 'map-icon map-icon-ping icon-map-location',
                            offset: [-10, 0]
                        })
                    })
                    playerMarker.bindTooltip(`<div class="map-tooltip-info">${Config.Language["you"]}</div>`,
                        {
                            direction: 'top',
                            permanent: false,
                            offset: [0, -10],
                            opacity: 1,
                            interactive: false,
                            className: 'map-tooltip'
                    });
                    playerMarker.addTo(MAP);
                }
                break;
            case "getClothing":
                allItems = event.data.allitems
                getSetClothingSlots(event.data.items)
                break;
        }
    });

    $(document).on('keydown', (e) => {
        switch(e.keyCode) {
            case 27:
                closeInventory()
        }
    });
})

const getItemImage = function(item) {
    if (item.image != undefined)
        return item.image
    else
        return item.name+".png"
}

$(document). bind("contextmenu", function(e) { return false; });
$(document). bind("tab", function(e) { return false; });

let isAudioPlaying = false;
AudioPlay = (name, volume = 1, bypass = false) => {
    if (isAudioPlaying && !bypass)
        return false;

    if (getSettingsData("sound") == "false")
        return false;

    isAudioPlaying = true

    var sound = new Audio(name);
    sound.volume = volume;
    sound.play();
    sound.addEventListener('ended', () => {
        isAudioPlaying = false
    });

    return sound;
}

const checkInventoryNumberControl = (amount) => {
    if (!$("#inventory-number").length)
        return true

    const inventoryNumber = $("#inventory-number").val()

    if (inventoryNumber < 1)
        return true
    else if(inventoryNumber == amount)
        return true

    return false
}

let isDebug = false
if (isDebug) {
    console.info("Debug is active")

    $("body").css({"background-size": "100%","background-image": 'url("./svg/bgdebug.png")'})

    inventorySetup({
        items: {
            "sandwich": {
                name: "sandwich",
                label: "Sandwich",
                slot: 1,
                amount: 10,
                count: 10,
                info: {},
                weight: 50,
                description: "A tasty sandwich",
                color: "linear-gradient(226deg, rgba(0, 0, 0, 0.00) 0%, #FF3939 100%)"
            },
            "weapon_pistol": {
                name: "weapon_pistol",
                label: "Weapon Pistol",
                slot: 1,
                amount: 10,
                count: 10,
                info: {},
                weight: 5000,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel lacus et metus accumsan pharetra et sodales enim. Aliquam lacinia, lorem in consectetur feugiat, est tortor interdum purus, vitae pretium turpis metus accumsan dolor. Proin consequat odio luctus vestibulum hendrerit.",
                color: "rgb(255, 204, 0, 0.4)",
                rarity: 4
            },
            "drill": {
                name: "drill",
                label: "Drill",
                slot: 1,
                amount: 10,
                count: 10,
                info: {},
                weight: 50,
                description: "A tasty sandwich",
                color: "linear-gradient(225deg, rgba(0, 0, 0, 0.00) 0%, #3E3E3E 100%)"
            },
            "whiskey": {
                name: "whiskey",
                label: "Whiskey",
                slot: 1,
                amount: 10,
                count: 10,
                info: {},
                weight: 50,
                description: "A tasty sandwich",
                color: "rgba(255,255,255, .4)"
            },
            "weed_brick": {
                name: "weed_brick",
                label: "Weed",
                slot: 1,
                amount: 10,
                count: 10,
                info: {},
                weight: 50,
                description: "A tasty sandwich",
                color: "rgba(255,255,255, .4)"
            },
            "shoes": {
                name: "shoes",
                label: "Shoes",
                slot: 1,
                amount: 10,
                count: 10,
                info: {},
                weight: 50,
                description: "A tasty sandwich",
                color: "rgba(255,255,255, .4)"
            }
        },
        inventory: {
            inventoryId: "Debug",
            inventoryLabel: "Player Inventory",
            inventoryType: "player",
            inventorySize: 50,
            inventoryWeight: 900,
            inventoryItems: {
                1: {
                    name: "sandwich",
                    label: "Sandwich",
                    slot: 1,
                    amount: 10,
                    count: 10,
                    info: {},
                    weight: 50,
                    description: "A tasty sandwich",
                    color: "linear-gradient(225deg, rgba(0, 0, 0, 0.00) 0%, #FF3939 100%);"
                },
                2: {
                    name: "weapon_pistol",
                    label: "Weapon Pistol",
                    slot: 2,
                    amount: 10,
                    count: 10,
                    // {"description":"A rapid-fire, magazine-fed automatic rifle designed for infantry use","info":{"serie":"56zWy1yk255ctyn","quality":100,"ammo":59,"attachments":[{"component":"COMPONENT_AT_AR_SUPP_02","item":"rifle_suppressor","image":"pistol_suppressor.png","label":"Rifle Suppressor"}]},"label":"Assault Rifle","color":"rgb(255, 204, 0, 0.4)","useable":false,"unique":true,"name":"weapon_assaultrifle","weight":1000,"image":"weapon_assaultrifle.png","slot":4,"count":1,"amount":1,"type":"weapon"}
                    info: { 
                        quality: 67,
                        attachments: [
                            {
                                component: "COMPONENT_AT_AR_SUPP_02",
                                item: "rifle_suppressor",
                                image: "pistol_suppressor.png",
                                label: "Rifle Suppressor"
                            },
                            {
                                component: "COMPONENT_AT_AR_SUPP_02",
                                item: "rifle_scope",
                                image: "smg_scope.png",
                                label: "Rifle Scope"
                            }
                        ]
                     },
                    weight: 50000,
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel lacus et metus accumsan pharetra et sodales enim. Aliquam lacinia, lorem in consectetur feugiat, est tortor interdum purus, vitae pretium turpis metus accumsan dolor. Proin consequat odio luctus vestibulum hendrerit.",
                    color: "linear-gradient(225deg, rgba(0, 0, 0, 0.00) 0%, #5CBBFF 100%)"
                },
                3: {
                    name: "drill",
                    label: "Drill",
                    slot: 6,
                    amount: 1000,
                    count: 1000,
                    info: { },
                    weight: 5,
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel lacus et metus accumsan pharetra et sodales enim. Aliquam lacinia, lorem in consectetur feugiat, est tortor interdum purus, vitae pretium turpis metus accumsan dolor. Proin consequat odio luctus vestibulum hendrerit.",
                    color: "linear-gradient(225deg, rgba(0, 0, 0, 0.00) 0%, #3E3E3E 100%)"
                },
                4: {
                    name: "whiskey",
                    label: "Whiskey",
                    slot: 7,
                    amount: 1000,
                    count: 1000,
                    info: { },
                    weight: 5,
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel lacus et metus accumsan pharetra et sodales enim. Aliquam lacinia, lorem in consectetur feugiat, est tortor interdum purus, vitae pretium turpis metus accumsan dolor. Proin consequat odio luctus vestibulum hendrerit.",
                    color: "linear-gradient(225deg, rgba(0, 0, 0, 0.00) 0%, #39C4FF 100%)"
                },
                
                "clothing-12-right-bottom-cut": {
                    name: "shoes",
                    label: "Shoes",
                    slot: "clothing-12-right-bottom-cut",
                    amount: 1,
                    count: 1,
                    info: {},
                    weight: 50,
                    description: "A tasty sandwich",
                    color: "linear-gradient(225deg, rgba(0, 0, 0, 0.00) 0%, #FF3939 100%);",
                },

                "clothing-12-left-top-cut": {
                    name: "shoes",
                    label: "Shoes",
                    slot: "clothing-12-left-top-cut",
                    amount: 1,
                    count: 1,
                    info: {},
                    weight: 50,
                    description: "A tasty sandwich",
                    color: "linear-gradient(225deg, rgba(0, 0, 0, 0.00) 0%, #FF3939 100%);",
                }
            }
        },
        other: {
            inventoryId: "crafting",
            inventoryLabel: "Second Inventory",
            inventoryType: "shop",
            inventorySize: 10,
            inventoryWeight: 900,
            inventoryItems: {
                1: {
                    name: "sandwich",
                    label: "Sandwich",
                    slot: 1,
                    amount: 10,
                    count: 10,
                    info: {},
                    weight: 50000,
                    description: "A tasty sandwich",
                    color: "linear-gradient(225deg, rgba(0, 0, 0, 0.00) 0%, #FF3939 100%);",
                    price: 48000,
                    costs: {
                        drill: 21,
                        whiskey: 18,
                        weed_brick: 12,
                        sandwich: 12,
                    }
                },
                2: {
                    name: "sandwich",
                    label: "Sandwich",
                    slot: 2,
                    amount: 10,
                    count: 10,
                    info: {},
                    weight: 50000,
                    description: "A tasty sandwich",
                    color: "linear-gradient(225deg, rgba(0, 0, 0, 0.00) 0%, #FF3939 100%);",
                    price: 48000,
                    costs: {
                        drill: 21,
                        whiskey: 18
                    }
                },
                3: {
                    name: "weapon_pistol",
                    label: "Weapon Pistol",
                    slot: 3,
                    amount: 10,
                    count: 10,
                    // {"description":"A rapid-fire, magazine-fed automatic rifle designed for infantry use","info":{"serie":"56zWy1yk255ctyn","quality":100,"ammo":59,"attachments":[{"component":"COMPONENT_AT_AR_SUPP_02","item":"rifle_suppressor","image":"pistol_suppressor.png","label":"Rifle Suppressor"}]},"label":"Assault Rifle","color":"rgb(255, 204, 0, 0.4)","useable":false,"unique":true,"name":"weapon_assaultrifle","weight":1000,"image":"weapon_assaultrifle.png","slot":4,"count":1,"amount":1,"type":"weapon"}
                    info: { 
                        quality: 67,
                        attachments: [
                            {
                                component: "COMPONENT_AT_AR_SUPP_02",
                                item: "rifle_suppressor",
                                image: "pistol_suppressor.png",
                                label: "Rifle Suppressor"
                            },
                            {
                                component: "COMPONENT_AT_AR_SUPP_02",
                                item: "rifle_scope",
                                image: "smg_scope.png",
                                label: "Rifle Scope"
                            }
                        ]
                     },
                     price: 5000,
                    weight: 50,
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel lacus et metus accumsan pharetra et sodales enim. Aliquam lacinia, lorem in consectetur feugiat, est tortor interdum purus, vitae pretium turpis metus accumsan dolor. Proin consequat odio luctus vestibulum hendrerit.",
                    color: "linear-gradient(225deg, rgba(0, 0, 0, 0.00) 0%, #5CBBFF 100%)",
                    type: "weapon"
                }
            }
        }
    })

    // setArmorAndHealth(28, 89)

    // changeClothingStatus()
    // isHidden = !isHidden 
}

$(document).ready(() => {
    $('#split-range').on('input', () => {
        var value = (this.value-this.min)/(this.max-this.min)*100
        $(this).css("background", 'linear-gradient(to right, rgb(60,64,79) 0%, rgb(60,64,79) ' + value + '%, #fff ' + value + '%, white 100%)')
    });

    $(document).on("click", ".craft-button", () => {
        const craftItem = $(".crafting-left-side").data("craftingItem")
        if (craftItem == null)
            return false;

        const craftableAmount = parseInt($(".input-craft-current").html())
        let isHave = FindItemsByNameAmount(craftItem.costs, craftableAmount, mainInventoryID)
        
        if (isDebug)
            isHave = true
        
        if (isHave) {
            startCraftingTimer()
            $.post("https://inventory/CraftItem", JSON.stringify({ item: craftItem, amount: craftableAmount }))
        }
        else
            return false;
    })

    $(document).on("click", ".auto-button", () => {
        const craftItem = $(".crafting-left-side").data("craftingItem")
        if (craftItem == null)
            return false;
        
        const inventory = Object.values(Inventory).filter(x => x.inventoryId == mainInventoryID)[0]
        let maxCraftableAmount = Infinity;

        $.each(craftItem.costs, function(key, value) {
            var keyItem = Object.values(inventory.inventoryItems).find(x => x.name == key);
            if (keyItem) {
                const requiredAmount = Math.floor(keyItem.amount / value);
                maxCraftableAmount = Math.min(maxCraftableAmount, requiredAmount);
            } else {
                maxCraftableAmount = 0;
                return false; // stop the loop if any required item is not found
            }
        });

        if ( maxCraftableAmount > 0 ) {
            maxCraftableAmount = maxCraftableAmount > craftItem.amount ? craftItem.amount : maxCraftableAmount;
            $(".input-craft-current").html( maxCraftableAmount )
        }
    })

    $(document).on("click", ".crafting-cancel", () => {
        const craftItem = $(".crafting-left-side").data("craftingItem")
        if (craftItem == null)
            return false;
        
        $(".input-craft-current").html( 1 )
        $(".crafting-item-desc").html(Config.Language["select_to_craft"])
        $(".crafting-item-name").html(Config.Language["waiting_craft_item"])
        $(".crafting-left-side").data("craftingItem", null).find(".crafting-item").html(starSVG).removeAttr("style")
        $(".crafting-requirements").html(`
            <div class="crafting-item crafting-item-${inventorySettingsData}">
                ${starSVG}
            </div>
            <div class="crafting-item crafting-item-${inventorySettingsData}">
                ${starSVG}
            </div>
            <div class="crafting-item crafting-item-${inventorySettingsData}">
                ${starSVG}
            </div>
            <div class="crafting-item crafting-item-${inventorySettingsData}">
                ${starSVG}
            </div>
        `)

    })

    $(document).on("click", "#close-crafting",  () => {
        closeCrafting()
    })
});

let timerCount = 0;
const startCraftingTimer = () => {
    $(".crafting-status").show()
    $(".crafting-status-bar-current").css("width", `0%`)
    timerCount = 0;
    let timerInterval = setInterval(() => {
        timerCount += 1

        $(".crafting-status-2").html(`${timerCount}/100%`)
        $(".crafting-status-bar-current").css("width", `${timerCount}%`)

        if (timerCount >= 100) {
            clearInterval(timerInterval)
            closeCrafting()
        }
    }, 20)
}

closeCrafting = () => {
    $(".inventory-crafting").removeClass("transform-scale")
    $(".inventory-crafting").addClass("transform-scale-reverse")

    setTimeout(() => {
        $(".craft-popup").hide() 
    }, 150)
    $(".crafting-status").hide()
}
