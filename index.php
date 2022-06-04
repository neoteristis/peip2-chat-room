<?php
    // load up your config file
    require_once("./resources/config.php");
    require_once(TEMPLATES_PATH . "/header.php");
?>
<div id="container">
    <div id="navigation" class="split">
    <?php
        require_once(TEMPLATES_PATH . "/navigation.php");
    ?>
    </div>
    <div id="chatroom" class="split">
    <?php
        require_once(TEMPLATES_PATH . "/chatroom.php");
    ?>
    </div>
</div>
<?php
    require_once(TEMPLATES_PATH . "/footer.php");
?>