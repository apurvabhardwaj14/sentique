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

// Twitter Search
let search = document.getElementById('search')
search.addEventListener('submit', function (event) {
    event.preventDefault()
    document.getElementById('result').classList.add('d-none')
    document.getElementById('pospercent').innerHTML = ''
    document.getElementById('negpercent').innerHTML = ''
    document.getElementById('neupercent').innerHTML = ''
    document.getElementById('postweets').innerHTML = ''
    document.getElementById('negtweets').innerHTML = ''
    document.getElementById('search-spinner').classList.remove('d-none')
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
            document.getElementById('result').classList.remove('d-none')
            document.getElementById('search-spinner').classList.add('d-none')
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
            document.getElementById('search-spinner').classList.add('d-none')
        })
})


// Link Parsing
let searchLink = document.getElementById('searchLink')
searchLink.addEventListener('submit', function (event) {
    event.preventDefault()
    document.getElementById('result').classList.add('d-none')
    document.getElementById('pospercent').innerHTML = ''
    document.getElementById('negpercent').innerHTML = ''
    document.getElementById('neupercent').innerHTML = ''
    document.getElementById('postweets').innerHTML = ''
    document.getElementById('negtweets').innerHTML = ''
    document.getElementById('search-spinner').classList.remove('d-none')
    let link = document.getElementById('link')

    fetch('/searchlink/', {
        method: "POST",
        header: {
            'content-type': 'application/json',
        },

        body: JSON.stringify({
            link: link.value
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            document.getElementById('result').classList.remove('d-none')
            document.getElementById('search-spinner').classList.add('d-none')
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
            document.getElementById('search-spinner').classList.add('d-none')
        })
})
