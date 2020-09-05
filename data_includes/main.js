// Populate this area to include info etc.

// Define the sequence of blocks in the trial
//Sequence("intro", randomize("experiment"), SendResults(), "bye")

// Header at the beginning of each trial
Header(
    // use global variable element to store participants' name
    newVar("ParticipantName")
        .global()
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
)



Template("training.csv", row =>
    newTrial("training",
    )
)