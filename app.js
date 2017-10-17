/*jshint esversion: 6 */
function copypasta() {
    "use strict";
    var sentenceLine = "";
    var sourceWordLimit = 126;
    var bindName = document.getElementById("name").value;
    var currentAlias = 0;
    // remove speech marks, and split the textarea into words
    var input = document.getElementById("input").value.replace(/\"/g, "'").trim().replace(/(\r\n|\n|\r)/gm," ").split(" ");

    if (bindName == "") {
        document.getElementById("output").value = "No bind name was given.";
    }

    else {
        document.getElementById("output").value = `alias "${bindName}" "${bindName}0"` + "\n";
        for (var i = 0; i < input.length; i++) {
            let currentWord = input[i];
            // console.log(`debug output: currentWord: ${currentWord}, i: ${i}, sentenceLine: ${sentenceLine}, length of string: ${inputLen}`)
            if (sentenceLine.length + currentWord.length > sourceWordLimit) {
                if (i+1 == input.length) {
                    document.getElementById("output").value += `alias "${bindName}${currentAlias}" "say ${sentenceLine};alias ${bindName} ${bindName}0"` + "\n";
                }
                else {
                    document.getElementById("output").value += `alias "${bindName}${currentAlias}" "say ${sentenceLine};alias ${bindName} ${bindName}${currentAlias+1}"` + "\n";
                    currentAlias += 1;
                    sentenceLine = currentWord + " ";
                }
            }
            else if (currentWord.slice(-1) == ".") {
                if (i+1 == input.length) {
                    sentenceLine += currentWord;
                    document.getElementById("output").value += `alias "${bindName}${currentAlias}" "say ${sentenceLine};alias ${bindName} ${bindName}0"` + "\n";
                }
                else {
                    sentenceLine += currentWord;
                    document.getElementById("output").value += `alias "${bindName}${currentAlias}" "say ${sentenceLine};alias ${bindName} ${bindName}${currentAlias+1}"` + "\n";
                    currentAlias += 1;
                    sentenceLine = "";
                }
            }

            else if (i+1 == input.length) {
                sentenceLine += currentWord + " ";
                document.getElementById("output").value += `alias "${bindName}${currentAlias}" "say ${sentenceLine};alias ${bindName} ${bindName}0"` + "\n";
            }
            else {
                sentenceLine += currentWord + " ";
            }
        }
    }
}

