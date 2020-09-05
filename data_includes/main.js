// Populate this area to include info etc.

PennController.ResetPrefix(null)
//PennController.Debug

// Define the sequence of blocks in the trial
Sequence("intro", "instructions", randomize("training"), SendResults(), "goodbye")

// Header at the beginning of each trial
Header(
    // use global variable element to store participants' name
    newVar("ParticipantName")
        .global()
    ,
    // delay of 500ms before every trial
    newTimer(500)
        .start()
        .wait()
)
// Log the participant
.log("Name", getVar("ParticipantName"))

newTrial("intro",

    newText("<p>Welcome to this lexical decision task.")
        .css("font-size", "1.5em")
        .css("font-family", "Verdana")
        .center()
        .print()
    ,
    newText("<p>Please enter your name below and press enter:")
        .css("font-size", "1em")
        .css("font-family", "Verdana")
        .center()
        .print()
    ,
    newTextInput()
        .center()
        .print()
        .wait()
        .setVar("ParticipantName")
)

newTrial("instructions",

    newText("<p>In this experiment, your task is to decide, as quickly and as accurately as possible<br/>"+
        "whether the word on the screen is a word of English or not.</p>" +
        "Note that each word is briefly preceeded by another word. Some people will be able to read" +
        "the first word, but it doesn't matter if you can. You are to judge the second word that stays on screen.</p>"+
        "<p>Please press <b>RIGHT</b> if the word is a word and <b>LEFT</b> if it is not a word.</p>")
        .css("font-size", "1.5em")
        .css("font-family", "Verdana")
        .center()
        .print()
    ,
    newText("<p>Click OK when you are ready to begin.</p>")
        .css("font-size", "1em")
        .css("font-family", "Verdana")
        .center()
        .print()
    ,
    newButton("OK")
        .size(200)
        .center()
        .print()
        .wait()
    )

Template("training.csv", row =>
    newTrial("training",

        // set up a timer so there is a x ms break between trials
        newTimer(500)
            .start()
            .wait()
        ,
        // set up the conditions for the target word
        newText("<p></p><p></p>")
        ,
        newText("Target", row.Target)
            .css("font-size", "2em")
            .css("font-family", "Verdana")
            .center()
            .print()
            .log()
        ,
        // set up the response buttons
        newKey("FJ")
            .log()
            .once()
            .wait()
        //,
        //newSelector()
        //    .keys(37, 39)
        //    .log()
        //    .once()
        //    .wait()
    )
// log info
    .log("Corr", row.Response)
)

// now send results before the good-bye and validation message
SendResults()

newTrial("goodbye",
    newText("<p>Thank you for your participation!</p>")
        .css("font-size", "2em")
        .css("font-family", "Verdana")
        .center()
        .print()
    ,
    newText("<a href='https://www.sfla.ch/'>Click here to validate your participation.</a>")
        .css("font-size", "1.5em")
        .css("font-family", "Verdana")
        .center()
        .print()
    ,
    // not sure what this does, but it might be necessary
    newButton("void")
        .wait()
)