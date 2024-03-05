interface HeistGroup {
    id: number;
    leader: HeistLeader;
    members: HeistMember[];
    heistActive: boolean;
    data: any;
}

interface HeistLeader {
    src: number;
    cid: number;
}

interface HeistMember {
    src: number;
    cid: number;
    name: string;
}