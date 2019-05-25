//need it to keep the dropdown outline (actually shadow) after an option is chosen
document.getElementById("dropdown").onchange = 
  function() {
    var elem = (typeof this.selectedIndex === "undefined" ? window.event.srcElement : this);
    var value = elem.value || elem.options[elem.selectedIndex].value;
  if (value === "firstOption") {
    document.getElementById("grr").innerHTML =
    "<select id=\"dropdown\" name=\"dropdown\" style=\"outline: none; box-shadow: 0 0 0 3px #ffcc00;\"><option disabled value=\"\">Select an option</option><option value=\"firstOption\" selected>First option</option><option value=\"secondOption\">Second option</option><option value=\"thirdOption\">Third option</option><option value=\"other\">Other</option></select>";
  }
  else if (value === "secondOption") {
    document.getElementById("grr").innerHTML =
    "<select id=\"dropdown\" name=\"dropdown\" style=\"outline: none; box-shadow: 0 0 0 3px #ffcc00;\"><option disabled value=\"\">Select an option</option><option value=\"firstOption\">First option</option><option value=\"secondOption\" selected>Second option</option><option value=\"thirdOption\">Third option</option><option value=\"other\">Other</option></select>";           
  }
  else if (value === "thirdOption") {
    document.getElementById("grr").innerHTML =
    "<select id=\"dropdown\" name=\"dropdown\" style=\"outline: none; box-shadow: 0 0 0 3px #ffcc00;\"><option disabled value=\"\">Select an option</option><option value=\"firstOption\">First option</option><option value=\"secondOption\">Second option</option><option value=\"thirdOption\" selected>Third option</option><option value=\"other\">Other</option></select>";          
  }
  else {
    document.getElementById("grr").innerHTML =
    "<select id=\"dropdown\" name=\"dropdown\" style=\"outline: none; box-shadow: 0 0 0 3px #ffcc00;\"><option disabled value=\"\">Select an option</option><option value=\"firstOption\">First option</option><option value=\"secondOption\">Second option</option><option value=\"thirdOption\">Third option</option><option value=\"other\" selected>Other</option></select>";    
  }
}
