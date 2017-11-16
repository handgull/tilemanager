<html>
<head>
  <title>Tile Manager</title>
  <meta charset="utf-8">
  <meta name="author" content="handgull">
  <link rel="stylesheet" type="text/css" href="style.css">
  <script src="lib/pnglib.js"></script>
  <script src="script.js"></script>
</head>
<body onload="main();">
  <div id="map"></div>
  <div id="right">
    <table id="palette">
    </table>
    <div id="panel">
      <div class="button" onclick="addT();">Add tile</div>
      <div class="button" onclick="rvrsT();">Reverse order</div>
      <div class="button" onclick="rmvT();">Remove last</div>
      <div class="button" onclick="rmvtT();">Remove first</div>
      <div class="button" onclick="rmvaT();">Clean all</div>
      <div class="button" onclick="genimg();">PNG Export</div>
    </div>
    <div id="hiddeni">
      <div id="close"><i id="closeimg" onclick="closeI()">X</i></div>
      <input type="text" placeholder="#123456" id="ic"><br>
      <div class="button" id="sendC" onclick="clColor();">Send</div><br>
    </div>
  </div>
  <div id="bg"><div id="genimg"></div></div>
</body>
</html>
