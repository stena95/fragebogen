  // var ergebnis = [
  //   {
  //     antwort1: 0,
  //     antwort2: 0,
  //     antwort3: 0,
  //     antwort4: 0
  //   },
  //   {
  //     antwort1: 0,
  //     antwort2: 0,
  //     antwort3: 0,
  //     antwort4: 0
  //   },
  //   {
  //     antwort1: 0,
  //     antwort2: 0,
  //     antwort3: 0,
  //     antwort4: 0
  //   },
  //   {
  //     antwort1: 0,
  //     antwort2: 0,
  //     antwort3: 0,
  //     antwort4: 0
  //   },
  //   {
  //     antwort1: 0,
  //     antwort2: 0,
  //     antwort3: 0,
  //     antwort4: 0
  //   }
  // ];

  $(document).ready(function() {
    // for(var i = 1; i <= 5; i++){
    //   $("#fragen").append("<p>Frage"+i+"</p>");
    //   for(var j = 1; j <= 4; j++){
    //     $("#fragen").append("<input class='check' type='radio'><label>Das ist antwort"+j+"</label></br>");
    //   }
    //   $("#fragen").append("</br>");
    // }
    var ergebnisArr = [
      [0, 0, 0, 0],
      [0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [""],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0]
    ];
    var checkedArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var fragen = 15;
    var antwortArr = [4,3,4,5,4,4,3,6,3,4,10];
    var prozentFragen = 100/fragen;
    $('#sendBtn').hide();

    // var auswertung = function() {
    //   var fragenzaehler = 1;
    //   for (var i = 0; i < ergebnisArr.length; i++) {
    //     for (var j = 0; j < ergebnisArr[i].length; j++) {
    //       ergebnisArr[i][j] = ($('#antwort' + fragenzaehler).is(':checked')) ? 1 : 0;
    //       fragenzaehler++;
    //     }
    //     //console.log(ergebnisArr[i]);
    //   }
    // }

    var auswertung = function() {
      var fragenzaehler = 1;
      for (var i = 0; i < ergebnisArr.length; i++) {
        if(fragenzaehler != 16){
          for (var j = 0; j < ergebnisArr[i].length; j++) {
            ergebnisArr[i][j] = ($('#antwort' + fragenzaehler).is(':checked')) ? 1 : 0;
            fragenzaehler++;
          }
        } else {
          ergebnisArr[i] = $('#antwort16').val();
          fragenzaehler++;
        }
        //console.log(ergebnisArr[i]);
      }
    }

    var kurz = function(k){
      var box = $('#antwort' + k).is(':checked');
      return box;
    }

    var alleChecked = function() {
      var checked = 0; //macht bei jedem click einen Neustart und beginnt bei 0
      var antwortenzaehler = 1;
      var checkboxClick8 = false;
      var checkboxClick11 = false;
      for (var i = 0; i < ergebnisArr.length; i++) {
        for (var j = 0; j <  ergebnisArr[i].length; j++) {
          if(i != 11 && i != 8)
            checked += ($('#antwort' + antwortenzaehler).is(':checked')) ? prozentFragen : 0;
          else {
            // if(!checkboxClick8 && $('#antwort' + antwortenzaehler).is(':checked')){
            //   checkboxClick8 = true;
            //   checked += ($('#antwort' + antwortenzaehler).is(':checked')) ? prozentFragen : 0;
            // }
            // if (!checkboxClick11 && $('#antwort' + antwortenzaehler).is(':checked')){
            //   checkboxClick11 = true;
            //   checked += ($('#antwort' + antwortenzaehler).is(':checked')) ? prozentFragen : 0;
            // }
            // if(!checkboxClick8 && kurz(28)||kurz(29||kurz(30)||kurz(31)||kurz(32)||kurz(33))){
            if(!checkboxClick8 && antwortenzaehler < 34 && antwortenzaehler > 27 && $('#antwort' + antwortenzaehler).is(':checked')){
              checkboxClick8 = true;
              checked += ($('#antwort' + antwortenzaehler).is(':checked')) ? prozentFragen : 0;
            }
            if (!checkboxClick11 && antwortenzaehler < 51 && antwortenzaehler > 40  && $('#antwort' + antwortenzaehler).is(':checked')){
              checkboxClick11 = true;
              checked += ($('#antwort' + antwortenzaehler).is(':checked')) ? prozentFragen : 0;
            }

          }
          antwortenzaehler++;
        }
      }
      if(checked >= 100){
        $('#sendBtn').show();
        $('#prozent').hide();
        $('.progress').hide();
      } else {
        $('#sendBtn').hide();
        $('#prozent').show();
        $('.progress').show();
      }
      return checked;
    }

    $('.custom-control-input').change(function(){
      //console.log(alleChecked());
      var current_progress = alleChecked();
      $("#prozent")
      .css("width", current_progress + "%")
      .attr("aria-valuenow", current_progress)
      .text(Math.ceil(current_progress) + "% Complete");
    });

    $('#sendBtn').on('click', function(){
      auswertung();
      $.ajax({
        url:'http://localhost:3000/FragebogenBSEnd',
        method:'POST',
        contentType: 'application/json', // REQ-Daten-Format JSON
        data: JSON.stringify({
          ergebnis: ergebnisArr
        }), // stringify weil JSON
        dataType: 'json', // RESP-Format
        success: function(){
          console.log("OK");
          $('.col').remove();
          $('.progress').remove();
          $('#slideFragen').remove();
          $('#sendBtn').remove();
          $('body').append('<div class="col-md-12">Danke für die Teilnahme an dieser Umfrage. Ihre Daten wurden erfolgreich versendet!</div>');

        }
      });
    });
  });
