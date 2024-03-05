interface CryptoProps {
    id: number,
    icon: string,
    name: string,
    amount: number,
    tag: string,
    value: number,
    buyable: boolean,
    exchangeable: boolean,
    sellable: boolean
}

interface RacingProps {
    id: string,
    name: string,
    lapText: string,
    distText: string,
    players: any[],
    cid: number,
    data: any,
    type: string
}

interface PendingProps {
    id: string,
    name: string,
    lapText: string,
    distText: string,
    players: any[],
    cid: number,
    data: any
}

interface VehicleProps {
    vin: string,
    plate: string,
    model: string,
    state: string,
    garage: string,
    type: string,
    spawnable: boolean,
    location: any,
    damage: any
}

interface ChatImageProps {
    message: any,
    sender: string,
    clientNumber: string
}

interface TwitterImageProps {
    sender: any,
    message: any,
    date: any
}

interface SportsbookProps {
    id: string
    icon: string,
    name: string,
    description: string,
    fighters?: any
}