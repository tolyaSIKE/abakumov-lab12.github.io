$(document).ready(function () {
    const words = [
        { en: "cucumber", ua: "огірок" },
        { en: "porridge", ua: "каша" },
        { en: "cabbage", ua: "капуста" },
        { en: "juice", ua: "сік" },
        { en: "pumpkin", ua: "гарбуз" },
        { en: "pea", ua: "горох" },
        { en: "spinach", ua: "шпинат" },
        { en: "radish", ua: "редиска" },
        { en: "celery", ua: "селера" },
        { en: "potato", ua: "картопля" },
        { en: "a few", ua: "декілька" },

        { en: "fulfilled", ua: "задоволений" },
        { en: "love affair", ua: "любовний роман" },
        { en: "relationship", ua: "стосунки" },
        { en: "to measure", ua: "виміряти" },
        { en: "convinced", ua: "переконаний" },
        { en: "significance", ua: "значимість" },
        { en: "success", ua: "успіх" },
        { en: "ability", ua: "вміння" },
        { en: "opportunity", ua: "можливість" },

        { en: "upper-intermediate", ua: "вище середнього" },
        { en: "acquaintance", ua: "знайомство" },
        { en: "circumstance", ua: "умова" },
        { en: "entrepreneur", ua: "підприємець" },
        { en: "provocatively", ua: "провокаційний" },
        { en: "anonymous", ua: "анонімний" },
        { en: "particularly", ua: "особливо" },
        { en: "pronunciation", ua: "вимова" },
        { en: "unfortunately", ua: "нажаль" },
        { en: "conscious", ua: "свідомий" },
        { en: "hospitable", ua: "гостинний" }
    ];
    let difficulty = "easy";
    let availableWords = [...words];
    let currentWord;
    const totalSteps = 10;
    let currentStep = 1;
    let trueAnswers = 0;
    let falseAnswers = 0;
    function updateWordsByDifficulty() {
        if (difficulty == "easy") {
            availableWords = words.slice(0, 10); 
        } else if (difficulty == "medium") {
            availableWords = words.slice(10, 20); 
        } else if (difficulty == "hard") {
            availableWords = words.slice(20, 30); 
        }
    }
    function getRandomWord() {
        const index = Math.floor(Math.random() * availableWords.length);
        return availableWords.splice(index, 1)[0];
    }
    function resetGame() {
        updateWordsByDifficulty();
        currentStep = 1;
        trueAnswers = 0;
        falseAnswers = 0;
        $('#true').text(trueAnswers);
        $('#false').text(falseAnswers);
        $('#step').text(currentStep);
        $('#result-card').addClass('hidden');
        $('#check-btn').prop('disabled', false);
        currentWord = getRandomWord();
        if (currentWord) {
            $('#word').text(currentWord.en);
        }
        $('#message').val('');
    }
    resetGame();
    $('input[name="difficulty"]').change(function () {
        difficulty = $(this).val();
        resetGame();
    });
    $('#check-btn').click(function () {
        const userInput = $('#message').val().trim().toLowerCase();
        if (userInput == currentWord.ua) {
            trueAnswers++;
            $('#true').text(trueAnswers);
        } else {
            falseAnswers++;
            $('#false').text(falseAnswers);
        }
        currentStep++;
        if (currentStep > totalSteps) {
            $('#result-card').removeClass('hidden');
            $('#result').text(`Ви відповіли: правильно: ${trueAnswers}, неправильно: ${falseAnswers}`);
            $('#check-btn').prop('disabled', true);
        } else {
            $('#step').text(currentStep);
            currentWord = getRandomWord();
            if (currentWord) {
                $('#word').text(currentWord.en);
            }
            $('#message').val('');
        }
    });
    $('#restart-btn').click(resetGame);
});