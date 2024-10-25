
export const filteredFavoriteArtists = (unfilteredArr,numberOfGenresToFilter) => {
    const frequencyObj = {}

    for(let i = 0; i < unfilteredArr.length; i++){
        const arrNumber = unfilteredArr[i]
       
        for(let j = 0; j < arrNumber.length; j++){
            const value = arrNumber[j]
            if(value in frequencyObj){
                frequencyObj[value]  +=1
            } else {
                frequencyObj[value] = 1
            }
        }
    }

    const sortedGenres = Object.entries(frequencyObj).sort((a,b) => b[1] - a[1]).slice(0, numberOfGenresToFilter).map(([genre])=> genre)


    return sortedGenres
}