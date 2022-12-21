for(let i=0; i < 8; i++) {
    let row = ''
    for(let j=0; j < 8; j++) {

        // If row is even
        if(i % 2 == 0) {
            // If colunm is even, add black
            if( j % 2 == 0 ) {
                row += 'N '
            } else {
                // if column is odd, add white
                row += 'B '
            }

        // If row is odd
        } else {
            if( j % 2 == 0) {
                // if column is even, add white
                row += 'B '
            } else {
                // if column is odd, add black
                row += 'N '
            }
        }
    }
    console.log(row)
}