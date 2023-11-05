const container = document.querySelector(".container");

const infoText = document.querySelector(".infoText");

const movieList = document.querySelector("#movie");

const seatCount = document.getElementById("count");

const totalPrice = document.getElementById("price");

const seats = document.querySelectorAll(".seat:not(.reserved)");

const saveToDataBase = (index) => {
  localStorage.setItem("seatsIndex", JSON.stringify(index));

  localStorage.setItem("movieIndex", JSON.stringify(movieList.selectedIndex));
};

const getFromDataBase = () => {
  const dataBaseSelectedSeats = JSON.parse(localStorage.getItem("seatsIndex"));

  if (dataBaseSelectedSeats !== null) {
    seats.forEach((seat, index) => {
      if (dataBaseSelectedSeats.includes(index)) {
        seat.classList.add("selected");
      }
    });
  }

  const dataBaseSelectedMovie = JSON.parse(localStorage.getItem("movieIndex"));
  movieList.selectedIndex = dataBaseSelectedMovie;
};

getFromDataBase();

const createIndex = () => {
  let allSeatsArray = [];

  seats.forEach((seat) => {
    allSeatsArray.push(seat);
  });

  const allSelectedSeatsArray = [];

  const allSelectedSeats = container.querySelectorAll(".seat.selected");

  allSelectedSeats.forEach((selectedSeat) => {
    allSelectedSeatsArray.push(selectedSeat);
  });

  const selectedSeatsIndex = allSelectedSeatsArray.map((selectedSeat) => {
    return allSeatsArray.indexOf(selectedSeat);
  });

  saveToDataBase(selectedSeatsIndex);
};

const calculateTotal = () => {
  createIndex();

  let selectedSeatsCount = container.querySelectorAll(".seat.selected").length;

  seatCount.innerText = selectedSeatsCount;

  totalPrice.innerText = selectedSeatsCount * movieList.value;

  if (selectedSeatsCount > 0) {
    infoText.classList.add("open");
  } else {
    infoText.classList.remove("open");
  }
};
calculateTotal();

container.addEventListener("click", (pointerEvent) => {
  const clickedSeat = pointerEvent.target.offsetParent;

  if (
    clickedSeat.classList.contains("seat") &&
    !clickedSeat.classList.contains("reserved")
  ) {
    clickedSeat.classList.toggle("selected");
  }

  calculateTotal();
});

movieList.addEventListener("change", () => {
  calculateTotal();
});