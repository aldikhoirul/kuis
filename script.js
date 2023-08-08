const quizData = [
  {
    question: "Kue apa yang bungkusnya di dalam?",
    options: ["Kue-kuean", "Kue mainan", "Kue aneh", "Kue salah buat"],
    answer: "Kue salah buat",
  },
  {
    question: "Makanan favorit vampir?",
    options: ["Darah segar", "Darah merah", "Darah lama", "Orang darah tinggi"],
    answer: "Orang darah tinggi",
  },
  {
    question: "Dosa apa yang di benci setan?",
    options: ["Menggoda setan wanita", "Menculik anak setan", "Membohongi setan", "Pukul setan"],
    answer: "Menculik anak setan",
  },
  {
    question: "Mata hari mau berapa?",
    options: ["1", "2", "3", "4"],
    answer: "2",
  },
  {
    question: "Mengapa motor berhenti di depan lampu merah?",
    options: ["Lampu berwarna merah", "Ban kempes", "Ketilang polisi", "Karena motornya direm"],
    answer: "Karena motornya direm",
  },
  {
    question: "Lampu apa yang ada di perempatan jalan?",
    options: ["Lampu bangjo", "Lampu pijar", "Lampu merah kuning hijau", "Lampu lalu lintas"],
    answer: "Lampu merah kuning hijau",
  },
  {
    question: "Apa fungsi rem pada kendaraan bermotor?",
    options: ["Untuk menghentikan motor", "Sebagai pengaman saat ngebut", "Accessories aja", "Buat lempar maling"],
    answer: "Sebagai pengaman saat ngebut",
  },
  {
    question: "Ruangan rumah sakit apa yang ditakuti?",
    options: ["Ruang Gawat Darurat", "Kamar mayat", "Ruang operasi medis", "Ruang administrasi"],
    answer: "Ruang administrasi",
  },
  {
    question: "Kereta KRL melaju dengan santai, Kemanakah arah asapnya?",
    options: ["Ke belakang", "Tidak ada asapnya", "Ke arah rumah presiden", "Ke bawah"],
    answer: "Tidak ada asapnya",
  },
  {
    question: "Benda apa yang bila dipotong semakin tinggi?",
    options: ["Gak ada", "Kabel", "Celana", "Pohon"],
    answer: "Celana",
  },
];

const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const submitButton = document.getElementById("submit");
const retryButton = document.getElementById("retry");
const showAnswerButton = document.getElementById("showAnswer");

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement("div");
  questionElement.className = "question";
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement("div");
  optionsElement.className = "options";

  const shuffleOptions = [...questionData.options];
  shuffleArray(shuffleOptions);

  for (let i = 0; i < shuffleOptions.length; i++) {
    const option = document.createElement("label");
    option.className = "option";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "quiz";
    radio.value = shuffleOptions[i];

    const optionText = document.createTextNode(shuffleOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = "";
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = "none";
  submitButton.style.display = "none";
  retryButton.style.display = "inline-block";
  showAnswerButton.style.display = "inline-block";
  resultContainer.innerHTML = `Skor Kamu ${score} dari ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = "block";
  submitButton.style.display = "inline-block";
  retryButton.style.display = "none";
  showAnswerButton.style.display = "none";
  resultContainer.innerHTML = "";
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = "none";
  submitButton.style.display = "none";
  retryButton.style.display = "inline-block";
  showAnswerButton.style.display = "none";

  let incorrectAnswersHtml = "";
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Pertanyaan:</strong> ${incorrectAnswers[i].question}<br>
        <strong style="color:red;">Jawaban Kamu: ${incorrectAnswers[i].incorrectAnswer}</strong><br>
        <strong style="color:green;">Jawaban Benar: ${incorrectAnswers[i].correctAnswer}</strong>
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>Skor Kamu ${score} dari ${quizData.length}!</p>
    <p>Jawaban Salah:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener("click", checkAnswer);
retryButton.addEventListener("click", retryQuiz);
showAnswerButton.addEventListener("click", showAnswer);

displayQuestion();
