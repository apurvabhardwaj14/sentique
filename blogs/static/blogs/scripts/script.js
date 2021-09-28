// Chart Variables
const chartData = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [
        {
            // label: 'Dataset 1',
            data: [],
            backgroundColor: ['rgba(25, 135, 84, 0.7)', 'rgba(220, 53, 69, 0.7)', 'rgba(13, 110, 253, 0.7)'],
        }
    ]
};

const chartConfig = {
    type: 'doughnut',
    data: chartData,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Distribution of Sentiments'
            }
        }
    },
};
// Chart
var ctx = document.getElementById('pieChart').getContext('2d');
var pieChart = new Chart(ctx, chartConfig)

// Clear result data everywhere
function clearData(){
    document.getElementById('twitter-result').classList.add('d-none')
    document.getElementById('text-result').classList.add('d-none')
    document.getElementById('pospercent').innerHTML = ''
    document.getElementById('negpercent').innerHTML = ''
    document.getElementById('neupercent').innerHTML = ''
    document.getElementById('postweets').innerHTML = ''
    document.getElementById('negtweets').innerHTML = ''
}

// Twitter Search
let search = document.getElementById('search')
search.addEventListener('submit', function (event) {
    event.preventDefault()
    clearData()
    document.getElementById('search-spinner-twitter').classList.remove('d-none')
    let keyword = document.getElementById('keyword')

    fetch('/searchpost/', {
        method: "POST",
        header: {
            'content-type': 'application/json',
        },

        body: JSON.stringify({
            keyword: keyword.value
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            document.getElementById('twitter-result').classList.remove('d-none')
            document.getElementById('search-spinner-twitter').classList.add('d-none')
            document.getElementById('pospercent').innerHTML = data.positive.toFixed(2)
            document.getElementById('negpercent').innerHTML = data.negative.toFixed(2)
            document.getElementById('neupercent').innerHTML = data.neutral.toFixed(2)
            let postweets = document.getElementById('postweets')
            let negtweets = document.getElementById('negtweets')
            data.postweets.forEach(tweet => {
                postweets.innerHTML += '<li>' + tweet + '</li>'
            })
            data.negtweets.forEach(tweet => {
                negtweets.innerHTML += '<li>' + tweet + '</li>'
            })

            chartData.datasets[0].data = [data.positive.toFixed(2), data.negative.toFixed(2), data.neutral.toFixed(2)]
            pieChart.update()
        })
        .catch(error => {
            console.log('error:', error)
            document.getElementById('search-spinner-twitter').classList.add('d-none')
        })
})


// Text Parsing
let searchText = document.getElementById('searchText')
searchText.addEventListener('submit', function (event) {
    event.preventDefault()
    clearData()
    document.getElementById('search-spinner-text').classList.remove('d-none')
    let text = document.getElementById('text')

    fetch('/searchtext/', {
        method: "POST",
        header: {
            'content-type': 'application/json',
        },

        body: JSON.stringify({
            text: text.value
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            document.getElementById('text-result').classList.remove('d-none')
            document.getElementById('search-spinner-text').classList.add('d-none')
            let textSentiment = document.getElementById("text-sentiment")
            if(data.sentiment==='positive'){
                textSentiment.innerHTML = '<span class="text-success">Positive</span>'
            }
            else if(data.sentiment==='negative'){
                textSentiment.innerHTML = '<span class="text-danger">Negative</span>'
            }
            else if(data.sentiment==='neutral'){
                textSentiment.innerHTML = '<span class="text-secondary">Neutral</span>'
            }
        })
        .catch(error => {
            console.log('error:', error)
            document.getElementById('search-spinner-text').classList.add('d-none')
        })
})

// let searchLink = document.getElementById('searchLink')
// searchLink.addEventListener('submit', function (event) {
//     event.preventDefault()
//     document.getElementById('result').classList.add('d-none')
//     document.getElementById('pospercent').innerHTML = ''
//     document.getElementById('negpercent').innerHTML = ''
//     document.getElementById('neupercent').innerHTML = ''
//     document.getElementById('postweets').innerHTML = ''
//     document.getElementById('negtweets').innerHTML = ''
//     document.getElementById('search-spinner').classList.remove('d-none')
//     let link = document.getElementById('link')

//     fetch('/searchlink/', {
//         method: "POST",
//         header: {
//             'content-type': 'application/json',
//         },

//         body: JSON.stringify({
//             link: link.value
//         })
//     })
//         .then(res => res.json())
//         .then(data => {
//             console.log(data)
//             document.getElementById('result').classList.remove('d-none')
//             document.getElementById('search-spinner').classList.add('d-none')
//             document.getElementById('pospercent').innerHTML = data.positive.toFixed(2)
//             document.getElementById('negpercent').innerHTML = data.negative.toFixed(2)
//             document.getElementById('neupercent').innerHTML = data.neutral.toFixed(2)
//             let postweets = document.getElementById('postweets')
//             let negtweets = document.getElementById('negtweets')
//             data.postweets.forEach(tweet => {
//                 postweets.innerHTML += '<li>' + tweet + '</li>'
//             })
//             data.negtweets.forEach(tweet => {
//                 negtweets.innerHTML += '<li>' + tweet + '</li>'
//             })

//             chartData.datasets[0].data = [data.positive.toFixed(2), data.negative.toFixed(2), data.neutral.toFixed(2)]
//             pieChart.update()
//         })
//         .catch(error => {
//             console.log('error:', error)
//             document.getElementById('search-spinner').classList.add('d-none')
//         })
// })
