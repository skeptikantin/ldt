// Maze script
// Version: 2022-10-04
// https://www.pcibex.net/documentation/

PennController.ResetPrefix(null); // Shorten command names (keep this line here)
PennController.DebugOff();

// To do:
//   Intro -- Times, not verdana (css.container?)


// ## Prelims
// A: Make sure the counter is reset at every new participant for more equal distribution,
//    This needs to be run in the sequence below
SetCounter("inc", 1);



// B: Define sequence of the individual blocks:
//    * Begin with the reset counter (probably not relevant here, but we'll leave it just in case)
//    * Then play intro and instructions
//    * Training phase
//    * Intermission after training
//    * MAIN: randomizes the stentences, break after N sentences
//    * Debrief, send results, and a goodbye message with verification link (if applicable)
// Define the sequence of blocks in the trial
Sequence("counter",
    "intro",
    "instructions",
    randomize("training"),
    "intermission",
    "experiment", // randomization is off for lextale
    // sepWithN( "break" , randomize("experiment") , 20),
    // sepWithN( "break" , "experiment" , 20),
    "debrief",
    SendResults(),
    "goodbye")

// C: Define a header that happens at the beginning of every single trial
Header(
    // We will use this global Var element later to store the participant's name
    newVar("ParticipantName")
        .global()
    ,
    // delay of 500ms before every trial
    newTimer("timer_header", 500)
        .start()
        .wait()
)
// D: Log participant information
//    * Grabs the prolific participant ID from the URL parameter
//      (set this in Prolific!)
//    * The log command adds a column with participantID to every line in results
.log("ParticipantID", PennController.GetURLParameter("participant") );

// ## Experiment Section
// # Introduction

newTrial("intro",

    newText("<p>Welcome!</p>")
        .css("font-size", "1.2em")
        .print()
    ,
    newText("<p><strong>Informed Consent</strong>:</p>")
        .print()
    ,
    newText("<p><strong>Voluntary participation:</strong> I understand that my participation in this study is voluntary.<br/>" +
        "<strong>Withdrawal:</strong> I can withdraw my participation at any time during the experiment.<br/>"+
        "<strong>Risks:</strong> There are no risks involved.<br/>"+
        "<strong>Equipment:</strong> I am participating from a device with a <strong>physical keyboard</strong>.<br/>"+
        "<strong>Environment:</strong> I participate from a quiet environment and can work uninterrupted.</p>")
        .print()
    ,
    newText("<p>By hitting SPACE I consent to the above.")
        .print()
    ,
    newKey(" ")
        .log()
        .once()
        .wait()
    ,
    fullscreen()
)

newTrial("instructions",

    newText("<p><strong>The lexical decision task</strong></p>")
        .css("font-size", "1.2em")
        .print()
    ,
    newText("Instr", "<p>Your task is to decide whether<br/>"+
        "the word on the screen is a word of English or not.<br/></p>" +
        "<p>Please respond as quickly, but as accurately as possible.</p>" +
        "<p>Press the <b>J</b> key if <strong>the word is a word</strong> (think J resembles 'yes')<br/>and the <b>F</b> key if <strong>it is not a word</strong> (think F = 'false').</p>")
        .print()
    ,
    newText("<p>Please place your index fingers on the J and F keys, respectively,<br>and press SPACE when you are ready to begin the training phase.</p>")
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
        newTimer("timer_train", 500)
            .start()
            .wait()
        ,
        // Blank line
        newText("<p> </p>")
        ,

        // Show item
        newText("Item", row.Item)
            .css("font-size", "1.5em")
            //.center()
            .print("center at 50%", "top at 50%")
            .log()
        ,
        // Set up response buttons
        newKey("key", "FJ")
            .log()
            .once()
            .wait()
        ,
        getKey("key")
            .test.pressed(row.Corr)
            .success(newText("success", "<p>Correct!</p>").css("font-color", "green").print("center at 50%", "top at 55%"))
            .failure(newText("failure", "<p>Incorrect!</p>").css("font-color", "red").print("center at 50%", "top at 55%"))
        ,
        newTimer("timer_train2", 500)
            .start()
            .wait()
    )
