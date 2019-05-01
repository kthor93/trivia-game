$(document).ready(function () {

    var queryURL = "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple";

    $("#start-game").click(function () {
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            console.log(response);

            const questionList = response.results;
            let q = 0;
            let correct = 0;
            let incorrect = 0;

            renderQuestion();

            function renderQuestion() {
                let currentQuestion = questionList[q].question.toString();
                let correctAnswer = questionList[q].correct_answer;

                // concatted arrays for wrong choices and correct choice together
                const choices = questionList[q].incorrect_answers.concat(correctAnswer);

                shuffle(choices);

                // replacing start button with question and choices
                $("#dynamic-content").html(`<h2 id="question">${currentQuestion}</h2>`);

                // for each element in the choices array, generate button
                choices.forEach(function (choice) {
                    let button = $(`<button class="choice-buttons" value="${choice}">${choice}</button>`);
                    $("#dynamic-content").append(button);
                });

                // on click, tell me if incorrect or correct
                $("button").click(function (event) {
                    if (event.target.value == correctAnswer) {
                        console.log("Correct");
                        $("#dynamic-content").append(`<h3 class="correct">Correct</h3>`);
                        $(this).toggleClass("correct");
                        correct++;
                    } else {
                        $("button").toggle
                        console.log("Incorrect");
                        $("#dynamic-content").append(`<h3 class="incorrect">Incorrect!</h3>`);
                        incorrect++;
                    }

                    q++;

                    if (q < 10) {
                        setTimeout(function () { renderQuestion(); }, 1000);
                    } else {
                        renderScore(incorrect, correct);
                        $('#PTResults').DataTable().ajax.reload();
                    }
                })
            }

        });

        function renderScore(incorrect, correct) {
            $("#dynamic-content").html(
                `<h2 id="score">Your Score</h2>
                <p id="incorrect-score">Incorrect: ${incorrect}</p>
                <p id="correct-score">Correct: ${correct}<p>
                <button id="start-game">Play Again</button>
                `);
        }
        
        // shuffled the choices array
        function shuffle(choices) {
            for (let i = choices.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                let k = choices[i];
                choices[i] = choices[j];
                choices[j] = k;
            }
            return choices;
        }
    });
});