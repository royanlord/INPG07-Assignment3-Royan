// Fetch Covid API
var btnCountry = document.getElementById('btn-country');
var getCountry = document.getElementById('country');
var getDate = document.getElementById('date');

btnCountry.addEventListener('click', function(event) {
    event.preventDefault();
    var setCountry = getCountry.value;
    var setDate = getDate.value;

    
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '',
            'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
        }
    };
    // console.log(setCountry)
    // console.log(setDate)

    if (setCountry === "" && setDate === "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Country and date field can't be empty!"
        });
    } else if (setCountry === "" && setDate != "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Country field can't be empty!"
        });
    } else if (setDate === "" && setCountry != "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Date field can't be empty!"
        });
    } else {
        this.innerHTML = '<div id="loader"></div>';
        document.body.style.cursor = "wait";
        document.getElementById('btn-country').disabled = true;
        
        setTimeout(() => {
            //covid data
            fetch(`https://covid-193.p.rapidapi.com/history?country=${setCountry}&day=${setDate}`, options)
            .then(response => response.json())
            .then((response) => {
                let data = response.response[0];
                console.log(response);
                document.getElementById('active-cases').innerHTML = data.cases.active;
                document.getElementById('new-cases').innerHTML = data.cases.new;
                document.getElementById('recover-cases').innerHTML = data.cases.recovered;
                document.getElementById('total-cases').innerHTML = data.cases.total;
                document.getElementById('total-death').innerHTML = data.deaths.total;
                document.getElementById('total-test').innerHTML = data.tests.total;
                if (data.cases.active === null) {
                    document.getElementById('active-cases').innerHTML = "-";
                }
                if (data.cases.new === null) {
                    document.getElementById('new-cases').innerHTML = "-";
                }
                if (data.cases.recovered === null) {
                    document.getElementById('recover-cases').innerHTML = "-";
                }
                if (data.cases.total === null) {
                    document.getElementById('total-cases').innerHTML = "-";
                }
                if (data.deaths.total === null) {
                    document.getElementById('total-death').innerHTML = "-";
                }
                if (data.tests.total === null) {
                    document.getElementById('total-test').innerHTML = "-";
                }
                this.innerHTML = "Get Data"
                document.body.style.cursor = "default";
                document.getElementById('btn-country').disabled = false;
            })
            .catch(err => {
                if (setCountry.length != 0) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: "Country doesn't exist!"
                        // footer: "Please input valid country"
                    });
                    document.getElementById('active-cases').innerHTML = "-";
                    document.getElementById('new-cases').innerHTML = "-";
                    document.getElementById('recover-cases').innerHTML = "-";
                    document.getElementById('total-cases').innerHTML = "-";
                    document.getElementById('total-death').innerHTML = "-";
                    document.getElementById('total-test').innerHTML = "-";
                    this.innerHTML = "Get Data"
                    document.body.style.cursor = "default";
                    document.getElementById('btn-country').disabled = false;
                }
                console.error(err)
            });
        }, 1000);
    }
})

// back to top
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}