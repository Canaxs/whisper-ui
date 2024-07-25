export enum Menus {
    "spor",
    "teknoloji",
    "politika",
    "finans",
    "gundem",
    "dunya",
    "magazin",
    __LENGTH
}

export enum MenusTR {
    "spor",
    "teknoloji",
    "politika",
    "finans",
    "gündem",
    "dünya",
    "magazin",
    __LENGTH
}

export function convertMenus(enumMenu: string) {
    switch(enumMenu) {
        case "spor":
            return "SPORT"
            break;
        case "teknoloji":
            return "TECHNOLOGY"
            break;
        case "politika":
            return "POLITICS"
            break;
        case "finans":
            return "FINANCE"
            break;
        case "gündem":
            return "AGENDA"
            break;
        case "dünya":
            return "WORLD"
            break;
        case "magazin":
            return "MAGAZINE"
            break;
        default:
            return null
    }
}