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
        case "gundem":
            return "AGENDA"
            break;
        case "dunya":
            return "WORLD"
            break;
        case "magazin":
            return "MAGAZINE"
            break;
        default:
            return null
    }
}

export function convertMenusTR(enumMenu: string) {
    switch(enumMenu) {
        case "spor":
            return "Spor"
            break;
        case "teknoloji":
            return "Teknoloji"
            break;
        case "politika":
            return "Politika"
            break;
        case "finans":
            return "Finans"
            break;
        case "gundem":
            return "Gündem"
            break;
        case "dunya":
            return "Dünya"
            break;
        case "magazin":
            return "Magazin"
            break;
        default:
            return null
    }
}

export function convertMenusEn(enumMenu: string) {
    switch(enumMenu) {
        case "SPORT":
            return "spor"
            break;
        case "TECHNOLOGY":
            return "teknoloji"
            break;
        case "POLITICS":
            return "politika"
            break;
        case "FINANCE":
            return "finans"
            break;
        case "AGENDA":
            return "gundem"
            break;
        case "WORLD":
            return "dunya"
            break;
        case "MAGAZINE":
            return "magazin"
            break;
        default:
            return null
    }
}