// Populate this area to include info etc.

// Define the sequence of blocks in the trial
//Sequence("intro", randomize("experiment"), SendResults(), "bye")

// Header at the beginning of each trial
Header(
    // use globar variable element to store participants' name
    newVar("ParticipantName")
        .global()
    // delay of 500ms before every trial
    newTimer(500)
        .start()
        .wait()
)
.log("Name", getVar("ParticipantName"))

newTrial("intro",
    newText(<p>))

Template("training.csv", row =>
    newTrial("training",
    )
)