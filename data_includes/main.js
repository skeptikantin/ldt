// Populate this area to include info etc.

PennController.ResetPrefix(null)
PennController.DebugOff();

// Define the sequence of blocks in the trial
Sequence("intro",
    "instructions",
    randomize("training"),
    "intermission",
    sepWithN( "break" , randomize("experiment") , 34),
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
//.log("Name", getVar("ParticipantName"))
.log("ParticipantID", PennController.GetURLParameter("participant") );


newTrial("intro",

    newText("<p>Welcome to this lexical decision task!")
        .css("font-size", "1.5em")
        .css("font-family", "Verdana")
        .center()
        .print()
    ,
    newText("<p><strong>Voluntary participation:</strong> I understand that my participation in this study is voluntary.<br/>" +
    "<strong>Withdrawal:</strong> I can withdraw my participation at any time during the experiment.<br/>"+
    "<strong>Risks:</strong> There are no risks involved, except perhaps a slight annoyance with flickering text.<br/>"+
    "<strong>Equipment:</strong> I am participating from a device with a physical keyboard.</p>")
        .css("font-family", "Verdana")
        .print()
    ,
    newText("<p>By hitting SPACE I consent to the above.")
        .css("font-family", "Verdana")
        .print()
    ,
    newKey(" ")
        .log()
        .once()
        .wait()
)

newTrial("instructions",

    newText("<p>In this experiment, your task is to decide<br/>"+
        "whether the word on the screen is a word of English or not.<br/></p>" +
        "<p>Please respond as quickly, but as accurately as possible.</p>" +
        "<p>Each word is briefly preceded by another word.<br/>" +
        "Some people will be able to read the first word, <br/>but it doesn't matter if you can't.<br/>"+
        "You are to judge the <b>second</b> word that stays on screen.</p>"+
        "<p>Please press the <b>J</b> key if <strong>the word is a word</strong> (think J resembles 'yes')<br/>and the <b>F</b> key if <strong>it is not a word</strong> (think F = 'false').</p>")
        .css("font-size", "1.2em")
        .css("font-family", "Verdana")
        .center()
        .print()
    ,
    newText("<p>Please place your index fingers on the J and F keys, respectively,<br>and press SPACE when you are ready to begin with a short training phase.</p>")
        .css("font-size", "1.2em")
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
        // how long the prime is visible
        newTimer("wait", 50)
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
    "<p>(<strong>F = false, not a word</strong> and <strong>J = yes, word</strong>)</p>" +
    "<p>You are now going to do the same for 136 words.</p>"+
    "<p>Because the task is demanding, the experiment will pause<br/>" +
    "after every 34 words,<br/> at which points you are welcome to take a break if you want.</p>")
        .css("font-size", "1.2em")
        .css("font-family", "Verdana")
        .center()
        .print()
    ,
    newText("<p>Please place your index fingers on the F and J keys,<br/>and press SPACE when you are ready to proceed to the main experiment.</p>")
        .css("font-size", "1.2em")
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
        // how long prime is visible
        newTimer("wait", 50)
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
            .print()
        ,
        newKey(" ")
            .log()
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
    newText("<p>Press <b>S</b> (sometimes) or <b>N</b> (never)</p>" +
        "<p>(or X if you prefer not to answer).</p>")
        .css("font-size", "1.5em")
        .css("font-family", "Verdana")
        .center()
        .print()
    ,
    newText("<p>After you press a buttom, please wait while results are sent to the server.</p>")
        .css("font-size", "1em")
        .css("font-family", "Verdana")
        .center()
        .print()
    ,
    newKey("NSX")
        .log()
        .wait()
)


// now send results before the good-bye and validation message
SendResults()

newTrial("goodbye",
    newText("<p>Thank you for your participation!<br/>Your time and effort is much appreciated.</p>")
        .css("font-size", "1.2em")
        .css("font-family", "Verdana")
        .center()
        .print()
    ,
    newText("<a href='https://app.prolific.co/submissions/complete?cc=2593EB37'>Click here to validate your participation and return to Prolific.</a>")
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