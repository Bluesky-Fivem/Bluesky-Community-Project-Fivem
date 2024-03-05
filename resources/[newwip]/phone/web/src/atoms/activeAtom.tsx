import { atom } from "recoil";

export const hasBurnerState = atom({
    key: 'hasBurnerState',
    default: false,
})

export const filteredContactsState = atom({
    key: 'filteredContactsState',
    default: [],
})

export const activeHoverIdState = atom({
    key: 'activeHoverIdState',
    default: '',
})

export const purchaseModalState = atom({
    key: 'purchaseModalState',
    default: false,
})

export const exchangeModalState = atom({
    key: 'exchangeModalState',
    default: false,
})

export const cryptoIdState = atom({
    key: 'cryptoIdState',
    default: 1,
})

export const sellModalState = atom({
    key: 'sellModalState',
    default: false,
})

export const sellStateIdState = atom({
    key: 'sellStateIdState',
    default: 0,
})

export const sellPriceState = atom({
    key: 'sellPriceState',
    default: 0,
})

export const sellPlateState = atom({
    key: 'sellPlateState',
    default: "",
})

export const hasVPNState = atom({
    key: 'hasVPNState',
    default: false,
})

export const cidState = atom({
    key: 'cidState',
    default: 0,
})

export const callsDataState = atom({
    key: 'callsDataState',
    default: [],
})

export const filteredCallsDataState = atom({
    key: 'filteredCallsDataState',
    default: [],
})

export const editModeState = atom({
    key: 'editModeState',
    default: false,
})

export const editDataState = atom({
    key: 'editDataState',
    default: {},
})

export const phoneBrandState = atom({
    key: 'phoneBrandState',
    default: "android",
})

export const phoneBackgroundState = atom({
    key: 'phoneBackgroundState',
    default: "https://i.imgur.com/3KTfLIV.jpg",
})

export const phoneReceiveSMSState = atom({
    key: 'phoneReceiveSMSState',
    default: true,
})

export const phoneNewTweetState = atom({
    key: 'phoneNewTweetState',
    default: true,
})

export const phoneReceiveEmailState = atom({
    key: 'phoneReceiveEmailState',
    default: true,
})

export const phoneEmbeddedImagesState = atom({
    key: 'phoneEmbeddedImagesState',
    default: true,
})