// log info
        .log("ExpId", row.ExpId)
        .log("ItmId", row.ItmId)
        .log("Item", row.Item)
        .log("Condition", row.Condition)
        .log("Corr", row.Corr)
)

newTrial("intermission",
    newText("<p>Lovely, you should be good to go.<br/>" +
    "Remember: try to be as quick and as accurate as possible.</p>" +
    "<p>(<strong>F = false, not a word</strong> and <strong>J = yes, word</strong>)</p>" +
    "<p>You are now going to do the same for 60 more words.<br/>(No feedback will be given.)</p>"+
    "<p>The experiment will pause after the 20th and the 40th word,<br/>" +
    "at which points you are welcome to take a break if you wish.</p>")
        .print()
    ,
    newText("<p>Please place your index fingers on the F and J keys, respectively,<br/>and press SPACE when you are ready to start the main experiment.</p>")
        .print()
    ,
    newKey(" ")
        .log()
        .once()
        .wait()
)

Template("lextale.csv", row =>
    newTrial("experiment",

        // set up a timer so there is a x ms break between trials
        newTimer("timer_exp", 500)
            .start()
            .wait()
        ,
        // Show item
        newText("Item", row.Item)
            .css("font-size", "1.5em")
            .center()
            .print("center at 50%", "top at 50%")
            .log()
        ,
        // set up the response buttons
        newKey("FJ")
            .log()
            .once()
            .wait()
     )
        // log info
        .log("ExpId", row.ExpId)
        .log("ItmId", row.ItmId)
        .log("Item", row.Item)
        .log("Condition", row.Condition)
        .log("Corr", row.Corr)
    ,
    newTrial("break",

        newText("<p>Well done, take a little rest if you want.</p>" +
            "Press SPACE to continue.")
            .print()
        ,
        newKey(" ")
            .log()
            .wait()
    )
)

newTrial("debrief",

    newText("<p>That's (almost) it, thank you!</p>")
        .css("font-size", "1.2em")
        .print()
    ,
    newText("<p><strong>Anything you'd like to tell us about your experience?</strong></p>")
        .print()
    ,
    newTextInput("topic", "")
        .settings.log()
        .settings.lines(0)
        .settings.size(400, 100)
        .print()
        .log()
    ,
    newText("<p>Please indicate your handedness (voluntary, but helpful for data analysis):</p>")
        .print()
    ,
    newScale("handedness", "right-handed", "left-handed", "no dominant hand", "rather not say")
        .settings.vertical()
        .labelsPosition("right")
        .print()
        .log()
    ,
    newButton("send", "Send results & proceed to verification link")
        .size(300)
        .center()
        .print()
        .wait()
)

// now send results before the good-bye and validation message
SendResults()

newTrial("goodbye",

    exitFullscreen()
    ,
    newText("<p>Thank you very much for your time and effort!</p>")
        .css("font-size", "1.2em")
        .print()
    ,
    newText("<strong><a href='https://app.prolific.co/submissions/complete?cc=8016C608'>Click here to return to Prolific to validate your participation.</a></strong>")
        .css("font-size", "1em")
        .print()
    ,
    newText("<p><br/>You can contact the corresponding researcher <a href='https://www.sfla.ch/' target='_blank'>here</a> (opens new tab).</p>")
        .css("font-size", ".8em")
        .print()
    ,
    newButton("void")
        .wait()
) // the good-bye message

// Define additional functions:
    .setOption( "countsForProgressBar" , false )
// Make sure the progress bar is full upon reaching this last (non-)trial

// Function to include a break after N trials
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
                    // newArray.push(main.pop()); // default
                    newArray.push(main.shift()); // if not randomized, avoid going backwards
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