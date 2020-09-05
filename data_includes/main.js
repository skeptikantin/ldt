// Populate this area to include info etc.

PennController.ResetPrefix(null)
// PennController.DebugOff();

// Define the sequence of blocks in the trial
Sequence("intro",
    "instructions",
    randomize("training"),
    "intermission",
    //sepWithN( "break" , randomize("experiment") , 50),
    "question",
    SendResults(),
    "goodbye")

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
        "whether the word on the screen is a word of English or not.<br/></p>" +
        "<p>Note that each word is briefly preceded by another word. Some people will be able to read<br/>" +
        "the first word, but it doesn't matter if you can.<br/>"+
        "You are to judge the <b>second</b> word that stays on screen.</p>"+
        "<p>Please press the <b>J</b> key if the word is a word<br/>and the <b>F</b> key if it is not a word.</p>")
        .css("font-size", "1.2em")
        .css("font-family", "Verdana")
        .center()
        .print()
    ,
    newText("<p>Press SPACE when you are ready to begin a short training phase.</p>")
        .css("font-size", "1em")
        .css("font-family", "Verdana")
        .center()
        .print()
   ,
    newKey(" ")
    .log()
    .once()
    .wait()

)

Template("training.csv", row =>
    newTrial("training",

        // set up a timer so there is a x ms break between trials
        newTimer(500)
            .start()
            .wait()
        ,
        // set up the prime
        newText("Prime", row.Prime)
            .css("font-size", "2em")
            .css("font-family", "Verdana")
            .center()
            .print()
        ,
        newTimer("wait", 100)
            .start()
            .wait()
        ,
        getText("Prime")
            .remove()
        ,
        // Set a 200ms break between
        newTimer(100)
            .start()
            .wait()
        ,
        // Now show target
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
    )
// log info
        .log("Prime", row.Prime)
        .log("Target", row.Target)
        .log("Corr", row.Response)
)

newTrial("intermission",
    newText("<p>Well done, you should be good to go.<br/>" +
    "Remember: try to be as quick and as accurate as possible.</p>" +
    "<p>You are now going to do the same for 136 words.</p>"+
    "<p>Because the task is demanding, the experiment will pause<br/>" +
    "after 50 and again after 100 words,<br/>at which points you can take a break if you want.</p>")
        .css("font-size", "1.5em")
        .css("font-family", "Verdana")
        .center()
        .print()
    ,
    newText("<p>Press SPACE when you are ready to proceed to the main experiment.</p>")
        .css("font-size", "1em")
        .css("font-family", "Verdana")
        .center()
        .print()
    ,
    newKey(" ")
        .log()
        .once()
        .wait()
)

Template("test.csv", row =>
    newTrial("experiment",

        // set up a timer so there is a x ms break between trials
        newTimer(500)
            .start()
            .wait()
        ,
        // set up the prime
        newText("Prime", row.Prime)
            .css("font-size", "2em")
            .css("font-family", "Verdana")
            .center()
            .print()
        ,
        newTimer("wait", 100)
            .start()
            .wait()
        ,
        getText("Prime")
            .remove()
        ,
        // Set a 200ms break between
        newTimer(100)
            .start()
            .wait()
        ,
        // Now show target
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
     )
        // log info
        .log("Prime", row.Prime)
        .log("Target", row.Target)
        .log("Corr", row.Response)
        .log("Frequency_prime", row.Frequency_prime)
        .log("Nouniness_prime", row.Nouniness_prime)
        .log("Length_prime", row.Length_prime)
        .log("Length_target", row.Length_target)
        .log("Condition", row.Condition)
        .log("Nouniness_prime2", row.Nouniness_prime2)
    ,
    newTrial("break",

        newText("<p>Well done, you've earned a little rest if you want.</p>" +
            "Press SPACE to continue.")
            .css("font-size", "1.5em")
            .css("font-family", "Verdana")
            .center()
            .log()
            .print()
        ,
        newKey(" ")
            .wait()
    )
)

newTrial("question",
    newText("<p>Were you sometimes able to read the first word?</p>")
        .css("font-size", "1.5em")
        .css("font-family", "Verdana")
        .center()
        .print()
    ,
    newText("<p>Press <b>S</b> (sometimes) or <b>N</b> (never)")
        .css("font-size", "1.5em")
        .css("font-family", "Verdana")
        .center()
        .print()
    ,
    newKey("NS")
        .wait()
)


// now send results before the good-bye and validation message
SendResults()

newTrial("goodbye",
    newText("<p>Thank you for your participation!</p>")
        .css("font-size", "1.5em")
        .css("font-family", "Verdana")
        .center()
        .print()
    ,
    newText("<a href='https://www.sfla.ch/'>Click here to validate your participation.</a>")
        .css("font-size", "1em")
        .css("font-family", "Verdana")
        .center()
        .print()
    ,
    // not sure what this does, but it might be necessary
    newButton("void")
        .wait()
)

// Define additional functions:
    .setOption( "countsForProgressBar" , false )
// Make sure the progress bar is full upon reaching this last (non-)trial

// Function to include a break after 30 trials
function SepWithN(sep, main, n) {
    this.args = [sep,main];

    this.run = function(arrays) {
        assert(arrays.length == 2, "Wrong number of arguments (or bad argument) to SepWithN");
        assert(parseInt(n) > 0, "N must be a positive number");
        let sep = arrays[0];
        let main = arrays[1];

        if (main.length <= 1)
            return main
        else {
            let newArray = [];
            while (main.length){
                for (let i = 0; i < n && main.length>0; i++)
                    newArray.push(main.pop());
                for (let j = 0; j < sep.length; ++j)
                    newArray.push(sep[j]);
            }
            return newArray;
        }
    }
}
function sepWithN(sep, main, n) { return new SepWithN(sep, main, n); }

_AddStandardCommands(function(PennEngine){
    this.test = {
        passed: function(){
            return !PennEngine.controllers.running.utils.valuesForNextElement ||
                !PennEngine.controllers.running.utils.valuesForNextElement.failed
        }
    }
});