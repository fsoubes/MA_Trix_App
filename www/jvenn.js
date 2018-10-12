/***************************************************************
*  Copyright notice
*
*  (c) 2014 PF bioinformatique de Toulouse
*  All rights reserved
* 
*
*  This script is an adaptation of the venny script developed by
*  Juan Carlos Oliveros, BioinfoGP, CNB-CSIC:
*  Oliveros, J.C. (2007) VENNY. An interactive tool for comparing 
*  lists with Venn Diagrams.
*  http://bioinfogp.cnb.csic.es/tools/venny/index.html.
*  It is distributed under the terms of the GNU General Public 
*  License as published by the Free Software Foundation; either 
*  version 2 of the License, or (at your option) any later version.
*
*  The GNU General Public License can be found at
*  http://www.gnu.org/copyleft/gpl.html.
*
*  This script is distributed in the hope that it will be useful,
*  but WITHOUT ANY WARRANTY; without even the implied warranty of
*  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*  GNU General Public License for more details.
*
*  This copyright notice MUST APPEAR in all copies of the script!
***************************************************************/

/***************************************************************
*                         
* Adapted to Shiny by Franck Soubès.
* 
****************************************************************/

$(document).ready(function () {


			var colorDefault = ["#FFA500", "#FFA500", "#FFA500", "#FFA500", "#FFA500", "#FFA500"],
				displayMode  = "classic",
				displayStat  = true,
				displaySwitch= true,
				shortNumber  = true,
				fontSize     = "12px",
				fontFamily   = "Arial",
        uploadSeries = new Array();
        
    /*
    Shiny.addCustomMessageHandler("updatejcol", function(coljvenn) {	
      
      let mypalette = coljvenn;
      mypalette = mypalette.map(() => mypalette.splice(0,3)).filter(a => a)
      let R2jspal =new Array();
      for (let i = 0 ; i< mypalette.length; i++ ){
      R2jspal[i] = "rgb(".concat(mypalette[i]).concat(")");
      }
      console.log(R2jspal);
      return(R2jspal);
    });
    */
        
    function updateJvenn() {

		Shiny.addCustomMessageHandler("updatejvenn", function(final) {	
		  let seriesTable = final;//jsonData;
    
     Shiny.addCustomMessageHandler("updatejcol", function(coljvenn) {	
        let mypalette = coljvenn;
        console.log(mypalette);
        mypalette = mypalette.map(() => mypalette.splice(0,3)).filter(a => a);
        let R2jspal =new Array();
        for (let i = 0 ; i< mypalette.length; i++ ){
          R2jspal[i] = "rgb(".concat(mypalette[i]).concat(")");
          }
          console.log(R2jspal);
      
			    $("#jvenn-container").jvenn({
					series: seriesTable,
					//colors:  ["rgb(0,102,0)","rgb(90,155,212)","rgb(241,90,96)","rgb(250,220,91)","rgb(255,117,0)","rgb(192,152,83)"] ,
					colors : R2jspal,
					fontSize:   fontSize,
					fontFamily: fontFamily,
					searchInput:  $("#search-field"),
					searchStatus: $("#search-status"),
					displayMode: displayMode,
					displayStat: displayStat,
					
					fnClickCallback: function() {
						let value = "";
						nameslis = [];
						if (this.listnames.length == 1) {
							value += "Elements only in ";
							
						} else {
							value += "Common elements in ";
						}
						
						for (name in this.listnames) {
							nameslis.push(this.listnames[name]);
						}
						     value += ":\n";
						     mylist =[];
						for (val in this.list) {
						     mylist.push( this.list[val]);
						  }
						     $("#names").val(value);
						     
						     
						     Shiny.onInputChange("testons",mylist);// renvoyer dans R
						     Shiny.onInputChange("together",nameslis.join(""));// renvoyer dans R
						     Shiny.onInputChange("selcontjv",nameslis);
						     return(mylist); 
					}

				});
		 });
		});
	}

			
		

			$('[id^="clear"]').click(function() {
				let index = $(this).attr("id").split("_")[1];
				$("#area" + index).val("");
				$("#name" + index).val("List " + index);
				updateJvenn();
			});
			
			// update the view when any fields change
			$("[id^=name]").change(function() {
				updateJvenn();
			});
			$("[id^=area]").change(function() {
				updateJvenn();
			});
			
			$("#venn-type").change(function() {
				updateJvenn();
			});
				$("#ds_yes").click(function() {
				displayStat = true;
				Shiny.onInputChange("mystat",displayStat);
				updateJvenn();				
			});
			$("#ds_no").click(function() {
				displayStat = false;
				Shiny.onInputChange("mystat",displayStat);
				updateJvenn();				
			});
			
			$("#dsw_yes").click(function() {
				displaySwitch = true;
				updateJvenn();				
			});
			$("#dsw_no").click(function() {
				displaySwitch = false;
				updateJvenn();				
			});
			
			$("#dm_classic").click(function() {
				displayMode = "classic";
        Shiny.onInputChange("updamod",displayMode);
				updateJvenn();				
			});
			
			
			$("#dm_edwards").click(function() {
				displayMode = "edwards";
				Shiny.onInputChange("updamod",displayMode);
				updateJvenn();				
			});
			
			$('[id^="ff"]').click(function() {
				fontFamily = $(this).html();
				//Shiny.onInputChange("updamod",fontFamily);
				updateJvenn();				
			});
			
			$('[id^="fs"]').click(function() {
				fontSize = $(this).html();
				Shiny.onInputChange("myfont",fontSize);
				updateJvenn();				
			});
		
			/*
			$('[id^="colorp"]').colorpicker().on('changeColor.colorpicker', function(event) {
				var index = $(this).attr("id").split("_")[1];
				$("#name" + index).css("color",        event.color.toHex());
  				$("#name" + index).css("border-color", event.color.toHex());
				$("#area" + index).css("color",        event.color.toHex());
  				$("#area" + index).css("border-color", event.color.toHex());
  				updateJvenn();				
			});
			
			$('[id^="colord"]').click(function() {
				var index = $(this).attr("id").split("_")[1];
				$("#name" + index).css("color",        colorDefault[index-1]);
  				$("#name" + index).css("border-color", colorDefault[index-1]);
				  $("#area" + index).css("color",        colorDefault[index-1]);
  				$("#area" + index).css("border-color", colorDefault[index-1]);
  				$("#colorp_" + index).colorpicker('setValue', colorDefault[index-1]);
				updateJvenn();				
      });
        
      
			 
			$('#colorp_1').children("span").children("i").css("background-color", colorDefault[0]);
			$('#colorp_2').children("span").children("i").css("background-color", colorDefault[1]);
			$('#colorp_3').children("span").children("i").css("background-color", colorDefault[2]);
			$('#colorp_4').children("span").children("i").css("background-color", colorDefault[3]);
			$('#colorp_5').children("span").children("i").css("background-color", colorDefault[4]);
      $('#colorp_6').children("span").children("i").css("background-color", colorDefault[5]);
        */
			updateJvenn();

});
