
function copypasta() { 
    sentenceLine = ""
    sourceWordLimit = 126
    bindName = document.getElementById("name").value
    currentAlias = 0
    // remove speech marks, and split the textarea into words
    var input = document.getElementById("input").value.replace("\"", "'").trim().replace(/(\r\n|\n|\r)/gm,"").split(" ");
    document.getElementById("output").value = `alias "${bindName}" "${bindName}0"` + "\n"
    for (var i = 0; i < input.length ;i++) {
        let currentWord = input[i]
        if (sentenceLine.length + currentWord.length > sourceWordLimit) {
            if (i == input.length) { 
                document.getElementById("output").value += `alias "${bindName}${currentAlias}" "${sentenceLine};alias ${bindName} ${bindName}0"` + "\n"
            }
            else { 
                document.getElementById("output").value += `alias "${bindName}${currentAlias}" "${sentenceLine};alias ${bindName} ${bindName}${currentAlias+1}"` + "\n"
                currentAlias += 1
                sentenceLine = currentWord + " "
            }
        }
        else if (currentWord.slice(-1) == ".") {
            if (i+1 == input.length) { 
                sentenceLine += currentWord + " "
                document.getElementById("output").value += `alias "${bindName}${currentAlias}" "${sentenceLine};alias ${bindName} ${bindName}0"` + "\n"
            }
            else { 
                sentenceLine += currentWord + " "
                document.getElementById("output").value += `alias "${bindName}${currentAlias}" "${sentenceLine};alias ${bindName} ${bindName}${currentAlias+1}"` + "\n"
                currentAlias += 1
                sentenceLine = ""
            }
        }

        else if (i == input.length) {
            sentenceLine += currentWord + " "
            document.getElementById("output").value += `alias "${bindName}${currentAlias}" "${sentenceLine};alias ${bindName} ${bindName}0"` + "\n"
        }
        else { 
            sentenceLine += currentWord + " "
        }
    }


}

