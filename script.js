/*GLOBAL VARS*/
var colors = [
  "rgba(0,0,0,0)",
  "#ffffff",
  "#fce94f",
  "#ef8229",
  "#cc0000",
  "#c4a000",
  "#75507b",
  "#4e9a06",
  "#3465a4",
  "#000000"
];
var cl = colors.length;
var wi = 16;
var he = 16;
  /*STATUS*/
var selectedC = null;
var drawOnHover = false;
var drawAll = false;
/*HTML GENERATION ONLOAD*/
function main() {
  document.getElementById("map").innerHTML = fillPanel();
  var tileh = tileFirstStyling(he);
  document.getElementById("palette").innerHTML = legndPopulation();
  legndFirstStyling(tileh);
  selectC(document.getElementById("c2"));
  var imgdiv = document.getElementById("genimg");
  var imgwi = wi*4;
  var imghe = he*4;
  imgdiv.style.width = imgwi;
  imgdiv.style.height = imghe;
  imgdiv.style.marginLeft = -1*imgwi/2;
  imgdiv.style.marginTop = -1*imghe/2;
}
function fillPanel() {
  var content = "";
  for (i = 0; i < he; i++) {
    for (j = 0; j < wi; j++)
      content += '<div class="tile" onclick="clickF(this, drawAll);" onmouseover="hoverF(this, drawOnHover);">' +
                 '</div>';
    if(i != he-1)
      content += "<br>";
  }
  return content;
}
function tileFirstStyling(ntile) {
  var pmargin = 10;
  var tborder = 2;
  tileh = ((document.getElementsByTagName("body")[0].clientHeight - pmargin) / ntile) - tborder;
  var tilesArray = document.getElementsByClassName("tile");
  for (i = 0; i < tilesArray.length; i++) {
    tilesArray[i].style.width = tileh;
    tilesArray[i].style.height = tileh;
    tilesArray[i].style.backgroundColor = colors[0];
  }
  return tileh;
}
function legndPopulation() {
  var content = "";
  for (i = 0; i < cl; i++) {
    content +=
      '<tr class="palette-line">' +
        '<td><div class="tile" id="' + "c" + (i+1) + '" onclick="selectC(this);"></div></td>' +
        '<td class="cstatus"></td>' +
      "</tr>";
  }
  return content;
}
function legndFirstStyling(tileh) {
  var ci = "";
  for (i = 0; i < cl; i++) {
    ci = document.getElementById("c" + (i+1));
    ci.style.backgroundColor = colors[i];
    if(tileh != null) {
      ci.style.width = tileh;
      ci.style.height = tileh;
    }
  }
}
/*USER-TILE INTERACTION*/
function clickF(e, drawAll) {
  if (drawAll) {
    var tilesArray = document.getElementsByClassName("tile");
    for (i = 0; i < tilesArray.length; i++)
      tilesArray[i].style.backgroundColor = colors[selectedC];
    legndFirstStyling();
  }
  else
    e.style.backgroundColor = colors[selectedC];
}
function hoverF(e, flag) {
  if (flag)
    clickF(e);
}
/*PALETTE*/
function selectC(e) {
  var level1Computed = "rgb(255, 255, 255) 0px 0px 6px 0px";
  var level1 = "0 0 6px #fff";
  var level2Computed = "rgb(255, 255, 0) 0px 0px 6px 0px";
  var level2 = "0 0 6px #ff0";
  var level3Computed = "rgb(255, 0, 0) 0px 0px 6px 0px";
  var level3 = "0 0 6px #f00";
  if (window.getComputedStyle(e).getPropertyValue("box-shadow") == level1Computed) {
    e.style.boxShadow = level2;
    drawOnHover = true;
  }
  else if (window.getComputedStyle(e).getPropertyValue("box-shadow") == level2Computed) {
    e.style.boxShadow = level3;
    drawOnHover = false;
    drawAll = true;
  }
  else if (window.getComputedStyle(e).getPropertyValue("box-shadow") == level3Computed) {
    e.style.boxShadow = "none";
    selectedC = null;
  }
  else {
    e.style.boxShadow = level1;
    for (i = 0; i < cl; i++) {
      ci = document.getElementById("c" + (i+1));
      if ("c" + (i+1) != e.id)
        ci.style.boxShadow = "none";
    }
    selectedC = parseInt(e.id.substr(1), 10) - 1;
    drawOnHover = false;
    drawAll = false;
  }
}
/*MENU*/
  /*ADDING COLORS*/
