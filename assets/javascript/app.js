var queryURL = "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple";

// need to refresh token later
// var token = "&token=edfaa0ce7155af47113f8050262b43d139e0934d9761d1dfa7229126b413383d";

// onClick - replace div with display, load display with question, start timer
$("#get-started").click(function () {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);

        const questionList = response.results;
        let q = 0;
        let n = 10;

        renderQuestion();

        function renderQuestion() {
            let intervalID = setTimeout(countDown, 1000);

            let currentQuestion = questionList[q].question.toString();
            let correctAnswer = questionList[q].correct_answer;

            // concatted arrays for wrong choices and correct choice together
            const choices = questionList[q].incorrect_answers.concat(correctAnswer);

            // replacing start button with question and choices
            $("#dynamic-content").html(`<h3>${currentQuestion}</h3>`);

            // for each element in the choices array, generate button
            choices.forEach(function (choice) {
                let button = $(`<button value="${choice}">${choice}</button>`);
                $("#dynamic-content").append(button);
            });

            // on click, tell me if incorrect or correct
            $("button").click(function (event) {
                if (event.target.value == correctAnswer) {
                    console.log("Correct");
                } else {
                    console.log("Incorrect");
                }

                q++;
                clearTimeout(intervalID);
                renderQuestion();
            })
        }

        function countDown() {
            n--;
            if (n > 0) {
                setTimeout(countDown, 1000);
            }
            console.log(n);
        }


    });



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