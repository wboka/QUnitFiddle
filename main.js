var exampleTest = 'QUnit.test("Hello Test", function(assert) {\n    assert.ok(true, "Passed!");\n});';

$(document).ready(function() {
    $("#reset").on("click", resetTests);
    $("#run").on("click", runTests);
    $("#example").on("click", runExample);

    $("textarea").keydown(function(e) {
        if(e.keyCode === 9) { // tab was pressed
            // get caret position/selection
            var start = this.selectionStart;
                end = this.selectionEnd;

            var $this = $(this);

            // set textarea value to: text before caret + tab + text after caret
            $this.val($this.val().substring(0, start)
                        + "    "
                        + $this.val().substring(end));

            // put caret at right position again
            this.selectionStart = this.selectionEnd = start + 4;

            // prevent the focus lose
            return false;
        }
    });

    $(document).on("keydown", function(e) {
        if ((e.keyCode == 10 || e.keyCode == 13) && e.ctrlKey && e.shiftKey) {
            runExample();
        } else if ((e.keyCode == 10 || e.keyCode == 13) && e.ctrlKey) {
            runTests();
        } else if (e.keyCode == 82 && e.shiftKey) {
            resetTests();
        }
    });

    $("[title]").tooltip({
        container: "body",
        placement: "auto bottom"
    });
});

function resetTests() {
    $("#tests").val("");
    document.location.reload(true);
}

function runTests() {
    if ($("#tests").val().length > 0) {
        $("#testsContainer").append("<script type='text/javascript'>" + $("#tests").val() + "</script>");
    }
}

function runExample() {
    $("#tests").val(exampleTest);

    runTests();
}