function addT() {
  document.getElementById("hiddeni").style.display = "block";
}
function clColor() {
  var hex = document.getElementById("ic").value;
  var newEntry = hexCheck(hex);
  cl = colors.push(newEntry);
  removeDuplicateColors();
  colors.splice(0, 1);
  colors.sort();
  colors.reverse();
  colors.splice(0, 0, "rgba(0,0,0,0)");
  document.getElementById("palette").innerHTML = legndPopulation();
  var tile = document.getElementsByClassName("tile")[0],
      tstyle = window.getComputedStyle(tile),
      tileh = tstyle.getPropertyValue('height');
  legndFirstStyling(tileh);
  for (i = 0; i < colors.length; i++) {
    if(colors[i] == newEntry)
      selectC(document.getElementById("c" + (i+1)));
  }
  closeI();
}
function hexCheck(str) {
  var sl = str.length;
  var errC = "#000000";
  if (str.charAt(0) != '#') {
    if (sl != 3 && sl != 6)
      return errC;
    else
      return hexCheck("#" + str);
  }
  else if (sl != 4 && sl != 7)
    return errC;
  else if(sl == 4) {
    str =
      str.charAt(0) +
      str.charAt(1) + str.charAt(1) +
      str.charAt(2) + str.charAt(2) +
      str.charAt(3) + str.charAt(3);
  }
  return str.toLowerCase();
}
function removeDuplicateColors() {
  for (i = 1; i < cl; i++) {
    if (colors[i-1] == colors[i]) {
      colors.splice(i--, 1);
      cl--;
    }
  }
}
function closeI() {
  document.getElementById("hiddeni").style.display = "none";
}
  /*REVERT COLORS ORDER*/
function rvrsT() {
  var c1 = colors.shift();
  drawOnHover = false;
  colors.reverse().unshift(c1);
  document.getElementById("palette").innerHTML = legndPopulation();
  var tile = document.getElementsByClassName("tile")[0],
      tstyle = window.getComputedStyle(tile),
      tileh = tstyle.getPropertyValue('height');
  legndFirstStyling(tileh);
}
  /*REMOVE LAST COLOR*/
function rmvT() {
  if (cl > 1) {
    colors.pop();
    cl--;
  document.getElementById("palette").innerHTML = legndPopulation();
  var tile = document.getElementsByClassName("tile")[0],
      tstyle = window.getComputedStyle(tile),
      tileh = tstyle.getPropertyValue('height');
  legndFirstStyling(tileh);
  if(selectedC == cl)
    selectC(document.getElementById("c" + cl));
  }
}
  /*REMOVE FIRST COLOR*/
function rmvtT() {
  colors.splice(1, 1);
  cl--;
  document.getElementById("palette").innerHTML = legndPopulation();
  var tile = document.getElementsByClassName("tile")[0],
      tstyle = window.getComputedStyle(tile),
      tileh = tstyle.getPropertyValue('height');
  legndFirstStyling(tileh);
  if(selectedC == 2)
    selectC(document.getElementById("c" + 2));
}
  /*REMOVE ALL COLORS*/
function rmvaT() {
  colors = ["rgba(0,0,0,0)"];
  cl = 1;
  document.getElementById("palette").innerHTML = legndPopulation();
  var tile = document.getElementsByClassName("tile")[0],
      tstyle = window.getComputedStyle(tile),
      tileh = tstyle.getPropertyValue('height');
  legndFirstStyling(tileh);
  selectC(document.getElementById("c" + 1));
}
  /*PNG GENERATION*/
function genimg() {
  tilesArray = document.getElementsByClassName("tile");
  var pixels = parseVectorTo2DArray(tilesArray,he,wi);
  var p = new PNGlib(he, wi, 256);
  var background = p.color(0, 0, 0, 0);
  for (i = 0; i < he; i++) {
    for (j = 0; j < wi; j++) {
      if(notTransparent(pixels[i][j]))
        p.buffer[p.index(i,j)] = p.color(11, 22, 33);
    }
  }
  document.getElementById("genimg").innerHTML = '<img src="data:image/png;base64,'+p.getBase64()+'">';
  document.getElementById("bg").style.display = "block";
}
function notTransparent(e) {
  if(e.style.backgroundColor != "transparent")
    return true;
  else
    return false;
}
function parseVectorTo2DArray(array,h,w) {
  var bookmark = 0;
  var ret = new Array();
  var row = new Array();
  for (i = 0; i < h; i++) {
    for (j = 0; j < w; j++)
      row[j] = array[bookmark++];
    ret[i] = row;
  }
  return ret;
}
