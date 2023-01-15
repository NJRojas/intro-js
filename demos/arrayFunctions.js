
function ordeAsc(list = []) {
    for (i = 0; i < list.length -1; i++) {
        for (j = i + 1; j < list.length; j++) {
            if (list[i] > list[j]) {
                let temp = list[i]
                list[i] = list[j]
                list[j] = temp
            }
        }
        console.log(list)
    }
    return list
}

function orderDsc(list = []) {
    for (i = 0; i < list.length - 1; i++) {
        for (j = i + 1; j < list.length; j++) {
            if (list[i] < list[j]) {
                let temp = list[i]
                list[i] = list[j]
                list[j] = temp
            }
        }
        console.log(list)
    }
    return list
}

const UNSORTED = [23, 45, 1, 4, 9, 16, 3, 6, 0]
const ascSorted = ordeAsc(UNSORTED)
console.log(`${UNSORTED} Ascendentemente ordenado ${ascSorted}`)
console.log(`Descendentemente ordenado ${orderDsc(UNSORTED)}`)

const months = ['March', 'Jan', 'Feb', 'Dec'];
//console.log(order(months));