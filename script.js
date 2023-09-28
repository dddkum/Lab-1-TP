// инициализация состояния начала и паузы анимации
let isStarted = false;
let isPaused = true;

// получение элемента для перемещения на странице
let object = document.getElementById("object");

// размер равностороннего треугольника
let triangleSize = 300;

// функция для перемещения объекта вдоль равностороннего треугольника
function moveObject() {
  // инициализация переменных: времени, координат, центра и скорости перемещения
  let t = 0;
  let x = 0;
  let y = 0;
  let centerX = window.innerWidth / 2;
  let centerY = window.innerHeight / 2;
  let speed = .01;

  // вершины равностороннего треугольника
  let vertices = [
    { x: centerX - triangleSize / 2, y: centerY - triangleSize / 2 },
    { x: centerX + triangleSize / 2, y: centerY - triangleSize / 2 },
    { x: centerX, y: centerY + triangleSize / 2 },
  ];

  vertices.reverse();

  // функция линейной интерполяции
  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  // интервал, обновляющий положение объекта на странице каждые 10 мс
  setInterval(function () {
    // если анимация еще не начата, пропустить
    if (!isStarted) return;

    // если анимация не приостановлена, обновить координаты и переместить объект
    if (!isPaused) {
      t += speed;
      t %= 3;

      let i = Math.floor(t);
      let j = (i + 1) % 3;
      let localT = t - i;

      x = lerp(vertices[i].x, vertices[j].x, localT);
      y = lerp(vertices[i].y, vertices[j].y, localT);

      object.style.left = x + "px";
      object.style.top = y + "px";
    }
  }, 10);
}

// функция переключения паузы анимации
function togglePause() {
  // если анимация еще не начата, показать объект и изменить состояние начала анимации
  if (!isStarted) {
    object.style.display = "block";
    isStarted = true;
  }
  // переключение состояния паузы анимации
  isPaused = !isPaused;
}

// добавление события клавиатуры для переключения состояния паузы при нажатии пробела
document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    togglePause();
  }
});

// добавление события клика для кнопки паузы на странице
let pauseButton = document
  .getElementById("pauseButton")
  .addEventListener("click", togglePause);

// запуск функции перемещения объекта
moveObject();