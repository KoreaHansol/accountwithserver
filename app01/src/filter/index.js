const numberComma = (n) => {
    let numberToString = n.toString()
    let commaPoint = numberToString.length % 3
    let searchString = numberToString.substring(0, commaPoint); //만약 10000이라면 5 % 3 은 2이므로 현재 str은 10 (0번째에서 2번째까지)

    while (commaPoint < numberToString.length) {
        if (searchString != '') searchString += ','; // 10,
        searchString += numberToString.substring(commaPoint, commaPoint + 3)  //10,000 (2번째에서 5번째까지)
        commaPoint += 3 // 3자리가 더 있다면 다시 수행하기 위해 commaPoint 바꿈 (10,000,000)
    }

    return searchString
}
const dateFormatKr = (n) => {
    let searchString = n.substring(0, 4) //년도는 4자리니까 0~4번째 인덱스에 해당되는 문자열을 우선 넣음
    searchString = searchString + '년' //이후 년 붙임
    let arr = []
    let findIndex = 0


    while (true) { //Dash(-) 가 나올때까지 while 돌리고 만날때마다 배열에 넣음 (추후에 이 배열에 들어있는 인덱스로 그 뒤에 문자열을 붙이기 위함)
        let foundDashIndex = n.indexOf('-', findIndex);
        if (foundDashIndex == -1) break;
        arr.push(foundDashIndex)
        findIndex = foundDashIndex + 1
    }

    searchString += n.substring(arr[0], arr[1]) //찾은 Dash 인덱스를 가지고 그 뒤에 문자열을 추가함
    searchString += '월'
    searchString += n.substring(arr[1], n.length)
    searchString += '일'

    searchString = searchString.replaceAll('-', '')

    return searchString;
}

export default function install(Vue) {
    Vue.filter('numberComma', (n) => {
        return numberComma(n)
    })

    Vue.filter('dateFormatKr', (n) => {
        return dateFormatKr(n)
    })
}

