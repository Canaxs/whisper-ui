export function convertDateMonth(date: string) {
    switch(date) {
        case "01":
            return "Ocak"
            break;
        case "02":
            return "Şubat"
            break;
        case "03":
            return "Mart"
            break;
        case "04":
            return "Nisan"
            break;
        case "05":
            return "Mayıs"
            break;
        case "06":
            return "Haziran"
            break;
        case "07":
            return "Temmuz"
            break;
        case "08":
            return "Ağustos"
            break;
        case "09":
            return "Eylül"
            break;
        case "10":
            return "Ekim"
            break;
        case "11":
            return "Kasım"
            break;
        case "12":
            return "Aralık"
            break;
        default:
            return null
    }
}