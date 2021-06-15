const container = document.querySelector(".container")
const seats = document.querySelectorAll(".row .seat:not(.occupeid)");
const counts = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

//movieSelect.value is a typeOf string we have to convert it into a number, so we used +
let ticketPrice = +movieSelect.value;

// save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem("movieIndex", movieIndex);
    // localStorage.setItem("moviePrice", moviePrice);

}


//update total and counts

function updateSelectedCounts() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    // google what a node list is
    // console.log(selectedSeats);
    const selectedSeatCounts = selectedSeats.length;
    counts.innerText = selectedSeatCounts;
    total.innerText = selectedSeatCounts * ticketPrice;

        // the spread operator(...) will cenvert the selectedSeats node list to an regular array
    // .map is similar to forEach. it will loop through every item but, it will return the output in array
    const seatsIndex = [...selectedSeats].map(function (seat) {
        return [...seats].indexOf(seat)
    });

    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
}

// get data from local storage

function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"))
    if (selectedSeats !== null && selectedSeats.length > 0) {
        for (let seat of selectedSeats) {
            console.log(seat);
            seats[seat].classList.toggle("selected")
        }
    //     seats.forEach((seat, index) => {
    //        if (selectedSeats.indexOf(index)>-1) {
    //            seat.classList.add("selected")
    //        }
    //    }) 
    }
    const selectedMovieIndex = localStorage.getItem("movieIndex");
    if (selectedMovieIndex!==null) {
        movieSelect.selectedIndex = selectedMovieIndex
    }
}


container.addEventListener("click", function (e) {
    if
        (e.target.classList.contains('seat')&& !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected')
        updateSelectedCounts();
    }
})

//movie select event
movieSelect.addEventListener("change", function (e) {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex,e.target.value)
    updateSelectedCounts();
})

updateSelectedCounts();





