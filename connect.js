(function () {
    var slot = $(".slot");
    var column = $(".column");
    var curPlay = "player1";
    var hole = $(".hole");

    column.on("click", function (e) {
        var slotsInCol = $(e.currentTarget).find(slot);
        console.log("slotsInCol", slotsInCol);
        for (var i = 5; i >= 0; i--) {
            if (!slotsInCol.eq(i).hasClass("player1")) {
                if (!slotsInCol.eq(i).hasClass("player2")) {
                    break;
                }
            }
        }
        slotsInCol.eq(i).addClass(curPlay);

        if (checkForVic(slotsInCol)) {
            showVicMsg();
        } else {
            var slotsInRow = $(".row" + i);
            if (checkForVic(slotsInRow)) {
                showVicMsg();
            } else {
                if (diag(curPlay)) {
                    showVicMsg();
                }
            }
        }
        console.log("CURRENT PLAYER IS: ", curPlay);
        s();
    });
    function checkForVic(slots) {
        var str = "";
        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass(curPlay)) {
                str += "y";
                // console.log(str);
            } else {
                str += "n";
                // console.log(str);
            }
        }

        return str.indexOf("yyyy") > -1;
    }

    function s() {
        var curP = $(".curP");
        if (curPlay == "player1") {
            curPlay = "player2";
            $(".one").removeClass("p1");
            $(".two").addClass("p2");
        } else {
            curPlay = "player1";
            $(".two").removeClass("p2");
            $(".one").addClass("p1");
        }
    }

    function showVicMsg() {
        column.off("click");
        var htmlDiv;
        if (curPlay == "player1") {
            htmlDiv =
                '<div class="victory" style="background-color:#ed403c">Player-1 WINS!</div>';
            // console.log(curPlay);
        }
        if (curPlay == "player2") {
            htmlDiv =
                '<div class="victory" style="background-color:#56c4c5">Player-2 WINS!</div>';
            // console.log(curPlay);
        }
        $(".box").append(htmlDiv);
        setTimeout(again, 5000);

        function again() {
            var restart;
            restart = '<button class="restart"><p>Play Again?</p></button>';
            $(".box").append(restart);

            $("body").on("click", "button", function (e) {
                e.stopPropagation();
                location.reload(true);
            });
        }
    }

    function diag(arg) {
        var victories = [
            [0, 7, 14, 21],
            [1, 8, 15, 22],
            [2, 9, 16, 23],
            [3, 8, 13, 18],
            [4, 9, 14, 19],
            [5, 10, 15, 20],
            [6, 13, 20, 27],
            [7, 14, 21, 28],
            [8, 15, 22, 29],
            [9, 14, 19, 24],
            [10, 15, 20, 25],
            [11, 16, 21, 26],
            [12, 19, 26, 33],
            [13, 20, 27, 34],
            [14, 21, 28, 35],
            [15, 20, 25, 30],
            [16, 21, 26, 31],
            [17, 22, 27, 32],
            [18, 25, 32, 39],
            [19, 26, 33, 40],
            [20, 27, 34, 41],
            [21, 26, 31, 36],
            [22, 27, 32, 37],
            [23, 28, 33, 38]
        ];
        for (var i = 0; i < victories.length; i++) {
            var playCounter = 0;
            for (var j = 0; j < 4; j++) {
                if (slot.eq(victories[i][j]).hasClass(arg)) {
                    playCounter++;
                }
            }
            if (playCounter == 4) {
                console.log("diagonal vic");
                return true;
                showVicMsg();
            }
        }
    }
})();